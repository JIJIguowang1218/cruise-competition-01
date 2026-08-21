/* 仿真核（Fake Backend）v0.1 —— 浏览器内模拟"船载本地服务"
 * 职责：编号/追溯(哈希链)、事件→时间分段(画多段矩形)、状态机(交互影响矩形)、校验。
 * 契约：真实产品=船载服务实现同一 API；演示=浏览器内 SimCore。 */
(function (global) {
  // ---------- 哈希（demo=FNV-1a 32bit；生产=SHA-256） ----------
  function fnv(s) {
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h += ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)); }
    return h >>> 0;
  }
  function hex8(n) { n = n >>> 0; var s = "0000000" + n.toString(16); return s.slice(-8).toUpperCase(); }
  function pad(n, w) { var s = "" + n; while (s.length < w) s = "0" + s; return s; }

  // ---------- 编号 ----------
  function traceId(ev) {
    var h = hex8(fnv(ev.eventNo + "|" + ev.discover.at + "|seed"));
    return h.slice(0, 4) + "-" + h.slice(4);
  }
  function auditNo(ev, n) { return traceId(ev) + "-A" + pad(n, 3); }
  function portNo(ev, code, n) { return traceId(ev) + "-P" + code + pad(n, 3); }
  function signNo(ev, code, n) { return traceId(ev) + "-S" + code + pad(n, 3); }
  function actionNo(ev, aid, n) { return traceId(ev) + "-X" + aid + pad(n, 3); }
  function jobNo(ev, n) { return traceId(ev) + "-JOB" + pad(n, 3); }

  // ---------- 时限 ----------
  function levelTimeout(level) { return { L1: 15 * 60, L2: 30 * 60, L3: 60 * 60, L4: 0 }[level] || 30 * 60; }

  // ---------- 事件 → 时间分段（渲染引擎据此画多段矩形） ----------
  function computeSegments(ev, tNow) {
    var segs = [];
    function addSeg(type, from, to, color) { if (to > from) segs.push({ type: type, from: from, to: to, color: color }); }
    // 发现段
    var dEnd = null;
    if (ev.handoffs && ev.handoffs.length) dEnd = ev.handoffs[0].at;
    else if (ev.approval && ev.approval.waitStart != null) dEnd = ev.approval.waitStart;
    else dEnd = tNow;
    addSeg("discover", ev.discover.at, dEnd, "detect");
    // 瞬时移交竖线
    (ev.handoffs || []).forEach(function (h) { segs.push({ type: "handoff", at: h.at, kind: h.kind }); });
    // 待确认/待审批段（§12）
    if (ev.approval && ev.approval.waitStart != null) {
      var aEnd = ev.approval.decidedAt || (ev.upgrade && ev.upgrade.at) || (ev.approval.dueAt != null ? Math.min(ev.approval.dueAt, tNow) : tNow);
      addSeg("approval", ev.approval.waitStart, aEnd, "approve");
    }
    // 执行段
    if (ev.exec && ev.exec.from != null) {
      var eTo = ev.recoverAt || ev.exec.to || tNow;
      addSeg("exec", ev.exec.from, eTo, "exec");
    }
    // 受控持续段
    if (ev.holding && ev.holding.from != null) addSeg("holding", ev.holding.from, ev.holding.to || tNow, "holding");
    // 恢复点 / 升级
    if (ev.recoverAt != null) segs.push({ type: "recover", at: ev.recoverAt });
    if (ev.upgrade && ev.upgrade.at != null) segs.push({ type: "upgrade", at: ev.upgrade.at, to: ev.upgrade.to, reason: ev.upgrade.reason });
    return segs;
  }

  // ---------- 状态机（交互写回 → 反算矩形） ----------
  function applyAction(ev, action, tNow) {
    var m = ev.machine || (ev.machine = { current: ev.state, allow: [] });
    if (m.allow.indexOf(action) < 0) return { ok: false, msg: "非法状态转移: " + action };
    if (action === "confirm") {
      if (ev.approval) { ev.approval.outcome = "confirm"; ev.approval.decidedAt = tNow; }
      if (!ev.handoffs) ev.handoffs = [];
      ev.handoffs.push({ at: tNow, from: ev.currentRole || "MGR", to: "EXEC", kind: "normal" });   // §12: 确认=瞬时移交竖线
      ev.exec = { from: tNow, to: null, port: (ev.exec && ev.exec.port) || "CRW", status: "running" };
      ev.state = "执行中"; m.current = "执行中"; m.allow = ["recover"];
    } else if (action === "recover") {
      ev.recoverAt = tNow; ev.state = "已恢复"; m.current = "已恢复"; m.allow = [];
    } else if (action === "refuse") {
      if (ev.approval) { ev.approval.outcome = "refuse"; ev.approval.decidedAt = tNow; }
      ev.state = "已拒绝"; m.current = "已拒绝"; m.allow = [];
    } else if (action === "takeover") {
      ev.takeover = { taken: true, by: ev.currentRole, at: tNow, note: "（最小登记·处置单）" };
      ev.state = "人工接管"; m.current = "人工接管"; m.allow = [];
    } else if (action === "ignore") { ev.state = "已忽略(库外)"; m.current = "已忽略"; m.allow = []; }
    else if (action === "archive") { ev.state = "已存档观察"; m.current = "已存档"; m.allow = ["escalate"]; }
    else if (action === "escalate") { ev.upgrade.at = tNow; ev.upgrade.reason = "physical"; ev.state = "已升级L3"; ev.escalate.to = ev.upgrade.to; m.current = "已升级"; m.allow = []; }
    return { ok: true };
  }

  // ---------- 时钟推进：超时自动升级 ----------
  function autoTick(ev, tNow, MOCK) {
    if (ev.approval && ev.approval.outcome == null && !ev.takeover.taken && !ev.upgrade.at &&
        ev.approval.dueAt != null && tNow >= ev.approval.dueAt) {
      ev.upgrade.at = ev.approval.dueAt; ev.upgrade.reason = ev.upgrade.reason || "timeout";
      ev.state = "已升级(" + ev.upgrade.to + ")";
      if (ev.machine) ev.machine.current = ev.state;
      // 生成上一级正式事件，升级点之后继续产生分段矩形
      if (MOCK && ev.upgrade.to && ev.type !== "X") doEscalate(ev, ev.upgrade.to, MOCK, ev.approval.dueAt);
    } else if (ev.machine && ev.machine.current === "已存档" && tNow > (ev.discover.at + 1800)) {
      ev.state = "已关闭(观察期满)"; ev.machine.current = ev.state; ev.machine.allow = [];
    }
  }

  // ---------- 审计链（哈希链，append-only） ----------
  function buildAuditChain(ev, acts) {
    var prev = hex8(fnv("seed:" + traceId(ev)));
    var out = [];
    acts.forEach(function (a, i) {
      var no = auditNo(ev, i + 1);
      var payload = JSON.stringify({ at: a.at, actor: a.actor, action: a.action, data: a.data });
      var h = hex8(fnv(prev + "|" + no + "|" + payload));
      out.push({ no: no, at: a.at, actor: a.actor, action: a.action, data: a.data, hash: h, prev: prev });
      prev = h;
    });
    return out;
  }

  // ---------- 校验 ----------
  var PORT_CODES = ["APP", "SCR", "PA", "CRW", "OTA", "VIS", "MGMT"];
  var ROLE_CODES = ["DUTY", "MGR", "LEGAL", "CAPT", "MED", "ENG"];
  var STATES = ["发现", "待审批", "执行中", "已恢复", "异常", "已升级(L3)", "人工接管", "已拒绝", "已忽略", "已存档", "待查看"];
  function validate(MOCK) {
    var errs = [];
    var seen = {};
    MOCK.events.forEach(function (ev) {
      var t = traceId(ev);
      if (seen[t]) errs.push(ev.eventNo + " trace 冲突"); else seen[t] = 1;
      var times = [];
      function addT(t){ if (t != null) times.push(t); }
      addT(ev.discover.at);
      (ev.handoffs || []).forEach(function (h) { addT(h.at); });
      if (ev.approval) { addT(ev.approval.waitStart); addT(ev.approval.dueAt); addT(ev.approval.decidedAt); }
      if (ev.exec) { addT(ev.exec.from); addT(ev.exec.to); }
      addT(ev.recoverAt);
      if (ev.holding) { addT(ev.holding.from); addT(ev.holding.to); }
      if (ev.upgrade) addT(ev.upgrade.at);
      times.sort(function (a, b) { return a - b; });
      for (var i = 1; i < times.length; i++) if (times[i] < times[i - 1]) errs.push(ev.eventNo + " 时间错序");
      if (ev.approval && ev.approval.waitStart != null &&
          ev.approval.dueAt !== ev.approval.waitStart + levelTimeout(ev.level)) errs.push(ev.eventNo + " dueAt≠时限");
      (ev.ports || []).forEach(function (p) { if (PORT_CODES.indexOf(p.portCode) < 0) errs.push(ev.eventNo + " 端口码非法:" + p.portCode); });
      (ev.chain || []).forEach(function (c) { if (ROLE_CODES.indexOf(c.role) < 0) errs.push(ev.eventNo + " 角色码非法:" + c.role); });
    });
    return { ok: errs.length === 0, errors: errs };
  }

  // 升级：把库外X升级为“正式事件”（上级问题,分段矩形由该新事件生成）
  function doEscalate(ev, lvl, MOCK, tNow) {
    var n = 1; MOCK.events.forEach(function (e) { var m = String(e.eventNo).match(new RegExp("^" + ev.eventNo + "-C(\d+)$")); if (m) n = Math.max(n, +m[1] + 1); });
    var no = ev.eventNo + "-C" + n;
    ev.upgrade = { at: tNow, to: lvl, reason: "physical" };
    ev.state = "已升级(" + lvl + ")"; if (ev.machine) ev.machine.allow = [];
    var role = lvl === "L4" ? "CAPT" : "MGR";
    var kid = {
      eventNo: no, name: ev.name + "（升级为" + lvl + "正式事件）", type: "E", level: lvl,
      category: "库外→升级", semanticType: "任务型", state: "待审批", currentRole: role,
      needsCaptain: lvl === "L4", pinned: lvl === "L4", flash: false, foldGroup: lvl, phase: ev.phase,
      discover: { at: tNow, signals: [], confidence: ev.confidence || 0.6 },
      handoffs: [{ at: tNow + 6, from: "SENSE", to: role, kind: "normal" }],
      approval: { waitStart: tNow + 6, dueAt: tNow + 120, outcome: null, decidedAt: null },
      exec: null, holding: null, peakMark: false, recoverAt: null,
      upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      summary: "由库外异常升级转化为正式事件，进入标准管线", confidence: ev.confidence || 0.6,
      reasoning: { sections: ["库外→确认演化→升级为 " + lvl + " 正式事件", "按标准管线：发现→移交→待审批→执行→恢复"] },
      alternatives: [], clauses: [],
      chain: [{ role: role, status: "current", actionAt: null }], currentStep: 0, dueAt: tNow + 120,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [], machine: { current: "待审批", allow: ["confirm", "refuse", "takeover"] }
    };
    MOCK.events.push(kid);
    return no;
  }
  global.SimCore = {
    fnv: fnv, hex8: hex8, pad: pad,
    traceId: traceId, auditNo: auditNo, portNo: portNo, signNo: signNo, actionNo: actionNo, jobNo: jobNo, doEscalate: doEscalate,
    levelTimeout: levelTimeout, computeSegments: computeSegments, applyAction: applyAction,
    autoTick: autoTick, buildAuditChain: buildAuditChain, validate: validate
  };
})(window);

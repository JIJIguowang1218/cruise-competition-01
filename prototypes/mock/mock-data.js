/* 演示模拟数据 v0.2 —— 紧凑时长（事件矩形不拉长）、显式库外X、升级为正式事件 */
(function (global) {
  var MIN = 60;
  var phases = [
    { id: "berth-in",   name: "系泊·登船", dur: 25 * MIN },
    { id: "depart",     name: "离泊",      dur: 20 * MIN },
    { id: "sailing",    name: "在航",      dur: 30 * MIN },
    { id: "approach",   name: "靠泊",      dur: 20 * MIN },
    { id: "berth-out",  name: "系泊·离船", dur: 25 * MIN }
  ];
  var total = phases.reduce(function (a, p) { return a + p.dur; }, 0);

  var events = [
    // E01 登船排队过长（L2：值班审，紧凑）
    {
      eventNo: "E01-0001", name: "登船排队过长", type: "E01", level: "L2",
      category: "人流/秩序", semanticType: "任务型", state: "待审批",
      currentRole: "DUTY", needsCaptain: false, pinned: true, flash: false, foldGroup: "L2",
      phase: "berth-in",
      discover: { at: 60, signals: [{ src: "cam/count", at: 58, val: { density: 0.88 } }], confidence: 0.9 },
      handoffs: [{ at: 64, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 64, dueAt: 64 + 30 * 60, outcome: null, decidedAt: null },   // L2 时限 30′
      exec: null, holding: null, peakMark: false,
      recoverAt: null, upgrade: { to: "L3", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },   // v0.4: 确认执行后可“挂起”(琥珀点闭合)
      recheck: { every: 300, reads: [] },          // v0.4: 挂起后周期再检序列（待实例化）
      summary: "增开两通道并发布排队提示", confidence: 0.9,
      reasoning: { sections: ["分类E01 匹配0.91", "长链：叠加高峰→等待>25′→需增容", "方案A增两通道+提示(选)；方案B仅提示(否决)", "若10′未缓解→值班增援"] },
      alternatives: [{ id: "B", reason: "仅发提示不增容" }], clauses: [{ id: "§R8-014", snippet: "排队提示口径" }],
      chain: [{ role: "DUTY", status: "current", actionAt: null }], currentStep: 0, dueAt: 64 + 30 * 60,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "timeout" },
      ports: [{ portCode: "APP", status: "待播报", at: null, content: "排队长，建议错峰" }],
      machine: { current: "待审批", allow: ["confirm", "refuse", "takeover"] }
    },
    // X-0001 库外异常（灰矩形；升级→红线上L3生成正式事件）
    {
      eventNo: "X-0001", name: "库外：某楼层滞留偏离历史", type: "X", level: "L2",
      category: "库外/未分类", semanticType: "持续运营型", state: "待查看",
      currentRole: "DUTY", needsCaptain: false, pinned: true, flash: false, foldGroup: "X",
      phase: "berth-in",
      discover: { at: 240, signals: [{ src: "cam/flow", at: 238, val: { deviate: 1.8 } }], confidence: 0.6 },
      handoffs: [], approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: null, holding: { from: 246, to: null }, peakMark: false,
      recoverAt: null, upgrade: { to: "L3", at: null, reason: "physical" }, outlib: { isX: true, riskLevel: "L2" },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "疑似廊桥拥堵早期信号（推测语气）", confidence: 0.6,
      reasoning: { sections: ["库外识别：未命中E库", "滞留偏离历史1.8σ", "建议观察；处置永远人"] },
      alternatives: [], clauses: [],
      chain: [{ role: "DUTY", status: "current", actionAt: null }], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "physical" },
      ports: [], machine: { current: "待查看", allow: ["ignore", "archive", "escalate"] }
    },
    // E09 台风靠离泊（L3：经理审；船长只读）
    {
      eventNo: "E09-0001", name: "台风靠离泊调整", type: "E09", level: "L3",
      category: "外部环境", semanticType: "任务型", state: "待审批",
      currentRole: "MGR", needsCaptain: false, pinned: false, flash: false, foldGroup: "L3",
      phase: "sailing",
      discover: { at: 700, signals: [{ src: "weather/api", at: 694, val: { wind: 30 } }], confidence: 0.94 },
      handoffs: [{ at: 706, from: "SENSE", to: "MGR", kind: "normal" }],
      approval: { waitStart: 706, dueAt: 706 + 60 * 60, outcome: null, decidedAt: null },   // L3 时限 60′
      exec: null, holding: null, peakMark: false,
      recoverAt: null, upgrade: { to: "L4", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "推迟离泊 2h → 锚地 C", confidence: 0.94,
      reasoning: { sections: ["分类E09 匹配0.94", "长链：照常离泊入30kn侧风→叠加滞留", "条款A05统一口径", "方案A推迟(选)；方案B仅推迟不建口径(否决)"] },
      alternatives: [{ id: "B", reason: "仅推迟不统一口径" }], clauses: [{ id: "§A05", snippet: "统一口径" }],
      chain: [{ role: "MGR", status: "current", actionAt: null }, { role: "CAPT", status: "todo", actionAt: null }],
      currentStep: 0, dueAt: 706 + 60 * 60,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L4", reason: "timeout" },
      ports: [{ portCode: "PA", status: "待播报", at: null, content: "航变通知" }, { portCode: "OTA", status: "待同步", at: null }],
      machine: { current: "待审批", allow: ["confirm", "refuse", "takeover"] }
    }
  ];

  global.MOCK = {
    meta: { schema: "v0.4", voyageNo: "VN-0420", hashType: "fnv1a", createdAt: "2026-08-22", note: "挂起=琥珀点闭合·再检=仅日志·衍生=新事件(parentTrace)" },
    session: { loop: true, total: total, phases: phases, speed: 20 },
    events: events
  };
})(window);

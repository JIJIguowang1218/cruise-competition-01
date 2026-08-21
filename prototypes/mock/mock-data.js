/* 演示模拟数据 v0.3 —— 《事件清单表 v0.3》22 条完整落地（2026-08-22）
 * 时间尺度：清单"车时"分钟 × 60 = 会话内秒（berth-in 0–1500s / depart 1500–2700s /
 *           sailing 2700–4500s / approach 4500–5700s，靠岸即停，total=5700s≈95′）。
 * 等级时限（sim-core levelTimeout）：L1=15′(900s) / L2=30′(1800s) / L3=60′(3600s) / L4=0。
 *
 * 22 条 = 明细表 21 条事件（剔除 2 条"非事件"行：航变风险推理【低信度】、【信度达标】）
 *         + 补 2 条在航(sailing) L1 底噪（A04-L1-03 设备巡检、E21-L1-04 航变询问增多，为 E09 埋线）。
 * 等级分布：X=2 / L4=1 / L3=2 / L2=7 / L1=10（与清单声明一致；明细表在航 L1=3 → 补成 5）。
 * 取舍说明：明细表 23 行（含 2 条非事件）若全部落 + 补 2 条 = 23 条，与声明"22 条 / L1=10"冲突；
 *          故裁剪与 A01-L1-01 完全重复的底噪 A01-L1-02（同名同链路），保留全部 21 个不同事件概念 + 2 条新补。
 *
 * 闭合语义（SCHEMA v0.4）：绿点=recoverAt 恢复；琥珀点=suspend.decidedAt 挂起闭合（再检仅日志）；
 *          关系 A=X/L3→升级（upgrade.at/to，画线由绘制层负责，数据只写锚点）；开放收尾（L4 执行中）可通过校验。
 */
(function (global) {
  var MIN = 60;
  var phases = [
    { id: "berth-in", name: "系泊·登船", dur: 25 * MIN },
    { id: "depart",   name: "离泊",      dur: 20 * MIN },
    { id: "sailing",  name: "在航",      dur: 30 * MIN },
    { id: "approach", name: "靠泊",      dur: 20 * MIN }
  ];
  var total = phases.reduce(function (a, p) { return a + p.dur; }, 0);

  var events = [

    // ============ 登船 berth-in（0–25′ = 0–1500s）============

    // 1. X-0001 登船日楼层滞留偏离历史（X）—— 库外弱信号 ★高地1
    //    观察 → 信度升高 → 升级为 E01-0001（关系A：同一条异常抬头，upgrade.at 在 E01-0001.discover.at 之前）
    {
      eventNo: "X-0001", name: "登船日楼层滞留偏离历史", type: "X", level: "X",
      category: "库外/未分类", semanticType: "持续运营型", state: "已升级(L2)",
      currentRole: "DUTY", needsCaptain: false, pinned: true, flash: false, foldGroup: "X",
      phase: "berth-in",
      discover: { at: 120, signals: [
        { src: "cam/flow", at: 118, val: { deviate: 1.8, note: "楼层滞留偏离历史 1.8σ" } },
        { src: "sensor/floor-density", at: 118, val: { density: 0.72, note: "B 层廊桥区域密度异常抬升" } }
      ], confidence: 0.55 },
      handoffs: [], approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: null, holding: { from: 126, to: 460 }, peakMark: false, recoverAt: null,
      upgrade: { to: "L2", at: 460, reason: "physical" }, outlib: { isX: true, riskLevel: "L2" },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "库外弱信号：观察期信度持续升高（0.55→0.86），按关系A升级为正式事件 E01", confidence: 0.86,
      reasoning: { sections: [
        "库外识别：未命中 E 库模板（当前版本 L1 样本稀疏）",
        "观察 126s→460s：cam/flow 偏离 1.8σ 且楼层密度持续不回落 → 信度 0.55→0.86",
        "信度过阈值 → 升级为 E01-0001（容量型正式事件），关系A升级线由绘制层落线",
        "处置永远是人：升级后进入标准管线，值班确认动作"
      ] },
      alternatives: [{ id: "B", reason: "继续观察不升级（否决：滞留持续 5′+，成本已可预期）" }],
      clauses: [{ id: "§R8-014", snippet: "排队提示口径" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 460 }], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L2", reason: "physical" },
      ports: [], machine: { current: "已升级(L2)", allow: [] }
    },

    // 2. E01-0001 登船口/安检排队过长（L2，由 X-0001 升级）—— 容量型/挂起机制演示
    //    confirm A01+A02 → 执行 → 挂起(琥珀点) → 再检[still,still,recovered]（仅日志）
    {
      eventNo: "E01-0001", name: "登船口/安检排队过长", type: "E01", level: "L2",
      category: "人流/秩序", semanticType: "持续运营型", state: "已关闭(再检恢复)",
      currentRole: "DUTY", needsCaptain: false, pinned: true, flash: false, foldGroup: "L2",
      phase: "berth-in", parentTrace: "1361-9291",   // 血缘：来源 X-0001 的 trace_id（关系A升级；连同 discover.signals[0] 的 x-upgrade 来源标记）
      discover: { at: 460, signals: [
        { src: "x-upgrade", from: "X-0001", at: 460, val: { note: "由库外弱信号 X-0001 升级而来（关系A，discover.at=升级点同 x，语法§8.4 无缝接线）" } },
        { src: "cam/count", at: 458, val: { density: 0.88, queue: "闸机口排队>25 人" } }
      ], confidence: 0.88 },
      handoffs: [{ at: 486, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 486, dueAt: 486 + 30 * MIN, outcome: "confirm", decidedAt: 540 },
      exec: { from: 540, to: 600, port: "CRW", status: "running" }, holding: null, peakMark: false,
      recoverAt: null, upgrade: { to: "L3", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 600, reason: "增开两通道后排队仍超阈值，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: { every: 300, reads: [
        { at: 900,  verdict: "still",     note: "通道扩容到位，队列 25→22 人，仍高于阈值，保持监测（仅日志）" },
        { at: 1260, verdict: "still",     note: "OTA 预约分流生效中，队列 18 人，仍略高，保持监测（仅日志）" },
        { at: 1620, verdict: "recovered", note: "队列回落至 8 人，低于阈值，关闭监测（无新事件）" }
      ] },
      summary: "增开两通道(A01)+错峰提示(A02) → 执行后仍超阈值 → 挂起（琥珀点）→ 三次再检后恢复关闭", confidence: 0.88,
      reasoning: { sections: [
        "分类 E01 匹配 0.91（由 X-0001 升级，信度 0.86→0.88）",
        "处置 A01 扩通道 + A02 错峰提示；10′ 复核队列",
        "540s 确认执行，600s 复核仍超阈值 → 判定挂起（琥珀点闭合，不再占车道）",
        "挂起后走 recheck：still/still/recovered 仅日志，不生成衍生事件"
      ] },
      alternatives: [{ id: "B", reason: "继续派员硬顶不挂起（否决：持续占车道，拒绝长尾占用）" }],
      clauses: [{ id: "§R8-014", snippet: "排队提示口径" }, { id: "§A02", snippet: "错峰提示动作" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 540 }], currentStep: 0, dueAt: 486 + 30 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "timeout" },
      ports: [{ portCode: "APP", status: "已发布", at: 560, content: "排队提示+错峰建议" }],
      machine: { current: "已关闭(再检恢复)", allow: [] }
    },

    // 3. E25-0001 轮椅/行动不便通道受阻（L2）—— 任务型，值班确认 A15 → 执行 → 恢复（绿点）
    {
      eventNo: "E25-0001", name: "轮椅/行动不便通道受阻", type: "E25", level: "L2",
      category: "设施/无障碍", semanticType: "任务型", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L2",
      phase: "berth-in",
      discover: { at: 600, signals: [
        { src: "crw/report", at: 598, val: { note: "B 层无障碍通道被行李堆放阻断" } },
        { src: "cam/flow", at: 598, val: { deviate: 2.1, zone: "wheelchair-lane" } }
      ], confidence: 0.82 },
      handoffs: [{ at: 608, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 608, dueAt: 608 + 30 * MIN, outcome: "confirm", decidedAt: 660 },
      exec: { from: 660, to: 700, port: "CRW", status: "running" }, holding: null, peakMark: false,
      recoverAt: 700, upgrade: { to: "L3", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "值班确认 A15（无障碍通道清障）→ 现场清障完成 → 恢复（绿点）", confidence: 0.82,
      reasoning: { sections: [
        "分类 E25 匹配 0.83：无障碍通道被行李堆阻断",
        "处置 A15：派员清障 + 引导轮椅队列暂走备用通道",
        "660s 确认，700s 现场反馈恢复 → 绿点闭合"
      ] },
      alternatives: [], clauses: [{ id: "§R8-020", snippet: "无障碍保障口径" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 660 }], currentStep: 0, dueAt: 608 + 30 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "timeout" },
      ports: [{ portCode: "CRW", status: "已下发", at: 670, content: "无障碍通道清障指令" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 4. E04-0001 接驳点乘客滞留/巴士晚点（L2）—— 持续运营型 ★弱信号①（靠泊段与 E11 耦合，给高潮埋线）
    //    confirm A01+A09 → 执行 → 挂起(琥珀点) → 再检 still→recovered 收尾
    {
      eventNo: "E04-0001", name: "接驳点乘客滞留/巴士晚点", type: "E04", level: "L2",
      category: "接驳/交通", semanticType: "持续运营型", state: "已关闭(再检恢复)",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L2",
      phase: "berth-in",
      discover: { at: 660, signals: [
        { src: "ota/report", at: 658, val: { busDelay: 25, note: "接驳巴士晚点 25′" } },
        { src: "vis/port", at: 656, val: { note: "港口接驳站排队滞留" } }
      ], confidence: 0.78 },
      handoffs: [{ at: 668, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 668, dueAt: 668 + 30 * MIN, outcome: "confirm", decidedAt: 720 },
      exec: { from: 720, to: 780, port: "CRW", status: "running" }, holding: null, peakMark: true,
      recoverAt: null, upgrade: { to: "L3", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 780, reason: "巴士运力短期无法恢复，判定挂起转入周期再检（琥珀点闭合），为靠泊段 E11 埋线" },
      recheck: { every: 360, reads: [
        { at: 1020, verdict: "still",     note: "巴士仍未到位，滞留持续，保持监测（仅日志）" },
        { at: 1380, verdict: "still",     note: "临时调车 1 辆，滞留略缓但仍超阈值，保持监测（仅日志）" },
        { at: 1740, verdict: "recovered", note: "补班巴士到位，接驳点清空，关闭监测（无新事件）" }
      ] },
      summary: "接驳点滞留+巴士晚点：A01 提示 + A09 调车 → 运力短期不足挂起（琥珀点）→ 再检 still/still/recovered；靠泊段与 E11 接驳中断同源耦合", confidence: 0.78,
      reasoning: { sections: [
        "分类 E04 匹配 0.80：接驳点滞留 + 巴士晚点",
        "处置 A01 乘客提示 + A09 调备用巴士；预警靠泊段接驳中断风险（弱信号①与 E11 耦合）",
        "720s 确认执行，780s 运力仍不足 → 挂起（琥珀点闭合）",
        "挂起后 recheck：still/still/recovered 仅日志；靠泊段同源恶化则触发 E11"
      ] },
      alternatives: [{ id: "B", reason: "持续占车道盯到恢复（否决：挂起后走再检更省车道）" }],
      clauses: [{ id: "§A09", snippet: "接驳运力调车动作" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 720 }], currentStep: 0, dueAt: 668 + 30 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "timeout" },
      ports: [{ portCode: "APP", status: "已发布", at: 740, content: "接驳晚点提示" }, { portCode: "OTA", status: "已同步", at: 750, content: "接驳延误同步" }],
      machine: { current: "已关闭(再检恢复)", allow: [] }
    },

    // 5. A01-L1-01 登船排队提示（自动，L1）—— 底噪：discover→自动 A01→恢复（绿点）
    {
      eventNo: "A01-L1-01", name: "登船排队提示（自动）", type: "A01", level: "L1",
      category: "人流/秩序", semanticType: "自动", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "berth-in",
      discover: { at: 240, signals: [{ src: "cam/count", at: 238, val: { queue: 12, threshold: 15 } }], confidence: 0.9 },
      handoffs: [{ at: 246, from: "SENSE", to: "AUTO", kind: "normal" }],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 246, to: 300, port: "APP", status: "running" }, holding: null, peakMark: false,
      recoverAt: 300, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "自动 A01：闸机排队提示自动下发，队列回落，自动恢复", confidence: 0.9,
      reasoning: { sections: ["自动规则 A01：队列>阈值 → APP 自动提示"] },
      alternatives: [], clauses: [],
      chain: [], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "APP", status: "已自动发布", at: 250, content: "登船排队提示" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 6. E21-L1-01 登船信息反复询问（L1）—— 任务型底噪：值班确认 A01 → 恢复
    {
      eventNo: "E21-L1-01", name: "登船信息反复询问", type: "E21", level: "L1",
      category: "乘客服务", semanticType: "任务型", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "berth-in",
      discover: { at: 300, signals: [{ src: "ota/faq", at: 298, val: { count: 6, note: "登船流程/证件问题集中询问" } }], confidence: 0.85 },
      handoffs: [{ at: 306, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 306, dueAt: 306 + 15 * MIN, outcome: "confirm", decidedAt: 330 },
      exec: { from: 330, to: 360, port: "CRW", status: "running" }, holding: null, peakMark: false,
      recoverAt: 360, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "值班确认 A01（标准答询口径）→ 客服/BOT 应答 → 恢复", confidence: 0.85,
      reasoning: { sections: ["任务型 A01 答询口径，模板化回复 + 人工兜底"] },
      alternatives: [], clauses: [{ id: "§R8-014", snippet: "登船信息口径" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 330 }], currentStep: 0, dueAt: 306 + 15 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "OTA", status: "已同步", at: 340, content: "登船答询口径" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 7. E24-0001 调度指令执行反馈超时（L2）—— 任务型：值班确认 A08 跟踪 → 恢复
    {
      eventNo: "E24-0001", name: "调度指令执行反馈超时", type: "E24", level: "L2",
      category: "运营调度", semanticType: "任务型", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L2",
      phase: "berth-in",
      discover: { at: 720, signals: [{ src: "mgmt/task", at: 718, val: { ttl: 120, note: "行李转运指令 2′ 无回执" } }], confidence: 0.8 },
      handoffs: [{ at: 728, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 728, dueAt: 728 + 30 * MIN, outcome: "confirm", decidedAt: 780 },
      exec: { from: 780, to: 870, port: "MGMT", status: "running" }, holding: null, peakMark: false,
      recoverAt: 870, upgrade: { to: "L3", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "值班确认 A08（跟踪回执）→ 重发指令并人工确认 → 恢复", confidence: 0.8,
      reasoning: { sections: ["调度回执超时 → A08 跟踪重发 + 值班确认落点"] },
      alternatives: [], clauses: [],
      chain: [{ role: "DUTY", status: "done", actionAt: 780 }], currentStep: 0, dueAt: 728 + 30 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "timeout" },
      ports: [{ portCode: "MGMT", status: "已重发", at: 800, content: "调度指令重发" }],
      machine: { current: "已恢复", allow: [] }
    },

    // ============ 离泊 depart（25–45′ = 1500–2700s）============

    // 8. A03-L1-01 离泊信息同步提示（自动，L1）—— 底噪
    {
      eventNo: "A03-L1-01", name: "离泊信息同步提示", type: "A03", level: "L1",
      category: "航次信息", semanticType: "自动", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "depart",
      discover: { at: 1560, signals: [{ src: "mgmt/schedule", at: 1558, val: { note: "离泊作业开始，全端口同步时间戳" } }], confidence: 0.92 },
      handoffs: [{ at: 1566, from: "SENSE", to: "AUTO", kind: "normal" }],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 1566, to: 1620, port: "MGMT", status: "running" }, holding: null, peakMark: false,
      recoverAt: 1620, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "自动 A03：离泊信息全端口同步提示，完成即恢复", confidence: 0.92,
      reasoning: { sections: ["自动规则 A03：离泊时间窗 → 全端口 sync 提示"] },
      alternatives: [], clauses: [],
      chain: [], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "SCR", status: "已同步", at: 1580, content: "离泊时间同步" }],
      machine: { current: "已恢复", allow: [] }
    },

    // ============ 在航 sailing（45–75′ = 2700–4500s）============

    // 9. E27-0001 剧院散场拥挤（L2）—— 持续运营型：确认 A16 分流 → 执行 → 挂起 → 再检[recovered]
    {
      eventNo: "E27-0001", name: "剧院散场拥挤", type: "E27", level: "L2",
      category: "活动/秩序", semanticType: "持续运营型", state: "已关闭(再检恢复)",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L2",
      phase: "sailing",
      discover: { at: 2760, signals: [{ src: "cam/flow", at: 2758, val: { density: 0.91, zone: "theater-exit" } }], confidence: 0.83 },
      handoffs: [{ at: 2768, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 2768, dueAt: 2768 + 30 * MIN, outcome: "confirm", decidedAt: 2820 },
      exec: { from: 2820, to: 2880, port: "CRW", status: "running" }, holding: null, peakMark: true,
      recoverAt: null, upgrade: { to: "L3", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 2880, reason: "散场高峰持续，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: { every: 360, reads: [
        { at: 3120, verdict: "recovered", note: "A16 分流奏效，通道密度回落至阈值下，关闭监测（无新事件）" }
      ] },
      summary: "A16 分流（前后门错峰散场）→ 执行后高峰持续 → 挂起（琥珀点）→ 单次再检 recovered 关闭", confidence: 0.83,
      reasoning: { sections: [
        "覆盖'船上活动拥挤'：剧院散场出口密度 0.91",
        "处置 A16：错峰散场分流 + 船员引导",
        "2820s 确认执行，2880s 高峰仍持续 → 挂起（琥珀点闭合）",
        "3120s 再检 recovered → 关闭监测（仅日志）"
      ] },
      alternatives: [], clauses: [{ id: "§A16", snippet: "散场分流动作" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 2820 }], currentStep: 0, dueAt: 2768 + 30 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "timeout" },
      ports: [{ portCode: "PA", status: "已广播", at: 2840, content: "错峰散场广播" }, { portCode: "SCR", status: "已发布", at: 2845, content: "分流引导图" }],
      machine: { current: "已关闭(再检恢复)", allow: [] }
    },

    // 10. E22-0001 多渠道调度信息不一致（L2）—— 任务型：经理确认 A05 统一口径 → 恢复（绿点）
    {
      eventNo: "E22-0001", name: "多渠道调度信息不一致", type: "E22", level: "L2",
      category: "信息一致性", semanticType: "任务型", state: "已恢复",
      currentRole: "MGR", needsCaptain: false, pinned: false, flash: false, foldGroup: "L2",
      phase: "sailing",
      discover: { at: 3000, signals: [
        { src: "mgmt/audit", at: 2998, val: { note: "SCR 与 APP 靠泊时间口径不一致" } },
        { src: "ota/feedback", at: 2996, val: { note: "乘客端看到两个到港时间" } }
      ], confidence: 0.81 },
      handoffs: [{ at: 3008, from: "SENSE", to: "MGR", kind: "normal" }],
      approval: { waitStart: 3008, dueAt: 3008 + 30 * MIN, outcome: "confirm", decidedAt: 3060 },
      exec: { from: 3060, to: 3180, port: "MGMT", status: "running" }, holding: null, peakMark: false,
      recoverAt: 3180, upgrade: { to: "L4", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "经理确认 A05 统一口径 → 全端口校准 → 恢复", confidence: 0.81,
      reasoning: { sections: ["多渠道口径不一致 → A05 统一口径（单一事实源）→ 全端口校准落点"] },
      alternatives: [], clauses: [{ id: "§A05", snippet: "统一口径动作" }],
      chain: [{ role: "MGR", status: "done", actionAt: 3060 }], currentStep: 0, dueAt: 3008 + 30 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L4", reason: "timeout" },
      ports: [{ portCode: "MGMT", status: "已校准", at: 3100, content: "口径统一" }, { portCode: "APP", status: "已更新", at: 3120, content: "到港时间同步" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 11. E06-0001 电梯/扶梯停运（L2）—— 任务型：值班确认 A04+A11 → 恢复
    {
      eventNo: "E06-0001", name: "电梯/扶梯停运", type: "E06", level: "L2",
      category: "设施/机电", semanticType: "任务型", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L2",
      phase: "sailing",
      discover: { at: 3300, signals: [{ src: "sensor/lift", at: 3298, val: { unit: "L-02", status: "fault" } }], confidence: 0.9 },
      handoffs: [{ at: 3308, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 3308, dueAt: 3308 + 30 * MIN, outcome: "confirm", decidedAt: 3360 },
      exec: { from: 3360, to: 3480, port: "ENG", status: "running" }, holding: null, peakMark: false,
      recoverAt: 3480, upgrade: { to: "L3", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "值班确认 A04（维修派单）+ A11（暂停使用提示）→ 工程修复 → 恢复", confidence: 0.9,
      reasoning: { sections: ["电梯故障 → A04 派单 ENG + A11 乘客提示 → 修复复位"] },
      alternatives: [], clauses: [],
      chain: [{ role: "DUTY", status: "done", actionAt: 3360 }], currentStep: 0, dueAt: 3308 + 30 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L3", reason: "timeout" },
      ports: [{ portCode: "SCR", status: "已发布", at: 3380, content: "电梯暂停使用提示" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 12. X-0002 接驳×离船批次弱信号组合（X）—— 库外弱信号 ★弱信号②（与台风长链耦合）
    //     观察 → 存档观察（琥珀点闭合，无 upgrade.at；关系B：不入正式管线）
    {
      eventNo: "X-0002", name: "接驳×离船批次弱信号组合", type: "X", level: "X",
      category: "库外/未分类", semanticType: "持续运营型", state: "已存档观察",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "X",
      phase: "sailing",
      discover: { at: 3540, signals: [
        { src: "ota/report", at: 3538, val: { note: "接驳预订热度异常（高）" } },
        { src: "vis/port", at: 3536, val: { note: "离船批次编排密度异常（与接驳耦合）" } }
      ], confidence: 0.58 },
      handoffs: [], approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: null, holding: { from: 3546, to: 3660 }, peakMark: false, recoverAt: null,
      upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: true, riskLevel: "L2" },
      suspend: { decidedAt: 3660, reason: "存档观察（琥珀点闭合）：弱信号组合信度不足，不升级为正式事件，供台风长链推演引用" },
      recheck: { every: 300, reads: [] },
      summary: "库外弱信号组合（接驳×离船批次）：观察 2′ 后存档（琥珀点），作为 E09 长链推演的弱信号输入之一", confidence: 0.58,
      reasoning: { sections: [
        "库外识别：未命中 E 库模板（组合式弱信号）",
        "观察 3546s→3660s：单一信号均 < 升级阈值（各自 0.52/0.58）",
        "选型：琥珀点存档闭合（suspend.decidedAt），无 upgrade.at，关系B不入正式管线",
        "与台风长链耦合：接驳×离船批次并入 E09 的 ai-risk 信度计算"
      ] },
      alternatives: [{ id: "B", reason: "强行升级为正式事件（否决：信度不足，避免底噪污染）" }],
      clauses: [], chain: [{ role: "DUTY", status: "done", actionAt: 3660 }], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "physical" },
      ports: [], machine: { current: "已存档", allow: ["escalate"] }
    },

    // 13. A04-L1-01 扶梯维修派单（自动，L1）—— 底噪
    {
      eventNo: "A04-L1-01", name: "扶梯维修派单（自动）", type: "A04", level: "L1",
      category: "设施/机电", semanticType: "自动", state: "已恢复",
      currentRole: "ENG", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "sailing",
      discover: { at: 2940, signals: [{ src: "sensor/escalator", at: 2938, val: { unit: "E-05", status: "vibration" } }], confidence: 0.88 },
      handoffs: [{ at: 2946, from: "SENSE", to: "AUTO", kind: "normal" }],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 2946, to: 3000, port: "ENG", status: "running" }, holding: null, peakMark: false,
      recoverAt: 3000, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "自动 A04：扶梯异常自动派单 ENG，检修确认后自动恢复", confidence: 0.88,
      reasoning: { sections: ["自动规则 A04：振动超阈值 → 自动派单+巡检标记"] },
      alternatives: [], clauses: [],
      chain: [], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "CRW", status: "自动派单", at: 2950, content: "扶梯检修单（ENG 接收）" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 14. A04-L1-02 泵房巡检提示（自动，L1）—— 底噪
    {
      eventNo: "A04-L1-02", name: "泵房巡检提示", type: "A04", level: "L1",
      category: "设施/机电", semanticType: "自动", state: "已恢复",
      currentRole: "ENG", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "sailing",
      discover: { at: 3120, signals: [{ src: "sensor/pump", at: 3118, val: { unit: "P-02", note: "压力波动超例行阈值" } }], confidence: 0.86 },
      handoffs: [{ at: 3126, from: "SENSE", to: "AUTO", kind: "normal" }],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3126, to: 3180, port: "ENG", status: "running" }, holding: null, peakMark: false,
      recoverAt: 3180, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "自动 A04：泵房巡检提示下发 ENG，例行确认后自动恢复", confidence: 0.86,
      reasoning: { sections: ["自动规则 A04：泵房压力例行巡检标记"] },
      alternatives: [], clauses: [],
      chain: [], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "CRW", status: "自动下发", at: 3130, content: "泵房巡检项（ENG 接收）" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 15. E21-L1-02 航变相关乘客询问初现（L1）—— 任务型：值班确认 A01 → 恢复（安抚告知前置）
    {
      eventNo: "E21-L1-02", name: "航变相关乘客询问初现", type: "E21", level: "L1",
      category: "乘客服务", semanticType: "任务型", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "sailing",
      discover: { at: 3240, signals: [{ src: "ota/faq", at: 3238, val: { count: 4, keyword: "台风/靠泊/行程", note: "天气类询问初现" } }], confidence: 0.7 },
      handoffs: [{ at: 3246, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 3246, dueAt: 3246 + 15 * MIN, outcome: "confirm", decidedAt: 3270 },
      exec: { from: 3270, to: 3330, port: "CRW", status: "running" }, holding: null, peakMark: false,
      recoverAt: 3330, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "航变相关询问初现：值班确认 A01 模板答复；为 E09 与 E-L4 安抚告知埋线", confidence: 0.7,
      reasoning: { sections: ["任务型 A01：航变未定案前按'待通知'口径答复", "询问趋势进入 E09 ai-risk 信度输入"] },
      alternatives: [], clauses: [{ id: "§R8-014", snippet: "航变口径（待通知）" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 3270 }], currentStep: 0, dueAt: 3246 + 15 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "OTA", status: "已同步", at: 3280, content: "航变答询口径" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 16. A04-L1-03 泵房/机舱设备巡检（自动，L1）——【本次补 1/2：在航 L1 底噪，凑足 sailing L1=5】
    //     名称微调为"机舱/泵房设备巡检"以区别于 A04-L1-02 泵房巡检提示
    {
      eventNo: "A04-L1-03", name: "机舱/泵房设备巡检（自动）", type: "A04", level: "L1",
      category: "设施/机电", semanticType: "自动", state: "已恢复",
      currentRole: "ENG", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "sailing",
      discover: { at: 3480, signals: [{ src: "sensor/engine", at: 3478, val: { unit: "M-01", note: "机舱例行巡检项自动生成" } }], confidence: 0.9 },
      handoffs: [{ at: 3486, from: "SENSE", to: "AUTO", kind: "normal" }],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3486, to: 3540, port: "ENG", status: "running" }, holding: null, peakMark: false,
      recoverAt: 3540, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "自动 A04：机舱/泵房设备例行巡检自动登记，ENG 例行确认后恢复", confidence: 0.9,
      reasoning: { sections: ["自动规则 A04：设备例行巡检自动登记"] },
      alternatives: [], clauses: [],
      chain: [], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "CRW", status: "自动下发", at: 3490, content: "机舱巡检登记（ENG 接收）" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 17. E21-L1-04 航变相关乘客询问增多（L1）——【本次补 2/2：在航 L1 任务型，为 E09 埋线】
    {
      eventNo: "E21-L1-04", name: "航变相关乘客询问增多", type: "E21", level: "L1",
      category: "乘客服务", semanticType: "任务型", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "sailing",
      discover: { at: 4140, signals: [
        { src: "ota/faq", at: 4138, val: { count: 14, keyword: "台风/行程变更", note: "询问量较初现翻倍" } },
        { src: "ai-risk", at: 4136, val: { note: "并入 E09 信度计算：乘客感知航变风险上升" } }
      ], confidence: 0.78 },
      handoffs: [{ at: 4146, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 4146, dueAt: 4146 + 15 * MIN, outcome: "confirm", decidedAt: 4170 },
      exec: { from: 4170, to: 4260, port: "CRW", status: "running" }, holding: null, peakMark: false,
      recoverAt: 4260, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "航变相关询问增多（任务型）：值班按 A01 口径答复并上报趋势；为 E09（72′ 诞生）埋线", confidence: 0.78,
      reasoning: { sections: [
        "询问量 4→14（vs E21-L1-02），天气/航变关键词集中",
        "任务型 A01 答复 + 将趋势上报为 E09 ai-risk 输入",
        "E09 于 4320s 由'信度达标'升级为正式事件，本条为其数据前哨"
      ] },
      alternatives: [], clauses: [{ id: "§R8-014", snippet: "航变口径（待通知）" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 4170 }], currentStep: 0, dueAt: 4146 + 15 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "OTA", status: "已同步", at: 4180, content: "航变询问统一口径" }],
      machine: { current: "已恢复", allow: [] }
    },

    // ============ 靠泊 approach（75–95′ = 4500–5700s）============

    // 18. E09-0001 台风靠离泊调整（L3，approach）—— 主角根 ★主角
    //     discover 置于 sailing 尾 72′(4320s)，phase 标 approach（清单列在靠泊段）；
    //     由"航变风险推理【信度达标】"非事件诞生（discover.signals 含 ai-risk，本系统 AI 推理产物）；
    //     经理(MGR)审批 → 长链推演判"需整体下船安全再排" → upgrade{at,to:L4,reason:physical}（关系A）→ E-L4-0001
    {
      eventNo: "E09-0001", name: "台风靠离泊调整", type: "E09", level: "L3",
      category: "外部环境/航变", semanticType: "任务型", state: "已升级(L4)",
      currentRole: "MGR", needsCaptain: false, pinned: true, flash: false, foldGroup: "L3",
      phase: "approach",
      discover: { at: 4320, signals: [
        { src: "ai-risk", at: 4315, val: { confidence: "met", note: "本系统 AI 风险推理产物：多源弱信号整合→信度达标→升级为正式事件（SCHEMA §2.6 / 框架 §4.11.5）", sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次)"] } },
        { src: "weather/api", at: 4300, val: { wind: 32, typhoon: "TS-2026-09", note: "靠泊窗口侧风 32kn 超限" } },
        { src: "vis/port", at: 4304, val: { note: "港口泊位调度回执：靠离泊窗口收窄" } }
      ], confidence: 0.92 },
      handoffs: [{ at: 4326, from: "SENSE", to: "MGR", kind: "normal" }],
      approval: { waitStart: 4326, dueAt: 4326 + 60 * MIN, outcome: "confirm", decidedAt: 4560 },
      // 4560 经理确认 → 4560–4620 进入"推演评估执行段"（长链推演：需整体下船安全再排），
      // 4620 评估定论 → 升级红竖线（关系A），E-L4-0001.discover.at=4620 同 x 无缝接线（语法 §8.4）
      exec: { from: 4560, to: 4620, port: "MGMT", status: "running" }, holding: null, peakMark: false, recoverAt: null,
      upgrade: { to: "L4", at: 4620, reason: "physical" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "经理审批确认 → 长链推演（台风×靠泊窗口×离船批次×接驳耦合）判'需整体下船安全再排' → 升级(L4·物理)", confidence: 0.92,
      reasoning: { sections: [
        "分类 E09 匹配 0.92；discover 为系统 AI 风险推理产物（信度达标）",
        "长链推演：照常靠泊入 32kn 侧风 → 叠加 E04 接驳滞留 + X-0002 离船批次弱信号 → 靠泊中断风险 > 方案代价",
        "判定：需整体下船安全再排（不是局部延迟）→ 升级 L4（物理原因），关系A升级线",
        "升级点 4620s 早于 E-L4-0001.discover 4680s，数据预置完整（不依赖运行时 doEscalate）"
      ], pipeline: [
        { step: "signal 采集", detail: "weather/api + vis/port + ota/shuttle + 库外 X-0002 弱信号" },
        { step: "信度分解", detail: "多源一致 0.86→0.92，超过 0.85 阈值（信度达标）" },
        { step: "长链推演", detail: "靠泊窗口收窄 × 离船批次耦合 × 接驳运力不足 → 整体下船再排最优" },
        { step: "条款检索", detail: "§A05 统一口径 / §R8 航变告知 / 离船安全预案" },
        { step: "兜底边界", detail: "最终处置由人拍板：升级 L4 交船长决策" }
      ] },
      alternatives: [
        { id: "B", reason: "仅推迟靠泊窗口（否决：接驳+批次+台风三因素耦合，局部调整无效）" },
        { id: "C", reason: "维持原计划靠泊（否决：32kn 侧风超操作限值）" }
      ],
      clauses: [{ id: "§A05", snippet: "统一口径（航变）" }, { id: "§R8-031", snippet: "离船安全再排预案" }],
      chain: [{ role: "MGR", status: "done", actionAt: 4560 }, { role: "CAPT", status: "todo", actionAt: null }],
      currentStep: 1, dueAt: 4326 + 60 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L4", reason: "physical" },
      ports: [{ portCode: "PA", status: "已播报", at: 4580, content: "航变预告（口径 A05）" }, { portCode: "OTA", status: "已同步", at: 4590, content: "航变口径同步（知情端口）" }],
      machine: { current: "已升级(L4)", allow: [] }
    },

    // 19. E-L4-0001 安全离船/整体下船方案调整（L4，approach）—— 主角详演 ★主角
    //     船长(CAPT)确认（decidedAt 设好，规避 L4 时限=0 的超时自动升级）→ 分组触达 APP/PA/CRW + 安抚告知 LEGAL/OTA（知情端口）
    //     → exec 从确认后开始，exec.to=5700s（靠岸瞬间）；无 recoverAt/无 suspend，state=执行中（开放收尾默认口径）
    {
      eventNo: "E-L4-0001", name: "安全离船/整体下船方案调整", type: "E-L4", level: "L4",
      category: "安全/离船", semanticType: "任务型", state: "执行中",
      currentRole: "CAPT", needsCaptain: true, pinned: true, flash: false, foldGroup: "L4",
      phase: "approach", parentTrace: "68F9-AE29",   // 血缘：来源 E09-0001 的 trace_id（关系A升级；连同 discover.signals[0] 的 escalate 来源标记）
      discover: { at: 4620, signals: [
        { src: "escalate", from: "E09-0001", at: 4620, val: { note: "由 E09 物理升级而来（关系A，upgrade.to=L4；discover.at=升级点同 x，语法§8.4 无缝接线）" } },
        { src: "ai-risk", at: 4615, val: { note: "本系统 AI 推理产物：安抚/赔付风险同步法务/客服端口（SCHEMA §2.6）", payoutRisk: "high" } }
      ], confidence: 0.95 },
      handoffs: [{ at: 4690, from: "SENSE", to: "CAPT", kind: "normal" }],
      // L4 时限=0（引擎 levelTimeout 已修复 falsy 穿透 bug，2026-08-22）：dueAt = waitStart + 0 = 4700；
      // decidedAt=4740 稍晚于 dueAt（船长拍板），outcome 已预置 confirm，不会触发超时升级。
      approval: { waitStart: 4700, dueAt: 4700, outcome: "confirm", decidedAt: 4740 },
      exec: { from: 4740, to: 5700, port: "CRW", status: "running" }, holding: null, peakMark: true,
      recoverAt: null, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "船长确认整体下船安全再排方案 → 分组触达（APP/广播/船员端）+ 安抚告知（法务/客服知情端口）→ 靠岸执行中（片尾=靠岸瞬间）", confidence: 0.95,
      reasoning: { sections: [
        "高地3：推理附件 + 模拟推理后台（长链推演全链路可见）",
        "方案：按甲板/房型分组离船，巴士批次重排（接驳 E04/E11 耦合协调）",
        "安抚告知：法务 LEGAL/客服 OTA 为知情端口，接收 AI 赔付/安抚口径，不反向承担判决",
        "开放收尾：靠岸瞬间（5700s）执行中收尾，制造临场感（清单 §6 待定 1 已按此口径落地）"
      ], pipeline: [
        { step: "信号整合", detail: "E09 长链结论 + E04 接驳滞留 + E11 接驳中断 + 离船批次弱信号" },
        { step: "方案比对", detail: "分组离船(选) vs 分批撤离(否决：窗口不足) vs 停在锚地(否决：气象持续恶化)" },
        { step: "安全推演", detail: "SOLAS 离船秩序 + 人群密度模型 + 无障碍通道保障" },
        { step: "赔付风险", detail: "AI 推理产物 → 同步法务(知情)/客服(口径)，边界=不替人判决" }
      ] },
      alternatives: [
        { id: "B", reason: "分批撤离（否决：靠泊窗口不足，风险更高）" },
        { id: "C", reason: "锚地停留（否决：气象持续恶化）" }
      ],
      clauses: [{ id: "§R8-031", snippet: "离船安全再排预案" }, { id: "§R8-040", snippet: "安抚/赔付告知口径" }],
      chain: [{ role: "CAPT", status: "current", actionAt: 4740 }, { role: "LEGAL", status: "informed", actionAt: 4980 }],
      currentStep: 0, dueAt: 4700,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [
        { portCode: "APP", status: "已触达", at: 4800, content: "整体下船方案通知（分组+时间）" },
        { portCode: "PA", status: "已广播", at: 4860, content: "分组离船广播（按甲板/房型）" },
        { portCode: "CRW", status: "已下发", at: 4920, content: "船员端分组引导指令" },
        // LEGAL 不在引擎端口枚举内（SCHEMA §1.2 散文称其为"知情端口"但 PORT_CODES 无 LEGAL）——
        // 选型：portCode 用 MGMT(内部系统) 承载法务知情同步，另加自定义字段 role:"LEGAL" 标注，validate 不检查附加字段。
        { portCode: "MGMT", status: "已同步(知情)", at: 4980, role: "LEGAL", content: "赔付/安抚口径同步法务 LEGAL（知情端口，不承担判决）" },
        { portCode: "OTA", status: "已同步(知情)", at: 5040, content: "客服安抚口径同步 OTA（知情端口）" }
      ],
      machine: { current: "执行中", allow: ["recover", "suspend"] }
    },

    // 20. E11-0001 接驳中断（L3，approach）—— 次角完整事件（与 E04/E09 耦合）
    //     运营经理(MGR)确认 A09 → 执行 → 恢复（绿点）
    {
      eventNo: "E11-0001", name: "接驳中断", type: "E11", level: "L3",
      category: "接驳/交通", semanticType: "任务型", state: "已恢复",
      currentRole: "MGR", needsCaptain: false, pinned: false, flash: false, foldGroup: "L3",
      phase: "approach",
      discover: { at: 4860, signals: [
        { src: "ota/report", at: 4855, val: { note: "接驳巴士故障/中断（E04 同源恶化）" } },
        { src: "vis/port", at: 4852, val: { shuttle: "outage", note: "港口接驳站中断" } }
      ], confidence: 0.9 },
      handoffs: [{ at: 4866, from: "SENSE", to: "MGR", kind: "normal" }],
      approval: { waitStart: 4866, dueAt: 4866 + 60 * MIN, outcome: "confirm", decidedAt: 4920 },
      exec: { from: 4920, to: 5220, port: "CRW", status: "running" }, holding: null, peakMark: false,
      recoverAt: 5220, upgrade: { to: "L4", at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "运营经理确认 A09（调备用接驳/重排批次）→ 备用运力到位执行 → 恢复（绿点，完整闭环）", confidence: 0.9,
      reasoning: { sections: [
        "E04 靠泊段同源恶化 → E11 接驳中断（与 E09 整体下船方案协同）",
        "处置 A09：备用巴士 + 离船批次重排（对齐 E-L4 分组口径）",
        "4920s 经理确认执行，5220s 运力恢复 → 绿点闭合"
      ] },
      alternatives: [{ id: "B", reason: "仅公告不调车（否决：接驳中断影响离船批次）" }],
      clauses: [{ id: "§A09", snippet: "接驳运力调车动作" }],
      chain: [{ role: "MGR", status: "done", actionAt: 4920 }], currentStep: 0, dueAt: 4866 + 60 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: "L4", reason: "timeout" },
      ports: [{ portCode: "APP", status: "已发布", at: 4940, content: "接驳中断/调整通知" }, { portCode: "OTA", status: "已同步", at: 4950, content: "接驳口径同步" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 21. A01-L1-03 靠泊排队提示（自动，L1）—— 底噪
    {
      eventNo: "A01-L1-03", name: "靠泊排队提示（自动）", type: "A01", level: "L1",
      category: "人流/秩序", semanticType: "自动", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "approach",
      discover: { at: 4740, signals: [{ src: "cam/count", at: 4738, val: { queue: 11, threshold: 15 } }], confidence: 0.9 },
      handoffs: [{ at: 4746, from: "SENSE", to: "AUTO", kind: "normal" }],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 4746, to: 4800, port: "APP", status: "running" }, holding: null, peakMark: false,
      recoverAt: 4800, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "自动 A01：靠泊排队提示自动下发，队列回落，自动恢复", confidence: 0.9,
      reasoning: { sections: ["自动规则 A01：靠泊段队列提示"] },
      alternatives: [], clauses: [],
      chain: [], currentStep: 0, dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "APP", status: "已自动发布", at: 4750, content: "靠泊排队提示" }],
      machine: { current: "已恢复", allow: [] }
    },

    // 22. E21-L1-03 安抚/航变问答（L1，approach）—— 任务型：值班按 L4 口径回复 → 恢复（安抚告知落地）
    {
      eventNo: "E21-L1-03", name: "安抚/航变问答", type: "E21", level: "L1",
      category: "乘客服务", semanticType: "任务型", state: "已恢复",
      currentRole: "DUTY", needsCaptain: false, pinned: false, flash: false, foldGroup: "L1",
      phase: "approach",
      discover: { at: 5100, signals: [
        { src: "ota/faq", at: 5098, val: { count: 18, keyword: "离船/赔付/行程", note: "按 L4 口径的安抚问答集中" } },
        { src: "ai-risk", at: 5095, val: { note: "赔付/安抚告知落地（E-L4 同步 LEGAL/OTA 口径的执行侧）" } }
      ], confidence: 0.8 },
      handoffs: [{ at: 5106, from: "SENSE", to: "DUTY", kind: "normal" }],
      approval: { waitStart: 5106, dueAt: 5106 + 15 * MIN, outcome: "confirm", decidedAt: 5130 },
      exec: { from: 5130, to: 5220, port: "CRW", status: "running" }, holding: null, peakMark: false,
      recoverAt: 5220, upgrade: { to: null, at: null, reason: "timeout" }, outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" }, recheck: { every: 300, reads: [] },
      summary: "值班按 E-L4-0001 统一口径回复安抚/航变问答（赔付告知落地）→ 恢复", confidence: 0.8,
      reasoning: { sections: [
        "任务型：按 L4 方案口径统一答复（安抚告知落地）",
        "引用 E-L4-0001 端口口径（APP/PA/CRW 已触达），与 LEGAL/OTA 知情口径一致"
      ] },
      alternatives: [], clauses: [{ id: "§R8-040", snippet: "安抚/赔付告知口径" }],
      chain: [{ role: "DUTY", status: "done", actionAt: 5130 }], currentStep: 0, dueAt: 5106 + 15 * MIN,
      takeover: { taken: false, by: null, at: null, note: "" }, escalate: { to: null, reason: "timeout" },
      ports: [{ portCode: "OTA", status: "已同步", at: 5140, content: "安抚答询口径" }],
      machine: { current: "已恢复", allow: [] }
    }
  ];

  /* MOCK.riskStates —— 航变风险推理状态（非事件，不占时间轴）
   * 出处：SCHEMA.md §2.6 —— 航变风险 = 本系统 AI 推理模块产物：
   *       多源弱信号 → AI 风险推理 → 信度不足 → 态势图"状态 chip"（不占时间轴）；
   *       信度足够 → 升级为正式事件（E09）进入时间轴。
   *       治理框架 §4.11.5（推理附件与库外异常：弱信号→信度阈值→事件化）。
   * validate() 不检查该字段（仅检查 MOCK.events[]），此处仅为演示叙事与态势图提供状态数据，
   * 两条非事件行（清单 v0.3 #10/#15）即以此形式落地。 */
  var riskStates = [
    { at: 2100, confidence: "low", sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次弱信号)"],
      note: "航变风险推理·信度不足 → 态势图状态 chip，不占时间轴（SCHEMA.md §2.6 / 治理框架 §4.11.5）" },
    { at: 4320, confidence: "met", sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次弱信号)"],
      note: "信度足够 → 升级为 E09 正式事件（SCHEMA.md §2.6 / 治理框架 §4.11.5）；discover.at 与 E09-0001 对齐" }
  ];

  global.MOCK = {
    meta: { schema: "v0.4", voyageNo: "VN-0420", hashType: "fnv1a", createdAt: "2026-08-22",
            note: "22 条清单 v0.3 落地（2026-08-22）·挂起=琥珀点闭合·再检=仅日志·衍生=新事件(parentTrace)" },
    session: { loop: true, total: total, phases: phases, speed: 20 },
    riskStates: riskStates,
    events: events
  };
})(window);
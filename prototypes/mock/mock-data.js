/* 演示模拟数据 v0.5 —— 《事件清单表 v0.5》62 条（2026-08-22，第七轮：主剧情移入在航段）
 * 会话：11:00 登船 → 13:00 靠岸（120′）。时间（秒）= 距 11:00 的分钟×60。
 * 阶段：berth-in 0–1500 / depart 1500–2700 / sailing 2700–6300（主剧情段）/ approach 6300–7200，total=7200s=120′。
 * 叙事：登船高峰 11:10–11:25 → 午餐高峰 11:48–12:14（在航前段）→ 航变预警 12:19–12:22 → 主剧情 12:22–12:32（在航中段）→ 靠泊 12:45–13:00。
 * 系统效率：发现段 自动10–40s/L1 20–60s/L2 30–90s；待审批 L1 20–60s/L2 60–120s；执行段=人作业（长）。
 * 62 条起始时刻全局唯一；峰值并发（1s）L1 ≤9、L2 ≤4；轨道矩形零重叠。
 * 挂起/再检/衍生：E03-0001 upgrade@4560 → 衍生 E03-0001-C1（parentTrace=2323-1B43）；recheck._i 全部预置。
 * 关系 A：X-0001.upgrade.at=460=E01.discover.at；E09.upgrade.at=5220=E-L4.discover.at；待审批起点=移交线。
 */
(function (global) {
  var MIN = 60;
  var phases = [
    { id: "berth-in", name: "系泊·登船", dur: 25 * MIN },
    { id: "depart",   name: "离泊",      dur: 20 * MIN },
    { id: "sailing",  name: "在航",      dur: 60 * MIN },
    { id: "approach", name: "靠泊",      dur: 15 * MIN }
  ];
  var total = phases.reduce(function (a, p) { return a + p.dur; }, 0);

  var events = [

    // ============ 登船 berth-in（0–25′ = 11:00–11:25） ============

    // 1. X-0001 登船日楼层滞留偏离历史
    {
      eventNo: "X-0001",
      name: "登船日楼层滞留偏离历史",
      type: "X",
      level: "X",
      category: "库外/未分类",
      semanticType: "持续运营型",
      state: "已升级(L2)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: true,
      flash: false,
      foldGroup: "X",
      phase: "berth-in",
      discover: {
        at: 120,
        signals: [
          {
            src: "cam/flow",
            at: 118,
            val: { deviate: 1.8, note: "楼层滞留偏离历史 1.8σ" }
          },
          {
            src: "sensor/floor-density",
            at: 118,
            val: { density: 0.72, note: "B 层廊桥区域密度异常抬升" }
          }
        ],
        confidence: 0.55
      },
      handoffs: [],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: null,
      holding: { from: 126, to: 460 },
      peakMark: false,
      recoverAt: null,
      upgrade: { to: "L2", at: 460, reason: "physical" },
      outlib: { isX: true, riskLevel: "L2" },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: []
      },
      summary: "库外弱信号：观察期信度持续升高（0.55→0.86），按关系A升级为正式事件 E01",
      confidence: 0.86,
      reasoning: {
        sections: [
          "① 输入信号（2 路，11:02 前后到达）：cam/flow B 层廊桥区域人流滞留偏离历史基线 1.8σ；sensor/floor-density 楼层密度 0.72 异常抬升。两路独立到达、时间戳对齐，排除单点噪声。",
          "② 事件分类尝试（§4.4 库检索）——未命中：遍历事件库 30 类，E01 排队（无通道队列形态）、E03 容量（密度未超 0.9 关注线）、E07 设施（无设备报警）…全部低于命中线。判定：库外/未分类信号（开放域异常），进入异常风险评估。",
          "③ 异常风险评估（AI 推理）：指标偏离 1.8σ + 密度 0.72 且持续不回落；初始信度 0.55（偏弱，不升级、仅提醒）；风险等级 L2（一般）——滞留持续将传导至登船口排队。按 §4.11.2[4] 路由：送值班船员，抄送运营经理。",
          "④ 观察期验证（126s→460s，约 5.5 分钟）：每 300s 再检一次，偏离未收敛、密度继续爬升；信度 0.55→0.86，跨过升级阈值 0.8。",
          "⑤ 升级判定（11:07:40）：信度 0.86 跨过提醒阈值 → AI 向值班推送升级建议（L2 由值班审核，§4.11.2[4]）；值班（李工）核实滞留属实、传导风险可预期 → 确认升级为 E01-0001 登船口/安检排队过长（容量型），走标准管线，升级线入时间轴（关系 A），并回写事件分类库（闭环学习）。",
          "⑥ 替代方案比较：A 升级为 E01-0001 走标准管线（采纳）；B 继续观察不升级（否决：滞留已持续 5′+，传导成本可预期）。",
          "⑦ 边界声明（§4.11.4）：本附件为说明性存在——AI 判断依据全部可见，但不自动决定任何事；最终处置（确认/拒绝/接管）永远是人。"
        ],
        pipeline: [
          { step: "信号接入", detail: "cam/flow + sensor/floor-density 双路对齐，剔除坏值" },
          { step: "分类失配检查", detail: "30 类模板全部低于命中线 → 标记库外/未分类" },
          { step: "异常风险评估", detail: "偏离 1.8σ + 密度 0.72 不回落 → 风险 L2，信度 0.55" },
          { step: "观察期再检", detail: "300s 间隔 ×2：信度 0.55→0.86，跨提醒阈值 0.8" },
          { step: "升级建议→值班核实", detail: "AI 建议升级 L2 → 值班李工核实滞留属实 → 确认升级 E01-0001（关系 A）" }
        ]
      },
      alternatives: [
        {id: "B", reason: "继续观察不升级（否决：滞留持续 5′+，成本已可预期）"}
      ],
      clauses: [
        {id: "§R8-014", snippet: "排队提示口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 460}
      ],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L2", reason: "physical" },
      ports: [],
      machine: {
        current: "已升级(L2)",
        allow: []
      }
    },
    // 2. E01-0001 登船口/安检排队过长
    {
      eventNo: "E01-0001",
      name: "登船口/安检排队过长",
      type: "E01",
      level: "L2",
      category: "人流/秩序",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: true,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      parentTrace: "1361-9291",
      discover: {
        at: 460,
        signals: [
          {
            src: "x-upgrade",
            from: "X-0001",
            at: 458,
            val: { note: "由库外弱信号 X-0001 升级而来（关系A，discover.at=升级点同 x）" }
          },
          {
            src: "cam/count",
            at: 457,
            val: { density: 0.88, queue: "闸机口排队>25 人" }
          }
        ],
        confidence: 0.88
      },
      handoffs: [
        {at: 486, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 486, dueAt: 2286, outcome: "confirm", decidedAt: 726 },
      exec: { from: 726, to: 1026, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 1026, reason: "增开两通道后排队仍超阈值，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 1380, verdict: "still", note: "通道扩容到位，队列回落但仍高"},
          {at: 1560, verdict: "still", note: "OTA 分流生效中"},
          {at: 1800, verdict: "recovered", note: "队列回落至阈值下，关闭监测"}
        ],
        _i: 3
      },
      summary: "增开两通道(A01)+错峰提示(A02) → 执行后仍超阈值 → 挂起 → 三次再检后恢复关闭",
      confidence: 0.88,
      reasoning: {
        sections: ["分类 E01 匹配 0.91（由 X-0001 升级，信度 0.86→0.88）", "处置 A01 扩通道 + A02 错峰提示；10′ 复核队列", "540s 确认执行，600s 复核仍超阈值 → 判定挂起（挂起闭合，不再占车道）"]
      },
      alternatives: [
        {id: "B", reason: "继续派员硬顶不挂起（否决：持续占车道）"}
      ],
      clauses: [
        {id: "§R8-014", snippet: "排队提示口径"},
        {id: "§A02", snippet: "错峰提示动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 726}
      ],
      currentStep: 0,
      dueAt: 2286,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 766, content: "排队提示+错峰建议"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 3. A01-L1-01 登船排队提示（自动）
    {
      eventNo: "A01-L1-01",
      name: "登船排队提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 60,
        signals: [
          {
            src: "cam/count",
            at: 58,
            val: { queue: 12, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 85, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 85, to: 480, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 480,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A01：闸机排队提示自动下发，队列回落，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["自动规则 A01：队列>阈值 → APP 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已自动发布", at: 125, content: "登船排队提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 4. E21-L1-01 登船信息反复询问
    {
      eventNo: "E21-L1-01",
      name: "登船信息反复询问",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 180,
        signals: [
          {
            src: "ota/faq",
            at: 178,
            val: { count: 6, note: "登船流程/证件问题集中询问" }
          }
        ],
        confidence: 0.85
      },
      handoffs: [
        {at: 226, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 226, dueAt: 1126, outcome: "confirm", decidedAt: 255 },
      exec: { from: 255, to: 570, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 570,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "值班确认 A01（标准答询口径）→ 客服/BOT 应答 → 恢复",
      confidence: 0.85,
      reasoning: {
        sections: ["任务型 A01 答询口径，模板化回复 + 人工兜底"]
      },
      alternatives: [],
      clauses: [
        {id: "§R8-014", snippet: "登船信息口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 255}
      ],
      currentStep: 0,
      dueAt: 1126,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 295, content: "登船答询口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 5. E07-0001 行李传送带缓慢/滞留
    {
      eventNo: "E07-0001",
      name: "行李传送带缓慢/滞留",
      type: "E07",
      level: "L2",
      category: "设施/行李",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      discover: {
        at: 300,
        signals: [
          {
            src: "sensor/belt",
            at: 298,
            val: { belt: "B-01", note: "传送带吞吐率低于 60%" }
          },
          {
            src: "crw/report",
            at: 297,
            val: { note: "行李区积压至登船大厅" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 372, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 372, dueAt: 2172, outcome: "confirm", decidedAt: 484 },
      exec: { from: 484, to: 1020, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 1020, reason: "传送带持续低吞吐，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 1380, verdict: "still", note: "人工转运进行中"},
          {at: 1800, verdict: "recovered", note: "积压清空，吞吐恢复"}
        ],
        _i: 2
      },
      summary: "A01 提示 + A12 人工行李转运 → 吞吐仍低 → 挂起 → 再检 仍同类→复查确认恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["E07 行李传送带低吞吐 → A12 人工转运兜底", "660s 执行中仍无改善 → 900s 挂起，转周期再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A12", snippet: "人工行李转运动作"},
        {id: "§R8-014", snippet: "排队提示口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 484}
      ],
      currentStep: 0,
      dueAt: 2172,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 524, content: "行李提取等待提示"},
        {portCode: "CRW", status: "已下发", at: 564, content: "行李转运增援指令"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 6. E05-0001 廊桥/登船梯临时故障
    {
      eventNo: "E05-0001",
      name: "廊桥/登船梯临时故障",
      type: "E05",
      level: "L2",
      category: "设施/设备",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      discover: {
        at: 340,
        signals: [
          {
            src: "sensor/gangway",
            at: 338,
            val: { unit: "G-02", status: "fault" }
          },
          {
            src: "crw/report",
            at: 337,
            val: { note: "登船梯液压异常" }
          }
        ],
        confidence: 0.86
      },
      handoffs: [
        {at: 406, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 406, dueAt: 2206, outcome: "confirm", decidedAt: 515 },
      exec: { from: 515, to: 1020, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1020,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "A04 通知维修 + A10 启用备用登船梯 → 修复复位，事件闭合",
      confidence: 0.86,
      reasoning: {
        sections: ["E05 廊桥故障 → A04 派单 + A10 备用通道切换", "600s 确认，900s 维修复位 → 恢复"]
      },
      alternatives: [],
      clauses: [
        {id: "§A10", snippet: "启用备用通道动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 515}
      ],
      currentStep: 0,
      dueAt: 2206,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 555, content: "维修+备用通道指令"},
        {portCode: "APP", status: "已发布", at: 595, content: "登船梯调整提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 7. E25-0001 轮椅/行动不便通道受阻
    {
      eventNo: "E25-0001",
      name: "轮椅/行动不便通道受阻",
      type: "E25",
      level: "L2",
      category: "设施/无障碍",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      discover: {
        at: 480,
        signals: [
          {
            src: "crw/report",
            at: 478,
            val: { note: "B 层无障碍通道被行李堆放阻断" }
          },
          {
            src: "cam/flow",
            at: 477,
            val: { deviate: 2.1, zone: "wheelchair-lane" }
          }
        ],
        confidence: 0.82
      },
      handoffs: [
        {at: 561, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 561, dueAt: 2361, outcome: "confirm", decidedAt: 662 },
      exec: { from: 662, to: 1020, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1020,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "值班确认 A15（无障碍通道清障）→ 现场清障完成 → 恢复，事件闭合",
      confidence: 0.82,
      reasoning: {
        sections: ["分类 E25 匹配 0.83：无障碍通道被行李堆阻断", "处置 A15：派员清障 + 轮椅队列走备用通道"]
      },
      alternatives: [],
      clauses: [
        {id: "§R8-020", snippet: "无障碍保障口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 662}
      ],
      currentStep: 0,
      dueAt: 2361,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 702, content: "无障碍通道清障指令"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 8. E04-0001 接驳点乘客滞留/巴士晚点
    {
      eventNo: "E04-0001",
      name: "接驳点乘客滞留/巴士晚点",
      type: "E04",
      level: "L2",
      category: "接驳/交通",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      discover: {
        at: 1120,
        signals: [
          {
            src: "ota/report",
            at: 1118,
            val: { busDelay: 25, note: "接驳巴士晚点 25′" }
          },
          {
            src: "vis/port",
            at: 1117,
            val: { note: "港口接驳站排队滞留" }
          }
        ],
        confidence: 0.78
      },
      handoffs: [
        {at: 1184, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1184, dueAt: 2984, outcome: "confirm", decidedAt: 1302 },
      exec: { from: 1302, to: 1460, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 1460, reason: "巴士运力短期无法恢复，判定挂起转入周期再检（挂起闭合），为靠泊段 E11 埋线" },
      recheck: {
        every: 360,
        reads: [
          {at: 1740, verdict: "still", note: "巴士未到位"},
          {at: 1980, verdict: "still", note: "临时调车仍超阈值"},
          {at: 2220, verdict: "recovered", note: "补班到位，关闭监测"}
        ],
        _i: 3
      },
      summary: "接驳点滞留+巴士晚点：A01 提示 + A09 调车 → 运力不足 → 挂起 → 再检 仍/仍 → 恢复；靠泊段与 E11 同源耦合",
      confidence: 0.78,
      reasoning: {
        sections: ["分类 E04 匹配 0.80：接驳点滞留 + 巴士晚点", "处置 A01 乘客提示 + A09 调备用巴士；预警靠泊段接驳中断风险（与 E11 耦合）", "720s 确认执行，780s 运力仍不足 → 挂起闭合，再检 仍同类/复查确认恢复 仅日志"]
      },
      alternatives: [
        {id: "B", reason: "持续占车道盯到恢复（否决：挂起后走再检更省车道）"}
      ],
      clauses: [
        {id: "§A09", snippet: "接驳运力调车动作"},
        {id: "§R8-014", snippet: "接驳提示口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1302}
      ],
      currentStep: 0,
      dueAt: 2984,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 1342, content: "接驳晚点提示"},
        {portCode: "OTA", status: "已同步", at: 1382, content: "接驳延误同步"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 9. E24-0001 调度指令执行反馈超时
    {
      eventNo: "E24-0001",
      name: "调度指令执行反馈超时",
      type: "E24",
      level: "L2",
      category: "运营调度",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      discover: {
        at: 1080,
        signals: [
          {
            src: "mgmt/task",
            at: 1078,
            val: { ttl: 120, note: "行李转运指令 2′ 无回执" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 1112, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1112, dueAt: 2912, outcome: "confirm", decidedAt: 1220 },
      exec: { from: 1220, to: 1410, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1410,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "值班确认 A08（跟踪回执）→ 重发指令并人工确认 → 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["调度回执超时 → A08 跟踪重发 + 值班确认落点"]
      },
      alternatives: [],
      clauses: [
        {id: "§A08", snippet: "执行回执跟踪动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1220}
      ],
      currentStep: 0,
      dueAt: 2912,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "MGMT", status: "已重发", at: 1260, content: "调度指令重发"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },

    // ============ 离泊 depart（25–45′ = 11:25–11:45） ============

    // 10. A01-L1-02 登船排队提示·波2（自动）
    {
      eventNo: "A01-L1-02",
      name: "登船排队提示·波2（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "depart",
      discover: {
        at: 1600,
        signals: [
          {
            src: "cam/count",
            at: 1598,
            val: { queue: 16, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 1630, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 1630, to: 1960, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1960,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A01：第二波排队提示自动下发，队列回落，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["自动规则 A01：闸机排队第二波 → APP 提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已自动发布", at: 1670, content: "登船排队提示（波2）"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },

    // ============ 登船 berth-in（0–25′ = 11:00–11:25） ============

    // 11. E21-L1-05 行李托运问询（★登船 L1 簇）
    {
      eventNo: "E21-L1-05",
      name: "行李托运问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 640,
        signals: [
          {
            src: "ota/faq",
            at: 638,
            val: { count: 5, keyword: "行李托运" }
          }
        ],
        confidence: 0.84
      },
      handoffs: [
        {at: 666, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 666, dueAt: 1566, outcome: "confirm", decidedAt: 689 },
      exec: { from: 689, to: 890, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 890,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "值班确认 A01 答询口径 → 客服/BOT 回复 → 恢复",
      confidence: 0.84,
      reasoning: {
        sections: ["登船行李问询集中 → A01 统一口径应答"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 689}
      ],
      currentStep: 0,
      dueAt: 1566,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 729, content: "行李托运口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 12. A01-L1-04 登船口分流引导（自动）（★登船 L1 簇）
    {
      eventNo: "A01-L1-04",
      name: "登船口分流引导（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 820,
        signals: [
          {
            src: "cam/flow",
            at: 818,
            val: { density: 0.81, zone: "gate-area" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 837, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 837, to: 1260, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1260,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动分流引导（船载屏），密度回落自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["闸机区密度 0.81 → 自动分流引导"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已自动发布", at: 877, content: "分流引导图"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 13. E21-L1-06 房间/门禁卡问题集中（★登船 L1 簇）
    {
      eventNo: "E21-L1-06",
      name: "房间/门禁卡问题集中",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 790,
        signals: [
          {
            src: "ota/faq",
            at: 788,
            val: { count: 4, keyword: "房卡" }
          }
        ],
        confidence: 0.82
      },
      handoffs: [
        {at: 849, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 849, dueAt: 1749, outcome: "confirm", decidedAt: 884 },
      exec: { from: 884, to: 1210, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1210,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "房卡/门禁问题 → A01 口径 + 前台补卡指引 → 恢复",
      confidence: 0.82,
      reasoning: {
        sections: ["房卡问题集中 → 标准补卡指引"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 884}
      ],
      currentStep: 0,
      dueAt: 1749,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 924, content: "补卡指引"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 14. A01-L1-05 舱房区人流提示（自动）（★登船 L1 簇）
    {
      eventNo: "A01-L1-05",
      name: "舱房区人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 850,
        signals: [
          {
            src: "cam/count",
            at: 848,
            val: { density: 0.78, zone: "cabin-wing" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 869, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 869, to: 1380, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1380,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "舱房走廊人流提示，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["舱房区密度 0.78 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已自动发布", at: 909, content: "舱房区人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 15. E21-L1-07 登船证件/流程问询（★登船 L1 簇）
    {
      eventNo: "E21-L1-07",
      name: "登船证件/流程问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 760,
        signals: [
          {
            src: "ota/faq",
            at: 758,
            val: { count: 6, keyword: "证件" }
          }
        ],
        confidence: 0.83
      },
      handoffs: [
        {at: 787, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 787, dueAt: 1687, outcome: "confirm", decidedAt: 822 },
      exec: { from: 822, to: 1080, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1080,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "证件/流程问询 → A01 口径应答 → 恢复",
      confidence: 0.83,
      reasoning: {
        sections: ["证件流程问询集中 → 标准口径"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 822}
      ],
      currentStep: 0,
      dueAt: 1687,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 862, content: "证件流程口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 16. E21-L1-08 房间位置/寻路问询（★登船 L1 簇）
    {
      eventNo: "E21-L1-08",
      name: "房间位置/寻路问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 670,
        signals: [
          {
            src: "ota/faq",
            at: 668,
            val: { count: 5, keyword: "寻路" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 708, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 708, dueAt: 1608, outcome: "confirm", decidedAt: 738 },
      exec: { from: 738, to: 930, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 930,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "寻路问询 → 地图/引导口径 → 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["登船寻路问询集中 → 引导指引"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 738}
      ],
      currentStep: 0,
      dueAt: 1608,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已同步", at: 778, content: "寻路引导"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 17. A01-L1-06 行李区人流提示（自动）（★登船 L1 簇）
    {
      eventNo: "A01-L1-06",
      name: "行李区人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 730,
        signals: [
          {
            src: "cam/count",
            at: 728,
            val: { density: 0.79, zone: "luggage-hall" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 768, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 768, to: 1030, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1030,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "行李区人流提示，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["行李区密度 0.79 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已自动发布", at: 808, content: "行李区人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 18. E21-L1-09 设施/电梯方向问询（★登船 L1 簇）
    {
      eventNo: "E21-L1-09",
      name: "设施/电梯方向问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 700,
        signals: [
          {
            src: "ota/faq",
            at: 698,
            val: { count: 4, keyword: "电梯/设施" }
          }
        ],
        confidence: 0.81
      },
      handoffs: [
        {at: 725, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 725, dueAt: 1625, outcome: "confirm", decidedAt: 777 },
      exec: { from: 777, to: 980, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 980,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "设施/电梯方向问询 → 指引口径 → 恢复",
      confidence: 0.81,
      reasoning: {
        sections: ["设施问询集中 → 电梯分布指引"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 777}
      ],
      currentStep: 0,
      dueAt: 1625,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已同步", at: 817, content: "设施指引"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 19. A01-L1-07 电梯厅人流提示（自动）（★登船 L1 簇）
    {
      eventNo: "A01-L1-07",
      name: "电梯厅人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "berth-in",
      discover: {
        at: 880,
        signals: [
          {
            src: "cam/count",
            at: 878,
            val: { density: 0.83, zone: "lift-lobby" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 896, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 896, to: 1480, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1480,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "电梯厅人流提示，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["电梯厅密度 0.83 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已自动发布", at: 936, content: "电梯厅人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 20. E07-0002 行李转盘 2 号卡滞
    {
      eventNo: "E07-0002",
      name: "行李转盘 2 号卡滞",
      type: "E07",
      level: "L2",
      category: "设施/行李",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      discover: {
        at: 1100,
        signals: [
          {
            src: "sensor/belt",
            at: 1098,
            val: { belt: "B-02", status: "jammed" }
          },
          {
            src: "crw/report",
            at: 1097,
            val: { note: "转盘 2 号卡滞" }
          }
        ],
        confidence: 0.85
      },
      handoffs: [
        {at: 1140, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1140, dueAt: 2940, outcome: "confirm", decidedAt: 1222 },
      exec: { from: 1222, to: 1460, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1460,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "A04 通知维修 + 人工清障 → 转盘复位，事件闭合",
      confidence: 0.85,
      reasoning: {
        sections: ["转盘卡滞 → A04 派单 + 人工清障"]
      },
      alternatives: [],
      clauses: [
        {id: "§A04", snippet: "维修派单动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1222}
      ],
      currentStep: 0,
      dueAt: 2940,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 1262, content: "转盘清障指令"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 21. E03-0004 电梯厅/回房人流挤塞
    {
      eventNo: "E03-0004",
      name: "电梯厅/回房人流挤塞",
      type: "E03",
      level: "L2",
      category: "人流/秩序",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "berth-in",
      discover: {
        at: 1140,
        signals: [
          {
            src: "cam/flow",
            at: 1138,
            val: { density: 0.87, zone: "lift-lobby" }
          },
          {
            src: "sensor/lift",
            at: 1137,
            val: { note: "回房潮叠加，电梯厅滞留" }
          }
        ],
        confidence: 0.82
      },
      handoffs: [
        {at: 1189, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1189, dueAt: 2989, outcome: "confirm", decidedAt: 1302 },
      exec: { from: 1302, to: 1480, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 1480, reason: "回房高峰为自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 1860, verdict: "recovered", note: "电梯厅密度回落"}
        ],
        _i: 1
      },
      summary: "回房潮电梯厅挤塞 → 分流引导 → 挂起 → 单次再检复查确认恢复",
      confidence: 0.82,
      reasoning: {
        sections: ["登船后回房潮 → 电梯厅密度 0.87", "A16 分流引导 → 自然回落型 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "现场分流动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1302}
      ],
      currentStep: 0,
      dueAt: 2989,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 1342, content: "电梯厅分流引导"},
        {portCode: "CRW", status: "已下发", at: 1382, content: "现场引导"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },

    // ============ 离泊 depart（25–45′ = 11:25–11:45） ============

    // 22. A03-L1-01 离泊信息同步提示
    {
      eventNo: "A03-L1-01",
      name: "离泊信息同步提示",
      type: "A03",
      level: "L1",
      category: "航次信息",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "depart",
      discover: {
        at: 1560,
        signals: [
          {
            src: "mgmt/schedule",
            at: 1558,
            val: { note: "离泊作业开始，全端口同步时间戳" }
          }
        ],
        confidence: 0.92
      },
      handoffs: [
        {at: 1572, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 1572, to: 1980, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1980,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A03：离泊信息全端口同步提示，完成即恢复",
      confidence: 0.92,
      reasoning: {
        sections: ["自动规则 A03：离泊时间窗 → 全端口 sync 提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已同步", at: 1612, content: "离泊时间同步"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 23. A03-L1-02 离泊信息二次同步（自动）
    {
      eventNo: "A03-L1-02",
      name: "离泊信息二次同步（自动）",
      type: "A03",
      level: "L1",
      category: "航次信息",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "depart",
      discover: {
        at: 2000,
        signals: [
          {
            src: "mgmt/schedule",
            at: 1998,
            val: { note: "离泊完成二次确认，端口校准" }
          }
        ],
        confidence: 0.92
      },
      handoffs: [
        {at: 2016, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 2016, to: 2340, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 2340,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A03：离泊完成二次同步，端口校准后恢复",
      confidence: 0.92,
      reasoning: {
        sections: ["自动规则 A03：离泊二次确认 → 端口校准"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "MGMT", status: "已校准", at: 2056, content: "离泊二次同步"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 24. E01-0002 登船口/安检排队·第二波
    {
      eventNo: "E01-0002",
      name: "登船口/安检排队·第二波",
      type: "E01",
      level: "L2",
      category: "人流/秩序",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "depart",
      discover: {
        at: 1980,
        signals: [
          {
            src: "cam/count",
            at: 1978,
            val: { density: 0.85, note: "迟到批次登船，安检口二次排队" }
          },
          {
            src: "ota/report",
            at: 1977,
            val: { note: "末批乘客集中到港" }
          }
        ],
        confidence: 0.84
      },
      handoffs: [
        {at: 2044, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 2044, dueAt: 3844, outcome: "confirm", decidedAt: 2160 },
      exec: { from: 2160, to: 2460, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 2460, reason: "末批人流自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 300,
        reads: [
          {at: 2760, verdict: "still", note: "末批过检中"},
          {at: 3120, verdict: "recovered", note: "安检口清空"}
        ],
        _i: 2
      },
      summary: "登船口排队第二波（隔段再现）→ A01+A02 → 挂起 → 再检 仍同类→复查确认恢复",
      confidence: 0.84,
      reasoning: {
        sections: ["迟到批次 → 安检口二次排队（新事件，非原事件复开）", "A01 提示 + A02 增开通道 → 自然回落 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A02", snippet: "增开备用通道"},
        {id: "§R8-014", snippet: "排队提示口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 2160}
      ],
      currentStep: 0,
      dueAt: 3844,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 2200, content: "末批登船排队提示"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 25. E21-L1-10 午餐/餐厅预约问询
    {
      eventNo: "E21-L1-10",
      name: "午餐/餐厅预约问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "depart",
      discover: {
        at: 2280,
        signals: [
          {
            src: "ota/faq",
            at: 2278,
            val: { count: 5, keyword: "午餐/餐厅" }
          }
        ],
        confidence: 0.82
      },
      handoffs: [
        {at: 2306, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 2306, dueAt: 3206, outcome: "confirm", decidedAt: 2349 },
      exec: { from: 2349, to: 2700, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 2700,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "午餐预约问询 → A01 开放时段口径 → 恢复",
      confidence: 0.82,
      reasoning: {
        sections: ["开餐前预约问询 → 统一口径"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 2349}
      ],
      currentStep: 0,
      dueAt: 3206,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 2389, content: "午餐开放时段口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },

    // ============ 在航 sailing（45–105′ = 11:45–12:45）★主剧情段 ============

    // 26. A03-L1-03 午餐开餐提示（自动）
    {
      eventNo: "A03-L1-03",
      name: "午餐开餐提示（自动）",
      type: "A03",
      level: "L1",
      category: "航次信息",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 2760,
        signals: [
          {
            src: "mgmt/dining",
            at: 2758,
            val: { note: "主餐厅开餐，全端口推送" }
          }
        ],
        confidence: 0.93
      },
      handoffs: [
        {at: 2796, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 2796, to: 3120, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3120,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A03：午餐开餐提示全端口推送，完成即恢复",
      confidence: 0.93,
      reasoning: {
        sections: ["自动规则：开餐时刻 → 全端口开餐提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已自动发布", at: 2836, content: "午餐开餐提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 27. A04-L1-01 扶梯维修派单（自动）
    {
      eventNo: "A04-L1-01",
      name: "扶梯维修派单（自动）",
      type: "A04",
      level: "L1",
      category: "设施/机电",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "ENG",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 2940,
        signals: [
          {
            src: "sensor/escalator",
            at: 2938,
            val: { unit: "E-05", status: "vibration" }
          }
        ],
        confidence: 0.88
      },
      handoffs: [
        {at: 2975, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 2975, to: 3300, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3300,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A04：扶梯异常自动派单 ENG，检修确认后自动恢复",
      confidence: 0.88,
      reasoning: {
        sections: ["自动规则 A04：振动超阈值 → 自动派单+巡检标记"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "自动派单", at: 3015, content: "扶梯检修单（ENG 接收）"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 28. A04-L1-02 泵房巡检提示
    {
      eventNo: "A04-L1-02",
      name: "泵房巡检提示",
      type: "A04",
      level: "L1",
      category: "设施/机电",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "ENG",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3120,
        signals: [
          {
            src: "sensor/pump",
            at: 3118,
            val: { unit: "P-02", note: "压力波动超例行阈值" }
          }
        ],
        confidence: 0.86
      },
      handoffs: [
        {at: 3160, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3160, to: 3480, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3480,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A04：泵房巡检提示下发 ENG，例行确认后自动恢复",
      confidence: 0.86,
      reasoning: {
        sections: ["自动规则 A04：泵房压力例行巡检标记"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "自动下发", at: 3200, content: "泵房巡检项（ENG 接收）"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 29. E27-0001 儿童/家庭活动区拥挤
    {
      eventNo: "E27-0001",
      name: "儿童/家庭活动区拥挤",
      type: "E27",
      level: "L2",
      category: "活动/秩序",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 2820,
        signals: [
          {
            src: "cam/flow",
            at: 2818,
            val: { density: 0.91, zone: "family-zone" }
          }
        ],
        confidence: 0.83
      },
      handoffs: [
        {at: 2864, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 2864, dueAt: 4664, outcome: "confirm", decidedAt: 2971 },
      exec: { from: 2971, to: 3300, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 3300, reason: "活动高峰自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 3660, verdict: "still", note: "家庭区仍拥挤"},
          {at: 3900, verdict: "recovered", note: "活动疏散"}
        ],
        _i: 2
      },
      summary: "儿童/家庭活动区拥挤（E27）→ A16 分流 → 挂起 → 再检 仍同类→复查确认恢复",
      confidence: 0.83,
      reasoning: {
        sections: ["E27 儿童/家庭活动区拥挤（对齐库语义）", "A16 现场分流 → 自然回落 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "现场活动协调动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 2971}
      ],
      currentStep: 0,
      dueAt: 4664,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 3011, content: "活动区分流引导"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 30. E22-0001 多渠道调度信息不一致
    {
      eventNo: "E22-0001",
      name: "多渠道调度信息不一致",
      type: "E22",
      level: "L2",
      category: "信息一致性",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "MGR",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 3060,
        signals: [
          {
            src: "mgmt/audit",
            at: 3058,
            val: { note: "SCR 与 APP 靠泊时间口径不一致" }
          },
          {
            src: "ota/feedback",
            at: 3057,
            val: { note: "乘客端看到两个到港时间" }
          }
        ],
        confidence: 0.81
      },
      handoffs: [
        {at: 3131, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 3131, dueAt: 4931, outcome: "confirm", decidedAt: 3245 },
      exec: { from: 3245, to: 3660, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3660,
      upgrade: { to: "L4", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "经理确认 A05 统一口径 → 全端口校准 → 恢复",
      confidence: 0.81,
      reasoning: {
        sections: ["多渠道口径不一致 → A05 统一口径（单一事实源）→ 全端口校准"]
      },
      alternatives: [],
      clauses: [
        {id: "§A05", snippet: "统一口径动作"}
      ],
      chain: [
        {role: "MGR", status: "done", actionAt: 3245}
      ],
      currentStep: 0,
      dueAt: 4931,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L4", reason: "timeout" },
      ports: [
        {portCode: "MGMT", status: "已校准", at: 3285, content: "口径统一"},
        {portCode: "APP", status: "已更新", at: 3325, content: "到港时间同步"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 31. E21-L1-02 航变相关乘客询问初现
    {
      eventNo: "E21-L1-02",
      name: "航变相关乘客询问初现",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3180,
        signals: [
          {
            src: "ota/faq",
            at: 3178,
            val: { count: 4, keyword: "台风/靠泊/行程", note: "天气类询问初现" }
          }
        ],
        confidence: 0.7
      },
      handoffs: [
        {at: 3220, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3220, dueAt: 4120, outcome: "confirm", decidedAt: 3245 },
      exec: { from: 3245, to: 3480, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3480,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "航变相关询问初现：值班确认 A01 模板答复；为 E09 与 E-L4 安抚告知埋线",
      confidence: 0.7,
      reasoning: {
        sections: ["任务型 A01：航变未定案前按'待通知'口径答复", "询问趋势进入 E09 ai-risk 信度输入"]
      },
      alternatives: [],
      clauses: [
        {id: "§R8-014", snippet: "航变口径（待通知）"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3245}
      ],
      currentStep: 0,
      dueAt: 4120,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3285, content: "航变答询口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 32. E21-L1-11 娱乐活动咨询
    {
      eventNo: "E21-L1-11",
      name: "娱乐活动咨询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3300,
        signals: [
          {
            src: "ota/faq",
            at: 3298,
            val: { count: 4, keyword: "演出/活动" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 3335, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3335, dueAt: 4235, outcome: "confirm", decidedAt: 3360 },
      exec: { from: 3360, to: 3600, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3600,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "娱乐活动咨询 → 节目表口径 → 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["午间娱乐问询 → 统一节目口径"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3360}
      ],
      currentStep: 0,
      dueAt: 4235,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已同步", at: 3400, content: "娱乐活动节目表"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 33. E06-0001 电梯/扶梯停运
    {
      eventNo: "E06-0001",
      name: "电梯/扶梯停运",
      type: "E06",
      level: "L2",
      category: "设施/机电",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 3240,
        signals: [
          {
            src: "sensor/lift",
            at: 3238,
            val: { unit: "L-02", status: "fault" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3323, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3323, dueAt: 5123, outcome: "confirm", decidedAt: 3417 },
      exec: { from: 3417, to: 3780, port: "ENG", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3780,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "值班确认 A04（维修派单）+ A11（暂停使用提示）→ 工程修复 → 恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["电梯故障 → A04 派单 ENG + A11 乘客提示 → 修复复位"]
      },
      alternatives: [],
      clauses: [
        {id: "§A11", snippet: "暂停使用/替代引导动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3417}
      ],
      currentStep: 0,
      dueAt: 5123,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 3457, content: "电梯暂停使用提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 34. A04-L1-03 机舱/泵房设备巡检（自动）
    {
      eventNo: "A04-L1-03",
      name: "机舱/泵房设备巡检（自动）",
      type: "A04",
      level: "L1",
      category: "设施/机电",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "ENG",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3420,
        signals: [
          {
            src: "sensor/engine",
            at: 3418,
            val: { unit: "M-01", note: "机舱例行巡检项自动生成" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3459, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3459, to: 3660, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3660,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A04：机舱/泵房设备例行巡检自动登记，ENG 例行确认后恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["自动规则 A04：设备例行巡检自动登记"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "自动下发", at: 3499, content: "机舱巡检登记（ENG 接收）"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 35. E03-0001 午餐主餐厅高峰·波1
    {
      eventNo: "E03-0001",
      name: "午餐主餐厅高峰·波1",
      type: "E03",
      level: "L2",
      category: "餐饮/人流",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 3000,
        signals: [
          {
            src: "cam/flow",
            at: 2998,
            val: { density: 0.93, zone: "main-dining" }
          },
          {
            src: "ota/report",
            at: 2997,
            val: { note: "午餐开餐 10′ 后主餐厅排队超 20 人" }
          }
        ],
        confidence: 0.87
      },
      handoffs: [
        {at: 3088, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3088, dueAt: 4888, outcome: "confirm", decidedAt: 3154 },
      exec: { from: 3154, to: 3660, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 3660, reason: "午餐用餐周期长，判定挂起转入周期再检（挂起闭合），高峰期长按'再出现'处理" },
      recheck: {
        every: 480,
        reads: [
          {at: 4320, verdict: "still", note: "12:12 排队仍 15+ 人"},
          {at: 4560, verdict: "upgrade", note: "12:16 复燃 → 衍生新事件"}
        ],
        _i: 2
      },
      summary: "午餐主餐厅高峰波1：A01+A16 分流 → 用餐周期长 → 挂起 → 12:16 复燃再检 upgrade → 衍生 E03-0001-C1",
      confidence: 0.87,
      reasoning: {
        sections: ["E03 主餐厅午高峰（人流/秩序类）→ A01 排队提示 + A16 分流", "用餐周期长：3480s 挂起闭合，周期再检 every 480s", "4560s 再检 upgrade（第二波复燃）→ 衍生 E03-0001-C1（关系B：仅日志 parentTrace=2323-1B43，不画线）"]
      },
      alternatives: [
        {id: "B", reason: "持续占车道盯到收餐（否决：用餐周期长，挂起+再检更省车道）"}
      ],
      clauses: [
        {id: "§A01", snippet: "排队提示"},
        {id: "§A16", snippet: "分流动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3154}
      ],
      currentStep: 0,
      dueAt: 4888,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 3194, content: "午餐错峰提示"},
        {portCode: "SCR", status: "已发布", at: 3234, content: "餐厅分流引导"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 36. A01-L1-08 午餐区人流提示（自动）（★午高峰 L1 簇）
    {
      eventNo: "A01-L1-08",
      name: "午餐区人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "餐饮/人流",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3480,
        signals: [
          {
            src: "cam/count",
            at: 3478,
            val: { density: 0.8, zone: "dining-hall" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3505, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3505, to: 4260, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4260,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "午餐区人流自动提示，密度回落自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["餐厅区密度 0.8 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已自动发布", at: 3545, content: "午餐区人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 37. E21-L1-12 座位/预约问询（★午高峰 L1 簇）
    {
      eventNo: "E21-L1-12",
      name: "座位/预约问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3540,
        signals: [
          {
            src: "ota/faq",
            at: 3538,
            val: { count: 5, keyword: "座位" }
          }
        ],
        confidence: 0.81
      },
      handoffs: [
        {at: 3592, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3592, dueAt: 4492, outcome: "confirm", decidedAt: 3612 },
      exec: { from: 3612, to: 3900, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3900,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "座位/预约问询 → A01 口径 → 恢复",
      confidence: 0.81,
      reasoning: {
        sections: ["午高峰座位问询 → 标准口径"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3612}
      ],
      currentStep: 0,
      dueAt: 4492,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3652, content: "座位/预约口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 38. A01-L1-09 甜品台人流提示（自动）（★午高峰 L1 簇）
    {
      eventNo: "A01-L1-09",
      name: "甜品台人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "餐饮/人流",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3600,
        signals: [
          {
            src: "cam/count",
            at: 3598,
            val: { density: 0.82, zone: "dessert-station" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3622, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3622, to: 4080, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4080,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "甜品台人流自动提示，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["甜品台密度 0.82 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已自动发布", at: 3662, content: "甜品台人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 39. E21-L1-13 菜式/开放时段问询（★午高峰 L1 簇）
    {
      eventNo: "E21-L1-13",
      name: "菜式/开放时段问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3660,
        signals: [
          {
            src: "ota/faq",
            at: 3658,
            val: { count: 4, keyword: "菜式" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 3712, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3712, dueAt: 4612, outcome: "confirm", decidedAt: 3766 },
      exec: { from: 3766, to: 3960, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 3960,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "菜式/开放时段问询 → 口径 → 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["午高峰菜式问询 → 统一口径"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3766}
      ],
      currentStep: 0,
      dueAt: 4612,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3806, content: "菜式/时段口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 40. A01-L1-10 剧场入场人流提示（自动）（★午高峰 L1 簇）
    {
      eventNo: "A01-L1-10",
      name: "剧场入场人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3720,
        signals: [
          {
            src: "cam/count",
            at: 3718,
            val: { density: 0.81, zone: "theater-entrance" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3748, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3748, to: 4200, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4200,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "剧场入场人流自动提示，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["剧场入口密度 0.81 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已自动发布", at: 3788, content: "剧场入场提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 41. E21-L1-14 儿童活动问询（★午高峰 L1 簇）
    {
      eventNo: "E21-L1-14",
      name: "儿童活动问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3780,
        signals: [
          {
            src: "ota/faq",
            at: 3778,
            val: { count: 3, keyword: "儿童" }
          }
        ],
        confidence: 0.79
      },
      handoffs: [
        {at: 3821, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3821, dueAt: 4721, outcome: "confirm", decidedAt: 3851 },
      exec: { from: 3851, to: 4050, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4050,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "儿童活动问询 → 活动安排口径 → 恢复",
      confidence: 0.79,
      reasoning: {
        sections: ["儿童活动问询 → 节目安排口径"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3851}
      ],
      currentStep: 0,
      dueAt: 4721,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3891, content: "儿童活动口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 42. A01-L1-11 泳池甲板人流提示（自动）（★午高峰 L1 簇）
    {
      eventNo: "A01-L1-11",
      name: "泳池甲板人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3840,
        signals: [
          {
            src: "cam/count",
            at: 3838,
            val: { density: 0.83, zone: "pool-deck" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3874, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3874, to: 4320, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4320,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "泳池甲板人流自动提示，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["泳池甲板密度 0.83 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已自动发布", at: 3914, content: "泳池甲板人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 43. E21-L1-15 演出时间问询（★午高峰 L1 簇）
    {
      eventNo: "E21-L1-15",
      name: "演出时间问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3900,
        signals: [
          {
            src: "ota/faq",
            at: 3898,
            val: { count: 4, keyword: "演出时间" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 3957, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3957, dueAt: 4857, outcome: "confirm", decidedAt: 4015 },
      exec: { from: 4015, to: 4140, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4140,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "演出时间问询 → 节目表口径 → 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["演出时间问询 → 统一节目表"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4015}
      ],
      currentStep: 0,
      dueAt: 4857,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 4055, content: "演出时间口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 44. A01-L1-12 电梯厅午间人流提示（自动）（★午高峰 L1 簇）
    {
      eventNo: "A01-L1-12",
      name: "电梯厅午间人流提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 3960,
        signals: [
          {
            src: "cam/count",
            at: 3958,
            val: { density: 0.84, zone: "lift-lobby" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3983, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3983, to: 4440, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4440,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "电梯厅午间人流自动提示，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["午间电梯厅密度 0.84 → 自动提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已自动发布", at: 4023, content: "电梯厅午间人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 45. E03-0003 剧场演出入场/散场拥挤
    {
      eventNo: "E03-0003",
      name: "剧场演出入场/散场拥挤",
      type: "E03",
      level: "L2",
      category: "人流/秩序",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 3860,
        signals: [
          {
            src: "cam/flow",
            at: 3858,
            val: { density: 0.9, zone: "theater" }
          },
          {
            src: "ota/report",
            at: 3857,
            val: { note: "演出前后人流叠加" }
          }
        ],
        confidence: 0.85
      },
      handoffs: [
        {at: 3935, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3935, dueAt: 5735, outcome: "confirm", decidedAt: 4007 },
      exec: { from: 4007, to: 4460, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4460, reason: "演出周期人流自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4920, verdict: "recovered", note: "剧场清场"}
        ],
        _i: 1
      },
      summary: "剧场入场/散场拥挤（E03）→ A16 分流 → 挂起 → 再检 仍同类→复查确认恢复",
      confidence: 0.85,
      reasoning: {
        sections: ["剧场人流拥挤（原'剧院散场'改挂 E03，对齐库语义）", "A16 错峰分流 → 自然回落 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "错峰分流动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4007}
      ],
      currentStep: 0,
      dueAt: 5735,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "PA", status: "已广播", at: 4047, content: "错峰入场广播"},
        {portCode: "SCR", status: "已发布", at: 4087, content: "剧场分流引导图"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 46. E03-0002 午餐甜品/收餐台排队
    {
      eventNo: "E03-0002",
      name: "午餐甜品/收餐台排队",
      type: "E03",
      level: "L2",
      category: "餐饮/人流",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 3740,
        signals: [
          {
            src: "cam/count",
            at: 3738,
            val: { density: 0.86, zone: "dessert-station" }
          },
          {
            src: "ota/report",
            at: 3737,
            val: { note: "甜品/收餐台排队超 12 人" }
          }
        ],
        confidence: 0.83
      },
      handoffs: [
        {at: 3828, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3828, dueAt: 5628, outcome: "confirm", decidedAt: 3899 },
      exec: { from: 3899, to: 4240, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4240, reason: "用餐周期自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4740, verdict: "recovered", note: "甜品台回落"}
        ],
        _i: 1
      },
      summary: "甜品/收餐台排队 → 分流 → 挂起 → 再检复查确认恢复",
      confidence: 0.83,
      reasoning: {
        sections: ["甜品台排队 → A16 分流 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "分流引导动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3899}
      ],
      currentStep: 0,
      dueAt: 5628,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 3939, content: "甜品台分流提示"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 47. E27-0002 儿童俱乐部活动拥挤
    {
      eventNo: "E27-0002",
      name: "儿童俱乐部活动拥挤",
      type: "E27",
      level: "L2",
      category: "活动/秩序",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 3680,
        signals: [
          {
            src: "cam/flow",
            at: 3678,
            val: { density: 0.88, zone: "kids-club" }
          },
          {
            src: "crw/report",
            at: 3677,
            val: { note: "儿童俱乐部活动区超容" }
          }
        ],
        confidence: 0.84
      },
      handoffs: [
        {at: 3726, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3726, dueAt: 5526, outcome: "confirm", decidedAt: 3786 },
      exec: { from: 3786, to: 4200, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4200, reason: "活动批次自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4620, verdict: "recovered", note: "活动批次结束"}
        ],
        _i: 1
      },
      summary: "儿童俱乐部活动拥挤（E27）→ A16 协调 → 挂起 → 再检复查确认恢复",
      confidence: 0.84,
      reasoning: {
        sections: ["E27 儿童俱乐部超容 → A16 活动协调 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "活动协调/批次协调动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3786}
      ],
      currentStep: 0,
      dueAt: 5526,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 3826, content: "儿童俱乐部批次协调"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 48. E03-0005 泳池甲板午间高峰
    {
      eventNo: "E03-0005",
      name: "泳池甲板午间高峰",
      type: "E03",
      level: "L2",
      category: "人流/秩序",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      discover: {
        at: 3620,
        signals: [
          {
            src: "cam/count",
            at: 3618,
            val: { density: 0.89, zone: "pool-deck" }
          },
          {
            src: "ota/report",
            at: 3617,
            val: { note: "泳池区午间人流超阈值" }
          }
        ],
        confidence: 0.85
      },
      handoffs: [
        {at: 3669, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3669, dueAt: 5469, outcome: "confirm", decidedAt: 3786 },
      exec: { from: 3786, to: 4280, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4280, reason: "泳池午间自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4740, verdict: "recovered", note: "泳池区回落"}
        ],
        _i: 1
      },
      summary: "泳池甲板午间高峰 → 分流 → 挂起 → 再检复查确认恢复",
      confidence: 0.85,
      reasoning: {
        sections: ["泳池区密度 0.89 → A16 分流 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "分流引导动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3786}
      ],
      currentStep: 0,
      dueAt: 5469,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 3826, content: "泳池区分流提示"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 49. E21-L1-16 航变相关询问·第三波
    {
      eventNo: "E21-L1-16",
      name: "航变相关询问·第三波",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 4740,
        signals: [
          {
            src: "ota/faq",
            at: 4738,
            val: { count: 9, keyword: "台风/靠泊" }
          }
        ],
        confidence: 0.77
      },
      handoffs: [
        {at: 4782, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 4782, dueAt: 5682, outcome: "confirm", decidedAt: 4836 },
      exec: { from: 4836, to: 5100, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5100,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "航变询问第三波（贴 E09 诞生）→ 按'待通知'口径答复",
      confidence: 0.77,
      reasoning: {
        sections: ["询问量 4→9→14 递进，并入 E09 ai-risk 信度输入"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4836}
      ],
      currentStep: 0,
      dueAt: 5682,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 4876, content: "航变待通知口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 50. E21-L1-04 航变相关乘客询问增多
    {
      eventNo: "E21-L1-04",
      name: "航变相关乘客询问增多",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "sailing",
      discover: {
        at: 4800,
        signals: [
          {
            src: "ota/faq",
            at: 4798,
            val: { count: 14, keyword: "台风/行程变更", note: "询问量较初现翻倍" }
          },
          {
            src: "ai-risk",
            at: 4797,
            val: { note: "并入 E09 信度计算：乘客感知航变风险上升" }
          }
        ],
        confidence: 0.78
      },
      handoffs: [
        {at: 4820, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 4820, dueAt: 5720, outcome: "confirm", decidedAt: 4841 },
      exec: { from: 4841, to: 5160, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5160,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "航变相关询问增多：值班按 A01 口径答复并上报趋势；为 E09（12:12 诞生）埋线",
      confidence: 0.78,
      reasoning: {
        sections: ["询问量 4→14，天气/航变关键词集中", "任务型 A01 答复 + 趋势上报为 E09 ai-risk 输入"]
      },
      alternatives: [],
      clauses: [
        {id: "§R8-014", snippet: "航变口径（待通知）"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4841}
      ],
      currentStep: 0,
      dueAt: 5720,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 4881, content: "航变询问统一口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 51. X-0002 接驳×离船批次弱信号组合
    {
      eventNo: "X-0002",
      name: "接驳×离船批次弱信号组合",
      type: "X",
      level: "X",
      category: "库外/未分类",
      semanticType: "持续运营型",
      state: "已存档观察",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "X",
      phase: "sailing",
      discover: {
        at: 4860,
        signals: [
          {
            src: "ota/report",
            at: 4858,
            val: { note: "接驳预订热度异常（高）" }
          },
          {
            src: "vis/port",
            at: 4857,
            val: { note: "离船批次编排密度异常（与接驳耦合）" }
          }
        ],
        confidence: 0.58
      },
      handoffs: [],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: null,
      holding: { from: 4866, to: 4980 },
      peakMark: false,
      recoverAt: null,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: true, riskLevel: "L2" },
      suspend: { decidedAt: 4980, reason: "存档观察（挂起闭合）：弱信号组合信度不足，不升级为正式事件，供台风长链推演引用" },
      recheck: {
        every: 300,
        reads: []
      },
      summary: "库外弱信号组合（接驳×离船批次）：观察后存档（挂起），作为 E09 长链推演的弱信号输入之一",
      confidence: 0.58,
      reasoning: {
        sections: ["库外识别：未命中 E 库模板（组合式弱信号）", "观察 3546s→3660s：单一信号均 < 升级阈值（各自 0.52/0.58）", "选型：挂起存档闭合（suspend.decidedAt），无 upgrade.at，关系B不入正式管线", "与台风长链耦合：接驳×离船批次并入 E09 的 ai-risk 信度计算"]
      },
      alternatives: [
        {id: "B", reason: "强行升级为正式事件（否决：信度不足，避免底噪污染）"}
      ],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3660}
      ],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "physical" },
      ports: [],
      machine: {
        current: "已存档",
        allow: ["escalate"]
      }
    },
    // 52. E09-0001 台风靠离泊调整（★主角/次角）
    {
      eventNo: "E09-0001",
      name: "台风靠离泊调整",
      type: "E09",
      level: "L3",
      category: "外部环境/航变",
      semanticType: "任务型",
      state: "已升级(L4)",
      currentRole: "MGR",
      needsCaptain: false,
      pinned: true,
      flash: false,
      foldGroup: "L3",
      phase: "sailing",
      discover: {
        at: 4920,
        signals: [
          {
            src: "ai-risk",
            at: 4918,
            val: {
              confidence: "met",
              note: "本系统 AI 风险推理产物：多源弱信号整合→信度达标→升级为正式事件（SCHEMA §2.6 / 框架 §4.11.5）",
              sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次)"]
            }
          },
          {
            src: "weather/api",
            at: 4917,
            val: { wind: 32, typhoon: "TS-2026-09", note: "靠泊窗口侧风 32kn 超限" }
          },
          {
            src: "vis/port",
            at: 4916,
            val: { note: "港口泊位调度回执：靠离泊窗口收窄" }
          }
        ],
        confidence: 0.92
      },
      handoffs: [
        {at: 4926, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 4926, dueAt: 8526, outcome: "confirm", decidedAt: 5160 },
      exec: { from: 5160, to: 5220, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: null,
      upgrade: { to: "L4", at: 5220, reason: "physical" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: []
      },
      summary: "经理审批确认 → 长链推演（台风×靠泊窗口×离船批次×接驳耦合）判'需整体下船安全再排' → 升级(L4·物理)",
      confidence: 0.92,
      reasoning: {
        sections: ["分类 E09 匹配 0.92；discover 为系统 AI 风险推理产物（信度达标）", "长链推演：照常靠泊入 32kn 侧风 → 叠加接驳滞留 + 离船批次弱信号 → 靠泊中断风险 > 方案代价", "判定：需整体下船安全再排（不是局部延迟）→ 升级 L4（物理原因），关系A升级线", "升级点 4620s 与 E-L4-0001.discover 4620s 同 x，数据预置完整（不依赖运行时 doEscalate）"],
        pipeline: [
          {step: "signal 采集", detail: "weather/api + vis/port + ota/shuttle + 库外 X-0002 弱信号"},
          {step: "信度分解", detail: "多源一致 0.86→0.92，超过 0.85 阈值（信度达标）"},
          {step: "长链推演", detail: "靠泊窗口收窄 × 离船批次耦合 × 接驳运力不足 → 整体下船再排最优"},
          {step: "条款检索", detail: "§A05 统一口径 / §R8 航变告知 / 离船安全预案"},
          {step: "兜底边界", detail: "最终处置由人拍板：升级 L4 交船长决策"}
        ]
      },
      alternatives: [
        {id: "B", reason: "仅推迟靠泊窗口（否决：接驳+批次+台风三因素耦合，局部调整无效）"},
        {id: "C", reason: "维持原计划靠泊（否决：32kn 侧风超操作限值）"}
      ],
      clauses: [
        {id: "§A05", snippet: "统一口径（航变）"},
        {id: "§R8-031", snippet: "离船安全再排预案"}
      ],
      chain: [
        {role: "MGR", status: "done", actionAt: 5160},
        {role: "CAPT", status: "todo", actionAt: null}
      ],
      currentStep: 1,
      dueAt: 8526,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L4", reason: "physical" },
      ports: [
        {portCode: "PA", status: "已播报", at: 5170, content: "航变预告（口径 A05）"},
        {portCode: "OTA", status: "已同步", at: 5180, content: "航变口径同步（知情端口）"}
      ],
      machine: {
        current: "已升级(L4)",
        allow: []
      }
    },
    // 53. E-L4-0001 安全离船/整体下船方案调整（★主角/次角）
    {
      eventNo: "E-L4-0001",
      name: "安全离船/整体下船方案调整",
      type: "E-L4",
      level: "L4",
      category: "安全/离船",
      semanticType: "任务型",
      state: "执行中",
      currentRole: "CAPT",
      needsCaptain: true,
      pinned: true,
      flash: false,
      foldGroup: "L4",
      phase: "sailing",
      parentTrace: "68F9-AE29",
      discover: {
        at: 5220,
        signals: [
          {
            src: "escalate",
            from: "E09-0001",
            at: 5218,
            val: { note: "由 E09 物理升级而来（关系A，upgrade.to=L4；discover.at=升级点同 x）" }
          },
          {
            src: "ai-risk",
            at: 5217,
            val: { note: "本系统 AI 推理产物：安抚/赔付风险同步法务/客服端口（SCHEMA §2.6）", payoutRisk: "high" }
          }
        ],
        confidence: 0.95
      },
      handoffs: [
        {at: 5290, from: "SENSE", to: "CAPT", kind: "normal"}
      ],
      approval: { waitStart: 5290, dueAt: 5290, outcome: "confirm", decidedAt: 5330 },
      exec: { from: 5330, to: 7200, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: []
      },
      summary: "船长确认整体下船安全再排方案 → 分组触达（APP/广播/船员端）+ 安抚告知（法务/客服知情端口）→ 靠岸执行中（片尾=靠岸瞬间 12:35）",
      confidence: 0.95,
      reasoning: {
        sections: ["高地3：推理附件 + 模拟推理后台（长链推演全链路可见）", "方案：按甲板/房型分组离船，巴士批次重排（接驳 E04/E11 耦合协调）", "安抚告知：法务 LEGAL/客服 OTA 为知情端口，接收 AI 赔付/安抚口径，不反向承担判决", "开放收尾：靠岸瞬间（5700s）执行中收尾，制造临场感"],
        pipeline: [
          {step: "信号整合", detail: "E09 长链结论 + 接驳滞留 + E11 接驳中断 + 离船批次弱信号"},
          {step: "方案比对", detail: "分组离船(选) vs 分批撤离(否决：窗口不足) vs 停在锚地(否决：气象持续恶化)"},
          {step: "安全推演", detail: "SOLAS 离船秩序 + 人群密度模型 + 无障碍通道保障"},
          {step: "赔付风险", detail: "AI 推理产物 → 同步法务(知情)/客服(口径)，边界=不替人判决"}
        ]
      },
      alternatives: [
        {id: "B", reason: "分批撤离（否决：靠泊窗口不足，风险更高）"},
        {id: "C", reason: "锚地停留（否决：气象持续恶化）"}
      ],
      clauses: [
        {id: "§R8-031", snippet: "离船安全再排预案"},
        {id: "§R8-040", snippet: "安抚/赔付告知口径"}
      ],
      chain: [
        {role: "CAPT", status: "current", actionAt: 5330},
        {role: "LEGAL", status: "informed", actionAt: 5810}
      ],
      currentStep: 0,
      dueAt: 5290,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已触达", at: 5390, content: "整体下船方案通知（分组+时间）"},
        {portCode: "PA", status: "已广播", at: 5450, content: "分组离船广播（按甲板/房型）"},
        {portCode: "CRW", status: "已下发", at: 5510, content: "船员端分组引导指令"},
        {portCode: "MGMT", status: "已同步(知情)", at: 5570, role: "LEGAL", content: "赔付/安抚口径同步法务 LEGAL（知情端口）"},
        {portCode: "OTA", status: "已同步(知情)", at: 5630, content: "客服安抚口径同步 OTA（知情端口）"}
      ],
      machine: {
        current: "执行中",
        allow: ["recover", "suspend"]
      }
    },

    // ============ 靠泊 approach（105–120′ = 12:45–13:00） ============

    // 54. A03-L1-04 靠泊信息提示（自动）
    {
      eventNo: "A03-L1-04",
      name: "靠泊信息提示（自动）",
      type: "A03",
      level: "L1",
      category: "航次信息",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "approach",
      discover: {
        at: 6300,
        signals: [
          {
            src: "mgmt/schedule",
            at: 6298,
            val: { note: "靠泊窗口收窄，全端口同步" }
          }
        ],
        confidence: 0.92
      },
      handoffs: [
        {at: 6321, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 6321, to: 6640, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 6640,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A03：靠泊窗口信息全端口同步，完成即恢复",
      confidence: 0.92,
      reasoning: {
        sections: ["自动规则 A03：靠泊窗口 → 全端口同步"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已同步", at: 6361, content: "靠泊窗口提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },

    // ============ 在航 sailing（45–105′ = 11:45–12:45）★主剧情段 ============

    // 55. E03-0001-C1 午餐高峰复燃（衍生自 E03-0001）
    {
      eventNo: "E03-0001-C1",
      name: "午餐高峰复燃（衍生自 E03-0001）",
      type: "E03",
      level: "L2",
      category: "餐饮/人流",
      semanticType: "持续运营型",
      state: "已关闭(再检恢复)",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "sailing",
      parentTrace: "2323-1B43",
      discover: {
        at: 4560,
        signals: [
          {
            src: "recheck/derived",
            at: 4558,
            val: { note: "由 E03-0001 再检 upgrade（12:16 复燃）衍生，parentTrace=2323-1B43（关系B 仅日志，不画线）" }
          },
          {
            src: "cam/count",
            at: 4557,
            val: { density: 0.87, zone: "main-dining" }
          }
        ],
        confidence: 0.78
      },
      handoffs: [
        {at: 4620, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 4620, dueAt: 6420, outcome: "confirm", decidedAt: 4860 },
      exec: { from: 4860, to: 5220, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 5220, reason: "第二波用餐高峰自然回落型，判定挂起转入周期再检（挂起闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 5580, verdict: "recovered", note: "第二波收尾"}
        ],
        _i: 1
      },
      summary: "午餐高峰复燃（衍生自 E03-0001）：12:16 再检 upgrade → 新事件 → 挂起 → 再检复查确认恢复；配合 E-L4 离船口径",
      confidence: 0.78,
      reasoning: {
        sections: ["衍生自 E03-0001（parentTrace 仅日志关联，不画流转线）", "第二波复燃 → A01+A16 分流 → 挂起 + 再检复查确认恢复", "与 E-L4 离船方案并行：餐厅按新离船批次口径同步调整"]
      },
      alternatives: [],
      clauses: [
        {id: "§A01", snippet: "排队提示口径"},
        {id: "§A16", snippet: "分流引导动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4860}
      ],
      currentStep: 0,
      dueAt: 6420,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 4900, content: "午餐错峰提示（波2）"},
        {portCode: "SCR", status: "已发布", at: 4940, content: "餐厅分流引导（对齐离船口径）"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },

    // ============ 靠泊 approach（105–120′ = 12:45–13:00） ============

    // 56. A01-L1-03 靠泊排队提示（自动）
    {
      eventNo: "A01-L1-03",
      name: "靠泊排队提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "approach",
      discover: {
        at: 6380,
        signals: [
          {
            src: "cam/count",
            at: 6378,
            val: { queue: 11, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 6397, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 6397, to: 6680, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 6680,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A01：靠泊排队提示自动下发，队列回落，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["自动规则 A01：靠泊段队列提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已自动发布", at: 6437, content: "靠泊排队提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 57. E21-L1-17 离船顺序问询
    {
      eventNo: "E21-L1-17",
      name: "离船顺序问询",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "approach",
      discover: {
        at: 6420,
        signals: [
          {
            src: "ota/faq",
            at: 6418,
            val: { count: 6, keyword: "离船顺序" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 6455, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 6455, dueAt: 7355, outcome: "confirm", decidedAt: 6508 },
      exec: { from: 6508, to: 6810, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 6810,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "离船顺序问询 → 按 E-L4 分组口径答复 → 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["离船顺序问询 → 引用 E-L4 分组方案口径"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 6508}
      ],
      currentStep: 0,
      dueAt: 7355,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 6548, content: "离船顺序口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },

    // ============ 在航 sailing（45–105′ = 11:45–12:45）★主剧情段 ============

    // 58. E11-0001 接驳中断（★主角/次角）
    {
      eventNo: "E11-0001",
      name: "接驳中断",
      type: "E11",
      level: "L3",
      category: "接驳/交通",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "MGR",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L3",
      phase: "sailing",
      discover: {
        at: 5520,
        signals: [
          {
            src: "ota/report",
            at: 5517,
            val: { note: "接驳巴士故障/中断（E04 同源恶化）" }
          },
          {
            src: "vis/port",
            at: 5516,
            val: { shuttle: "outage", note: "港口接驳站中断" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 5526, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 5526, dueAt: 9126, outcome: "confirm", decidedAt: 5580 },
      exec: { from: 5580, to: 5820, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5820,
      upgrade: { to: "L4", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: []
      },
      summary: "运营经理确认 A09（调备用接驳/重排批次）→ 备用运力到位执行 → 恢复，完整闭环",
      confidence: 0.9,
      reasoning: {
        sections: ["E04 靠泊段同源恶化 → E11 接驳中断（与 E09 整体下船方案协同）", "处置 A09：备用巴士 + 离船批次重排（对齐 E-L4 分组口径）", "4920s 经理确认执行，5220s 运力恢复 → 事件闭合"]
      },
      alternatives: [
        {id: "B", reason: "仅公告不调车（否决：接驳中断影响离船批次）"}
      ],
      clauses: [
        {id: "§A09", snippet: "接驳运力调车动作"}
      ],
      chain: [
        {role: "MGR", status: "done", actionAt: 5580}
      ],
      currentStep: 0,
      dueAt: 9126,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L4", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 5600, content: "接驳中断/调整通知"},
        {portCode: "OTA", status: "已同步", at: 5610, content: "接驳口径同步"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },

    // ============ 靠泊 approach（105–120′ = 12:45–13:00） ============

    // 59. E21-L1-18 航变/离船问答·波2
    {
      eventNo: "E21-L1-18",
      name: "航变/离船问答·波2",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "approach",
      discover: {
        at: 6520,
        signals: [
          {
            src: "ota/faq",
            at: 6518,
            val: { count: 7, keyword: "赔付/离船" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 6565, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 6565, dueAt: 7465, outcome: "confirm", decidedAt: 6590 },
      exec: { from: 6590, to: 6910, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 6910,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "航变/离船问答波2 → 按 L4 口径答复 → 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["引用 E-L4 端口口径（APP/PA/CRW 已触达）统一答复"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 6590}
      ],
      currentStep: 0,
      dueAt: 7465,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 6630, content: "航变/离船口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 60. A01-L1-13 离船排队提示（自动）
    {
      eventNo: "A01-L1-13",
      name: "离船排队提示（自动）",
      type: "A01",
      level: "L1",
      category: "人流/秩序",
      semanticType: "自动",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "approach",
      discover: {
        at: 6640,
        signals: [
          {
            src: "cam/count",
            at: 6638,
            val: { queue: 13, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 6662, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 6662, to: 6880, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 6880,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "自动 A01：离船排队提示自动下发，队列回落，自动恢复",
      confidence: 0.9,
      reasoning: {
        sections: ["自动规则 A01：离船段队列提示"]
      },
      alternatives: [],
      clauses: [],
      chain: [],
      currentStep: 0,
      dueAt: null,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已自动发布", at: 6702, content: "离船排队提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 61. E21-L1-03 安抚/航变问答
    {
      eventNo: "E21-L1-03",
      name: "安抚/航变问答",
      type: "E21",
      level: "L1",
      category: "乘客服务",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "DUTY",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L1",
      phase: "approach",
      discover: {
        at: 6700,
        signals: [
          {
            src: "ota/faq",
            at: 6698,
            val: { count: 18, keyword: "离船/赔付/行程", note: "按 L4 口径的安抚问答集中" }
          },
          {
            src: "ai-risk",
            at: 6697,
            val: { note: "赔付/安抚告知落地（E-L4 同步 LEGAL/OTA 口径的执行侧）" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 6728, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 6728, dueAt: 7628, outcome: "confirm", decidedAt: 6773 },
      exec: { from: 6773, to: 7150, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 7150,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "值班按 E-L4-0001 统一口径回复安抚/航变问答（赔付告知落地）→ 恢复",
      confidence: 0.8,
      reasoning: {
        sections: ["任务型：按 L4 方案口径统一答复（安抚告知落地）", "引用 E-L4-0001 端口口径（APP/PA/CRW 已触达），与 LEGAL/OTA 知情口径一致"]
      },
      alternatives: [],
      clauses: [
        {id: "§R8-040", snippet: "安抚/赔付告知口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 6773}
      ],
      currentStep: 0,
      dueAt: 7628,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 6813, content: "安抚答询口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 62. E02-0001 离船批次重排
    {
      eventNo: "E02-0001",
      name: "离船批次重排",
      type: "E02",
      level: "L2",
      category: "人流/秩序",
      semanticType: "任务型",
      state: "已恢复",
      currentRole: "MGR",
      needsCaptain: false,
      pinned: false,
      flash: false,
      foldGroup: "L2",
      phase: "approach",
      discover: {
        at: 6480,
        signals: [
          {
            src: "mgmt/schedule",
            at: 6478,
            val: { note: "航变后离船批次需按新方案重排" }
          },
          {
            src: "vis/port",
            at: 6477,
            val: { note: "岸侧接驳时段与批次冲突" }
          }
        ],
        confidence: 0.86
      },
      handoffs: [
        {at: 6547, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 6547, dueAt: 8347, outcome: "confirm", decidedAt: 6615 },
      exec: { from: 6615, to: 7050, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 7050,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "离船批次重排（对齐 E-L4 分组方案）→ A03 调整批次 → 恢复，事件闭合",
      confidence: 0.86,
      reasoning: {
        sections: ["E-L4 方案落地侧：批次重排 → A03 调整 + 端口同步", "4920s 经理确认，5280s 批次落地 → 恢复"]
      },
      alternatives: [],
      clauses: [
        {id: "§A03", snippet: "调整离船批次动作"}
      ],
      chain: [
        {role: "MGR", status: "done", actionAt: 6615}
      ],
      currentStep: 0,
      dueAt: 8347,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "MGMT", status: "已校准", at: 6655, content: "离船批次新排"},
        {portCode: "APP", status: "已更新", at: 6695, content: "离船批次通知（分组）"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    }
  ];

  var riskStates = [
      {
        at: 2100,
        confidence: "low",
        sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次弱信号)"],
        note: "11:35 航变风险推理·信度不足 → 态势图状态 chip，不占时间轴（SCHEMA.md §2.6 / 治理框架 §4.11.5）"
      },
      {
        at: 4920,
        confidence: "met",
        sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次弱信号)"],
        note: "12:22 信度足够 → 升级为 E09 正式事件（SCHEMA.md §2.6 / 治理框架 §4.11.5）"
      }
    ];

  global.MOCK = {
    meta: { schema: "v0.4", voyageNo: "VN-0420", hashType: "fnv1a", createdAt: "2026-08-22", voyageStart: "11:00",
            note: "62 条清单 v0.5（2026-08-22）·主剧情在航行段·靠泊12:45-13:00·系统快人慢" },
    session: { loop: true, total: total, phases: phases, speed: 20 },
    riskStates: riskStates,
    events: events
  };
})(window);

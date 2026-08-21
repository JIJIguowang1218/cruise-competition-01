/* 演示模拟数据 v0.5 —— 《事件清单表 v0.5》62 条完整落地（2026-08-22，第三轮修正）
 * 会话：11:00 登船 → 12:35 靠岸（95′）。时间（秒）= 距 11:00 的分钟×60。
 * 阶段：berth-in 0–1500s / depart 1500–2700s / sailing 2700–4500s / approach 4500–5700s，total=5700s≈95′。
 * 等级分布：X=2 / L4=1 / L3=2 / L2=19 / L1=38，共 62 条。
 * 时长尺度（人执行+恢复检测都要时间）：L1 自动 6–10′ / L1 任务 8–13′ / L2 任务 14–22′ / L2 持续(挂起) 12–20′；
 *   所有事件 exec 段一直画到闭合点（琥珀/绿点落在矩形右缘）：执行耗时+恢复确认耗时都计入矩形。
 * 峰值并发（模拟约束，轨道矩形零重叠）：L1 任意瞬间 ≤9（10 轨-1）；L2 ≤4（6 轨-2）。
 *   登船 L1 簇：起始 630–790s 种子随机错峰（9 条，dur 10′）；午高峰 L1 簇：起始 3480–3640s 种子随机错峰（9 条，dur 10′）。
 *   登船 L2 两波各 4 条（波A 11:05–11:18 / 波B 11:17–11:24）；午段 L2 两波（11:50–12:04 / 12:02–12:15），峰值均 ≤4。
 * 阶段纪律：berth-in 全部事件闭合 ≤1500s；登船段仅 排队/行李/客房/房卡/寻路/电梯/证件，无餐饮娱乐。
 * 挂起/再检/衍生（SCHEMA v0.4）：挂起=琥珀点闭合；再检 still/recovered 仅日志；upgrade/accident → 衍生新事件(parentTrace)。
 *   E03-0001 末次再检 upgrade@4560 → 衍生 E03-0001-C1（parentTrace=2323-1B43，关系B 仅日志关联，不画线）。
 *   所有带 reads 的事件预置 recheck._i = reads.length（防止演示运行时重复消费/二次生成）。
 * 关系 A（画升级线）：X-0001.upgrade.at=460=E01.discover.at；E09.upgrade.at=4620=E-L4.discover.at；E09 exec 4560→4620。
 * 待审批段起点=移交竖线落点（语法§12.2）：E-L4 waitStart=4690=handoff，无断口。
 * 等级时限：L1=15′/L2=30′/L3=60′/L4=0（sim-core levelTimeout，L4 falsy bug 已修复）。
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
        sections: ["库外识别：未命中 E 库模板（当前版本 L1 样本稀疏）", "观察 126s→460s：cam/flow 偏离 1.8σ 且楼层密度持续不回落 → 信度 0.55→0.86", "信度过阈值 → 升级为 E01-0001（容量型正式事件），关系A升级线由绘制层落线"]
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
      suspend: { decidedAt: 1026, reason: "增开两通道后排队仍超阈值，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 1380, verdict: "still", note: "通道扩容到位，队列回落但仍高，保持监测"},
          {at: 1560, verdict: "still", note: "OTA 分流生效中，保持监测"},
          {at: 1800, verdict: "recovered", note: "队列回落至阈值下，关闭监测"}
        ],
        _i: 3
      },
      summary: "增开两通道(A01)+错峰提示(A02) → 执行后仍超阈值 → 挂起（琥珀点）→ 三次再检后恢复关闭",
      confidence: 0.88,
      reasoning: {
        sections: ["分类 E01 匹配 0.91（由 X-0001 升级，信度 0.86→0.88）", "处置 A01 扩通道 + A02 错峰提示；10′ 复核队列", "540s 确认执行，600s 复核仍超阈值 → 判定挂起（琥珀点闭合，不再占车道）"]
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
        at: 120,
        signals: [
          {
            src: "cam/count",
            at: 118,
            val: { queue: 12, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 180, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 180, to: 480, port: "APP", status: "running" },
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
        {portCode: "APP", status: "已自动发布", at: 220, content: "登船排队提示"}
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
        {at: 240, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 240, dueAt: 1140, outcome: "confirm", decidedAt: 360 },
      exec: { from: 360, to: 570, port: "CRW", status: "running" },
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
        {role: "DUTY", status: "done", actionAt: 360}
      ],
      currentStep: 0,
      dueAt: 1140,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 400, content: "登船答询口径"}
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
        {at: 360, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 360, dueAt: 2160, outcome: "confirm", decidedAt: 660 },
      exec: { from: 660, to: 1020, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 1020, reason: "传送带持续低吞吐，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 1380, verdict: "still", note: "人工转运进行中，保持监测"},
          {at: 1800, verdict: "recovered", note: "积压清空，吞吐恢复，关闭监测"}
        ],
        _i: 2
      },
      summary: "A01 提示 + A12 人工行李转运 → 吞吐仍低 → 挂起（琥珀点）→ 再检 still/recovered",
      confidence: 0.8,
      reasoning: {
        sections: ["E07 行李传送带低吞吐 → A12 人工转运兜底", "660s 执行中仍无改善 → 900s 挂起，转周期再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A12", snippet: "人工行李转运动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 660}
      ],
      currentStep: 0,
      dueAt: 2160,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 700, content: "行李提取等待提示"},
        {portCode: "CRW", status: "已下发", at: 740, content: "行李转运增援指令"}
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
        at: 300,
        signals: [
          {
            src: "sensor/gangway",
            at: 298,
            val: { unit: "G-02", status: "fault" }
          },
          {
            src: "crw/report",
            at: 297,
            val: { note: "登船梯液压异常" }
          }
        ],
        confidence: 0.86
      },
      handoffs: [
        {at: 360, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 360, dueAt: 2160, outcome: "confirm", decidedAt: 600 },
      exec: { from: 600, to: 1020, port: "CRW", status: "running" },
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
      summary: "A04 通知维修 + A10 启用备用登船梯 → 修复复位（绿点）",
      confidence: 0.86,
      reasoning: {
        sections: ["E05 廊桥故障 → A04 派单 + A10 备用通道切换", "600s 确认，900s 维修复位 → 恢复"]
      },
      alternatives: [],
      clauses: [
        {id: "§A10", snippet: "启用备用通道动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 600}
      ],
      currentStep: 0,
      dueAt: 2160,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 640, content: "维修+备用通道指令"},
        {portCode: "APP", status: "已发布", at: 680, content: "登船梯调整提示"}
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
        {at: 540, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 540, dueAt: 2340, outcome: "confirm", decidedAt: 780 },
      exec: { from: 780, to: 1020, port: "CRW", status: "running" },
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
      summary: "值班确认 A15（无障碍通道清障）→ 现场清障完成 → 恢复（绿点）",
      confidence: 0.82,
      reasoning: {
        sections: ["分类 E25 匹配 0.83：无障碍通道被行李堆阻断", "处置 A15：派员清障 + 轮椅队列走备用通道"]
      },
      alternatives: [],
      clauses: [
        {id: "§R8-020", snippet: "无障碍保障口径"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 780}
      ],
      currentStep: 0,
      dueAt: 2340,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 820, content: "无障碍通道清障指令"}
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
        at: 1040,
        signals: [
          {
            src: "ota/report",
            at: 1038,
            val: { busDelay: 25, note: "接驳巴士晚点 25′" }
          },
          {
            src: "vis/port",
            at: 1037,
            val: { note: "港口接驳站排队滞留" }
          }
        ],
        confidence: 0.78
      },
      handoffs: [
        {at: 1100, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1100, dueAt: 2900, outcome: "confirm", decidedAt: 1340 },
      exec: { from: 1340, to: 1440, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 1440, reason: "巴士运力短期无法恢复，判定挂起转入周期再检（琥珀点闭合），为靠泊段 E11 埋线" },
      recheck: {
        every: 360,
        reads: [
          {at: 1740, verdict: "still", note: "巴士未到位，保持监测"},
          {at: 1980, verdict: "still", note: "临时调车，仍超阈值"},
          {at: 2220, verdict: "recovered", note: "补班到位，关闭监测"}
        ],
        _i: 3
      },
      summary: "接驳点滞留+巴士晚点：A01 提示 + A09 调车 → 运力不足挂起（琥珀点）→ 再检仍/仍/恢复；靠泊段与 E11 同源耦合",
      confidence: 0.78,
      reasoning: {
        sections: ["分类 E04 匹配 0.80：接驳点滞留 + 巴士晚点", "处置 A01 乘客提示 + A09 调备用巴士；预警靠泊段接驳中断风险（与 E11 耦合）", "720s 确认执行，780s 运力仍不足 → 挂起（琥珀点闭合），再检 still/still/recovered 仅日志"]
      },
      alternatives: [
        {id: "B", reason: "持续占车道盯到恢复（否决：挂起后走再检更省车道）"}
      ],
      clauses: [
        {id: "§A09", snippet: "接驳运力调车动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1340}
      ],
      currentStep: 0,
      dueAt: 2900,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 1380, content: "接驳晚点提示"},
        {portCode: "OTA", status: "已同步", at: 1420, content: "接驳延误同步"}
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
        at: 1030,
        signals: [
          {
            src: "mgmt/task",
            at: 1028,
            val: { ttl: 120, note: "行李转运指令 2′ 无回执" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 1090, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1090, dueAt: 2890, outcome: "confirm", decidedAt: 1330 },
      exec: { from: 1330, to: 1440, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1440,
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
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1330}
      ],
      currentStep: 0,
      dueAt: 2890,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "MGMT", status: "已重发", at: 1370, content: "调度指令重发"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
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
      phase: "berth-in",
      discover: {
        at: 1260,
        signals: [
          {
            src: "cam/count",
            at: 1258,
            val: { queue: 16, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 1300, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 1300, to: 1440, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1440,
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
        {portCode: "APP", status: "已自动发布", at: 1340, content: "登船排队提示（波2）"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 11. E21-L1-05 行李托运问询（★登船 L1 并发簇·随机错峰）
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
        at: 761,
        signals: [
          {
            src: "ota/faq",
            at: 759,
            val: { count: 5, keyword: "行李托运" }
          }
        ],
        confidence: 0.84
      },
      handoffs: [
        {at: 821, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 821, dueAt: 1721, outcome: "confirm", decidedAt: 941 },
      exec: { from: 941, to: 1361, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1361,
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
        {role: "DUTY", status: "done", actionAt: 941}
      ],
      currentStep: 0,
      dueAt: 1721,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 981, content: "行李托运口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 12. A01-L1-04 登船口分流引导（自动）（★登船 L1 并发簇·随机错峰）
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
        at: 712,
        signals: [
          {
            src: "cam/flow",
            at: 710,
            val: { density: 0.81, zone: "gate-area" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 772, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 772, to: 1312, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1312,
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
        {portCode: "SCR", status: "已自动发布", at: 812, content: "分流引导图"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 13. E21-L1-06 房间/门禁卡问题集中（★登船 L1 并发簇·随机错峰）
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
        at: 703,
        signals: [
          {
            src: "ota/faq",
            at: 701,
            val: { count: 4, keyword: "房卡" }
          }
        ],
        confidence: 0.82
      },
      handoffs: [
        {at: 763, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 763, dueAt: 1663, outcome: "confirm", decidedAt: 883 },
      exec: { from: 883, to: 1303, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1303,
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
        {role: "DUTY", status: "done", actionAt: 883}
      ],
      currentStep: 0,
      dueAt: 1663,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 923, content: "补卡指引"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 14. A01-L1-05 舱房区人流提示（自动）（★登船 L1 并发簇·随机错峰）
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
        at: 661,
        signals: [
          {
            src: "cam/count",
            at: 659,
            val: { density: 0.78, zone: "cabin-wing" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 721, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 721, to: 1261, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1261,
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
        {portCode: "APP", status: "已自动发布", at: 761, content: "舱房区人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 15. E21-L1-07 登船证件/流程问询（★登船 L1 并发簇·随机错峰）
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
        at: 682,
        signals: [
          {
            src: "ota/faq",
            at: 680,
            val: { count: 6, keyword: "证件" }
          }
        ],
        confidence: 0.83
      },
      handoffs: [
        {at: 742, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 742, dueAt: 1642, outcome: "confirm", decidedAt: 862 },
      exec: { from: 862, to: 1282, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1282,
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
        {role: "DUTY", status: "done", actionAt: 862}
      ],
      currentStep: 0,
      dueAt: 1642,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 902, content: "证件流程口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 16. E21-L1-08 房间位置/寻路问询（★登船 L1 并发簇·随机错峰）
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
        at: 770,
        signals: [
          {
            src: "ota/faq",
            at: 768,
            val: { count: 5, keyword: "寻路" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 830, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 830, dueAt: 1730, outcome: "confirm", decidedAt: 950 },
      exec: { from: 950, to: 1370, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1370,
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
        {role: "DUTY", status: "done", actionAt: 950}
      ],
      currentStep: 0,
      dueAt: 1730,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已同步", at: 990, content: "寻路引导"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 17. A01-L1-06 行李区人流提示（自动）（★登船 L1 并发簇·随机错峰）
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
        at: 664,
        signals: [
          {
            src: "cam/count",
            at: 662,
            val: { density: 0.79, zone: "luggage-hall" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 724, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 724, to: 1264, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1264,
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
        {portCode: "SCR", status: "已自动发布", at: 764, content: "行李区人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 18. E21-L1-09 设施/电梯方向问询（★登船 L1 并发簇·随机错峰）
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
        at: 637,
        signals: [
          {
            src: "ota/faq",
            at: 635,
            val: { count: 4, keyword: "电梯/设施" }
          }
        ],
        confidence: 0.81
      },
      handoffs: [
        {at: 697, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 697, dueAt: 1597, outcome: "confirm", decidedAt: 817 },
      exec: { from: 817, to: 1237, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1237,
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
        {role: "DUTY", status: "done", actionAt: 817}
      ],
      currentStep: 0,
      dueAt: 1597,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已同步", at: 857, content: "设施指引"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 19. A01-L1-07 电梯厅人流提示（自动）（★登船 L1 并发簇·随机错峰）
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
        at: 633,
        signals: [
          {
            src: "cam/count",
            at: 631,
            val: { density: 0.83, zone: "lift-lobby" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 693, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 693, to: 1233, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1233,
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
        {portCode: "SCR", status: "已自动发布", at: 733, content: "电梯厅人流提示"}
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
        at: 1030,
        signals: [
          {
            src: "sensor/belt",
            at: 1028,
            val: { belt: "B-02", status: "jammed" }
          },
          {
            src: "crw/report",
            at: 1027,
            val: { note: "转盘 2 号卡滞" }
          }
        ],
        confidence: 0.85
      },
      handoffs: [
        {at: 1090, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1090, dueAt: 2890, outcome: "confirm", decidedAt: 1330 },
      exec: { from: 1330, to: 1440, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 1440,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "A04 通知维修 + 人工清障 → 转盘复位（绿点）",
      confidence: 0.85,
      reasoning: {
        sections: ["转盘卡滞 → A04 派单 + 人工清障"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1330}
      ],
      currentStep: 0,
      dueAt: 2890,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 1370, content: "转盘清障指令"}
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
        at: 1050,
        signals: [
          {
            src: "cam/flow",
            at: 1048,
            val: { density: 0.87, zone: "lift-lobby" }
          },
          {
            src: "sensor/lift",
            at: 1047,
            val: { note: "回房潮叠加，电梯厅滞留" }
          }
        ],
        confidence: 0.82
      },
      handoffs: [
        {at: 1110, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 1110, dueAt: 2910, outcome: "confirm", decidedAt: 1350 },
      exec: { from: 1350, to: 1440, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 1440, reason: "回房高峰为自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 1860, verdict: "recovered", note: "电梯厅密度回落，关闭监测"}
        ],
        _i: 1
      },
      summary: "回房潮电梯厅挤塞 → 分流引导 → 挂起（琥珀点）→ 单次再检 recovered",
      confidence: 0.82,
      reasoning: {
        sections: ["登船后回房潮 → 电梯厅密度 0.87", "A16 分流引导 → 自然回落型 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "现场分流动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 1350}
      ],
      currentStep: 0,
      dueAt: 2910,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 1390, content: "电梯厅分流引导"},
        {portCode: "CRW", status: "已下发", at: 1430, content: "现场引导"}
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
        {at: 1620, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 1620, to: 1980, port: "MGMT", status: "running" },
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
        {portCode: "SCR", status: "已同步", at: 1660, content: "离泊时间同步"}
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
        at: 1980,
        signals: [
          {
            src: "mgmt/schedule",
            at: 1978,
            val: { note: "离泊完成二次确认，端口校准" }
          }
        ],
        confidence: 0.92
      },
      handoffs: [
        {at: 2040, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 2040, to: 2340, port: "MGMT", status: "running" },
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
        {portCode: "MGMT", status: "已校准", at: 2080, content: "离泊二次同步"}
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
        {at: 2040, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 2040, dueAt: 3840, outcome: "confirm", decidedAt: 2280 },
      exec: { from: 2280, to: 2460, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 2460, reason: "末批人流自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 300,
        reads: [
          {at: 2760, verdict: "still", note: "末批过检中，保持监测"},
          {at: 3120, verdict: "recovered", note: "安检口清空，关闭监测"}
        ],
        _i: 2
      },
      summary: "登船口排队第二波（隔段再现）→ A01+A02 → 挂起（琥珀点）→ 再检 still/recovered",
      confidence: 0.84,
      reasoning: {
        sections: ["迟到批次 → 安检口二次排队（新事件，非原事件复开）", "A01 提示 + A02 增开通道 → 自然回落 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A02", snippet: "增开备用通道"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 2280}
      ],
      currentStep: 0,
      dueAt: 3840,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 2320, content: "末批登船排队提示"}
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
        {at: 2340, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 2340, dueAt: 3240, outcome: "confirm", decidedAt: 2520 },
      exec: { from: 2520, to: 2700, port: "OTA", status: "running" },
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
        {role: "DUTY", status: "done", actionAt: 2520}
      ],
      currentStep: 0,
      dueAt: 3240,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 2560, content: "午餐开放时段口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },

    // ============ 在航 sailing（45–75′ = 11:45–12:15） ============

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
        {at: 2820, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 2820, to: 3120, port: "APP", status: "running" },
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
        {portCode: "APP", status: "已自动发布", at: 2860, content: "午餐开餐提示"}
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
        {at: 3000, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3000, to: 3300, port: "CRW", status: "running" },
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
        {portCode: "CRW", status: "自动派单", at: 3040, content: "扶梯检修单（ENG 接收）"}
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
        {at: 3180, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3180, to: 3480, port: "CRW", status: "running" },
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
        {portCode: "CRW", status: "自动下发", at: 3220, content: "泵房巡检项（ENG 接收）"}
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
        at: 2760,
        signals: [
          {
            src: "cam/flow",
            at: 2758,
            val: { density: 0.91, zone: "family-zone" }
          }
        ],
        confidence: 0.83
      },
      handoffs: [
        {at: 2820, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 2820, dueAt: 4620, outcome: "confirm", decidedAt: 3060 },
      exec: { from: 3060, to: 3300, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 3300, reason: "活动高峰自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 3660, verdict: "still", note: "家庭区仍拥挤，保持监测"},
          {at: 3900, verdict: "recovered", note: "活动疏散，关闭监测"}
        ],
        _i: 2
      },
      summary: "儿童/家庭活动区拥挤（E27）→ A16 分流 → 挂起（琥珀点）→ 再检 still/recovered",
      confidence: 0.83,
      reasoning: {
        sections: ["E27 儿童/家庭活动区拥挤（对齐库语义）", "A16 现场分流 → 自然回落 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "现场活动协调动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3060}
      ],
      currentStep: 0,
      dueAt: 4620,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 3100, content: "活动区分流引导"}
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
        at: 3120,
        signals: [
          {
            src: "mgmt/audit",
            at: 3118,
            val: { note: "SCR 与 APP 靠泊时间口径不一致" }
          },
          {
            src: "ota/feedback",
            at: 3117,
            val: { note: "乘客端看到两个到港时间" }
          }
        ],
        confidence: 0.81
      },
      handoffs: [
        {at: 3180, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 3180, dueAt: 4980, outcome: "confirm", decidedAt: 3420 },
      exec: { from: 3420, to: 3660, port: "MGMT", status: "running" },
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
        {role: "MGR", status: "done", actionAt: 3420}
      ],
      currentStep: 0,
      dueAt: 4980,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L4", reason: "timeout" },
      ports: [
        {portCode: "MGMT", status: "已校准", at: 3460, content: "口径统一"},
        {portCode: "APP", status: "已更新", at: 3500, content: "到港时间同步"}
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
        {at: 3240, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3240, dueAt: 4140, outcome: "confirm", decidedAt: 3360 },
      exec: { from: 3360, to: 3480, port: "CRW", status: "running" },
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
        {role: "DUTY", status: "done", actionAt: 3360}
      ],
      currentStep: 0,
      dueAt: 4140,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3400, content: "航变答询口径"}
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
        {at: 3360, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3360, dueAt: 4260, outcome: "confirm", decidedAt: 3480 },
      exec: { from: 3480, to: 3600, port: "OTA", status: "running" },
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
        {role: "DUTY", status: "done", actionAt: 3480}
      ],
      currentStep: 0,
      dueAt: 4260,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已同步", at: 3520, content: "娱乐活动节目表"}
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
        at: 3120,
        signals: [
          {
            src: "sensor/lift",
            at: 3118,
            val: { unit: "L-02", status: "fault" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3180, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3180, dueAt: 4980, outcome: "confirm", decidedAt: 3420 },
      exec: { from: 3420, to: 3780, port: "ENG", status: "running" },
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
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3420}
      ],
      currentStep: 0,
      dueAt: 4980,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 3460, content: "电梯暂停使用提示"}
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
        {at: 3480, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3480, to: 3600, port: "CRW", status: "running" },
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
        {portCode: "CRW", status: "自动下发", at: 3520, content: "机舱巡检登记（ENG 接收）"}
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
        {at: 3060, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3060, dueAt: 4860, outcome: "confirm", decidedAt: 3360 },
      exec: { from: 3360, to: 3840, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 3840, reason: "午餐用餐周期长，判定挂起转入周期再检（琥珀点闭合），高峰期长按'再出现'处理" },
      recheck: {
        every: 480,
        reads: [
          {at: 4320, verdict: "still", note: "12:12 排队仍 15+ 人，保持监测"},
          {at: 4560, verdict: "upgrade", note: "12:16 复燃，排队再超阈值 → 衍生新事件"}
        ],
        _i: 2
      },
      summary: "午餐主餐厅高峰波1：A01+A16 分流 → 用餐周期长挂起（琥珀点）→ 12:16 复燃再检 upgrade → 衍生 E03-0001-C1",
      confidence: 0.87,
      reasoning: {
        sections: ["E03 主餐厅午高峰（人流/秩序类）→ A01 排队提示 + A16 分流", "用餐周期长：3480s 挂起（琥珀点闭合），周期再检 every 480s", "4560s 再检 upgrade（第二波复燃）→ 衍生 E03-0001-C1（关系B：仅日志 parentTrace=2323-1B43，不画线）"]
      },
      alternatives: [
        {id: "B", reason: "持续占车道盯到收餐（否决：用餐周期长，挂起+再检更省车道）"}
      ],
      clauses: [
        {id: "§A01", snippet: "排队提示"},
        {id: "§A16", snippet: "分流动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 3360}
      ],
      currentStep: 0,
      dueAt: 4860,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 3400, content: "午餐错峰提示"},
        {portCode: "SCR", status: "已发布", at: 3440, content: "餐厅分流引导"}
      ],
      machine: {
        current: "已关闭(再检恢复)",
        allow: []
      }
    },
    // 36. A01-L1-08 午餐区人流提示（自动）（★午高峰 L1 并发簇·随机错峰）
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
        {at: 3540, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3540, to: 4080, port: "APP", status: "running" },
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
        {portCode: "APP", status: "已自动发布", at: 3580, content: "午餐区人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 37. E21-L1-12 座位/预约问询（★午高峰 L1 并发簇·随机错峰）
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
        at: 3550,
        signals: [
          {
            src: "ota/faq",
            at: 3548,
            val: { count: 5, keyword: "座位" }
          }
        ],
        confidence: 0.81
      },
      handoffs: [
        {at: 3610, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3610, dueAt: 4510, outcome: "confirm", decidedAt: 3730 },
      exec: { from: 3730, to: 4150, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4150,
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
        {role: "DUTY", status: "done", actionAt: 3730}
      ],
      currentStep: 0,
      dueAt: 4510,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3770, content: "座位/预约口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 38. A01-L1-09 甜品台人流提示（自动）（★午高峰 L1 并发簇·随机错峰）
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
        at: 3563,
        signals: [
          {
            src: "cam/count",
            at: 3561,
            val: { density: 0.82, zone: "dessert-station" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3623, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3623, to: 4163, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4163,
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
        {portCode: "SCR", status: "已自动发布", at: 3663, content: "甜品台人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 39. E21-L1-13 菜式/开放时段问询（★午高峰 L1 并发簇·随机错峰）
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
        at: 3566,
        signals: [
          {
            src: "ota/faq",
            at: 3564,
            val: { count: 4, keyword: "菜式" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 3626, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3626, dueAt: 4526, outcome: "confirm", decidedAt: 3746 },
      exec: { from: 3746, to: 4166, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4166,
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
        {role: "DUTY", status: "done", actionAt: 3746}
      ],
      currentStep: 0,
      dueAt: 4526,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3786, content: "菜式/时段口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 40. A01-L1-10 剧场入场人流提示（自动）（★午高峰 L1 并发簇·随机错峰）
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
        at: 3552,
        signals: [
          {
            src: "cam/count",
            at: 3550,
            val: { density: 0.81, zone: "theater-entrance" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3612, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3612, to: 4152, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4152,
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
        {portCode: "SCR", status: "已自动发布", at: 3652, content: "剧场入场提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 41. E21-L1-14 儿童活动问询（★午高峰 L1 并发簇·随机错峰）
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
        at: 3547,
        signals: [
          {
            src: "ota/faq",
            at: 3545,
            val: { count: 3, keyword: "儿童" }
          }
        ],
        confidence: 0.79
      },
      handoffs: [
        {at: 3607, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3607, dueAt: 4507, outcome: "confirm", decidedAt: 3727 },
      exec: { from: 3727, to: 4147, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4147,
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
        {role: "DUTY", status: "done", actionAt: 3727}
      ],
      currentStep: 0,
      dueAt: 4507,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3767, content: "儿童活动口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 42. A01-L1-11 泳池甲板人流提示（自动）（★午高峰 L1 并发簇·随机错峰）
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
        at: 3609,
        signals: [
          {
            src: "cam/count",
            at: 3607,
            val: { density: 0.83, zone: "pool-deck" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3669, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3669, to: 4209, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4209,
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
        {portCode: "SCR", status: "已自动发布", at: 3709, content: "泳池甲板人流提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 43. E21-L1-15 演出时间问询（★午高峰 L1 并发簇·随机错峰）
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
        at: 3624,
        signals: [
          {
            src: "ota/faq",
            at: 3622,
            val: { count: 4, keyword: "演出时间" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 3684, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3684, dueAt: 4584, outcome: "confirm", decidedAt: 3804 },
      exec: { from: 3804, to: 4224, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4224,
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
        {role: "DUTY", status: "done", actionAt: 3804}
      ],
      currentStep: 0,
      dueAt: 4584,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 3844, content: "演出时间口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 44. A01-L1-12 电梯厅午间人流提示（自动）（★午高峰 L1 并发簇·随机错峰）
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
        at: 3532,
        signals: [
          {
            src: "cam/count",
            at: 3530,
            val: { density: 0.84, zone: "lift-lobby" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 3592, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 3592, to: 4132, port: "SCR", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4132,
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
        {portCode: "SCR", status: "已自动发布", at: 3632, content: "电梯厅午间人流提示"}
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
        at: 3900,
        signals: [
          {
            src: "cam/flow",
            at: 3898,
            val: { density: 0.9, zone: "theater" }
          },
          {
            src: "ota/report",
            at: 3897,
            val: { note: "演出前后人流叠加" }
          }
        ],
        confidence: 0.85
      },
      handoffs: [
        {at: 3960, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3960, dueAt: 5760, outcome: "confirm", decidedAt: 4200 },
      exec: { from: 4200, to: 4500, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4500, reason: "演出周期人流自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4800, verdict: "recovered", note: "剧场清场，关闭监测"}
        ],
        _i: 1
      },
      summary: "剧场入场/散场拥挤（E03）→ A16 分流 → 挂起（琥珀点）→ 再检 still/recovered",
      confidence: 0.85,
      reasoning: {
        sections: ["剧场人流拥挤（原'剧院散场'改挂 E03，对齐库语义）", "A16 错峰分流 → 自然回落 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [
        {id: "§A16", snippet: "错峰分流动作"}
      ],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4200}
      ],
      currentStep: 0,
      dueAt: 5760,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "PA", status: "已广播", at: 4240, content: "错峰入场广播"},
        {portCode: "SCR", status: "已发布", at: 4280, content: "剧场分流引导图"}
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
        at: 3840,
        signals: [
          {
            src: "cam/count",
            at: 3838,
            val: { density: 0.86, zone: "dessert-station" }
          },
          {
            src: "ota/report",
            at: 3837,
            val: { note: "甜品/收餐台排队超 12 人" }
          }
        ],
        confidence: 0.83
      },
      handoffs: [
        {at: 3900, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3900, dueAt: 5700, outcome: "confirm", decidedAt: 4140 },
      exec: { from: 4140, to: 4440, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4440, reason: "用餐周期自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4800, verdict: "recovered", note: "甜品台回落，关闭监测"}
        ],
        _i: 1
      },
      summary: "甜品/收餐台排队 → 分流 → 挂起（琥珀点）→ 再检 recovered",
      confidence: 0.83,
      reasoning: {
        sections: ["甜品台排队 → A16 分流 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4140}
      ],
      currentStep: 0,
      dueAt: 5700,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 4180, content: "甜品台分流提示"}
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
        at: 3780,
        signals: [
          {
            src: "cam/flow",
            at: 3778,
            val: { density: 0.88, zone: "kids-club" }
          },
          {
            src: "crw/report",
            at: 3777,
            val: { note: "儿童俱乐部活动区超容" }
          }
        ],
        confidence: 0.84
      },
      handoffs: [
        {at: 3840, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3840, dueAt: 5640, outcome: "confirm", decidedAt: 4080 },
      exec: { from: 4080, to: 4380, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4380, reason: "活动批次自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4740, verdict: "recovered", note: "活动批次结束，关闭监测"}
        ],
        _i: 1
      },
      summary: "儿童俱乐部活动拥挤（E27）→ A16 协调 → 挂起（琥珀点）→ 再检 recovered",
      confidence: 0.84,
      reasoning: {
        sections: ["E27 儿童俱乐部超容 → A16 活动协调 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4080}
      ],
      currentStep: 0,
      dueAt: 5640,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "CRW", status: "已下发", at: 4120, content: "儿童俱乐部批次协调"}
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
        at: 3720,
        signals: [
          {
            src: "cam/count",
            at: 3718,
            val: { density: 0.89, zone: "pool-deck" }
          },
          {
            src: "ota/report",
            at: 3717,
            val: { note: "泳池区午间人流超阈值" }
          }
        ],
        confidence: 0.85
      },
      handoffs: [
        {at: 3780, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 3780, dueAt: 5580, outcome: "confirm", decidedAt: 4020 },
      exec: { from: 4020, to: 4380, port: "CRW", status: "running" },
      holding: null,
      peakMark: true,
      recoverAt: null,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: 4380, reason: "泳池午间自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 4740, verdict: "recovered", note: "泳池区回落，关闭监测"}
        ],
        _i: 1
      },
      summary: "泳池甲板午间高峰 → 分流 → 挂起（琥珀点）→ 再检 recovered",
      confidence: 0.85,
      reasoning: {
        sections: ["泳池区密度 0.89 → A16 分流 → 挂起+再检"]
      },
      alternatives: [],
      clauses: [],
      chain: [
        {role: "DUTY", status: "done", actionAt: 4020}
      ],
      currentStep: 0,
      dueAt: 5580,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "SCR", status: "已发布", at: 4060, content: "泳池区分流提示"}
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
        at: 4260,
        signals: [
          {
            src: "ota/faq",
            at: 4258,
            val: { count: 9, keyword: "台风/靠泊" }
          }
        ],
        confidence: 0.77
      },
      handoffs: [
        {at: 4320, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 4320, dueAt: 5220, outcome: "confirm", decidedAt: 4440 },
      exec: { from: 4440, to: 4560, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4560,
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
        {role: "DUTY", status: "done", actionAt: 4440}
      ],
      currentStep: 0,
      dueAt: 5220,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 4480, content: "航变待通知口径"}
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
        at: 4320,
        signals: [
          {
            src: "ota/faq",
            at: 4318,
            val: { count: 14, keyword: "台风/行程变更", note: "询问量较初现翻倍" }
          },
          {
            src: "ai-risk",
            at: 4317,
            val: { note: "并入 E09 信度计算：乘客感知航变风险上升" }
          }
        ],
        confidence: 0.78
      },
      handoffs: [
        {at: 4380, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 4380, dueAt: 5280, outcome: "confirm", decidedAt: 4500 },
      exec: { from: 4500, to: 4620, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4620,
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
        {role: "DUTY", status: "done", actionAt: 4500}
      ],
      currentStep: 0,
      dueAt: 5280,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 4540, content: "航变询问统一口径"}
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
        at: 3540,
        signals: [
          {
            src: "ota/report",
            at: 3538,
            val: { note: "接驳预订热度异常（高）" }
          },
          {
            src: "vis/port",
            at: 3536,
            val: { note: "离船批次编排密度异常（与接驳耦合）" }
          }
        ],
        confidence: 0.58
      },
      handoffs: [],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: null,
      holding: { from: 3546, to: 3660 },
      peakMark: false,
      recoverAt: null,
      upgrade: { to: null, at: null, reason: "timeout" },
      outlib: { isX: true, riskLevel: "L2" },
      suspend: { decidedAt: 3660, reason: "存档观察（琥珀点闭合）：弱信号组合信度不足，不升级为正式事件，供台风长链推演引用" },
      recheck: {
        every: 300,
        reads: []
      },
      summary: "库外弱信号组合（接驳×离船批次）：观察后存档（琥珀点），作为 E09 长链推演的弱信号输入之一",
      confidence: 0.58,
      reasoning: {
        sections: ["库外识别：未命中 E 库模板（组合式弱信号）", "观察 3546s→3660s：单一信号均 < 升级阈值（各自 0.52/0.58）", "选型：琥珀点存档闭合（suspend.decidedAt），无 upgrade.at，关系B不入正式管线", "与台风长链耦合：接驳×离船批次并入 E09 的 ai-risk 信度计算"]
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

    // ============ 靠泊 approach（75–95′ = 12:15–12:35） ============

    // 52. E09-0001 台风靠离泊调整
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
      phase: "approach",
      discover: {
        at: 4320,
        signals: [
          {
            src: "ai-risk",
            at: 4315,
            val: {
              confidence: "met",
              note: "本系统 AI 风险推理产物：多源弱信号整合→信度达标→升级为正式事件（SCHEMA §2.6 / 框架 §4.11.5）",
              sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次)"]
            }
          },
          {
            src: "weather/api",
            at: 4300,
            val: { wind: 32, typhoon: "TS-2026-09", note: "靠泊窗口侧风 32kn 超限" }
          },
          {
            src: "vis/port",
            at: 4304,
            val: { note: "港口泊位调度回执：靠离泊窗口收窄" }
          }
        ],
        confidence: 0.92
      },
      handoffs: [
        {at: 4326, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 4326, dueAt: 7926, outcome: "confirm", decidedAt: 4560 },
      exec: { from: 4560, to: 4620, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: null,
      upgrade: { to: "L4", at: 4620, reason: "physical" },
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
        {role: "MGR", status: "done", actionAt: 4560},
        {role: "CAPT", status: "todo", actionAt: null}
      ],
      currentStep: 1,
      dueAt: 7926,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L4", reason: "physical" },
      ports: [
        {portCode: "PA", status: "已播报", at: 4580, content: "航变预告（口径 A05）"},
        {portCode: "OTA", status: "已同步", at: 4590, content: "航变口径同步（知情端口）"}
      ],
      machine: {
        current: "已升级(L4)",
        allow: []
      }
    },
    // 53. E-L4-0001 安全离船/整体下船方案调整
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
      phase: "approach",
      parentTrace: "68F9-AE29",
      discover: {
        at: 4620,
        signals: [
          {
            src: "escalate",
            from: "E09-0001",
            at: 4620,
            val: { note: "由 E09 物理升级而来（关系A，upgrade.to=L4；discover.at=升级点同 x）" }
          },
          {
            src: "ai-risk",
            at: 4615,
            val: { note: "本系统 AI 推理产物：安抚/赔付风险同步法务/客服端口（SCHEMA §2.6）", payoutRisk: "high" }
          }
        ],
        confidence: 0.95
      },
      handoffs: [
        {at: 4690, from: "SENSE", to: "CAPT", kind: "normal"}
      ],
      approval: { waitStart: 4690, dueAt: 4690, outcome: "confirm", decidedAt: 4740 },
      exec: { from: 4740, to: 5700, port: "CRW", status: "running" },
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
        {role: "CAPT", status: "current", actionAt: 4740},
        {role: "LEGAL", status: "informed", actionAt: 4980}
      ],
      currentStep: 0,
      dueAt: 4700,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已触达", at: 4800, content: "整体下船方案通知（分组+时间）"},
        {portCode: "PA", status: "已广播", at: 4860, content: "分组离船广播（按甲板/房型）"},
        {portCode: "CRW", status: "已下发", at: 4920, content: "船员端分组引导指令"},
        {portCode: "MGMT", status: "已同步(知情)", at: 4980, role: "LEGAL", content: "赔付/安抚口径同步法务 LEGAL（知情端口，不承担判决）"},
        {portCode: "OTA", status: "已同步(知情)", at: 5040, content: "客服安抚口径同步 OTA（知情端口）"}
      ],
      machine: {
        current: "执行中",
        allow: ["recover", "suspend"]
      }
    },
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
        at: 4560,
        signals: [
          {
            src: "mgmt/schedule",
            at: 4558,
            val: { note: "靠泊窗口收窄，全端口同步" }
          }
        ],
        confidence: 0.92
      },
      handoffs: [
        {at: 4620, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 4620, to: 4860, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 4860,
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
        {portCode: "SCR", status: "已同步", at: 4660, content: "靠泊窗口提示"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
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
      phase: "approach",
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
      suspend: { decidedAt: 5220, reason: "第二波用餐高峰自然回落型，判定挂起转入周期再检（琥珀点闭合）" },
      recheck: {
        every: 360,
        reads: [
          {at: 5580, verdict: "recovered", note: "第二波收尾，关闭监测"}
        ],
        _i: 1
      },
      summary: "午餐高峰复燃（衍生自 E03-0001）：12:16 再检 upgrade → 新事件 → 挂起（琥珀点）→ 再检 recovered；配合 E-L4 离船口径",
      confidence: 0.78,
      reasoning: {
        sections: ["衍生自 E03-0001（parentTrace 仅日志关联，不画流转线）", "第二波复燃 → A01+A16 分流 → 挂起+再检 recovered", "与 E-L4 离船方案并行：餐厅按新离船批次口径同步调整"]
      },
      alternatives: [],
      clauses: [],
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
        at: 4740,
        signals: [
          {
            src: "cam/count",
            at: 4738,
            val: { queue: 11, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 4800, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 4800, to: 5040, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5040,
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
        {portCode: "APP", status: "已自动发布", at: 4840, content: "靠泊排队提示"}
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
        at: 4800,
        signals: [
          {
            src: "ota/faq",
            at: 4798,
            val: { count: 6, keyword: "离船顺序" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 4860, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 4860, dueAt: 5760, outcome: "confirm", decidedAt: 5010 },
      exec: { from: 5010, to: 5190, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5190,
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
        {role: "DUTY", status: "done", actionAt: 5010}
      ],
      currentStep: 0,
      dueAt: 5760,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 5050, content: "离船顺序口径"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
    // 58. E11-0001 接驳中断
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
      phase: "approach",
      discover: {
        at: 4860,
        signals: [
          {
            src: "ota/report",
            at: 4855,
            val: { note: "接驳巴士故障/中断（E04 同源恶化）" }
          },
          {
            src: "vis/port",
            at: 4852,
            val: { shuttle: "outage", note: "港口接驳站中断" }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 4866, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 4866, dueAt: 8466, outcome: "confirm", decidedAt: 4920 },
      exec: { from: 4920, to: 5220, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5220,
      upgrade: { to: "L4", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: []
      },
      summary: "运营经理确认 A09（调备用接驳/重排批次）→ 备用运力到位执行 → 恢复（绿点，完整闭环）",
      confidence: 0.9,
      reasoning: {
        sections: ["E04 靠泊段同源恶化 → E11 接驳中断（与 E09 整体下船方案协同）", "处置 A09：备用巴士 + 离船批次重排（对齐 E-L4 分组口径）", "4920s 经理确认执行，5220s 运力恢复 → 绿点闭合"]
      },
      alternatives: [
        {id: "B", reason: "仅公告不调车（否决：接驳中断影响离船批次）"}
      ],
      clauses: [
        {id: "§A09", snippet: "接驳运力调车动作"}
      ],
      chain: [
        {role: "MGR", status: "done", actionAt: 4920}
      ],
      currentStep: 0,
      dueAt: 8466,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L4", reason: "timeout" },
      ports: [
        {portCode: "APP", status: "已发布", at: 4940, content: "接驳中断/调整通知"},
        {portCode: "OTA", status: "已同步", at: 4950, content: "接驳口径同步"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    },
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
        at: 4920,
        signals: [
          {
            src: "ota/faq",
            at: 4918,
            val: { count: 7, keyword: "赔付/离船" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 4980, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 4980, dueAt: 5880, outcome: "confirm", decidedAt: 5130 },
      exec: { from: 5130, to: 5310, port: "OTA", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5310,
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
        {role: "DUTY", status: "done", actionAt: 5130}
      ],
      currentStep: 0,
      dueAt: 5880,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 5170, content: "航变/离船口径"}
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
        at: 5040,
        signals: [
          {
            src: "cam/count",
            at: 5038,
            val: { queue: 13, threshold: 15 }
          }
        ],
        confidence: 0.9
      },
      handoffs: [
        {at: 5100, from: "SENSE", to: "AUTO", kind: "normal"}
      ],
      approval: { waitStart: null, dueAt: null, outcome: null, decidedAt: null },
      exec: { from: 5100, to: 5280, port: "APP", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5280,
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
        {portCode: "APP", status: "已自动发布", at: 5140, content: "离船排队提示"}
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
        at: 5100,
        signals: [
          {
            src: "ota/faq",
            at: 5098,
            val: { count: 18, keyword: "离船/赔付/行程", note: "按 L4 口径的安抚问答集中" }
          },
          {
            src: "ai-risk",
            at: 5097,
            val: { note: "赔付/安抚告知落地（E-L4 同步 LEGAL/OTA 口径的执行侧）" }
          }
        ],
        confidence: 0.8
      },
      handoffs: [
        {at: 5160, from: "SENSE", to: "DUTY", kind: "normal"}
      ],
      approval: { waitStart: 5160, dueAt: 6060, outcome: "confirm", decidedAt: 5310 },
      exec: { from: 5310, to: 5550, port: "CRW", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5550,
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
        {role: "DUTY", status: "done", actionAt: 5310}
      ],
      currentStep: 0,
      dueAt: 6060,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: null, reason: "timeout" },
      ports: [
        {portCode: "OTA", status: "已同步", at: 5350, content: "安抚答询口径"}
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
        at: 4800,
        signals: [
          {
            src: "mgmt/schedule",
            at: 4798,
            val: { note: "航变后离船批次需按新方案重排" }
          },
          {
            src: "vis/port",
            at: 4797,
            val: { note: "岸侧接驳时段与批次冲突" }
          }
        ],
        confidence: 0.86
      },
      handoffs: [
        {at: 4860, from: "SENSE", to: "MGR", kind: "normal"}
      ],
      approval: { waitStart: 4860, dueAt: 6660, outcome: "confirm", decidedAt: 5100 },
      exec: { from: 5100, to: 5400, port: "MGMT", status: "running" },
      holding: null,
      peakMark: false,
      recoverAt: 5400,
      upgrade: { to: "L3", at: null, reason: "timeout" },
      outlib: { isX: false, riskLevel: null },
      suspend: { decidedAt: null, reason: "" },
      recheck: {
        every: 300,
        reads: [],
        _i: 0
      },
      summary: "离船批次重排（对齐 E-L4 分组方案）→ A03 调整批次 → 恢复（绿点）",
      confidence: 0.86,
      reasoning: {
        sections: ["E-L4 方案落地侧：批次重排 → A03 调整 + 端口同步", "4920s 经理确认，5280s 批次落地 → 恢复"]
      },
      alternatives: [],
      clauses: [
        {id: "§A03", snippet: "调整离船批次动作"}
      ],
      chain: [
        {role: "MGR", status: "done", actionAt: 5100}
      ],
      currentStep: 0,
      dueAt: 6660,
      takeover: { taken: false, by: null, at: null, note: "" },
      escalate: { to: "L3", reason: "timeout" },
      ports: [
        {portCode: "MGMT", status: "已校准", at: 5140, content: "离船批次新排"},
        {portCode: "APP", status: "已更新", at: 5180, content: "离船批次通知（分组）"}
      ],
      machine: {
        current: "已恢复",
        allow: []
      }
    }
  ];

  /* MOCK.riskStates —— 航变风险推理状态（非事件，不占时间轴）
   * 出处：SCHEMA.md §2.6 / 治理框架 §4.11.5：航变风险 = 本系统 AI 推理模块产物；
   * 低信度 → 态势图"状态 chip"（不占时间轴）；信度足够 → 升级为正式事件（E09）。
   * validate() 不检查该字段（仅检查 MOCK.events[]）。 */
  var riskStates = [
      {
        at: 2100,
        confidence: "low",
        sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次弱信号)"],
        note: "11:35 航变风险推理·信度不足 → 态势图状态 chip，不占时间轴（SCHEMA.md §2.6 / 治理框架 §4.11.5）"
      },
      {
        at: 4320,
        confidence: "met",
        sources: ["weather/api", "vis/port", "ota/shuttle", "X-0002(接驳×离船批次弱信号)"],
        note: "12:12 信度足够 → 升级为 E09 正式事件（SCHEMA.md §2.6 / 治理框架 §4.11.5）；discover.at 与 E09-0001 对齐"
      }
    ];

  global.MOCK = {
    meta: { schema: "v0.4", voyageNo: "VN-0420", hashType: "fnv1a", createdAt: "2026-08-22", voyageStart: "11:00",
            note: "62 条清单 v0.5 落地（2026-08-22）·挂起=琥珀点闭合·再检=仅日志·衍生=新事件(parentTrace)·时长=人执行+恢复检测·簇随机错峰" },
    session: { loop: true, total: total, phases: phases, speed: 20 },
    riskStates: riskStates,
    events: events
  };
})(window);

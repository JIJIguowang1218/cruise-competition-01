# 调研流⑩：黑客松 AI 优势 → 邮轮调度映射与价值点收敛

> 子代理：主代理直执行 | 完成时间：2026-08-17 | 状态：完成
> 用途：回填 `design/ai-value-case.md` 证据线 B；产出收敛后的 2–3 个 AI 价值点。
> 证据来源：`Hackathon-reading/analysis/`（只读引用，不修改仓库）；评分与项目结论取自 `09-hackathon-mining.md` 归一化结果 + 精选项目原文精读。

## 0. 执行摘要

从 223 篇黑客松分析（rapid-agent 194 / gemini3 17 / anthropic 11 / china 1）中精选 7 个与邮轮调度最相关的高分/高价值项目做原文精读，结合 `09-hackathon-mining.md` 的 75 条 Nugget 与 7 正 4 反模式，把"AI 带来的具体优势"收敛为 **3 个 headline AI 价值点**：

1. **V1 确定性保底 + AI 判断**（"LLM 做语言，代码做算术"）——证据最硬，6+ 独立高分项目同构；
2. **V2 分钟级决策闭环**（跨系统拼图压缩 + 预案 + 审批）——Globot 是航运业同构案例；
3. **V3 可审计信任层**（证据抽屉 + 确定性评分 + 审批门）——回应"凭什么相信 AI"。

原候选"个性化触达"降级为次级/承接展示；"多 Agent 数量""MCP 标签"明确不采用（反面模式）。

---

## 1. 精选高分项目证据池（原文精读）

| 项目 | 赛事/文件 | 分/级 | 为什么选它 |
|---|---|---|---|
| Globot Shield | `gemini3/2026-06-29-globot-shield.md` | 81 A | **航运业运营决策台**，与邮轮运营同构度最高 |
| CrowdPilot AI | `rapid-agent/2026-07-03-crowdpilot-ai.md` | 68 B | 18,000 人涌向 Gate A——人流应急决策，与邮轮人流最接近 |
| Spatial Engine | `gemini3/2026-06-29-spatial-engine.md` | 82 A | "像设计师一样看，像物理学家一样算"——空间感知+物理计算 |
| Working Capital Optimizer | `rapid-agent/2026-06-26-working-capital-optimizer.md` | 79 A | "问 LLM 算 DSO 是危险的"——确定性计算分界线 |
| StoreOps (Off-Duty) | `rapid-agent/2026-08-15-storeops.md` | 79 A | 证据抽屉护城河 + 审批箱 + MOCK_MODE 演示工程 |
| FireGuard | `rapid-agent/2026-08-13-fireguard.md` | 80 A | 60 秒局势图 + 确定性威胁分 + ApprovalGate |
| Scam Swarm | `rapid-agent/2026-06-22-scam-swarm-scoring.md` | 84 A | 确定性启发式引擎 + LLM 语义双层架构 |

辅助证据（来自 09 挖掘，未逐一精读原文）：DQ Sentinel 76、Mnemos 83、NOCAPY 80、Methods Reconstructor 80、HVAC Ops 69、Tenant Mix Optimizer 68、Self-Healing 85、Ripple 85、Triplix 56（反面）。

---

## 2. 提取的 AI 具体优势（证据线 B 投影表）

| # | 黑客松模式（项目，分数） | AI 带来的具体优势（原文证据） | 可迁移到邮轮哪个环节 | 说服力判断 |
|---|---|---|---|---|
| B1 | **确定性计算 + LLM 只做判断/语言**（WCO 79 / Spatial Engine 82 / FireGuard 80 / Scam Swarm 84 / StoreOps 79 / Methods Reconstructor 80） | WCO："问 LLM 计算 DSO 是危险的。在 Python 里算好再传给它"；Spatial Engine："AI 感知与决策 + 确定性公式做计算……LLM 擅长推理但不擅长精确物理算术"；FireGuard：威胁分纯公式、参数有文献背书；Scam Swarm：启发式引擎做阈值/黑名单，LLM 只做语义；StoreOps：下单/扣库存走确定性代码 | L2 资源状态层（满载率/排队/等待/步行时间）全部确定性；L3 建议话术层用 LLM | ★★★★★ 六个独立高分项目同构；直接回应"AI 挂了怎么办" |
| B2 | **跨系统整合 + 决策拼图压缩**（Globot 81 / FireGuard 80 / CrowdPilot 68） | Globot：感知层卷成红海、**决策层几乎是空的**；危机到确认 5 分钟 vs 传统 2 小时；5 Agent 并行（市场/物流/金融/合规/辩论）。FireGuard：20–45 分钟手工拼图（GIS 10min+电话 15min+路况 10min）→ **60 秒局势图**。CrowdPilot：分散在文档/DB/Excel 的运营情报 → 4-Agent 顺序流水线（Forecast→Incident→Resource→Operation） | 航变响应、高峰超阈值、登离船/港口联动；多系统合为一个 L3 决策视图 | ★★★★☆ 航运同构；风险：CrowdPilot 教训——核心假设是"运营数据已在系统里" |
| B3 | **预案式事件响应 + 人审批准入**（Globot 81 / FireGuard 80 / DQ Sentinel 76 / Mnemos 83 / StoreOps 79） | FireGuard：ApprovalGate 节点——AI 给建议、人做决定；DQ Sentinel：**执行路径不经 LLM**、审批通过才触发 ACT，23 个对抗 Agent 0 绕过；Mnemos：代理只生成提案，批准后才执行 | 航变→影响评估→资源重排→分层话术→审批任务；只读建议自动、全量推送/改线须审批 | ★★★★☆ 与 B2/B4 有重叠，并入 V2/V3 承载 |
| B4 | **可审计证据链（信任层）**（StoreOps 79 / FireGuard 80 / WCO 79 / NOCAPY 80 / Phoenix Audit 84） | StoreOps：每个动作 trace_id 审计记录，"This is the trust layer…That's the moat"（证据抽屉=护城河）；FireGuard："威胁分必须可解释、可复现、可审计"；WCO：Phoenix 全链路 trace，"没有东西藏在 API 后面"；NOCAPY：逐条追踪不做黑箱总分 | 分流建议旁"依据卡片"（餐厅 A 容量 380、当前 312、步行 4 分钟）；审批留审计包 | ★★★★☆ 回应"运营方凭什么敢用" |
| B5 | **分层降级 / 演示工程化**（Self-Healing 85 / Scam Swarm 84（双模型）/ Ripple 85 / StoreOps 79 / HVAC Ops 69） | Self-Healing：4 层降级是设计哲学（LLM→规则模板→词匹配→DEMO）；StoreOps：MOCK_MODE=true 零配置跑全套 UI + 演示脚本 + 直播兜底话术；FireGuard：打包离线回放数据，无密钥可跑通 | 竞赛 Demo 的工程前提：预写 11:45 午餐场景 + 真 LLM 链路 + 模型不可用时规则降级 | ★★★★☆ 不是价值点，是 Demo 红线（见 4 章） |
| B6 | **AI 必要性检验**（Notely 75 / Teacher Exam 90 / Pasal 92） | 问"把 AI 拿掉产品还成立吗"；不成立或只剩 CRUD 的就是贴纸 | 每个 AI 能力都要能回答"没有 AI 时船员现在怎么做、慢多少、错多少"（与证据线 A 呼应） | ★★★★★ 方法论级，用于自查而非卖点 |
| B7 | **反面模式警示**（Triplix 56 / NeuroStudy 52 / 逐条见 09 挖掘 N1–N4） | 核心动作造假（booking_id=random）、多 Agent 贴纸（同一 prompt 改词）、MCP 标签、PRD-only | 信息架构 3–4 个职责单一 Agent 足够；Demo 可 mock 数据源、不可 mock 核心逻辑 | ★★★★★ 红线级 |

---

## 3. 收敛：3 个 headline AI 价值点

### V1 确定性保底 + AI 判断（从"会算、会想混在一起"到"各司其职"）
- **一句话**：人流计数、满载率、排队、步行时间、时间窗全部精确计算；LLM 只承担"非结构化→结构化"的感知判断与"数字→人话"的生成。
- **证据锚**：B1（WCO/Spatial Engine/FireGuard/Scam Swarm/StoreOps 六项目同构）。
- **邮轮落地**：L2 层（确定性）→ L3 层（LLM 建议）。例：摄像头计数 312/380 → 确定性满载率 82% → LLM 生成"建议去 3 楼，等待预计 4 分钟"话术与理由。
- **说服力**：★★★★★。既是最强证据模式，又天然回应"关掉 AI 还剩什么"（确定性层独立可跑）。
- **失败模式**：计数/等待时间数据源是 mock 的而逻辑也是假的 → 落入 N1 核心动作造假。Demo 只允许 mock **数据源**，不允许 mock **计数与推荐链路**。

### V2 分钟级决策闭环（从"人肉拼图"到"AI 拼图 + 人拍板"）
- **一句话**：把分散在预订/监控/港口/客服/公告系统的运营情报合并为一个决策视图；异常事件（高峰超阈值、航变）自动生成"事实→影响→方案→话术→审批任务"，人确认后执行。
- **证据锚**：B2 + B3（Globot 5 分钟 vs 2 小时；FireGuard 45 分钟拼图→60 秒局势图 + ApprovalGate；CrowdPilot 4-Agent 流水线映射应急步骤）。
- **邮轮落地**：航变响应（影响评估→资源重排→分层话术→审批→触达）；午/晚餐高峰超阈值预警；登离船与港口接驳联动批次。
- **说服力**：★★★★☆。Globot 是航运业同构 = 评委易理解的类比；但必须诚实回答 CrowdPilot 被点名的核心假设——**"运营数据已经在系统里"在邮轮上是否成立**（若否，数据接入就是产品的一部分而非前提）。
- **失败模式**：审批门只是 prompt 口头承诺（RegOps Shield 反面），而不是结构性"执行路径不经 LLM"（DQ Sentinel 正例）。

### V3 可审计信任层（从"黑箱建议"到"可回溯、可问责"）
- **一句话**：每个推荐/动作带证据抽屉（读了哪条数据、算了什么公式、谁批准的）；风险/紧急分级用确定性公式可复现；写操作/高后果动作全部审批 + 审计包。
- **证据锚**：B4 + B3（StoreOps 证据抽屉=护城河；FireGuard 威胁分可解释可审计；WCO 全链路 trace；DQ Sentinel 结构性审批）。
- **邮轮落地**：分流建议旁证据卡片；航变赔偿/资源重排留审计包；船员面板可回看"AI 建议基于什么数据、何时由谁批准"。
- **说服力**：★★★★☆。回应答辩追问"你的 AI 凭什么让我相信"；也回应"AI 幻觉"大环境质疑。
- **失败模式**：证据链本身造假（伪造 trace）比没有 trace 更糟；MVP 只对写操作/高后果动作做全审计，避免成本失控。

---

## 4. 次级 / 承接 / 明确不采用

### 次级：C2「从群发广播到分群分批个性化触达」
- 不进入 headline。原因：① 仓库证据较弱（最接近的是 StoreOps 的意图路由）；② 属 L4 触达层，而 scope-and-boundary 共识是 L4 接口对接、不做 C 端产品——**个性化触达是"系统输出的形式"，不是 AI 价值核心**。
- 定位：作为 V2 的执行结尾（分批触达话术由 LLM 生成），在 Demo 中做展示，不单独立价值点。

### 承接前提：分层降级 / 演示工程化（B5）
- 不是卖点，是"任何评委环境都能跑"的工程前提：MOCK_MODE 与 REAL_MODE 显式分离、预写场景 + 真 LLM 链路 + 规则降级、3 分钟演示脚本 + 直播兜底话术。

### 明确不采用（评委红线）
- **多 Agent 数量炫耀**：Triplix 8 Agent 失控、NeuroStudy 假多 Agent（N3）。信息架构只用 3–4 个职责单一 Agent，每个写清独立输入输出、通信方式、失败兜底。
- **MCP/「摄像头 MCP」标签**：MallCore/CivicPulse 反面（N2）。只写每个数据源的真实接入状态。
- **"AI 万能胶水"叙事**：每个能力过 B6 必要性检验 + 证据线 A（旧模式基线）。

---

## 5. 对 scope-and-boundary.md 的收敛提示（待用户讨论）

- 五层模型里 V1 明确主战场 = **L2 确定性层 + L3 建议层**；V2/V3 分别强化 L3 的事件响应和信任机制。
- "个性化触达"不再是产品卖点 → L4 触达只做接口 + Demo 展示，与既有共识一致。
- 娱乐/公共空间是否进 MVP：V1 证据（确定性密度计数）同样适用，可作为低成本扩展项；是否纳入交给用户拍板。

## 6. 数据断点

1. 分数取自 `09-hackathon-mining.md` 归一化，个别项目文档内评分口径不一（如 Spatial Engine 文件内另一套 85 分制）；如需精确分以各 `-scoring.md` 文件为准。
2. 本项目基于分析文章而非 `Hackathon-reading/repos/` 原始代码；若要照抄架构细节（如 CrowdPilot 流水线、FireGuard 公式），需对具体项目做代码级复核。
3. 国内赛事（china-ai-landscape）无项目级分析——若要对标国内评委口味，尚缺素材。
# 调研流⑨a：Hackathon-reading 挖掘 — Rapid Agent 2026-06

> 完成时间：2026-08-16 | 方式：本地文件分析（不联网、不派生子代理）
> 覆盖：51 个 md（26 叙述 + 25 评分）→ 去重后 25 个项目

## 0. 执行摘要

2026-06 月的 25 个 Rapid Agent 项目构成当前经验库中密度最高的一个月样本：A 级 13 个、B 级 7 个、C 级 4 个、D 级 1 个。现有 `patterns-judges-like.md` 的 6 正 4 反在本月样本中 8 条被确认、2 条被更新扩展，并新发现 3 个正向模式、2 个反模式。最值得注意的增量是：**「结构性审批门/分级自主权」与「数据工程/领域知识」在六月高分项目中反复出现，而旧 10 模式没有覆盖**；同时「1 次提交」在本月 11/25 个项目中出现，是最普遍的反模式。

## 1. 覆盖范围与数据质量

| 项 | 值 |
|---|---|
| 项目数 | 25（matchmind 有两份叙述文件，合并为 1 个） |
| 分数分布 | A 13 / B 7 / C 4 / D 1 |
| 覆盖方式 | 51 个文件全部经程序化全文扫描提取（评分、评级、教训、负面标记）+ 关键文件人工复核 |
| 未覆盖文件 | 无 |
| 已知局限 | 部分评分文件只提取总分/评级/要点，未逐行复核每个子项；key_quote 均逐字取自原文 |
| 数据纠错 | Hackathon-reading/AGENTS.md 把 AgriGuardian 写成 B/62，实际评分报告为 **86/100 A**（本次以评分报告为准） |

## 2. 新归纳的正向模式（每条 ≥3 个项目实例）

| # | 模式 | 实例项目 | 邮轮映射 |
|---|---|---|---|
| P1 | 确定性计算 + LLM 语义双层架构 | Scam Swarm 84、AMRShield 80、Lumin 69、WCO 79、PitchCraft 82 | 人流计数/等待时间/能耗公式用规则算，个性化建议用 LLM 写 |
| P2 | 离线 Mock + 降级链 + 诚实标注 | Synt 87、AgriGuardian 86、ProofPilot 69、MatchMind 86、VibeForge 75、Scam Swarm 84 | 船载 Demo 必须断卫星网也能跑；mock 数据要标注 `dataMode`，不伪装真实 |
| P3 | 结构性审批门/分级自主权（HITL） | Synt、DQ Sentinel 76、RepoGuard 77、Voiceless 75、Crisiswatch 55、Gemini Mongo 63 | 高风险动作（隔离设备、医疗建议、推送导航）必须人工确认；AI 无工具=不能犯错 |
| P4 | 推理过程透明化/诚实局限声明 | Synt、MatchMind、Phoenix Audit 84、PitchCraft、AgriGuardian | 乘客与评委都要看到 AI「正在算什么」；做不到的写「做不到」比假装全覆盖可信 |
| P5 | 自主闭环（OODA/ReAct/自我改进护栏） | Synt、WCO 79、AgriGuardian、DQ Sentinel | 感知→判断→决策→行动→再观察；自我改进必须有阈值护栏 |
| P6 | 真实多 Agent 分工（编排/通信/治理） | Scam Swarm、WCO、MatchMind、AMRShield、TracePilot 67 | 每个 Agent 职责一句话能说清；不贴 Agent 标签 |
| P7 | 数据工程与领域知识是 AI 产品的下限 | MatchMind、AMRShield、SENTINEL 72、Forenly 66、AgriGuardian | 花城号参数库、甲板图坐标、餐厅容量等数据层先做好，AI 才有上限 |
| P8 | 工程纪律（小步提交/测试/CI/PRD） | Synt、MatchMind、AMRShield、AgriGuardian、Forenly、DQ Sentinel | 比赛反模式 4 的正面对照；用 git 历史讲产品演进故事 |

## 3. 新归纳的反模式（每条 ≥3 个项目实例）

| # | 反模式 | 实例项目 | 邮轮警告 |
|---|---|---|---|
| N1 | 电影布景：UI 真实、AI 硬编码/不存在 | CityGuard 45、AgenticEssay 34、MallCore 45 | 热力图不能是硬编码 PNG；Run Scenario 不能是 setTimeout |
| N2 | 架构贴纸：声称的 Agent/MCP 与实际代码是两条路 | NeuroStudy 52、MallCore、Forenly | 声称 4 个 Agent 就必须有 4 套输入输出与编排；MCP 不是卖点 |
| N3 | 声明漂移：README/依赖列表≠代码行为 | AgenticEssay、NeuroStudy（README 说 Gemini 实际 Groq）、MallCore、Forenly | 答辩 PPT 与 Demo 代码逐项对账 |
| N4 | 空壳脚手架：文件名/结构存在，逻辑缺失 | AgenticEssay（控制器空壳）、Crisiswatch（test_ 文件全是 print）、Forenly（orchestrator 未接线） | 先写核心引擎验证脚本（soul-first），再写 UI |
| N5 | 硬编码单点/无降级：AI 或数据源挂了系统即瘫 | MallCore、Rapid Site Builder 73、Forenly（AVIP 硬编码 fallback） | 卫星链路中断是常态，必须有规则引擎兜底 |

## 4. 现有 6 正 4 反逐条对照

| 旧模式 | 判定 | 依据（六月样本） |
|---|---|---|
| 正1 AI感知+确定性计算分离 | ✅ 确认并扩展 | P1：从「AI 看图 + 公式算」扩展到「规则引擎触发 + LLM 解释」的完整双层范式（Scam Swarm/AMRShield/WCO/PitchCraft/Lumin） |
| 正2 多Agent职责单一 | ✅ 确认 | P6：高分 Agent 项目均为真实分工；NeuroStudy 反例从反面强化 |
| 正3 闭环自主决策循环 | ✅ 确认并扩展 | P5：除 Synt OODA 外，新增 AgriGuardian ReAct+自我改进、WCO 阈值护栏 |
| 正4 预写场景承载能力 | ✅ 更新扩展 | P2：从「Globot 式高保真 Mock」升级为「离线 mock + 降级链 + 数据来源标注」体系（MatchMind 琥珀角标、AgriGuardian stub 标记、Synt USE_MOCK） |
| 正5 推理过程透明化 | ✅ 确认并扩展 | P4：新增「诚实的局限声明」（Phoenix「我们做不到 XX」、PitchCraft not_configured、DQ 开放决策追踪） |
| 正6 TurboTax 低端颠覆 | ⚠️ 部分相关 | AgriGuardian（1 亿小农）与 Voiceless（听障人群）部分符合；但本月无强证据新增，保持原判 |
| 反1 电影布景 | ✅ 确认 | CityGuard、AgenticEssay、MallCore 三个完整实例 |
| 反2 Multi-Agent 贴纸 | ✅ 确认并合并 | NeuroStudy；与反3 合并为 N2「架构贴纸」更准确（Agent 与 MCP 同源） |
| 反3 MCP 标签 | ✅ 确认并合并 | MallCore、Forenly；N2 统一覆盖 |
| 反4 1 次提交 | ✅ 确认（最强反模式） | 11/25 项目单次提交：CityGuard、NeuroStudy、Lumin、ProofPilot、Forenly、Crisiswatch、DQ、SENTINEL、WCO、TracePilot、MallCore |

## 5. 邮轮映射点子库

| 点子 | 来源 | 邮轮场景映射（痛点编号） | 落地注意 |
|---|---|---|---|
| 规则引擎计数/阈值触发 + LLM 生成自然语言推送 | Scam Swarm | 餐厅拥挤 #11/#12、上下船排队 #7 | 阈值、容量、等待时间全部确定性计算 |
| OODA 循环 + 推理剧场 UI + 离线 mock | Synt | 安全应急决策 #30、设备运维 #34 | 评审可离线重复运行；思维流可见 |
| 结构性审批门：AI 没有「执行工具」 | DQ Sentinel / Gemini Mongo | 分流推送前确认、敏感操作船员审批 #28/#30 | readOnly + 门禁优于 prompt 约束 |
| 规则引擎硬约束 + LLM 语义边界 case | AMRShield | 食物过敏 #13、医疗咨询 | 过敏规则 100% 硬编码，LLM 只处理模糊描述 |
| 确定性计算 + LLM 推理（数学不进 LLM） | WCO | 能耗优化 #33、库存预测 #35 | 功率/热负荷用公式，LLM 只写解释 |
| 双管道 + 三级回退 + 数据来源标注 | MatchMind / AgriGuardian | 船上 App 推荐、热力图（数据断链时降级） | UI 标注 mock/live；卫星断网降级规则引擎 |
| 结构化 Schema 强制「每条建议附证据」 | ProofPilot | 方案书证据链、Demo Claim Checker | Zod/JSON schema 级别约束，不是提示词祈祷 |
| 「数据库算分，LLM 写报告」 | PitchCraft | 投诉分类处理 #21、服务质检 | 评分可审计，报告可解释 |
| 诚实局限声明 | Phoenix Audit | 答辩叙事与 PRD 风险章节 | 「我们不能识别人脸/不保证 100%」反而加分 |
| 配置驱动规则 + 失败默认安全（NEEDS_REVIEW） | RepoGuard | 安全预警失败时默认保守 #28 | 消防通道/限行区写进 scope 配置 |
| 数据集 > AI 的产品定位 | SENTINEL | 花城号设施/容量/甲板图数据集是产品底座 | 先做数据台账，再谈智能 |
| 确定性渲染器包围 LLM 输出 | Rapid Site Builder | AI 生成推送/导航 UI 时防 XSS/布局错乱 | LLM 只输出 JSON，渲染器确定 |
| 真实物理数据接入（地形/坐标） | Forenly | 甲板图坐标 + 步行时间公式 | 不要让 LLM 估步行时间 |
| 管道 + 人类校验 | Voiceless | 多语言服务 #20、无障碍 #25 | 船员 2 秒校验替代 AI 完美假设 |
| 行为检查清单式评分 Agent | TracePilot | 船员重复工作 #32 的 AI 助手质检 | 检查「是否做了」而非「做得好不好」 |
| TypeScript 类型定义=产品文档 | CityGuard（反面中的可用点） | 先写 ScenarioData/Incident 类型做 PRD 合同 | 类型先行，但 AI 必须真跑 |
| 记忆六分类 | Perseus | 航程内乘客偏好（合规脱敏前提） | Preference/Constraint 分类提高检索精度 |

## 6. 数据断点与后续建议

1. 本流只覆盖 2026-06；Rapid Agent 7–8 月、Gemini3、Anthropic 系列需由 ⑨b/⑨c 继续。
2. 旧文档引用 AgriGuardian B/62 与原始评分 86/A 冲突，后续引用以评分报告为准。
3. 部分项目只有叙述文件无评分文件（或反之），分数缺失时 TSV 留空。
4. 建议 Gate 2 合成时把 P3（审批门）与 P7（数据工程）纳入 judge-patterns v2，作为方向一「推送建议」与方向二「运维决策」的架构硬约束。

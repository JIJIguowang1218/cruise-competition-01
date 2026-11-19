# 调研流⑨b：Rapid Agent 2026-07 全量挖掘

> 范围：`Hackathon-reading/analysis/rapid-agent/` 下 2026-07 全部 86 个 md（43 个项目 × 叙述+评分）
> 覆盖方式：脚本解析全部 86 文件（分数/评级/强弱项/模式检测），并人工精读全部评分文件的评级结论与关键段落；个别叙述正文按需抽取。无未覆盖文件。
> 项目级明细见同目录 `09b-projects.tsv`（43 行，含邮轮映射列）。

## 0. 执行摘要

7 月批次共 43 个项目：A 级 23 个、B 级 16 个（含 B+）、C 级 3 个（含 C+）、D 级 1 个。
三条最重要的横向发现：
1. **确定性优先已经成为 7 月高分项目的默认架构**，不再只是 6 月的少数亮点（ECS、FairPay、VoiceCare、WorldCup、Arclo、Elastic 均是"AI 只做语义、流程由确定性管道控制"）。
2. **AI 的"自知之明"成为新得分点**：逐字引用反幻觉（GitLab/Elastic/Dynatrace）、置信度路由与审批门（Arclo/CliniqAI/VoiceCare）、可验证的诚实准确率（WorldCup 68% walk-forward）反复出现在 A 级项目。
3. **1 次提交已经成为普遍性硬伤**：43 个评分文件中 40 个因"1 commit/无迭代痕迹"被扣分；22 个明确零测试或测试缺失；14 个因无 mock/离线模式被扣分——这三项几乎与低分强相关。

## 1. 新正向模式（每条 ≥3 个项目实例）

| # | 模式 | 项目实例 | 对邮轮竞赛的启示 |
|---|---|---|---|
| P1 | **逐字引用反幻觉**：Agent 的输出证据必须是工具输出原话，prompt 明确禁止改写 | gemini-gitlab-agent(A81)、gemini-elastic-agent(A81)、gemini-dynatrace-agent(A80) | 设备告警解释、法规引用、事故报告必须逐字溯源，负面测试要验证 UNKNOWN 行为 |
| P2 | **确定性双路径/多层降级**：同一功能有 LLM 与非 LLM 两条路径，断 API 也能出结果 | gemini-elastic(use_llm=False)、self-healing(4 层降级)、virgo(5 层模型降级)、CliniqAI(in-memory fallback) | 邮轮断网是常态：AI 层失败必须自动降级到规则/模板层，而不是白屏 |
| P3 | **代码级验证门 + 默认拒绝**：高风险动作白名单化，prompt 无法绕过 | voice-care(verification_gate 只放行 find_patient)、CliniqAI(三级安全控制)、arclo(置信度≥85 自动/60-84 人工/<60 仅分析)、grad-paddy(两级 HITL) | 分流推荐、维修工单、医疗建议按置信度分级：自动/人工确认/仅参考 |
| P4 | **cheap-first 成本分层**：正则/规则/缓存先过滤，LLM 只处理长尾 | self-healing(HYPE 词正则先过滤)、fairpay(flash 做工具、pro 做叙述)、voice-care(239 行确定性红旗规则) | 船上算力与卫星带宽有限：规则引擎先算，LLM 只生成最终文案 |
| P5 | **War Games / 预写事故注入**：一键注入合成事故，演示确定、可重复 | praxis(/api/wargames/initiate)、CliniqAI(3 个 demo 患者)、self-healing(demo_incidents.py)、grad-paddy(样本案例) | 沿用 Globot 的 high-fidelity mock，但数据与真实代码同路径（elastic 的 stub/real 统一路径最标准） |
| P6 | **机构记忆/事故模式库**：把已确认的事故/失败沉淀为可检索知识 | ripple(事故 pattern 拦截 PR)、carryover(known-scams 索引自增长)、self-healing(policy memory)、karma(迁移隐性依赖) | 邮轮事故复盘库、维修经验库：下次巡检/审批自动匹配历史模式 |
| P7 | **AI 系统回归测试基建**：LLM 功能也要进 CI，从失败 trace 生成测试 | phoenix2pytest(86)、agentci(88)、voice-care(241 tests)、self-healing(6 个组件测试) | 我们的分流推荐逻辑必须有评测集与回归测试，防止"改 prompt 改坏产品" |
| P8 | **诚实量化与禁止夸大**：可验证准确率、置信度展示、prompt 黑名单禁用夸大词 | worldcup-oracle(102 场 walk-forward 68%)、fairpay(禁用 revolutionize 等 10 词)、nocapy(不做综合评分) | 对国企评委尤其有效：写"预测准确率 68%、置信度中等"，不写"精准预测人流" |
| P9 | **领域下沉 + 本地化 fit**：为被主流产品忽视的特定人群做低端颠覆 | billguard(尼日利亚现金流)、saarthi(勒克瑙出行)、mediguard(印度小诊所)、carryover(东非移民防骗) | 邮轮是封闭小社会：为"中国邮轮船员/银发乘客"专门设计，胜过通用大模型套壳 |

## 2. 新反面模式（每条 ≥3 个项目实例）

| # | 模式 | 项目实例 | 警示 |
|---|---|---|---|
| N1 | **Phantom Agent（管线是真、AI 是假）** | thesismate(C53)、rapidearn(plan 硬编码)、self-healing 的社媒 demo 答案硬编码、event-boost(D35 纯文档) | 禁止把推理步骤写成 setTimeout 式的固定字符串 |
| N2 | **Split-Brain 双实现**：一套真路径 + 一套给评委看的 ADK/MCP 路径 | finsentinel(B67)、CliniqAI(A80 也扣分)、rapidearn(C50)、forenly-lawn(B70)、engram-atlas(声称 ADK 实际未 import) | 评委已经能识别"给评委看的代码"；我们只做一套真实路径 |
| N3 | **MCP 贴纸的变体**：依赖装而未用、README 挂 badge、wrapper 空壳 | virgo(A75 仍扣分)、rapidearn、forenly-lawn、CliniqAI | 不列用不到的技术标签；摄像头就说摄像头，不说"摄像头 MCP" |
| N4 | **1 commit 零迭代（全批次 40/43）** | 几乎所有项目；A 级也普遍因此被扣 2-3 分 | 我们的仓库要持续小步提交，把迭代历史当成果的一部分 |
| N5 | **零测试/测试缺失（22/43）** | ecs、virgo、fairpay、praxis、arclo、finsentinel 等 | 关键确定性模块（容量计算、规则引擎、红旗规则）必须测试先行 |
| N6 | **无 mock/离线模式（14/43）** | praxis、arclo、finsentinel、forgettext 等 | 邮轮方案天生离线：Demo 必须有无 API key 也能跑的路径 |
| N7 | **AI 没有边界/安全护栏** | ecs(无危险操作拦截)、arclo(同模型自审无交叉验证)、fairpay(单文件 776 行) | 方案书里写清"AI 不能做什么"和"哪些动作必须人批" |

## 3. 现有 patterns-judges-like.md 6 正 4 反逐条判定

| 现有条目 | 判定 | 依据 |
|---|---|---|
| 正1 AI 感知+确定性计算分离 | **确认并强化** | ECS(SPICE 算物理)、FairPay(LLM 不控制流程)、VoiceCare(239 行规则红旗)、WorldCup(Elo+蒙特卡洛) |
| 正2 多 Agent 职责单一 | **确认并补充** | CrowdPilot(评估→识别→分配→计划)、CliniqAI(Supervisor+Pydantic 边界)、CarryOver(Kibo+两个专家)；补充判据：Agent 间要有真实通信/状态边界，Supervisor 只调度不掺业务 |
| 正3 OODA 闭环 | **确认并强化** | AutoSRE(检测→诊断→行动→验证)、SelfHealing(自愈循环)、PipelineGuardian(失败→修复→学习) |
| 正4 预写场景 mock | **确认并强化** | Praxis War Games、CliniqAI demo 患者、SelfHealing demo incidents；补充要求：mock 数据与生产代码同路径（stub/real 统一） |
| 正5 推理透明化 | **确认并扩展** | 从"推理剧场"扩展到三类：事件流展示(CarryOver)、逐字引用证据(GitLab/Elastic)、审计日志(CliniqAI) |
| 正6 低端颠覆 TurboTax | **确认并强化** | BillGuard、Saarthi、MediGuard、CarryOver 四个本地化案例 |
| 反1 电影布景 | **确认** | ThesisMate、EventBoost、RapiEarn 为新证据 |
| 反2 Multi-Agent 贴纸 | **确认并细化** | 新增两种亚型：Split-Brain 双实现(Finsentinel/CliniqAI)、框架声称不实(EngramAtlas)；不只是"同一 prompt 改词" |
| 反3 MCP 标签 | **确认并强化** | Virgo 装而未用、RapiEarn wrapper 空壳、Forenly 蓝图未实现 |
| 反4 1 次提交 | **大幅强化** | 40/43 被扣分，已是普遍硬伤而非个别现象；常与零测试、无 mock 并发 |

## 4. 邮轮映射点子库（可直接进方向论证）

| 点子 | 来源项目 | 映射场景 | 关联痛点(v2) |
|---|---|---|---|
| 4-Agent 应急人流流水线 + CRITICAL RULES 防编造 | CrowdPilot | 登船/午餐/剧院高峰：评估→识别→分配→计划 | #7 #11 #17 #18 |
| 检测→诊断→行动→验证的自治闭环 | AutoSRE | 设备故障、能耗异常自主响应（方向二） | #33 #34 |
| 验证门默认拒绝 + 确定性红旗规则 | VoiceCare | 医疗/过敏/无障碍请求先过规则层再进 LLM | #13 #25 |
| 逐字引用反幻觉 | GitLab/Elastic/Dynatrace | 告警解释、SOP 检索、法规引用不许改写原文 | #30 及方案书引用 |
| 事故模式记忆库 | Ripple/Karma | 维修经验、事故复盘沉淀为巡检检查项 | #34 |
| 变更影响分析（blast radius） | Atlas/Arclo | 关停/改造某设备前展示影响区域与服务 | #33 #34 |
| AI 自愈与 4 层降级 | SelfHealing | 船载 App/AI 断网降级到规则与模板 | WiFi/离线约束 |
| 预测诚实性 walk-forward | WorldCup | 人流/能耗时序预测给可验证准确率与置信度 | #11 #33 |
| 多视角并发评审 Governance Board | Praxis | 安全/运营/成本三 Agent 并发评审应急方案 | #30 |
| 岸上游诈骗预警 + 事件流 UI | CarryOver | 自由行被宰、可疑中介识别 | #16 #28 |
| 本地化账单/现金流助手 | BillGuard | 离船账单透明化、争议预解释 | #35 |
| 服务请求全流程 HITL | GradPaddy | 乘客需求→船员接单→分级审批闭环 | #21 #32 |
| 拍照搜商品/设施 | RetailConcierge | 免税店导购、活动/设施发现 | #18 #22 |
| 设备选型边界计算 | ForenlyLawn | 备件/设备选型顾问（注意 MCP 贴纸教训） | #34 |
| 技能差距→培训路径 | Kirtan | 船员培训规划 | #31 #32 |

## 5. 数据断点与后续建议

1. 本批只覆盖 rapid-agent 的 2026-07；6 月(21 项目)、8 月(截至 08-16) 及 gemini3/anthropic/china-ai-landscape 目录仍需按同样方法补挖（流⑨a/⑨c/⑨d）。
2. TSV 的 `what_worked/what_failed` 列由脚本抽取，部分旧格式文件为空；模式判断已由人工对照原文补足，但若后续要引用单个项目的强弱项，请回到对应 `-scoring.md` 复核。
3. 40/43 的"1 commit"统计包含 A 级项目，说明该扣分是流程性而非能力性；我们自身仓库必须用多 commit 迭代回应反模式 4。

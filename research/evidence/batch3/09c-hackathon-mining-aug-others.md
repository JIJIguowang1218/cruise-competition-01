# ⑨c Hackathon 经验库挖掘报告 — Rapid Agent 2026-08 + Gemini3 + Anthropic + China-AI-Landscape

> 完成时间：2026-08-16 | 方式：本地文件分析，未联网 | 状态：完成
> 配套数据：`09c-projects.tsv`（42 个项目行）

## 0. 覆盖情况与方法

| 语料 | 文件数 | 项目行 |
|---|---:|---:|
| rapid-agent 2026-08 | 56（28 叙事 + 28 scoring） | 28 |
| gemini3 | 17（含 PM 分析重复篇） | 9 |
| anthropic-hackathons | 11（含 5 scoring） | 5 |
| china-ai-landscape | 1（OVERVIEW） | 0（赛事/产品扫描，无独立项目） |
| **合计** | **85** | **42** |

- 提取方法：scoring 六维表 + 正/负证据 + 总分行；叙事报告首段、全部章节标题、关键架构句；key_quote 全部逐字取自原文。
- 诚信说明：42 个项目的项目级结论均有原文支撑；rapid-agent 叙事报告的产品经理长篇讨论部分采用结构化提取而非逐字精读，`09c-projects.tsv` 中两个项目（cassandra、datapulse）的 scoring 原文未给总分，已如实留空。
- 未覆盖文件清单：无（85 个目标文件全部纳入）。

---

## 1. 新正向模式（每条 ≥3 个项目实例）

### P+1 可审计的自主执行：AI 每做一个动作都留证据
Off-Duty（A/79）给每个动作记 `trace_id`、RegOps Shield（B/67）生成 SHA-256 审计包、Notely（A/75）用 `via_mcp` 标记真实执行路径、ScuttlePay（B+/73）每笔交易留链上 hash、FireGuard（A/80）提供可重放事件时间线。
> 引用（Off-Duty 原文）："每一个动作都会在 MongoDB 里留下一条带 trace_id 的审计记录……老板点一下就能看到这个动作实际读了/写了哪几条数据库文档。"
**邮轮含义**：船上 AI 要处理安全/消费/补给等不可逆动作，必须默认"可回放"。

### P+2 降级链与"演示永远能跑"：真实→模拟→模板，而不是把 mock 当耻辱
SLEUTH（B/71）真实 ES→Gemini 模拟→模板启发式三层退降且每层标 source；HVAC OpsForge（B/69）合成数据保证评审打开 demo 就能跑；Notely（A/75）MCP 不可用自动回退 PyMongo；Krashless 有 Sunset Mode（无 Key 时明示使用模拟数据）；Suture（B/74）mock/real 共用同一 prompt 只切换 client。
**邮轮含义**：卫星断网、评审现场无密钥是常态；产品要设计"诚实降级"，而不是期望网络永远可用。

### P+3 确定性裁判：AI 提建议，公式/统计/规则做最终判定
FireGuard 威胁分"纯确定性计算，每个参数都有文献背书"；Tenant Mix Optimizer（B/68）用 Cox 生存模型，AI"只翻译数字，不负责做数学"；HVAC OpsForge 用 PuLP 线性规划做调度；Alpha Agent 用 B-factor/Kd-tree 距离拦截 AI 的物理上不可能的蛋白质突变建议；Spatial Engine（A/82）AI 识别窗户朝向、物理公式算能耗。
**邮轮含义**：能耗、疏散风险、设备故障预测等关键数字必须由确定性层给出，LLM 只做解释。

### P+4 服务非技术用户的低门槛界面：语音/双语/默认全自动
WhereBear（A/82）双语回答超市问路；Sarathi（A/75）语音 + 16 种语言帮不识字的农民找福利；AgriAgent（A/82）让农民用一句话获得 7 个 Agent 的种植报告；Teacher Exam（A/90）默认 Fast Track 全自动出卷、异常才逐题人工审核；Off-Duty 让小店老板用自然语言管店。
**邮轮含义**：船员与老年乘客都不是技术用户；"默认自动 + 异常转人工"的双轨比纯对话界面更实用。

### P+5 过程透明化：让评委/用户看见 AI 每步在干什么
Mnemos（A/83）前端检索管道 scrubber 可拖动查看向量/BM25/RRF 每步命中；Notely Activity Feed 实时显示每次走 MCP 还是 PyMongo；SLEUTH 用 SSE 流式暴露 Agent 行为；FireGuard 可重放时间线；Globot Shield 的推理透明是既有模式。
**邮轮含义**：非技术评委只看"能不能看懂推理"，透明化本身是信任资产。

### P+6 Supervisor 按意图路由 + 专家 Agent 职责单一
Off-Duty 的 supervisor"按意图分发"；AgriAgent 的 Master Agent 汇总 7 个专家输出；HVAC OpsForge 用 Lead Architect + Specialist 结构；ReviewerOS（B/67）并行 5 个 AI 评委 + 确定性 Chair 兜底。
**邮轮含义**：工具越多，单个大 Agent 的选择准确率越低；按意图拆分会更稳。

### P+7 领域专家 × AI：真实行业知识 + Claude 才能造出不可能的产品
Wrench Board（A/90，微焊接技师独立完成，2600+ 测试 + 确定性电路仿真）；Pasal.id（A+/92，MCP-first 法律数据基础设施 + 自修正飞轮）；Teacher Exam（A/90，单人三周全栈）；OpenCanvas（244 行 PRD 再写代码）。
> 引用（Anthropic OVERVIEW 原文）："选手的专业领域知识 × Claude Code = 一个之前不可能存在的产品。"
**邮轮含义**：我们的差异化不在"AI 更强"，而在把邮轮领域约束（SOLAS、封闭空间、卫星网络）做成规则与测试。

---

## 2. 新反向模式（每条 ≥3 个项目实例）

### N-1 Split-brain：README/架构图 与运行代码是两套东西
Retail AI Agent（C/41）实际跑的是正则路由器，AI 在 `src/` 沉睡，两套实现互不引用；Aura（B/64）README 宣称 7-Agent、代码是 3 个 API 路由；CivicPulse（C/48）Gemini 与 MCP 只存在于 README"生产架构"；Triplix（C/56）MongoDB 层写好了、子 Agent 仍在读 CSV。
> 引用（Retail 报告原文）："测试通过的代码，和用户实际用到的代码，根本不是同一个东西。"

### N-2 MCP 贴纸继续高频出现
Retail（C/41）把 PyMongo 封装类起名 `MongoDBMCPServer`；Aura 的 MCP 是"最精致的贴纸"；RegOps Shield 的 `MCPServer` 类无 JSON-RPC/tools 协议；Triplix 的 Mongo 层注释"for MCP server tools"但从未接入。
**反例对照**：Notely 把 MCP 当真（stdio + streamable HTTP + JSON-RPC 完整握手）并获得加分——MCP 不是不能提，是不能假装。

### N-3 Agent 数量通胀与 350 行"编排师提示词"
Triplix 用 8 个 Agent、350 行提示词去"钉住"编排，下单仍是假的；Aura 宣称 7 Agent 实际 3 路由；ContribPilot（B/72）被评价为"Agent Overkill——开坦克去买菜"；Project Ronin（B/60）走向反面：产品不需要 Agent 却参加了 Rapid Agent 赛。
> 引用（Triplix 报告原文）："8 个智能体不如 2 个靠谱的智能体。多智能体的复杂度是乘法的。"

### N-4 核心价值动作是假的
Triplix 点"预订"只是在内存生成随机数；Retail 用正则表达式当 AI 卖；CivicPulse 的"RUN AGENT"实际跑手写确定性算法、AI 未接入。
> 引用（CivicPulse 报告原文）："它参加的是一个「AI Agent」比赛，交了一个「没有 AI」的作品。"
**注意**：与旧"电影布景"不同的是，这三位都"知道正确答案长什么样"，失败在没把管道接通。

### N-5 1 次提交仍是普遍病，且 A 档也不能幸免
WhereBear（A/82）1 commit、零测试；SLEUTH（B/71）2.3 万行 TS + 2000 行 Python 零测试；Synkron（B/74）零测试；Cybernetics（B/66）1 commit。2026-08 的 28 个 rapid 项目几乎全部是 1 次提交。
**含义**：在对手都 1 commit 的赛场上，我们保持小步提交就是低成本稀缺优势。

### N-6 AI-on-AI 验证的共谋风险
Teacher Exam scoring 明确指出：用同一个 AI provider 检查同一个 AI 的输出，系统性错误可能被同时漏过；Cassandra 的对抗性 eval 与红队正是针对该风险的缓解方案。
**邮轮含义**：方案书里的"AI 审核 AI"必须说明如何打破共谋（换模型、规则校验、人审）。

---

## 3. 与现有 patterns-judges-like.md（6 正 4 反）对照

| 现有条目 | 判定 | 本批证据 |
|---|---|---|
| 正向1：AI 感知 + 确定性计算分离 | **确认并升级** | FireGuard 文献公式、Tenant Mix Cox 模型、HVAC PuLP、Alpha Agent 物理验证、Suture 四步确定性——已从"感知"扩展到"决策裁判" |
| 正向2：多 Agent 职责单一 | **确认并补充** | 补充 Supervisor 意图路由（Off-Duty/HVAC/AgriAgent）；同时补边界：Agent 数量是成本，2 个可靠的优于 8 个失控的 |
| 正向3：闭环自主决策循环 | **部分改写** | SLEUTH Plan→Execute→Observe→Report、Cassandra 8 阶段、Suture 自愈循环成立；但多数高分作品其实是"确定性闭环 + LLM 解释"，纯 OODA 很少见 |
| 正向4：预写场景承载能力展示 | **确认并升级** | Globot 4:55PM、FireGuard 可重放时间线、Krashless Sunset Mode、SLEUTH 三层退降——升级为"预写场景 + 诚实降级链" |
| 正向5：推理过程透明化 | **确认并扩展** | 新手段：Mnemos 管道 scrubber、Notely via_mcp 标记、RegOps 审计包、FireGuard 重放 |
| 正向6：低端颠覆 | **确认并扩展** | WhereBear/AgriAgent/Sarathi/Teacher Exam 都是"服务请不起专家的长尾"，比 Spatial Engine 更极端 |
| 反向1：电影布景 | **确认** | CivicPulse（无 AI 的应急指挥）、Retail（正则当 AI）、Aura（7 Agent 幻觉）；注意 CivicPulse 的"诚实布景"依然只拿 C/48 |
| 反向2：Multi-Agent 贴纸 | **确认并细化** | 细化为两类：Aura/Triplix 的"数量通胀"，与 Retail/CivicPulse 的"split-brain 两套实现" |
| 反向3：MCP 标签 | **确认** | 新增 Retail/Aura/RegOps/Triplix 四例；Notely 证明"真 MCP + 诚实降级"反而加分 |
| 反向4：1 次提交 | **确认且加重** | 2026-08 批次 28 个项目近乎全员 1 commit；Git 迭代痕迹已从"扣分项"变成"稀缺加分项" |

---

## 4. 邮轮映射点子库（节选；完整 42 条见 TSV）

| 来源项目 | 映射痛点 | 可迁移点子 |
|---|---|---|
| WhereBear A/82 | #20 多语言、#34 信息孤岛 | 船上"XX 在哪里"双语语音问答，检索失败走确定性安全网 |
| SLEUTH B/71 | #34 设备维护 | 设备故障自主调查：真实传感器→模拟→模板三层退降 |
| Off-Duty A/79 | #32 重复问题、#39 船员超负荷 | 夜班/无人值守服务台，每个动作留 trace_id 审计 |
| FireGuard A/80 | #28 落水、#30 紧急决策 | 疏散/落水风险用文献公式算分，AI 只写简报 |
| HVAC OpsForge B/69 | #34 派单、#41 排班 | AI 理解需求 + PuLP 确定性排班 |
| Geopolitical A/76 | #35 补给、航线规划 | 港口/地缘事件→AI 检索 + 确定性影响评估 |
| LUCID A/77 | #16 岸上游被宰、#23 冲动消费 | 岸上游防宰/消费冷静期：LLM 安抚 + 规则拦截 |
| Sarathi A/75 | #25 无障碍、#20 多语言 | 语音帮老年乘客发现自己可用的服务与权益 |
| Tenant Mix B/68 | #11 餐厅拥挤、#48 航线决策 | 餐厅/商铺组合用生存分析预测，AI 翻译数字 |
| GAFFER 86 | #9 登船信息过载、#18 活动发现 | 港口/活动信息三层校验后再推送，防编造 |
| Mnemos A/83 | #21/#33 投诉闭环 | 答应乘客的事自动入账、催办、留证据 |
| RegOps B/67 | #29 演习、#30 紧急决策 | 关键操作先"影子执行"+SHA-256 审计包 |
| Methods Reconstructor A/80 | #30 安全规程 | SOLAS/手册条款多级引用自动还原 |
| AGNTIC Winner | #11 拥挤、#28 安全感知 | 拍视频在本地训练"拥挤/空位"分类器，数据不出船 |
| Alpha Agent / Spatial Engine | #33 能耗 | AI 提节能建议，物理/工程公式做裁判 |
| Globot Shield A/81 | 运营危机 | 预写"台风改道/补给中断"危机场景 + 真实计算内核 |
| KaiVM | 老旧船载系统 | 不改船载软件，物理外设 + 视觉让 AI 操作遗留界面 |
| Krashless | #3 舱型、#24 噪音 | 上传空间改造方案→3D 安全评估→人工审批 |
| Mangstoon | #23 购物、#38 离船落差 | 照片→漫画纪念品，Face/Outfit 分离保护隐私 |
| OpenCanvas | #45 库存 | 船员无代码拖节点编排"拍照→识别→补货单" |
| Agent Notch A/84 | #43 决策压力 | 本地屏幕理解 + 语音操控，隐私优先 |
| Pasal.id A+/92 | #29/#30 合规 | 邮轮法规库做成 MCP 基础设施，可引用可修正 |
| ScuttlePay B+/73 | #45 自动补给 | AI 自动采购必须限额 + 链上审计 |
| Teacher Exam A/90 | #40 船员培训 | 船员考核出题：默认自动、异常逐题人工 |
| Wrench Board A/90 | #34 设备维修 | AI 诊断 + 确定性仿真 + Auditor 交叉检查 |
| Triplix C/56 | #18 活动推荐 | 反例：行程/活动推荐 Demo 不得假预订 |
| CivicPulse C/48 | #30 应急 | 反例 + 资产：规则引擎是地基，但 AI 必须在场 |

---

## 5. 数据断点与后续

1. Cassandra、DataPulse 两个 scoring 原文未给总分，已在 TSV 留空；
2. China-AI-Landscape 无项目级 TSV 行；其关键发现"国内竞赛偏算法层、国际黑客松方法不适用"应作为单独背景进入 patterns v2；
3. 本批只覆盖 rapid-agent 2026-08 与 gemini3/anthropic；rapid-agent 2026-06/07 的其余 166 篇需由 ⑨a/⑨b 流继续；
4. 建议下一步把 P+1/P+2/P+3 与旧 6 正合并成 `patterns-judges-like-v2.md` 的候选章，并用 grill-me 压测后再定稿。

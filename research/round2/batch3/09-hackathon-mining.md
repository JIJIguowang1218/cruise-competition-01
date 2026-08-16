# 调研流⑨：Hackathon-reading 经验库全量挖掘

> 子代理：主代理直执行 | 完成时间：2026-08-16 | 状态：完成
> 经验库：`/c/Users/LHM/Desktop/HermesWorkspace/Hackathon-reading/analysis/`
> 覆盖范围：223 篇 md 全部至少标题级；高分段 + 2026-07 之后新分析 + 主题命中文件精读关键段落。

## 0. 执行摘要

全库共 223 篇（rapid-agent 194 / gemini3 17 / anthropic-hackathons 11 / china-ai-landscape 1，最新到 2026-08-16）。旧 `patterns-judges-like.md` 的 6 正 4 反只用了约 30 篇（约 13.4%），本轮补上其余 190+ 篇后发现：旧 10 条模式全部仍成立，但需要三层升级——①「确定性护栏 + 代码级 HITL」已从个别亮点变成高分项目的标配；② 2026-07 之后出现一整簇「元 Agent / AI 自愈 / trace→回归测试」新品类（Cassandra 93 S、AgentCI 88、GAFFER 86、Self-Healing 85、Phoenix2Pytest）；③ 反面清单必须新增「核心动作造假」（随机数订单、正则冒充 AI、硬编码推理）和「PRD-only 空壳」。对邮轮竞赛最直接的迁移是：人流分流应做「确定性计数 + LLM 叙事 + 审批/证据抽屉」，设备运维应做「物理/统计确定性计算 + AI 翻译 + 生存分析式预测」，任何 Demo 都要有 MOCK_MODE 与真实 AI 路径的显式分离。

## 1. 全库统计与高分清单

### 1.1 覆盖统计

| 目录 | 文件数 | 覆盖方式 |
|---|---:|---|
| rapid-agent | 194（叙述 97 + 评分 97） | 全部标题级；评分段逐份提取；高分段精读 |
| gemini3 | 17 | 全部标题级；OVERVIEW + 高分段精读 |
| anthropic-hackathons | 11 | 全部精读关键段（4 个项目 + OVERVIEW + 评分对） |
| china-ai-landscape | 1 | 通读 OVERVIEW |

### 1.2 评分分布（脚本提取，格式不统一处已归一）

| 分数段 | 数量 | 代表 |
|---|---:|---|
| 90+（S/A+ 级） | 4 | Cassandra 93、Pasal 92、Teacher Exam 90、Wrench Board 90 |
| 85–89 | 8 | Karma 88、AgentCI 88、Synt 87、Aegis 87、GAFFER 86、Ripple 85、Self-Healing 85、Phoenix2Pytest 86 |
| 80–84 | 18 | Scam Swarm 84、AGNTIC 84、Phoenix Audit 84、Mnemos 83、PitchCraft 82、AgriAgent 82、Spatial Engine 82、Globot Shield 81、AMRShield 80、Methods Reconstructor 80 等 |
| 75–79 | 14 | StoreOps 79、Working Capital Optimizer 79、RepoGuard 77、Vigil 77、DQ Sentinel 76、Voiceless 75 等 |
| 60–74 | 38 | HVAC Ops 69、CrowdPilot 68、RegOps Shield 67、MediGuard 73 等 |
| <60 | 6 | CityGuard 45、MallCore 45、EventBoost 35、Essay Evaluator 34、ThesisMate 53、RapidEarn 50 |

> 提取限制：43 篇无统一总分格式（部分只有文字评级），上述分布为保守下界；另有 2 篇 S 级字样但仅 Cassandra 有 93 分硬数据。

### 1.3 高分/高价值项目清单（用于邮轮方向的优先参考池）

| 项目 | 目录 | 分/级 | 一句话 |
|---|---|---|---|
| Cassandra | rapid-agent | 93 S | Meta-Agent：8 阶段自动巡查/诊断/修复 AI Agent |
| Pasal | anthropic | 92 A+ | 「给 AI 加法律」：结构化数据源让 AI 从幻觉机变知识入口 |
| Teacher Exam | anthropic | 90 A | 教师出卷全链路 + 课程大纲守护者二次 AI 验证 |
| Wrench Board | anthropic | 90 A | 先离线建知识、再在线诊断；Scout 少于 3 来源就重搜 |
| Karma | rapid-agent | 88 A | 学习服务真实行为，测「你忘了写文档的契约」 |
| AgentCI | rapid-agent | 88 A | prompt 变更的 CI：record/replay + 跨模型判分 + guard 记忆 |
| Synt | rapid-agent | 87 A | OODA 循环 + 推理剧场 + 离线优先 |
| Aegis | rapid-agent | 87 A | 裁判团评分 → 学习循环 → 人类 PM 审批 |
| GAFFER | rapid-agent | 86 A | 自我教练：评分 0.20 → 0.95，Phoenix 当部署机制 |
| Ripple | rapid-agent | 85 A | 事故 → 代码审查的永久肌肉记忆，全路径 programmatic fallback |
| Self-Healing Agent | rapid-agent | 85 A | 4 层降级哲学 + 便宜优先 |
| Scam Swarm | rapid-agent | 84 A | 启发式引擎 + LLM 语义双层 |
| Spatial Engine | gemini3 | 82 A | AI 感知 + 物理公式计算 |
| Globot Shield | gemini3 | 81 A | 5 Agent + 预写场景 + 红蓝辩论 |
| Working Capital Optimizer | rapid-agent | 79 A | 确定性算财务，LLM 做推理，法官打分 |
| StoreOps | rapid-agent | 79 A | 证据抽屉 + MOCK_MODE 零配置演示 |
| DQ Sentinel | rapid-agent | 76 A- | 审批门是结构性设计（注意：旧文档误记为 A+/95） |
| CrowdPilot | rapid-agent | 68 B | 4-Agent 顺序流水线做人群应急决策 |
| FireGuard | rapid-agent | —（A 级文字） | 确定性威胁分 + 真实历史数据锚定的撤离 Demo |
| CivicPulse | rapid-agent | 48 C | 无 AI 但诚实：确定性规划器可作为未来 AI 的测试基准 |

## 2. Nugget 清单（原子证据，65 条）

> 每条一个观察；项目名+目录+评分；引用为该文件中的原文/结构性事实。

| # | 项目 | 目录 | 评分 | 观察（单条） |
|---:|---|---|---|---|
| 1 | Cassandra | rapid-agent | 93 S | 唯一 S 级：Meta-Agent 监督其他 AI，8 阶段 Watch→Diagnose→RootCause→Patch→Replay→RedTeam 闭环全自动 |
| 2 | Cassandra | rapid-agent | 93 S | 「确定性部分不做 AI，不确定性部分交给 AI」；核心管道是纯 Python 可测试类，ADK 只是约 30 行运行时外壳 |
| 3 | Cassandra | rapid-agent | 93 S | 最大短板是单 commit 无迭代痕迹、缺端到端集成测试——S 级项目的扣分点也是这两项 |
| 4 | Pasal | anthropic | 92 A+ | 「不是给法律加了 AI，是给 AI 加了法律」：先做结构化数据基础设施，MCP 是产品、网站是演示 |
| 5 | Pasal | anthropic | 92 A+ | 目标用户三层定位（AI 终端用户/法律科技开发者/法律从业者），拒绝「服务全印尼人民」式空泛定位 |
| 6 | Teacher Exam | anthropic | 90 A | 从教师工作流出发的全链路产品：生成→逐题审核→A4 打印预览→「课程大纲守护者」二次 AI 验证 |
| 7 | Teacher Exam | anthropic | 90 A | 明确「关键非用户」：学生、家长、校长、初高中老师不做，功能决策不向他们妥协 |
| 8 | Wrench Board | anthropic | 90 A | 「先离线建知识，再在线做诊断」；烙铁一直在人手里，AI 做不会累的副手 |
| 9 | Wrench Board | anthropic | 90 A | Scout 搜索设「太薄就重搜」阈值：症状/组件/来源都少于 3 个就扩大搜索，不够就不要 |
| 10 | Wrench Board | anthropic | 90 A | 190 行 sanitizer 注释比代码长：信任一旦破裂，工具就被抛弃 |
| 11 | Karma | rapid-agent | 88 A | 洞察：测试只检查你写过的契约，生产事故来自「你忘了自己曾做过的事」；Learner 用 AI 生成 Contract，Watcher 用确定性 DQL 执行 |
| 12 | Karma | rapid-agent | 88 A | 「Empty ≠ nothing wrong」：把「没找到证据」和「没有证据」在 prompt 中显式区分 |
| 13 | AgentCI | rapid-agent | 88 A | prompt 变更 CI：40 题冻住测试集 + 4 个 LLM-as-Judge + 跨模型判分（Claude Haiku 给 Gemini 打分），防自己给自己判作业 |
| 14 | AgentCI | rapid-agent | 88 A | record/replay cache 让 LLM 调用可确定性回放；82 个测试全部离线通过 |
| 15 | Synt | rapid-agent | 87 A | OODA 循环：观察→判断→决策→行动→再观察，持续调查直到假设被确认或排除 |
| 16 | Synt | rapid-agent | 87 A | 推理剧场（思维流+力导向图+案件报告）让评委看到 AI 每一步在干什么 |
| 17 | Aegis | rapid-agent | 87 A | PM 无工程背景用 AI 造出可运行产品：裁判团 5 维打分→Phoenix 轨迹→学习循环→人类 PM 批准才部署 |
| 18 | Aegis | rapid-agent | 87 A | Phoenix MCP 不是装饰品而是承重墙：关掉它代理质量肉眼可见下降 |
| 19 | GAFFER | rapid-agent | 86 A | 自我教练 21 轮后评分 0.20→0.95；Phoenix 当 CI/CD 部署机制而非监控面板 |
| 20 | Phoenix2Pytest | rapid-agent | 86 A | 从 Phoenix 标注的失败 trace 自动生成 pytest：Gemini Flash 提取证据（便宜），Gemini Pro 生成测试（贵）——按成本分模型 |
| 21 | Ripple | rapid-agent | 85 A | 事故→代码审查的永久记忆；每个 AI 调用路径都有 programmatic fallback，AI 失败不阻塞 |
| 22 | Self-Healing Agent | rapid-agent | 85 A | 4 层降级（Phoenix→本地 trace、Gemini 评估→词匹配、LLM 改写→规则模板、LIVE→DEMO）是设计哲学而非事后兜底 |
| 23 | Self-Healing Agent | rapid-agent | 85 A | 「便宜优先」：调 LLM 前先正则/缓存/既有规则，可砍约 70% API 调用量 |
| 24 | Mnemos | rapid-agent | 83 A | 代理只生成提案：批准后才执行真实动作；没连 OAuth 就模拟，并诚实标注边界 |
| 25 | Scam Swarm | rapid-agent | 84 A | 双层架构：确定性启发式引擎做阈值/黑名单，LLM 只做语义理解，各取所长 |
| 26 | Scam Swarm | rapid-agent | 84 A | Gemini 与 Groq 一键切换：模型级降级方案，解决 API 版本升级 404 的真实事故 |
| 27 | Spatial Engine | gemini3 | 82 A | 「像设计师一样看，像物理学家一样算」：Gemini Vision 读窗尺寸/朝向，硬编码物理公式算能耗 |
| 28 | Spatial Engine | gemini3 | 82 A | 诚实标注 Vision Audit 为 mocking：核心价值目前是愿望代码，但诚实标注是好习惯 |
| 29 | Globot Shield | gemini3 | 81 A | 5 个 Agent 各管一域（市场/物流/金融/合规/红蓝辩论），决策层定位避开感知层红海 |
| 30 | Globot Shield | gemini3 | 81 A | 预写「4:55PM 危机」场景：涉及真实金融/法律数字时，demo 的确定性比灵活性更重要 |
| 31 | AMRShield | rapid-agent | 80 A | 医疗双层安全：确定性规则（Cockcroft-Gault 公式）做安全门，LLM 做指南合规语义审查 |
| 32 | Methods Reconstructor | rapid-agent | 80 A | LLM 只做分解/判断/组装，检索、评分、引用链追踪全部确定性代码——「AI 做它擅长的，代码做它擅长的」 |
| 33 | NOCAPY | rapid-agent | 80 A | 刻意不做综合评分，逐条追踪财经预测准确度：拒绝黑箱总分，证据可逐条核查 |
| 34 | StoreOps | rapid-agent | 79 A | 证据抽屉：每个动作带 trace_id 审计记录，老板能回溯 AI 实际读了/写了哪条数据库文档 |
| 35 | StoreOps | rapid-agent | 79 A | 演示设计：MOCK_MODE=true 零配置跑完整 UI，附 3 分钟演示脚本和「直播挂了怎么办」兜底话术 |
| 36 | Working Capital Optimizer | rapid-agent | 79 A | 确定性 Python 算 DSO/DPO/安全库存，LLM 只做推理建议；「问 LLM 算 DSO 是危险的」 |
| 37 | Working Capital Optimizer | rapid-agent | 79 A | 独立法官 Agent 按相关性/可执行性/财务影响/风险意识给每条建议打分 |
| 38 | RepoGuard | rapid-agent | 77 A | 自写 MCP JSON-RPC 客户端而非贴 SDK：集成深度比标签重要 |
| 39 | Vigil | rapid-agent | 77 A | 合规调查 Agent：把检索到的每条证据与结论绑定，可追溯 |
| 40 | DQ Sentinel | rapid-agent | 76 A- | 审批门是结构性设计：执行路径不经 LLM，人类审批通过才触发 ACT；23 个对抗 Agent 尝试绕过，0 成功 |
| 41 | DQ Sentinel | rapid-agent | 76 A- | AI 是管道中的确定性步骤：结构化 JSON 进、结构化 JSON 出，失败只返回 diagnosis_failed |
| 42 | DQ Sentinel | rapid-agent | 76 A- | 旧项目文档把它记成 A+/95，实际评分文件是 76/100 A-——旧结论需更正 |
| 43 | Geopolitical Health | rapid-agent | 76 A | 业务计算（财务/断货概率/供应商评分）全用确定性 Python；采购订单全部 draft + requires_human_approval |
| 44 | Voiceless | rapid-agent | 75 A | 「不完美 AI + 人类校验」管道：承认 AI 边界，把人工介入设计成产品一部分 |
| 45 | Voice Care | rapid-agent | 82 A | 代码级安全护栏 > prompt 级：验证门与症状分诊是 Python 函数，prompt injection 无法绕过 |
| 46 | Voice Care | rapid-agent | 82 A | 241 个测试；MongoDB 不可用时报告 unavailable 而不是编数据 |
| 47 | MediGuard | rapid-agent | 73 B+ | 确定性规则做安全门，LLM 做临床推理：错是「漏报」而不是「捏造」，漏报更可控 |
| 48 | MediGuard | rapid-agent | 73 B+ | Agent 不是免费的：按需调度，每多调一个 Agent 就多一次延迟和幻觉风险点 |
| 49 | HVAC Ops | rapid-agent | 69 B | 多 Agent 运营指挥中心映射真实分工：库存/风险/排班/应收；LLM 只做计划，计算用确定性算法 |
| 50 | HVAC Ops | rapid-agent | 69 B | 用 OpenAI 参加 Google 赛被扣分——「用了错误的 AI」；换对供应商+补迭代即可升 A |
| 51 | CrowdPilot | rapid-agent | 68 B | 4-Agent 顺序流水线：Forecast→Incident→Resource→Operation，每个输出是下一个输入，映射应急决策步骤 |
| 52 | CrowdPilot | rapid-agent | 68 B | instruction 写 CRITICAL RULES 强制工具调用；但核心风险评分仍黑箱，无规则引擎 fallback |
| 53 | Tenant Mix Optimizer | rapid-agent | 68 B | 生存分析（Cox PH）给「还有多久」而非「走/不走」；风险计算与政策判断零 LLM 依赖 |
| 54 | Tenant Mix Optimizer | rapid-agent | 68 B | 「LLM 做语言，代码做算术」：系统从不自动发「劝退」，最激进也只到「重新谈判」并标记让人决定 |
| 55 | RegOps Shield | rapid-agent | 67 B | Shadow-Run 影子执行：放款前 AI 先模拟全流程审批，模拟与真实执行分离，可迁移到任何合规行业 |
| 56 | RegOps Shield | rapid-agent | 67 B | 反面：HITL 只是字符串，没有真实审批门控；风险分纯 LLM 输出无规则兜底——合规场景的隐患 |
| 57 | TracePilot BKD | rapid-agent | —（B 级） | Economic Memory：成功率/延迟/成本/恢复成本加权成 0-1 分，>0.5 利用、否则探索——路由决策不让 LLM 做 |
| 58 | FireGuard | rapid-agent | 80 A | 威胁分纯确定性计算，参数有遥感文献支撑；AI 只把结构化证据翻译成简报 |
| 59 | FireGuard | rapid-agent | 80 A | Demo 锚定真实事件：打包 Williams Lake 7 天真实 FIRMS 火点/撤离区/避难所数据，高保真而非编造 |
| 60 | FireGuard | rapid-agent | 80 A | 支持 hypothetical_closures what-if：操作员可问「如果 97 号高速关了会怎样」，系统带假设重评路线 |
| 61 | CityGuard | rapid-agent | 45 C | 电影布景原型：UI 精美、Run Scenario=setTimeout 600ms、Agent 推理是预写字符串 |
| 62 | MallCore | rapid-agent | 45 C | README 列 MCP 但代码无 SDK：MCP 贴纸原型 |
| 63 | NeuroStudy | rapid-agent | 52 C | 声称 5 个 AI 老师，实际同一 prompt 改词调 5 次：Multi-Agent 贴纸原型 |
| 64 | Essay Evaluator | rapid-agent | 34 D | 电影布景教科书：7 步管线精美但全部硬编码 |
| 65 | EventBoost | rapid-agent | 35 D | PRD-only：产品文档市场分析扎实，但 0 行代码，空壳仓库 |
| 66 | Thesismate | rapid-agent | 53 C | Phantom Agent：7 步管线全部硬编码，外观完整内核为空 |
| 67 | Triplix | rapid-agent | 56 C | 核心动作造假：预订成功=random.randint 生成 booking_id 存内存，无支付无持久化 |
| 68 | Google Rapid Retail | rapid-agent | 41 C | 正则冒充 AI：main.py 无任何 AI import，17 类指令全是 re.search；README 却宣称 Gemini+MCP |
| 69 | CivicPulse | rapid-agent | 48 C | 诚实的蓝图：明说模拟器、无 AI，但确定性风险权重表（变电站21/燃气20/诊所18）是未来接 AI 的宝贵地基 |
| 70 | Notely | rapid-agent | 75 A | AI 必要性检验：拿掉 AI 只剩普通笔记论坛——「学术记忆」闭环没有 AI 做不出来 |
| 71 | WhereBear | rapid-agent | 82 A | 多语言超市导购：把「听不懂对方语言」的即时需求做成多模态 Agent 场景 |
| 72 | Sarathi | rapid-agent | 75 A | 面向低识字率农民：语音优先 + 不识字可用，验证指标是农民看到补贴数字时的表情 |
| 73 | Lucid | rapid-agent | 77 A | 诈骗战场不是转账页而是被操控的判断力：产品围绕心理干预而非技术拦截 |
| 74 | Revieweros | rapid-agent | —（A 级文字） | 5-Agent 评审面板按问题维度拆（科学/商业/风险/诚信），Chair 有确定性加权公式 fallback |
| 75 | Krashless | gemini3 | 75 A | 事故视频→3D 重建→政府 SaaS：多模态「从识别到理解」的跨越 |

> 说明：表中「—（X 级文字）」表示该文件未给出统一 100 分制总分，评级取自正文结论；其余分数取自各 -scoring 文件或正文总分表。

## 3. 新正向模式（每个 ≥3 个独立项目）

### P1 Meta-Agent 与 AI 自愈闭环
证据：Cassandra（93 S，监督其他 Agent）、AgentCI（88，prompt 变更 CI + 根因调查 + guard 记忆）、GAFFER（86，自我教练 0.20→0.95）、Self-Healing Agent（85，自愈 7 步循环）、Phoenix2Pytest（86，trace→pytest）、TracePilot BKD（B，Economic Memory 路由康复）、Ripple（85，事故记忆）。
模式内容：把「监控→诊断→修复→回归验证」做成自动化循环；判分与修复用不同模型/独立 Agent，防止自己给自己判作业；修复必须过保留集和 guard 两面歧视测试。
邮轮映射：人流分流系统的推荐 Agent 可配一个「审计 Agent」回放每次推荐后果；设备运维可把告警→诊断→工单→验证做成自愈循环。

### P2 确定性护栏 + 代码级 HITL
证据：DQ Sentinel（76，审批门结构性、执行路径不经 LLM、23 Agent 绕过 0 成功）、Voice Care（82，Python 验证门与症状分诊）、MediGuard（73，规则做安全门）、Geopolitical Health（76，采购单 draft+审批）、StoreOps（79，写操作全部进审批箱 + 证据抽屉）、Mnemos（83，只提案不执行）。
模式内容：安全不是 prompt 说「你不应该」，而是「模型根本没有那个工具/执行路径」。读写分离、审批队列、证据审计三件套是高风险场景标配。
邮轮映射：推荐/分流只读建议可自动，改线/开闸/推送全量通知必须审批；船员面板要有证据抽屉。

### P3 「LLM 做语言，代码做算术」的精确分工
证据：Working Capital Optimizer（79，Python 算 DSO/DPO，LLM 做建议）、Tenant Mix Optimizer（68，生存分析零 LLM，Gemini 只写叙事）、Spatial Engine（82，物理公式算能耗）、AgriAgent（82，确定性合并 + Master 叙事化）、FireGuard（80，威胁分确定性）、Methods Reconstructor（80，检索/评分/引用链全代码）、TracePilot BKD（路由分是数学公式）。
模式内容：先问「这一步需要判断还是需要精确」；算术、阈值、合规、路由全部确定性，语言生成与语义理解才用 LLM。
邮轮映射：人流计数、等待时间、步行时间、安全约束、能耗计算全部确定性；只有「把 78% 满载翻译成推荐话术」用 LLM。

### P4 分层降级与 Demo 工程化
证据：Self-Healing Agent（4 层降级）、Scam Swarm（双模型热切换）、Ripple（每 AI 路径 programmatic fallback）、StoreOps（MOCK_MODE + 演示脚本 + 直播兜底话术）、HVAC Ops（MongoDB 不可用自动降级合成数据）、Revieweros（Chair 确定性 fallback）、CivicPulse（确定性模拟器永远能跑）。
模式内容：把「各种环境都能跑」当设计前提；离线 mock 与真实 AI 路径显式分开，并且诚实标注哪部分是 mock。
邮轮映射：比赛 Demo 必须预写 11:45 午餐场景 + 真实 LLM 推荐链路 + 模型不可用时规则降级；README 写明 MOCK_MODE 与 REAL_MODE 差异。

### P5 证据可追溯 / 审计优先
证据：StoreOps（trace_id 证据抽屉）、Phoenix Audit（84，合规审计 90 秒自动流程）、Karma（Contract 可被确定性复检）、NOCAPY（80，逐条预测追踪不做总分）、RegOps Shield（影子执行审计包）、Mnemos（引用标记）。
模式内容：用户不信 AI 结论，信「结论能回溯到哪条数据」。把每一步读/写/算的证据链做成产品界面，而不是后台日志。
邮轮映射：分流建议旁展示「依据：餐厅 A 容量 380，当前 312，步行 4 分钟」的证据卡片；运营决策保留审计包。

### P6 AI 必要性检验
证据：Notely（75，拿掉 AI 只剩论坛）、Teacher Exam（90，课程大纲守护者）、Pasal（92，给 AI 加数据）、Wrench Board（90，跨设备知识图谱）、FireGuard（80，60 秒局势图）、CivicPulse（48，AI=0 的对照样本）。
模式内容：问「把 AI 拿掉产品还成立吗」；不成立或只剩 CRUD 的，要么重做 AI 价值点，要么老实叫规则系统。
邮轮映射：每提一个 AI 能力都要能回答「没有 AI 时船员现在怎么做、慢多少、错多少」。

### P7 低频高后果决策支持（不是替代人）
证据：FireGuard（80，撤离决策）、CrowdPilot（68，人群应急）、CivicPulse（48，蓝图）、Tenant Mix Optimizer（68，租户流失）、AgriAgent（82，一年两次种植决策）、Geopolitical Health（76，断供风险）、Karma（88，迁移回归）。
模式内容：场景低频但错了代价高，产品卖「压缩信息拼图时间 + 可审计建议」，不卖全自动。
邮轮映射：应急、设备故障、库存断供、人流高峰都属于这一类——强调「把 45 分钟拼图压成 1 分钟」而非「AI 替你决策」。

## 4. 新反面模式

### N1 核心动作造假（比电影布景更隐蔽）
证据：Triplix（56，booking_id=random.randint，无支付无持久化）、Google Rapid Retail（41，正则冒充 AI）、Thesismate（53，7 步硬编码）、CityGuard（45，setTimeout）、Essay Evaluator（34，硬编码评审）。
模式内容：界面与叙事里「AI 做了 X」，代码里 X 是随机数/正则/预写字符串。评委只要点一次核心动作就穿帮。
邮轮警告：Demo 里「AI 实时分流」如果热力图是 PNG、推荐文本是 setTimeout 字符串，直接落入此模式。允许 mock 数据源，不允许 mock 核心逻辑。

### N2 MCP/多 Agent 贴纸的 2026 新版
证据：MallCore（45，README 有 MCP 代码无 SDK）、RegOps Shield（67，MCP 贴纸被点名扣分）、Triplix（56，Mongo 层写好子 Agent 仍读 CSV）、CivicPulse（48，MCP 时间线是画出来的）、Google Rapid Retail（41，宣称 Gemini+MCP 实际正则）。
模式内容：贴纸换了形式——画 MCP 时间线、写「生产架构」章节、集成一半留一半。评委的检查点是「关掉它，产品还变不变差」。
邮轮警告：不写「摄像头 MCP」「AIS MCP」当卖点；写清每个数据源真实接入状态。

### N3 Agent 数量与「按需调度」失衡
证据：Triplix（8 个 Agent、350 行提示词钉行为仍失控）、AgriAgent（82 高分但 7 Agent 串联无重试/降级，被点名风险）、MediGuard（73，明确「Agent 不是免费的」按需调度）、CrowdPilot（68，4 Agent 线性流水线是合理上限）。
模式内容：Agent 数量是成本与失控风险，不是卖点；「问题有几个独立维度」决定 Agent 数。
邮轮警告：方案书若写多 Agent，必须说明每个 Agent 独立输入输出、通信方式、失败时谁兜底；3-4 个足够。

### N4 PRD-only 与「诚实的空壳」
证据：EventBoost（35，市场分析极佳但 0 代码）、CivicPulse（48，诚实标注无 AI 仍只 C）、Thesismate（53，外壳完整内核空）。
模式内容：本竞赛是 AI 方案竞赛不是纯产品设计竞赛；诚实能避免归零，但救不了核心价值缺失。
邮轮警告：我们有很强的设计文档传统，必须配可运行 Demo；可运行 > 精美 mock > 诚实 PRD > 造假成品。

## 5. 旧 `patterns-judges-like.md` 6 正 4 反逐条判定

| 旧模式 | 判定 | 依据 |
|---|---|---|
| 正1 AI感知+确定性计算分离 | 确认并大幅扩充 | 旧证据 Spatial/Scam/AMRShield 之外，新增 WCO、Tenant Mix、AgriAgent、FireGuard、Methods Reconstructor、TracePilot、Karma、Voice Care、MediGuard 共 9 个独立项目同构 |
| 正2 多Agent职责单一 | 确认并加修正 | 旧证据 Globot/Scam/AMRShield 仍成立；新增 CrowdPilot（线性流水线正例）、Revieweros（按问题维度拆）；修正：Agent 数量要少而真（Triplix/AgriAgent 风险），MediGuard 按需调度是更优解 |
| 正3 闭环自主决策循环 | 确认并升级 | 旧 Synt OODA/Globot 红蓝；新增 Cassandra 8 阶段、DQ Sentinel 7 步、GAFFER 自我教练、Self-Healing 自愈、AgentCI 调查闭环——闭环从「产品叙事」升级为「可回归验证的工程管道」 |
| 正4 预写场景承载能力 | 确认并升级 | Globot 4:55PM 仍是最佳；新增 StoreOps 三件套（MOCK_MODE/演示脚本/直播兜底）、FireGuard 真实历史数据锚定、HVAC 合成数据降级；升级点：mock 必须与真实 AI 路径显式分层 |
| 正5 推理过程透明化 | 确认 | Synt 推理剧场之外，Mnemos 实时推理流、Voice Care 工具调用动画、StoreOps 证据抽屉、NOCAPY 逐条证据同方向 |
| 正6 TurboTax 低端颠覆 | 确认并扩充 | Spatial Engine 之外，Aegis（医保申诉）、StoreOps（雇不起店长的小店）、Sarathi（低识字率农民）、FireGuard（应急指挥官副驾）同构 |
| 反1 电影布景 | 确认并加新样本 | CityGuard/Essay Evaluator 之外，新增 Thesismate、Triplix、Google Rapid Retail（核心动作造假变体） |
| 反2 Multi-Agent贴纸 | 确认并加新样本 | NeuroStudy 之外，Triplix 8 Agent 失控是 2026 新版；修正：看通信/独立输入输出/失败兜底，不看数量 |
| 反3 MCP标签 | 确认并加新样本 | MallCore 之外，RegOps Shield、CivicPulse、Google Rapid Retail、Triplix 半集成同病 |
| 反4 1次提交 | 部分确认+修正 | 大量高分项目仍是 1 commit（Cassandra/GAFFER/FireGuard/WCO），但 Ripple 的 176 个测试说明 squash 不等于无迭代；评分应结合代码结构与测试，不能只数 commit；对本项目的要求不变：小步提交保迭代证据 |

## 6. 对邮轮三方向的迁移建议 + 数据断点

### 6.1 方向一：人流感知与智能分流（空间与体验）
1. 采用 Scam Swarm 双层：摄像头计数/等待时间/步行时间/安全约束全部确定性（YOLO/OpenCV + 甲板图距离公式），LLM 只生成推荐话术。
2. 借鉴 CrowdPilot 顺序流水线（感知→评估→推荐→调度），但必须补 FireGuard/CivicPulse 式确定性风险权重表，给「为什么是高风险」可解释证据。
3. Demo 采用 Globot 预写 11:45 场景 + StoreOps 三件套；热力图数据可 mock，但计数逻辑与推荐链路要真实可跑，并给「证据抽屉」。
4. 推荐动作分级：只读建议自动；全量推送/改引导方案进审批队列（DQ Sentinel/Voice Care 的代码级 HITL）。
5. 预置降级：LLM 不可用时退化为规则推荐「3 楼有空位」（Self-Healing/Scam Swarm 模式）。

### 6.2 方向二：设备运维与能耗（智能运营）
1. 能耗用 Spatial Engine 模式：AI 识别使用模式，物理公式算负荷；库存/DSO 式指标用 WCO 的确定性 Python 先行。
2. 设备健康预测可用 Tenant Mix 的生存分析思路，输出「还有多久/风险随时间变化」，而非二分类「坏/不坏」。
3. 多 Agent 只做 3-4 个职责单一者（感知/诊断/调度/报告），参考 HVAC Ops 的映射，但用对模型并补重试/降级。
4. 写操作（工单、备件下单）全部审批 + 审计包（Geopolitical Health、RegOps Shield 影子执行）。
5. 无历史数据是硬约束：用 Karma 的 synthetic-env 思路造「会真实产生遥测的仿真环境」，并诚实标注数据来源。

### 6.3 方向三：安全感知/无障碍（差异化）
1. 安全类必须代码级护栏：规则做安全门、LLM 做语义（Voice Care/MediGuard/AMRShield）；任何「AI 判断是否报警」都要有确定性复核。
2. 多模态交互参考 WhereBear/Sarathi/Voiceless：先做「不完美 AI + 人工校验」管道，不追求全自动。
3. 应急决策做 FireGuard 式「60 秒局势图」：把分散信息压缩成简报 + 地图，人做最终决策。
4. 隐私合规：摄像头「仅计数不识别」不是口号，要做成确定性预处理层，并给退出机制（证据待流⑥法规报告补强）。

### 6.4 通用 Demo 红线（本流最强信号）
- 允许：mock 数据源、预写场景、合成数据、离线降级、确定性脚本。
- 不允许：核心动作造假（随机数订单/正则冒充 AI/硬编码推理步骤）、MCP/多 Agent 贴纸、PRD-only。
- 每条声明都要能回答：关掉 AI 这个产品还成立吗？关掉外部服务 Demo 还跑得起来吗？

### 6.5 数据断点
1. 43 篇无统一总分格式，评分对比需二次归一；本轮分布是保守下界。
2. 2026-07 之后约 70 篇中，部分只有叙述版无 scoring 版，分数取自正文文字评级，精确到分不可得。
3. `china-ai-landscape` 只有 1 篇 OVERVIEW，未对国内竞赛作品做项目级分析——若要对标国内评委口味，这是下一步应补的库。
4. 旧模式文档引用「DQ Sentinel A+/95」与评分文件 76/100 冲突，已在本流更正；其余旧引用分数建议用脚本统一复核一遍。
5. 高价值项目多为代码级结论，本轮依据分析文章；若要直接照抄其架构细节到我们的 Demo，需对 Scam Swarm/CrowdPilot/StoreOps/FireGuard 等 5-8 个项目做代码级复核。
6. 本流未覆盖 `Hackathon-reading/repos/` 原始代码（约 6 万文件），需要时按项目单独深挖。

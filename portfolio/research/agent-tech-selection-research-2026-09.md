# Agent 技术选型调研综述（模式谱系 / 框架尽调 / PM 控制项）

> 调研日期：2026-09-13（模式与框架快照）；整理入库 2026-09-15
> 用途：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.10–§3.11、附录 A 的一手来源存档；供《技术方案说明书》引用。
> 纪律：star 为抓取时量级快照（k），引用前需复核；本文件只记事实综合，产品结论以选型文件为准。

---

## 一、模式谱系（对应选型文件 §3.10）

### 1. Anthropic《Building Effective Agents》（2024-12-19）

官方定义切分：**Workflow = LLM 与工具按预定义代码路径编排；Agent = LLM 动态决定流程与工具**。基础构件是 augmented LLM（单次调用 + 检索/工具/记忆）。

5 种工作流 + 1 种 agent：

| 模式 | 定义 | 适用 | 主要风险 |
|---|---|---|---|
| Prompt Chaining 提示链 | 固定步骤序列，中间可插程序化 gate | 可干净拆成固定子任务；以延迟换准确率 | 硬拆失真；gate 误判提前终止 |
| Routing 路由 | 先分类再导向专门下游 | 类别离散且分类器可准确 | 错分类单点失败 |
| Parallelization-Sectioning 并行分段 | 独立子任务并行 + 程序化聚合 | 提速、多维度独立处理 | 聚合差则丢信息 |
| Parallelization-Voting 并行投票 | 同任务多次运行按阈值聚合 | 多视角提置信 | 假阳/假阴靠阈值；成本倍增；同质化偏差 |
| Orchestrator-Workers 编排者-工人 | 中心 LLM 动态拆任务、委派、综合 | 子任务事先不可预测 | 分解错则全偏；协调开销大 |
| Evaluator-Optimizer 评估-优化 | 生成-评估-反馈循环 | 有明确可机器判断的评估标准 | 标准不清则空转；终止条件失控 |
| Agent 自主智能体 | 循环中自行规划/用工具/纠错 | 开放式、步数不可预测、可信环境 | 成本更高、错误复合；须沙盒+护栏+停止条件+检查点 |

原文总纲：从最简单方案起步，"可能根本不构建 agentic 系统"；agentic 系统"用延迟和成本换任务表现"；框架抽象层会遮蔽底层 prompt/响应、增加调试难度，诱人过度设计；三原则——简单、**透明（显式展示规划步骤）**、打磨 agent-computer interface。

来源：https://www.anthropic.com/research/building-effective-agents

### 2. 单 agent 推理范式

- **ReAct**（ICLR 2023，arXiv:2210.03629，ysymyth/ReAct ≈4.2k★）：推理轨迹与动作交错，每步"想-做-看"；轨迹可读但步数临场决定。
- **Plan-and-Solve**（ACL 2023，arXiv:2305.04091）：先列计划再执行，计划不中途修订。
- **Plan-and-Execute**（LangChain 博客 2023-05-10）：planner + ReAct executor，规划/执行分离，明确缺点"调用数多得多"；LangGraph 后续版本加 replan。
- **Reflexion**（NeurIPS 2023，arXiv:2303.11366，noahshinn/reflexion ≈3.3k★）：不更新权重，文本自我反思存入情景记忆供下次尝试；要求任务可安全重试。
- **ReWOO**（arXiv:2305.18323，billxbf/ReWOO ≈0.9k★）：一次性规划全部工具调用，推理与观察解耦；HotpotQA 上约 5 倍 token 效率；不能据中途观察改计划。
- **Tree of Thoughts**（NeurIPS 2023，arXiv:2305.10601，princeton-nlp/tree-of-thought-llm ≈6.1k★）：多路径并行树搜索；调用量随分支指数增长。

### 3. 多 agent 拓扑与"8 大类"核实

**核实结论：不存在公认"8 大类"权威分类。** LangGraph 概念文档列 5 种（Network / Supervisor / Supervisor(tool-calling) / Hierarchical / Custom workflow）；LangChain 现行文档列 5 模式（Subagents / Handoffs / Skills / Router / Custom）；AutoGen 列 RoundRobin / Selector / Swarm / Magentic-One + 实验性 GraphFlow；微软 ai-agents-for-beginners 分 centralized/decentralized/hybrid。"bounded team"术语在上述官方文档中均未找到出处。

多 agent 的真实使用诉求（LangChain 官方）：**上下文管理、分布式开发、并行化**；"单 agent 配合适工具与提示常常同等有效"。

成本事实（Anthropic《How we built our multi-agent research system》2025-06-13）：agent ≈ 普通聊天 **4×** token；多 agent 系统 ≈ **15×**。不适合：需共享同一上下文、agent 间依赖多的领域。运行风险：涌现行为、传统路径评测失效、有状态错误复合、原型到生产差距"常比预期更宽"。
来源：https://www.anthropic.com/engineering/multi-agent-research-system

### 4. 微软 ai-agents-for-beginners（≈74.7k★，18 课，2026-09 仍更新）

治理内容拆在三节而非只讲模式：06 可信 agent（行动前审批闸门、风险分级、审计日志、HITL）、10 生产可观测性与评测（trace/span、OpenTelemetry 行业标准、延迟/成本/错误/准确率）、18 安全；多 agent 仅 08 一课；11 课讲 MCP/A2A/NLWeb；13 课讲记忆；17 课讲本地 agent。第 8 课测验标准答案：单套指令+工具够用就用单 agent，需要不同权限角色与独立审计追踪时才上多 agent。

---

## 二、编排框架尽调（对应选型文件附录 A）

| 框架 | star | 关键事实（2026-09-13 快照） |
|---|---|---|
| LangGraph | 41.7k | 固定图节点 + 类型化共享状态 + interrupt 审批中断 + checkpointer 可恢复执行，抽象层最贴合本项目；本地模型接入文档与自托管 Langfuse 类观测需 PoC |
| CrewAI | 58.6k | Flows 确定性编排 + Crews 智能体；支持 Ollama；检查点/可恢复能力较弱 |
| Google ADK 2.0 | 21.5k | Workflow Runtime + Tool Confirmation；2.0 破坏性变更 |
| microsoft/autogen | 61.0k | **维护模式**（末次推送 2026-04-15）；继任 microsoft/agent-framework（MAF ≈13.5k），Semantic Kernel 同步合并 |
| openai/swarm → openai-agents-python | 22.0k / 29.4k | Swarm README 官方声明被 Agents SDK 取代（实验/教学）；SDK handoff 为工具调用；护栏注意 input 仅作用链首、output 仅作用链尾，工具级须另配 |
| Dify | 155.7k | 修改版 Apache：禁止未授权多租户、禁止移除 logo；未见审批节点证据 |
| LlamaIndex | 52.2k | 重心转 LlamaParse |
| Agno | 42.2k | 平台化最重 |

跨框架关键结论：**"模型不持有写工具"必须是拓扑级保证**——LLM 节点只绑只读工具、输出结构化写提案 JSON；写执行器是审批门之后的普通编排节点；审批身份、参数 diff、时间戳随工作流状态持久化。

---

## 三、PM 控制项（对应选型文件 §3.11，28 项调研压缩为 7 项产品决策）

调研覆盖 6 域（记忆 / 工具与沙箱 / 护栏 / 评测与可观测 / 协议 / HITL+预算+审计），已被 ClarSyn 既有机制覆盖的不重复列出，剩余 7 项产品决策见选型文件 §3.11.2。调研中的事实备查：

- **记忆分层**通行分法：working（运行时）/ short-term（本次会话/事件）/ long-term（入库，可白名单、留痕、可纠正；mem0 类实现为 ADD-only 可追溯）。
- **工具分级**通行分法：read / write / high-risk；只读凭据 + 速率上限 + 高危确认；代码执行入隔离沙箱（如 E2B 类产品）。
- **护栏**（NeMo Guardrails 口径）五类：input / dialog / retrieval / execution / output rails。
- **评测指标**通行集：任务成功率、工具调用准确率、RAG 忠实度（RAGAS 已迁至 vibrantlabsai/ragas）、干预率、延迟、成本；**整条 trace 失败也要作为评测单元**（promptfoo 已被 OpenAI 收购、MIT 许可；langfuse 可自托管）。
- **协议**：MCP（modelcontextprotocol，工具/资源/提示接入）与 A2A（已转 Linux Foundation 下 a2aproject，Agent Card 发现）；对 PM 只是"可替换接入"要求。
- **HITL 时序**：LangGraph interrupt 默认无限等待——**超时升级链必须作为产品规则自定义**；审批须绑定精确动作摘要（digest）与有效期。
- **预算**：每阶段 token/延迟上限是 PM 定义的产品规则，不是工程参数。

---

## 四、模型与硬件 2026-09 复核

> 抓取日 2026-09-15。star 给量级；仅 HF 承载且无一手交叉的项标"未核实"。

### 4.1 开源权重模型代际（代理核验）

| 家族 | 可核实最新代 | 端侧 0.5–4B 档 | 7–14B 档 | 原生上下文 | 许可 |
|---|---|---|---|---|---|
| Qwen | Qwen3.8（2026-08，另有 3.5/3.6） | Qwen3.5 0.8B/2B/4B/9B；Qwen3 0.6B/1.7B/4B | Qwen3-8B/14B、Qwen3.5-9B | Qwen3.5/3.8 **256K**（可扩 1M） | Apache-2.0 |
| Gemma | **Gemma 4**（2026-04，push 2026-09） | **E2B（有效 2.3B）/E4B（4.5B），带思考模式** | 12B Unified（另有 26B-A4B/31B） | E2B/E4B 128K，12B+ 256K | **Gemma 4 改 Apache-2.0**（1–3 代为自定义条款） |
| Phi | Phi-4 家族（Phi-5 无一手证据） | Phi-4-mini 3.8B、Phi-4-mini-reasoning | Phi-4-reasoning 14B（+vision 15B） | 未逐卡核实 | MIT |
| GLM | GLM-5 系（含 5.2/5.3，2026-09） | **GLM-Edge 1.5B/4B（+V 2B/5B），车机/手机取向，官方 GGUF/INT4** | GLM-Z1-9B-0414 思考版（32K/YaRN128K）、GLM-4-9B | GLM-5.2 稳跑 1M | 代码 Apache；**GLM-Edge 权重另附 Model License**；Z1 为 MIT |
| DeepSeek | V3.2-Exp（2025-11，MIT，稀疏注意力）；**V4 系仅 API 未开源** | R1 蒸馏 1.5B/7B | R1 蒸馏 8B/14B（32B/70B 另档） | 128K | MIT |
| MiniCPM | MiniCPM5-1B/2B（2026） | 1B/2B；MiniCPM4-0.5B | MiniCPM4.1-8B 混合推理 | SALA 变体主打百万 token | Apache-2.0，官方 GGUF/量化 |
| Mistral | Small 3.1 / Magistral Small 24B（思考，Apache-2.0） | 无端侧档 | 无 ≤14B 新档 | — | Apache-2.0 |
| Llama | 官方仓模型表止于 Llama 4（Scout/Maverick）；"Llama 5"互相矛盾，未核实 | Llama 3.2 1B/3B | Llama 3.1-8B | 128K（4 标称 1M+） | **Llama 社区许可（含 7 亿月活门槛）** |
| 其他 | Kimi K2.5（修改版 MIT，1T 级 MoE/256K）、Step-3.5-Flash（Apache，196B-A11B/256K）、InternLM3-8B（Apache，思考模式） | — | 8B | — | — |

**对旧表的三处实质性更新**：

1. **小尺寸"思考模型"已成常态**：Qwen3.5（0.8B 起默认思考）、Gemma 4 E2B/E4B、Phi-4-mini-reasoning、GLM-Z1-9B、R1 蒸馏 1.5B/7B/14B——我们 8 月表中"7B–14B 才做长链路推演"的边界在 2026-09 可以下移：**4B–9B 思考档即可进入方案推演候选**，但高后果主链路仍建议 8B+ 双档（快档/深档），待试点标定。
2. **上下文不再是约束**：新一代端侧模型原生 128K–256K（Qwen3.5/3.8、Gemma 4）。旧表"4K–8K 足够"的论证方向不变（实时链路 prompt 确实短，**小窗口够用是需求事实**），但表述应更新为"需求侧仅需数 K，供给侧端侧已普遍 128K+，上下文不构成选型约束"。
3. **许可全面宽松**：Qwen3.5/3.8、Gemma 4、GLM-5、MiniCPM5、DeepSeek 均为 Apache-2.0/MIT，允许离线商用；Llama 社区许可有月活门槛；GLM-Edge 权重有单独 Model License（船载商用需法务逐条读）；Jina v4 embedding 为 CC-BY-NC（禁商用，排除）。

### 4.2 Embedding / Reranker

- **Qwen3-Embedding/Reranker 0.6B/4B/8B**：32K 上下文、MRL 可变维度、100+ 语言、Apache-2.0、0.6B 有官方 GGUF——2026-09 端侧 RAG 的首选事实候选；
- **BGE-M3 仍是通用多语言旗舰**（8K token、MIT、dense/sparse/ColBERT 三合一；FlagEmbedding 仓库 2026-08 仍活跃），未核实到同级 bge-m4 继任；reranker v2-m3 为 Apache-2.0；
- Jina v4（3.8B，32K，多模态）**CC-BY-NC-4.0 禁商用**，排除；v5 仅有论文权重未核实。

### 4.3 结构化输出能力现状

2025–2026 各代模型普遍内建工具调用/JSON 输出能力，推理框架（vLLM/SGLang 等）普遍支持 `response_format=json_schema` 约束解码。**但严格 JSON Schema 合规依赖推理框架层的约束解码，不是裸模型生成保证**——对应选型文件 §3.8 层 2"结构化约束缩输出空间"，验收口径应写"框架约束解码下 Schema 合规率"，而非"模型会输出 JSON"。

### 4.4 云端代际（2026-09，仅名称档）

国产云：Qwen3.8 托管版 1M 上下文；GLM-5.2/5.3（1M）；DeepSeek V4-Pro/V4.1-Flash（仅 API，上下文未核实）；Kimi K2.5（256K，修改版 MIT 开源权重为 1T 级 MoE）；豆包 Seed-2.1（256K）。国际云：Claude Opus-4.8 在役（DeepSeek 官方日志引用）；GPT-5.2（Kimi 模型卡评测对照）；Gemini 3 Pro（同上交叉）；精确上下文多为二手，未逐一核实。**口径不变：云端只做长文档/法规异步解析，永不进 3 分钟实时闭环。**

### 4.5 边缘硬件与推理性能（代理核验，2026-09-15）

**Jetson 现状**：Orin 全系在售——AGX Orin 64GB 275 TOPS / 32GB 248 / Industrial 241；Orin NX 16GB 157 / 8GB 117（Super 刷新值）；Orin Nano Super 67 TOPS（7–25W；旧版 40/20）。**Thor 已 GA**：AGX Thor T5000 开发套件 2025-08-25 发售，$3,499，2070 TFLOPS（FP4 sparse）、128GB LPDDR5X、40–130W；T4000（1200 TFLOPS、64GB）发货状态未核实。来源：nvidia.com Jetson Orin/Thor 页、NVIDIA 发布博客 2025-08-25。

**其他边缘硬件**：① 树莓派 AI HAT+ = Hailo-8L 13 / Hailo-8 26 TOPS（INT8），**官方明确不支持 LLM**；新品 **AI HAT+ 2 = Hailo-10H 40 TOPS（INT4）+ 独立 8GB，标称可跑约 6B**，无官方 t/s，经 hailo-ollama 服务。② RK3588：rknn-llm（1.7k★，2026-06 更新）支持 Qwen3/R1 蒸馏/Gemma，W8A8；第三方单机参考实测（6 TOPS NPU）：Llama3.1-8B 3.72、Qwen2.5-3B 7.0、R1-Distill-1.5B 11.5 t/s。③ 高通工业模块、AMD XDNA、国产边缘 NPU 跑 7B–14B 的公开证据未核实。

**推理引擎**：llama.cpp 128.3k★、Ollama 181k★、vLLM 91.8k★、MLX 28.4k★（仅 Apple）、TensorRT-LLM 14.6k★（star 为 2026-09-15 快照）。Jetson 官方路径 vLLM + W4A16/NVFP4（含 EAGLE-3/MTP 投机解码）；jetson-containers（4.9k★）含 ollama/vllm/llama.cpp/tensorrt_edgellm。INT4 已是默认量化档，W8A8 为 NPU 标配，FP8 见于 Blackwell。

**8B/14B 速率实测**：NVIDIA jetson-ai-lab MLC 基准，AGX Orin 64GB W4A16：Llama2-7B 42.5 / 13B 22.2 t/s；Orin Nano Super INT4：Llama3.1-8B 19.14、Qwen2.5-7B 21.75 t/s。第三方 LMDeploy-Jetson（W4A16，2024）：Orin NX 16GB 7B 7.48、1.8B 22.96 t/s。Thor T5000（厂商，vLLM/W4A16/并发 8）：Llama3.3-70B 41.5、R1-70B 40.29 t/s；**Thor 上 8B/14B 绝对 t/s 未核实**。TTFT 仅有 MLC 文档一例（Llama2-7B Q4、16-token prefill 0.025s，未注板卡），专项数据未核实；Pi 级 ≤3B t/s 未核实。

**海事卫星**：Starlink Maritime 延迟/可用性与传统 L/GEO 卫星延迟量级本轮未取得可引用来源，**不引用新数字**；沿用既有产品判断（卫星仅异步同步，不进实时闭环）。

---

## 五、来源清单（一手为主）

1. Anthropic, Building effective agents — https://www.anthropic.com/research/building-effective-agents
2. Anthropic, How we built our multi-agent research system — https://www.anthropic.com/engineering/multi-agent-research-system
3. ReAct 论文 — https://arxiv.org/abs/2210.03629；代码 ysymyth/ReAct
4. Plan-and-Solve — https://arxiv.org/abs/2305.04091；Plan-and-Execute 博客 https://blog.langchain.com/plan-and-execute-agents/
5. Reflexion — https://arxiv.org/abs/2303.11366；noahshinn/reflexion
6. ReWOO — https://arxiv.org/abs/2305.18323；billxbf/ReWOO
7. ToT — https://arxiv.org/abs/2305.10601；princeton-nlp/tree-of-thought-llm
8. LangChain 多 agent 现行文档 — https://docs.langchain.com/oss/python/langchain/multi-agent
9. AutoGen Teams/Swarm/Magentic-One/GraphFlow — https://microsoft.github.io/autogen/stable/
10. Magentic-One 论文 — https://arxiv.org/abs/2411.04468
11. OpenAI Agents SDK Handoffs — https://openai.github.io/openai-agents-python/handoffs/；openai/swarm
12. microsoft/ai-agents-for-beginners；microsoft/agent-framework；microsoft/autogen
13. langchain-ai/langgraph；crewAIInc/crewAI；google/adk-python；langgenius/dify；run-llama/llama_index；agno-agi/agno

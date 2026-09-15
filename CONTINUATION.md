# 续接文件 / Continuation（新对话启动手册）

> 本文件是新对话的第一入口。新对话开始后，按以下顺序执行：
> 1. 读本文件；
> 2. 主动提醒用户审核“最近待审核文件”；
> 3. 复述当前工作状态与最近讨论结论；
> 4. 按用户指示继续推进，不要擅自跳到旧任务。
>
> 🚨 **Push 规则（2026-08-29 生效）**：未经用户直接明确指示，不得自动 `git push` 到 GitHub；只有用户说“push / 推到 GitHub / 执行 git push”时才执行。

---

## 🚨 当前主线（2026-09-15 更新）

当前工作重心：**V 幕技术选型——调研与选型文件 v0.8 已完成；三页汇报 SVG 已交付（第 2 页已按"技术架构而非业务架构"重画），等用户汇报反馈后落 V-1/V-2 作品集页**。

- 🔥 **新对话第一件事：提醒用户汇报三页资产已就绪**（`portfolio/planning/` 下，1600×900、黑白、零编组、可直接拖 Figma 导出 2x PNG）：
  - `tmp-report-page1-tech-selection.svg`（业务技术选型 8 行表＋三规则）
  - `tmp-report-page2-agent-architecture.svg`（**已重画为技术架构分层图**：编排层/无状态 N1–N4 节点/推理三档+只读工具/出链三闸/写执行器/横切保障）
  - `tmp-report-page3-sandbox.svg`（沙箱四层表，②工具权限反黑强调）
  - 文字口述稿：`tmp-report-tech-3pages.md`（**注意：第 2 页文字稿还是旧的业务工位版，SVG 已改技术架构，如用户要用讲稿需同步**）
- 2026-09-15 已完成：
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` **v0.7 → v0.8**：新增 §3.10 行业模式对照与模式选型、§3.11 PM 控制项清单（6 已有+7 待拍板）、附录 A 框架尽调（**仅供技术说明书，不进 PPT/展板**）；模型选型表/四方案对比/硬件表按 2026-09-15 核验全面更新（思考模型下放 4B–9B、端侧 128K+、许可三档、Orin/Thor 已 GA/树莓派 HAT+2、8B 实测 19–22 t/s）
  - 新建 `portfolio/research/agent-tech-selection-research-2026-09.md`（五代理一手来源综述：模式谱系/框架/PM 控制/模型/硬件）
  - 9:16 竞赛展板：`poster-9x16-layout-plan.md` + `poster-9x16-template.svg` 已提交并推送（上一阶段，900×1600 扁平零编组黑白灰模板，内容待填）
- 用户已拍板口径：① §3.3 总览表必须保留且上 PPT；② 模式/控制/框架三块补入文件但**不进展示**（框架名正文 0 次）；③ **强化学习不适用只进技术文档，不进作品集/PPT**，用户无法核验由我负责；④ §3.5 不单独占作品集页；⑤ 多 agent 措辞**暂不拍板**（[5] 有 4 个智能模块，可宽松称"多 agent 中最确定的固定拓扑型"）；⑥ 页数与构图后置，先纯内容讨论；⑦ 三页 SVG 要**技术架构视角**（非业务流程）、黑白、能用表格就用表格
- ⚠️ **这些新文件均未 commit**（选型文件 v0.8、research 综述、三页 md/SVG、CONTINUATION）——按 push 规则等用户明确指示再提交/推送

---

## 📋 新对话必须提醒用户的全部在途事务（2026-09-15 盘点）

**A. 等用户反馈/拍板（卡住下游的）**
1. **三页汇报 SVG 的反馈**：用户拿去汇报后，哪页内容要加减；特别是 P3 沙箱四层组织方式是否认可；P2 已是技术架构视角
2. **多 Agent 措辞**仍未拍板（"多 Agent 固定链" vs "多节点编排"）——用户要看完选型文件自己判断，不要替他决定
3. **7 项 PM 产品决策**（选型文件 §3.11.2）：工具三级清单 / 记忆留存期（合规拍）/ 审批绑定动作摘要 / 超时升级时限表 / 分阶段 token·时延预算 / 验收指标集 / 不可信输入规则
4. **V-1/V-2 页数**：用户要先看清内容再压页数，构图也后置

**B. 内容生产队列（反馈后启动，顺序已与用户对齐）**
5. V-1（工程全景选型）、V-2（Agent 编排主章）作品集页内容稿＋绘图工作稿——三页汇报稿是其素材
6. `tmp-report-tech-3pages.md` 第 2 页口述稿与技术架构版 SVG 同步
7. 挂账页面：阅读导览+II-2 合成地图页（III 幕回指缺落点）、IV 单中枢 hub-spoke 页、V-3 库外×幻觉、V-4 硬件 T0–T3、V-5（可选时序预算）、VI 五级验证阶梯单页
8. **9:16 展板内容填充**：模板 `poster-9x16-template.svg` 与规划 `poster-9x16-layout-plan.md` 已推送，待按规划填 9 个 band（UI 截图需 DPR=3 重导出、p1-default.png 禁用、④⑤验证级空心处理）

**C. 技术/演示挂账**
9. `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义（E09/E-L4 命名与触发）——多次挂账未做
10. P9-1 台风航变泳道图 SVG/drawio 仍是旧口径（ClarSyn 只接收已成立航变决定），待重绘

**D. 纪律提醒（每次都适用）**
11. 未经明确指示不 `git push`；`recordings/` 永不提交；新产出写 `portfolio/`（design/ 仅在更新既有事实档时动，如本次 v0.8）
12. 诚实量化：20–45 分钟标"推演估算"、分钟级只是设计目标、④⑤阶梯是计划；指标一律目标区间+假设
13. 对外展示不出现框架名/模型候选名/RL 讨论/绝对指标承诺；PM 深度止于"提需求+定验收+答评委"

---

## 🚨 上一主线（2026-09-12）

第 III 幕已全部完成（含 III-9 AI 治理总览作品集页），竞赛限页版后续规划已出：

- 🔥 `portfolio/planning/competition-compressed-page-plan.md`（竞赛压缩版页面规划 v1.0，2026-09-12，尚未审核）
- 压缩方案要点（III-9 之后 11 页 → 6–7 页）：
  - **IV 系统组织 = 1 页**：单中枢 hub-spoke，"不替换、不新增、不越级"，不列举模块（原 IV-1/2/3 合并）；
  - **V 技术实现 = 4 页 + 1 可选页**（Agent 架构页数不限）：V-1 工程全景与选型 / V-2 Agent 编排与控制（主章）/ V-3 库外发现×幻觉兜底 / V-4 硬件部署 T0–T3 / V-5（可选）实时闭环时序预算；
  - **VI 证明与落地 = 1 页**：五级验证阶梯（离线样例→仿真→高保真原型→单船单港试点→全船队）+ 诚实量化卡 + 前三风险 + 三句差异化；
- 审核通过后的执行顺序：IV 单页内容稿 →（建议先补）导览+II-2 合成地图页 → V-1…V-4 → VI 单页；每页先写绘图工作稿、用户审口径后再开画；
- 上一阶段：正文主档 `ai-pm-portfolio-page-content.md` 已到 **v1.3**，第 III 幕 12 页机制拆解与绘图参考全部就位，III-9 作品集页已完成。

- 所有新文件统一写到 `portfolio/`，不要写入 `design/`
- 后续工作参考 `research/ai-pm-tutorials/REPORT.md`（GitHub AI PM 教程调研）
- 正在一页页讨论并填充 `portfolio/planning/ai-pm-portfolio-page-content.md`
- 旧目录 `design/` 仍是历史资料，可阅读，但不作为当前产出目标
- **P9-1 场景边界已重新讨论：ClarSyn 不做航变预警/航变决定，只做航变后的登离船与人员调度影响链**
- ✅ **P9-1 L4 判据已拍板（2026-09-04）：L4 = "船长决策区"**——判据是决策权归属（安全不可逆/群体必达/法定对外/不可逆高后果），常规下船/接驳调度走 **L2/L3 + 船长知会/抄送（不阻塞）**；超时双路径（常规默认执行+审计 / 涉风险升级 L4）。已落到 `event-governance-framework.md` §4.2.4，并**按优先级修改了 20+ 个文件**（见下方"本次会话改动记录"）
- ✅ **第 III 幕拆解已补全（2026-09-07）**：III-1/2/3（v1.0，对应 C0/C1/C2）+ III-4a–III-9（v1.1，对应 C3/C4/C5/G1/G2+G3/全谱）每页新增"机制拆解与绘图参考"六段模板：机制定位 → 组成部件表（子机制编号对照）→ 环节流程拆解 → 图上信息层级 → 绘图要素清单 → AI PM 术语中英对照；v0.9 页面初稿原文未动，拆解块标注为绘图工作稿

---

## 🗂 本次会话改动记录（2026-09-15 · 技术选型 v0.8 + 三页汇报稿）

> 背景：V-1/V-2 作品集页讨论前，用户要求先做业务技术选型（什么业务用多 agent/RAG 等）与 agent 架构模式调研，并重查过时的模型选型。三份 GitHub 一手调研（模式谱系/框架现状/PM 控制项）+ 两份 2026-09 核验（开源模型/边缘硬件）。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `design/b-port-shore-and-itinerary/ai-architecture-and-value.md`（→ **v0.8**） | 新增 §3.10 行业模式对照（Anthropic 5 工作流+1 agent、[0.5]–[9] 逐段模式归属、不用 ReAct/Orchestrator-Workers/Evaluator-Optimizer/Reflexion/Swarm/agentic RAG/ToT 的理由）；§3.11 PM 控制项（已有 6 机制映射 + 7 项待拍板决策 + 沙箱/MCP 等术语应答模板）；附录 A 框架尽调 8 家（AutoGen 维护转 MAF、Swarm 被取代、Dify 许可限制；仅技术说明书用）；模型选型表重写（档位+候选名+许可红线+约束解码口径）；四方案对比延迟改实测区间（8B 在 Orin Nano Super 19–22 t/s 等，[5] 四节点链演示级 10–30s）；新增边缘硬件五档表（含 Thor 已 GA、初代 HAT+ 不支持 LLM 的修正）；上下文论证改"需求数 K/供给 128K+"；版本记录 v0.8 |
| 2 | `portfolio/research/agent-tech-selection-research-2026-09.md`（**新建**） | 调研综述一手来源档：BEA 五模式、单 agent 六范式、拓扑与"8 大类不存在"考证、AAFB 18 课、框架快照、PM 28 项控制压缩、模型代际表（Qwen3.5/3.8、Gemma 4、Phi-4、GLM-5/Edge、DeepSeek V4 仅 API、MiniCPM5）、Qwen3-Embedding、硬件实测数字与全部来源 URL |
| 3 | `portfolio/planning/tmp-report-tech-3pages.md`（**新建，临时**） | 汇报用三页内容稿：P1 业务技术选型总表（8 环节×技术形态）、P2 方案推演多 Agent 架构、P3 沙箱四层设计；非作品集定稿，待用户反馈。**注意 P2 文字稿仍是业务工位版，SVG 已改技术架构版，待同步** |
| 4 | `tmp-report-page1-tech-selection.svg` / `tmp-report-page2-agent-architecture.svg` / `tmp-report-page3-sandbox.svg`（**新建，临时**） | 三页 1600×900 16:9 汇报 SVG，纯黑白灰、零编组、活文字、英文 id，可直接拖 Figma 导出 2x PNG。P1=8 行选型表+三规则卡+金句；**P2 经用户指正后重画为技术架构分层图**（编排层四组件 / N1–N4 无状态节点+共性约束条 / 推理三档+云端虚线+三个只读服务 / 出链三闸反黑 / 写执行器→执行端口 / 横切保障四块）；P3=四层沙箱表（②工具权限整行反黑）+T0–T3 降级条+审计不降级黑块。三文件均通过 XML 校验 |
| 5 | `CONTINUATION.md`（本文件） | 当前主线刷新为 2026-09-15；新增本改动表与"全部在途事务"盘点 |

**下一步待办**：① 用户汇报后对三页给反馈（P3 四层角度、P2 技术架构详略）；② 同步 P2 文字稿；③ 7 项 PM 产品决策待陆续拍板；④ V-1、V-2 作品集内容稿 + 绘图工作稿；⑤ 挂账：II-2 地图页、IV 单页、V-3/V-4、VI 单页、展板内容填充、EVENT-ROSTER mock-data v0.6、P9-1 泳道图重绘；⑥ 全部新文件待用户指示后再 commit/push。

---

## 🗂 上次会话改动记录（2026-09-12 · 竞赛压缩版规划）

> 背景：竞赛页数限制，用户要求①系统组织 1 页②Agent 架构不限页③证明落地 1 页。III-9 AI 治理总览作品集页已完成。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `portfolio/planning/competition-compressed-page-plan.md`（**新增 v1.0，待审核**） | III-9 之后 IV/V/VI 幕压缩重切：IV=1 页单中枢 hub-spoke（六引擎小字不展开、三态输入、三类输出端口复用 III-5a 通信栈口径、不碰红线区、6 工种 chip、T0–T3 角注）；V=4+1 页围绕 Agent 架构（工程全景选型 / 编排与三门控制 / 库外×幻觉深描 / 边缘部署 T0–T3 / 可选时序预算）；VI=1 页五级验证阶梯+诚实量化卡+风险 chip+差异化三句；含衔接事项（II-2 缺页建议与导览合成 1 页地图、v4 暂不改、工作法沿用）与审核后执行顺序 |
| 2 | `CONTINUATION.md`（本文件） | 当前主线刷新为 2026-09-12；新增本改动表；审核清单首位加压缩版规划文件 |

**下一步待办（按优先级）**：
1. **用户审核** `portfolio/planning/competition-compressed-page-plan.md`（切页方案、各页版式与信息纪律）；
2. 审核通过后写 IV 单页内容稿与绘图工作稿（落进 page-content 主档）；
3. 补"阅读导览 + II-2"合成地图页（III 幕页眉回指目前缺落点）；
4. 逐页推进 V-1～V-4、VI 单页；每页稿成先审口径再开画；
5. `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义（E09/E-L4 命名与触发）仍挂账。

---

## 🗂 上次会话改动记录（2026-09-07 · 第 III 幕绘图准备）

> 目标：让第 III 幕 12 页可以直接开画。依据 `mechanism-registry.md`（C0–C5/G1–G4 编号解析）与 `event-governance-framework.md`（字段级规则），在正文主档每页追加"机制拆解与绘图参考"绘图工作稿，页面初稿不动。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `portfolio/planning/ai-pm-portfolio-page-content.md`（v0.9 → **v1.1**） | **III-1/2/3（v1.0）**：对应 C0 前置决策支持 / C1 事件识别与分类 / C2 方案推演与生成；重点：四维评估+双卡+两条受控回路（III-1）、双通道汇流+X 分类失配出口+"弱信号区 vs 库外区必须分开画"（III-2）、两段式生成流水线+A02 参数槽前后对比+分域模型四分格+双重约束视觉主线（III-3）。**III-4a–III-9（v1.1）**：C3.1–C3.3 四级阶梯/L4 画区不画级/inform≠approve（III-4a）、审批状态机+修订三形态+超时双出口（III-4b）、双斜坡汇合+时限梯度条（III-4c）、三级递送纵列+投放矩阵 2×3（III-5a）、三行双条对比+AI 手边界红线（III-5b）、状态机三出口+P1/P2 双栏（III-6）、四触发口+观察/记录/建议三职能（III-7）、血缘树 E09 实例+审计包样张+推理附件两级展开（III-8）、主轴×S1–S8 总谱+G 通栏+三场景迷你轴（III-9） |

**下一步待办（按优先级）**：
1. **逐页绘制第 III 幕可视化图**（SVG/drawio，按各页"绘图要素清单"执行；视觉规范沿用 `portfolio/design-specs/a3-design-spec.md`）；
2. 用户逐页审核拆解块口径（尤其 III-2 的弱信号/库外分区、III-4a 的 L4 判据呈现）；
3. `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义（E09/E-L4 命名与触发）；
4. 第 III 幕图定稿后进入第 IV 幕内容。

---

## 🗂 上次会话改动记录（版本记录表模块 · 2026-09-04）

> 本次修改基于船长权限边界证据（ISM Code §5.2 / 邮轮酒店线文献 / 巨轮 CMC 论文），按"基础需求 → 架构/库设计 → 原型 → 作品集"优先级推进；每个被改文件均自带版本记录表。

| # | 优先级 | 文件 | 本次改动要点 |
|---|---|---|---|
| 1 | 母文档 | `design/b-port-shore-and-itinerary/event-governance-framework.md` | L4 重定义"船长决策区"（§4.2.4 判据+反向测试+超时双路径）、E09 起点改为"接收外部已成立航变决定"、船长知会/抄送通道、§4.11.5 调和 |
| 2 | 需求母档 | `design/b-port-shore-and-itinerary/prd.md`（→v0.13） | 航变边界、L4/船长知会、M4/R9/§7 角色/B4/B10/§10 |
| 3 | 架构/接口 | `interface-map-and-ai-components.md`（→v0.2）、`ai-architecture-and-value.md`（→v0.7） | 决策端口/流水线[7]、天气源定位、AI 边界 |
| 4 | 演示 | `demo-terminal-and-interactions.md`（→v0.2）、`demo-script-b5-options.md`（→v0.2） | 第一幕起点=已成立决定、审批链+船长知会 |
| 5 | 原型 | `EVENT-ROSTER-v0.5.md`（→v0.6）、`v0.3`（标弃用）、`ui-complete/design.md`（→v0.2） | E09→E-L4 主剧情按判据重定位 |
| 6 | 作品集正文 | `ai-pm-portfolio-page-content.md`（→v0.3）、`ai-pm-portfolio-body-plan-v3.md`（→v3.1） | P9-1 重定位、P7/P6/P13/P15 同步 |
| 7 | 作品集文案/规划 | `clarsyn-ai-pm-presentation-strategy.md`（→v0.2）、`copy/a3-product-copy*.md`（design+portfolio ×2，→v0.4/v0.3）、`a3-page-architecture-table.md`、`a3-product-doc-plan.md`（design+portfolio） | "预测/预警"措辞统一为"接收决定+影响推演" |
| 8 | 研究补遗 | `research/round2/batch2/06-safety-regulation.md` | 补 ISM §5.2 船长权限证据 |
| 9 | 证据归档 | `research/round2/source-archive/06-master-authority-and-shipboard-org.md`、`portfolio/research/p9-1-l4-approval-authority-evidence.md`（新增） | 证据原始档 + L4 决策应用档 |
| 10 | 机制总谱 | `design/b-port-shore-and-itinerary/mechanism-registry.md`（新增 v0.1→v0.2） | C0–C5 主轴 × G1–G4 全局 × S1–S8 轴段的机制母文档（两级谱 + 逐机制解析 + 轴图标注规则 + 作品集页索引） |
| 11 | 规划升级 v4 | `portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（新增 v4.0；v3 存档） | 事件脊柱版四幕结构；同步 page-content 指针（→v0.5）、registry §10 索引（→v0.2） |

**下一步待办**：
1. **进入第 III 幕讨论**（按 v4 §5：III-1 决定前的参谋 → III-9 机制总谱收束；先定章模板与信息层级，再逐章填充）；
2. `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义（E09/E-L4 命名与触发）；
3. 用户审阅：`mechanism-registry.md`（机制编号与解析）、`body-plan-v4.md`（四幕骨架）、`event-governance-framework.md` §4.2.5–4.2.7/§4.14–4.15；
4. 第 III 幕内容成熟后进入第 IV 幕；页面内容按幕落进 `ai-pm-portfolio-page-content.md`（按新页号重排章节标题）。

---

## ✅ 最新状态速记（2026-09-03）

- 已重新规划作品集正文页：**v4 事件脊柱版** `portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（用户 2026-09-04 认可骨架：P9-1 单事件为脊柱 + 先业务后技术四幕 + 阅读导览；不受比赛页数限制）；v3 已存档（P8 构图等内容映射见 v4 §9）
- 正在逐页填充正文主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
  - 当前页面：P1 产品定位、P2 宏观设计背景、P3 研究流程、P4 多源调研、P5 痛点分析与需求、P6 业务理解、P7 AI 机会判断、P8 产品方案总览/系统组成（草稿）
  - P4 多源调研：只列事实与来源，不做结论
  - P5 痛点分析与需求：综合判断式总结，三层嵌套（体验层 / 流程协同层 / 决策治理层）+ 四类断点视角
  - P6 业务理解：以系统上下文图表达输入来源 / 输出对象 / 外部边界 / 联动关系，并补充“不推倒原系统”的连接原则
  - P7 AI 机会判断：已重写为“四类业务断点 → AI 不可替代位置 → 三个场景价值”；四类断点已细化“现象 + 核心症结”，并补充实现标签；构图采用“一主三辅长条区”
  - P8 产品方案总览 / 系统组成：已写入草稿（事件处理主线 + 核心引擎 + 输入输出端口分类 + 岸基/船基协同）
  - P9 核心业务场景流程：P9-1 台风航变响应泳道图画法已写入（一场景一页，岸基→船基）；已补充事件识别子系统、输入信息分类、系统运行主循环图、执行端分类、循环监控机制
  - 系统运行主循环图讨论已结束；P9-1 进入场景重新定位：不再由 ClarSyn 做航变预警/航变决定，改为接收外部航变决定后做登离船/接驳/时间窗/船员任务推演
- ✅ 作品集视觉规范已切换：最终 HTML 为 `portfolio/a3-document/a3-document-web.html`；规范文件为 `portfolio/design-specs/a3-design-spec.md` 与 `portfolio/design-specs/ClarSyn_A3_DesignSpec.svg`
- ✅ SVG 图集已全部按 A3 终版 HTML 配色重绘/替换（9 张业务图），保持扁平无编组、透明底
- ✅ 新增单独内容页背景：`portfolio/svg-pm-diagrams/clarsyn-content-background.svg`（1600 × 1132，纯色 `#F4F5F7`；非封面渐变）
- ✅ 新增 HTML 组件资产：`portfolio/design-specs/a3-html-card-styles.svg`（卡片/倒角/投影）、`portfolio/design-specs/a3-html-icons-and-controls.svg`（图标/标识/状态栏/彩色按钮）
- ✅ 已 OCR 提取桌面 `2121` 图片文本：`portfolio/ocr-extracted/2121/`
- ✅ 已分析外部 AI 工业应用参考并写入：`portfolio/research/ai-production-deck-insights.md`
- ✅ 第 7 页新文件已放到桌面：`C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
- ✅ 网络检索任务已完成（2026-09-04）：通用搜索引擎仍不可用，改用**学术 API（OpenAlex/Crossref/arXiv）+ IMO 官网**通道取证据；证据原始档 `research/round2/source-archive/06-master-authority-and-shipboard-org.md`，决策应用档 `portfolio/research/p9-1-l4-approval-authority-evidence.md`
- ✅ **L4 判据已拍板并落地**（船长决策区 §4.2.4）；20+ 文件已按优先级修改（见上方”本次会话改动记录”；全带版本记录表）
- 下一站：① P9-1 泳道图重绘（drawio + SVG）；② `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义；③ 作品集 A3 SVG/HTML 同步；④ 用户审阅本次改动
- 最近一次 git push：`f4d6e12`
- 本地工作区已同步（`recordings/` 除外）

---

## 🟥 新对话开始后请提醒用户审核以下最近文件（按优先级）

0. **三页汇报 SVG（2026-09-15，最高优先级）**：`portfolio/planning/tmp-report-page1-tech-selection.svg`、`tmp-report-page2-agent-architecture.svg`（技术架构版）、`tmp-report-page3-sandbox.svg`，配文字稿 `tmp-report-tech-3pages.md`——用户汇报后等反馈
0b. **选型文件 v0.8**：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.10 模式选型 / §3.11 PM 控制 / 附录 A 框架尽调 + 更新后的模型硬件表，及来源档 `portfolio/research/agent-tech-selection-research-2026-09.md`
0c. **`portfolio/planning/competition-compressed-page-plan.md`（v1.0，2026-09-12）——竞赛限页版 IV/V/VI 幕压缩规划，仍待审；审核通过后按其 §5 顺序开写 IV 单页**
1. `portfolio/planning/ai-pm-portfolio-page-content.md`（→v1.3）
   - 第 III 幕 12 页"机制拆解与绘图参考"已全部就位（III-1/2/3 对应 C0/C1/C2，III-4a–III-9 对应 C3/C4/C5/G1/G2+G3/全谱）；v1.2 全页完整英文标题、v1.3 船载通信栈专业化（III-5a/b、III-7）；III-9 作品集页已完成
   - 后续内容不再写进 III 幕，按压缩版规划文件推进 IV/V/VI
2. `portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（**当前规划主文档**）
   - **重点审核：四幕结构与第 III 幕机制展开的章节骨架**（v3 已存档）
   - 机制编号统一引用 `design/b-port-shore-and-itinerary/mechanism-registry.md`
3. `C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
   - 用户桌面上的第 7 页文案与构图文件，供 AI 绘图/排版使用
4. `portfolio/research/ai-production-deck-insights.md`
   - 外部 2121 AI 工业应用参考对 P1–P7 及后续页面的影响分析；已补充岸基/船基边界
5. `portfolio/svg-pm-diagrams/p9-1-hangbian-response.svg`
   - P9-1 台风航变响应泳道图 SVG（当前为初稿，按新“岸基→船基”口径待重绘）
6. `portfolio/planning/diagrams/p9/p9-1-hangbian-response.drawio`
   - P9-1 drawio 源文件（当前为初稿，待按新口径同步）
7. `portfolio/ocr-extracted/2121/`
   - 桌面 2121 图片的 OCR 提取文本
8. `portfolio/svg-pm-diagrams/ai-scenario-value.svg`
   - 第 7 页场景价值 SVG（后续可按新文案同步再细化）
9. `portfolio/svg-pm-diagrams/ai-value-judgment.svg`
   - 第 7 页价值判断矩阵/结构图（后续可按新构图再更新）
10. `portfolio/svg-pm-diagrams/business-ecosystem-context.svg`
    - 第 6 页业务理解系统上下文图

---

## 📌 最近讨论要点与决策（2026-08-31）

### 1. 外部 2121 参考的核心启示

- 外部材料展示了“发现问题 → 四类断点 → 分层处理 → 追影响 → 给动作 → 人工审批 → 最小试点”的成熟 AI 产品讲解框架
- 它与 ClarSyn 高度相似，但不能直接套用工业术语；只能参考“解读角度”和“产品化语言”

### 2. 第 7 页的重新定位

- P7 只讲“AI 价值判断”，不展开系统架构、多 Agent、接口、控制、选型、评测
- P8 及之后理解为 harness：如何控制、约束、落地这些 AI 价值
- P7 应该从 P5 已建立的业务断点出发，而不是突兀地讲“AI 三高地”

### 3. “AI 三高地”的表述修正

- 不再叫“三个并列高地”
- 改为“三个 AI 不可替代位置”：
  - 核心：长链路推演 + 弱信号整合
  - 分支：库外/低置信度/复合信号 → 事件治理升级
  - 支撑：推理附件 / 可解释性 / 审计回写

### 4. 四类断点与 AI 价值的对应关系

| 业务断点 | AI 价值 | 角色 |
|---|---|---|
| 影响不清 | 长链路推演 + 弱信号整合 | 核心 AI 价值 |
| 发现慢 | 库外/低置信度信号 → 判断是否值得升级 | 事件治理分支 |
| 动作分散 | 生成候选动作 + 审批路由 | Agent 辅助层 |
| 结果没回写 | 推理附件 + 审计回写 | 信任与审计支撑层 |

### 5. 必须强调的边界

- “动作分散”不是 AI 核心价值，AI 只是生成候选动作和统一视图
- “发现慢”不是“AI 能看见”，AI 的增量是判断是否值得升级
- “结果没回写”不是“AI 做审计”，AI 的贡献是让判断自带可追溯依据

### 6. 第 7 页构图方向

- 采用“一主三辅长条区”
- 主条：影响不清 → 长链路推演 + 弱信号整合（高亮）
- 辅助条：发现慢 / 动作分散 / 结果没回写
- 每条长条：左业务断点，右 AI 价值，右下角一句小标注
- 场景锚点：E09 / X-0001 / E-L4
- 页面只保留标题、结论、长条短句、收束金句，不堆段落文字

### 7. 岸基 ⇄ 船基协同（2026-09-01）

- 台风/气象/港口/海事等宏观预警由岸基/外部系统负责，ClarSyn 不承担“发现台风”的职责
- ClarSyn 应分为：
  - 岸基决策协同层：接收外部预警、做航次级影响评估、生成航次变化方案、协同总部/船长确认、下发船基
  - 船基实时执行层：接收岸基方案 + 本船实时状态，做下船/接驳/时间窗/船员任务推演，生成安全与乘客服务方案，触达船员/乘客/港口，执行回写
- 岸基 → 船基：航次变化方案、预警、修订 ETA、港口窗口、赔偿/客服策略
- 船基 → 岸基：本船状态、乘客数量、执行结果、现场反馈、事件升级

### 8. 用词统一与人工审核级别

- 系统部署侧统一使用“船基/船载”，不使用“海基”，避免军事语境歧义
- 审核级别：
  - L1：自动分发，无人工审核
  - L2：值班船员/客服确认
  - L3：运营经理/法务审批
  - L4：船长/最高层决策
- P9 泳道图需区分：输入信息（原始信号）→ 事件识别/判断子系统 → 事件分类与严重度判定 → 影响推演与方案生成

### 9. 系统运行主循环图简化方向（2026-09-01）

- 主循环图不绑定具体业务，也不展开 L1-L4 细节
- L1-L4 用“人工控制/权限升级通道”代替四个泳道；具体内容放到权限升级页面
- 主循环：
  - 输入信息 → 事件识别与标准化 → 事件分类与风险判定
  - → AI 影响推演 → 候选方案组合 → 预警与决策卡
  - → 人工控制/权限升级通道
  - → 执行与输出
  - → 审计回写/学习回流
- 执行端分类：
  - 系统自动执行
  - 人员执行
  - 下游协同/告知
- 循环监控机制：
  - 终止型事件：告知送达即可关闭
  - 持续监控型事件：需定期复检直至解决
  - 主循环图只画“监控/复检”虚线环，不展开细节
- 影响文件：P6/P8/P9/P11/P13/P16、`ai-pm-portfolio-body-plan-v3.md`、`ai-pm-portfolio-page-content.md`、P9 泳道图

### 10. P9-1 台风航变场景重新定位（2026-09-03）

- 用户提出问题：邮轮上已有成熟的气象监控、台风预警和航变沟通体系，ClarSyn 不应再做“航变预警/航变决定”。
- 结论已对齐：
  - 航变预警/航变决定由外部成熟体系负责：气象/海事只发预警和提醒，行程调整由船公司自主决定，船长有安全否决/最终确认权；
  - ClarSyn 的职责是接收“已成立的航变决定/预警 + 本船状态”，推演航变后的登离船/接驳/时间窗/船员任务/安全与乘客服务方案；
  - P9-1 起点改为“外部航变决定已成立”，不是“ClarSyn 识别台风”；
  - P9-1 场景名称建议改为“台风航变后的登离船与接驳调度响应”或“航变影响下的靠泊/下船/接驳动态调度”。
- 参考：Globot Shield 的“感知层红海、决策层空缺”定位，但 ClarSyn 不照搬“AI 参与航变决策”，只做决策后的影响链与执行增强。
- 待补强事实：船公司岸基 FOC/GSOC 与船长的具体沟通机制、航变 SOP、船基实际可获得的数据字段（需访谈或一手资料验证）。

### 11. P9-1 的 L4 适用性讨论与网络检索任务（2026-09-03 续）

- 用户提出关键疑问：航变后的下船方案变化是否适合默认 L4？会不会增加船长信息负载？
- 当前倾向/建议（尚未最终拍板）：
  - 默认 L2/L3：值班确认 / 运营经理审批；
  - 船长只做“知会/抄送”，不阻塞执行；
  - 只有安全、群体、不可逆高后果事件才升级 L4；
  - 保留“超时自动升级”保证快速响应。
- 网络检索状态（2026-09-03 实测）：
  - 部分可上网：GitHub API、Bing、Baidu、360 可访问；
  - 不可访问：Google、Wikipedia、DuckDuckGo、raw.githubusercontent.com；
  - 无原生 web_search 工具，需要 curl / 平台 API 方式检索。
- 已获得的初步证据：
  - 360文库“酒店客务总监岗位职责”：负责前厅/客务/公关，对总经理负责；
  - 360文库“宾客服务经理岗位职责”：迎送客人、处理投诉，属宾客服务线；
  - 百度结果出现“邮轮各部门职位详解”“邮轮职位全解析”“邮轮酒店总监”“邮轮前台 GSO”等条目；
  - 未找到权威邮轮组织架构一手文档，需继续检索。
- 未完成任务：
  - 继续检索邮轮运营人员结构、Hotel Director / Guest Services / 船长审批边界；
  - 确认“下船调度归属宾客运营线”是否有更权威来源；
  - 根据检索结果最终确定 P9-1 的 L2/L3 默认 + 船长知会 + L4 升级方案；
  - 随后重绘 P9-1 泳道图（drawio + SVG）。
- 下一步选项（待用户选择）：
  1. 继续用现有部分网络通道深挖；
  2. 用户提供搜索 API Key / 代理端口；
  3. 用户手动搜索后粘贴关键内容。

---



## 🗂 当前关键文件索引

- 正文内容主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
- 正文页规划 v4（事件脊柱版）：`portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（v3 存档）
- **竞赛压缩版规划（III-9 之后 IV/V/VI，2026-09-12，待审）**：`portfolio/planning/competition-compressed-page-plan.md`
- **三页汇报临时稿（2026-09-15，选型/多 Agent/沙箱）**：`portfolio/planning/tmp-report-tech-3pages.md`
- **技术选型调研综述（2026-09-15，一手来源）**：`portfolio/research/agent-tech-selection-research-2026-09.md`
- 历史 AI 架构选型（**已 v0.8，2026-09-15**）：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md`（§3.10 模式选型/§3.11 PM 控制/附录 A 框架尽调）
- 机制总谱（机制编号母文档）：`design/b-port-shore-and-itinerary/mechanism-registry.md`
- AI PM 讲解策略：`portfolio/planning/clarsyn-ai-pm-presentation-strategy.md`
- AI PM 教程调研：`research/ai-pm-tutorials/REPORT.md`
- 作品集总览：`portfolio/README.md`
- 外部 AI 工业应用参考影响分析：`portfolio/research/ai-production-deck-insights.md`
- OCR 提取文本：`portfolio/ocr-extracted/2121/`
- 第 7 页桌面文案与构图：`C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
- 历史业务/PRD：`design/b-port-shore-and-itinerary/prd.md`
- 历史 AI 价值/架构：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md`
- 历史证据线：`design/evidence-line-a-baseline.md`

---

## 📌 已删除/清理

SESSION_SUMMARY 系列已删除：

- `SESSION_SUMMARY_2026-08-19.md`
- `SESSION_SUMMARY_2026-08-20.md`
- `SESSION_SUMMARY_2026-08-20-later.md`
- `SESSION_SUMMARY_2026-08-21-engine.md`
- `SESSION_SUMMARY_2026-08-22.md`

---

## 🚫 不进入提交

- `recordings/` 不提交

---

## 历史背景（简要）

- 项目原为邮轮 AI 竞赛项目，当前主线为 ClarSyn 港岸协同与航变响应系统
- 近期重心从 A3 HTML/SVG 转向 AI 产品经理作品集内容重构
- 旧文档仍可作为事实来源，但不再作为当前工作产出目标

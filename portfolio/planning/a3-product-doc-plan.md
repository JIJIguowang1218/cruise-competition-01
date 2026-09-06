# A3 横板产品介绍书规划（ClarSyn）

> 状态：规划稿 v0.1
> 目标读者：比赛评审 / 产品与技术负责人
> 篇幅：20 页以内（含封面、结尾致谢），A3 横板
> 定位：以 **AI 产品经理视角**，讲清“价值论证 + AI 控制体系 + 技术选型 + 验证落地”，不是技术手册。

---

## 变更日志

| 日期 | 版本 | 变更内容 | 操作人 |
|---|---|---|---|
| 2026-09-04 | v0.4 | 依船长权限边界证据修订案例口径：E09 从”台风航变→AI 判据自动升级 L4”改为”**外部航变决定成立→影响链推演→下船调度 L2/L3+船长知会→执行期安全触发升 L4 船长决策区**” | 主代理 |
| 2026-08-22 | v0.1 | 初版规划：20 页结构、每页内容、引用文件/证据、附件边界、维护工作流 | DSH Agent |
| 2026-08-22 | v0.2 | 按用户意见新增”多 Agent 架构与 Agent Loop””审计与追溯体系”两页；重排后续页面；明确 AI 产品叙事、技术栈引用、亮色设计方向 | DSH Agent |
| 2026-08-22 | v0.3 | 按用户第二/三轮意见：页面静态化，删除视频/动态/模拟口径；航变价值改为”多源 API 弱信号预测 + 预案准备”；同步更新引用与附件边界 | DSH Agent |

---

## 0. 文档用途与维护方式

- 本文件是 **A3 产品介绍书的页面规划与内容索引**，不是最终 PPT/PDF。
- 每次修改本规划（增删页、调整内容、改引用），必须在「变更日志」表**新增一行**。
- 页面内容必须引用已有项目文档，禁止凭推测写数据；确需估算的数值必须标注 `[待验证]`。
- 最终成稿时再根据本规划填充内容。

---

## 1. 总体叙事逻辑

**主逻辑链**（对应比赛要求：问题定义 → 系统设计 → 技术路径 → 应用验证）：

```
痛点与现状 → 价值场景与 ROI → 产品边界 → 系统架构
→ 如何控制 AI（审批/治理/可信） → AI 三高地与技术栈
→ 技术选型汇总 → Demo 验证 → 量化指标 → 落地路径 → 差异化与风险
```

**核心论证句**：
> ClarSyn 不是用 AI 给规则引擎化妆，而是把系统立在规则引擎到不了的三块地上：**看见没见过的（开放域异常）、推演没写过的（长链路）、解释说不清的（推理附件）**。
> —— 引用 `design/ai-value-benchmark-vs-hackathon.md` §5.1 / `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.6

---

## 2. 20 页总览

| 页 | 页面 | 类型 |
|---|---:|---|
| 1 | 封面 | 品牌页 |
| 2 | 目录与阅读导览 | 导航页 |
| 3 | 一页看懂 | 摘要页 |
| 4 | 问题定义：船↔岸交界为什么难 | 价值论证 |
| 5 | 价值场景对比：登离船 / 港口接驳 / 航变 | 价值论证 + ROI |
| 6 | 用户、角色与产品边界 | 产品定位 |
| 7 | 系统架构总览 | 系统设计 |
| 8 | 多 Agent 架构与 Agent Loop | 系统设计 |
| 9 | 审计与追溯体系 | AI 控制 / 信任层 |
| 10 | AI 控制体系①：事件治理与权限流转 | 控制 AI |
| 11 | AI 控制体系②：反幻觉与可信护栏 | 控制 AI |
| 12 | AI 价值高地①：开放域异常发现 | AI 价值 + 技术栈 |
| 13 | AI 价值高地②：长链路推演与弱信号整合 | AI 价值 + 技术栈 |
| 14 | AI 价值高地③：推理附件与可解释性 | AI 价值 + 技术栈 |
| 15 | 技术选型总表：场景 × 环节 × 模型/技术 | 技术路径 |
| 16 | 应用验证：Demo 与高保真成果 | 应用验证 |
| 17 | 价值验证与量化指标 / ROI | 应用验证 |
| 18 | 工程可行性与落地路径 | 落地 |
| 19 | 差异化与风险 / 为什么是现在 | 收束论证 |
| 20 | 结尾致谢 | 品牌页 |

---

## 3. 逐页详细规划

### 第 1 页：封面

- **目标**：第一眼建立 ClarSyn 品牌与产品定位。
- **内容**：
  - ClarSyn 像素 Logo（C 蓝 #4c8dff，S 琥珀 #f0a43f）
  - 中文标题：基于多 Agent 协同的邮轮靠港接驳动态调度系统
  - 英文标题：Multi-Agent Collaborative Dynamic Scheduling System for Cruise Berthing & Shore Connection
  - 一句话定位：把船↔岸交界的混乱，变成分钟级清晰决策
  - 提交方 / 日期 / 赛事信息
- **视觉素材**：
  - `assets/brand/clarsyn-title-preview.svg`
  - `prototypes/wireframes/p1-captain-hifi.html` 开场截图
- **引用**：
  - `design/b-port-shore-and-itinerary/clarsyn-brand-and-title.md`

---

### 第 2 页：目录与阅读导览

- **目标**：让评审 3 分钟知道重点在哪。
- **内容**：
  - 20 页结构图
  - 三条快速阅读路径：
    - 管理者：3 → 5 → 7 → 16 → 17
    - 技术评审：7 → 8 → 9 → 12 → 13 → 14 → 15
    - 产品评审：4 → 5 → 6 → 8 → 10 → 11
  - 标注“AI 控制体系”在第 10–11 页，“AI 三高地”在第 12–14 页
- **引用**：本规划页即可，无外部引用。

---

### 第 3 页：一页看懂

- **目标**：用一页讲完“问题、方案、AI 价值、控制、验证”。
- **内容**：
  - 问题：登离船/港口接驳/航变三处体验断裂，信息滞后、口径不一
  - 方案：港岸协同决策层，AI 建议 + 人审批 + 全链路审计
  - AI 价值：开放域异常发现、长链路推演、可解释性
  - 控制：L1–L4 审批、超时升级、人工接管、审计
  - 验证：62 条事件案例数据 + 高保真静态界面截图
- **引用**：
  - `docs/competition-brief.md`（逻辑链要求）
  - `design/ai-value-case.md`（V1/V2/V3）
  - `SESSION_SUMMARY_2026-08-22.md`（Demo 现状）
  - `design/b-port-shore-and-itinerary/prd.md` §2.1

---

### 第 4 页：问题定义——船↔岸交界为什么难

- **目标**：用已有证据证明“这是真问题、且现有做法不够”。
- **内容**：
  - 三大痛点场景：
    - 登离船：排队不可见、分层下船等 3 小时
    - 港口接驳：静态指引、出租车拒载/宰客、政府连续两年承认
    - 航变：逐批沟通、口径不一致、群体拒下船
  - 关键数字：
    - 人工拼图 20–45 分钟
    - 航变逐批沟通：8 名客服连续 5h+（[待验证]）
    - 信息延迟 3–4 小时
  - 一句话：现有系统是“人工拼图”，不是“决策系统”
- **视觉**：三栏痛点图 / 证据等级标签
- **引用**：
  - `design/evidence-line-a-baseline.md` 场景二/三/四
  - `design/ai-value-case.md` §2 证据线 A
  - `research/pain-ai-matching.md` 高匹配度痛点

---

### 第 5 页：价值场景对比——登离船 / 港口接驳 / 航变

- **目标**：用 2–3 个场景展示“现有做法 vs ClarSyn”的提升，论证 ROI 价值。
- **内容**：
  - 每个场景一列：现状 → ClarSyn 后 → 提升量级 → 对企业的 ROI 含义
  - 场景 1：登离船动态调度
    - 现状：固定批次、广播/纸质通知
    - ClarSyn：动态时间窗、按码头状态调整批次、定向触达
  - 场景 2：港口接驳协同
    - 现状：静态 PDF/人工引导
    - ClarSyn：可执行接驳建议、价格区间提示、投诉入口
  - 场景 3：航变响应
    - 现状：8 客服 5h+ 逐批沟通、口径不一致
    - ClarSyn：快速调用气象/船期/港口/客服 API，提前发现航变弱信号，生成影响预测与应变预案，再进入审批与审计
  - ROI 口径：不做货币化，用“相对量级 + 显式假设”
- **引用**：
  - `design/b-port-shore-and-itinerary/prd.md` M2/M3/M4
  - `design/evidence-line-a-baseline.md` 场景二/三/四
  - `design/b-port-shore-and-itinerary/prd.md` §8.1 价值量化假设表
- **注意**：所有成本数字若为推断，必须保留 `[待验证]`。

---

### 第 6 页：用户、角色与产品边界

- **目标**：说明“给谁用、不越权做什么”。
- **内容**：
  - 核心用户：船长、运营经理、值班/客服、法务
  - 每个角色的 JTBD（ Jobs-to-be-done）：
    - 船长：需要可追溯的拍板依据
    - 运营经理：需要分钟级态势
    - 值班/客服：需要统一口径
    - 法务：需要条款原文
  - 产品边界：管什么 / 不管什么
    - 管：船方触达渠道、船司内部调度、可合法获取的港口数据
    - 不管：不指挥海关/边检/港调/交管
  - 数据三态：真实 / 模拟 / 不可得
- **引用**：
  - `design/b-port-shore-and-itinerary/prd.md` §2.2、§7
  - `design/b-port-shore-and-itinerary/prd.md` §2.3

---

### 第 7 页：系统架构总览

- **目标**：用一张架构图说明系统分层。
- **内容**：
  - 分层：
    - 感知层：M1 港岸状态感知
    - 决策层：M2 登离船调度、M3 港口接驳、M4 航变响应、M5 运营调度台
    - 触达层：M6 触达输出
  - 部署：
    - 船载边缘：实时闭环
    - 云端：异步增强
    - 卫星：仅异步同步
  - 标注哪些环节是确定性计算、哪些是 AI
- **引用**：
  - `design/b-port-shore-and-itinerary/prd.md` §5（M1–M6）
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` “部署与模型选型”

---

### 第 8 页：多 Agent 架构与 Agent Loop

- **目标**：讲清楚“多 Agent 不是贴纸”，而是有明确分工、通信、状态与回路的架构。
- **内容**：
  - Agent / 模块清单（按 `interface-map-and-ai-components.md` §2）：
    1. 事件接入与标准化适配器
    2. 事件分类 + 严重度判定
    2.5 库外异常识别（提醒卡 A18 / 抄送 A19，只提醒不执行）
    3. 确定性计算内核（排队 / 时间窗 / 影响人数，非 AI）
    4. 知识检索 RAG（策略库 / 条款库 / 事故模式记忆库）
    5. 方案组合与推演（3–4 个职责单一 Agent：事件 → 影响 → 资源 → 方案）
    5.5 推理附件生成（全量标配，异常提权）
    6. 证据与置信度检查
    7. 权限路由 / 审批门（可转人工接管）
    8. 执行触达
    9. 审计 + 事故模式记忆
  - 通信与编排：
    - 顺序主链路 + 库外异常旁路 + 超时升级回流 + 审计回流
    - 每个 Agent 输入输出独立，可回滚、可审计
  - Agent Loop 设计：
    - OODA 映射：Observe（接入/感知）→ Orient（分类/异常/整合）→ Decide（推演/方案/推理附件/置信度）→ Act（审批/触达）
    - 闭环反馈：执行结果 → 审计 → 事故模式记忆库 → 知识检索
    - 异常循环：低信度转人工 → 人工处置 → 回写事件库
    - 超时循环：审批超时自动升级
- **引用**：
  - `design/b-port-shore-and-itinerary/interface-map-and-ai-components.md` §2 文字版 + Mermaid
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.3
  - `research/patterns-judges-like.md` 模式 2、模式 3

---

### 第 9 页：审计与追溯体系

- **目标**：讲清楚“怎么审计、怎么追溯、谁可以看”。
- **内容**：
  - 全链路 trace_id：事件 → 建议/推理附件 → 审批签署 → 端口执行日志 → 审计包
  - append-only + 哈希链防篡改
  - 四档签署：
    - L1 自动
    - L2 电子确认
    - L3 电子签署可导出 PDF
    - L4 紧急后补签
  - 审计包内容：推理附件、审批签署、端口执行日志、人工登记标记
  - 一键导出 PDF 可打印
  - 审计回流：事故模式记忆库 + 模型坏例回归（Bad Case 双轨）
  - 权限：只能查看权限内事件，不能越权读取
- **引用**：
  - `design/b-port-shore-and-itinerary/event-governance-framework.md` §4.13
  - `design/b-port-shore-and-itinerary/interface-map-and-ai-components.md` §2 第 [9] 点
  - `design/b-port-shore-and-itinerary/prd.md` §8.1 Bad Case 双轨

---

### 第 10 页：AI 控制体系①——事件治理与权限流转

- **目标**：回答“AI 不是乱来的，权力在人手上”。
- **内容**：
  - 事件等级：L1 自动 / L2 值班 / L3 经理/法务 / L4 船长
  - 超时自动升级
  - 投放审核矩阵：可见性 × 可撤回性 × 后果
  - 人工接管：系统转观察 + 记录 + 建议
  - 确认签署：四档签署
  - 审计：append-only + trace_id + 导出 PDF
- **引用**：
  - `design/b-port-shore-and-itinerary/event-governance-framework.md` §4.2、§4.10、§4.12、§4.13
  - `design/b-port-shore-and-itinerary/prd.md` R3/R5/R9/R10

---

### 第 11 页：AI 控制体系②——反幻觉与可信护栏

- **目标**：回答“AI 胡说八道怎么办”。
- **内容**：
  - 三层兜底：
    1. RAG 事实锚：条款/策略必须引用原文编号
    2. 结构化约束：JSON Schema / 模板槽位
    3. 置信度 + 人工兜底：低信度转人工
  - 离线降级：T0–T3
  - 关键金句：幻觉不可根除，但错误成本从“错误执行”降级为“多余知会 / 更早人工介入”
- **引用**：
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.8、§3.8.1
  - `design/b-port-shore-and-itinerary/event-governance-framework.md` §4.5、§4.11

---

### 第 12 页：AI 价值高地①——开放域异常发现

- **目标**：讲“规则系统看不见库外异常”。
- **内容**：
  - 案例：X-0001 库外弱信号 → 提醒卡 → 人核实升级为 E01
  - 为什么规则做不到：新事件不在规则表里就无法触发
  - 技术栈：无监督异常检测 / 向量检索相似度 / LLM 语义判断 + 规则复核
  - 对应环节：M1 感知、M4 事件分类、库外异常识别
- **引用**：
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.6、§3.9
  - `design/b-port-shore-and-itinerary/event-governance-framework.md` §4.11
  - `SESSION_SUMMARY_2026-08-22.md` X-0001/E01

---

### 第 13 页：AI 价值高地②——长链路推演与弱信号整合

- **目标**：讲“AI 推演没写过的组合”。
- **内容**：
  - 案例：E09 外部航变决定成立 → 影响链推演 → 下船调度（L2/L3+船长知会）→ 执行期安全触发升级 **L4 船长决策区**
  - 为什么规则不行：预写分支组合爆炸、漏一条漏一次处置
  - 技术栈：多 Agent/Workflow 串联（事件→影响→资源→方案）、本地小/中模型、RAG 检索
  - 对应环节：M4 航变响应、M2/M3 联动
- **引用**：
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.6、§3.9
  - `design/b-port-shore-and-itinerary/prd.md` M4
  - `SESSION_SUMMARY_2026-08-22.md` E09 → E-L4 主剧情

---

### 第 14 页：AI 价值高地③——推理附件与可解释性

- **目标**：讲“每个 AI 判断都自带理由”。
- **内容**：
  - 推理附件全量标配：结论 + 置信度 + 证据链 + 替代方案
  - 案例：E-L4 船长决策卡展开推理附件 → 审批流 → 审计包
  - 技术栈：LLM 摘要 + 确定性校验 + RAG 引用编号 + trace_id
  - 对应环节：分类、影响、方案、审批、触达、审计全链路
- **引用**：
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.7
  - `design/b-port-shore-and-itinerary/event-governance-framework.md` §4.11、§4.13

---

### 第 15 页：技术选型总表——场景 × 环节 × 模型/技术

- **目标**：集中回答“AI 在不同场景、不同环节具体用什么”。
- **内容**：
  - 表：环节 → 技术形态 → 模型/算法 → 部署位置 → 为什么选
  - 示例：
    - 事件分类：有监督/少样本分类 + 规则复核 → 本地轻量模型
    - 库外异常：无监督异常检测 + 向量检索 → 本地特征/小模型
    - 长链路推演：多 Agent/Workflow + 本地中模型
    - 条款/策略检索：RAG + reranker → 本地 embedding + 规则优先
    - 话术生成：本地小模型（0.5B–8B）
    - 长文档解析：云端大模型（异步）
  - 强调：云端永不进入 3 分钟实时闭环
- **引用**：
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` “部署与模型选型”、“四方案对比”
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.9

---

### 第 16 页：应用验证——Demo 与高保真成果

- **目标**：让评审看到“不是纸面方案”。
- **内容**：
  - Web 高保真：船长端 `p1-captain-hifi.html`
  - 62 条事件案例数据 + 高保真界面截图
  - 关键界面截图：时间轴、AI 实时推理、事件卡片带、L4 审批、端口审计
  - 页面只呈现静态成果，不依赖动态演示
- **视觉**：从 `assets/review-shots/` 选择 4–6 张大图
- **引用**：
  - `SESSION_SUMMARY_2026-08-22.md`
  - `prototypes/mock/mock-data.js`、`prototypes/mock/sim-core.js`
  - `prototypes/specs/ui-complete/design.md`

---

### 第 17 页：价值验证与量化指标 / ROI

- **目标**：用诚实量化的口径证明“可衡量、可验证”。
- **内容**：
  - 目标指标（目标区间，非承诺）：
    - 事件分类准确率 ≥90%
    - RAG Top-5 命中 ≥85%
    - 感知→建议→审批任务 ≤3 分钟
    - 触达任务 ≤2 分钟
  - ROI 假设表：
    - 航变响应：客服高峰人力小时数下降（量级待仿真）
    - 登离船/航变信息集成：决策准备时间压缩一个量级
  - 强调：这是假设 + 待标定，不是虚假精度
- **引用**：
  - `design/b-port-shore-and-itinerary/prd.md` §8.1
  - `design/evidence-line-a-baseline.md` 场景四人工成本推断

---

### 第 18 页：工程可行性与落地路径

- **目标**：证明“能造出来、能落地”。
- **内容**：
  - 硬件：船载边缘节点、Jetson 类设备、本地小模型
  - 接口可用性：可用 / 待接入 / 不可得
  - 原型进度：Web 高保真原型已完成
  - 路线图：
    - Phase 0：Demo 验证（当前）
    - Phase 1：单港试点
    - Phase 2：多港复制
    - Phase 3：生态化
- **引用**：
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` “部署与模型选型”
  - `design/b-port-shore-and-itinerary/prd.md` §8
  - `design/b-port-shore-and-itinerary/demo-script-b5-options.md` §5 下一步

---

### 第 19 页：差异化与风险 / 为什么是现在

- **目标**：解释“为什么是 ClarSyn，而不是旧系统/聊天 AI/导航系统”，并收束叙事。
- **内容**：
  - vs 传统规则系统：三块 AI 高地是规则到不了的
  - vs 聊天式 AI：不是写文案，而是决策链路
  - vs 港口/机场排队系统：我们做“船岸协同决策层”，不是单点排队
  - 为什么是现在：2026 航变/港口接驳是官方与媒体双确认的持续痛点，AI 能力刚好补规则系统空白
  - 核心风险与对策：
    - 数据不可得 → 按可用性分层，不假设不可得数据
    - 模型幻觉 → RAG + 结构化约束 + 人工兜底
    - 组织边界 → 不越权，只做船方权限内
    - 离线 → T0–T3 降级
- **引用**：
  - `design/ai-value-benchmark-vs-hackathon.md` §4
  - `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.6
  - `research/patterns-judges-like.md` 反模式
  - `design/evidence-line-a-baseline.md` 航变/港口证据

### 第 20 页：结尾致谢

- **目标**：品牌化收尾，留下 Demo 入口。
- **内容**：
  - ClarSyn 像素 Logo
  - 一句话：ClarSyn 不是替代人，而是让每一次船岸决策更清晰、更可追溯
  - 感谢评审
  - 仅保留静态品牌收尾，不引用视频或在线 Demo
- **引用**：
  - `assets/brand/clarsyn-title-preview.svg`
  - `recordings/clarsyn-demo-2560x1440.mp4`

---

## 4. 适合主文档展示 vs 单独附件

### 主文档展示

- 产品定位、用户角色、价值主张
- 2–3 个价值场景对比（现状 vs ClarSyn vs ROI）
- 系统架构分层图、端到端事件闭环
- L1–L4 审批、超时升级、人工接管、审计
- 反幻觉三层兜底
- AI 三高地各 1 个代表案例
- 技术选型总表
- Demo 截图、量化指标、落地路径、差异化

### 单独附件（不在主文档展开）

| 附件 | 原因 |
|---|---|
| 30 类事件库 / 62 条 mock 数据 / SCHEMA | 实现资产，不是产品说服力 |
| 条款库 / 策略库 / 端口库 / 动作库全表 | 支撑材料，放入附录 |
| 完整接口清单 / MOCK_MODE / REAL_MODE 定义 | 技术实现细节 |
| 完整 AI 架构四方案对比表、ML 范式详表 | 主文档只放结论性选型 |
| 评测集、坏例表、回归方案 | 研发质量体系 |
| 全部证据来源清单、访谈素材 | 主文档引用关键结论 |
| 代码结构、核心代码片段、哈希链算法 | 辅助证明材料 |

---

## 5. 工作流与文件维护说明

1. **本规划文件**：`design/b-port-shore-and-itinerary/a3-product-doc-plan.md`
   - 所有页面结构、内容引用、附件边界都在这里改。
   - 每次修改必须在「变更日志」加一行。
2. **内容素材来源**：
   - 产品定义：`design/b-port-shore-and-itinerary/prd.md`
   - AI 价值/选型：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md`
   - 事件治理：`design/b-port-shore-and-itinerary/event-governance-framework.md`
   - Demo 剧本：`design/b-port-shore-and-itinerary/demo-script-b5-options.md`
   - 评审偏好：`research/patterns-judges-like.md`
   - 证据基线：`design/evidence-line-a-baseline.md`
3. **成稿流程**：
   - 先在本规划中确定每页内容和引用；
   - 再按页从源文档提取文案、表格、截图；
   - 每完成一页，在本规划对应页面打勾或在变更日志记录；
   - 最后统一排版为 A3 横板 PDF/PPT。
4. **用户修改方式**：
   - 用户可直接说“第 X 页增加/删减/调整”，Agent 修改本规划并记录日志；
   - 用户也可直接编辑本文件，但修改后需在变更日志补一行；
   - 重要数据必须保留来源标注，不能凭印象写。
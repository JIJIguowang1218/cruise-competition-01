# 续接文件 / Continuation（新对话启动手册）

> 本文件是新对话的第一入口。新对话开始后，按以下顺序执行：
> 1. 读本文件；
> 2. 主动提醒用户审核“最近待审核文件”；
> 3. 复述当前工作状态与最近讨论结论；
> 4. 按用户指示继续推进，不要擅自跳到旧任务。
>
> 🚨 **Push 规则（2026-08-29 生效）**：未经用户直接明确指示，不得自动 `git push` 到 GitHub；只有用户说“push / 推到 GitHub / 执行 git push”时才执行。

---

## 🚨 当前主线（2026-09-03 更新）

当前工作重心：**AI 产品经理作品集正文内容规划**，其中 P9-1 台风航变场景正在重新定位。

- 所有新文件统一写到 `portfolio/`，不要写入 `design/`
- 后续工作参考 `research/ai-pm-tutorials/REPORT.md`（GitHub AI PM 教程调研）
- 正在一页页讨论并填充 `portfolio/planning/ai-pm-portfolio-page-content.md`
- 旧目录 `design/` 仍是历史资料，可阅读，但不作为当前产出目标
- **P9-1 场景边界已重新讨论：ClarSyn 不做航变预警/航变决定，只做航变后的登离船与人员调度影响链**
- **P9-1 L4 适用性讨论中：倾向默认 L2/L3 + 船长知会 + L4 升级；需网络检索邮轮运营人员结构佐证**

---

## ✅ 最新状态速记（2026-09-03）

- 已重新规划作品集正文页：`portfolio/planning/ai-pm-portfolio-body-plan-v3.md`（用户已认可总体方向；v2 为旧版保留）
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
- 下一站：先完成“邮轮运营人员结构 / 船长审批边界 / 下船调度归属”网络检索任务，再按“默认 L2/L3 + 船长知会 + L4 升级”重绘 P9-1
- 最近一次 git push：`c18df00`
- 本地工作区已同步（`recordings/` 除外）

---

## 🟥 新对话开始后请提醒用户审核以下最近文件（按优先级）

1. `portfolio/planning/ai-pm-portfolio-page-content.md`
   - **重点审核 P7/P8/P9 内容**：P7 AI价值判断、P8 产品方案总览、P9 台风航变泳道图画法
2. `portfolio/planning/ai-pm-portfolio-body-plan-v3.md`
   - **重点审核 P8 岸基/船基协同结构、P9 泳道图画法**
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
- 正文页规划 v3（当前）：`portfolio/planning/ai-pm-portfolio-body-plan-v3.md`
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

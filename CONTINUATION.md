# 续接文件 / Continuation（新对话启动手册）

> 本文件是新对话的第一入口。新对话开始后，按以下顺序执行：
> 1. 读本文件；
> 2. 主动提醒用户审核“最近待审核文件”；
> 3. 复述当前工作状态与最近讨论结论；
> 4. 按用户指示继续推进，不要擅自跳到旧任务。
>
> 🚨 **Push 规则（2026-08-29 生效）**：未经用户直接明确指示，不得自动 `git push` 到 GitHub；只有用户说“push / 推到 GitHub / 执行 git push”时才执行。

---

## 🚨 当前主线（2026-08-31 更新）

当前工作重心：**AI 产品经理作品集正文内容规划**。

- 所有新文件统一写到 `portfolio/`，不要写入 `design/`
- 后续工作参考 `research/ai-pm-tutorials/REPORT.md`（GitHub AI PM 教程调研）
- 正在一页页讨论并填充 `portfolio/planning/ai-pm-portfolio-page-content.md`
- 旧目录 `design/` 仍是历史资料，可阅读，但不作为当前产出目标

---

## ✅ 最新状态速记（2026-08-31）

- 已重新规划作品集正文页：`portfolio/planning/ai-pm-portfolio-body-plan-v2.md`（用户已审核）
- 正在逐页填充正文主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
  - 当前页面：P1 产品定位、P2 宏观设计背景、P3 研究流程、P4 多源调研、P5 痛点分析与需求、P6 业务理解、P7 AI 机会判断
  - P4 多源调研：只列事实与来源，不做结论
  - P5 痛点分析与需求：综合判断式总结，三层嵌套（体验层 / 流程协同层 / 决策治理层）+ 四类断点视角
  - P6 业务理解：以系统上下文图表达输入来源 / 输出对象 / 外部边界 / 联动关系，并补充“不推倒原系统”的连接原则
  - P7 AI 机会判断：已重写为“四类业务断点 → AI 不可替代位置 → 三个场景价值”；构图采用“一主三辅长条区”，右栏带一句小标注
- ✅ 作品集视觉规范已切换：最终 HTML 为 `portfolio/a3-document/a3-document-web.html`；规范文件为 `portfolio/design-specs/a3-design-spec.md` 与 `portfolio/design-specs/ClarSyn_A3_DesignSpec.svg`
- ✅ SVG 图集已全部按 A3 终版 HTML 配色重绘/替换（9 张业务图），保持扁平无编组、透明底
- ✅ 新增单独内容页背景：`portfolio/svg-pm-diagrams/clarsyn-content-background.svg`（1600 × 1132，纯色 `#F4F5F7`；非封面渐变）
- ✅ 新增 HTML 组件资产：`portfolio/design-specs/a3-html-card-styles.svg`（卡片/倒角/投影）、`portfolio/design-specs/a3-html-icons-and-controls.svg`（图标/标识/状态栏/彩色按钮）
- ✅ 已 OCR 提取桌面 `2121` 图片文本：`portfolio/ocr-extracted/2121/`
- ✅ 已分析外部 AI 工业应用参考并写入：`portfolio/research/ai-production-deck-insights.md`
- ✅ 第 7 页新文件已放到桌面：`C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
- 下一站：等用户审核第 7 页页面文件；审核后继续 P8 及后续页面
- 最近一次 git push：`50c14a9`
- 本地工作区已同步（`recordings/` 除外）

---

## 🟥 新对话开始后请提醒用户审核以下最近文件（按优先级）

1. `portfolio/planning/ai-pm-portfolio-page-content.md`
   - **重点审核第 7 页「AI 机会判断」重写内容**：四类业务断点 → AI 不可替代位置 → 三个场景价值
2. `C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
   - 用户桌面上的第 7 页文案与构图文件，供 AI 绘图/排版使用
3. `portfolio/research/ai-production-deck-insights.md`
   - 外部 2121 AI 工业应用参考对 P1–P7 及后续页面的影响分析
4. `portfolio/ocr-extracted/2121/`
   - 桌面 2121 图片的 OCR 提取文本
5. `portfolio/svg-pm-diagrams/ai-scenario-value.svg`
   - 第 7 页场景价值 SVG（后续可按新文案同步再细化）
6. `portfolio/svg-pm-diagrams/ai-value-judgment.svg`
   - 第 7 页价值判断矩阵/结构图（后续可按新构图再更新）
7. `portfolio/planning/ai-pm-portfolio-body-plan-v2.md`
   - 正文页规划 v2，已同步“四类断点”“最小闭环”“核心/分支/支撑”等思路
8. `portfolio/svg-pm-diagrams/business-ecosystem-context.svg`
   - 第 6 页业务理解系统上下文图
9. `portfolio/svg-pm-diagrams/pain-point-layers.svg`
   - 第 5 页痛点分层图
10. `portfolio/svg-pm-diagrams/research-process-flow.svg`
    - 第 3 页研究流程九段图

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

---

## 🗂 当前关键文件索引

- 正文内容主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
- 正文页规划：`portfolio/planning/ai-pm-portfolio-body-plan-v2.md`
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

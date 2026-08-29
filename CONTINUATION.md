# 续接文件 / Continuation（新对话启动手册）

> 本文件是新对话的第一入口。新对话开始后，按以下顺序执行：
> 1. 读本文件；
> 2. 主动提醒用户审核“最近待审核文件”；
> 3. 复述当前工作状态与最近讨论结论；
> 4. 按用户指示继续推进，不要擅自跳到旧任务。
>
> 🚨 **Push 规则（2026-08-29 生效）**：未经用户直接明确指示，不得自动 `git push` 到 GitHub；只有用户说“push / 推到 GitHub / 执行 git push”时才执行。

---

## 🚨 当前主线（2026-08-29 更新）

当前工作重心：**AI 产品经理作品集正文内容规划**。

- 所有新文件统一写到 `portfolio/`，不要写入 `design/`
- 后续工作参考 `research/ai-pm-tutorials/REPORT.md`（GitHub AI PM 教程调研）
- 正在一页页讨论并填充 `portfolio/planning/ai-pm-portfolio-page-content.md`
- 旧目录 `design/` 仍是历史资料，可阅读，但不作为当前产出目标

---

## ✅ 最新状态速记（2026-08-29）

- 已重新规划作品集正文页：`portfolio/planning/ai-pm-portfolio-body-plan-v2.md`（用户已审核）
- 正在逐页填充正文主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
  - 当前页面：P1 产品定位、P2 宏观设计背景、P3 研究流程、P4 多源调研、P5 痛点分析与需求、P6 业务理解、P7 AI 机会判断
  - P4 多源调研：只列事实与来源，不做结论；含官方资料、媒体报道、用户评论、基线估算
  - P5 痛点分析与需求：已改为综合判断式总结，不再堆具体数据；不预设技术、不提前写 AI；优先级基于严重度、可介入性、现有手段覆盖不足
  - 已新增痛点分层图：`portfolio/svg-pm-diagrams/pain-point-layers.svg`（体验层 / 运营层 / 判断层）
  - 已新增研究流程九段图：`portfolio/svg-pm-diagrams/research-process-flow.svg`
- 用户要求继续逐页讨论，后续内容慢慢补充
- 最近一次 git push：`4aa0b8c`
- ⚠️ 本地存在未推送改动，等待用户明确指示后再 push

---

## 🟥 新对话开始后请提醒用户审核以下最近文件（按优先级）

1. `portfolio/planning/ai-pm-portfolio-page-content.md`
   - 正在逐页填写的正文主档，需要用户继续审核/补充
2. `portfolio/planning/ai-pm-portfolio-body-plan-v2.md`
   - 18 页正文规划，用户已审核过，但仍作为页面结构参考
3. `portfolio/planning/clarsyn-ai-pm-presentation-strategy.md`
   - ClarSyn AI PM 讲解策略
4. `research/ai-pm-tutorials/REPORT.md`
   - GitHub AI PM 教程调研报告
5. `portfolio/research/github-flowchart-resources.md`
   - 流程图 / 复杂关系图资源调研
6. `portfolio/svg-pm-diagrams/`
   - AI PM SVG 图集（当前 6 张，含研究流程、痛点分层图）
   - 重点新图：`research-process-flow.svg`、`pain-point-layers.svg`
7. `portfolio/design-specs/clarsyn-card-library-light.html`
   - Claude Light 卡片样式库
8. `assets/brand/clarsyn-logo-claude-light.svg` + `assets/brand/clarsyn-logo-claude-light-preview.svg`
   - Claude Light 配色 Logo

---

## 🗂 当前关键文件索引

- 正文内容主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
- 正文页规划：`portfolio/planning/ai-pm-portfolio-body-plan-v2.md`
- AI PM 讲解策略：`portfolio/planning/clarsyn-ai-pm-presentation-strategy.md`
- AI PM 教程调研：`research/ai-pm-tutorials/REPORT.md`
- 作品集总览：`portfolio/README.md`
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

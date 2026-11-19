# ClarSyn · AI 产品经理视角 SVG 图集

> 这些 SVG 使用扁平元素（rect/text/line/circle/path）绘制，方便直接拖入 Figma 微调。
> 配色与规范以 **ClarSyn A3 终版 HTML**（`portfolio/a3-document/a3-document-web.html`）为准：
> `#F4F5F7` 页面背景、`#FFFFFF` 纸面、`#1A2233` 正文、`#4A5468` 次级文字、
> `#3B7DD8` 主强调蓝、`#D98A1F` 副强调琥珀、`#237A4C` 成功绿、`#C93A3A` 警示红、
> `#EAF1FC` 浅蓝底、`#FDF3E4` 浅琥珀底、`#E8F4ED` 浅绿底、`#D8DCE3` 分隔线。
> 相关规范文件：`portfolio/design-specs/ClarSyn_A3_DesignSpec.svg`、`portfolio/design-specs/a3-design-spec.md`。

## 背景文件

- `clarsyn-content-background.svg`：A3 页面尺寸 1600 × 1132，**内容页背景纯色 `#F4F5F7`**，与 `a3-document-web.html` 第 2 页及之后普通内容页一致。
- 封面/致谢页的渐变 `#F4F5F7 → #EAF1FC` 属于特殊页效果；本次作品集业务图使用**普通内容页背景**。
- 各业务图 SVG **不内嵌背景**，透明底；需要成品时先放入背景文件，再叠放对应图形 SVG。

## 文件

| 文件 | 用途 |
|---|---|
| `pm-narrative-flow.svg` | AI PM 叙事主线：痛点 → 用户 → 机会 → 方案 → 价值 |
| `service-blueprint.svg` | 服务蓝图：用户旅程 / 前台触点 / 后台支撑 / AI 数据层 |
| `multi-agent-collaboration.svg` | 多 Agent 协同关系图：中枢、Agent、共享情境、外部资源 |
| `decision-flow.svg` | 动态调度决策流程：触发 → 研判 → 推荐 → 人工复核 → 执行回流 |
| `research-process-flow.svg` | 总体研究流程（九段）：行业研究 → 问题定义 → 用户调研 → 证据收集 → 业务梳理 → 目标确认 → AI 匹配 → 方案细化 → 验证迭代 |
| `pain-point-layers.svg` | 痛点分层图：体验层 / 流程协同层 / 决策治理层 |
| `business-ecosystem-context.svg` | 业务理解系统上下文图：输入来源（上游数据源） / 输出对象（下游系统） / 外部边界 / 联动系统 |
| `ai-value-judgment.svg` | AI 场景价值判断图：机会定位矩阵 + 三高地 + 判断链 |
| `ai-scenario-value.svg` | AI 场景价值案例图：三个真实案例的“过去 → ClarSyn → 价值”对比 |

## 使用建议

- 在 Figma 中拖入后取消 `shape-rendering` 的要求即可正常编辑；
- 所有业务图保持扁平、无 `<g>` 编组，便于后续微调；
- 当前作品集以 A3 HTML 的商业浅色方案为准；
- 文案可根据 A3 页面结构调整，SVG text 在 Figma 中仍是可编辑文本。

# GitHub 流程图 / 复杂关系图资源调研

> 调研时间：2026-08
> 渠道：GitHub API 实时查询
> 用途：为 ClarSyn A3 文档、作品集和产品演示选用合适的流程图 / 关系图方案

---

## 1. 文本即图（Diagram as Code）

| 仓库 | 星标 | 简介 |
|---|---|---|
| mermaid-js/mermaid | ~89.9k | 类 Markdown 文本生成流程图、时序图、甘特图等，最适合快速嵌入 Markdown / A3 页面 |
| plantuml/plantuml | ~13.3k | 老牌文本绘图工具，覆盖面广，支持 UML、时序、状态、用例图 |
| mingrammer/diagrams | ~42.5k | Python 代码画云架构图，适合系统架构类页面 |
| terrastruct/d2 | ~25.1k | 现代声明式文本绘图语言，输出 SVG，适合复杂关系图 |
| yuzutech/kroki | ~4.3k | 统一渲染 Mermaid、PlantUML、D2、Graphviz 等多种图，适合服务端集成 |

## 2. 前端图可视化框架（复杂关系图 / 网络图）

| 仓库 | 星标 | 简介 |
|---|---|---|
| d3/d3 | ~113.5k | 底层可视化之王，自由度最高，适合定制复杂关系视图 |
| antvis/G6 | ~12.3k | AntV 图可视化框架，支持关系图、流程图、力导图等 |
| antvis/X6 | ~6.7k | AntV 图编辑引擎，面向流程图 / DAG / 脑图等可交互编辑场景 |
| cytoscape/cytoscape.js | ~11.2k | 图论 / 网络可视化库，适合复杂网络、路径和社区分析 |
| xyflow/xyflow | ~38.2k | React Flow / Svelte Flow，开箱即用的节点编辑器 |
| visjs/vis-network | ~3.6k | 轻量网络图，自动布局，适合关系拓扑 |
| didi/LogicFlow | ~11.7k | 专注业务自定义的流程图编辑框架，支持脑图、ER、UML、工作流 |
| alyssaxuu/flowy | ~12.1k | 极简 JS 流程图生成，适合快速原型 |

## 3. 通用绘图编辑器与格式

| 仓库 | 星标 | 简介 |
|---|---|---|
| excalidraw/excalidraw | ~130.6k | 手绘风白板，适合快速画示意图 |
| jgraph/drawio | ~7.8k | draw.io / diagrams.net 客户端编辑器，适合通用流程图 |
| hediet/vscode-drawio | ~9.5k | VS Code 内集成 Draw.io，便于文档协作 |
| bpmn-io/bpmn-js | ~9.6k | BPMN 2.0 流程图渲染与建模，适合业务流程类内容 |

## 4. 对 ClarSyn 的初步建议

- A3 文档静态架构图 / 流程图：优先 **Mermaid** 或 **D2**，文本源可维护、输出 SVG 清晰；
- 多 Agent 协同关系图 / 事件网络：优先 **AntV G6** 或 **Cytoscape.js**，适合复杂节点与边关系；
- 需要可交互的调度流程编辑器：优先 **React Flow (xyflow)** 或 **LogicFlow**；
- 快速手绘风格示意：**Excalidraw** 可用来画早期方案草稿；
- 如果最终要插入 A3 HTML，建议仍按现有扁平 SVG 规范输出，保持与 Claude Light 设计规范一致。

> 备注：星标数与当前 GitHub 实时数据接近；具体取舍还要结合是否要离线、打印清晰度、交互复杂度、开发成本来定。

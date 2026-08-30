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

## 5. 第 6 页「业务理解」推荐图型

> 结论：最适合的图是 **C4 Model 的 Level 1：System Context Diagram（系统上下文图）**。

### 为什么适合

第 6 页需要表达的信息是：

- ClarSyn 在现有船司运营生态中站在哪里
- 读取哪些系统/数据
- 向哪些系统/端口输出
- 与哪些系统只是联动
- 与哪些系统完全不碰

这正是 **系统上下文图** 的标准表达范围：目标系统放中间，外部系统/角色围在周围，用箭头表示“读入/输出/协作/不指挥”。

### 备选图型

| 图型 | 适用性 | 说明 |
|---|---|---|
| **C4 System Context** | ✅ 最推荐 | 清晰表达“系统在生态中的位置 + 边界 + 输入输出关系” |
| DDD Context Map | 🟨 备选 | 适合表达业务限界上下文之间的关系，但偏领域建模，作品集观众可能觉得太重 |
| Service Blueprint | 🟨 可参考 | 适合讲用户旅程 + 前台/后台，但本页重点不是用户旅程，而是系统生态与边界 |
| Stakeholder / Ecosystem Map | 🟡 辅助 | 可以展示角色关系，但表达不了“系统之间信息流” |

### 推荐 GitHub 参考资源

- `plantuml-stdlib/C4-PlantUML`（~7.4k★）：用 C4 模型画系统上下文图
- `ContextMapper/context-mapper-dsl`（~262★）：DDD 上下文图，适合后期做领域边界分析
- `mingrammer/diagrams`（~42.6k★）：Python 画架构图，适合快速生成初稿
- `goadesign/model`（~466★）：Go 语言构建架构模型，适合工程化
- `soulspace-org/overarch`（~298★）：支持 C4 与 UML 的模型化绘图
- `jgraph/drawio`（~7.8k★）：手动精修系统上下文图

### 页面落地建议

- 主图采用 **手绘扁平 SVG 系统上下文图**，保持与 Claude Light 风格一致；
- 中心放 ClarSyn，周围分三圈：
  1. 外部不可控系统：港口 / 海关 / 边检 / 交管 / OTA
  2. 船司现有系统：船期 / 客服 / 法务赔偿 / App / 广播 / 船员端
  3. 联动关系箭头：读入、输出、只交换、不指挥
- 不展示我们系统内部模块，内部架构留给后续页。

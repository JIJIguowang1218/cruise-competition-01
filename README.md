# ClarSyn｜邮轮港岸协同与航变响应决策系统 <sub>#B端产品　#AI治理　#决策支持</sub>

一套面向邮轮公司安全运维的 AI 决策层：在 SMS 安全管理体系、报警联锁与既有船舶管理系统之外，为规则覆盖不到的事件提供可复核的判断；决定权与处置责任保留在船长与值班人员手中。

- **AI 判断层界定**：规则系统（SMS 程序、报警联锁、船舶管理系统）只能覆盖已定义事件，AI 定位为其之上的判断层，承担非库内异常发现、跨系统态势整合、影响链推演与推理说明。
- **AI 介入与边界**：AI 不进入控制与联锁回路，不替代既有船舶管理系统；阈值与时间窗由本地规则模型核算，判断按依据项标注（来源、时效、程序条款）随处置单留存，置信度不足不作建议、转值班人员判断，记录按 SMS 归档备查。
- **分级授权与审批设计**：分级依据是决策权归属而非影响度，船长审批仅限安全不可逆、群体性影响、法定对外责任三类事件，其余转知会、不阻塞执行；审批一次生效，常规超时默认执行并留痕，涉险超时升级。
- **人机交付与部署约束**：船舶封闭运行、卫星带宽受限、船员编制固定，按岸基协同与船基执行分层部署，断网或算力不足时降级为纯规则运行；AI 输出止于方案与任务包，现场指令由人下达，不增加末端操作负担。

## 文档索引

| 文档 | 内容 |
|---|---|
| [产品需求文档（PRD）](design/b-port-shore-and-itinerary/prd.md) | 定位、边界、M1–M6 模块、质量目标与评测闭环 |
| [AI 价值判断与架构选型](design/b-port-shore-and-itinerary/ai-architecture-and-value.md) | 为什么必须用 AI、不可替代性论证、幻觉兜底、模型与部署选型 |
| [事件治理与权限流转框架](design/b-port-shore-and-itinerary/event-governance-framework.md) | 事件分类分级、审批、人工接管、确认签署与痕迹管理 |
| [机制总谱](design/b-port-shore-and-itinerary/mechanism-registry.md) | C0–C5 主轴与 G1–G4 全局机制全量索引 |
| [接口地图与 AI 组件关系](design/b-port-shore-and-itinerary/interface-map-and-ai-components.md) | 能接什么、输出到哪、不碰什么 |
| [系统架构与技术选型](design/b-port-shore-and-itinerary/system-architecture-and-tech-selection.md) | 岸基 / 船基部署、韧性降级、模型选型 |
| [系统边界与接口范围](design/scope-and-boundary.md) | 纳入 / 不纳入清单与已拍板结论 |
| [证据台账](research/round2/evidence-index.md) | 分级证据来源（L0/L1/L2）与调研方法说明 |
| [痛点与证据合成](research/round2/pain-points-v3.md) | 痛点判定、置信度与方向含义 |

<!-- 图集插入位置：系统全景 / 事件全流程 / 工种协作 / L3 审批 / 推理附件 / L4 决策 -->

## 原型与演示

- 可运行原型：[`prototypes/mock/sim-demo.html`](prototypes/mock/sim-demo.html)
- 高保真渲染图：[`portfolio/assets/renders/`](portfolio/assets/renders/)

## 仓库结构

```text
docs/
  01-product/       产品需求文档
  02-ai/            AI 价值判断与架构选型
  03-governance/    事件治理框架、机制总谱
  04-system/        接口地图、系统架构
  05-validation/    评测口径与模拟数据说明
  diagrams/         架构与流程图（PNG 正文用，SVG 源文件留档）
  ClarSyn-产品说明.pdf
prototypes/         可运行原型与模拟事件数据
research/           行业证据、痛点合成与调研台账
competition/        竞赛命题与答辩材料
archive/            历史版本
```

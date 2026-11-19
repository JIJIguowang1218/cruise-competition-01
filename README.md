# ClarSyn｜邮轮港岸协同与航变响应决策系统 <sub>#B端产品　#AI治理　#决策支持</sub>

一套面向邮轮公司安全运维的 AI 决策层：在 SMS 安全管理体系、报警联锁与既有船舶管理系统之外，为规则覆盖不到的事件提供可复核的判断；决定权与处置责任保留在船长与值班人员手中。

- **AI 判断层界定**：规则系统（SMS 程序、报警联锁、船舶管理系统）只能覆盖已定义事件，AI 定位为其之上的判断层，承担非库内异常发现、跨系统态势整合、影响链推演与推理说明。
- **AI 介入与边界**：AI 不进入控制与联锁回路，不替代既有船舶管理系统；阈值与时间窗由本地规则模型核算，判断按依据项标注（来源、时效、程序条款）随处置单留存，置信度不足不作建议、转值班人员判断，记录按 SMS 归档备查。
- **分级授权与审批设计**：分级依据是决策权归属而非影响度，船长审批仅限安全不可逆、群体性影响、法定对外责任三类事件，其余转知会、不阻塞执行；审批一次生效，常规超时默认执行并留痕，涉险超时升级。
- **人机交付与部署约束**：船舶封闭运行、卫星带宽受限、船员编制固定，按岸基协同与船基执行分层部署，断网或算力不足时降级为纯规则运行；AI 输出止于方案与任务包，现场指令由人下达，不增加末端操作负担。

## 文档索引

| 文档 | 内容 |
|---|---|
| [产品需求文档（PRD）](docs/prd.md) | 定位、边界、M1–M6 模块、质量目标与评测闭环 |
| [AI 价值判断与架构选型](docs/ai-architecture.md) | 为什么必须用 AI、不可替代性论证、幻觉兜底、模型与部署选型 |
| [事件治理与权限流转框架](docs/event-governance.md) | 事件分类分级、审批、人工接管、确认签署与痕迹管理 |
| [机制总谱](docs/mechanism-registry.md) | C0–C5 主轴与 G1–G4 全局机制全量索引 |
| [接口地图与 AI 组件关系](docs/interfaces.md) | 能接什么、输出到哪、不碰什么 |
| [系统架构与技术选型](docs/system-architecture.md) | 岸基 / 船基部署、韧性降级、模型选型 |
| [系统边界与接口范围](docs/scope.md) | 纳入 / 不纳入清单与已拍板结论 |
| [证据台账](research/evidence/evidence-index.md) | 分级证据来源（L0/L1/L2）与调研方法说明 |
| [痛点与证据合成](research/evidence/pain-points-v3.md) | 痛点判定、置信度与方向含义 |

<!-- 图集插入位置：系统全景 / 事件全流程 / 工种协作 / L3 审批 / 推理附件 / L4 决策 -->

## 原型与演示

- 可运行原型：[`prototypes/mock/sim-demo.html`](prototypes/mock/sim-demo.html)
- 交互原型页：[`prototypes/pages/`](prototypes/pages/)
- 高保真渲染图：[`prototypes/renders/`](prototypes/renders/)

## 仓库结构

```text
docs/            核心文档（PRD、AI 架构、事件治理、机制总谱、接口、系统架构、边界）
  diagrams/      架构与流程图（src 为 SVG / drawio 源文件）
prototypes/      pages 交互原型 · mock 模拟数据 · renders 渲染图 · specs / wireframes
research/        evidence 证据台账 · decisions 方向选择 · round3 补充研究 · scenarios / method
competition/     defense 答辩 · deck 汇报 · portfolio 作品集 · submission 命题
archive/         old-versions 历史版本 · process 过程文档 · reference 参考素材 · scratch 临时
assets/          品牌资源
tools/           数据采集与录制脚本
```

竞赛、作品集与答辩材料集中在 `competition/`，不属于系统本体。

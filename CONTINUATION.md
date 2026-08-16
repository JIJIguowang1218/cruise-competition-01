# 续接文件 / Continuation

> 用途：让另一台设备同步项目后，可以快速接续当前讨论与任务
> 状态：2026-08-16 工作区推进记录
> 注意：本文件不是设计文档，是“当前进度 + 下一步”的接续说明

## 1. 当前共识

- 产品定位：**B 端 AI 产品**，面向邮轮公司/运营管理方。
- 核心任务：**全船空间×时间调度决策**。
- 非目标：不做 C 端乘客产品、不做乘客 App、不建设终端硬件。
- Demo 边界：可以用静态/模拟视图展示系统输出触达乘客/船员，但不进入产品范围。
- **AI 价值判断是项目基石**，不是补充材料。
- 航变模块：作为事件响应模块并入主方案，但不作为独立产品，也不做成普通智能客服。

## 2. 本次已完成

### 2.1 新建设计框架

- `design/scope-and-boundary.md`
  - 五层模型
  - 初步纳入/不纳入清单
  - 接口关系矩阵草稿
  - 待讨论问题

- `design/ai-value-case.md`
  - AI 价值论证框架
  - 证据线 A：旧模式基线
  - 证据线 B：黑客松 AI 优势提取（待补）
  - “关掉 AI 还剩什么”压力测试
  - 面试/评审追问清单

### 2.2 新建痛点原文素材库

- `research/round2/source-archive/README.md`
- `research/round2/source-archive/01-dining-crowd.md`
- `research/round2/source-archive/02-embark-disembark.md`
- `research/round2/source-archive/03-port-transport.md`
- `research/round2/source-archive/04-itinerary-change-compensation.md`
- `research/round2/source-archive/05-entertainment-public-space.md`

### 2.3 重要提醒：用户尚未审核本次新增文件

> 以下文件是本次新生成/新增的，用户明确表示**现在不审，放到明天/新设备上再审核**：
> - `design/scope-and-boundary.md`
> - `design/ai-value-case.md`
> - `research/round2/source-archive/README.md`
> - `research/round2/source-archive/01-dining-crowd.md`
> - `research/round2/source-archive/02-embark-disembark.md`
> - `research/round2/source-archive/03-port-transport.md`
> - `research/round2/source-archive/04-itinerary-change-compensation.md`
> - `research/round2/source-archive/05-entertainment-public-space.md`
>
> 新设备开始工作时，**第一步应提醒用户审核这些新增文件**，再继续后续讨论。

## 3. 未完成 / 下一步

### 3.1 等待黑客松总仓库

- 用户将在另一台设备提供 Hackathon-reading 总仓库路径。
- 拿到后执行：
  1. 从高分项目中提取“AI 带来的具体优势”。
  2. 映射到邮轮调度场景。
  3. 收敛 2–3 个最有说服力的 AI 价值点。
  4. 回填 `design/ai-value-case.md` 的证据线 B。

### 3.2 待讨论内容

- `design/scope-and-boundary.md` 的具体内容尚未定稿。
- 产品定义是否调整暂不决定，等 AI 价值论证后再判断。
- Demo 主场景暂不最终确定，等 AI 价值与范围边界清楚后再讨论。
- 是否需要把娱乐/公共空间纳入 MVP，待讨论。
- **明天的讨论目标：形成产品需求文档（PRD）**，它是 `scope-and-boundary.md` 的完整升级版，不只写边界，还要写出产品定义、功能范围、核心流程、接口关系、非功能要求等。

### 3.3 后续建议顺序

1. 用户提供黑客松仓库路径。
2. 补完 `design/ai-value-case.md`。
3. 根据 AI 价值结论收敛 `design/scope-and-boundary.md`。
4. 补充痛点原文素材库（按需）。
5. 基于 AI 价值 + 范围边界讨论 Demo 主场景。
6. **最终形成产品需求文档（PRD）**，作为后续设计与开发基准。

## 4. 下次接续时先看这些

1. `CONTINUATION.md`（本文件）
2. `design/ai-value-case.md`
3. `design/scope-and-boundary.md`
4. `research/round2/source-archive/README.md`

> 新设备启动时：**先提醒用户审核本次新增文件（见 2.3），再进入讨论**。

## 5. 给明天/另一台设备的说明

- 本文件已提交到项目内，同步后即可继续。
- 黑客松仓库不在本设备，需要用户主动提供路径。
- 如果同步后发现文件缺失，请先检查是否 pull 到最新提交。

# Cruise Competition 01

> AI + 邮轮场景创新竞赛项目。目标：用 AI 产品经理的视角，为邮轮上的真实场景设计 AI 解决方案。

## 项目定位

这是一次 AI 产品设计竞赛。参赛者需要针对**邮轮上的真实业务场景**，提出并设计 AI 驱动的解决方案。评判标准不仅是"AI 用得对不对"，更是"这个产品在邮轮上能不能真的落地、能不能真的创造价值"。

## 核心原则

### 1. AI 产品经理的敏锐眼光

每当你分析一个场景、提出一个方案时，先问自己三个问题：
- **谁会用这个产品？** 乘客？船员？邮轮公司运营？不同角色的需求完全不同。
- **用了之后能省什么/赚什么？** 时间？人力？能耗？投诉率？NPS？
- **为什么是现在？** 之前为什么没人做？是技术不成熟还是没人想过？

### 2. 对业务的理解

邮轮不是一个"浮动的酒店"。它是一个封闭的、资源有限的、多角色混合的微缩社会。好的产品方案必须体现对以下维度的一手理解：
- **空间约束**：船上不能"加一台服务器"或"装一个新摄像头"
- **网络约束**：卫星网络延迟高、带宽有限、费用昂贵
- **人力约束**：船员编制固定，多语言多文化背景
- **时间约束**：航程有限，乘客的决策窗口很短
- **安全约束**：海事安全法规，SOLAS 公约

### 3. 对 AI 能力边界的深刻理解

AI 不是魔法。在产品设计时，你必须清楚：
- **AI 擅长什么**：模式识别、自然语言理解、多模态感知、内容生成、推理规划
- **AI 不擅长什么**：精确物理计算、实时安全控制、需要 100% 准确率的场景
- **边界在哪**：网络离线时怎么办？乘客隐私怎么保护？误判的代价多大？
- **参考 Hackathon-reading 的教训**：大量作品犯的错误——把 AI 当万能胶水、贴 MCP 标签但实际没用、UI 精美但 AI 是假的

## 与 Hackathon-reading 的关系

`Hackathon-reading/` 是本项目的**经验库和灵感源**：
- 分析过的 30+ 黑客松作品提供了 AI 产品设计的正反面案例
- 你可以随时翻阅 `Hackathon-reading/analysis/` 下的分析文章
- 从中学到的"什么做对了、什么做错了"要应用到邮轮场景中
- 注意：邮轮场景 ≠ 黑客松 Demo——邮轮是真实物理世界，不是浏览器里的 SPA

## 目录结构

```
cruise-competition-01/
├── AGENTS.md           ← 你正在看的文件
├── research/           ← 邮轮行业调研（场景、竞品、用户研究）
│   ├── scenarios/      ← 邮轮场景拆解（登船/餐饮/娱乐/安全/...）
│   └── competitors/    ← 现有邮轮科技方案
├── ideas/              ← 产品创意（每个 idea 一个文件）
├── design/             ← 产品设计文档（PRD、用户旅程、线框图）
├── prototypes/         ← 可运行的原型代码
├── docs/               ← 参考资料、API 文档、海事法规
└── assets/             ← 图片、演示素材
```

## 工作流程

1. **调研**：理解邮轮行业的真实运作和痛点 → `research/`
2. **发散**：基于调研产生多个 AI 产品创意 → `ideas/`
3. **筛选**：用产品经理的标准筛选最有潜力的方向
4. **设计**：写 PRD、画用户旅程、定义 MVP → `design/`
5. **验证**：搭建原型、测试核心假设 → `prototypes/`
6. **迭代**：从 Hackathon-reading 中随时汲取灵感

## 当前状态

- [x] 项目基础文件夹
- [x] 比赛要求文档 → `docs/competition-brief.md`
- [x] 参考船型数据 → `research/scenarios/reference-ships.md`
- [x] 痛点清单 v2（35条，46%实证）→ `research/scenarios/pain-points-v2.md`
- [x] 数据收集局限记录 → `research/scenarios/data-limitations.md`
- [x] Step 2 完成：评委模式提炼 → `research/patterns-judges-like.md`
- [x] Step 2 完成：痛点×AI匹配矩阵 → `research/pain-ai-matching.md`
- [x] Step 2 完成：方向锁定建议 → `ideas/direction-proposals.md`
- [ ] Step 3：选定方向深入设计
- [ ] 竞品分析
- [ ] 原型开发

## 比赛要求摘要

三大方向（可自拟场景）：
1. **智能运营与决策优化** — 资源调度、运营协同、辅助决策
2. **安全感知与风险预警** — 多模态感知、异常识别、风险预警
3. **空间与体验智能设计** — 空间生成、布局优化、服务体验

作品逻辑链：问题定义 → 系统设计 → 技术路径 → 应用验证
加分项：可运行 Demo 或在线体验链接
详见 `docs/competition-brief.md`

## DSH 环境与协作约定（2026-08-15 起生效）

本工作区以 DeepSeek Harness（DSH）为主开发环境；原 Hermes 配置与工具产物已整体移至 `HermesWorkspace\_legacy-hermes\cruise-competition-01\`（未删除，可回溯）。

### 角色分工

- **用户**：产品负责人（工业设计背景、非计算机专业）——负责需求与方向判断、方案取舍、答辩叙事、设计与体验评审；
- **DSH agent**：实现者——负责代码、原型、调研执行与文档起草；用户不需要理解实现细节。

### 协作约定（对 agent 生效）

1. 使用产品方法论技能时，**用中文解释框架逻辑与每步判断依据**；重大决策先给出 2–3 个选项与推荐，等用户拍板；
2. 技能正文中引用的 Claude 工具名按此映射：`Read`→read、`Write`→write、`Edit`→edit、`Bash`→pwsh（Windows）、`Grep/Glob`→grep/glob、`TodoWrite`→todo_write、`WebSearch`→web_search、`Task`→subagent；
3. 竞赛主线按阶段调用**项目级技能**（`.dsh/skills/`，共 10 个，随本工作区自动加载）：

| 阶段 | 技能 |
|---|---|
| 需求 | jtbd-analysis → research-synthesis |
| 价值验证 | problem-validation → llm-evaluation |
| 架构设计 | multi-agent-patterns → ai-agents-architect |
| 落地 | prd-architect → prd-to-issues |
| 答辩 | competition-defense-narrative（会引用 `docs/competition-brief.md` 与 `research/patterns-judges-like.md`） |
| 任意环节 | grill-me（反方压力测试） |

4. 用户级技能（竞品分析、机会树、范围裁剪、前端设计、简历、求职叙事）全局可用，C 端 demo 与求职时调用；
5. 工程纪律（brainstorming、writing-plans、TDD、systematic-debugging、requesting-code-review）由 agent 内部执行，不要求用户参与。

### 工具安全与卡死管理约定（2026-08-17 起生效）

本机已安装 `rg`（ripgrep）。为避免 `grep -R` 在 `node_modules`/符号链接目录中无限遍历导致会话卡死，同时不削弱 Agent 检索能力，本工作区约定：

#### 搜索命令

- 默认使用 ripgrep：
  ```bash
  rg -n --hidden --glob '!node_modules/**' --glob '!.git/**' --glob '!dist/**' --glob '!build/**' "<pattern>" .
  ```
- 需要全量检索（隐藏、忽略、二进制、符号链接）时，显式使用：
  ```bash
  rg -uuu -n -L --max-filesize 10M "<pattern>" .
  ```
- 精确控制文件集合时使用：
  ```bash
  find . -type f -not -path '*/node_modules/*' -print0 | xargs -0 grep -n "<pattern>"
  ```
- 避免默认使用 `grep -R`；如果必须用 grep，用 `grep -r` 并排除 `node_modules`、`.git`、`dist`、`build`。
- 不删除/禁用 grep、find、bash；安全搜索无结果时，应主动考虑全量搜索或询问用户，不能直接断定“没有”。

#### 超时与进程管理

- 普通搜索/读命令默认超时 30–60s；build/test/install 等长任务可配置 5–10 分钟。
- 后台/daemon 命令必须重定向 stdio：`nohup ... >log 2>&1 &`，避免占用 Agent 管道。
- 非交互命令默认加 `< /dev/null`。
- 超时/中断后必须清理整个进程树（Windows 用 `taskkill /PID <pid> /T /F`）。
- 如果 DSH/底层支持，配置 `experimental.tool_timeout` / `experimental.task_timeout`；不支持时用 `timeout` 包装。

#### 卡死交互

- 命令执行超过 30s 且长时间无输出时，Agent 应主动告知用户“可能卡住”，并说明命令、运行时长、可能原因和建议。
- 超时/中断必须返回部分输出和原因，不能静默等待。
- 若 `grep -R` 等命令卡死，终止后自动改用 `rg` 安全搜索重试，不重复执行同一危险命令。
- 若进程清理失败，明确报告残留进程和手动清理命令，让用户知情。


### 目录补充说明

- `.dsh/`：DSH 项目配置与项目级技能——属于项目内容，随 git 提交，队友共用；
- `prototypes/`：可运行 demo 存放处（比赛加分项）；
- 其余目录结构与工作流程沿用上文定义。

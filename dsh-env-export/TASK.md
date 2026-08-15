# AI 任务书：在干净的 Windows 上安装并配置 DeepSeek Harness 环境

> 给**目标机上的通用 AI 执行终端**（Claude Code / Cursor agent / 其他能执行 shell 的 agent）的自主任务书。
> 读取本文件后**无需任何额外指令**，按本文档执行直至"完成"。本文件自包含所有必需事实。
> 目标机是**全新机器**：可能连 Node.js 都没有——**DSH 的安装本身就是任务的一部分**。

## 1. 背景（30 秒了解）

DeepSeek Harness（DSH）是一个本地运行的 AI 智能体工作台（Web GUI + 命令行）。
本套件 `dsh-env-export` 来自一台已经配置好的源机，包含：官方代码 + 源机的自定义修改
（文件树功能，分支 `local/file-browser`）、4 个插件（含文件浏览器侧边栏）、1 个手动补丁、
若干用户技能与配置。你的任务是把目标机变成与源机**一致的可用环境**。

## 2. 任务目标（成功标准，逐项验证全部通过才算完成）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| S0 | 前置工具链 | `node --version` ≥ 20 且 `pnpm --version` ≥ 10 可用（当前 shell 与持久 PATH） |
| S1 | checkout | `<HarnessDest>`（默认 `D:\OtherAPPS\deepseek-harness`）存在；`git branch --show-current` = `local/file-browser`；`git rev-parse HEAD` 含 `709ce2c`。**若目标机无 git**：降级为检查 `.git` 目录存在（`winget install Git.Git` 可补装，非 DSH 运行必需） |
| S2 | harness 依赖 | checkout 根 `pnpm install` 退出码 0，`node_modules` 存在 |
| S3 | profile bundles | `<DshHome>\profiles\web\package.json` 的 `dsh.profile.bundles` = `@deepseek-ai/dsh-base`、`@deepseek-ai/dsh-web-app`、`dsh-skill-viewer`、`dsh-better-sidebar`（4 项，顺序无关） |
| S4 | 插件安装 | `<DshHome>\profiles\web\node_modules\dsh-better-sidebar` 与 `\dsh-skill-viewer` 存在 |
| S5 | skill-viewer 补丁 | `...\dsh-skill-viewer\lib\client.js` 含 `RETRY_METHODS` 且 `node --check` 通过 |
| S6 | 用户资产 | `<DshHome>\skills` 下 6 个技能目录；`<DshHome>\.agent-presets\anchored-standard` 下 8 个文件；`<DshHome>\settings.yaml` 存在 |
| S7 | 服务可启动 | `http://127.0.0.1:3080` 返回 HTTP 200 且正文含 `__DSH_BOOT__` |
| S8 | 综合验证 | 运行 `verify.ps1` 输出全部 PASS |

## 3. 环境事实（源机导出，勿修改）

- 源机：Windows 10+；Node **v24**；pnpm **11.7.0**（lockfile 为 pnpm 11 生成，务必用 pnpm ≥ 10，推荐 11）
- checkout 分支 `local/file-browser`，HEAD `709ce2c`（2026-08-15；相对官方 master 修改 18 文件：文件树/侧边栏相关）
- 插件：`dsh-better-sidebar ^0.12.1`（npm）；`dsh-skill-viewer 0.2.4`（GitHub release `Fishquito7/dsh-skill-viewer` v0.2.4 tarball）
- 默认路径：harness → `D:\OtherAPPS\deepseek-harness`；`~/.dsh` → `%USERPROFILE%\.dsh`
- 套件文件（本文件所在目录）：
  - `install-prereqs.ps1` — Node + pnpm 安装（免管理员 zip 方案）
  - `setup.ps1` — DSH 环境一键安装（幂等）
  - `verify.ps1` — 验证脚本（S0–S8）
  - `harness-src/deepseek-harness.tar.gz` — checkout 打包（24MB，含 .git 与构建产物，不含 node_modules）
  - `profile-web/` — package.json、pnpm-workspace.yaml、pnpm-lock.yaml、cordis.yml、cordis.patch.yml
  - `skill-viewer-patch/client.js.patched` — 已打补丁的 client.js 模板
  - `dot-dsh/` — skills（6 目录）、.agent-presets（anchored-standard）、settings.yaml
  - `launch/` — launch-dsh.bat、dsh-wait-ready.ps1、whale.ico

## 4. 执行步骤

### Phase 0 — 现状检测
1. 用 PowerShell 检查：`Get-Command node`、`Get-Command pnpm`、`tar` 可用性。
2. 检测目标机现状：`<HarnessDest>` 是否已有 checkout（有 package.json）；`<DshHome>\profiles\web` 是否存在；磁盘剩余空间 ≥ 5GB。
3. 网络检查：`Invoke-WebRequest https://registry.npmjs.org -UseBasicParsing -TimeoutSec 15` 与 GitHub 可达性。

### Phase 1 — 安装前置工具链（Node + pnpm）
4. 运行：`powershell -NoProfile -ExecutionPolicy Bypass -File .\install-prereqs.ps1`
   - 默认免管理员（下载 Node zip 到 `%LOCALAPPDATA%\Programs\nodejs`，PATH 持久化到用户级）。
   - 若 winget 可用且用户偏好系统级安装，加 `-UseWinget`。
   - 若 `node` 已存在但 `pnpm` 缺失，脚本只补 pnpm。
5. 验证：`node --version`、`pnpm --version`。若新开的 shell 找不到（PATH 未生效），告知用户重开终端，或继续用当前会话（当前会话已注入）。

### Phase 2 — 解压 checkout 与安装 launch 脚本
6. 运行 `setup.ps1`（它负责解压、launch 脚本路径改写、harness 依赖、profile、插件、补丁、用户资产）：
   `powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1`
   - 想换安装位置：`-HarnessDest "E:\tools\deepseek-harness"`（路径勿含中文/空格问题目录）。
   - `pnpm install` 首次需数分钟：**用后台任务运行并等待**，不要超时放弃。
   - setup 是幂等的：失败后修复可重跑，已完成的步骤会跳过。

### Phase 3 — 验证
7. 运行：`powershell -NoProfile -ExecutionPolicy Bypass -File .\verify.ps1`
8. 若存在 FAIL，按第 5 节错误处理定位修复，重跑 verify 直至全部 PASS。

### Phase 4 — 启动冒烟测试
9. 启动服务：双击 `<HarnessDest>\launch-dsh.bat`（等待就绪并自动开浏览器），或 `cd /d "<HarnessDest>"` 后 `pnpm dsh web`（后台）。
10. 探针：HTTP GET `http://127.0.0.1:3080/`，确认 200 + `__DSH_BOOT__`（S7）。
11. 冒烟通过后**保持服务运行**，不要主动关闭；失败按第 5 节处理。

### Phase 5 — 汇报
12. 按第 7 节格式输出完成报告。

## 5. 错误处理

| 症状 | 处理 |
|------|------|
| `node` 下载/解压失败 | 换 `-UseWinget`；或直接提示用户手动安装 Node LTS（https://nodejs.org）后重跑 |
| `pnpm install` 网络失败/超时 | 重试最多 3 次（pnpm 缓存使重试增量）；仍失败检查代理，报告网络问题，不反复空转 |
| 端口 3080 被占用 | `Get-NetTCPConnection -LocalPort 3080` 定位占用进程；是旧 dsh 实例则停旧再启；无关进程则报告用户 |
| skill-viewer 补丁 `node --check` 失败 | 版本不匹配（套件对应 v0.2.4）：在 profile 目录重跑 `pnpm install` 拉回 v0.2.4 再重跑 setup |
| setup 报"目标目录已有内容" | 已有 checkout：核对分支/HEAD（S1）；符合则继续，不符则备份后重装（先向用户确认） |
| 启动报错含插件加载失败 | 核对 `dsh.profile.bundles` 与 node_modules；重跑 setup 的 profile 段 |
| PATH 未持久化 | 用户级 PATH 需重开终端生效；向用户说明（不影响当前会话内启动） |
| 磁盘空间不足 | 清理后重试；报告用户所需空间 |

## 6. 边界与禁忌

- **不要**读取、复制或迁移 `~/.dsh/.credentials.yaml`（API 密钥）。密钥由用户在目标机配置；你在汇报中提醒。
- **不要**删除目标机已有个人数据。覆盖 `settings.yaml` 前 setup 已自动备份（`.bak-时间戳`），勿额外处理。
- **不要**修改套件内源文件（tar.gz、模板、脚本）。需要重跑时基于原文件。
- 遇到文档未覆盖的情况：以保守为准（不删、不覆盖、不执行不可逆操作），报告用户等待指示。
- 需要管理员权限的操作（winget 系统安装）**不是必须的**；默认方案免管理员。若某步骤被 UAC 拦截，改用 zip 方案。

## 7. 完成后汇报格式

```
## 环境安装完成报告
- 状态：成功 / 部分成功（说明原因）
- 工具链：node <x.y.z> / pnpm <x.y.z>
- checkout：<路径>，分支 <x>，HEAD <y>（对照 709ce2c）
- verify.ps1：S0–S8 逐项 PASS/FAIL
- 服务：运行中（PID）/ 未启动（原因）
- 需要用户手动完成：1) 配置 API 密钥 ~/.dsh/.credentials.yaml；2)（如有）其他
- 遗留问题：无 / ...
```

**完成判定**：S0–S8 全部通过 + 服务可访问 = 任务完成。任何一项未达成为未完成，继续修复。

# dsh-env-export · DeepSeek Harness 环境迁移套件

在另一台 Windows 电脑上恢复与源机**一模一样**的 DeepSeek Harness 开发环境（含全部插件与对官方包的修改）。

## 套件内容

| 目录 / 文件 | 说明 |
|---|---|
| `harness-src/deepseek-harness.tar.gz` | 官方 checkout 完整打包（24 MB）：本地分支 `local/file-browser` 的全部修改（文件树相关 18 文件）+ git 历史 + 构建产物。**不含 node_modules**（目标机 `pnpm install` 重建，保证版本与源机 lockfile 一致） |
| `profile-web/` | web profile 配置：`package.json`（bundles 清单）、`pnpm-workspace.yaml`（node-pty 构建许可）、`pnpm-lock.yaml`（精确版本锁定）、`cordis.yml`、`cordis.patch.yml` |
| `skill-viewer-patch/client.js.patched` | dsh-skill-viewer **断线自动重试补丁**的已打补丁文件（v0.2.4，升级/重装会丢，套件用覆盖方式保证恢复） |
| `dot-dsh/` | 用户级技能（6 个）、agent 预设（anchored-standard）、全局设置 `settings.yaml` |
| `launch/` | 启动脚本 `launch-dsh.bat` + `dsh-wait-ready.ps1` + 图标（setup 自动改写脚本里的硬编码路径） |
| `setup.ps1` | 目标机一键安装脚本 |
| `install-prereqs.ps1` | **免管理员安装 Node + pnpm**（全新目标机必备：zip 版 Node 到用户目录 + PATH 持久化） |
| `verify.ps1` | 一致性验证脚本（S0–S8 逐项 PASS/FAIL，AI 依据它判定完成） |
| `TASK.md` | **AI 任务书**：面向通用 AI 执行终端的自主任务指令（含成功标准/执行步骤/错误处理/汇报格式） |
| `export-manifest.json` | 导出清单（来源机 / 版本 / 时间戳，用于追溯） |

## 目标机安装步骤（约 5–15 分钟，大部分是依赖下载）

### 前置（一次性）

1. 安装 **Node.js ≥ 20**：https://nodejs.org（LTS 即可，装完重开终端）
2. 安装 **pnpm 11**：`npm install -g pnpm@11`
3. 确保可访问 npm 与 GitHub（插件 skill-viewer 从 GitHub release 下载；网络慢可挂代理）

### 安装

4. 把整个 `dsh-env-export` 文件夹拷到目标机（U 盘 / 网盘 / 微信均可）
5. 打开 PowerShell，进入套件目录，执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

6. 等待脚本完成（harness 依赖安装时终端会滚动大量输出，属正常）

### 启动

7. 配置 API 密钥：`C:\Users\<你>\.dsh\.credentials.yaml` 需重新填写（**密钥不随套件迁移**）
8. 双击 `D:\OtherAPPS\deepseek-harness\launch-dsh.bat`（或 `cd /d D:\OtherAPPS\deepseek-harness` 后 `pnpm dsh web`）
9. 浏览器自动打开 http://127.0.0.1:3080

## 自定义路径

默认安装位置与源机相同（`D:\OtherAPPS\deepseek-harness`、`%USERPROFILE%\.dsh`）。想换位置：

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1 -HarnessDest "E:\tools\deepseek-harness"
```

## 常用参数

| 参数 | 作用 |
|---|---|
| `-HarnessDest <path>` | harness 安装目录 |
| `-DshHome <path>` | `~/.dsh` 目录 |
| `-SkipHarness` | 已装过 harness，跳过解压与依赖安装 |
| `-SkipProfile` | 跳过 profile 配置与插件安装 |
| `-SkipDotDsh` | 跳过技能 / 预设 / 设置复制 |
| `-DryRun` | 只预览操作，不写文件 |

## 不迁移的内容（有意排除）

- **API 密钥**（`~/.dsh/.credentials.yaml`）——敏感信息，目标机重新配置
- **会话历史**（`~/.dsh/sessions/`、`storages/`）——个人数据
- **node_modules**——依赖由 `pnpm install` 按 lockfile 精确重建（pnpm 11）

## AI 自主执行模式（目标机无需人工操作）

套件内置 `TASK.md`——给**通用 AI 执行终端**（Claude Code / Cursor agent 等能执行 shell 的 agent）的自主任务书。目标机可以是**全新机器**（连 Node 都没有）。

流程：
1. 把 `dsh-env-export` 文件夹拷到目标机（U 盘 / 网盘）
2. 让目标机的 AI 终端读取 `TASK.md` 并执行——它会自主完成：
   - 检测现状 → 装 Node + pnpm（`install-prereqs.ps1`，免管理员）→ 解压 checkout → 装依赖 → 建 profile → 装插件 → 打补丁 → 复制用户资产 → 启动冒烟 → `verify.ps1` 验证（S0–S8）
3. AI 按任务书格式输出完成报告；**唯一需要用户参与的事**：配置 API 密钥（`~/.dsh/.credentials.yaml`，密钥不随套件迁移，AI 会提醒）

> 设计原则：任务书自包含所有事实（版本/commit/路径/命令），不依赖源机上下文；执行者按成功标准 S0–S8 逐项验证，全部 PASS 才算完成；遇到文档未覆盖的情况保守处理并向用户报告。

## 常见问题

**Q：`pnpm install` 报网络错误？**
A：官方依赖走 npm registry，插件 skill-viewer 走 GitHub。慢/失败时重跑 `setup.ps1 -SkipHarness`（已装的跳过），或先挂代理再跑。

**Q：启动后右侧栏/技能面板缺失？**
A：确认 `C:\Users\<你>\.dsh\profiles\web\package.json` 的 `dsh.profile.bundles` 含 `dsh-better-sidebar` 与 `dsh-skill-viewer`；skill-viewer 补丁可通过 `node --check` 验证（setup 已做）。

**Q：以后源机环境又改了，怎么同步？**
A：重新执行导出流程（重新打包 tar.gz + 更新 profile-web/dot-dsh 等），覆盖套件后目标机重跑 `setup.ps1 -SkipHarness`（只更新 profile/插件/补丁部分）。若需要增量，可另建 git 远程推送 `local/file-browser` 分支。

## 导出侧备忘（维护者）

重新导出命令（源机执行）：

```powershell
# 1. 重新打包 checkout（排除 node_modules）
tar -czf dsh-env-export\harness-src\deepseek-harness.tar.gz -C D:\OtherAPPS deepseek-harness --exclude='deepseek-harness/node_modules'

# 2. 刷新 profile / dot-dsh / launch / skill-viewer 补丁文件（复制覆盖）
# 3. 更新 export-manifest.json 的 commit/时间戳
```

导出后建议做一次完整校验：`setup.ps1 -DryRun` + 对照 `export-manifest.json` 检查文件齐全。

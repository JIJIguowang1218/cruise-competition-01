# 双机同步指南（Sync Guide）

> 面向非技术背景的项目负责人。本项目用 **git + GitHub 私有仓库** 做跨电脑同步。
> 核心概念一句话：git 把项目的每个版本做成"快照"，GitHub 是放在云端的快照库；
> 每台电脑从云端取快照（拉取）或上传新快照（推送）。

- GitHub 仓库：`https://github.com/JIJIguowang1218/cruise-competition-01`（**私有**）
- 机器 A（已配置完成）：当前电脑
- 机器 B（待配置）：另一台电脑

## 〇、先搞懂三件事（必读）

1. **项目文件从哪来？** 另一台电脑**从 GitHub 下载（clone）**，不要用 U 盘拷贝——clone 一条命令同时拿到全部文件并自动建立与云端的同步关系；U 盘拷贝容易丢隐藏文件夹、还停留在旧版本，只在这台电脑完全连不上网时才用。
2. **git 只认文件夹，不认对话。** 在任何 DSH 会话里，只要命令是在 `cruise-competition-01` 文件夹内执行的，就作用于这个项目。但**新开对话不会自动同步**：每次开工先 `git pull`，收工前 `git push`，与是不是同一个对话无关。建议给每个项目各建一个会话（会话工作目录 = 项目目录）。
3. **同步范围不用记，git 自动判断。** `git status` 自动对比"文件夹现状"与"上次快照"列出所有改动；`.gitignore` 列出永不同步的内容（缓存、密码、`.env`）；项目文件夹之外的东西（会话记录、用户级技能、凭据）各机器各自保留，永不进 git。

## 一、机器 B 一次性配置（只在另一台电脑上做一次）

> 💡 **不想自己动手？** 可以完全交给另一台电脑上的任一 AI（Claude Code / Codex / Cursor 等）代办：
> 把 [`docs/machine-b-setup-prompt.md`](machine-b-setup-prompt.md) 里的提示词整段粘贴给它即可。
> 若由其他 AI 代办，务必要求它：**不要往仓库里新增它自己的配置文件**（如 CLAUDE.md、.hermes 等），
> 不要改动仓库 remote 地址与任何项目文件。

0. 装好 **Git for Windows** 与 **DeepSeek Harness**（DSH），并已启动过 DSH；
1. 生成并登记密钥（让 GitHub 认识机器 B）：
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.ssh"
   ssh-keygen -t ed25519 -C "你的邮箱@qq.com" -f "$env:USERPROFILE\.ssh\id_ed25519" -N '""'
   Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
   ```
   把输出的整行复制到 GitHub → `https://github.com/settings/keys` → New SSH key → 粘贴 → Add；
2. 配置 git 身份（与机器 A 保持一致）：
   ```powershell
   git config --global user.name "JIJIguowang1218"
   git config --global user.email "2478109311@qq.com"
   ```
3. 克隆项目：
   ```powershell
   # 先建一个总项目文件夹（推荐 D 盘，路径随意，不需要和机器 A 一致）
   mkdir D:\Projects
   cd D:\Projects
   git clone git@github.com:JIJIguowang1218/cruise-competition-01.git
   # 结果：出现 D:\Projects\cruise-competition-01 —— 这个文件夹就是 DSH 的工作区
   ```
   > **关于"工作区"的说明**：DSH 的工作区就是一个普通文件夹，新建会话时用目录选择器选中 `cruise-competition-01` 即可，**无需预先创建任何空文件夹**（clone 自己会生成这个文件夹，且与云端结构 1:1 一致）；DSH 选定工作区只是"指向"它，不会改写、移动或重排里面任何文件。
4. 拷贝两个"用户级"文件夹（git 不会同步它们）：
   - `C:\Users\<用户名>\.dsh\skills` → 机器 B 同路径
   - `C:\Users\<用户名>\.dsh\.agent-presets\anchored-standard` → 机器 B 同路径
   （用 U 盘或网盘拷整个文件夹即可）
5. 打开 DSH → 新建会话 → 目录选择器选中克隆出来的 `cruise-competition-01` 文件夹 → 开工。

## 二、日常循环（两台电脑通用）

| 时机 | 动作 |
|---|---|
| 每次开工前 | `git pull`（把对方的进度拉下来） |
| 工作中 | 让 DSH 里的 agent 干活，**agent 负责提交**；你也可以随时自己 `git add -A` + `git commit` |
| 每次收工前 | `git push`（把今天的进度传上云端）**必须推完才能换电脑** |

**三条铁律**：
1. 同一时间段**只在一台电脑上**改项目；
2. 收工不 push，另一台就看不到任何进度；
3. pull/push 报错、出现"冲突(conflict)"字样——**不要自己乱删文件**，在 DSH 里让 agent 处理。

## 三、什么同步、什么不同步

| 走 git 自动同步 | 机器各自保留，不冲突 |
|---|---|
| 全部项目文件（research/design/docs/prototypes/tools…） | DSH 会话记录（`~/.dsh/sessions`，两台的对话历史各是各的，正常） |
| `.dsh/skills/` 项目级技能（已入库） | 用户级技能（机器 B 按上文第 4 步拷贝一次即可） |
| `.gitignore`、`AGENTS.md` 协作约定 | DSH 设置、登录凭据（**永不进 git**） |

## 四、常见情况怎么处理

- **push 报网络错误**：多半是网络波动，等几分钟重试 `git push` 即可；连试多次失败就在 DSH 里让 agent 处理；
- **两台电脑同时改了同一个文件**：先 `git pull`，若提示冲突，让 DSH 里的 agent 合并，不要手动删改；
- **比赛结束后公开作品**：GitHub 仓库 Settings → Danger Zone → Change visibility → Public（公开前让 agent 再扫一遍有没有个人信息）。

## 五、附：本机常用命令速查

```powershell
git status          # 看当前有哪些改动
git pull            # 取云端进度
git add -A          # 暂存全部改动
git commit -m "说明" # 生成快照
git push            # 上传云端
```

# 双机同步指南（Sync Guide）

> 面向非技术背景的项目负责人。本项目用 **git + GitHub 私有仓库** 做跨电脑同步。
> 核心概念一句话：git 把项目的每个版本做成"快照"，GitHub 是放在云端的快照库；
> 每台电脑从云端取快照（拉取）或上传新快照（推送）。

- GitHub 仓库：`https://github.com/JIJIguowang1218/cruise-competition-01`（**私有**）
- 机器 A（已配置完成）：当前电脑
- 机器 B（待配置）：另一台电脑

## 一、机器 B 一次性配置（只在另一台电脑上做一次）

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
   cd C:\Users\<用户名>\Desktop\HermesWorkspace   # 或你想要的任何位置
   git clone git@github.com:JIJIguowang1218/cruise-competition-01.git
   ```
4. 拷贝两个"用户级"文件夹（git 不会同步它们）：
   - `C:\Users\<用户名>\.dsh\skills` → 机器 B 同路径
   - `C:\Users\<用户名>\.dsh\.agent-presets\anchored-standard` → 机器 B 同路径
   （用 U 盘或网盘拷整个文件夹即可）
5. 在 DSH 里把工作区指向克隆下来的 `cruise-competition-01` 目录，新建会话开工。

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

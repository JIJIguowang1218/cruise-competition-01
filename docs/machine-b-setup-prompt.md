# 给另一台电脑上的 AI 的交接提示词（Machine B Setup Handoff）

> 用法：在新电脑上安装好任一 AI 编码助手（Claude Code / Codex / Cursor 等）后，
> 把下面分隔线内的文字**完整粘贴**给它即可。它完成后，用 DeepSeek Harness 打开
> `cruise-competition-01` 文件夹开始正式工作。

---

请帮我在这台 Windows 电脑上完成一个项目的环境准备。我是非技术背景用户，请用中文、一步步指导我，能你代劳的步骤尽量代劳；任何需要我在浏览器里操作的地方，给出精确的点击路径并等我确认。

目标：把项目 `cruise-competition-01`（GitHub 私有仓库）配置成本机的 git 仓库，并让 DeepSeek Harness（DSH）稍后能直接打开它作为工作区。

请按顺序完成：

1. **检查并安装 Git**（git --version，没有就用官方安装包装 Git for Windows）；
2. **生成 SSH 密钥**：
   - 执行 `ssh-keygen -t ed25519 -C "2478109311@qq.com" -f "$env:USERPROFILE\.ssh\id_ed25519" -N '""'`（若已存在 id_ed25519 就跳过）；
   - 打印公钥 `Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"`；
   - 指导我到浏览器打开 `https://github.com/settings/keys`，点 New SSH key，Title 填「第二台电脑」，粘贴公钥，Add SSH key；
3. **配置 git 身份**（两条命令，user.name = JIJIguowang1218，user.email = 2478109311@qq.com）；
4. **克隆项目**：创建 `D:\Projects`，在其中执行
   `git clone git@github.com:JIJIguowang1218/cruise-competition-01.git`
   并验证 `git status`、`git log --oneline` 正常；
5. **恢复用户级配置**：我会给你一个 zip 文件（本机自带的叫「DSH用户配置-拷到新电脑.zip」），请解压，使最终结构为：
   - `C:\Users\<用户名>\.dsh\skills\`（6 个技能文件夹）
   - `C:\Users\<用户名>\.dsh\.agent-presets\anchored-standard\`（8 个文件）
6. **安装 DeepSeek Harness**（按官方 README，或已安装则跳过），最后告诉我：如何启动 DSH，以及在 DSH 里新建会话时如何选中 `D:\Projects\cruise-competition-01` 作为工作区。

约束（重要）：
- 不要向我要 GitHub 账号密码，全程只用 SSH 公钥；
- 不要修改仓库内的任何项目文件，不要往仓库里新增你的专属配置文件（如 CLAUDE.md、.hermes、.claude 等）——这个项目由 DeepSeek Harness 维护；
- 如克隆或推送遇网络问题，重试即可，不要改仓库的 remote 地址。

---

（以上为交接提示词全文，机器 B 上的 AI 阅读 `docs/sync-guide.md` 可了解更多背景。）

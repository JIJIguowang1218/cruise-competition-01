# 续接文件 / Continuation（新对话启动手册）

> 本文件是新对话的第一入口。新对话开始后，按以下顺序执行：
> 1. 读本文件；
> 2. 主动提醒用户审核“最近待审核文件”；
> 3. 复述当前工作状态与最近讨论结论；
> 4. 按用户指示继续推进，不要擅自跳到旧任务。
>
> 🚨 **Push 规则（2026-08-29 生效）**：未经用户直接明确指示，不得自动 `git push` 到 GitHub；只有用户说“push / 推到 GitHub / 执行 git push”时才执行。

---

## 🚨 当前主线（2026-09-18 · 第二轮：原型族 12 页全面重构＋v3 深色体系＋4K 渲染图）

用户裁决（当日第二轮）：以用户提供的 **A3 浅色高保真参考图**为风格基准，将原型族全部重做；**页面文本/数据逐字保留，仅视觉规范化**；并移除一切演示元话语（档位标注/MOCK/模拟/解释性语句），"严格模拟真实情况下有的内容"。另指定 p1-captain-hifi 冻结帧为正式"工作区"。

### 本轮已完成（全部未 commit）

**A 族七页（桌面 1920×1080，v3 深色体系，两轮字号放大，去标注，新导航）**
- `a1-xcard.html` / `a2-email.html` / `a3-calc.html`：按外部 AI 成品稿**重写**（文本数据逐字保留，视觉全面规范化：去彩底/去辉光/去标注/左色条凸显/卡片去边框改投影）
- `a3-observe.html`：旧版**补齐**同款放大与 v3 适配（此前遗漏页），导航名改"预警观察"
- `a3-plan.html`、`a4-l3.html`、`a5-dispatch.html`：**新建**（同法）

**B 族四页（平板/手机/机台，用户指定比例）**
- `b1-inform.html`（1280×720）、`b2-decision.html`（1280×720）、`b3-task.html`（390×844）、`b4-lock.html`（机台嵌入视图）：**新建**

**p1-workspace.html（工作区）**：p1-captain-hifi 冻结帧静态化（12:33 L4 执行段·端口·审计帧，数据写死、零脚本依赖），加 A 族侧栏与顶栏；**指定为导航"工作区"**；原 a3-observe 导航名改"预警观察"

**全局改造**
- `clarsyn-tokens.css` → **v3**：深色体系对齐 wireframes/p1-captain-hifi（bg 四层 #0b0e13/#10141b/#171c26/#1f2633；文字 #e6ebf2/#97a1b0/#767f8d；语义 绿#51b873/红#e5484d；卡片**去边框线**改底色分层＋--shadow-card 投影）
- **去标注 sweep**：全部页面的【演示设定】【假设·C6】【案例区间】【参考值】【事实】档位 chip、(MOCK)/(REAL)、"推定中"、假设斜纹、解释性语句（治理约束/名单折叠保护/低侵入设计原则/模型边界卡/无 AI 臆测语/系统生成说明 tag/非模型推测等）全清；"模拟流"→"缓存"；三态图例归一"实时/缓存/离线"
- **"血缘"→ 关联溯源/关联事件/升级链路**（a3-calc/a3-observe/p1 共 3 处）
- **导航统一**：工作区置顶 → 态势台 → 收件箱 → 预警观察 → 审批 → 触达(a5-dispatch) → 轨迹；八页顺序 grep 验证一致；"触达"统一指向 a5-dispatch（a5-wait 未做）
- **A 族两轮字号放大**（侧栏 88px/顶栏 96px/底栏 52px，正文下限 12.5px，对齐 a3-document 文档页字号体系）
- **左色条凸显语言推广**（inset 3px 状态条：a1 挂起/a2 激活邮件/a3-calc 瓶颈三卡/a5 拦截/b2 命中判据）

**渲染图（31 张 → portfolio/assets/renders/，含 README 索引）**
- 12 张整页 2× 高清（A 族与 p1 为 3840×2160 4K；B1/B2/B4 2560×1440；B3 780×1688）＋19 张卡片裁切
- README 含"截图 → 作品集页面"分配表（P3–P16 已分配，每图只属一页；P1/P2/P7/P18/P19/P20 为图示页不嵌图）
- 修复：p1 4K 下内容上冲 540px（壳缺 html/body 100% 高度，已补）；a3-calc 推理字幕位移与面板挤压（imarq 静态复位＋infer min-height 240px）

### 下一步

1. 用户验收 12 页现状；**内容稿缺口**：a3-basis/a3-monitor、a5-wait、a6 系列等未做页需先出内容稿；
2. renders/README 的"截图→作品集页"分配表经用户确认后，可作为作品集嵌图施工依据；
3. `planning/tmp-report-page3-sandbox.svg` 未按新风格重绘（用户本轮只要求 page1/page2）；
4. 全部改动未 commit，等用户指示。

---

## 🚨 上一主线（2026-09-18 上午 · 墨黑卡面定稿＋首批三页；当日第二轮已全面重构取代，本节仅作历史记录）

用户裁决：**忽略首版 A1 样板屏，按新定稿视觉重做**。暗色方向、强调阶梯、面板语言、图标规范全部定稿（design.md v0.6 §12.6）；遗留项（双语/福冈/数据粒度/IA Q1–Q5）全部拍板关闭。

### 已定稿并落文件（2026-09-18）

- **暗色"墨黑卡面"**：画布 #0A0B0E／卡面 #121317 浮起分层／文字三级亮度；白 pill 主按钮每屏至多一颗；蓝只做链接与窗口带；语义色仅状态元素。轻微玻璃授权：仅浮层（X 卡/抽屉/弹层/B4 嵌入框）。
- **六级强调阶梯**：位置尺寸 → 亮度字重 → 白 pill → 边框强度 → 蓝 → 语义色；禁"想突出就上色"。
- **面板划分**：栏间 1px 发丝线＋20px 栏距；卡片头三件套＋等宽模块序号；图标 1.5px 线性 SVG sprite（词汇 ≤25）。
- **16:9 锁定**：全部横板界面 1920×1080 / 1280×720；手机竖屏 390×844 例外（B1/B2 已于 v0.5 统一 16:9）。
- **上屏新纪律（design.md §1.6）**：文案短句动宾、去 AI 腔；界面禁 MOCK/REAL/"模拟"/"演示设定"字样（数据属性只在 design-snapshot-data.md 标注）；三态话术＝实时/缓存/离线；【假设】斜纹保留（承载 C3 深链卖点）。
- **遗留项拍板**：双语方案采纳（中文主界面＋英文标识符＋多语触点按数据包 §1.10）；福冈挂靠港采用；90 团/130 子事件不全量造满、样例行加缓冲（12→18、7→12，**待扩充**）；IA Q1–Q5 按既定倾向关闭。

### 已改文件

- `portfolio/planning/design.md` → **v0.6**（新增 §1.6、§12.6；§1.2/§1.3/§7.4 去 MOCK、三态话术改实时/缓存/离线）
- `portfolio/planning/design-snapshot-data.md` → **v0.3**（施工规则同步、§4.4 拍板关闭、界面主语言拍板、§1.12 推断补全、A1-2/A3-0 条目增订）
- `portfolio/prototypes/clarsyn-tokens.css` → **v2**（墨黑卡面全套令牌＋.glass 轻玻璃＋.btn-pri 白 pill）
- `portfolio/prototypes/a1-xcard.html` → **按新视觉重做并经四轮密度/排版迭代，2026-09-18 用户定稿确认**
- `portfolio/prototypes/a3-observe.html` → **完成并经四轮迭代定稿**（观察态：事件头 X-260917-01＋状态机步骤条、琥珀立案锁横幅、四维评估 2×2＝64/41/58/61＋全构成项、备选情景条＋决定权 chip、右栏输入信号三因子等高填满/增量刷新/观察操作；解释性文案已全清；排版纪律：拉伸容器内子卡等高填满、禁止 space-evenly 散排）
- `portfolio/prototypes/a2-email.html` → **新建完成**（A2 第一屏：左信息流 2 条＋电话补录空态、中英文邮件原文逐字照抄＋①–⑦出处高亮、右槽位抽取 7 项信度框＋处置动作条＋来源历史、差异对照 −4h 双条），**待用户验收**
- `portfolio/prototypes/a3-calc.html` → **初版完成，用户标记仍需修改（2026-09-18，修改点待用户具体指出后再动手）**（A3 核算页签，长链路推理第一屏：事件头 E09-0001＋四页签导航、窗口对照双条＋8.5h 阈值＋确定性结论句、输入区三态四行、容量计算五行＋算式示例、R1 初版九批表（B03/B04 冲突标记）、岸游逐行 10 样例＋四计数、特殊协助/判定规则/模型边界卡、推理附件抽屉收起态）

### 下一步

1. **用户验收 a2-email**（壳 1 第 3 屏）→ 其后按 design.md §11 顺序推进 a2-merged/a2-phone → A4/A5/A6 → 壳 2/3/4 → 壳 5/6，一屏一快照，数字只取数据包；
2. 岸游样例行 12→18、子事件 7→12 缓冲行扩充（数据包 §1.6/§1.11）；
3. 其后按 design.md §11 快照清单推进 A2/A4/A5/A6 → 壳 2/3/4 → 壳 5/6，一屏一快照，数字只取数据包。

---

## 📄 原型页面索引（2026-09-18 第二轮更新——新对话先读此表再动工）

> 全部在 `portfolio/prototypes/`；样式唯一控制点 `clarsyn-tokens.css`（**v3**）；数字/文案唯一来源 `portfolio/planning/design-snapshot-data.md`（v0.3）＋布局规则 `portfolio/planning/design.md`（v0.7 §12.7）。渲染图在 `portfolio/assets/renders/`（31 张，分配表见其 README）。

| 文件 | 对应快照 | 状态 |
|---|---|---|
| `clarsyn-tokens.css` | 全站令牌 | **v3**（p1 深色体系对齐） |
| `p1-workspace.html` | 工作区（船长指挥视图 12:33 冻结帧） | ✅ 静态定稿（导航"工作区"指向此页） |
| `a1-xcard.html` | A1-2 值班态势台 20:40 | ✅ 第二轮重写＋去标注＋4K 渲染 |
| `a2-email.html` | A2-1 邮件 21:05 | ✅ 第二轮重写＋去标注＋4K 渲染 |
| `a3-observe.html` | A3-0 观察态 20:42（导航名"预警观察"） | ✅ 补齐放大＋v3＋去标注＋渲染 |
| `a3-calc.html` | A3-1 核算 21:06 | ✅ 外部稿重写＋去标注＋4K 渲染 |
| `a3-plan.html` | A3-2 方案 21:09 | ✅ 新建（外部稿＋导航更新） |
| `a4-l3.html` | A4-1 审批 L3 21:38 | ✅ 新建（外部稿＋导航更新＋4K 渲染） |
| `a5-dispatch.html` | A5-2 派包 02:15 | ✅ 新建（外部稿；导航"触达"统一指向此页） |
| `b1-inform.html` | B1-2 船长知会 21:42 | ✅ 新建（1280×720） |
| `b2-decision.html` | B2-1 L4 决策 02:10 | ✅ 新建（1280×720） |
| `b3-task.html` | B3-1 任务包 11:00 | ✅ 新建（390×844） |
| `b4-lock.html` | B4-1 广播锁 07:45 | ✅ 新建（机台视图） |
| `renders/` 31 张 PNG＋README | 作品集截图素材 | ✅ 分配表见 renders/README |
| a2-merged / a2-phone | A2-3 / A2-2 | 未做 |
| a3-basis / a3-monitor | A3-3 / A3-4 | 未做 |
| a4-captain-inform / a4-timeout / a4-revision | A4 其余三态 | 未做 |
| a5-wait / a5-relay / a5-gamma | A5 其余三态 | 未做 |
| a6-daily / a6-night / a6-lineage | A6 三态 | 未做 |
| b1-day | B1-1 | 未做 |
| b2-postsign | B2-2 | 未做 |
| b3-blocked / b3-relay | B3-2 / B3-3 | 未做 |
| b4-done | B4-2 | 未做 |
| p 系×5 / c 系×5 | 壳 5/6 | 未做 |
| index.html | 演示入口矩阵 | 未做 |

**施工纪律（每页必守）**：拉伸容器内子卡等高填满或贴合内容、禁止 space-evenly 散排；界面禁解释性文案与 MOCK/模拟字样；事件号不折行；每屏完成后浏览器截图＋量化溢出检查（元素底边 vs 主区底边）。

**Figma SVG 版**：应用户要求，将页面转为 1920×1080 扁平 SVG（零编组、活文字、英文 id）供 Figma 调整。**转换方法（2026-09-18 定稿）**：GitHub 无成熟通用"渲染 HTML→可编辑 SVG"方案（Satori 14k★ 不支持 CSS Grid 且文字转路径；html.to.design 为 Figma 插件需装扩展）——采用**自建 DOM 遍历转换器**：在浏览器里对渲染后页面逐元素量取 getBoundingClientRect＋计算样式（背景/圆角/边框/虚线/字体/颜色/逐行文本基线），内嵌小 SVG 先烘焙计算样式再序列化，伪元素（::after 标签、刻度线、选中圆点）按锚点手工补写。坐标来自真实布局，零偏差。样例 `figma/a1-xcard.svg`（67KB）；其余页面按需一键重生成。

---

## 🚨 上一主线（2026-09-17：三文件定稿与首版 A1，已被 09-18 重做取代）

当前工作重心：**ClarSyn 邮轮港岸协同项目的"全静态高保真原型"——三份规划/数据文档已定稿，第一张暗色样板屏已做，下一步按壳 1（A1→A3）逐屏施工。**

### 🔥 新对话第一件事：进度复述与前端开工三文件提醒

1. **主动向用户复述当前进度**（见下"已完成/待办"），不要直接跳到施工。
2. **如用户要做前端/继续做原型，提醒：开工必须上传/提供这三个文件给前端 AI（连同本项目原型目录）**，路径均在 `portfolio/planning/`：
   - `design.md`（v0.5）——逐页区块/功能/快照/机制映射；§12 主题与**视觉克制规则**（v0.4 新增：中性灰阶为体、单一蓝强调、语义色仅状态、禁渐变辉光彩色块、字体两族三字重）
   - `design-snapshot-data.md`（v0.1）——**50 个快照的全部上屏字面内容与实体主数据**（数字/文案照抄，缺内容必须回来增订，禁止 AI 自行补数）
   - `static-interface-ia-v1.md`（v0.6）——页面清单、§10 空间模型/证据基线（甲板层/舱号编码/船员双轴）
   - 另：深色原型必须同时引用样式令牌 `portfolio/prototypes/clarsyn-tokens.css`（唯一样式控制点，色值只准改这一个文件）。
   - 不需要给 mechanism-registry.md（后端逻辑，前端不消费）。
3. 施工顺序（用户已认可分批）：**先 A1＋A3 两屏定型 → 验收 → A2/A4/A5/A6 → 壳 2/3/4 → 壳 5/6**；一次只做一个快照。

### 已完成（2026-09-17）

- R7/R8 两轮证据研究闭环并归档（`research/round3/`：r7 船型/甲板/舱号/1533 速度、r8 船员编号分组双轴；原文 S15/S16；挂账见 PENDING-FULLTEXT.md）。
- IA 文档升到 **v0.6**（§10.1–10.5 船型/空间/舱号/参数/船员基线；六壳 20 屏）。
- 新建 **`portfolio/planning/design.md` v0.5**：六壳 20 屏（A1–A6/B1–B4/P-1–P-5/C1–C5）逐页交互说明、五档证据标注（事实/参考值/案例区间/演示设定/假设）＋数据三态 ●◐○、§11 快照出图清单、§12 主题与视觉纪律。
- 新建 **`portfolio/planning/design-snapshot-data.md` v0.1**：实体主数据（星澜号虚构 Vista 同型、福冈挂靠日、事件号/trace/角色/B01–B08 批次/90 团分布+12 样例行/9 名船员双轴/4 名旅客样例/A·B·C 方案全部区间数/渠道多语表）＋50 快照逐屏内容＋船代英文邮件/P-2 中英通知/PA 中英广播全文＋静态热区主链路。
- 新建 **`portfolio/prototypes/clarsyn-tokens.css`**：深色主题唯一样式令牌（沿用旧高保真冷调炭黑 #0B0E13 系；含 day 主题档；状态标签/三态点/假设斜纹公共类）。
- 完成第一张样板 **`portfolio/prototypes/a1-xcard.html`**（A1 值班态势台 20:40 X 卡，1920×1080 暗色，已按用户"色彩太多/B 端花里胡哨"反馈重做克制版）。

### ⏳ 待用户拍板（卡住部分施工，但不卡 A3）

1. **A1 样板暗色方向确认**：用户尚未明确验收（浓度/密度/字号层级）；确认后做 A3 观察态（a3-observe）。
2. **双语方案**（design-snapshot-data §1.10 暂按建议施工）：中文主界面＋英文固定标识符（trace/L级/STCW 等不译）＋船代邮件英文原文＋P-2/PA/P-5 中英全文（不列语种数）。待用户拍板。
3. **福冈挂靠港设定**是否采用（影响移民检查称谓、邮件语言；数值结构不变）。
4. 数据包粒度：90 团/130 子事件目前是总数＋样例行，是否需要全部造满（§4.4）。
5. IA 开放问题 Q1–Q5（A2 抽屉形态、A4 审批单位置、C 组完成度、边缘终端样例深度）——Q2/Q3 已按倾向落入文档。

### 下一步施工

- 立即项：`a3-observe.html`（A3 观察态 20:42 四维评估，暗色，引用令牌），与 A1 组成壳 1 定型样板。
- 之后按 §11/§4.2 快照清单与热区链路推进；每屏数字文案只准取自 design-snapshot-data.md。

### 纪律提醒（每次都适用）

- 未经明确指示不 `git push`；`recordings/` 永不提交；原型产出写 `portfolio/prototypes/`，规划写 `portfolio/planning/`。
- 静态屏不做视频；2D 监控语汇，禁 3D/摄像头画面/真人动画；每屏事实性数字必须可溯源（五档），无来源一律假设样式或回数据包增订。
- 面向展示不出现模型/框架名；±100 分钟航路误差与 0.25% 近港误差永不同屏；疏散认证域数字不挪用运营；不写赔偿金额。
- 用户浏览器取证批次 A1–A10（EU1177、3 份船票合同、甲板平面图、船员组织页等）仍待办。

---

## 🚨 上一主线（2026-09-15）

V 幕技术选型——调研与选型文件 v0.8 已完成；三页汇报 SVG 已交付（第 2 页已按"技术架构而非业务架构"重画），等用户汇报反馈后落 V-1/V-2 作品集页。

- 三页资产（`portfolio/planning/`，1600×900、黑白、零编组、可拖 Figma 导出 2x PNG）：`tmp-report-page1-tech-selection.svg`、`tmp-report-page2-agent-architecture.svg`（技术架构分层图）、`tmp-report-page3-sandbox.svg`；文字稿 `tmp-report-tech-3pages.md`（第 2 页口述稿仍是旧业务工位版，用前需同步）
- `design/b-port-shore-and-itinerary/ai-architecture-and-value.md` v0.8；`portfolio/research/agent-tech-selection-research-2026-09.md`；9:16 展板 `poster-9x16-layout-plan.md`/`poster-9x16-template.svg`
- 在途：三页 SVG 反馈、多 Agent 措辞、7 项 PM 决策、V-1/V-2 页数；EVENT-ROSTER/mock-data.js 同步 v0.6、P9-1 泳道图重绘仍挂账
- 这些文件未 commit，按 push 规则等指示

---

## 🚨 更早主线（2026-09-12）

第 III 幕已全部完成（含 III-9 AI 治理总览作品集页），竞赛限页版后续规划已出：

- 🔥 `portfolio/planning/competition-compressed-page-plan.md`（竞赛压缩版页面规划 v1.0，2026-09-12，尚未审核）
- 压缩方案要点（III-9 之后 11 页 → 6–7 页）：
  - **IV 系统组织 = 1 页**：单中枢 hub-spoke，"不替换、不新增、不越级"，不列举模块（原 IV-1/2/3 合并）；
  - **V 技术实现 = 4 页 + 1 可选页**（Agent 架构页数不限）：V-1 工程全景与选型 / V-2 Agent 编排与控制（主章）/ V-3 库外发现×幻觉兜底 / V-4 硬件部署 T0–T3 / V-5（可选）实时闭环时序预算；
  - **VI 证明与落地 = 1 页**：五级验证阶梯（离线样例→仿真→高保真原型→单船单港试点→全船队）+ 诚实量化卡 + 前三风险 + 三句差异化；
- 审核通过后的执行顺序：IV 单页内容稿 →（建议先补）导览+II-2 合成地图页 → V-1…V-4 → VI 单页；每页先写绘图工作稿、用户审口径后再开画；
- 上一阶段：正文主档 `ai-pm-portfolio-page-content.md` 已到 **v1.3**，第 III 幕 12 页机制拆解与绘图参考全部就位，III-9 作品集页已完成。

- 所有新文件统一写到 `portfolio/`，不要写入 `design/`
- 后续工作参考 `research/ai-pm-tutorials/REPORT.md`（GitHub AI PM 教程调研）
- 正在一页页讨论并填充 `portfolio/planning/ai-pm-portfolio-page-content.md`
- 旧目录 `design/` 仍是历史资料，可阅读，但不作为当前产出目标
- **P9-1 场景边界已重新讨论：ClarSyn 不做航变预警/航变决定，只做航变后的登离船与人员调度影响链**
- ✅ **P9-1 L4 判据已拍板（2026-09-04）：L4 = "船长决策区"**——判据是决策权归属（安全不可逆/群体必达/法定对外/不可逆高后果），常规下船/接驳调度走 **L2/L3 + 船长知会/抄送（不阻塞）**；超时双路径（常规默认执行+审计 / 涉风险升级 L4）。已落到 `event-governance-framework.md` §4.2.4，并**按优先级修改了 20+ 个文件**（见下方"本次会话改动记录"）
- ✅ **第 III 幕拆解已补全（2026-09-07）**：III-1/2/3（v1.0，对应 C0/C1/C2）+ III-4a–III-9（v1.1，对应 C3/C4/C5/G1/G2+G3/全谱）每页新增"机制拆解与绘图参考"六段模板：机制定位 → 组成部件表（子机制编号对照）→ 环节流程拆解 → 图上信息层级 → 绘图要素清单 → AI PM 术语中英对照；v0.9 页面初稿原文未动，拆解块标注为绘图工作稿

---

## 🗂 本次会话改动记录（2026-09-18 · 第二轮：原型族全面重构＋v3 深色体系＋渲染图）

> 背景：用户提供 A3 浅色高保真参考图与多份外部 AI 产出稿，要求"文本数据逐字保留、视觉按规范重做、去演示元话语、严格模拟真实内容"；随后指定 p1-captain-hifi 冻结帧为正式"工作区"并要求全页 4K 渲染图。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `portfolio/prototypes/clarsyn-tokens.css`（→ **v3**） | 深色体系对齐 wireframes/p1-captain-hifi：bg 四层 #0b0e13/#10141b/#171c26/#1f2633、文字 #e6ebf2/#97a1b0/#767f8d、语义 绿#51b873/红#e5484d；卡片语言改"去边框线＋底色分层＋--shadow-card 投影" |
| 2 | `portfolio/prototypes/a1-xcard.html`（**重写**） | 外部稿内容逐字保留；v3 视觉＋X 卡玻璃；两轮字号放大（侧栏 88/顶栏 96/底栏 52）；去标注 13 处（含 MOCK/REAL、斜纹、档位 chip）；挂起行左色条；导航更新 |
| 3 | `portfolio/prototypes/a2-email.html`（**重写**） | 外部稿三栏收件箱；激活邮件蓝左条；去标注（信源注记截断至数据）；导航更新＋4K 渲染 |
| 4 | `portfolio/prototypes/a3-calc.html`（**重写**） | 外部稿（推演/输入溯源/瓶颈链/批次表/岸游表/G3 抽屉）；去标注 11 处（含模型边界卡移除、模拟话术归一实时/缓存）；瓶颈三卡左色条；观察态状态机核算/方案可点 |
| 5 | `portfolio/prototypes/a3-observe.html` | 旧版补齐：两轮放大＋v3＋去标注 2 处＋v3 卡片层；导航"预警观察"＋状态机核算/方案可点 |
| 6 | `portfolio/prototypes/a3-plan.html`（**新建**） | 方案 A/B/C 比选＋合法性灯组＋派包拦截（外部稿；去"系统生成说明"tag 与"无 AI 臆测语"chip） |
| 7 | `portfolio/prototypes/a4-l3.html`（**新建**） | L3 审批：队列知会流＋签署单（超时双路径/轮次史/五端口锁提示） |
| 8 | `portfolio/prototypes/a5-dispatch.html`（**新建**） | 派包：任务包流＋渠道矩阵＋拦截明细＋外部方状态 |
| 9 | `portfolio/prototypes/b1-inform.html`（**新建**） | B1 船长知会流（1280×720 平板） |
| 10 | `portfolio/prototypes/b2-decision.html`（**新建**） | B2 L4 决策页（1280×720 平板；判据红左条/触发横幅描边式） |
| 11 | `portfolio/prototypes/b3-task.html`（**新建**） | B3 船员任务包（390×844；三键回执描边式） |
| 12 | `portfolio/prototypes/b4-lock.html`（**新建**） | B4 广播台待播确认（机台嵌入视图） |
| 13 | `portfolio/prototypes/p1-workspace.html`（**新建**） | p1-captain-hifi 冻结帧（12:33 端口·审计）＋A 族壳；修复 4K 上冲（补 html/body 100% 高度）与推理字幕位移 |
| 14 | `portfolio/assets/renders/`（**新建，31 PNG＋README**） | 12 整页 2× 高清（A 族/p1 3840×2160）＋19 卡片裁切；README 含"截图→作品集页面"分配表（P3–P16，每图一页） |
| 15 | `portfolio/planning/design.md`（→ **v0.7**） | 上午轮：新增 §12.7 令牌与原型实现规范（本轮未再改） |
| 16 | `planning/tmp-report-page1-tech-selection.svg` / `page2-agent-architecture.svg`（**重绘**） | 按用户参考图重绘为 A3 浅色风格（奶油底/蓝橙条/白卡/pill/琥珀高亮行/蓝章层级标签），文本零改动 |
| 17 | `CONTINUATION.md`（本文件） | 当前主线刷新为第二轮；索引表更新至 12 实页；新增本改动表；上午主线降级 |

**本轮遗留**：①数据包对齐项未决（a2 信度值、a3 批次人数 vs 数据包、ISM 上屏、三态话术"物理实接"等——均按用户指示保留现文案）；②a3-basis/a3-monitor/a5-wait/a6 系等未做页的链接为空 target；③tmp-report-page3-sandbox.svg 未重绘；④两页 SVG 重绘版与全部页面改动未 commit。

---

## 🗂 本次会话改动记录（2026-09-18 上午 · 暗色视觉定稿 + A1 重做）

> 背景：用户要求忽略首版 A1 样板屏重做；先评估再施工。评估结论与 GitHub 调研见会话记录；用户参考图（小红书 B 端暗色 dashboard）与 iOS 26 风格评估后定稿"墨黑卡面"。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `portfolio/planning/design.md`（→ **v0.6**） | 新增 §1.6 上屏文案纪律（短句动宾、去 AI 腔、禁演示元数据）与 §12.6 暗色视觉定稿（墨黑卡面底色体系、六级强调阶梯、面板划分语言、1.5px 线性图标、轻微玻璃授权仅浮层、半径/间距档、16:9 锁定）；§1.2/§1.3/§7.4 三态话术改"实时/缓存/离线"、删 MOCK/REAL 上屏；§12.2 A1–A6 行与 §12.3 玻璃禁令同步 |
| 2 | `portfolio/planning/design-snapshot-data.md`（→ **v0.2**） | 施工规则 §0.2 同步（禁模拟标签、文案纪律 §1.6 指针）；§0.1 界面主语言拍板；§2.1 措辞对齐（"标◐模拟"→"三态点按 ◐ 渲染"、"假设产能"→"产能【假设·C3】"）；§4.4 三问拍板关闭 |
| 3 | `portfolio/prototypes/clarsyn-tokens.css`（→ **v2**） | 全套令牌重写：#0A0B0E 墨黑体系、卡面浮起、白 pill .btn-pri/.btn-ghost、.glass 轻玻璃（仅浮层）、半径 12/8/999、间距五档、语义色暗底提亮 |
| 4 | `portfolio/prototypes/a1-xcard.html` | 按新视觉重做后，再按用户提供的 Gemini 参考 SVG 做信息密度对齐（2026-09-18 二轮）：顶栏信息单元卡片化＋全局搜索框、新增"01 离船作业总览"卡（批次结构/双桥 ≤2,000 pax/h/移民 8 工位）、聚合计数补法规注（API 2004/82/EC·PNR 2016/681）与 PRM 分类 chips、X 卡补治理约束行、队列补第三行＋本班闭环统计；船舶侧视手绘替换为甲板层带图（S15 层名，D3 Lobby 高亮＋双廊桥节点＋楼电梯虚线）；参考件存 `portfolio/prototypes/_ref-gemini-a1.svg`（不提交）。**对方 SVG 编造的数字（缺口 180 座/超警 22%/PRM 细分 32-14-44）未采纳，待用户决定是否收编进数据包 v0.3**。三轮（用户五点反馈，2026-09-18）：①用户授权基于既有数据推断补数→落 `design-snapshot-data.md` **v0.3 §1.12**（接驳 12 辆/4 辆/180 座、超阈 22%、因子信度 0.45/0.70/0.40、弱信号 σ、PRM 细分、P1×6/P2×3，全部演示设定上屏不带标记）并上屏，含 AI 能力语标签（文本抽取/约束试算/时序对齐）；②全局字号放大、顶栏 76px；③时间轴重做（ETA 标线锚定 09:40 位置＋方块标记，窗口模块去卡片背景直接落画布）；④删除卡片 01/02 模块编号；⑤清除页面解释性文案（X 卡副题、sig 长脚注等）。四轮（同日晚，用户六点反馈）：⑥左右栏互换——右栏聚合事件相关（事件队列＋挂起监测＋审批知会），左栏为作业与人口（离船总览＋在船概览＋岸游与空间）；⑦"岸游与空间"按推荐方案 A 重画为**批次流向侧视图**（8–10 层 1,560／5–7 层 1,400／1–4 层 940 → 前/中/后楼电梯组 → D3 Lobby 双廊桥 → 岸侧；线宽＝流量；层段人数入 §1.12）；⑧弱信号与挂起行加"检测过程"起伏折线（.pk polyline）；⑨修复右栏 flex 优先级 bug（.col > .watch） |
| 5 | `CONTINUATION.md` | 主线刷新 2026-09-18；遗留项四项拍板记录；09-17 主线降为历史 |

---

## 🗂 上次会话改动记录（2026-09-15 · 技术选型 v0.8 + 三页汇报稿）

> 背景：V-1/V-2 作品集页讨论前，用户要求先做业务技术选型（什么业务用多 agent/RAG 等）与 agent 架构模式调研，并重查过时的模型选型。三份 GitHub 一手调研（模式谱系/框架现状/PM 控制项）+ 两份 2026-09 核验（开源模型/边缘硬件）。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `design/b-port-shore-and-itinerary/ai-architecture-and-value.md`（→ **v0.8**） | 新增 §3.10 行业模式对照（Anthropic 5 工作流+1 agent、[0.5]–[9] 逐段模式归属、不用 ReAct/Orchestrator-Workers/Evaluator-Optimizer/Reflexion/Swarm/agentic RAG/ToT 的理由）；§3.11 PM 控制项（已有 6 机制映射 + 7 项待拍板决策 + 沙箱/MCP 等术语应答模板）；附录 A 框架尽调 8 家（AutoGen 维护转 MAF、Swarm 被取代、Dify 许可限制；仅技术说明书用）；模型选型表重写（档位+候选名+许可红线+约束解码口径）；四方案对比延迟改实测区间（8B 在 Orin Nano Super 19–22 t/s 等，[5] 四节点链演示级 10–30s）；新增边缘硬件五档表（含 Thor 已 GA、初代 HAT+ 不支持 LLM 的修正）；上下文论证改"需求数 K/供给 128K+"；版本记录 v0.8 |
| 2 | `portfolio/research/agent-tech-selection-research-2026-09.md`（**新建**） | 调研综述一手来源档：BEA 五模式、单 agent 六范式、拓扑与"8 大类不存在"考证、AAFB 18 课、框架快照、PM 28 项控制压缩、模型代际表（Qwen3.5/3.8、Gemma 4、Phi-4、GLM-5/Edge、DeepSeek V4 仅 API、MiniCPM5）、Qwen3-Embedding、硬件实测数字与全部来源 URL |
| 3 | `portfolio/planning/tmp-report-tech-3pages.md`（**新建，临时**） | 汇报用三页内容稿：P1 业务技术选型总表（8 环节×技术形态）、P2 方案推演多 Agent 架构、P3 沙箱四层设计；非作品集定稿，待用户反馈。**注意 P2 文字稿仍是业务工位版，SVG 已改技术架构版，待同步** |
| 4 | `tmp-report-page1-tech-selection.svg` / `tmp-report-page2-agent-architecture.svg` / `tmp-report-page3-sandbox.svg`（**新建，临时**） | 三页 1600×900 16:9 汇报 SVG，纯黑白灰、零编组、活文字、英文 id，可直接拖 Figma 导出 2x PNG。P1=8 行选型表+三规则卡+金句；**P2 经用户指正后重画为技术架构分层图**（编排层四组件 / N1–N4 无状态节点+共性约束条 / 推理三档+云端虚线+三个只读服务 / 出链三闸反黑 / 写执行器→执行端口 / 横切保障四块）；P3=四层沙箱表（②工具权限整行反黑）+T0–T3 降级条+审计不降级黑块。三文件均通过 XML 校验 |
| 5 | `CONTINUATION.md`（本文件） | 当前主线刷新为 2026-09-15；新增本改动表与"全部在途事务"盘点 |

**下一步待办**：① 用户汇报后对三页给反馈（P3 四层角度、P2 技术架构详略）；② 同步 P2 文字稿；③ 7 项 PM 产品决策待陆续拍板；④ V-1、V-2 作品集内容稿 + 绘图工作稿；⑤ 挂账：II-2 地图页、IV 单页、V-3/V-4、VI 单页、展板内容填充、EVENT-ROSTER mock-data v0.6、P9-1 泳道图重绘；⑥ 全部新文件待用户指示后再 commit/push。

---

## 🗂 上次会话改动记录（2026-09-12 · 竞赛压缩版规划）

> 背景：竞赛页数限制，用户要求①系统组织 1 页②Agent 架构不限页③证明落地 1 页。III-9 AI 治理总览作品集页已完成。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `portfolio/planning/competition-compressed-page-plan.md`（**新增 v1.0，待审核**） | III-9 之后 IV/V/VI 幕压缩重切：IV=1 页单中枢 hub-spoke（六引擎小字不展开、三态输入、三类输出端口复用 III-5a 通信栈口径、不碰红线区、6 工种 chip、T0–T3 角注）；V=4+1 页围绕 Agent 架构（工程全景选型 / 编排与三门控制 / 库外×幻觉深描 / 边缘部署 T0–T3 / 可选时序预算）；VI=1 页五级验证阶梯+诚实量化卡+风险 chip+差异化三句；含衔接事项（II-2 缺页建议与导览合成 1 页地图、v4 暂不改、工作法沿用）与审核后执行顺序 |
| 2 | `CONTINUATION.md`（本文件） | 当前主线刷新为 2026-09-12；新增本改动表；审核清单首位加压缩版规划文件 |

**下一步待办（按优先级）**：
1. **用户审核** `portfolio/planning/competition-compressed-page-plan.md`（切页方案、各页版式与信息纪律）；
2. 审核通过后写 IV 单页内容稿与绘图工作稿（落进 page-content 主档）；
3. 补"阅读导览 + II-2"合成地图页（III 幕页眉回指目前缺落点）；
4. 逐页推进 V-1～V-4、VI 单页；每页稿成先审口径再开画；
5. `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义（E09/E-L4 命名与触发）仍挂账。

---

## 🗂 上次会话改动记录（2026-09-07 · 第 III 幕绘图准备）

> 目标：让第 III 幕 12 页可以直接开画。依据 `mechanism-registry.md`（C0–C5/G1–G4 编号解析）与 `event-governance-framework.md`（字段级规则），在正文主档每页追加"机制拆解与绘图参考"绘图工作稿，页面初稿不动。

| # | 文件 | 本次改动要点 |
|---|---|---|
| 1 | `portfolio/planning/ai-pm-portfolio-page-content.md`（v0.9 → **v1.1**） | **III-1/2/3（v1.0）**：对应 C0 前置决策支持 / C1 事件识别与分类 / C2 方案推演与生成；重点：四维评估+双卡+两条受控回路（III-1）、双通道汇流+X 分类失配出口+"弱信号区 vs 库外区必须分开画"（III-2）、两段式生成流水线+A02 参数槽前后对比+分域模型四分格+双重约束视觉主线（III-3）。**III-4a–III-9（v1.1）**：C3.1–C3.3 四级阶梯/L4 画区不画级/inform≠approve（III-4a）、审批状态机+修订三形态+超时双出口（III-4b）、双斜坡汇合+时限梯度条（III-4c）、三级递送纵列+投放矩阵 2×3（III-5a）、三行双条对比+AI 手边界红线（III-5b）、状态机三出口+P1/P2 双栏（III-6）、四触发口+观察/记录/建议三职能（III-7）、血缘树 E09 实例+审计包样张+推理附件两级展开（III-8）、主轴×S1–S8 总谱+G 通栏+三场景迷你轴（III-9） |

**下一步待办（按优先级）**：
1. **逐页绘制第 III 幕可视化图**（SVG/drawio，按各页"绘图要素清单"执行；视觉规范沿用 `portfolio/design-specs/a3-design-spec.md`）；
2. 用户逐页审核拆解块口径（尤其 III-2 的弱信号/库外分区、III-4a 的 L4 判据呈现）；
3. `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义（E09/E-L4 命名与触发）；
4. 第 III 幕图定稿后进入第 IV 幕内容。

---

## 🗂 上次会话改动记录（版本记录表模块 · 2026-09-04）

> 本次修改基于船长权限边界证据（ISM Code §5.2 / 邮轮酒店线文献 / 巨轮 CMC 论文），按"基础需求 → 架构/库设计 → 原型 → 作品集"优先级推进；每个被改文件均自带版本记录表。

| # | 优先级 | 文件 | 本次改动要点 |
|---|---|---|---|
| 1 | 母文档 | `design/b-port-shore-and-itinerary/event-governance-framework.md` | L4 重定义"船长决策区"（§4.2.4 判据+反向测试+超时双路径）、E09 起点改为"接收外部已成立航变决定"、船长知会/抄送通道、§4.11.5 调和 |
| 2 | 需求母档 | `design/b-port-shore-and-itinerary/prd.md`（→v0.13） | 航变边界、L4/船长知会、M4/R9/§7 角色/B4/B10/§10 |
| 3 | 架构/接口 | `interface-map-and-ai-components.md`（→v0.2）、`ai-architecture-and-value.md`（→v0.7） | 决策端口/流水线[7]、天气源定位、AI 边界 |
| 4 | 演示 | `demo-terminal-and-interactions.md`（→v0.2）、`demo-script-b5-options.md`（→v0.2） | 第一幕起点=已成立决定、审批链+船长知会 |
| 5 | 原型 | `EVENT-ROSTER-v0.5.md`（→v0.6）、`v0.3`（标弃用）、`ui-complete/design.md`（→v0.2） | E09→E-L4 主剧情按判据重定位 |
| 6 | 作品集正文 | `ai-pm-portfolio-page-content.md`（→v0.3）、`ai-pm-portfolio-body-plan-v3.md`（→v3.1） | P9-1 重定位、P7/P6/P13/P15 同步 |
| 7 | 作品集文案/规划 | `clarsyn-ai-pm-presentation-strategy.md`（→v0.2）、`copy/a3-product-copy*.md`（design+portfolio ×2，→v0.4/v0.3）、`a3-page-architecture-table.md`、`a3-product-doc-plan.md`（design+portfolio） | "预测/预警"措辞统一为"接收决定+影响推演" |
| 8 | 研究补遗 | `research/round2/batch2/06-safety-regulation.md` | 补 ISM §5.2 船长权限证据 |
| 9 | 证据归档 | `research/round2/source-archive/06-master-authority-and-shipboard-org.md`、`portfolio/research/p9-1-l4-approval-authority-evidence.md`（新增） | 证据原始档 + L4 决策应用档 |
| 10 | 机制总谱 | `design/b-port-shore-and-itinerary/mechanism-registry.md`（新增 v0.1→v0.2） | C0–C5 主轴 × G1–G4 全局 × S1–S8 轴段的机制母文档（两级谱 + 逐机制解析 + 轴图标注规则 + 作品集页索引） |
| 11 | 规划升级 v4 | `portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（新增 v4.0；v3 存档） | 事件脊柱版四幕结构；同步 page-content 指针（→v0.5）、registry §10 索引（→v0.2） |

**下一步待办**：
1. **进入第 III 幕讨论**（按 v4 §5：III-1 决定前的参谋 → III-9 机制总谱收束；先定章模板与信息层级，再逐章填充）；
2. `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义（E09/E-L4 命名与触发）；
3. 用户审阅：`mechanism-registry.md`（机制编号与解析）、`body-plan-v4.md`（四幕骨架）、`event-governance-framework.md` §4.2.5–4.2.7/§4.14–4.15；
4. 第 III 幕内容成熟后进入第 IV 幕；页面内容按幕落进 `ai-pm-portfolio-page-content.md`（按新页号重排章节标题）。

---

## ✅ 最新状态速记（2026-09-03）

- 已重新规划作品集正文页：**v4 事件脊柱版** `portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（用户 2026-09-04 认可骨架：P9-1 单事件为脊柱 + 先业务后技术四幕 + 阅读导览；不受比赛页数限制）；v3 已存档（P8 构图等内容映射见 v4 §9）
- 正在逐页填充正文主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
  - 当前页面：P1 产品定位、P2 宏观设计背景、P3 研究流程、P4 多源调研、P5 痛点分析与需求、P6 业务理解、P7 AI 机会判断、P8 产品方案总览/系统组成（草稿）
  - P4 多源调研：只列事实与来源，不做结论
  - P5 痛点分析与需求：综合判断式总结，三层嵌套（体验层 / 流程协同层 / 决策治理层）+ 四类断点视角
  - P6 业务理解：以系统上下文图表达输入来源 / 输出对象 / 外部边界 / 联动关系，并补充“不推倒原系统”的连接原则
  - P7 AI 机会判断：已重写为“四类业务断点 → AI 不可替代位置 → 三个场景价值”；四类断点已细化“现象 + 核心症结”，并补充实现标签；构图采用“一主三辅长条区”
  - P8 产品方案总览 / 系统组成：已写入草稿（事件处理主线 + 核心引擎 + 输入输出端口分类 + 岸基/船基协同）
  - P9 核心业务场景流程：P9-1 台风航变响应泳道图画法已写入（一场景一页，岸基→船基）；已补充事件识别子系统、输入信息分类、系统运行主循环图、执行端分类、循环监控机制
  - 系统运行主循环图讨论已结束；P9-1 进入场景重新定位：不再由 ClarSyn 做航变预警/航变决定，改为接收外部航变决定后做登离船/接驳/时间窗/船员任务推演
- ✅ 作品集视觉规范已切换：最终 HTML 为 `portfolio/a3-document/a3-document-web.html`；规范文件为 `portfolio/design-specs/a3-design-spec.md` 与 `portfolio/design-specs/ClarSyn_A3_DesignSpec.svg`
- ✅ SVG 图集已全部按 A3 终版 HTML 配色重绘/替换（9 张业务图），保持扁平无编组、透明底
- ✅ 新增单独内容页背景：`portfolio/svg-pm-diagrams/clarsyn-content-background.svg`（1600 × 1132，纯色 `#F4F5F7`；非封面渐变）
- ✅ 新增 HTML 组件资产：`portfolio/design-specs/a3-html-card-styles.svg`（卡片/倒角/投影）、`portfolio/design-specs/a3-html-icons-and-controls.svg`（图标/标识/状态栏/彩色按钮）
- ✅ 已 OCR 提取桌面 `2121` 图片文本：`portfolio/ocr-extracted/2121/`
- ✅ 已分析外部 AI 工业应用参考并写入：`portfolio/research/ai-production-deck-insights.md`
- ✅ 第 7 页新文件已放到桌面：`C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
- ✅ 网络检索任务已完成（2026-09-04）：通用搜索引擎仍不可用，改用**学术 API（OpenAlex/Crossref/arXiv）+ IMO 官网**通道取证据；证据原始档 `research/round2/source-archive/06-master-authority-and-shipboard-org.md`，决策应用档 `portfolio/research/p9-1-l4-approval-authority-evidence.md`
- ✅ **L4 判据已拍板并落地**（船长决策区 §4.2.4）；20+ 文件已按优先级修改（见上方”本次会话改动记录”；全带版本记录表）
- 下一站：① P9-1 泳道图重绘（drawio + SVG）；② `EVENT-ROSTER` 的 `mock-data.js` 同步 v0.6 语义；③ 作品集 A3 SVG/HTML 同步；④ 用户审阅本次改动
- 最近一次 git push：`f4d6e12`
- 本地工作区已同步（`recordings/` 除外）

---

## 🟥 新对话开始后请提醒用户审核以下最近文件（按优先级）

0. **三页汇报 SVG（2026-09-15，最高优先级）**：`portfolio/planning/tmp-report-page1-tech-selection.svg`、`tmp-report-page2-agent-architecture.svg`（技术架构版）、`tmp-report-page3-sandbox.svg`，配文字稿 `tmp-report-tech-3pages.md`——用户汇报后等反馈
0b. **选型文件 v0.8**：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md` §3.10 模式选型 / §3.11 PM 控制 / 附录 A 框架尽调 + 更新后的模型硬件表，及来源档 `portfolio/research/agent-tech-selection-research-2026-09.md`
0c. **`portfolio/planning/competition-compressed-page-plan.md`（v1.0，2026-09-12）——竞赛限页版 IV/V/VI 幕压缩规划，仍待审；审核通过后按其 §5 顺序开写 IV 单页**
1. `portfolio/planning/ai-pm-portfolio-page-content.md`（→v1.3）
   - 第 III 幕 12 页"机制拆解与绘图参考"已全部就位（III-1/2/3 对应 C0/C1/C2，III-4a–III-9 对应 C3/C4/C5/G1/G2+G3/全谱）；v1.2 全页完整英文标题、v1.3 船载通信栈专业化（III-5a/b、III-7）；III-9 作品集页已完成
   - 后续内容不再写进 III 幕，按压缩版规划文件推进 IV/V/VI
2. `portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（**当前规划主文档**）
   - **重点审核：四幕结构与第 III 幕机制展开的章节骨架**（v3 已存档）
   - 机制编号统一引用 `design/b-port-shore-and-itinerary/mechanism-registry.md`
3. `C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
   - 用户桌面上的第 7 页文案与构图文件，供 AI 绘图/排版使用
4. `portfolio/research/ai-production-deck-insights.md`
   - 外部 2121 AI 工业应用参考对 P1–P7 及后续页面的影响分析；已补充岸基/船基边界
5. `portfolio/svg-pm-diagrams/p9-1-hangbian-response.svg`
   - P9-1 台风航变响应泳道图 SVG（当前为初稿，按新“岸基→船基”口径待重绘）
6. `portfolio/planning/diagrams/p9/p9-1-hangbian-response.drawio`
   - P9-1 drawio 源文件（当前为初稿，待按新口径同步）
7. `portfolio/ocr-extracted/2121/`
   - 桌面 2121 图片的 OCR 提取文本
8. `portfolio/svg-pm-diagrams/ai-scenario-value.svg`
   - 第 7 页场景价值 SVG（后续可按新文案同步再细化）
9. `portfolio/svg-pm-diagrams/ai-value-judgment.svg`
   - 第 7 页价值判断矩阵/结构图（后续可按新构图再更新）
10. `portfolio/svg-pm-diagrams/business-ecosystem-context.svg`
    - 第 6 页业务理解系统上下文图

---

## 📌 最近讨论要点与决策（2026-08-31）

### 1. 外部 2121 参考的核心启示

- 外部材料展示了“发现问题 → 四类断点 → 分层处理 → 追影响 → 给动作 → 人工审批 → 最小试点”的成熟 AI 产品讲解框架
- 它与 ClarSyn 高度相似，但不能直接套用工业术语；只能参考“解读角度”和“产品化语言”

### 2. 第 7 页的重新定位

- P7 只讲“AI 价值判断”，不展开系统架构、多 Agent、接口、控制、选型、评测
- P8 及之后理解为 harness：如何控制、约束、落地这些 AI 价值
- P7 应该从 P5 已建立的业务断点出发，而不是突兀地讲“AI 三高地”

### 3. “AI 三高地”的表述修正

- 不再叫“三个并列高地”
- 改为“三个 AI 不可替代位置”：
  - 核心：长链路推演 + 弱信号整合
  - 分支：库外/低置信度/复合信号 → 事件治理升级
  - 支撑：推理附件 / 可解释性 / 审计回写

### 4. 四类断点与 AI 价值的对应关系

| 业务断点 | AI 价值 | 角色 |
|---|---|---|
| 影响不清 | 长链路推演 + 弱信号整合 | 核心 AI 价值 |
| 发现慢 | 库外/低置信度信号 → 判断是否值得升级 | 事件治理分支 |
| 动作分散 | 生成候选动作 + 审批路由 | Agent 辅助层 |
| 结果没回写 | 推理附件 + 审计回写 | 信任与审计支撑层 |

### 5. 必须强调的边界

- “动作分散”不是 AI 核心价值，AI 只是生成候选动作和统一视图
- “发现慢”不是“AI 能看见”，AI 的增量是判断是否值得升级
- “结果没回写”不是“AI 做审计”，AI 的贡献是让判断自带可追溯依据

### 6. 第 7 页构图方向

- 采用“一主三辅长条区”
- 主条：影响不清 → 长链路推演 + 弱信号整合（高亮）
- 辅助条：发现慢 / 动作分散 / 结果没回写
- 每条长条：左业务断点，右 AI 价值，右下角一句小标注
- 场景锚点：E09 / X-0001 / E-L4
- 页面只保留标题、结论、长条短句、收束金句，不堆段落文字

### 7. 岸基 ⇄ 船基协同（2026-09-01）

- 台风/气象/港口/海事等宏观预警由岸基/外部系统负责，ClarSyn 不承担“发现台风”的职责
- ClarSyn 应分为：
  - 岸基决策协同层：接收外部预警、做航次级影响评估、生成航次变化方案、协同总部/船长确认、下发船基
  - 船基实时执行层：接收岸基方案 + 本船实时状态，做下船/接驳/时间窗/船员任务推演，生成安全与乘客服务方案，触达船员/乘客/港口，执行回写
- 岸基 → 船基：航次变化方案、预警、修订 ETA、港口窗口、赔偿/客服策略
- 船基 → 岸基：本船状态、乘客数量、执行结果、现场反馈、事件升级

### 8. 用词统一与人工审核级别

- 系统部署侧统一使用“船基/船载”，不使用“海基”，避免军事语境歧义
- 审核级别：
  - L1：自动分发，无人工审核
  - L2：值班船员/客服确认
  - L3：运营经理/法务审批
  - L4：船长/最高层决策
- P9 泳道图需区分：输入信息（原始信号）→ 事件识别/判断子系统 → 事件分类与严重度判定 → 影响推演与方案生成

### 9. 系统运行主循环图简化方向（2026-09-01）

- 主循环图不绑定具体业务，也不展开 L1-L4 细节
- L1-L4 用“人工控制/权限升级通道”代替四个泳道；具体内容放到权限升级页面
- 主循环：
  - 输入信息 → 事件识别与标准化 → 事件分类与风险判定
  - → AI 影响推演 → 候选方案组合 → 预警与决策卡
  - → 人工控制/权限升级通道
  - → 执行与输出
  - → 审计回写/学习回流
- 执行端分类：
  - 系统自动执行
  - 人员执行
  - 下游协同/告知
- 循环监控机制：
  - 终止型事件：告知送达即可关闭
  - 持续监控型事件：需定期复检直至解决
  - 主循环图只画“监控/复检”虚线环，不展开细节
- 影响文件：P6/P8/P9/P11/P13/P16、`ai-pm-portfolio-body-plan-v3.md`、`ai-pm-portfolio-page-content.md`、P9 泳道图

### 10. P9-1 台风航变场景重新定位（2026-09-03）

- 用户提出问题：邮轮上已有成熟的气象监控、台风预警和航变沟通体系，ClarSyn 不应再做“航变预警/航变决定”。
- 结论已对齐：
  - 航变预警/航变决定由外部成熟体系负责：气象/海事只发预警和提醒，行程调整由船公司自主决定，船长有安全否决/最终确认权；
  - ClarSyn 的职责是接收“已成立的航变决定/预警 + 本船状态”，推演航变后的登离船/接驳/时间窗/船员任务/安全与乘客服务方案；
  - P9-1 起点改为“外部航变决定已成立”，不是“ClarSyn 识别台风”；
  - P9-1 场景名称建议改为“台风航变后的登离船与接驳调度响应”或“航变影响下的靠泊/下船/接驳动态调度”。
- 参考：Globot Shield 的“感知层红海、决策层空缺”定位，但 ClarSyn 不照搬“AI 参与航变决策”，只做决策后的影响链与执行增强。
- 待补强事实：船公司岸基 FOC/GSOC 与船长的具体沟通机制、航变 SOP、船基实际可获得的数据字段（需访谈或一手资料验证）。

### 11. P9-1 的 L4 适用性讨论与网络检索任务（2026-09-03 续）

- 用户提出关键疑问：航变后的下船方案变化是否适合默认 L4？会不会增加船长信息负载？
- 当前倾向/建议（尚未最终拍板）：
  - 默认 L2/L3：值班确认 / 运营经理审批；
  - 船长只做“知会/抄送”，不阻塞执行；
  - 只有安全、群体、不可逆高后果事件才升级 L4；
  - 保留“超时自动升级”保证快速响应。
- 网络检索状态（2026-09-03 实测）：
  - 部分可上网：GitHub API、Bing、Baidu、360 可访问；
  - 不可访问：Google、Wikipedia、DuckDuckGo、raw.githubusercontent.com；
  - 无原生 web_search 工具，需要 curl / 平台 API 方式检索。
- 已获得的初步证据：
  - 360文库“酒店客务总监岗位职责”：负责前厅/客务/公关，对总经理负责；
  - 360文库“宾客服务经理岗位职责”：迎送客人、处理投诉，属宾客服务线；
  - 百度结果出现“邮轮各部门职位详解”“邮轮职位全解析”“邮轮酒店总监”“邮轮前台 GSO”等条目；
  - 未找到权威邮轮组织架构一手文档，需继续检索。
- 未完成任务：
  - 继续检索邮轮运营人员结构、Hotel Director / Guest Services / 船长审批边界；
  - 确认“下船调度归属宾客运营线”是否有更权威来源；
  - 根据检索结果最终确定 P9-1 的 L2/L3 默认 + 船长知会 + L4 升级方案；
  - 随后重绘 P9-1 泳道图（drawio + SVG）。
- 下一步选项（待用户选择）：
  1. 继续用现有部分网络通道深挖；
  2. 用户提供搜索 API Key / 代理端口；
  3. 用户手动搜索后粘贴关键内容。

---



## 🗂 当前关键文件索引

- 正文内容主档：`portfolio/planning/ai-pm-portfolio-page-content.md`
- 正文页规划 v4（事件脊柱版）：`portfolio/planning/ai-pm-portfolio-body-plan-v4.md`（v3 存档）
- **竞赛压缩版规划（III-9 之后 IV/V/VI，2026-09-12，待审）**：`portfolio/planning/competition-compressed-page-plan.md`
- **三页汇报临时稿（2026-09-15，选型/多 Agent/沙箱）**：`portfolio/planning/tmp-report-tech-3pages.md`
- **技术选型调研综述（2026-09-15，一手来源）**：`portfolio/research/agent-tech-selection-research-2026-09.md`
- 历史 AI 架构选型（**已 v0.8，2026-09-15**）：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md`（§3.10 模式选型/§3.11 PM 控制/附录 A 框架尽调）
- 机制总谱（机制编号母文档）：`design/b-port-shore-and-itinerary/mechanism-registry.md`
- AI PM 讲解策略：`portfolio/planning/clarsyn-ai-pm-presentation-strategy.md`
- AI PM 教程调研：`research/ai-pm-tutorials/REPORT.md`
- 作品集总览：`portfolio/README.md`
- 外部 AI 工业应用参考影响分析：`portfolio/research/ai-production-deck-insights.md`
- OCR 提取文本：`portfolio/ocr-extracted/2121/`
- 第 7 页桌面文案与构图：`C:/Users/LHM/Desktop/ClarSyn-第7页-AI机会判断-文案与构图.md`
- 历史业务/PRD：`design/b-port-shore-and-itinerary/prd.md`
- 历史 AI 价值/架构：`design/b-port-shore-and-itinerary/ai-architecture-and-value.md`
- 历史证据线：`design/evidence-line-a-baseline.md`

---

## 📌 已删除/清理

SESSION_SUMMARY 系列已删除：

- `SESSION_SUMMARY_2026-08-19.md`
- `SESSION_SUMMARY_2026-08-20.md`
- `SESSION_SUMMARY_2026-08-20-later.md`
- `SESSION_SUMMARY_2026-08-21-engine.md`
- `SESSION_SUMMARY_2026-08-22.md`

---

## 🚫 不进入提交

- `recordings/` 不提交

---

## 历史背景（简要）

- 项目原为邮轮 AI 竞赛项目，当前主线为 ClarSyn 港岸协同与航变响应系统
- 近期重心从 A3 HTML/SVG 转向 AI 产品经理作品集内容重构
- 旧文档仍可作为事实来源，但不再作为当前工作产出目标

# R1 港口窗口生态、现实程序、法规合同（第一轮资料查找）

> 版本：v0.1（2026-09-16）
> 任务书：`00-r0-data-model-inventory.md` §4 R1
> 执行方式：本机沙箱直连检索；**时间盒硬收口**（通道受限，未完成的问题列入 §4 缺口，不用常识填）
> 证据等级：A=官方/同行评议一手；B=行业报告/主流媒体；C=其他/待核

---

## 0. 通道实测结果（影响后续轮次安排）

| 通道 | 状态 | 说明 |
|---|---|---|
| Crossref API | ✅ 可用（需慢速、带 mailto） | 本轮学术文献主通道 |
| Springer 全文页 | ✅ 可抓取摘要与预览正文 | 《Maritime Informatics》开放章节 |
| IMO 官网 | ✅ 200 | FAL 页面已取 |
| OpenAlex | ❌ 当日免费额度耗尽（UTC 午夜重置，约北京 08:00） | R2 起恢复 |
| Semantic Scholar | ❌ 429 限流 | 备用 |
| Bing（本机出口） | ⚠️ 基本失效 | 英文查询被反爬返回空页/污染结果；中文查询 2 次后退化为泛化 SEO 结果，不可用于取证 |
| EUR-Lex | ⚠️ 202 反爬挑战 | 官方法条 URL 可确认存在，正文未能在沙箱抓取 |
| MPA 新加坡 / 迈阿密港 / 吴淞口官网 / NCL | ❌ 403/000/JS 壳 | 需用户浏览器手动打开 |
| stmvalidation.eu、monitoredsearoutes.org | ⚠️ 本机不可达 | **不能据此判定网站已下线**，仅记录不可达 |

---

## 1. 逐问题结论

### Q1 PortCDM / STM / SeaSWDN 是什么、谁发布、覆盖率如何 —— 🟡 概念已证，覆盖率未证

**已证（A 级）**：PortCDM = Port Collaborative Decision Making，由 Lind、Haraldson、Watson 等提出并写入 Springer 开放教材《Maritime Informatics》（2021）。其定位原文（[S1] ch.11）：

> "In this way, PortCDM is not intended to be the planning tool for activities in a port call. PortCDM is intended to provide all actors within and around the port call process with common situational awareness emerging from a system of record… These systems of record can assist in fine-tuning existing port call plans, once they have been established."

要点：①本质是**共享时间戳（time stamps）建立的 system of record**，不是计划工具，更不是决策/通知推送系统；②只在计划"已经成立之后"做微调协同；③数据来自各参与方生产系统的自愿共享（collaborative foundations）；④讨论的港口生态以**货运/干货/集装箱**为主，客轮不是其叙事中心。

**对我们的直接含义**：即使在 PortCDM 成熟的港口，"靠泊窗口被压缩"这件事也不会由标准系统主动推送给邮轮——决定来自港方/码头/代理，PortCDM 只在事后共享状态时间戳。这与我们 b1 节拍的设计方向（**代理非结构化通知 → LLM 抽取槽位 → 人工确认；电话走补录接管**）一致，而不是画成系统直连。

**未证（缺口）**：2026 年真实覆盖率、客轮港采用情况、STM Validation 项目结束后的维持主体（STM 官网本机不可达）。不得在 PPT 声称"覆盖率 X%"。

### Q2 船岸窗口变更的现实信息形式（代理邮件/电话 vs BERMAN/EDI）—— 🔴 未取到直接证据

- 间接证据：[S7]《Just-in-Time Port Call Optimization: Challenges and IT-Systems》（IOP 2024）从标题与归属看正是梳理港务 IT 系统碎片化与 JIT 障碍的论文，**全文待取**（iopscience 302 反爬）；[S5] 油轮到港实践研究（2025）显示业界仍在"anchor current arrival practices（锚地等）"，说明 JIT 数字协同远未普及。
- BERMAN/MOVINS/FAL Single Window 在邮轮港的真实使用率：**本轮无证据，挂账**（需查 UN/EDIFACT SMDG 报文手册、邮轮港/船代一手资料，见 §4）。

### Q3 缩窗/关港权限链（港长/VTS/引航/拖轮/潮汐）—— 🔴 本轮无一手港章证据

MPA、香港海事处、港卡纳维拉尔页面在沙箱均不可取（JS 壳/403）。学术侧仅得相邻文献 [S15]（在港邮轮安全评估方法学，Safety Science 2015）。**具体港口规章原文 → §4 手动清单。**

### Q4 邮轮跳港/改港真实案例与赔付 —— 🔴 本轮未取到

Bing 通道失效，新闻与判例检索失败。学术侧仅得：[S18] 2012 年一则"法院裁判邮轮乘客投诉"案例注释（期刊 *International Free Trade and the Americas*，DOI 见来源表，待取全文确认法域与裁判要旨）；[S19] CABI《Cruise Itinerary Planning》专著章节（2017，含航线规划与变更背景，待取）。

### Q5 船票合同条款原文 —— 🔴 四家站点全部反爬，未取到条款文本

Carnival 合同 URL 存在但返回反爬拦截页（552B）；RCL 旧 PDF 路径已失效（返回 SPA 壳）；NCL 403。**不得凭记忆引用条款号**。→ §4 手动清单。

### Q6 EU 1177/2010、雅典公约、IMO FAL —— 🟡 一项已证，两项待取

- **IMO FAL 公约**：IMO 便利化委员会官方页面已取（[S16]），确认 FAL Convention 1965（as amended）+ IMO Compendium + Maritime Single Window 体系，且 IMO 官方将 "Port Call Optimization" 列为 FAL 相关链接——港务协同在 IMO 话语体系中归便利化而非安全，可作为我们"运营增强层"定位的佐证。
- **EU 1177/2010**：CELEX 官方 URL 确认有效（沙箱 202 反爬），异常天气免责等具体条文未取正文，**条款号暂不进作品**。
- **雅典公约 2002** 边界（只管伤亡/行李不管行程变更）：本轮未重新取证，沿用既有认知但标注"待核原文"。

### Q7（A 备选包）母港大风/台风关闭阈值 —— 🔴 无阈值证据

所有阈值数字（风速/浪高/能见度）本轮**一个都没有取到可引用来源**。页面设计中如出现阈值，只能用"按港章/引航规定"的定性表述，直到 §4 清单补齐。

### 额外收获（为 R2 预置的高价值来源）

- **[S13] WSC 2018《Modelling and Analysis of Intermodal Passenger Operations in a Cruise Terminal》**：邮轮客运站旅客多式联运作业的**离散事件仿真**论文——R2"登离船服务率/排队/DES 选型"的核心一手来源。
- **[S14] Ports 2025《Passenger Boarding Bridge Planning for Cruise Operations at PortMiami》**：迈阿密港邮轮登船桥规划——廊桥/通过能力参数的直接来源。
- [S8][S9][S11][S12] AIS 港口拥堵预测、ETA 机器学习、港务记录提取、到港优先策略——支撑 b0 弱信号"提前多久可能看见"（**提前量/误差数字待全文，当前不得声称**）。

---

## 2. 来源清单

| # | 题名 | 作者/出版 | 年 | 标识/URL | 类型 | 等级 |
|---|---|---|---|---|---|---|
| S1 | Decision Support for Port Visits（ch.11） | Haraldson, Lind, Paulsen, Ward, Watson, Zerem；In: *Maritime Informatics*, Springer | 2021 | 10.1007/978-3-030-50892-0_11 | 开放章节（已抓摘要+预览正文） | A |
| S2 | Digital Data Sharing for Enhanced Decision-Making（ch.10） | Bergmann, Chrysostomou, Primor；同上 | 2021 | 10.1007/978-3-030-50892-0_10 | 开放章节 | A |
| S3 | Maritime Informatics for Increased Collaboration（ch.8） | Bergmann, Eklund, Haraldson, Hoffmann, Lind, Ward, Zerem | 2021 | 10.1007/978-3-030-50892-0_8 | 开放章节 | A |
| S0 | *Maritime Informatics* 全书（开放获取） | Springer | 2021 | https://link.springer.com/book/10.1007/978-3-030-50892-0 | 专著 | A |
| S4 | Just in time vessel arrival system for dry bulk carriers | *Journal of Shipping and Trade* | 2023 | 10.1186/s41072-023-00141-0（被引18） | 论文（题录） | A |
| S5 | Anchoring current arrival practices in rhetoric: JIT arrival of tanker ships | *Cleaner Logistics and Supply Chain* | 2025 | 10.1016/j.clscn.2024.100197（被引3） | 论文（题录） | A |
| S6 | Modeling just-in-time arrival effects on short sea shipping | *Maritime Business Review* | 2025 | 10.1108/mabr-01-2025-0011（被引7） | 论文（题录） | A |
| S7 | Just-in-Time Port Call Optimization: Challenges and IT-Systems | IOP Conf. Ser. | 2024 | 10.1088/1742-6596/2867/1/012009（被引6） | 论文（题录，全文待取） | A |
| S8 | Prediction of container port congestion status and its impact on ship's time in port based on AIS data | *Maritime Policy & Management* | 2024 | 10.1080/03088839.2023.2165185（被引26） | 论文（题录） | A |
| S9 | Robust berth scheduling using machine learning for vessel arrival time prediction | *Flexible Services and Manufacturing Journal* | 2023 | 10.1007/s10696-022-09462-x（被引70） | 论文（题录） | A |
| S10 | Vessel Arrival Time to Port Prediction: A Uniform Approach Integrating Port Call Records with AIS | SSRN preprint | 2025? | 10.2139/ssrn.5004783 | 预印本 | B |
| S11 | Port call extraction from vessel location data for characterising harbour traffic | *Ocean Engineering* | 2024 | 10.1016/j.oceaneng.2024.116771（被引23） | 论文（题录） | A |
| S12 | The effects of pre-arrival vessel prioritisation strategies for port call coordination | 机构库 | 2025 | 10.25368/2025.286 | 论文（题录） | A |
| S13 | Modelling and Analysis of Intermodal Passenger Operations in a Cruise Terminal | Winter Simulation Conference | 2018 | 10.1109/WSC.2018.8632302（被引3） | 论文（题录，**R2 核心**） | A |
| S14 | Passenger Boarding Bridge Planning for Cruise Operations at PortMiami | ASCE Ports | 2025 | 10.1061/9780784486153.058 | 论文（题录，**R2**） | A |
| S15 | Methodological approach for safety assessment of cruise ship in port | *Safety Science* | 2015 | 10.1016/j.ssci.2015.07.013（被引21） | 论文（题录） | A |
| S16 | IMO Facilitation / FAL Convention 官方页 | IMO | 2026 访问 | https://www.imo.org/en/OurWork/Facilitation/Pages/Default.aspx（HTTP 200 已取） | 官方 | A |
| S17 | Regulation (EU) No 1177/2011 官方页 | EUR-Lex | 2011 生效 | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011R1177（URL 有效，正文反爬未取） | 官方法规 | A（待取正文） |
| S18 | USA: court decides on passenger complaint against cruise ship operator | *Int. Free Trade and the Americas* 案例注释 | 2012 | 10.1515/iftta.2012.2.3.21 | 二级法律文献（待核） | B |
| S19 | Cruise itinerary planning（书章） | CABI | 2017 | 10.1079/9781780646084.0524（被引2） | 专著章节（待取） | A |

访问日期均为 2026-09-16。Crossref 题录元数据（期刊、年份、被引）来自 api.crossref.org 实时返回。

---

## 3. 数字卡（2026-09-17 补：S7/B1 摘要已取得，原文归档 sources/S06）

| 数字 | 含义 | 来源 | 等级/注意 |
|---|---|---|---|
| 锚地等待占航次时长 **5–10%** | 锚泊期间辅机仍在耗油排碳 | [S7] IOP 2024《JIT Port Call Optimization: Challenges and IT-Systems》摘要 | A（摘要级；货运船舶样本，非邮轮） |
| 锚泊辅机油耗约 **15%** 航次船用燃油 | 同上 | 同上 | A（摘要级） |
| 提前共享码头/港口就绪通知，船舶可调速省油 **最高 21%** | "早通知"的经济价值 | 同上 | A（摘要级；上限值，不写为典型值） |
| 港口普遍 **FCFS 先到先服务** | 标准化到港协同远未普及的现状证据 | 同上 + [S4] J. Shipping & Trade 2023（摘要：FCFS remain widely applied） | A |

**仍空**：AIS 预测提前量/误差、边检服务率、风速阈值、赔付比例——待全文或手动源补齐。

---

## 4. 缺口清单与补法

### 4.1 需用户浏览器手动打开（沙箱被反爬，预计 15 分钟）——补齐后我负责整理入档

1. EU 1177/2011 全文，定位：延误/取消告知义务、"extraordinary circumstances/weather endangering safe operation"免责条款 → [S17 URL]
2. Carnival 船票合同：https://www.carnival.com/cruise-ticket-contract （找 itinerary change / right to deviate / force majeure / shore excursion / master's discretion 条款号原文）
3. Royal Caribbean：官网底部 Legal → Cruise Ticket Contract（旧直链已失效）
4. NCL：https://www.ncl.com/legal/cruise-ticket-contract（403，换浏览器/无痕）
5. MPA Singapore 港务通告：官网搜 "heavy weather" / "port marine circular"
6. 香港海事处：mardep.gov.hk → 搜 "tropical cyclone"（热带气旋期间船舶安排）
7. Port Canaveral / PortMiami：Port Condition（Whiskey/X-ray/Yankee/Zulu）页面
8. STM 现状：浏览器试开 stmvalidation.eu；搜 "SeaSWDN 2025 status" / IAPH PortCDM

### 4.2 可由我在后续轮次用学术通道补（OpenAlex UTC 午夜重置后）

- R1 残留：船代通知形式/BERMAN 使用（SMDG/UN/EDIFACT 文献 + 邮轮 turnaround 案例研究）；邮轮跳港判例（Westlaw 替代：Google Scholar 不可达 → 用 Crossref 法律期刊 + 中国裁判文书替代通道）
- R2（下一轮）：[S13][S14] 全文取客运参数；MLC 2006 rest hours；maritime crew scheduling；IMO MSC.1/Circ.1533 疏散指南边界
- R3：船等迟到游客 cutoff、schedule recovery/port omission
- R4：[S8][S9][S10] 全文取提前量/误差数字
- R5：母港天气阈值（中文港章/新闻，待 Bing 通道冷却或换 360/搜狗带 cookie）

---

## 5. 对 B 事件页面与架构的直接含义（本轮可落的设计结论）

1. **b1 通知屏不要画成标准数字接口直连**：现有 A 级证据只支持"港口协同生态是自愿共享时间戳的记录系统、货运为主、JIT 远未普及"，邮轮窗口变更的现实入口画成**港口代理邮件/即时消息/电话 → 抽取卡（AI 填槽）→ 值班员确认入库**最稳妥；这也让"现场补录=人工接管触发口④"有了真实业务依据，而不是我们造的交互。
2. **b0 X 弱信号屏可以引用 AIS 拥堵预测这一研究方向**（[S8][S9] 同行评议、被引 26/70），但在全文到手前，界面上只出现定性置信度（如"锚地等待偏离同时段基线"），**不出现具体提前小时数和准确率**。
3. **系统定位可借 IMO FAL 背书一句话**：港务协同在 IMO 体系中属便利化（FAL）议题——我们是运营便利层，不碰航行安全系统，与既有"不碰导航设备"红线同向。
4. **PortCDM 可作为答辩备用知识，不进正文**：若技术评委问"为什么不直接接 PortCDM"，答："PortCDM 是共享时间戳的 system of record、自愿参与、以货运港为主，且不替代代理的变更通知；我们把它当作未来可接入的输入适配器之一，输入三态标注。"
5. **阈值与法条在补齐前一律定性表达**：界面上不写死风速、不引条款号；用"依据港章与引航规定""依据船票合同 § 行程变更条款（占位）"，防止作品出现无法核验的硬数字。

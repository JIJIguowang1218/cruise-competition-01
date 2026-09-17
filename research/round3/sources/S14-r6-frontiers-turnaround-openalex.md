# R6 精简轮归档（邮轮 turnaround 内生脆弱性全文要点 + OpenAlex 检索结果）

> **资料原文归档（Markdown 化）**
> 来源：Frontiers in Marine Science 全文页（HTTP 200）+ api.openalex.org；2026-09-17
> 对应分析档：../r6-crew-pa-baselines.md

---

## 1. 核心收获：邮轮计划 turnaround 的阈值实证（Frontiers 全文）

**A voyage-level threshold analysis of planned turnaround vulnerability in cruise ports from an AIS big data perspective**
- DOI：10.3389/fmars.2026.1886400 ｜ *Frontiers in Marine Science* 2026 ｜ 全文开放（frontiersin.org/articles/10.3389/fmars.2026.1886400/full）
- 数据：美国 Marine Cadastre 逐日 AIS + 计划靠泊信息 + 气象 + 船舶特征；**3,238 个邮轮-港-日观测**
- 方法：固定效应、阈值回归、半小时区间模型、机制检验、异质性/调节分析
- 原文要点（节录自全文 Abstract/Introduction）：

> Cruise port operations are facing increasingly significant challenges in departure reliability amid frequent climate variability, port congestion, supply chain disruptions, and geopolitical risks. … focuses on whether port turnaround planning itself may constitute an endogenous source of vulnerability.


> **Results:** …a significant threshold-type nonlinear relationship between planned turnaround time and departure delay. **An 8.5-hour threshold is identified as the main data-driven cutoff, while a meaningful buffering effect is mainly observed within 8 hours.** The interval of 8.0–8.5 hours is better viewed as a transition range where marginal benefits begin to decline. Mechanism tests indicate that **actual berthing service time is the most stable primary transmission channel** of planned turnaround vulnerability, while port queuing pressure and berth occupancy pressure further modify the marginal effect…


> Compared with container transport, cruise port calls are subject to stricter time window constraints and require a higher level of service synchronization. During a single port call, multiple tasks must be completed simultaneously, including **passenger embarkation and disembarkation, cleaning and housekeeping, supply delivery, and terminal-side coordination**. Any delay in one task may compress the time available for subsequent operations…

**使用纪律**：美国港口样本、AIS 派生数据、2026 年单篇研究；8.5h 是数据驱动的统计阈值而非行业标准，引用时须注样本与口径。

## 2. OpenAlex 检索结果（本轮 5 查询，2026-09-17）

### title_and_abstract.search:cruise ship crew organization hotel department（total 0）

### title_and_abstract.search:passenger ship public address emergency announcement languages（total 0）

### title.search:cruise ship crew（total 49）
- https://doi.org/10.15585/mmwr.mm6911e2 | 2020 | c140 | Initial Investigation of Transmission of COVID-19 Among Crew Members During Quarantine of a Cruise Ship — Yokohama, Japan, February 2020
- https://doi.org/10.2807/1560-7917.es.2020.25.23.2000272 | 2020 | c59 | Descriptive study of COVID-19 outbreak among passengers and crew on Diamond Princess cruise ship, Yokohama Port, Japan, 20 January to 9 February 2020
- https://doi.org/10.1111/jtm.12215 | 2015 | c46 | Influenza Outbreaks among Passengers and Crew on Two Cruise Ships: a Recent Account of Preparedness and Response to an Ever-Present Challenge
- https://doi.org/10.1111/j.1708-8305.2012.00620.x | 2012 | c24 | Measles, Rubella, and Varicella Among the Crew of a Cruise Ship Sailing From Florida, United States, 2006
- https://doi.org/10.1109/jiot.2022.3228579 | 2022 | c13 | WiCrew: Gait-Based Crew Identification for Cruise Ships Using Commodity WiFi

### title_and_abstract.search:cruise turnaround time port operations（total 6）
- https://doi.org/10.1029/2004jd005030 | 2004 | c76 | Considering alternative input parameters in an activity‐based ship fuel consumption and emissions model: Reply to comment by Øyvind Endresen et al. on “Updated emissions from ocean shipping”
- https://doi.org/10.1016/j.scitotenv.2021.148198 | 2021 | c70 | Impacts of the COVID-19 epidemic on merchant ship activity and pollution emissions in Shanghai port waters
- https://doi.org/10.1029/2004jd004853 | 2004 | c58 | Substantiation of a lower estimate for the bunker inventory: Comment on “Updated emissions from ocean shipping” by James J. Corbett and Horst W. Koehler
- https://doi.org/10.3389/fmars.2026.1886400 | 2026 | c0 | A voyage-level threshold analysis of planned turnaround vulnerability in cruise ports from an AIS big data perspective
- None | 2019 | c0 | How logistics framed the design of the Brisbane international cruise terminal

### title_and_abstract.search:passenger ship mustering announcement multilingual SOLAS（total 0）

## 3. 未检出方向（记录在案）

- `cruise ship crew organization hotel department`：0 命中——邮轮酒店部组织架构无学术文献，属行业手册/公司体系（CLIA、船公司 SMS）。
- `passenger ship public address emergency announcement languages` / `…SOLAS multilingual`：0 命中——多语应急广播要求属 SOLAS/LSA 规则与船旗国解释，学术库不收录；需 IMO 官方文件（立 C17）。
- `cruise turnaround time port operations`：仅 6 条，多数不相关；唯一强相关即上方 Frontiers 2026；另有《How logistics framed the design of the Brisbane international cruise terminal》(2019, 无 DOI) 题录一条。

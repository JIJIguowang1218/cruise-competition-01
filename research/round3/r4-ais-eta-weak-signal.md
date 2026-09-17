# R4 AIS 弱信号、ETA 误差、港务事件识别与异常检测（第四轮资料查找）

> 版本：v0.1（2026-09-17）
> 任务书：`00-r0-data-model-inventory.md` §4 R4；服务 b0（20:40 锚地/拖轮/班期组合弱信号 → X 卡）
> 执行方式：3 个检索块（OpenAlex 复测+记录摘要、Crossref 两批、Unpaywall/OA 全文试探），时间盒收口
> 证据等级：A=官方/同行评议一手；B=行业/预印本；C=待核
> 原文归档：`sources/S11`（OpenAlex 重建摘要 6 篇 + Crossref 12 条 + 通道记录）

---

## 0. 通道记录

| 通道 | 状态 | 结果 |
|---|---|---|
| OpenAlex works 记录 | ✅ **额度已恢复** | 6 个关键 DOI 的摘要经 abstract_inverted_index 全部重建成功，成为本轮主通道 |
| Crossref 检索 | ✅ | 异常检测/ETA 两批，题录补全 |
| Unpaywall | ✅ API 可用 | 确认三篇 gold/hybrid OA 位置，但出版方页面仍反爬 |
| MDPI（jmse-12-01362 PDF/HTML） | ❌ 403（带浏览器 UA/Referer 仍拒） | 全文挂账 B18 |
| ScienceDirect（MTR PII S2666822X2500005X） | ❌ 反爬 | 全文挂账 B19 |
| HAL 仓储（hal-04400011v1） | ❌ Anubis 反爬挑战页 | B6 全文挂账保留 |

---

## 1. 逐问题结论

### Q1 AIS 能否提前看见港口拥堵/等待—— ✅ 方向证实，提前量数字仍缺

- **[B4 摘要现已取得]**《Prediction of container port congestion status and its impact on ship's time in port based on AIS data》（*Maritime Policy & Management* 2023/2024，被引 32，[S11]）：
  - 从 AIS 提取**三个指标**表征港口拥堵状态（强调可推广性），用 **XGBoost + SHAP** 同时预测拥堵状态与在港时间；
  - 关键量级：港口拥堵状态可使单船在港时间波动 **最高近 50 小时**；
  - 用途原文："help shipping companies to change their transportation schedules early to bypass ports with long waiting times or to arrange ships to enter the port earlier"。
- **缺口**：摘要只说"预测下一阶段拥堵"，**没有给出预测提前量（提前多少小时）与准确率**——全文 T&F 付费墙（B4 仍挂账）。因此 b0 屏仍只能显示定性置信度，不出现"提前 X 小时、准确率 Y%"。
- 样本是**集装箱港**，不是邮轮港——量级与方向可借，数字不可直接套用（C13）。

### Q2 ETA 预测误差到底多大—— ✅ 拿到两个可用锚点（口径差异极大，必须并列标注）

1. **MAE ≈ 100 分钟（真实航路尺度）**：《Enhancing Prediction Accuracy of Vessel Arrival Times Using Machine Learning》（*JMSE* 2024，被引 16，gold OA，[S11]）：东地中海公私 AIS 基站数据，六种 ML/DL 对比，**Random Forest MAE 99.9 分钟、XGBoost 105.0 分钟**；且论文**专门与船代提供的 ETA、简单计算法、近年文献四种模型做了基准对比**——这直接支持我们的叙事："现状的 ETA 本身就有 ~1–2 小时量级误差，系统的价值是融合多信号给区间，而不是假装精确"。
2. **MAPE 0.25%（近港短程尺度）**：《High-accuracy prediction of vessels' ETA in seaports: hybrid ML》（*Maritime Transport Research* 2025，被引 13，gold OA，[S11]）：波罗的海 AIS，Extra Trees+AutoGluon+LightGBM stacking，MAPE 0.25%；特征重要性=航速/距离/航向/船型。
   - **使用纪律**：0.25% 看起来"近乎完美"，摘要未给预测视界（horizon）；近港、短视界的百分比误差天然极小。**禁止把 0.25% 与 100 分钟 MAE 混为一个口径宣传**；二者并列时必须注明"航路尺度 vs 近港尺度"。
3. **B5 鲁棒靠泊**（FSMJ 2022/2023，被引 69）：ML 到港预测+**动态时间缓冲（DTB，长度随预测可靠性变化）**嵌入靠泊调度，结果排程偏差小于所有单一预测——这是 b0/b2"给区间、给缓冲、不给单点"的学术原型（摘要已在 S06/S11）。

### Q3 从 AIS 识别港务事件有多可靠—— ✅ 有验证率数字，支持三态标注

- **[B6 摘要现已取得]**《Port call extraction from vessel location data》（*Ocean Engineering* 2024，被引 23，[S11]）：加勒比海 2019 全年、**101 个港区、5,907 艘船、171,626 次挂靠**的自动提取；与港方统计和 **UNCTAD 数据比对，挂靠次数中位数偏差约 11%**。
- 解读：纯 AIS 反推港务事件**可用但天然有 ~10% 量级的事件计数偏差**——这正是 b0 弱信号卡坚持"AIS 派生信号=待证实输入，需人工确认才入库"的量化理由，也支持数据三态（已确认/推测/缺失）的 UI 标注。

### Q4 异常检测方法谱系—— ✅ 成熟活跃领域，我们选型不孤独

- 2026 年仍在密集产出：Transformer 轨迹预测实时异常检测（ECNCT 2026）、加权特征 DBSCAN+元启发式调参（SSRN 2026，17 维联合优化）、**AIS-LLM 统一框架**（IEEE Access 2026，被引 6，轨迹预测/异常/碰撞风险+可解释预测）、双模态异常检测（*RESS* 2026，被引 2）；
- 数据底座问题同样被专门研究：稀疏 AIS 航迹插值/航路点推断（*JMSE* 2023，被引 32，[S11] 有摘要）——AIS 时间间隔不规则、大时间缺口是常态。
- **对作品的含义**：b0 的 X 卡不需要自称智能体黑盒，可诚实表述为"规则阈值+时序异常检测的组合信号"，异常检测只负责**提请注意（remind-only）**，与既有 X 系列库外告警定位一致。

### Q5 AIS 数据质量本身—— ✅ 有权威综述为"弱信号"措辞背书

- 《The promises and perils of AIS data》（*ESWA* 2021，被引 95，[S11]）：阿姆斯特丹港定量噪声分析+领域专家访谈，结论噪声取决于设备、外部因素、人、密集交通等；
- 《How big data enriches maritime research – critical review of AIS applications》（*J. Navigation* 2019，被引 455，[S11]）：AIS 应用三阶段七领域综述（含 ship & port performance），卫星接收提升覆盖与质量；
- **直接用途**：b0 卡脚注/答辩话术——"AIS 存在设备、覆盖、密集交通导致的已知噪声（ESWA 2021），所以 20:40 的组合信号设计为弱信号+置信度，21:05 的代理通知才是人工确认事件"。

### Q6 拖轮/班期侧信号 —— 🔴 无独立来源，保持设计构造定性

- 本轮未检索拖轮调度 AIS 特征的公开研究；"锚地船舶数+拖轮动向+班期表"三组合是**我们的设计构造**，证据只支持"AIS 多指标拥堵状态可预测"这个一般形态。界面可出现该组合，但不宣称其经过行业验证。

---

## 2. 来源清单（R4 新增，均在 sources/S11）

| # | 题名（简称） | 出版/年 | DOI | 等级 | 取证状态 |
|---|---|---|---|---|---|
| 1 | Container port congestion status…AIS（XGBoost+SHAP，~50h） | MPM 2023/24，被引32 | 10.1080/03088839.2023.2165185 | A | OpenAlex 摘要全；全文 B4 挂账 |
| 2 | High-accuracy ETA in seaports（stacking，MAPE 0.25%） | Maritime Transp. Research 2025，被引13 | 10.1016/j.martra.2025.100133 | A | OpenAlex 摘要全；全文 B19 挂账 |
| 3 | Enhancing Prediction Accuracy of Vessel Arrival Times（MAE 99.9/105.0 min；vs 船代 ETA） | JMSE 2024，被引16 | 10.3390/jmse12081362 | A | OpenAlex 摘要全；MDPI 403，B18 |
| 4 | Robust berth scheduling + ML + DTB | FSMJ 2022，被引69 | 10.1007/s10696-022-09462-x | A | 摘要 S06/S11 |
| 5 | Port call extraction（171,626 calls；中位偏差 ~11%） | Ocean Eng. 2024，被引23 | 10.1016/j.oceaneng.2024.116771 | A | OpenAlex 摘要全；HAL 反爬 |
| 6 | Promises and perils of AIS data | ESWA 2021，被引95 | 10.1016/j.eswa.2021.114975 | A | OpenAlex 摘要全 |
| 7 | Critical review of AIS data applications | J. Navigation 2019，被引455 | 10.1080/01441647.2019.1649315 | A | OpenAlex 摘要全 |
| 8 | Interpolation-Based Inference…Sparse AIS | JMSE 2023，被引32 | 10.3390/jmse11030615 | A | Crossref 摘要全（S11） |
| 9 | AIS-LLM unified framework（异常/碰撞/预测） | IEEE Access 2026，被引6 | 10.1109/access.2026.3705215 | A（题录） | Crossref 题录 |
| 10 | Weighted-Feature DBSCAN AIS anomalies | SSRN 2026 | 10.2139/ssrn.7044240 | B 预印本 | Crossref 摘要 |
| 11 | Dual-modality vessel trajectory anomaly | RESS 2026，被引2 | 10.1016/j.ress.2026.112905 | A（题录） | Crossref 题录 |
| 12 | Real-Time Vessel Anomaly…Transformer | ECNCT 2026 | 10.1109/ecnct70535.2026.11661520 | B 会议 | Crossref 题录 |

访问日期 2026-09-17。

## 3. 数字卡

| 数字 | 含义 | 来源 | 使用纪律 |
|---|---|---|---|
| **MAE 99.9 / 105.0 分钟** | 东地中海航路到港预测最佳/次佳模型误差；**含与船代 ETA 的基准对比** | JMSE 2024 [S11] | **b0/b2 最可用数字**；注明东地中海、航路尺度、六模型对比 |
| **MAPE 0.25%** | 波罗的海近港 ETA stacking 模型误差 | MTR 2025 [S11] | 必须注明近港短视界、摘要未给 horizon；**不得与上一行混用** |
| **最高近 50 小时** | 拥堵状态导致的在港时间波动上限 | MPM 2023 [S11] | 集装箱样本、上限表述；只用于说明拥堵影响量级 |
| **~11%（中位数偏差）** | AIS 自动提取挂靠次数 vs 港方/UNCTAD 统计 | Ocean Eng. 2024 [S11] | 加勒比海 2019、101 港；作为"AIS 派生事件需确认"的量化依据 |
| 3 个指标 / XGBoost+SHAP | 拥堵状态表征与可解释建模 | MPM 2023 | 方法引用 |
| （空） | 邮轮港专属提前量、拖轮信号验证、弱信号组合准确率 | 无来源 | C13/C14；界面只做定性置信度 |

## 4. 缺口（同步 PENDING-FULLTEXT.md）

- **B4 全文**：预测提前量（小时）与准确率指标——b0"提前多久看见"的直接答案，T&F 付费墙；
- **B18（新）** JMSE 2024 全文（MDPI 403）：船代 ETA 基准的具体误差、分区段误差曲线；
- **B19（新）** MTR 2025 全文（ScienceDirect 反爬）：0.25% MAPE 的视界定义与样本航程；
- **C13（新）** 邮轮/客轮港 AIS 拥堵或等待预测——现有证据全部为货运港，不得外推数字；
- **C14（新）** 拖轮动向/锚地组合作为先导信号的公开验证（无来源，保持设计构造标注）；
- B5/B6 摘要已得，全文保留挂账（DTB 参数细节、提取方法阈值）。

## 5. 对 B 事件页面与架构的直接含义

1. **20:40 X 卡现在有完整的"弱信号三连"证据链**：①AIS 多指标确可预测港口状态（MPM 2023）；②AIS 反推港务事件天然 ~11% 偏差（Ocean Eng. 2024）；③AIS 噪声本身有权威研究背书（ESWA 2021）。因此卡片显示"组合异常信号 + 定性置信度 + 待确认"状态，正是文献支持的形态；21:05 代理通知到达后，人工确认把弱信号转成事件——**信号先于正式通知 25 分钟**的叙事有方法依据，但不写具体提前量数字。
2. **b2 核算屏的 ETA 输入应显示为区间**（如"船代 ETA 20:30±"），并可加一行方法学注释："航路到港预测的公开最佳水平约 ±100 分钟量级（东地中海 2024 研究），近港短程预测误差可显著更小"——把误差摆上屏本身就是 HARNESS 态度。
3. **动态时间缓冲（DTB）可以产品化**：b3 方案对每个时间点按预测可靠性显示缓冲带，学术原型是 FSMJ 2022 鲁棒靠泊调度。
4. **异常检测的表述口径**：规则+时序异常检测组合、remind-only、可解释（SHAP 类特征贡献可展示"锚地等待数↑、拖轮预约异动"两个贡献条），不使用任何模型厂商/框架名称。
5. **拖轮组合信号标注为"设计示例信号"**，答辩如被追问，回答"AIS 拥堵指标有文献，拖轮特征组合是我们的工程假设，需试点标定"。

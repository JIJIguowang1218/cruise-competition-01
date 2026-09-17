# S15：Vista 平台甲板/舱号标准样式 + IMO 1533 步行速度分布（R7 取证归档）

> 访问日期：2026-09-17
> 用途：演示船舶几何（§10 IA v0.3+）舱号编码、甲板分层、登船层、步行速度参数
> 通道说明：CruiseDeckPlans 主页面可抓（283KB），逐层甲板平面图为会员门控（83B 拒绝）；MDPI 官网 403 但 **mdpi-res.com PDF CDN 可直取全文（8.1MB，21 页）**

---

## 1. Carnival Vista 甲板清单与舱号编码（魔都号同平台）

来源：https://www.cruisedeckplans.com/DP/deckplans/carnival-vista（HTTP 200，2026-09-17 抓取，缓存 cache/cdpl_vista.html、cdpl_ship.html）

**甲板命名（共 14 个公共甲板层，无 13 层）：**

| Deck | 名称 | 备注 |
|---|---|---|
| 1 | Riviera | |
| 2 | Main | |
| 3 | **Lobby** | **登船大厅层（embarkation deck），行业标准形态** |
| 4 | Mezzanine | |
| 5 | Promenade | |
| 6 | Upper | |
| 7 | Empress | |
| 8 | Verandah | |
| 9 | Vista | |
| 10 | Lido | |
| 11 | Panorama | |
| 12 | Spa | |
| 14 | Sun | |
| 15 | Serenity | |

**舱号编码实证（页面原文实例）：**
- 4 位数舱号：7402、7326、7333、7378（Deck 7）；9205、9206（Deck 9）；5234、5210（Deck 5）；6461、6464（Deck 6）；8470（Deck 8）；7450、7446
- 5 位数舱号：11206（Deck 11）
- **编码规则确认：首位（甲板 1–9）或前两位（甲板 10+）= 甲板层号，余为序号**；同层序号连续，奇偶分居左右舷为行业惯例（odd=starboard/even=port，**本次未从平面图目视确认，标注待核**）

**船舶参数（同页事实区原文）：**
> "3930 to 4716 Passengers｜1055 ft Length｜122 ft Beam｜1965 Staterooms｜1450 Crew｜133500 Tons (internal volume)｜28 Space Ratio｜14 Public Decks｜12 Decks with cabins｜18.0 knots Speed"

换算：321.6 m 总长、37.2 m 型宽、1,965 间客舱、船员 1,450、133,500 GT。
**与魔都号官方口径（323.6 m / 37.2 m / 13.55 万吨 / 2,125 客舱 / 5,246 客）同平台、同量级**——魔都号即 Carnival Vista 平台国产化设计，本页是 5,000 人级演示船几何的直接参照。

**仍未取得（会员门控/站点反爬）：** 每层平面图本体（楼梯组/电梯组位置与数量、shell door 数量与所在层、左右舷舱号目视确认、走廊宽度）。沿用 PENDING A9 用户浏览器批次。

---

## 2. IMO MSC.1/Circ.1533 乘客步行速度分布表（经 2026 同行评议论文全文转录）

来源论文：《Effects of Different Evacuation Organization Strategies on Emergency Evacuation Characteristics in Cruise Ship Fire Scenarios》，*J. Mar. Sci. Eng.* 2026, 14, 1133，DOI 10.3390/jmse14121133，全文 PDF 经 mdpi-res.com 取得（缓存 cache/jmse14121133.pdf/.txt，21 页）。
论文 Table 3 标题原文："Demographic distribution and unimpeded walking speeds of passengers on Deck 11 **[27]**"，参考文献 [27] 原文：
> "27. MSC.1/Circ.1533; Revised Guidelines on Evacuation Analysis for New and Existing Passenger Ships. International Maritime Organization: London, UK, 2016."

**即该速度表直接转录自 IMO 1533 通函本身**（官方 PDF 仍未直接取得，C8 部分闭环：速度参数已有同行评议全文中的逐字转录）。

| Gender | Age | Mobility | Percentage (%) | Speed min (m/s) | Speed max (m/s) |
|---|---|---|---|---|---|
| Female | <30 | Normal | 7 | 0.93 | 1.55 |
| Female | 30–50 | Normal | 7 | 0.71 | 1.19 |
| Female | >50 | Normal | 16 | 0.56 | 0.94 |
| Female | — | Impaired (1) | 10 | 0.43 | 0.71 |
| Female | — | Impaired (2) | 10 | 0.37 | 0.61 |
| Male | <30 | Normal | 7 | 1.11 | 1.85 |
| Male | 30–50 | Normal | 7 | 0.97 | 1.62 |
| Male | >50 | Normal | 16 | 0.84 | 1.40 |
| Male | — | Impaired (1) | 10 | 0.64 | 1.06 |
| Male | — | Impaired (2) | 10 | 0.55 | 0.91 |

同文转录的 IMO 简化分析响应时间：
> "the response times are 5 min under daytime conditions and 10 min under nighttime conditions"

**使用纪律（不变）**：这是**应急疏散认证域**参数分布（年龄/性别/行动能力分组的自由流速度上下限），ClarSyn 运营客流模型不运行疏散分析；仅可作演示中"水平/楼梯步行速度"假设参数的**通函体系出处锚点**，参数台标注："IMO MSC.1/Circ.1533 分布（经 JMSE 2026 转录），运营场景非认证用途，取值待试点标定"。夜间 5/10 分钟响应时间同样属安全域，禁止外借为运营承诺。

论文其他可借用的定性事实：邮轮"复杂内部环境、狭窄走廊、有限疏散出口"；以 Deck 11 为高密度居住+公共混合层做全尺度几何模型（PyroSim/FDS）；邮轮按防火竖区（FVZ）和主防火区划分。

---

## 3. 廊桥/舷门标准：本轮仍无新增

- Crossref 新检仅得已知 B8（ASCE Ports 2025 PortMiami boarding bridge，付费墙）；ISO 7718 为**机场**登机桥接口标准，不适用；
- shell door 数量、登船廊桥配置仍只能标"演示假设，待 A9 甲板图/港章核实"；S07（Cox & Long 2004，≤2,000 pax/h）仍为唯一可引客运廊桥参数。

---

## 4. 本轮对 IA §10 的直接更新

1. 舱号编码由"行业惯例假设"升级为**实证规则**（Vista 平台 13 个实样例）：层号前缀+序号；奇偶左右舷仍待目视；
2. 甲板命名清单可直接借用为演示船层名体系（或对应中文化：3 层登船大厅层、5 漫步层、10 泳池层等），登船层=Deck 3 Lobby 有了同平台实证；
3. 船型规模参数从"按魔都号推断"升级为**双源同平台锚定**（魔都官方 + Vista 实船 133,500 GT/1,965 舱/1,450 船员/14 公共甲板/12 客舱层）；
4. 步行速度表以 1533 逐字转录值入参数台（运营外推仍标假设）；
5. 挂账更新：C8 状态部分闭环；A9 收窄为"逐层平面图本体"（楼梯/电梯组数量、shell door、奇偶舷侧）。

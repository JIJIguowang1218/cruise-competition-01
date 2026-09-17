# Crossref 检索结果归档（R2 收尾批次：通关服务率 / turnaround / 船员排班 / 渡轮排队）

> **资料原文归档（Markdown 化）**
> 来源：api.crossref.org/works 检索接口（4 个 query.bibliographic 查询，2026-09-17 拉取）
> 请求头：User-Agent: ClarsynResearch/0.1 (mailto:clarsyn.research@proton.me)
> 说明：返回字段为 Crossref 实时元数据（题名/出处/年份/被引/缴存摘要原文照录）；除注明外均无缴存摘要，全文挂账见 ../PENDING-FULLTEXT.md
> 对应分析档：../r2-passenger-crew-models.md

---

## Q1 airport security/service rate（filter from-pub-date:2015，rows=5）

1. **Effects of Baggage Volume and Alarm Rate on Airport Security Screening Checkpoint Efficiency using Queuing Networks and Discrete Event Simulation**
   - DOI：10.1002/hfm.20616 ｜ 2015 ｜ *Human Factors and Ergonomics in Manufacturing & Service Industries* ｜ 被引 17
   - 摘要：Crossref 未缴存（记录级二次确认仍无；全文待补 → 挂账 B13）
2. **Modeling the implementation of technology in a passenger security screening checkpoint at Amsterdam Airport Schiphol**
   - DOI：10.46354/i3m.2024.emss.022 ｜ 2024 ｜ Proc. 36th EMSS ｜ 被引 1
3. **Optimizing the Passenger Throughput at an Airport Security Checkpoint**（同题 3 篇，2017–2018 会议）
   - DOI：10.2991/mmetss-17.2017.1；10.2991/mecae-18.2018.24；10.2991/icemc-17.2017.148（被引 0/0/2）

## Q2 cruise terminal turnaround（from-pub-date:2010，rows=5）

1. **MODELLING AND ANALYSIS OF INTERMODAL PASSENGER OPERATIONS IN A CRUISE TERMINAL**
   - DOI：10.1109/WSC.2018.8632302 ｜ WSC 2018 ｜ 被引 3（即挂账 B7，邮轮客运站 DES 核心来源）
2. **Coupled passenger simulation to optimise the turnaround process and passenger flow.**
   - DOI：10.54941/ahfe1005554 ｜ AHFE 2024 ｜ 被引 1
   - 缴存摘要原文："The turnaround process at an airport is a crucial part of flight operations. It is a precisely choreographed sequence of activities and events to ensure aircraft depart on schedule. The individual turnaround processes with passenger movements of boarding and deplaning play a pivotal role, as they are on the critical path of the turnaround. Delays in any of these processes have an immediate impact on the duration of the entire process. If the delay is long enough to cause the flight to miss its scheduled departure slot, the delay will increase even more as a new available slot must be allocated. This in turn will cause further delay. Nevertheless, individual processes in the terminal and with…"（机场 turnaround，非邮轮，方法参考）
3. **Voyage Simulation Techniques as a Design Tool for Cruise Vessels**
   - DOI：10.3940/rina.pass.2011.14 ｜ RINA Design and Operation of Passenger Ships 2011
4. **Simulation of Passenger Evacuation Process in Cruise Ships Based on A Multi-Grid Model**
   - DOI：10.3390/sym11091166 ｜ *Symmetry* 2019 ｜ 被引 21（疏散安全域，边界证据再加一条）
5. **Case study: modelling passenger flows in Heathrow Terminal 5**
   - DOI：10.1057/jos.2011.4 ｜ *Journal of Simulation* 2011 ｜ 被引 11

## Q3 maritime crew rostering（from-pub-date:2010，rows=5）

- 命中集中于 Springer《Decision Support for Crew Rostering in Public Transit》（2014/2015，DOI 10.1007/978-3-658-08167-6）：
  - ch.3 **Crew Rostering: State of the Art**（…_3）
  - ch.5 **Mathematical Programming and Optimal Crew Rostering**（…_5）
  - ch.7 **Heuristics for Solving the Crew Rostering Problem**（…_7，被引 1）
- **海事专用 crew rostering 在该查询下无更多学术命中**（此前批次仅得 ICBAI 2024 灰狼算法一篇会议论文 10.1109/icbai62489.2024.10868809）——支持"海事排班文献薄、方法母体来自公交/航空"的判断。

## Q4 ferry/queue waiting（from-pub-date:2012，rows=5）

1. **Unintended consequences of optimizing a queue discipline for a service level defined by a percentile of the waiting time**
   - DOI：10.1016/j.orl.2016.10.011 ｜ *Operations Research Letters* 2016 ｜ 被引 8（排队论服务水平建模）
2. **Short-term prediction of vehicle waiting queue at ferry terminal based on machine learning method**
   - DOI：10.1007/s00773-016-0385-y ｜ *Journal of Marine Science and Technology* 2016 ｜ 被引 18
   - 摘要：Crossref 未缴存（记录级二次确认仍无；挂账 B14）——**海事场景排队预测**的直接同行评议来源，对象为渡轮车辆队列而非旅客
3. **Optimal Service Time Distribution for an M/G/1 Waiting Queue**
   - DOI：10.3390/axioms13090594 ｜ *Axioms* 2024 ｜ 被引 7（M/G/1 解析排队模型仍在产出，方法成熟性佐证）
4. Assessment of patient waiting time…（医疗排队，不相关，略）
5. Bulk-Service Queue with Batch Arrivals（10.1504/ijor.2025.10074081；批量服务排队理论，与批次登离船略相关）

**本轮结论性事实**：四个查询的摘要中**没有出现任何可引用的边检/安检通道服务率数值（人/分钟或秒/人）**；邮轮客运服务时间分布的公开参数仍只有 [S07] 廊桥 2,000 pax/hour（2004）一个设计值。

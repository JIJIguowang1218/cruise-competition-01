# 调研流⑧：竞品对标

> 主代理直接执行（用户临时指派提前开工） | 完成时间：2026-08-16 | 状态：完成
> 覆盖时间范围：2021–2026（检索时点 2026-08-16）
> 证据说明：本环境只能看到检索结果的标题/摘要，凡仅有标题支持的在引用列标注[标题]；未标注者不代表已展开全文核实。

## 0. 执行摘要（3–5 句）

邮轮数字体验方面，五大国际邮轮公司都有官方 App（Royal Caribbean App、MSC for Me、Princess MedallionClass、Carnival HUB、Disney Navigator），公开信息显示功能集中在值船、预订、导航与消息，**未发现任何一款把“实时拥挤度→推荐替代场所”做成端到端产品**。方向一的感知层已有成熟专用组件：Outsight（3D LiDAR 邮轮客流）、V-Count（邮轮 venue 计数）、March Networks/海康（人流计数摄像头）；推荐/分流闭环则无公开先例。机场与主题公园提供最成熟的可迁移范式：机场把实时等待时间推给旅客（LAS、Indy、Veovo、iinside、Zensors），主题公园用虚拟排队/付费免排队产品化运营排队。中国侧数字化集中在通关与港口（魔都号 10 秒通关、花城号 AI 无感登船、AR 智慧监管、天津边检），船上体验分流仍是空白。结论：**没有端到端直接竞品，但感知组件、导航组件、虚拟排队均有供应商，方向一的差异化只能建立在“船上场景集成 + 决策闭环”上，不能建立在单项技术上。**

## 1. Nugget 清单（原子证据）

| # | Nugget（单条观察） | 来源编号 | 证据等级 | 日期 | 原文引用/数据点 |
|---|---|:--:|---|---|---|
| 1 | Royal Caribbean Group 官方把 App 定位为“变革宾客体验”的载体 | S01 | L0 | n.d. | [标题] Royal Caribbean Group Transforms the Guest Experience Using Its Apps |
| 2 | Royal Caribbean 官网提供 App 功能指南，标题称 App 从 5 个方面改变邮轮体验 | S02 | L0 | n.d. | [标题] 5 ways Royal Caribbean's app changes cruising |
| 3 | 第三方粉丝站发布 RCI App 完整 walkthrough，说明 App 已进入成熟教程阶段 | S03 | L2 | 2021-12-31 | [标题] Royal Caribbean app walkthrough and tips |
| 4 | 2026 年春假拥挤主题文章给乘客 6 条“个人经验”式避挤建议，未提及 App 内实时拥挤度或自动分流 | S04 | L2 | 2026-03-23 | [标题] 6 tips I used to deal with the crowds |
| 5 | MSC 官方为 MSC for Me App 设立多语言产品页，是船上数字体验主入口 | S05 | L0 | n.d. | [标题] MSC For Me App |
| 6 | 行业媒体标题显示 MSC 已在全船队引入 AI Concierge 助手 | S06 | L1 | n.d. | [标题] MSC Cruises introduces AI Concierge fleetwide |
| 7 | Princess 官方 MedallionClass 页面存在，可穿戴设备是产品核心 | S07 | L0 | n.d. | [标题] Princess MedallionClass |
| 8 | Travel Weekly 称 Princess 可穿戴技术使其处于“服务宾客的独特位置” | S08 | L1 | n.d. | [标题] wearable tech puts it in 'unique position' to care for guests |
| 9 | Carnival 官方为 HUB App 设产品页，App 是船上服务入口 | S09 | L0 | n.d. | [标题] Carnival HUB App |
| 10 | Disney Cruise Line 官方发布 Navigator App 功能列表页 | S10 | L0 | n.d. | [标题] Features of the Navigator App |
| 11 | 2026 年已有第三方对主流邮轮 App 做横向评测 | S11 | L1 | 2026 | [标题] Best Cruise Line Apps 2026: Complete Review & Comparison |
| 12 | Outsight 官方专门发布“用 3D LiDAR 优化邮轮客流”方案页，是方向一感知层的直接组件竞品 | S12 | L0 | n.d. | [标题] Optimizing Passenger Flow on Cruise Ships with 3D LiDAR |
| 13 | V-Count 官网设有“邮轮乘客计数与场所分析”行业页，直接覆盖邮轮 venue 人流统计 | S13 | L0 | n.d. | [标题] Cruise Ship Passenger Counting & Venue Analytics |
| 14 | 行业媒体有专题讨论“邮轮排队技术可在不加人力前提下提升消费” | S14 | L1 | n.d. | [标题] Cruise Queue Tech That Can Lift Spend Without More Headcount |
| 15 | March Networks 在 GSX 2025 发布 AI3 360° 人流计数摄像头 | S15 | L0 | 2025 | [标题] March Networks Launches AI3 Counting Camera for 360° Visual Intelligence |
| 16 | 海康威视合作伙伴产品库存在专用客流统计摄像机 SKU | S16 | L0 | n.d. | [标题] 产品详情-产品中心-海康威视合作伙伴 |
| 17 | 拉斯维加斯 Harry Reid 机场官方宣布部署实时安检等待时间显示系统 | S17 | L0 | n.d. | [标题] New system at LAS displays real-time security wait times |
| 18 | NVIDIA 官网案例显示 Zensors AI 用于改善 Harry Reid 机场运营与旅客体验 | S18 | L0 | n.d. | [标题] Zensors AI Enhances Operations at Harry Reid Airport |
| 19 | 布达佩斯机场投资 Veovo 技术改善旅客流 | S19 | L1 | 2023 | [标题] Budapest Airport invests in Veovo technology to improve passenger flows |
| 20 | Veovo 的 Queue Balancer 产品在 Keflavik 机场用于转机旅客排队均衡 | S20 | L0 | n.d. | [标题] Keflavik Airport enhances transfer passenger experience with Veovo's Queue Balancer |
| 21 | 印第安纳波利斯机场官方宣布与 iinside 合作向旅客告知 TSA 检查点等待时间 | S21 | L0 | n.d. | [标题] Indy Airport Partners with iinside to Inform Passengers of Wait Times |
| 22 | Jackson 机场部署 iinside 旅客运动分析技术 | S22 | L1 | n.d. | [标题] Jackson Airport Installs Passenger Motion Analytics Technology from iinside |
| 23 | Disneyland Paris 官网提供虚拟排队 FAQ，虚拟排队是官方服务 | S23 | L0 | n.d. | [标题] Virtual Queue, Disneyland Paris |
| 24 | WDW News Today 发布 Disney Genie 服务完整指南（付费跳过排队体系） | S24 | L1 | 2021-12 | [标题] Full Guide to the NEW Disney Genie Service |
| 25 | TouringPlans 提供 Lightning Lane Multi Pass 使用教程，付费免排队产品成熟 | S25 | L2 | n.d. | [标题] How to Use Lightning Lane Multi Pass at Disney World |
| 26 | Universal Orlando 有 Virtual Line 说明页，虚拟排队机制独立成产品 | S26 | L2 | n.d. | [标题] Universal Orlando Virtual Line |
| 27 | ORCA AI 官方宣布感知能力扩展到 360° 视场 | S27 | L0 | 2026-03 | [标题] Orca AI extends situational awareness to full 360° Field of View |
| 28 | ORCA AI 的自主船感知技术获 ClassNK 船级社资格 | S28 | L1 | n.d. | [标题] Orca AI Receives ClassNK Qualification for Autonomous Ship Perception |
| 29 | Zelim 的 ZOE 成为首个获 ISO 认证的落水检测（MOB）系统 | S29 | L1 | 2026-04 | [标题] Zelim's ZOE Becomes First Fully Certified Man-Overboard Detection System |
| 30 | Ambassador Cruise Line 实际安装 MOB 检测与追踪系统 | S30 | L1 | n.d. | [标题] Ambassador Cruise Line installs MOB detection and tracking system |
| 31 | ABB 官方提供船舶能效咨询系统 OCTOPUS 产品页 | S31 | L0 | n.d. | [标题] ABB Ability Marine Advisory System OCTOPUS |
| 32 | Wärtsilä 官方发布 TwinShip 项目，用数字孪生支持脱碳决策 | S32 | L0 | 2024-10-24 | [标题] TwinShip project aims to improve access to reliable data for decarbonisation |
| 33 | Kongsberg K-Sim 用于海事培训与仿真 | S33 | L1 | 2025-06-12 | [标题] Kongsberg's K-Sim: Revolutionizing Maritime Training |
| 34 | Sea Machines 为自主船技术融资 1500 万美元 | S34 | L1 | n.d. | [标题] Sea Machines raises $15m for autonomous ship tech |
| 35 | MOL 为 12 艘 LNG 船部署预测性主机维护 | S35 | L1 | 2026-01-15 | [标题] MOL deploys predictive engine maintenance for 12 LNG carriers |
| 36 | 爱达·魔都号 2024 年首航平均每位旅客通关时长不超过 10 秒 | S36 | L1 | 2024-01-02 | [标题] 平均每位旅客通关时长不超10秒 |
| 37 | 花城号官方发布载有 AI 无感快速登离船、智能机器人多场景互动、智能客舱一站式服务、多屏数字无纸化系统 | S37 | L1 | 2026-05-19 | [标题] 第二艘国产大型邮轮爱达·花城号产品及首航季航线正式发布（要点与批1流②同源互证） |
| 38 | 上海口岸使用 AR 眼镜辅助智慧监管高效通关 | S38 | L1 | 2025-08-07 | [标题] AR眼镜帮忙智慧监管高效通关 |
| 39 | 重庆旅游集团曾发布“智慧邮轮”数字孪生平台（2021 智博会） | S39 | L1 | 2021-08-24 | [标题] 重庆旅游集团“智慧邮轮”数字孪生平台亮相智博会 |
| 40 | 天津边检 2026 年部署新锐系统装备支持港口智慧建设 | S40 | L1 | 2026-04-11 | [标题] 新锐系统装备加盟 天津边检支持港口智慧建设 |
| 41 | Infsoft 官方发布邮轮室内追踪与导航用例 | S41 | L0 | n.d. | [标题] Use Case Tracking and Navigation Cruise Ship |
| 42 | Waide Mobility 宣称提供基于 AI 平台的智慧邮轮导航 | S42 | L1 | n.d. | [标题] Smart Cruise Ship Navigation with Waide's AI Platform |
| 43 | 中国铁路期刊发表基于视频的车站客流风险状态智能辨识方法 | S43 | L0 | 2025-09 | [标题] 基于视频的车站客流风险状态智能辨识方法 |
| 44 | 中国铁道科学 2026 年发表铁路客站多粒度动态客流评估模型 | S44 | L0 | 2026 | [标题] 基于视频分析技术的铁路客站多粒度动态客流评估模型 |
| 45 | Quanergy 官方提供机场 LiDAR 客流分析产品页 | S45 | L0 | n.d. | [标题] Airport Passenger Flow Analytics |
| 46 | 招商伊敦号有官方 App 上架小米应用商店 | S46 | L1 | n.d. | [标题] 招商伊敦-小米应用商店 |
| 47 | 针对邮轮首日自助餐拥挤，公开互联网给出的是“经验贴”，而非产品或系统 | S47 | L2 | n.d. | [标题] The Clever Tip To Avoid At Least One Massive Crowd |
| 48 | 中国安全科学学报 2025 发表基于 YOLO11-DeepSort 的城市轨道交通客流预警模型 | S48 | L0 | 2025 | [标题] An early warning model for passenger flow status in urban rail transit stations |
| 49 | 专项检索“cruise ship app recommends less crowded venue”未返回任何端到端产品，只有个人经验与预约攻略 | S47 | L2 | n.d. | 检索结果仅 2 条：Traveler Blog 经验贴、CruiseShipTracking 餐饮预约攻略 |
| 50 | 专项检索“cruise passenger flow analytics recommend alternative venue AI”只返回 V-Count 行业页，未发现带推荐闭环的邮轮竞品 | S13 | L0 | n.d. | 检索结果仅 V-Count；公开网络无同款闭环产品 |


## 2. 来源清单

| 编号 | 来源名称 | 类型 | 证据等级 | 发布日期 | URL | 可信度判断 |
|---|---|:--:|---|---|---|---|
| S01 | Royal Caribbean Group 官方：App 变革宾客体验 | 见名称 | L0 | n.d. | https://www.royalcaribbeangroup.com/royal-caribbean-group-transforms-the-guest-experience | 官方页面标题直接陈述 App 战略定位 |
| S02 | Royal Caribbean 官方：App 功能指南 | 见名称 | L0 | n.d. | https://www.royalcaribbean.com/guides/5-ways-royal-caribbeans-app-changes-cruising | 官方功能指南页 |
| S03 | Royal Caribbean Blog：App walkthrough and tips | 见名称 | L2 | 2021-12-31 | https://www.royalcaribbeanblog.com/2021/12/31/royal-caribbean-app-walkthrough-and-tips | 第三方深度评测 |
| S04 | Royal Caribbean Blog：2026 春假拥挤应对 6 tips | 见名称 | L2 | 2026-03-23 | https://www.royalcaribbeanblog.com/2026/03/23/how-crowded-cruise-ships-during-spring-break | 个人经验式避挤，未见 App 实时分流 |
| S05 | MSC Cruises 官方：MSC for Me App | 见名称 | L0 | n.d. | https://www.msccruises.com/int/on-board/internet-and-apps/msc-for-me | 官方 App 页 |
| S06 | CruiseMapper：MSC Cruises introduces AI Concierge fleetwide | 见名称 | L1 | n.d. | https://www.cruisemapper.com/news/16188-msc-cruises-introduces-ai-concierge | 全船队 AI 助手部署 |
| S07 | Princess Cruises 官方：MedallionClass | 见名称 | L0 | n.d. | https://www.princess.com/en-int/ships-and-experience/princess-medallionclass | 官方可穿戴产品页 |
| S08 | Travel Weekly：Princess wearable unique position to care for guests | 见名称 | L1 | n.d. | https://travelweekly.co.uk/articles/393397/princess-cruises-wearable-tech-puts-it-in-unique-position-to-care-for-guests | 可穿戴差异化报道 |
| S09 | Carnival 官方：HUB App | 见名称 | L0 | n.d. | https://www.carnival.com/shipboard/funhub/funhub-landing | 官方 App 页 |
| S10 | Disney Cruise Line 官方：Navigator App features | 见名称 | L0 | n.d. | https://disneycruise.disney.go.com/en-sg/faq/navigator-app/features/ | 官方功能列表页 |
| S11 | CruiseShipTracking：Best Cruise Line Apps 2026 | 见名称 | L1 | 2026 | https://www.cruiseshiptracking.com/blog/best-cruise-apps-2026 | 2026 多品牌 App 横评 |
| S12 | Outsight 官方：3D LiDAR 优化邮轮客流 | 见名称 | L0 | n.d. | https://www.outsight.ai/insights/3d-lidar-for-cruise-ships-passenger-flow-tracking/ | 直接组件竞品 |
| S13 | V-Count 官方：邮轮乘客计数与场所分析 | 见名称 | L0 | n.d. | https://v-count.com/industries/cruise-ships/ | 直接组件竞品 |
| S14 | Worldports：Cruise Queue Tech 提升消费 | 见名称 | L1 | n.d. | https://www.worldports.org/cruise-queue-tech-that-can-lift-spend-without-more-headcount/ | 邮轮排队技术商业化讨论 |
| S15 | March Networks：AI3 360° 计数摄像头 GSX 2025 | 见名称 | L0 | 2025 | https://www.marchnetworks.com/news/march-networks-launches-ai3-counting-camera-for-360-visual-intelligence-at-gsx-2025/ | 人流计数摄像头 |
| S16 | Hikvision 官方：客流统计摄像机产品详情 | 见名称 | L0 | n.d. | https://partners.hikvision.com/product/detail/3b9bd95e | 通用客流计数 SKU |
| S17 | Harry Reid 机场官方：LAS 实时安检等待时间显示 | 见名称 | L0 | n.d. | https://news.harryreidairport.com/new-system-at-las-displays-real-time-security-wait-times/ | 机场官方发布 |
| S18 | NVIDIA 官方案例：Zensors AI at Harry Reid Airport | 见名称 | L0 | n.d. | https://www.nvidia.com/en-us/case-studies/zensors-ai-las-passenger-experience/ | 官方案例页 |
| S19 | International Airport Review：Budapest invests in Veovo | 见名称 | L1 | 2023 | https://www.internationalairportreview.com/budapest-airport-invests-in-veovo-technology-to-improve-passenger-flows/423728.article | 机场采购案例 |
| S20 | Veovo 官方：Keflavik Queue Balancer | 见名称 | L0 | n.d. | https://veovo.com/insights/news/keflavik-airport-queue-balancer | 排队均衡器产品 |
| S21 | Indianapolis 机场官方：iinside 向旅客显示 TSA 等待时间 | 见名称 | L0 | n.d. | https://www.ind.com/about/media/media-releases/indy-airport-partners-with-iinside-to-inform-passengers-of-wait-times-at-tsa-checkpoints | 机场官方发布 |
| S22 | Airport Improvement：Jackson 机场部署 iinside | 见名称 | L1 | n.d. | https://airportimprovement.com/article/jackson-medgar-wiley-evers-international-airport-installs-passenger-motion-analytics-technology-from-iinside/ | 机场媒体采购报道 |
| S23 | Disneyland Paris 官方：Virtual Queue FAQ | 见名称 | L0 | n.d. | https://www.disneylandparis.com/en-gb/faq/theme-parks/virtual-queue | 官方虚拟排队说明 |
| S24 | WDW News Today：Disney Genie Service 完整指南 | 见名称 | L1 | 2021-12 | https://wdwnt.com/2021/12/full-guide-to-the-new-disney-genie-service-for-disneyland-resort/ | 付费免排队体系 |
| S25 | TouringPlans：Lightning Lane Multi Pass 教程 | 见名称 | L2 | n.d. | https://touringplans.com/blog/how-to-use-lightning-lane-pass-disney-world-guide-faq-llmp-llsp/ | 付费免排队教程 |
| S26 | TouringPlans：Universal Orlando Virtual Line | 见名称 | L2 | n.d. | https://c.touringplans.com/universal-orlando/virtual-line | 虚拟排队说明页 |
| S27 | ORCA AI 官方：360° situational awareness 扩展 | 见名称 | L0 | 2026-03 | https://www.orca-ai.io/resource/orca-ai-extends-situational-awareness-to-full-360-field-of-view/ | 官方产品发布 |
| S28 | Maritime Executive：Orca AI 获 ClassNK 自主感知资格 | 见名称 | L1 | n.d. | https://maritime-executive.com/corporate/orca-ai-receives-classnk-qualification-for-autonomous-ship-perception | 船级社认证 AI 感知 |
| S29 | Cruise Industry News：Zelim MOB 系统获 ISO 认证 | 见名称 | L1 | 2026-04 | https://cruiseindustrynews.com/cruise-news/2026/04/zelims-man-overboard-detection-system-becomes-iso-certified/ | 落水检测认证 |
| S30 | Worldports：Ambassador Cruise Line 安装 MOB 系统 | 见名称 | L1 | n.d. | https://www.worldports.org/ambassador-cruise-line-installs-mob-detection-and-tracking-system/ | 邮轮实际安装案例 |
| S31 | ABB 官方：Marine Advisory System OCTOPUS | 见名称 | L0 | n.d. | https://new.abb.com/marine/energy-efficiency/energy-guide/abb-ability-marine-advisory-system-octopus | 船舶能效咨询 |
| S32 | Wärtsilä 官方：TwinShip 项目 | 见名称 | L0 | 2024-10-24 | https://www.wartsila.com/can/media/global-news/24-10-2024-twinship-project-aims-to-improve-access-to-reliable-data-for-aiding-in-shipping-decarbonisation-3556229 | 数字孪生脱碳决策 |
| S33 | Maritime Technology Review：Kongsberg K-Sim | 见名称 | L1 | 2025-06-12 | https://maritimetechnologyreview.com/2025/06/12/kongsbergs-k-sim-revolutionizing-maritime-training-with-advanced-simulation/ | 海事仿真培训 |
| S34 | The Digital Ship：Sea Machines raises $15m | 见名称 | L1 | n.d. | https://thedigitalship.com/news/electronics-navigation/sea-machines-raises-15m-for-autonomous-ship-tech/ | 自主船融资 |
| S35 | Smart Maritime Network：MOL 12 艘 LNG 预测性维护 | 见名称 | L1 | 2026-01-15 | https://smartmaritimenetwork.com/2026/01/15/mol-global-ship-management-deploys-predictive-engine-maintenance-for-12-lng-carriers/ | 预测维护商业部署 |
| S36 | 北京青年报：魔都号首航每人通关不超10秒 | 见名称 | L1 | 2024-01-02 | https://news.ynet.com/2024/01/02/3713502t2518.html | 中国邮轮数字化通关 |
| S37 | 羊城晚报：花城号 AI 无感登船等智能系统 | 见名称 | L1 | 2026-05-19 | https://news.ycwb.com/ikimvkntjb/content_54127676.htm | 新船前装智能系统 |
| S38 | 东方财富：上海口岸 AR 眼镜智慧监管高效通关 | 见名称 | L1 | 2025-08-07 | https://finance.eastmoney.com/a/202508073478759485.html | 口岸智慧监管 |
| S39 | 人民网重庆：智慧邮轮数字孪生平台亮相智博会 | 见名称 | L1 | 2021-08-24 | http://cq.people.com.cn/n2/2021/0824/c367889-34881474.html | 中国智慧邮轮先例 |
| S40 | 北方网：天津边检新锐系统装备支持智慧港口 | 见名称 | L1 | 2026-04-11 | http://news.enorth.com.cn/system/2026/04/11/059310502.shtml | 邮轮港智慧化 |
| S41 | Infsoft 官方：邮轮室内追踪与导航用例 PDF | 见名称 | L0 | n.d. | https://www.infsoft.com/wp-content/uploads/infsoft-Use-Case-Tracking-und-Navigation-Kreuzfahrtschiff.pdf | 室内定位导航 |
| S42 | Waide Mobility：AI 平台智慧邮轮导航 | 见名称 | L1 | n.d. | https://www.waidemobility.org/blog/cruise-ship-navigation.html | 厂商博客 |
| S43 | 中国铁路期刊：视频车站客流风险智能辨识 | 见名称 | L0 | 2025-09 | https://wap.cnki.net/touch/web/Journal/Article/TLZG202509020.html | 铁路客流学术 |
| S44 | 中国铁道科学：铁路客站多粒度动态客流模型 | 见名称 | L0 | 2026 | https://castjournals.cast.org.cn/joweb/zgtdkx/EN/10.3969/j.issn.1001-4632.2026.02.21 | 铁路客流学术 |
| S45 | Quanergy 官方：机场 LiDAR 客流分析 | 见名称 | L0 | n.d. | https://quanergy.com/airport-passenger-flow-analytics/ | LiDAR 机场客流 |
| S46 | 小米应用商店：招商伊敦 App | 见名称 | L1 | n.d. | https://r.app.xiaomi.com/details?id=com.zsck.zsgy | 中国邮轮 App 存在性 |
| S47 | Traveler Blog：首日自助餐避挤经验贴 | 见名称 | L2 | n.d. | https://travelerblog.us/1477599/buffet-tip-skip-first-day-cruise-crowd/ | 经验贴而非产品 |
| S48 | 中国安全科学学报：YOLO11-DeepSort 城轨客流预警 | 见名称 | L0 | 2025 | http://www.cssjj.com.cn/EN/10.16265/j.cnki.issn1003-3033.2025.09.0600 | 中国客流预警算法 |

## 3. Pattern 候选（≥3 个独立来源才能成立）

| Pattern | 涉及 nugget | 独立来源数 | 置信度 | 说明 |
|---|---|:--:|---|---|
| P1 国际邮轮 App 是标配，公开功能以值船/预订/导航/消息为主，未见实时拥挤度分流 | #1,#2,#3,#5,#7,#9,#10,#11 | 8 | Strong | 多品牌官方页互证 App 标配；分流功能为“未发现”而非“确定不存在” |
| P2 邮轮人流感知已有专用商业组件 | #12,#13,#14,#15,#16 | 5 | Strong | LiDAR 与摄像头两条技术路线都有邮轮/通用产品 |
| P3 机场已把实时等待时间与客流分析做成面向旅客的产品 | #17,#18,#19,#20,#21,#22,#45 | 7 | Strong | 从单点显示到 curb-to-gate 全流程，方向一可整段迁移 |
| P4 主题公园虚拟排队成熟，且向付费免排队演进 | #23,#24,#25,#26 | 4 | Strong | 邮轮可借用“预约制”而不只做信息展示 |
| P5 海上 AI 在航行感知/MOB/能效维护三个方向已分别商业落地 | #27,#28,#29,#30,#31,#32,#35 | 7 | Strong | 证明船级社/邮轮公司接受 AI 感知与预测系统 |
| P6 中国邮轮数字化先强在通关与港口，不在舱内体验分流 | #36,#37,#38,#39,#40,#46 | 6 | Strong | 前装智能系统已有先例（花城号），但没有客流分流产品 |
| P7 未发现“实时拥挤度→推荐替代场所”的端到端邮轮竞品 | #49,#50 | 2（且为负证据） | Emerging | 负证据受检索能力限制，只能证明公开网络无同款，不能证明邮轮公司内部未做 |

## 4. 矛盾证据（不得删除）

| 主题 | 证据 A | 证据 B | 影响 |
|---|---|---|---|
| 邮轮是否已有排队/分流技术 | S14 标题显示 Cruise Queue Tech 已有商业化讨论 | #49/#50 未找到任何具体邮轮品牌部署实时分流的公开证据 | 不能下“完全空白”结论，保留“可能有未公开内部方案”的可能 |
| 感知技术路线 | S12 Outsight 用 3D LiDAR（利于隐私、受光照影响小） | S15/S16 March Networks/海康用摄像头计数（成本低、可复用安防相机） | 方案选型不是唯一解；隐私与成本权衡需结合流⑥法规再定 |
| 邮轮 App 能力边界 | S01–S11 显示各品牌官方 App 存在且功能丰富 | 检索无法打开功能全文，是否含拥挤度未知 | 竞品功能表必须分“公开可验证”与“待人工核验”两栏 |
| 个体追踪 vs 仅计数 | S07/S08 Medallion 以个体可穿戴定位实现个性化服务 | 方向一设计主张“仅计数不识别” | 两条路线在隐私合规与体验深度上直接对立，方案书必须写清取舍 |

## 5. 与旧文档结论的对照

| 旧结论（design/direction-1-deep-dive.md） | 本流证据 | 判定 |
|---|---|---|
| “摄像头+AI 实时感知客流”是方案核心创新点 | S12/S13/S15/S16：感知层已有 Outsight、V-Count、March Networks、海康等成熟组件 | 更新：感知不是创新点，应定位为“成熟组件集成” |
| “App/船载屏实时热力图+导航+分流推荐”整体无先例 | #1–#11 邮轮 App 无分流功能；#49/#50 专项检索无端到端竞品 | 部分确认：公开网络未见同款闭环；但负证据为 Emerging，需保守表述 |
| “新船前装摄像头规划是优势” | S37：花城号已前装 AI 无感登船等智能系统；S12–S16 组件均可采购 | 更新：前装方向正确，但船东同样可采购组件，优势必须转向场景数据与运营闭环 |
| “双层架构（规则引擎+LLM）、OODA 循环”构成技术壁垒 | 竞品侧无同架构公开先例；但各层组件均可市场获得 | 仍无法验证壁垒性：工程可差异化，技术本身无排他性 |
| “仅计数不识别”是隐私策略 | S07/S08 国际头部用个体定位换个性化；国内花城号用 AI 无感登船 | 更新：隐私路线存在两种主流选择，方案需在流⑥法规基础上明确取舍 |
| Demo 参考 Globot Shield 高保真 Mock | 本流未发现与 Demo 形态冲突的竞品 | 确认：可继续沿用 |

## 6. 数据断点与后续建议

1. **各邮轮 App 的完整功能清单不可见**：官方页与应用商店描述未能展开，无法逐项确认是否含拥挤度/排队时间。建议人工登录 App Store/Google Play 页面或下载 App 核对。
2. **Outsight/V-Count/March Networks 的邮轮客户名单、单价、部署规模均未公开**：只知道产品存在，不知道行业真实采用率。建议查其新闻稿/招投标/展会演讲。
3. **邮轮公司内部是否已用客流数据做运营决策**：公开检索无证据，可能属商业机密。Gate 1 时可把“船东是否已有同类规划”列为访谈问题。
4. **中国邮轮 App（爱达/招商伊敦）功能细节缺失**：仅能确认 App 存在，体验层信息极少，需人工下载或联系运营方。
5. **机场/乐园的 ROI 数据未获取**：等待时间下降、收入提升的量化效果对方案书价值高，建议写方案书前专项补充。
6. **LiDAR 与摄像头的船级社认证差异**：S27/S28 是航行感知认证，客流计数传感器在邮轮的合规要求需流⑥结论交叉验证。

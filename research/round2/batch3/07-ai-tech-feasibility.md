# 调研流⑦：AI 技术可行性

> 主代理直接执行（子代理深度上限触发）| 完成时间：2026-08-16 | 状态：完成
> 覆盖时间范围：2024–2026（检索时点 2026-08-16）
> 检索方式：web_search 多轮中英文检索
> 证据说明：本环境 bash 无外网、无法展开全文；凡仅由检索结果标题/摘要支持的项目，引用列标注[标题]或[摘要]；未标注者不得视为全文核实。

## 0. 执行摘要（3–5 句）

人群计数与密度感知是七个技术域中证据最成熟的：YOLO 系轻量模型持续有 2025–2026 学术部署案例，商用客流计产品已宣传 99%+ 精度，NVIDIA Metropolis/DeepStream 提供现成 occupancy analytics 参考实现，双目客流一体机在国内已是成熟品类。边缘推理同样可行：Jetson 系列、Raspberry Pi AI HAT+（40 TOPS、公开价 130 美元）和 0.3B–8B 级中文端侧模型都有 2026 年公开证据，说明「本地 NUC 级推理 + 离线小模型」在工程上成立。最大风险不在算法而在数据与合规：检索结果未能复现旧文档「YOLO 人流计数 95%+」的精确出处，人脸识别在邮轮登离船已商用（温哥华、MSC、巴西），因此「仅计数不识别」必须作为显式合规设计而非默认能力；卫星回传与船上定位的公开量化指标分散且口径不一，3 分钟 OODA 周期只能按「船载局域网内闭环」成立，不能依赖卫星。

## 1. Nugget 清单（原子证据）

| # | Nugget（单条观察） | 来源编号 | 证据等级 | 日期 | 原文引用/数据点 |
|---|---|:--:|---|---|---|
| 1 | Scientific Reports 2025 发表 Dense-stream YOLOv8n：面向智能图书馆实时人群监控的轻量化框架 | S01 | L0 | 2025 | [标题] "Dense-stream YOLOv8n: a lightweight framework for real-time crowd monitoring in smart libraries" |
| 2 | IEEE 收录 Real-Time People Counting and Occupancy Monitoring using Integrated CCTV Systems，表明「普通 CCTV + 实时人数统计」仍是活跃工程方向 | S02 | L0 | 2025 | [标题] "Real-Time People Counting and Occupancy Monitoring using Integrated CCTV Systems" |
| 3 | WACV 2026 Workshop 收录 CHURI：面向零售跟踪的资源智能型系统，CV 人流分析继续向轻量化演进 | S03 | L0 | 2026 | [标题] "CHURI: Contour-Gated, Resource-Intelligent Retail Tracking System" |
| 4 | 商用视觉人数计数相机已有专门市场报告（Visual People Counting Camera Market, 2026–2032 全球预测） | S04 | L1 | 2026 | [标题] "Visual People Counting Camera Market by Technology, Deployment Mode, Form Factor, Accuracy Level, Application - Global Forecast 2026-2032" |
| 5 | 商用客流计厂商 V-Count 产品页宣传 99%+ 超高精度人数计数器 | S05 | L1 | n.d. | [标题] "99 %+ ultra-high accuracy people counter V-COUNT" |
| 6 | V-Count 的 2026 买家指南把精度、类型、成本作为选型主维度，说明精度/成本有公开比较框架 | S06 | L1 | 2026 | [标题] "What Is a People Counter? Types, Accuracy, and Costs Explained (2026 Buyer's Guide)" |
| 7 | 有厂商宣称 AI On-Camera People Counting 无需专用传感器（利用既有摄像头做人数统计） | S07 | L1 | n.d. | [标题] "AI On-Camera People Counting: No Dedicated Sensors Needed" |
| 8 | 腾讯云开发者社区文章解析门店客流统计系统：AI 视觉 + 大数据 + 边缘计算的技术架构 | S08 | L1 | n.d. | [标题]《门店客流统计系统技术架构解析：AI视觉、大数据与边缘计算如何提升转化率分析准确性》 |
| 9 | 国内 2026 年已有「双目客流一体机」行业观察文章，主题为技术与场景驱动的五大实力厂家，说明双目客流计是成熟品类 | S09 | L2 | 2026 | [标题]《2026双目客流一体机行业观察：技术与场景驱动的五大实力厂家深度分析》 |
| 10 | NVIDIA Metropolis Microservices 官方文档提供 MDX 视频分析微服务介绍 | S10 | L0 | n.d. | [标题] "Metropolis Microservices" |
| 11 | NVIDIA-AI-IOT 官方 GitHub 提供 deepstream-occupancy-analytics：人数进出统计 + 实时占用分析参考实现 | S11 | L0 | n.d. | [标题] "deepstream-occupancy-analytics ... counting people entering/leaving in a building using NVIDIA Deepstream SDK" |
| 12 | SmartCow 基于 NVIDIA Metropolis 推出 SmartCam 边缘 AI 相机，用于实时 occupancy analytics | S12 | L1 | n.d. | [标题] "SmartCow Uses NVIDIA Metropolis Platform to Launch SmartCam: Edge AI Camera for Real-Time Occupancy Analytics" |
| 13 | NVIDIA 官方博客介绍 Motionloft 用 Jetson 做实体零售人流分析（拉斯维加斯/波士顿） | S13 | L0 | n.d. | [标题]《新創公司部署採用人工智慧的電腦視覺技術，讓實體零售商也能取得人流資料》 |
| 14 | 英伟达 Jetson 全线大幅涨价（最高翻倍），国产「山海」智算模组被作为替代方案报道 | S14 | L1 | 2026-08-07 | [标题]《英伟达Jetson大幅涨价 理工雷科推出“山海”智算模组提供国产替代方案》 |
| 15 | Jetson Orin NX 16GB 模组有现货渠道在售，宣传「5 倍性能跃升」，说明边缘算力采购有现货与国产替代两条路 | S15 | L2 | n.d. | [标题]《边缘AI小钢炮现货直达！Jetson Orin NX 16GB模组，5倍性能跃升》 |
| 16 | NVIDIA 官方在售 Jetson Orin Nano Super 开发者套件（官方页面可见） | S16 | L0 | n.d. | [标题] "Jetson Orin Nano Super 開發者套件" |
| 17 | Raspberry Pi AI HAT+ 2 发布：40 TOPS AI 加速器，公开报道价格 130 美元 | S17 | L1 | 2026-01 | [标题] "Raspberry Pi AI HAT+ 2 Launches: 40 TOPS AI Accelerator for $130" |
| 18 | Tom's Hardware 对 Raspberry Pi AI HAT+ 2 做了评测（The brains and the brawn） | S18 | L1 | 2026 | [标题] "Raspberry Pi AI HAT+ 2 Review: The brains and the brawn" |
| 19 | M5Stack 发布 AI Pyramid 迷你电脑：24 TOPS NPU，宣传支持影像、多模 AI 与 LLM 推理 | S19 | L1 | 2026 | [标题]《M5Stack推出金字塔造型的AI Pyramid迷你電腦，具24 TOPS NPU可支援影像、多模AI與大型語言模型推論》 |
| 20 | 国内 2026 年边缘计算盒子市场已有 6→16→32TOPS 档位与性价比分析文章 | S20 | L2 | 2026 | [标题]《6TOPS→16TOPS→32TOPS：算力盒子市场档位与性价比真相》 |
| 21 | 2026 年边缘计算趋势文章称 3TOPS 算力盒子成中小厂商标配 | S21 | L2 | 2026 | [标题]《2026年边缘计算新趋势：3TOPS算力盒子成中小厂商标配》 |
| 22 | 腾讯混元开源 0.3B 端侧模型，报道称内存占用仅 600MB | S22 | L1 | 2025 | [标题]《騰訊混元開源0.3B端側模型 內存佔用僅600MB》 |
| 23 | 百度百科收录腾讯混元 HY-1.8B-2Bit：面向消费级硬件场景的极小语言模型 | S23 | L1 | n.d. | [标题]《HY-1.8B-2Bit模型 - 腾讯混元推出的面向消费级硬件场景的极小语言模型》 |
| 24 | 2026 年「国内外主流边端大模型深度分析：从技术架构到部署选型」已形成系统性选型指南 | S24 | L2 | 2026 | [标题]《2026年国内外主流边端大模型深度分析：从技术架构到部署选型全指南》 |
| 25 | 企业私有部署 DeepSeek/Qwen 有 2026 年模型选型 + 硬件 + 成本测算文章 | S25 | L2 | 2026 | [标题]《企业私有部署 DeepSeek / Qwen：模型选型 + 硬件 + 成本测算（2026）》 |
| 26 | 工控机部署千问 8B 大模型有工程案例文章，证明「工控机级硬件跑 8B 中文 LLM」可落地 | S26 | L2 | 2026-07 | [标题]《工控虾，工业控制插上大模型的翅膀，工控机部署千问8B大模型》 |
| 27 | GitHub 项目 nano-inference：CUDA LLM 引擎，宣称在 Jetson Orin 上比 llama.cpp 快 1.8× | S27 | L2 | n.d. | [标题] "nano-inference: CUDA LLM engine that beats llama.cpp 1.8× on a Jetson Orin" |
| 28 | 学术论文 Benchmarking LLM Inference on Limited-Resource Edge Systems（Electronics 2026）说明边缘 LLM 推理有基准研究 | S28 | L0 | 2026 | [标题] "Benchmarking Large Language Model Inference on Limited-Resource Edge Systems" |
| 29 | Wi-Fi Fine Time Measurement（FTM）有最新综述，覆盖原理、应用与趋势，是船上 WiFi 定位的候选技术 | S29 | L0 | 2025 | [标题] "Wi-Fi fine time measurement–Principles, applications, and future trends: A survey" |
| 30 | 学术研究提出隐私保护设计：基于 Wi-Fi 被动 TDOA 的室内定位系统 | S30 | L0 | 2023 | [标题] "Privacy-Preserving by Design: Indoor Positioning System Using Wi-Fi Passive TDOA" |
| 31 | 已有论文研究移动船舶环境下的无线人体运动跟踪（Deep-Learning-Based Wireless Human Motion Tracking for Mobile Ship Environments） | S31 | L0 | 2022 | [标题] "Deep-Learning-Based Wireless Human Motion Tracking for Mobile Ship Environments" |
| 32 | 阿里云开发者/电子发烧友文章对比蓝牙信标、UWB 等主流室内定位技术的参数与选型 | S32 | L2 | n.d. | [标题]《蓝牙信标、UWB等主流室内定位无线技术的参数对比、核心算法和选型指南详解》 |
| 33 | 2025 年中国高精度定位技术总结文章覆盖主流技术，UWB/BLE 是常用室内方案 | S33 | L2 | 2025 | [标题]《2025年中国高精度定位技术总结分析》 |
| 34 | 海洋数字孪生市场报告（2026–2032）点名 Siemens、Dassault、ABB、Wärtsilä、Kongsberg 等主要玩家 | S34 | L1 | 2026-05 | [标题] "Digital Twin in Marine Market Report 2026-2032 Featuring Siemens, Dassault Systemes, ABB, Wartsila, Kongsberg Maritime and Other Key Players" |
| 35 | 行业媒体讨论虚拟孪生作为船级与全生命周期管理的未来（virtual twins for ship class, lifecycle management） | S35 | L1 | n.d. | [标题] "Virtual twins: the future for ship class, lifecycle management" |
| 36 | 中国船级社 2025-12 举办船舶数字与智能技术交流会，官方渠道持续推动船舶数字化智能化 | S36 | L0 | 2025-12 | [标题]《中国船级社举办船舶数字与智能技术交流会》 |
| 37 | 《智能船舶规范》(2025) 文本可公开检索到（文档站），可作 CCS 对智能船舶要求的权威依据 | S37 | L1 | 2025 | [标题]《智能船舶规范》(2025) |
| 38 | 中国船级社颁发全球首张船舶数字化交付系统 GDA 证书 | S38 | L1 | n.d. | [标题]《中国船级社颁发全球首张船舶数字化交付系统GDA证书》 |
| 39 | IMO 通过首个全球自动驾驶船舶规范（MASS Code），官方新闻稿中英文可查 | S39 | L0 | 2025-12 | [标题] "IMO adopts first global Code for autonomous ships" |
| 40 | 港口/邮轮行业媒体将 MASS Code 解读为「AI 技术推进下的安全规范」 | S40 | L1 | 2025 | [标题] "IMO adopts safety code for autonomous ships as AI tech advances" |
| 41 | ACM 2025 论文提出 CNN-Transformer-ResLSTM-Attention 混合模型，用于城市交通乘客流时空预测 | S41 | L0 | 2025 | [标题] "CNN-Transformer-ResLSTM-Attention: A Hybrid Deep Learning Framework for Spatiotemporally Predicting Urban Transit Passenger Flow" |
| 42 | Nature 期刊论文 GEME-Net 提供客流预测误差对比表（公开表格页） | S42 | L0 | 2025 | [标题] "Table 5 Comparison of prediction errors between GEME-Net and baseline models for passenger flow data" |
| 43 | 国内期刊发表基于改进 Transformer 的景区短时客流预测研究，场景与邮轮区域客流高度近似 | S43 | L0 | 2025 | [标题]《基于改进Transformer模型的景区短时客流预测研究》 |
| 44 | 行业白皮书/文章讨论 GDPR 合规的人数统计：2026 指南明确 privacy-first analytics | S44 | L1 | 2026 | [标题] "GDPR Compliant People Counters: The 2026 Guide to Privacy-First Analytics" |
| 45 | Terabee 指出 RGB AI 与立体视觉人数统计存在现代合规的「隐私悖论」，需要非 RGB 或边缘匿名化设计 | S45 | L1 | n.d. | [标题] "The Privacy Paradox in People Counting: Why RGB-Based AI and Stereovision May Fall Short of Modern Compliance Standards" |
| 46 | 低分辨率相机被讨论为智能城市中保护隐私的传感选择 | S46 | L1 | n.d. | [标题] "Smart City smarts: when a low-res camera makes sense for privacy" |
| 47 | 温哥华港 2026-06 庆祝第 100 万名通过人脸生物识别登船的乘客，邮轮登船人脸识别已规模化商用 | S47 | L1 | 2026-06 | [标题] "Vancouver Celebrates One Millionth Passenger Through Facial Biometrics" |
| 48 | MSC 使用 Neurotechnology 生物识别做乘客核验；巴西 2025 年为邮轮业建生物识别平台 | S48 | L1 | 2025–2026 | [标题] "MSC using Neurotechnology biometrics for passenger verification"；"Serpro to create biometric platform for Brazil's cruise industry" |
| 49 | 汉堡港 AIDA 测试数字值机；深圳蛇口发布湾区邮轮母港智慧通关案例（含数字化通关） | S49 | L1 | 2026 | [标题] "Automated check-in at the Port of Hamburg: Aida tests digital check-in for passengers"；《打造湾区邮轮母港智慧通关新范例》 |
| 50 | 爱达·花城号产品发布：搭载 AI 无感快速登离船、智能机器人多场景互动、智能客舱一站式服务、多屏数字无纸化系统 | S50 | L1 | 2026 | [标题]《第二艘国产大型邮轮爱达·花城号产品及首航季航线正式发布》 |
| 51 | 2025–2026 年多篇行业文章报告 Starlink 在邮轮/船舶的实际部署与速度测试，LEO 已成邮轮网络升级主流选项 | S51 | L1 | 2025–2026 | [标题] "Starlink at Sea 2025-26: Real-World Speed Tests, Coverage Map & Which Cruise Ships Have It"；"2025 Ship Wi-Fi: Options & Outlook" |
| 52 | P&O 与 Cunard 2025 年接入 Starlink 的报道显示邮轮公司在升级海上连接 | S52 | L1 | 2025 | [标题] "Starlink's Oceanic Leap: P&O and Cunard Redefine Cruise Wi-Fi in 2025" |
| 53 | 商业安防相机成本有 2026 年公开指南 | S53 | L1 | 2026 | [标题] "Commercial Security Camera Costs In 2026" |
| 54 | TP-LINK 推出 TS-S1-AI-700：内置 14 种 AI 算法、即插即用部署，摄像头端 AI 算法商品化 | S54 | L1 | 2026-06 | [标题]《TP-LINK推出TS-S1-AI-700：内置14种AI算法，支持即插即用部署》 |
| 55 | Hailo-10H 边缘 AI 生成式处理器有公开产品页，树莓派 AI HAT+ 组合（40 TOPS）在售 | S55 | L1 | 2024–2026 | [标题] "Hailo-10H (Edge AI Generative Processor)"；《树莓派5 Raspberry Pi AI HAT+2官方Hailo-10H 8GBRAM 40TOPS》 |

## 2. 来源清单

| 编号 | 来源名称 | 类型 | 证据等级 | 日期 | URL | 可信度判断 |
|---|---|:--:|---|---|---|---|
| S01 | Springer Nature Scientific Reports: Dense-stream YOLOv8n crowd monitoring | 学术论文 | L0 | 2025 | https://link.springer.com/article/10.1038/s41598-025-94659-x | 高：同行评议 |
| S02 | IEEE: Real-Time People Counting and Occupancy Monitoring using Integrated CCTV | 学术论文 | L0 | 2025 | https://ieeexplore.ieee.org/document/11353515 | 高：IEEE |
| S03 | CVF WACV 2026W: CHURI retail tracking | 学术论文 | L0 | 2026 | https://www.openaccess.thecvf.com/content/WACV2026W/PRAW/html/Waghmare_CHURI_Contour-Gated_Resource-Intelligent_Retail_Tracking_System_WACVW_2026_paper.html | 高：会议 OA |
| S04 | GII: Visual People Counting Camera Market 2026-2032 | 市场报告 | L1 | 2026 | https://www.giiresearch.com/report/ires1929471-visual-people-counting-camera-market-by-technology.html | 中高：付费报告目录 |
| S05 | Metoree: 99%+ V-COUNT people counter | 厂商目录 | L1 | n.d. | https://us.metoree.com/products/34131/ | 中：厂商宣传精度 |
| S06 | V-Count: 2026 Buyer's Guide | 厂商内容 | L1 | 2026 | https://v-count.com/what-is-a-people-counter/#content | 中：厂商，选型框架可参考 |
| S07 | DDI Labs: AI on-camera people counting | 厂商博客 | L1 | n.d. | https://www.ddilabs.ai/blog/ai-on-camera-people-counting-no-hardware | 中：厂商宣传 |
| S08 | 腾讯云开发者社区: 门店客流统计系统技术架构 | 技术文章 | L1 | n.d. | https://cloud.tencent.cn/developer/article/2705107 | 中高：平台技术文章 |
| S09 | 真通网: 2026双目客流一体机行业观察 | 行业自媒体 | L2 | 2026 | https://bbs.zentong.com/t673730-1 | 中：行业观察 |
| S10 | NVIDIA: Metropolis Microservices 文档 | 厂商官方 | L0 | n.d. | https://docs.nvidia.com/mms/text/MDX_Introduction.html | 高：官方文档 |
| S11 | NVIDIA-AI-IOT: deepstream-occupancy-analytics | 官方开源 | L0 | n.d. | https://github.com/NVIDIA-AI-IOT/deepstream-occupancy-analytics | 高：官方参考实现 |
| S12 | MarketScreener: SmartCow SmartCam (Metropolis) | 公司新闻 | L1 | n.d. | https://www.marketscreener.com/quote/stock/NVIDIA-CORPORATION-57355629/news/SmartCow-Uses-NVIDIA-Metropolis-Platform-to-Launch-SmartCam-Edge-AI-Camera-for-Real-Time-Occupancy-37080409/ | 中高：厂商合作稿 |
| S13 | NVIDIA 台湾官方博客: Motionloft 零售人流 | 厂商官方 | L0 | n.d. | https://blogs.nvidia.com.tw/blog/motionloft-ai-retail-jetson-gpu-analytics-vegas-boston/ | 高：官方案例 |
| S14 | 证券时报: 英伟达Jetson大幅涨价与国产替代 | 权威媒体 | L1 | 2026-08 | https://www.stcn.com/article/detail/4063508.html | 高：证券时报 |
| S15 | IC Easy: Jetson Orin NX 16GB 现货 | 渠道页面 | L2 | n.d. | https://www.iceasy.com/news/2061266187090784258 | 中：渠道信息 |
| S16 | NVIDIA: Jetson Orin Nano Super 开发者套件 | 厂商官方 | L0 | n.d. | https://www.nvidia.cn/autonomous-machines/embedded-systems/jetson-orin/nano-super-developer-kit/ | 高：官方 |
| S17 | BigGo News: Raspberry Pi AI HAT+ 2 发布 40 TOPS $130 | 行业新闻 | L1 | 2026-01 | https://biggo.com/news/202601162250_Raspberry-Pi-AI-HAT-2-Launch-40-TOPS | 中高：新品报道 |
| S18 | Tom's Hardware: Raspberry Pi AI HAT+ 2 Review | 权威媒体 | L1 | 2026 | https://www.tomshardware.com/raspberry-pi/raspberry-pi-ai-hat-plus-2-review | 高：专业评测 |
| S19 | Cool3c: M5Stack AI Pyramid 24 TOPS | 科技媒体 | L1 | 2026 | https://www.cool3c.com/article/246390 | 中高：产品报道 |
| S20 | 物联网动态: 6→16→32TOPS 算力盒子档位与性价比 | 行业自媒体 | L2 | 2026 | https://www.iotdt.com/news/xingyezixun/2409.html | 中：行业分析 |
| S21 | 物联网动态: 2026 年 3TOPS 算力盒子趋势 | 行业自媒体 | L2 | 2026 | https://www.iotdt.com/news/xingyezixun/2394.html | 中：行业分析 |
| S22 | 英为财情: 腾讯混元开源 0.3B 端侧模型 | 财经媒体 | L1 | 2025 | https://hk.investing.com/news/stock-market-news/article-1309782 | 中高：科技报道 |
| S23 | 百度百科: HY-1.8B-2Bit 模型 | 百科 | L1 | n.d. | https://baike.baidu.com/item/HY-1.8B-2Bit%E6%A8%A1%E5%9E%8B/67374914 | 中：百科，作线索 |
| S24 | CSDN: 2026 边端大模型选型全指南 | 技术博客 | L2 | 2026 | https://blog.csdn.net/SaturnCloud/article/details/161891039 | 中：技术博客 |
| S25 | LinkMetax: 私有部署 DeepSeek/Qwen 成本测算 | 技术博客 | L2 | 2026 | https://www.linkmetax.com/blog/private-llm-deepseek-qwen-deployment-2026 | 中：成本测算需复核 |
| S26 | 电子产品世界: 工控机部署千问 8B | 技术媒体 | L2 | 2026-07 | https://www.eepw.com.cn/article/202607/482418.htm | 中高：工程案例 |
| S27 | GitHub: nano-inference (Jetson Orin CUDA LLM) | 开源项目 | L2 | n.d. | https://github.com/CaesarPCChang/nano-inference | 中：社区项目宣称 |
| S28 | MDPI Electronics 15(11):2451 边缘 LLM 推理基准 | 学术论文 | L0 | 2026 | https://doi.org/10.3390/electronics15112451 | 高：同行评议 |
| S29 | ScienceDirect: Wi-Fi FTM survey | 学术综述 | L0 | 2025 | https://www.sciencedirect.com/science/article/abs/pii/S156625352500065X | 高：综述 |
| S30 | arXiv: Privacy-preserving WiFi passive TDOA | 学术论文 | L0 | 2023 | https://ar5iv.labs.arxiv.org/html/2306.02211 | 高：预印本 |
| S31 | IEEE: Wireless human motion tracking in mobile ship environments | 学术论文 | L0 | 2022 | https://ieeexplore.ieee.org/document/9825720 | 高：场景高度相关 |
| S32 | 阿里云开发者社区: 蓝牙/UWB 室内定位对比 | 技术文章 | L2 | n.d. | https://developer.aliyun.com/article/1692956 | 中：技术科普 |
| S33 | CSDN: 2025 中国高精度定位技术总结 | 技术博客 | L2 | 2025 | https://damodev.csdn.net/69731b057c1d88441d8efeb7.html | 中：行业总结 |
| S34 | GlobeNewswire: Digital Twin in Marine Market 2026-2032 | 市场报告新闻 | L1 | 2026-05 | https://www.globenewswire.com/de/news-release/2026/05/08/3291156/28124/en/Digital-Twin-in-Marine-Market-Report-2026-2032-Featuring-Siemens-Dassault-Systemes-ABB-Wartsila-Kongsberg-Maritime-and-Other-Key-Players.html | 中高：报告新闻稿 |
| S35 | Worldports: Virtual twins for ship class | 行业媒体 | L1 | n.d. | https://www.worldports.org/virtual-twins-the-future-for-ship-class-lifecycle-management/ | 中高：行业媒体 |
| S36 | 中国船级社: 船舶数字与智能技术交流会 | 官方 | L0 | 2025-12 | https://www.ccs.org.cn/ccswz//articleDetail?id=202512040254189688&columnId=201900002000000055 | 高：官方 |
| S37 | 文档网: 《智能船舶规范》(2025) | 文档站 | L1 | 2025 | https://www.wendang.net/zl/907197.html | 中：非官方托管，原文需去 CCS 核 |
| S38 | 澎湃: 中国船级社颁发全球首张船舶数字化交付系统 GDA 证书 | 权威媒体 | L1 | n.d. | https://m.thepaper.cn/newsDetail_forward_33620295 | 高：官方消息经媒体 |
| S39 | IMO: MASS Code 官方新闻稿 | 官方 | L0 | 2025-12 | https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-adopts-mass-code.aspx | 高：IMO 官方 |
| S40 | PortCalls Asia: IMO adopts safety code for autonomous ships | 行业媒体 | L1 | 2025 | https://portcalls.com/imo-adopts-safety-code-for-autonomous-ships-as-ai-tech-advances/ | 中高：行业解读 |
| S41 | ACM: CNN-Transformer-ResLSTM-Attention 客流预测 | 学术论文 | L0 | 2025 | https://dl.acm.org/doi/full/10.1145/3773365.3773417 | 高：同行评议 |
| S42 | Nature npj: GEME-Net 客流预测误差表 | 学术论文 | L0 | 2025 | https://www.nature.com/articles/s44333-025-00072-2/tables/5 | 高：同行评议 |
| S43 | 中国管理科学: 改进 Transformer 景区短时客流预测 | 学术论文 | L0 | 2025 | https://www.zgglkx.com/EN/Y2025/V33/I2/105 | 高：中文核心期刊 |
| S44 | Footfall.au: GDPR Compliant People Counters 2026 | 行业指南 | L1 | 2026 | https://footfall.au/gdpr-compliant-people-counters-the-2026-guide-to-privacy-first-analytics/ | 中高：合规导向 |
| S45 | Terabee: People counting 隐私悖论 | 厂商文章 | L1 | n.d. | https://www.terabee.com/the-privacy-paradox-in-people-counting-why-rgb-based-ai-and-stereovision-may-fall-short-of-modern-compliance-standards/ | 中高：厂商但论点重要 |
| S46 | Fierce Sensors: 低分辨率相机与隐私 | 行业媒体 | L1 | n.d. | https://www.fiercesensors.com/sensors/smart-city-smarts-when-low-res-camera-makes-sense-privacy | 中高：行业媒体 |
| S47 | Cruise Industry News: 温哥华 100 万面部生物识别乘客 | 行业媒体 | L1 | 2026-06 | https://cruiseindustrynews.com/cruise-news/2026/06/vancouver-celebrates-one-millionth-passenger-through-facial-biometrics/ | 高：行业权威媒体 |
| S48 | Worldports: MSC 使用 Neurotechnology 生物识别 | 行业媒体 | L1 | n.d. | https://www.worldports.org/msc-using-neurotechnology-biometrics-for-passenger-verification/ | 中高；另见 Biometric Update 2025-09 巴西平台报道 |
| S49 | 深圳市政府: 湾区邮轮母港智慧通关案例 | 政府官方 | L0 | 2026 | https://ka.sz.gov.cn/gkmlpt/content/12/12712/mpost_12712750.html | 高：官方案例；另见 aviation.direct AIDA 值机报道 |
| S50 | 腾讯新闻: 爱达·花城号产品及首航季航线发布 | 权威媒体转载 | L1 | 2026-04 | https://news.qq.com/rain/a/20260503A03H2W00 | 高：多家媒体同题互证 |
| S51 | WeOnCruise: Starlink at Sea 2025-26 实测 | 行业媒体 | L1 | 2025-2026 | https://weoncruise.com/starlink-at-sea-2025-26/ | 中高；另见 shipuniverse 2025 Ship Wi-Fi |
| S52 | WebProNews: P&O 与 Cunard 接入 Starlink | 科技媒体 | L1 | 2025 | https://www.webpronews.com/starlinks-oceanic-leap-po-and-cunard-redefine-cruise-wi-fi-in-2025/ | 中高：公司动作可核 |
| S53 | Monarch Connected: 2026 商业安防相机成本指南 | 行业指南 | L1 | 2026 | https://monarchconnected.com/blog/commercial-security-camera-costs-in-2026 | 中：集成商报价指南 |
| S54 | 万仞网: TP-LINK TS-S1-AI-700 内置 14 种 AI 算法 | 科技媒体 | L1 | 2026-06 | https://wanyr.com/2026/06/tp-link%e6%8e%a8%e5%87%bats-s1-ai-700%ef%bc%9a%e5%86%85%e7%bd%ae14%e7%a7%8dai%e7%ae%97%e6%b3%95%ef%bc%8c%e6%94%af%e6%8c%81%e5%8d%b3%e6%8f%92%e5%8d%b3%e7%94%a8%e9%83%a8%e7%bd%b2.html | 中高：新品报道 |
| S55 | Jisaku: Hailo-10H 解析 | 科技媒体 | L1 | 2024-2026 | https://jisaku.com/glossary/hailo-10h-2024 | 中；另见 spotpear 树莓派 AI HAT+ 组合在售页 |

## 3. Pattern 候选（≥3 个独立来源才能成立）

| Pattern | 涉及 nugget | 独立来源数 | 置信度 | 说明 |
|---|---|---|---|---|
| P1 CV 人群计数已同时具备「学术可用 + 商用成熟 + 平台参考实现」三层证据 | #1,#2,#3,#5,#9,#10,#11,#12,#13 | 9 | Strong | YOLO 系论文、商用 99%+ 宣传、NVIDIA Metropolis/DeepStream 参考实现三者独立互证 |
| P2 边缘 AI 硬件从「开发板」走向「商品化低价算力」 | #14,#15,#16,#17,#18,#19,#20,#21,#54,#55 | 10 | Strong | Jetson、树莓派 AI HAT+、Hailo、M5Stack、国内算力盒子构成多价位供应链 |
| P3 离线/端侧中文 LLM 已进入消费级与工控级硬件 | #22,#23,#24,#25,#26 | 5 | Strong | 0.3B–8B 级开源模型 + 私有部署成本测算 + 工控机案例 |
| P4 船上定位没有单一主流方案，WiFi/UWB/BLE 各有论文与工程选型依据 | #29,#30,#31,#32,#33 | 5 | Strong | 技术多样性成立；但没有「邮轮整船定位」的公开产品级精度数据 |
| P5 船舶数字孪生与智能船舶已有监管/标准接口和商用市场 | #34,#35,#36,#37,#38,#39,#40 | 7 | Strong | IMO MASS Code、CCS 规范、船级社 GDA、Wärtsilä/Kongsberg 等玩家 |
| P6 邮轮场景的人脸/生物识别登船已规模化，隐私边界成为显式设计变量 | #44,#45,#46,#47,#48,#49 | 6 | Strong | 「仅计数不识别」需主动设计，不能当作 CV 默认行为 |
| P7 客流时序预测有成熟模型家族（LSTM/Transformer 混合），可迁移到船上区域预测 | #41,#42,#43 | 3 | Moderate | 三个学术来源；缺少邮轮场景实测数据 |
| P8 海上宽带正从 VSAT 向 LEO 迁移，但公开延迟/带宽数字分散，不能支持「云端实时推理」 | #51,#52 | 2 | Emerging | 只能确认趋势，不能确认具体 SLA；本地推理更稳妥 |
| S53 | Monarch Connected: 2026 商业安防相机成本指南 | 行业指南 | L1 | 2026 | https://monarchconnected.com/blog/commercial-security-camera-costs-in-2026 | 中：商业博客，价格区间供参考 |
| S54 | Wanyr: TP-LINK TS-S1-AI-700 内置14种AI算法 | 科技媒体 | L1 | 2026-06 | https://wanyr.com/2026/06/tp-link%e6%8e%a8%e5%87%bats-s1-ai-700%ef%bc%9a%e5%86%85%e7%bd%ae14%e7%a7%8dai%e7%ae%97%e6%b3%95%ef%bc%8c%e6%94%af%e6%8c%81%e5%8d%b3%e6%8f%92%e5%8d%b3%e7%94%a8%e9%83%a8%e7%bd%b2.html | 中高：新产品报道 |
| S55 | Hailo 官网: Hailo-10H Edge AI Generative Processor | 厂商官方 | L0 | 未标 | https://hailo.ai/products/ai-accelerators/hailo-10h-ai-accelerator/ | 高：厂商产品页 |

## 4. 矛盾证据（不得删除）

| 主题 | 证据 A | 证据 B | 影响 |
|---|---|---|---|
| 人群计数精度 | 商用厂商宣传 99%+（S05） | 学术/工程系统没有统一公开基准；旧文档「YOLO 95%+」出处未找到 | 精度数字只能按场景分档写，不能直接引用单一宣传值 |
| 人脸识别边界 | 温哥华、MSC、巴西已大规模商用（S47/S48） | GDPR/隐私指南与低分辨率相机派强调 privacy-first（S44/S45/S46） | 邮轮上「方便登船」与「不识别身份」两种模式并存，方案必须显式声明模式并做合规设计 |
| 边缘 LLM 能力 | 0.3B–8B 模型可在消费级/工控级部署（S22–S26） | 检索结果未给出邮轮类场景的公开延迟/质量基准（S27/S28 仅有引擎与基准研究） | 「离线 LLM 生成推荐文案」可行，但质量与延迟需要原型实测，不能只写可行性 |
| 海上网络 | Starlink 在邮轮部署已成趋势（S51/S52） | 未检索到统一公开的延迟/带宽 SLA 数字 | 3 分钟 OODA 闭环必须设计为船载局域网内运行，卫星仅做回传与异步同步 |
| 定位技术 | WiFi FTM/UWB/BLE 各有成熟研究（S29–S33） | 没有公开的邮轮整船定位部署案例 | 位置感知层应降级为「可选增强」，核心决策不依赖精确个人定位 |

## 5. 与旧文档结论的对照（design/direction-1-deep-dive.md 技术断言）

| 旧断言 | 本流证据 | 判定 |
|---|---|---|
| 「YOLO/OpenCV 人流计数精度已达 95%+」 | 未找到该精确出处；可证明的是 YOLO 系轻量模型与商用客流计成熟（P1），商用宣传 99%+（S05）不可直接采信 | 更新：方向成立，精度数字需改为「分场景标定，商用设备常见宣传 95–99%，须实测」 |
| 「本地 NUC 推理，不依赖卫星」 | 边缘硬件与离线小模型证据充分（P2/P3）；海上网络 SLA 无统一公开数据（P8） | 确认并强化：本地推理是正确架构，且 2026 年硬件选择更多 |
| 「摄像头画面→YOLO/OpenCV 人头计数」 | DeepStream occupancy analytics、双目客流一体机等证明技术路径成熟（#9/#11/#12） | 确认 |
| 「WiFi/蓝牙定位（脱敏）」 | 技术上有多方案（P4），但无邮轮整船部署公开案例 | 仍无法验证：应作为可选增强，不作为核心依赖 |
| 「每 3 分钟 OODA 循环」 | 无直接证据支持或否定该周期；依赖船载局域网推理架构（P8） | 仍无法验证：需原型实测扫描频率、排队模型与推送节奏 |
| 「LLM 生成自然语言建议（Gemini 2.5/3.0）」 | 离线中文小模型可用（P3），但云端 Gemini 依赖卫星不成立；离线质量/延迟待测 | 更新：改为「边缘/离线小模型 + 可选云端异步增强」 |
| 「推荐前先确认（审批门）」 | 本流未找到直接证据；但隐私合规证据（P6）支持显式同意与最小化处理 | 仍无法验证（技术模式合理，需合规章节承接） |
| 「双层架构：规则引擎精确计算 + LLM 语义层」 | 未找到直接反对证据；Metropolis/DeepStream 规则触发 + 边缘推理的工程模式一致 | 确认（工程模式合理） |
| 「摄像头部署依赖前装」 | 花城号已宣布 AI 无感登离船等前装智能系统（#50），外高桥数字化能力见批1 | 确认并强化：前装窗口真实存在 |

## 6. 数据断点与后续建议

1. **精度数字需实测**：没有找到「YOLO 计数 95%+」的统一权威出处；下一步应在原型中用公开数据集或邮轮餐厅视频做 MAE/准确率标定，而不是引用宣传值。
2. **邮轮整船定位无公开案例**：WiFi/UWB/BLE 只到「技术可行」，缺少船上部署的遮挡、金属结构、人群密度影响数据；建议把定位降级为可选模块。
3. **离线 LLM 的延迟与中文推荐质量无邮轮场景基准**：0.3B–8B 模型可部署（P3），但「推荐文案质量/首字延迟/每秒 token」需原型实测；云端 Gemini 类依赖卫星，不应进入 3 分钟闭环。
4. **成本只有量级没有船级清单**：130 美元级 40 TOPS 加速卡、Jetson 涨价与国产替代、商业相机成本指南可给出量级；邮轮级批量采购价需向供应商询价。
5. **卫星/船舶网络 SLA 分散**：Starlink 部署趋势明确，但公开延迟/带宽数字口径不一；方案书应写「本地推理 + 卫星异步回传」，不写具体云端 SLA。
6. **MASS Code 对辅助决策系统（非自主航行）的适用边界未检索到直接条款**：本流只确认 MASS Code 已通过；后续应与流⑥安全法规报告合并核对。
7. **POS/门禁数据融合**：本轮未找到邮轮餐厅 POS 与客流系统融合的公开案例；只能作为架构假设，待原型或厂商咨询验证。

## 7. 主代理补录：方向二假设与人群计数精度硬数据

> 补录说明：并行稿未覆盖任务书要求的「方向二（设备运维与能耗）技术假设」与密度计数误差基准。以下证据由主代理独立检索补入，编号接续 S56。

| # | Nugget（单条观察） | 来源编号 | 证据等级 | 日期 | 原文引用/数据点 |
|---|---|:--:|---|---|---|
| 56 | 海事领域综述指出 AI/ML 预测性维护应用正在扩展 | S56 | L1 | 2025 | [摘要] "The use of Artificial Intelligence (AI) and Machine Learning (ML) for predictive maintenance in the maritime sector is expanding..." |
| 57 | 海事预测性维护综述明确前提：训练准确 PdM 系统必须依赖高质量船舶运行数据 | S57 | L1 | 2025 | [摘要] "A necessity for training accurate PdM systems is the availability of high-quality operational vessel data" |
| 58 | 人群密度估计公开基准：TransCrowd 在 NWPU-Crowd 的 MAE 为 66.1–105.1 | S58 | L1 | 2025 | [摘要] "The MAE values for TransCrowd range from 66.1 to 105.1, while RMSE..." |
| 59 | RK3588 NPU 标称 6 TOPS（INT8），但实测有效推理吞吐量低于标称 | S59 | L2 | 2026 | [摘要] "RK3588……内置的NPU算力标称6 TOPS（INT8），但实测中真正能稳定喂饱、持续输出的有效推理吞吐量，在YOLO..." |

| 编号 | 来源名称 | 类型 | 证据等级 | 发布日期 | URL | 可信度判断 |
|---|---|:--:|---|---|---|---|
| S56 | MDPI《Advances in Innovative Solutions for Ship Energy Efficiency》 | 学术综述 | L1 | 2025 | https://www.mdpi.com/2077-1312/13/11/2103 | 高：同行评议综述 |
| S57 | MDPI《Towards Predictive Maintenance in the Maritime Industry: A Component-Based Overview》 | 学术综述 | L1 | 2025 | https://www.mdpi.com/2077-1312/13/3/425 | 高：同行评议综述，直接给出数据前提 |
| S58 | IEEE《Crowd Density Estimation Using Enhanced Multi-Column CNN...》 | 学术论文 | L1 | 2025 | https://ieeexplore.ieee.org/abstract/document/11121870 | 高：提供 TransCrowd 公开基准数值 |
| S59 | CSDN《别再让NPU闲着！...RK3588的6TOPS算力...》 | 技术博客 | L2 | 2026 | https://wenku.csdn.net/column/0ool5jk228j | 中：工程经验，非官方 |

### 方向二（设备运维与能耗）技术假设对照

| 旧假设 | 本流证据 | 判定 |
|---|---|---|
| 多 Agent 监测 5.5 万个设备并预测故障 | PdM 学术路线成熟（S56/S57），但准确训练强依赖高质量运行数据；新船无历史设备数据 | 部分成立：架构可讲，但「新船无历史数据」是关键风险，应改为「规则基线 + 仿真/试航数据 + 逐步学习」的分期路径 |
| 设备传感器数据可得性（新船设计阶段可布点） | 本流未找到邮轮 5.5 万设备传感器清单的公开证据；数据可得性依赖船厂设计接口，需与流②（船与工程基线）交叉确认 | 仍无法验证（架构假设保留） |
| 能耗优化用「AI 感知 + 物理公式」 | 与船舶能效 AI 综述（S56）方向一致，且有数字孪生/CCS 智能化生态（S34–S38）支撑 | 确认（模式合理） |
| 多 Agent 编排框架可直接用于船舶运维 | LangGraph 等生产实践存在，但未检索到邮轮/船舶多 Agent 运维的公开案例 | 仍无法验证：Demo 必须自证「每个 Agent 职责与通信」，避免 Multi-Agent 贴纸反模式 |

### 人群计数精度结论（供方案书直接使用）

- 可以写：「轻量 YOLO 系模型与双目客流相机为成熟工程路径；商用设备常见宣传 95–99%+，但需在目标场景实测标定」。
- 不可以写：「YOLO/OpenCV 人流计数精度已达 95%+」——旧断言无出处，且密度估计公开基准（TransCrowd MAE 66.1–105.1，S58）说明高密度场景误差可达数十人量级；RK3588 标称算力与实测吞吐也有差距（S59）。

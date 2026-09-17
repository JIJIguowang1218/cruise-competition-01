# Digital Data Sharing for Enhanced Decision-Making

> **资料原文归档（Markdown 化）**
> 来源：https://link.springer.com/chapter/10.1007/978-3-030-50892-0_10
> 作者：Bergmann, Michael, Chrysostomou, Andreas, Primor, Omer
> 出版：Springer，*Maritime Informatics*（2021，开放获取）
> 章节编号：ch.10 / R1-S2
> 归档日期：2026-09-17
> 获取方式：Springer 章节页面公开预览文本自动提取（非 PDF 全文，图表/参考文献可能缺失）
> 对应分析档：../r1-port-window-research.md（ch.10 / R1-S2 编号 S1/S2/S3）

---

Digital Data Sharing for Enhanced Decision-Making

Download book PDF

Download book EPUB

## Abstract

As the maritime industry moves towards the so-called fourth industrial revolution—Maritime 4.0—digitalisation and data sharing are becoming paramount. It is important that the actors in the industry recognise the differences between data and information, where data is the underlying content that is converted to be understandable and useful by the target audience and as such becomes information. To make digital data streams (DDSs) useful in the maritime domain, it is essential to define and standardise the When, Where, Who, What, Why and How dimensions when capturing the circumstances of an event. In sharing this data, the affected actors can gain the necessary situational awareness so that coordinated decisions can be made to optimise a situation, increase safety and efficiency of operations and with that create value for individuals as well as the community. Using existing data standards where applicable and developing new data standards where necessary enables this very much needed data sharing. It also allows the combination of different data streams, both static and dynamic, to increase the value proposition of enhanced decision-making.

Access provided by Dalian University of Technology.

Download chapter PDF

### Similar content being viewed by others

###
Data Analytics Case Studies in Maritime Technology

Chapter

© 2024

###
Data Platforms in the Maritime Domain: Challenges and Opportunities

Chapter

© 2027

###
Data Quality Assessment – A Use Case from the Maritime Domain

Chapter

© 2020

### Explore related subjects

Discover the latest articles, books and news in related subjects, suggested using machine learning.

-
Data integration

-
Data Privacy

-
Data publication and archiving

-
Information Model

-
Data and Information Visualization

-
Big Data

-
Maritime Cybersecurity Risk Management

## 1 Introduction

Digitalisation is the key process of what is now termed “the fourth industrial revolution” or “Industry 4.0”. It is about developing an environment utilising new and disruptive technologies like artificial intelligence (AI), robotics, virtual reality and the Internet of Things (IoT) and is changing how we work and live (Schwab, 2017).

To some, the maritime industry has been lagging, but the pace of adoption of digitalisation has grown in recent years, focused around the term “Maritime 4.0”, sometimes also called “Shipping 4.0”. In their invitation to a conference on the topic in 2018, the German research organisation Fraunhofer stated: “Maritime 4.0 is the current buzzword in the shipbuilding industry and refers to the digitisation of all processes from planning through design to maintenance” (Fraunhofer, 2018). Similarly, the LINCOLN research project, in an invitation for its Maritime 4.0 event on September 2019, was even more specific on the definition: “The Industry 4.0 becomes Maritime 4.0 to reinforce the research focus to specific blue challenges, to develop innovative digitally connected vessels concepts, to improve the market competitiveness, overall of SMEs, to plan the appropriate skills developments and last, but not least to include the environmental sustainability of vessels and shipbuilding” (The LINCOLN project, 2019).

While describing the same idea, these definitions of Maritime 4.0 handle the word digital differently. As such, it seems there is an important distinction to be made in Maritime 4.0 when it comes to Digitisation and Digitalisation. While the word digitisation is used for the conversion of information into a digital form, in essence the conversion from analogue to digital, the term digitalisation is used to describe the use of digital technology to improve business processes and value creation through data analysis.

In this arena, Maritime Informatics plays an important role as it brings maritime digitalisation into the broader maritime technology space, as well as maritime biology and other related maritime aspects of computer science. Maritime Informatics is an enabler for Maritime 4.0 but at the same time benefits greatly from the development towards and within Maritime 4.0. Maritime Informatics is also enabled by Maritime 4.0 because a large-scale digital transformation generates the data necessary for a shift to data-driven decision-making and, with it, operational excellence.

While much information in the maritime ecosystem had been available in digital form for some time, the availability of data for analysis and further digitalisation is very limited. The International Hydrographic Organization (IHO) had a very early start on digitising maritime data with its S-57 Electronic Nautical Charts (ENCs) in the Electronic Chart Display and Information System (ECDIS). The IHO also realised very early that the digitisation needed to be enhanced and as such started the S-100 initiative for full integration of various hydrographic and related information. This was a leading step towards Maritime 4.0. The International Maritime Organization (IMO) soon followed and started its e-navigation initiative. Besides adopting a strategic implementation plan (SIP) for e-navigation, the IMO also agreed to use the IHO’s geospatial information (GI) registry, home of the IHO S-100 series of data transfer standards, as the basis for the IMO’s Common Maritime Data Structure (CMDS).

Today, the CMDS accommodates numerous compatible standards from different organisations and enables data sharing and interoperability of different data sets across the maritime ecosystem. In addition, the IMO Facilitation Committee (FAL) is working on facilitating digitalisation in shipping, including electronic ship reports with its IMO Compendium (IMO, 2019).

Besides the work on ship-centric Maritime 4.0 digitalisation, the shoreside has also adopted this concept: IALA has spearheaded such work for Vessel Traffic Services (VTS), various shipping lines have set up their fleet operation centres, and collaborations like the Digital Container Shipping Association (DCSA) and organisations like the International PortCDM Council (IPCDMC) have focused their efforts to develop various aspects of Maritime 4.0 both on shore and in collaboration with ships and port operations.

## 2 Standardisation and Digitisation

In the advent of the age of digitalisation, data standardisation has become paramount in support of the tremendous changes along the whole chain of information processing. In fact, digital standardisation has emerged as a fundamental requirement for all modern data applications. By generating consistency and structure in data, standardisation is key to enabling various subsequent uses of these data—such as sharing, aggregating, benchmarking and modelling—while reducing the overhead costs of pre-processing the data.

Data standardisation has two levels: semantic and technical. The semantic level answers “what exists” and accordingly creates consistent abstraction about entities, their attributes and their relationships. This is known as “data modelling”, and by standardising data models across an industry, it enables interoperability. The resulting artefacts are known as semantic standards.

Once such a universal data model exists, the digital encoding of this semantic standard can be developed to enable the creation of machine-readable data sets describing a situation generically. The broad use of these standards eases the processing of the shared data sets enormously. Popular examples of these standards are based on the data exchange language XML (Extensible Markup Language) and its derivation for geospatial information GML (Geography Markup Language). This second set of standards is known as technical standards.

With both semantic and technical standardisation, a good foundation is available to create consistent and interchangeable data sets. In order to reach the broadest use and create interoperability across knowledge domains, authoritative standardisation and standards endorsed by rule-setting organisations like the IMO are required for consistent data sets across the same theme from different producers.

## 3 Data Versus Information

Watson, Lind, Delmeire, and Liesa (2020) of this book explains that Digitalisation and Maritime Informatics create opportunities for new structures for capital creation and how data sharing enables new opportunities.

Along those lines, sharing data increases the availability of new perspectives for situational awareness and as such can strengthen the foundations for decision-making. However, gathering more data by itself does not necessarily lead to superior decision-making, and its value is often generated once it is analysed and presented to the mariner in a way that enhances situational awareness and knowledge building. The “Pyramid of Competence” (Fig. 1), introduced in 2012, illustrates this need.

Fig. 1

The pyramid of competence (Bergmann, 2012)

Full size image

It is important to differentiate between “data” and “information”. Data, derived from the Latin word “datum”, meaning “given”, is the uninterpreted fact. Information, again derived from Latin “informare”, means “shape” or “give form”.

In order to be useful, digital data sharing therefore needs to aim towards increasing competence by providing meaning and context and contributing to the knowledge of the interpreter. This requires that data streams capture up to six basic elements, being primitives that provide a semantic description for an event. A primitive is an expression for “that which cannot be described in terms of other elements or inferred from them”. The primitives capture what are commonly known as the 5W+H of narrative (who, what, when, where, why and how) (Table 1) (Pigni, Piccoli, & Watson, 2016).

Table 1 Elements of a digital data stream segment (Pigni et al., 2016) with our examplesFull size table

Capturing these primitives in the data is essential not only for generating meaning and transforming data into information but also to enable further consolidation of shared data arriving from different streams. In particular, data integration is reliant on the “who” primitive, using identifiers for fusion of different data points relating to the same entity.

In recent years, various decision support applications are increasingly making use of big data analytics methods. Generating more knowledge by integrating, analysing and visualising huge data sets into digestible information, these applications support specific decision points by creating a common and more reliable understanding of a situation. This common knowledge, achieved through data sharing, leads to harmonised decisions and as such to decisions of the individual actors which support better the activities of the others involved (Lind et al., 2020; Lind, Bergmann, Ward, & Carson-Jackson, 2018).

## 4 Enhancing Decision-Making Through Data Sharing

A prominent initiative, supporting enhanced decision-making through data sharing, is the IMO’s e-navigation concept (IMO, 2013), which has been worked on by various stakeholders during the last several years. The e-navigation initiative has been the nucleus of starting digitalisation in shipping as it relates to regulations and international requirements.

e-Navigation is the “… harmonized collection, integration, exchange, presentation and analysis of marine information on board and ashore by electronic means to enhance berth to berth navigation and related services for safety and security at sea and protection of the marine environment” (IMO, 2013).

The IMO understands that harmonising information and creating a common understanding between players on ships and on shore are essential to improving the safety and efficiency of sea trade. This core mission of IMO will not be sufficiently covered in our rapidly changing, technologically enabled world by the current regulatory instruments, like the International Convention for the Safety of Life at Sea (SOLAS) (IMO, 2014). New or revised protocols need to be developed that continue to ensure global trade is governed by appropriate standards and regulations but at the same time allows the necessary freedom to quickly introduce innovations around maritime safety and efficiency.

Safety of navigation remains a strong focus for the shipping industry. At the same time, growing economic pressures force shipping to look at increasing efficiency in multiple ways:

-
The shipping industry needs to reduce costs for sustainable and improved profitability.

-
Ports needs to increase efficiency of ship handling to optimise the limited assets available.

-
Coastal states hinterland and multimodal transport capabilities are often close to capacity, and limited financial and natural resources are forcing authorities to increase the efficiency of the complete supply chain.

-
Environmental agencies and society are requesting reductions in ecological damage, be it through tighter emission control, limiting pollution by ship casualties or oil spills.

e-Navigation is intended to support these preceding needs for the shipping industry by consolidating efforts through modern technology and updated rules and regulatory frameworks.

In the 1960s, the standardised container revolutionised shipping (Watson, Lind, & Haraldson, 2017). Today, the shipping industry expects the next revolution to be the containerisation of information—creating a safer, more efficient and environmentally friendly maritime sector.

Inspired by Airport Collaborative Decision Making (A-CDM), the International PortCDM Council (IPCDMC) aims to establish the necessary overarching guidelines, processes and procedures to make Port Collaborative Decision Making (PortCDM) a successful international concept to improve maritime transport as it relates to port operations and ports’ interaction with ships (IPCDMC, 2019). The IPCDMC is working towards data exchange and collaboration between ships and ports, between hinterland operators and ports and within ports.

On an international level, the IPCDMC is governing the PortCDM concept, a concept to support those engaged in, or associated with, port call operations. It aims to improve the efficiency and effectiveness of activities in any port by providing a framework for data sharing, enhanced collaboration and common situational awareness (Lind et al., 2019).

Aimed at enabling more predictable timings and operations in sea transport, PortCDM is building unified and standardised data exchange protocols, addressing the need to ensure a continuous flow of data about intentions, outcomes and possible disruptions related to movements and service provision among all those involved in the berth-to-berth maritime transport process. It also aims at contributing to the operational aspects of a well-coordinated port as a transport hub in the larger transportation ecosystem. This results in a high degree of predictability in the planning and execution of all associated operations and activities contributing to just-in-time (JIT) operations.

The PortCDM process is intended to be dynamic and transparent using standardised messaging and interfaces that trigger and prompt the various actors to review exception alerts and take actions based upon their physical capabilities, preferences and requirements. Provided everyone is kept informed, multiple revisions or iterations to plans can take place during a single port call while at the same time minimising the overall disruption to the final outcomes.

PortCDM focuses on a more dynamic and effective delivery of the existing processes through greater collaboration and the availability of high quality, near real-time data to all the relevant and authorised actors in the maritime transportation ecosystem, underpinned by appropriate protocols to ensure robust data integrity and access control. PortCDM comes with a framework for maturity levels supporting ports and their actors to successively advance PortCDM maturity (Fig. 2). The maturity model allows the categorisation of implementation levels of PortCDM in a port based on clearly defined criteria.

Fig. 2

PortCDM maturity levels (IPCDMC, 2019)

Full size image

On the technical level, the IPCDMC has developed the S-211 standard, a Port Call Message Format within the CMDS. S-211 is used for port call messages by allowing standardised sharing of data on intentions and outcomes of movements, services and administrative events on a given port call (IALA, 2019).

Building upon the foundational logic of the port call process, conceived as different interrelated events, the S-211 port call message format is a response to the lack of standards for sharing data on port call timing between involved actors. S-211 further captures several aligned standards used in maritime transport, as a means for realising the IMO’s e-navigation strategy (IMO, 2013). In that sense, the port call message format is kept thin, focused on delivering critical operational data while leaving sensitive business essential (competitive) data aside. Also, it is not part of a larger standardisation monolith, such as the standards maintained by UN/CEFACT or WCO. The S-211 standard allows participants to share data about intentions (plans, estimations, actuals, requests and recommendations) associated with movements or services. S-211 also covers the opportunities for sharing data about the process of reaching agreement on required services by capturing the interrelated communicative acts, such as request and confirm.

S-211 is unique in reflecting high precision in the details communicated, such as the location and timing of arrival and departure, allowing for standardised and precise ship-to-port, port-to-ship, port-to-port, port-to-hinterland as well as port actor-to-port actor data exchange, thereby contributing to efficient coordination.

While the data stream standardised as S-211 is an important data source for Maritime 4.0, others are essential as well. The principal international association for marine electronics companies, Comité International Radio-Maritime (CIRM), is a prominent industry association supporting the development of e-navigation services. CIRM members are engaged in the work of the International Electrotechnical Commission (IEC), supporting the development of S-421 for route plan exchange (IEC, 2018), build upon the existing RTZ format (IEC, 2014), and enabling interoperability with S-211.

S-421 is in essence focusing on a ship’s route, while S-211 focuses on the ship’s port call. With both standards within the IMO CMDS, they follow the same data definition template, which is based on the ISO 19xxx series of standards (IHO, 2012). This allows the synchronisation of those data streams, converting the data into information which can then be analysed and accessed through data sharing concepts. This way, the necessary data exchanges for JIT arrivals, associated with an integrated port call performance, are enabled, a topic which is high on the agenda of the IMO.

A focused IMO initiative called GloMEEP “… is a GEF-UNDP-IMO project aimed at supporting the uptake and implementation of energy efficiency measures for shipping, thereby reducing greenhouse gas emissions from shipping” (IMO, 2020). The Global Industry Alliance (GIA), which is behind this initiative, is developing a “Just-in-Time Arrival Guide”, which aims “… to provide information to ports on how to facilitate JIT Arrival of ships—with a view to reduce GHG emissions by optimising the port call process and provide a sustainable solution to its customers as a critical node in the end-to-end supply chain” (GIA, 2020).

These two examples, S-211 and S-421, part of a broad range of compatible data streams under development or already available, illustrate how the use of data describing maritime transport from different perspectives can enhance situational awareness, as the shared data streams are merged and information is extracted by the individual actors using data analysis tools. Furthermore, they illustrate the need to develop Maritime Informatics as a distinctive field at the intersection of the maritime industry and information systems.

## 5 Increasing Reliability and Value of Information Through Fusion of Data Streams

Every organisation seeks to enhance demand for its services, overcoming inefficiencies and boosting innovation in such a way that it is not falling behind its competitors (Pigni et al., 2016). The European Commission recently launched a European strategy for data (European Commission, 2020) in which it claims that “… Today 80% of the processing and analysis of data takes place in data centres and centralised computing facilities, and 20% in smart connected objects, such as cars, home appliances or manufacturing robots, and in computing facilities close to the user (“edge computing”). By 2025 these proportions are likely to be inverted”.

From the Maritime 4.0 perspective, the data streams coming out of systems of records, such as PortCDM compliant tools (see Lind et al., 2020), are growing in diversity, scope and scale—such as digital twins, ship movements captured via the automatic identification system (AIS), container status and movements captured by smart container devices or video gate control systems capturing carriers moving in and out of ports from the hinterland point of view. It is thus reasonable to think that a vast number of digital data streams will be available to players across the maritime ecosystem. Nonetheless, the providers of these data streams might want to control access, by regulation or fees, as in the case of commercial data providers. It is therefore likely that there will be a mixture of public and private digital data streams available for the data consumer.

Value creation is dependent on an organisation’s capacity to retrieve those relevant data sets that are important to its operations. The organisation needs the ability to identify relevant data streams and access them in real time (Pigni et al., 2016). As the scope and scale of data grows, organisations will increasingly need to develop a data sciences capacity in order to effectively handle data and unlock the information needed for decision-making.

Dedicated ship reporting is one such standardised data stream which is currently used. The traditional “noon report” contains a vessel’s position and other relevant data to assess the progress of a ship based on its speed and environmental forces, including weather conditions. But as this is manually compiled data, it may contain errors. Fusing data from noon reports with AIS data [see Regulation 19 of SOLAS Chapter V (IMO, 2014)], for example, can validate a ship position and other data which is contained in both data streams. This allows data analysis to identify suspicious data points and initiate action to resolve any discrepancies.

The development of data streams from different sources using the same technical definitions, such as those of the CMDS, enables the validation and extension of data assets and as such creates additional value. The important GS1 EPCIS data standard (GS1, 2014) is, however, a stand-alone standard for the logistics industry. After consolidation with IPCDMC and others, GS1 is now looking at adding “Maritime Resource Name (MRN)” (IALA, 2020) as an identifier. This will then allow it to interlink its logistical standard with other shipping-related standards under the CMDS, such as S-211.

Besides the increase of quality and reliability of data streams as they are fused, there is an increase in value proposition when joining different data streams. This value creation is underpinned by the fact that different streams may have complementary data, which creates new information. The value proposition for a single data provider is limited, as potential clients might get access to data free of charge and therefore may not be willing to pay for services. Therefore, if data streams are fused and made available in a synchronised way, new value may be created that can be translated into costs for services and build the basis for the business case of service providers. Companies like “JAKOTA Cruise Systems GmbH” with its FleetMon product or “MarineTraffic” are two examples of industry actors combining data streams to generate business. Once data streams are fused, dedicated algorithms can be developed to further analyse the data and create new, enriched data sets. This newly created information goes up the value chain towards building knowledge to support decision-making by factoring millions and billions of data points. One example of such technology is developed by “Windward”, an analytics and AI company specialising in maritime applications.

## 6 Static and Dynamic Data Streams to Support Collaborative Decision-Making

In the digital era, data streams are often identified as static or dynamic data streams. Static data is characterised as data which is compiled and then used over a long period of time. In maritime, ENCs would fall into this category. Here a National Hydrographic Office takes hydrographic surveys and other relevant information and consolidates the results in nautical charts, which are updated from time to time but in between are used unmodified. (Hecht, Berking, Jonas, & Alexander, 2011).

Dynamic data is frequently changing data. Data about the tidal height (UKHO, 2016) or weather data are examples. Within the category of dynamic data exists both real-time data coming directly from sensors, like speed indications, and semi-real-time data, which is collected and then transmitted, like the tidal data in online portals such as the BSH Tide Data portal (BSH, 2020).

The integration of both static and dynamic data, be it real time or semi-real time, can provide additional situational awareness as it provides both knowledge about less volatile baseline data and data with high volatility. The benefit of gaining knowledge about the real situation increases the chance of making good decisions. In Watson et al. (2020), explanation of the “episodic tight-coupled aspect” indicates the value of combining dynamic and static data on operational aspects and explains how collaborative decision-making can improve operational results.

## 7 Conclusion

Digitalisation is an essential element in growing the economy in the twenty-first century. The maritime sector will need to fill the gap between the digitalisation already achieved in other sectors through Industry 4.0 and what has really only just begun in Maritime 4.0.

With more and more data streams becoming available, both static and dynamic, and the growing importance of IoT to the maritime industry, the need for harmonisation and standardisation is recognised by many to be critical. The maritime domain, however, due to its global character, needs to ensure worldwide adoption of the necessary standards and needs to foster open data streams so all can benefit from the data explosion fed by Maritime 4.0 and enabled by Maritime Informatics.

## References

- Bergmann, M. (2012). Public-private-cooperation models. e-Maritime Conference, Brussels, November 22–23, 2012.

Google Scholar

- BSH. (2020). BSH tide data. Retrieved from https://www.bsh.de/EN/DATA/Tides/tides_node.html

- European Commission. (2020). A European strategy on data. Communication from the Commission to the European Parliament, The Council, The European Economic and Social Committee and the Committee of the regions, Brussels, February 19, 2020.

Google Scholar

- Fraunhofer. (2018, August 28). PRESS RELEASE – Maritime 4.0: The digital ship as an information hub. Fraunhofer.

Google Scholar

- GIA. (2020). Draft just in time arrival guide. London: Global Industry Alliance.

Google Scholar

- GS1. (2014). EPC Information Services (EPCIS) version 1.1 specification – GS1 standard. Brussels: GS1 AISBL.

Google Scholar

- Hecht, H., Berking, B., Jonas, M., & Alexander, L. (2011). The electronic chart (3rd, revised ed.). Lemmer: Geomares Publishing.

Google Scholar

- IALA. (2019). IALA S-211 product specification – 1.1.0 – IALA port call message product specification. International Association of Marine Aids to Navigation and Lighthouse Authorities.

Google Scholar

- IALA. (2020). Maritime resource name. International Association of Marine Aids to Navigation and Lighthouse Authorities. Retrieved from https://www.iala-aism.org/technical/data-modelling/mrn/

- IEC. (2014). 61174 Ed.4 CDV – Annex S (normative), Route plan format for export and import – RTX/Z. International Electrotechnical Commission.

Google Scholar

- IEC. (2018). IEC CD 63173 – MARITIME NAVIGATION AND RADIOCOMMUNICATION EQUIPMENT AND SYSTEMS – DATA INTERFACES – Part 1: S-421 Route Plan based on S-100. International Electrotechnical Commission.

Google Scholar

- IHO. (2012). IHO Publication S-99 – Operational Procedures for the Organization and Management of the S-100 Geospatial Information Registry – Edition 1.1.0. Monaco: International Hydrographic Bureau.

Google Scholar

- IMO. (2013). NCSR 1/28 Annex 7 – DRAFT E-NAVIGATION STRATEGY IMPLEMENTATION PLAN. London: International Maritime Organization.

Google Scholar

- IMO. (2014). SOLAS Consolidated Edition 2014. London: International Maritime Organization.

Google Scholar

- IMO. (2019). FAL 43/7/1 – REVIEW AND REVISION OF THE IMO COMPENDIUM ON FACILITATION AND ELECTRONIC BUSINESS, INCLUDING ADDITIONAL E-BUSINESS SOLUTIONS. London: International Maritime Organization.

Google Scholar

- IMO. (2020). GloMEEP. Retrieved from https://glomeep.imo.org/

- IPCDMC. (2019). Terms of reference. International PortCDM Council.

Google Scholar

- Lind, M., Bergmann, M., Andersen, T., Haraldson, S., Ward, R., Bjørn-Andersen, N., Michaelides, M., Watson, R. T., Ferrus Clari, G., Zerem, A., Rylander, R., Gimenez, J., & Karlsson, M. (2019). Achieving compliance in collaboration and data sharing with PortCDM. International PortCDM Council (IPCDMC).

Google Scholar

- Lind, M., Bergmann, M., Ward, R., & Carson-Jackson, J. (2018, December). Port collaborative decision making. London: Seaways. Retrieved from www.nautinst.org/seaways

- Lind, M., Ward, R., Watson, R. T., Haraldson, S., Zerem, A., & Paulsen, S. (2020). Decision support for port visits (Chapter 11). In M. Lind, M. Michaelides, R. Ward, & R. T. Watson (Eds.), Maritime informatics. Heidelberg: Springer.

Google Scholar

- Pigni, F., Piccoli, G., & Watson, R. T. (2016). Digital data streams: Creating value from the real-time flow of big data. California Management Review, 58(3), 5–25.

Article

Google Scholar

- Schwab, K. (2017). The fourth industrial revolution. World Economic Forum.

Google Scholar

- The LINCOLN project. (2019). Retrieved from http://www.lincolnproject.eu/maritime-4-0-the-digital-innovation-disruption/

- UKHO. (2016). Admiralty Tide Table – NP201. Taunton: United Kingdom Hydrographic Office.

Google Scholar

- Watson, R. T., Lind, M., Delmeire, N., & Liesa, F. (2020). Shipping: A self-organising ecosystem (chapter 2). In M. Lind, M. Michaelides, R. Ward, & R. T. Watson (Eds.), Maritime informatics. Heidelberg: Springer.

Google Scholar

- Watson, R. T., Lind, M., & Haraldson, S. (2017). Physical and digital innovation in shipping: Seeding, standardizing, and sequencing. Proceedings of the 50th Hawaii International Conference on System Sciences.

Google Scholar

Download references

## Author information

### Authors and Affiliations

- BM Bergmann-Marine, Grosskrotzenburg, Germany

Michael Bergmann

- Windward, Tel-Aviv, Israel

Omer Primor

- MarineFields Holding Ltd., Limassol, Cyprus

Andreas Chrysostomou

Authors- Michael BergmannView author publications

Search author on:PubMed Google Scholar

- Omer PrimorView author publications

Search author on:PubMed Google Scholar

- Andreas ChrysostomouView author publications

Search author on:PubMed Google Scholar

### Corresponding author

Correspondence to
Michael Bergmann.

## Editor information

### Editors and Affiliations

- Research Institutes of Sweden (RISE) and Chalmers University of Technology, Göteborg, Sweden

Mikael Lind

- Department of Electrical Engineering, Computer Engineering and Informatics, Cyprus University of Technology, Limassol, Cyprus

Michalis Michaelides

- Pymble, NSW, Australia

Robert Ward

- Department of MIS, University of Georgia, Athens, GA, USA

Richard T. Watson

## Rights and permissions

Reprints and permissions

## Copyright information

© 2021 The Editor(s) (if applicable) and The Author(s), under exclusive license to Springer Nature Switzerland AG

## About this chapter

### Cite this chapter

Bergmann, M., Primor, O., Chrysostomou, A. (2021). Digital Data Sharing for Enhanced Decision-Making.

In: Lind, M., Michaelides, M., Ward, R., T. Watson, R. (eds) Maritime Informatics. Progress in IS. Springer, Cham. https://doi.org/10.1007/978-3-030-50892-0_10

### Download citation

- .RIS

- .ENW

- .BIB

- DOI: https://doi.org/10.1007/978-3-030-50892-0_10

- Published: 15 November 2020

-
Publisher Name: Springer, Cham

-
Print ISBN: 978-3-030-50891-3

-
Online ISBN: 978-3-030-50892-0

- eBook Packages: Business and ManagementBusiness and Management (R0)

### Share this chapter

Anyone you share the following link with will be able to read this content:

Get shareable linkSorry, a shareable link is not currently available for this article.

Copy shareable link to clipboard

Provided by the Springer Nature SharedIt content-sharing initiative

### Keywords

- Digitisation

- Digitalisation

- Real time

- Data sharing

- Decision-making

- Maritime 4.0

- Data

- Information

## Publish with us

Policies and ethics
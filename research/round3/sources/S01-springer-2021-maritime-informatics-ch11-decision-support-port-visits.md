# Decision Support for Port Visits

> **资料原文归档（Markdown 化）**
> 来源：https://link.springer.com/chapter/10.1007/978-3-030-50892-0_11
> 作者：Haraldson, Sandra, Lind, Mikael, Paulsen, Svend, Ward, Robert, Watson, Richard T., Zerem, Almir
> 出版：Springer，*Maritime Informatics*（2021，开放获取）
> 章节编号：ch.11 / R1-S1
> 归档日期：2026-09-17
> 获取方式：Springer 章节页面公开预览文本自动提取（非 PDF 全文，图表/参考文献可能缺失）
> 对应分析档：../r1-port-window-research.md（ch.11 / R1-S1 编号 S1/S2/S3）

---

Decision Support for Port Visits

Download book PDF

Download book EPUB

## Abstract

Ports have an important role for global trade. They serve as locations for transhipments to be made and as intermodal connection points between sea-based and land-based transportation. Some ports also offer additional services of refinement of goods that pass through them. For the port, there exist great challenges to balance between a large degree of flexibility on one hand and having a solid structure of plans for forthcoming visits by ships and different types of hinterland carriers.

Consequently, the well-coordinated port needs to be well-informed about when ships and hinterland carriers, as episodic Tightly Coupled actors, will use the port and consequently be able to make sound decisions about reserving appropriate resources and infrastructure to serve them. It needs a good understanding of the status of goods and passenger flows and to be able to track carriers’ movements so as to predict and coordinate the different types of events in the port. The Port Collaborative Decision Making (PortCDM) concept, the sharing of time stamps (A digital message with details of a planned or actual event.) for an emerging common situational awareness among involved participants, has been designed specifically to enable this.

In this chapter we elaborate on how data from systems of production channelise data to systems of record to serve the distributed coordination of port call operations pursued among engaged actors. Such systems of record form the foundation for an elastic approach to time slot allocation enabling the reservation of capacity among engaged co-producing port actors and the timely interaction of episodic Tightly Coupled actors.

Access provided by Dalian University of Technology.

Download chapter PDF

### Similar content being viewed by others

###
ICT Factors Affecting Ship Times in Container Ports: Experimental Analysis at Country Level

Chapter

© 2026

###
National and Local Factors Affecting Ship Time in Container Ports: System of Models at Country and Port Levels

Chapter

© 2026

###
Case Studies and Theoretical Approaches in Port Competition and Cooperation

Chapter

© 2021

### Explore related subjects

Discover the latest articles, books and news in related subjects, suggested using machine learning.

-
Bayesian Network

-
Public-Private Partnership

-
Supply Chain Management

-
Decision Making

-
Project Management

-
Logistics

-
Sustainable Energy Management in Port Operations

## 1 Introduction

The maritime sector seeks increased efficiency in moving goods and passengers from berth to berth, because of the intense competition between the various players, such as shipping companies, ports, global port operators, and hinterland operators. As global concern over climate change intensifies, opportunities are now being sought to reduce the environmental footprint of all forms of transport including sea transport. As a transport sector, the short sea shipping sector of the maritime industry also competes with options such as road and railway. However, because it is a self-organising ecosystem of many players, the maritime sector lacks the overall ability to optimise its operation. The risk of system detrimental suboptimisation is ever present when each independent player acts in its self-interest. Thus, there needs to be agreement that some actors occasionally might have less than optimal operations in order to ensure that the port ecosystem as an entity is operating optimally.

In most of the world’s busiest ports, the principle of first come first served is the standard practice, causing unnecessary inefficiencies and creating unnecessary externalities like high levels of pollution and greenhouse gas emissions. This is often the result of poor integration between contractual issues, legal constraints, and local practices resulting from decades of legacy customs and culture. Digitalisation of the maritime sector, e-Navigation efforts, and integration of sea transport into a holistic transport system call for enhanced harmonisation on a global scale so that the sum of the inherent issues of a self-organising ecosystem is resolved to improve sector efficiency.

Port visits, independent of the type of carrier, are of an episodic nature. Different types of trade are built upon different types of operational logic. The infrastructure and resources provided by the port will thus be co-utilised to serve the many episodic visits made by external actors for their distinct purpose of visiting the port.

This co-utilisation together with the distributed nature of port operations puts high demand on providing a solid foundation for making well-founded decisions. Even though the dominant logic for serving the port’s clients has been on a first come first served basis, the port of tomorrow (See Lind et al., 2020) needs to build upon a foundation that assures port call actors of a timely service at the same time enabling a high utilisation of available infrastructure.

This chapter firstly elaborates on the fundamentals of coordinated port operations. This is followed by a framework for how foundations may be established for involved actors’ common situational awareness of forthcoming and ongoing port calls used for each of the actors to align their plans in relation to others. This is done by sharing important data from each actor’s systems of production with a system of record for a port visit. One of the key foundations for establishing such system of record is to share and aggregate spatial-temporal data as the foundation for making reliable decisions on the timing of the different events related to each other. This is also the foundation for the necessary time slot allocation approach that is elaborated in the closing section of this chapter. Before considering the next steps in maritime digitalisation for more harmonised operations, the role of standardised data sharing and digitalisation is discussed to illustrate how such a shared system of record can be established through initiatives like Port Collaborative Decision Making (PortCDM).

## 2 Fundamentals of Coordinated Port Operations and the Potential Role of Data Sharing

Lately, a lot of attention has been paid to port call optimisation as an expression of the need to integrate sea and port operations. Consequently, this also means that port call optimisation needs to be integrated with inbound and outbound logistics. Ports are complex operations as they are hubs, though often regarded as a single actor serving sea and land transport. Nevertheless, they consist of multiple actors who must act cooperatively to be an effective hub.

When visiting a port, shipping companies and hinterland operators are episodically Tightly Coupled with a range of port facilities. They must participate in closely coordinating with both external and internal processes. In Fig. 1, the integration of internal and external collaborative processes associated with the various episodes of tight coupling of port call optimisation is depicted.

Fig. 1

Two related collaborative processes in port call optimisation (Lind et al., 2018a)

Full size image

Port call and other turnaround processes are constituted by a series of events and associated actors who need to coordinate their actions with others, maybe for the same event, and preceding and succeeding events. Digitalisation enables the sharing of standardised time stamps in real time among different port actors and episodic Tightly Coupled actors. Time stamps should reflect the progress of different events associated with a turnaround process. In the metro map depicted in Fig. 2, key states and core actors associated with a port call are captured. As revealed by this metro map, the services provided by port call actors come together at different coordination points and require the different services and infrastructure to be sequentially synchronised in time and space, for example, at various specified times and location:

-
Pilotage requires a vessel and a pilot.

-
Arrival and departure from berth requires a vessel and linesmen/moorers and tugs.

-
Cargo operations need a vessel, stevedores, loading/unloading equipment, and terminal.

-
Departure berthing requires the readiness of the vessel, linesmen/moorers, tugs, and pilots.

Fig. 2

Different states associated with the port call process (Lind, Haraldson, Karlsson, & Watson, 2016)

Full size image

The sharing of time stamps for planned and actual events enables actors to achieve enhanced situational awareness, which provides port call actors with enhanced capabilities to coordinate their operations just in time, thereby raising their efficiency and that of the entire system.

Within a port, there will be a number of simultaneous ongoing instances of port call processes, with multiple types of trade operating under different business logics. As the actor network within the port is highly complex and that a port in itself is not an organisational entity, it is unlikely that there will be one party that is able to talk on behalf of the whole port. Port operations therefore rely on collaboration.

Collaboration requires episodic tight coupling between two or more parties to fulfil agreements. The parties interact in patterns of initiatives and responses, such as executing an agreement between a ship and a terminal on the time and location of berthing and the availability of cranage for loading and unloading. This agreement will regulate temporal (when) and spatial (where) dimensions among other characteristics. The fulfilment of this agreement is initiated by someone acting as a representative of the ship and the ship operator ensuring that the ship is at the specified location at the specified time and that the tug operator must match the location and time and be ready to commence towing.

However, this collaboration process is also of interest to others involved in the sequence of activities that need to happen during a port visit. For example, if the terminal operator could get insights of a towage’s progress, it could adjust its plans accordingly. Because there are many actors in port call operations, there is a need to establish a schema of how collaborations can be facilitated by a real-time system of record of a port visit and be shared among involved actors. One of today’s challenges is that the industry has not arranged its installed base, in all its different parts, to share data to enhance collaboration. There is a need for message formats for capturing spatial-temporal data for essential actions emerging from collaboration revealing the status of a production system and by that enabling enhanced interoperability between systems, within the port, and to other systems along the maritime transport chain.

The industry thus needs to establish capabilities for collaborative dynamics enabled by digitalisation as a basis for everyone to be more informed. Collaboration releases data captured in a system of record to be shared among many and used for making well-informed decisions. The means for generating reliable and relevant data for such decisions is through collaboration and the use of multiple data sources.

## 3 Systems of Record Provide a Basis for Decision-Making

At its simplest, a system of record is a mechanism for recording and recalling details of obligations and events. Systems of record would have emerged at least with the beginning of agriculture, when farmers and traders needed to record transactions and obligations. The agricultural economy created a need for a long-lasting and unique record of transaction of activity. There was a parallel need for an information system to make sense of these recordings (reading) and teach others how to make them (writing). In the shipping industry, a system of record might store an obligation, for example, to provide a tug service and a certain date, time, and location for, say, 3 hours. It should also record how long the actual tug service event took.

Digitalisation has replaced early society’s manuscript records, and current systems of record are based on database and distributed file technology. Today’s organisation has many systems of record for areas such as production, sales, accounting, customers, and so on. A business cannot operate without systems of record, which ideally are based on a shareable, high integrity, and secure data management technology. While widely used, spreadsheets are a poor choice for a system of record, because, among other limitations, they are not readily shareable. Ideally, data from the various functional areas are integrated in a single database or data warehouse, but this is a difficult challenge, and often data are siloed in functional databases.

The first key task of a system of record, such as for the movement of ships within a port and their use of resources, is to provide a record of plans and actions. For example, a ship receives certain services during a particular time period and owes specific fees. In this role, a system of record supports the operations of a port, ship, terminal, etc. A second key purpose is to support a system of inquiry, such as data analytics, to learn from operational data to plan future port visits and the future of a port. For instance, a terminal operator might run predictive analytics on an appropriate system of record to forecast how long it will take to unload a ship given the location of every container to be offloaded from the ship when in the port. It can only undertake such an estimate if, over a period of time, it collects precise unloading data that includes the original positions of every unloaded containers on a ship and how long it took to move each one to the dock.

Every system of production should produce a system of record that collects and stores data that records intentions and actuals in sufficient detail to support operational actions and tactical and strategic planning. These records can then be shared among all involved participants, thereby reducing the risk of suboptimisation.

### 3.1 Systems of Production Create Systems of Record

Sea transport is a self-organising ecosystem (Watson, Lind, Delmeire, & Liesa, 2020), and we reiterate some key aspect of its nature:

-
All organisations and ecosystems are in the business of capital creation (Watson, 2019). Typically, they pursue economic capital creation, but some pay prime attention to other forms, such as universities which deal primarily in human capital. A shipping company creates economic capital by using its ships (economic capital) to move products from export to importer. A port creates economic capital by using its location and harbour (natural capital) and infrastructure (economic capital) to serve Tightly Coupled episodes among actors, such as sea-based and land-based carriers, in their efforts of enabling passengers and/or goods to be moved to another carrier.

-
Organisations can employ multiple combinations of systems of engagement, framing, inquiry, production, and record in their capital conversion repertoire. Shipping is a system of production because it follows routine practices in transporting goods. It also creates a system of record, as do all actors in the ecosystem.

-
The goal of an organisation or ecosystem is to create a competitive bundle of complementary capitals and capital conversion processes. Digitalisation is an opportunity to change the competitiveness of a capital bundle.

In Table 1, these system types are depicted with examples from the shipping sector (Haraldson et al., 2020; Watson, 2019).

Table 1 Types of systemsFull size table

Every organisation or ecosystem is thus built around systems of engagement to attract customers and around systems of production to meet customer’s needs. Both types of systems create systems of record, such as a customer database and records of business processes involving the different production facilities. A further system of record is needed to record details of events related to producing a good or service.

As the ecosystem of shipping is characterised as being self-organised, it becomes crucial for involved actors to be informed of what others have agreed upon and progressed.Standardised data sharing of which systems of record, reflect the content of systems of production, provides a scope that stretches beyond the port actors’ areas of operations and provides port actors with all the necessary contextual information. In Fig. 3, the relationships between the two types of systems are depicted.

Fig. 3

The interplay between system of productions and systems of record as a mean for distributed coordination and optimisation (Haraldson et al., 2020; Lind et al., 2018b)

Full size image

Digitalisation is becoming more apparent to support maritime transport and thereby providing great opportunities for actors to supporting their distributed coordination. Among other things, the era of digitalisation can feed data of planned and conducted transactions into systems of record to be shared among involved stakeholders and analysed to support production system optimisation. To gain maximal value from production system data, it should record spatial-temporal digital data for each activity, such as ship movement capture by AIS (the ship automatic identification system), and spatial-temporal data on plans and progress. Thus, for each event the location and time as well as its characteristics should be recorded.

Fundamentally, there is a need to enable the sharing of data from the core events constituting the port call process. One of the approaches that has surfaced for such purpose is PortCDM (Lind et al., 2018a) building its logic upon supporting the establishment of systems of record, based upon collaborative foundations, being used for the involved actors to coordinate their actions. In this way, PortCDM is not intended to be the planning tool for activities in a port call. PortCDM is intended to provide all actors within and around the port call process with common situational awareness emerging from a system of record (Lind et al., 2018b). These systems of record can assist in fine-tuning existing port call plans, once they have been established. Records captured in the system of record are used in a system of inquiry (Watson, 2019) providing foundations for analytics used for making well-informed decisions as well as evaluating the performance of the ecosystem. Through the establishment of the system of record, authorised participating actors will thus be able to obtain a common situational awareness for the purpose of enhanced planning and in that way, at an early stage, become informed about any upstream disruptions potentially affecting their operations.

### 3.2 The Value of Systems of Record in Actor’s Planning

The successful operation of a port requires its independent parties to share data to ensure efficient episodic tight coupling, such as when a tug aids in berthing a ship. To move beyond an operational perspective to long-term resource management, a greater level of data exchange is required to legitimise investments being made. Long-term resource management both provides a structure for forthcoming operations and provides the basis for flexibility.

A port and its independent parties are expected to have a system of production (c.f. Haraldson et al., 2020) in place for fulfilling its most important tasks, where a system of production is a repetitive sequence of coordinated actions that might be divided among actors to achieve a goal. We can think of a ship’s visit as a system of production with each of the actors performing their specific task, but we also need to recognise that each of the parties has a separate system of production (e.g. the terminal operator) and an associated separate system of record. Two aspects thus become important:

-
1.

The sharing of accurate and detailed real-time data associated with plans and progress

-
2.

Alignment of each actor’s intention to enable effective and efficient episodic tight coupling in a timely manner

These two ingredients would create a “system” of data sharing, giving rise to well-coordinated port call processes based on high degrees of predictability and situational awareness (c.f. Lind et al., 2018c).

However, it must be acknowledged that many of the thousands of ports in the world already have some form of installed base of digital infrastructure, each of them supporting the system of production that enables port calls to meet an expected level of quality. Ports might also have a digital infrastructure in place for capturing systems of record, but most often those have been installed for other reasons than long-term and short-term port call coordination efforts, for example, port community systems put in place to support administrative processes. To allow for an emerging systems of record to be effective enough to support decision-making, it needs be connected to the different systems of production that concern the utilisation of the port infrastructure to:

-
Ensure that enough data is captured enabling as comprehensive common situational awareness as possible

-
Ensure that those involved have aligned foundations to enable them to share their recorded time stamps and thereby allow those time stamps to be matched with others, of the same type or other types

As ports are, in their planning processes, dependent on what happens outside the port, connectivity to outside systems also becomes a necessity. The reasonable way forward is to establish standardised interfaces between different systems to enable standardised sharing of spatial and temporal data associated with the visits being, or about to be, conducted by episodic Tightly Coupled actors.

Since event changes in the system of production are instantly captured and then can be shared in the system of record, it is possible for an individual actor to be notified of desired event changes, such as a ship arriving to the pilot boarding area, and also be informed of possible deficiencies in the overall plan of the port call process. In this way engaged actors may get alerts and indications for:

-
Missing data, which directs attention towards possible missing data in the system of record based on when they should have occurred in a system of production. One example is a pilotage need requested and confirmed some predefined hours before arrival.

-
Conflicting data, which directs attention towards actor’s different conceptions of time stamps. An example is when a port authority, the terminal operator, and the captain report different estimated times of arrival to berth.

-
Unreasonable relationships, which directs attention towards the relationships between different time stamps. An example is when the time between estimated times of pilotage commenced and arrival at berth differ outside a defined range.

### 3.3 Decision-Making in Ports: It Is Not Just About Serving Ships

Port call processes build upon patterns of activities conducted by diverse actors that provide services. There are at least four simultaneous ecosystem-oriented systems of production processes that need to be interlined:

-
Sailing ships berth to berth

-
Serving ships according to their needs

-
Loading and discharging cargo/passengers

-
Bringing goods from a hinterland hub to the terminal, or vice versa

In Fig. 4, these systems of production are depicted. The system of record revealing the progress of actions in those systems of production is thus a complementary product of the actions pursued in the systems of production.

Fig. 4

The port as a transhipment hub (Lind et al., 2018c)

Full size image

A port’s operations rely on insights from all of these four production processes since each production process is dependent on consuming data from all three systems of record and about the progress in other production processes. To support each actor’s individual decision-making, it is therefore important that the systems of record are built upon a commonly agreed logic of data sharing needs for each situation by:

-
Providing situational awareness

-
Aligning different actors by revealing diversities and unrealities in their timing of episodic tight coupling and ensuring that essential data for the coordination of a port call are shared in a timely manner

## 4 Foundational Building Blocks of the PortCDM Concept

PortCDM records data about relevant actions completed by the production system, resulting in a system of record that can be analysed to enhance the quality of the production system as well as informing ecosystem members of their plans and performances.

During the last decade, the PortCDM concept has been defined and validated within the European Union (EU)-sponsored MONALISA 2.0 and the Sea Traffic Management (STM) Validation projects. The PortCDM concept is an important enabler for the efficient, safe, and environmentally sustainable sea voyage berth to berth. The PortCDM concept comes with operational and technical guidelines for enhanced collaboration and data sharing. At the core of the PortCDM concept is to facilitate the establishment of a system of record building upon being connected to systems of production associated with four arenas of collaboration:

-
Internal collaboration within the port

-
External collaboration with ships

-
Other ports

-
Hinterland operators and end customers

PortCDM builds upon sharing time stamps between different port call actors as the basis for:

-
Providing enhanced accuracy of essential time stamps in the port call process

-
Providing a basis for each port call actor to align the plans of their operations

-
Establishing a continually emerging common situational awareness among involved actors.

Common situational awareness is a reflection of the content of the current systems of record concerning a particular port call at a particular time. This also means that when the system of record captures plans, or their realisation, of events in the systems of production, situational awareness will be updated. By establishing a communication channel for updating each other in real time, port actors can maintain an accurate situational awareness (see Fig. 5).

Fig. 5

The role of PortCDM (Lind et al., 2018c)

Full size image

PortCDM provides a system of record for a ship’s port visit and other visits of episodic Tightly Coupled actors, such as hinterland carriers (Lind et al., 2018c). Through advanced analytics, it helps to optimise and synchronise the series of events associated with the visit of a particular to a port.

As shown in Fig. 6, PortCDM’s unified message format (S-211) supports the digital exchange of data related to a port call, elements of its system of record, to promote coordination among port actors and situational awareness by enabling actors to benefit from the time stamps provided by other actors. Its flexible design supports the recording of planned and completed events. Its extensible nature means it could also include agreements on the provision of services. As a port call occurs across space and time, PortCDM records spatial-temporal attributes and other data for each event planned or executed during a port call.

Fig. 6

PortCDM framework

Full size image

Because maritime operations are conducted in a highly distributed and diverse environment, it is essential for those involved to know the plans and progress of complementary actors in a port visit.

It can also be described in the following way that PortCDM’s system of record is a digital intermediary between “those who know” and “those who need to know” about port call process. PortCDM derives its effectiveness from:

-
Being a system of record for all port visits

-
Use of standardised message format for capturing and sharing event data

-
Enabling real-time sharing of planned and executed event data

-
Use of a unique identifier for each ship’s port call

Finally, a system of record is the input to a system of inquiry, such as machine or data analytics. As such PortCDM is both a system for managing the present, a ship’s visit (and other episodic Tightly Coupled actors); and the input to a system for planning the future, a port’s capacities.

The goal of PortCDM of minimising ship turnaround times and improving the predictability of the key events in the port call process is limited by insufficient data resources. It is therefore necessary that PortCDM works in alignment with integrating additional types of data from systems of production to ensure a port has the right long-term mix of resources to minimise ship turnaround. For example, data analytics might reveal that the presence of an additional pilot would over a year reduce ship turnaround by, say, 10% due to the ability to conduct more parallel assignments of pilotage and thereby avoid unnecessary waiting times.

Planning for one visit can improve efficiency, as PortCDM has shown, and planning for hundreds of visits will give efficiency another major boost.

PortCDM thus brings collaborative dimensions into port call coordination (port internal collaboration) and port call synchronisation (port external collaboration) into focus. This does not mean that the port call process is optimised, but it does mean that some, though incomplete, data are available for others to start an optimisation process for port calls and other operational services. PortCDM creates a system of record, based on a port’s actors’ systems of production, which can fuel data analytics, artificial intelligence, and machine learning.

PortCDM is positioned as a concept that through its recommended message format stresses the importance of running the production system without any misunderstandings on key episodes (such as the estimated time of arrival), but also as a creator of a system of record.

For example, planning a port call cannot solely rely on the situation in the port. It builds upon insights on the status of related actors, such as events and progress in the previous port, and movement of ships, and hinterland transport. Today, the system of record is often incomplete and thus not well-suited for learning through data analytics.

An implemented system building upon PortCDM according to its objectives can address this issue. It will require standardised message formats and interfaces for a port’s systems of production. In this way, the system building upon PortCDM would enable each actor to plan what resources need to be available in different future coupling episodes contributing to an optimised port. The concept of PortCDM’s current system of record reveals what operations were planned for and conducted during a visit, but it has no details of what resources in total were available at the time of the visit or the pattern of resource usage over an extended period. This requires additional details of resource utilisation to be aligned with PortCDM.

## 5 Shared Situational Awareness Enabling Time Slot Allocation

### 5.1 Time Slot Allocation Can Improve Maritime Operations

In an ideal world, a ship sails at an economical speed that minimises its environmental footprint and arrives at its destination in accordance with its passage plan, enters port, and begins unloading/loading operations without delay. After a smooth and uninterrupted loading and any necessary maintenance and other administrative matters, the ship then leaves as planned and makes passage to its next port, where the same pattern of events is repeated. Regrettably, this happens all too rarely. The PortCDM concept and port call optimisation initiatives are seeking to change this by avoiding the traditional “hurry up and wait” and “first come first served” principles that predominate the port call process today.

PortCDM relies on data sharing using standardised digital data exchange that allows all actors in the port call process to access the same, up-to-date information about plans and progress related to a ship’s port call. This means that all the actors share the same situational awareness and can coordinate their activities and adjust and adapt their individual contributing plans and timings according to the most up-to-date forecasts for key events.

A key element in making an efficient port call is the determination and allocation of the times when certain key events will begin and end, such as port arrival, berthing, commencement, and completion of unloading/loading and departure. If all the involved port call actors meet those times, then a port visit is perfectly synchronised.

Initiatives, such as PortCDM and port call optimisation, have been developed specifically to increase the efficiency and predictability of maritime transport, especially port operations, by looking at how to synchronise activities for ship arrivals, port call operations, and ship departures to ensure a continuous flow of activity with a minimum of waiting time for any of the involved actors. Agreeing on timing ensures an uninterrupted flow of productive activity. It is the foundation for the parties involved in a port call to align their respective actions to enable coordinated and synchronised events, such as just-in-time arrival, just-in-time service provision, and just-in-time departure. This is, in effect, time slot allocation at work.

### 5.2 Time Slot Allocation: A Common Approach for Synchronisation in Human Practices

The commercial aviation sector has particularly effective arrangements that control the movement of aircraft by assigning slot times for key events. This ensures that the multitude of facilities on the ground are synchronised to minimise delays to the aircraft schedule. Slot allocations are also used to control and maintain safe airspace for aircraft both when moving around an airport and when flying from destination to destination. The larger commercial airports require airlines to secure an arrival slot before taking off from their origin airport.

Within aviation, allocating slot times contributes to:

-
More reliable schedules for arrival and departure

-
Better and more efficient use of airport resources

-
Improved fleet utilisation by airlines

-
Safe and efficient transit—especially in congested areas

These gains would be most welcome if they occurred in the maritime sector, which is now being driven by public pressure for less environmental pollution and more reliable, timely, and cost-effective deliveries, together with meeting the enduring need of all those involved to minimise their costs.

The concept of using time slots to synchronise activities is neither unique nor new. For example, physicians and hospitals use slot management. Universities break the day into slots when professors and students meet for class. The booking system for hotel rooms is, in effect, slot allocation, where each room is a slot for a particular day. Once the room slot is allocated as a “confirmed booking”, then the various support services such as the room preparation and perhaps breakfast preparation can be arranged and synchronised to ensure a complete service for the customer.

Returning to the aviation industry as one model, while there are obvious benefits from using time slots to synchronise Tightly Coupled events, there are some factors in maritime transport that need special attention. In particular, slot allocation in the maritime domain must be inherently more flexible than aviation to cater for the longer lead times and inevitable unpredictable delays that occur in ship operations. In addition to the obvious need to include a limited amount of buffer time in critical event slots, there must also be a process in place that alerts all those involved as soon as possible when any of the contributors to a slot event cannot meet the previously agreed slot time. This could be caused by such things as the late arrival of a ship, a breakdown of equipment in the port, or the late departure of another vessel that is using the same resources needed for an arriving ship. A major difference between seaports and airports is that seaports are more self-organised and depend upon the capabilities of a multitude of actors to coordinate their respective actions for the better good of a shared common object of interest—the port call. Overall, the ports of the world distribute the responsibility of coordination differently to airports, and there is also variation among ports.

Obviously, it is in the interests of a ship, as well as the other actors involved, to meet an original time slot whenever possible, thereby maximising efficiency and the allocation of their resources. When circumstances change, however, the originally designated time slot must be rescheduled, with inevitably some delays and disruptions to some or all of the involved actors—as is the case today. However, under an efficient data sharing and coordination environment such as can be established under the PortCDM concept, efficient rescheduling should be easier to achieve. This is because, under PortCDM, all those involved can be alerted at the earliest opportunity when any actor is unable to meet an allocated time slot. In addition, the common situational awareness that PortCDM and data sharing provides means that actors can more easily determine when the next opportunity arises for them to meet the particular port call requirements assigned to the slot and to identify what impact, if any, this may have on the other involved actors.

### 5.3 Synchronising Tightly Coupled Events During a Port Visit

A port call involves numerous different actors—each with a particular activity or role to fulfil. For example, the pilot and tugs must act together before a vessel can berth. Stevedores must prepare the dockside before a ship can come alongside, and line handlers must be ready to secure the ship as it approaches its berth. In any port call, there are numerous similar episodes of tight coupling where one activity cannot proceed without another taking place either beforehand or at the same time. Optimising the allocation of these resources has always been a challenge, particularly when the notice or request for the resources is made late, which is often the case.

The challenges in managing, scheduling, and synchronising a port’s resources also vary according to port size. Large ports may have more flexibility because they have more resources (such as the number of pilots and tugs and berths), whereas small ports often have particularly constrained resources—perhaps only one pilot and few berths. At the same time, large ports service more ships and can be subject to consistent excess demand, whereas a small port might face major variations in demand for its services. Considering all these different factors, it is likely that a small number of them could actually limit the overall capacity of a port and, as such, the number or cumulative total of slots available on any day. It might be the total number of berths in the port or the number of hours of access to the port due to tides. Knowing what the critical limiting factors are will influence how and by whom slots are initially allocated. It could be the terminal operator, the harbour authority, or others, according to the circumstances of the port.

### 5.4 Improved Capital Productivity

Specifically allocating slots by time and place can enable ports to better coordinate the planning and utilisation of the available resources for all the planned episodes of tight coupling.

Under a slot allocation regime, a port’s service providers offer their resource as sets of slots that enable a required service to be completed during the booked slot period. Slot allocation forces each service provider to determine their available resources and manage them to meet their obligations.

As an example, the pilotage activity in a port might occupy slots of say, 2 hours, based on the time for a pilot to meet an incoming ship, guide it to its berth, and return to meet another incoming ship. Slots might need to include an element of slack time (buffer time) to cater for unforeseen delays, but this should be limited. In effect a slot is a window with an expected start and finish time. Knowing the time, duration, and location that a slot refers to means that all involved parties can then commit to providing the necessary resources. As a result, a port call can be coordinated by relating a series of multiple connected time slots.

Fixed slot allocation already happens in some ports and terminals, particularly for regular services such as container liners requiring dependable berthing windows and berths week after week so as to meet their scheduled service. Allocating such fixed slots means that containers and cargo can be stacked in a timely manner close to the designated berth resulting in the shortest transit distance to the vessel during loading.

### 5.5 Time Slot Allocation Requires Standardised Data Sharing and Common Situational Awareness

The key to effective time slot allocation is data sharing between all the involved actors using a standardised data exchange format. Using digital data sharing then enables all the actors to share the same situational awareness picture. Importantly, when an event that is included in the situational awareness picture changes, such as a delay or a required rescheduling of a slot, all actors can be alerted immediately, and an iterative process can begin to find an optimal adjustment.

The longer the time horizon available for committing to a time slot, the more easily contributing parties can manage their resources. It also follows that as soon as any actor finds that they are unable to meet a particular time slot, then this should be declared so that the maximum amount of time remains for other actors to make adjustments and thereby minimise ripple effects.

### 5.6 Towards a Common Approach for Time Slot Allocation Empowered by PortCDM

To illustrate the principle of time slot allocation in shipping, Fig. 7 shows how slots might be arranged and confirmed. Once a slot is identified by the key actors, then the various other service providers can be invited to confirm that they can meet the relevant requirements for that slot. If they cannot, then a process of iteration can begin so that a number of sequential slots can be mutually determined and reserved that will together meet the full requirements of the port call with a minimum of waiting for all involved.

Fig. 7

Time slot allocation throughout the series of events that constitutes a port call of which different port actors are involved

Full size image

The dotted arrows in the figure indicate that there will be occasions when there is a need to reschedule a previously agreed slot due to disruptions which could be caused by delays at the previous port or because the current port call might not be proceeding according to plan (delayed or finished earlier). In the case of such a delay, or even an early arrival, the same process would be initiated for managing the process of reallocation starting with confirming the capability of the terminal operator to berth the ship at a different time.

This process shown in Fig. 7 is not markedly different from how port calls are currently arranged. However, a key difference is that the coordination and synchronisation process is done primarily through digital data sharing as an iterative, on-line process rather than through individual one-to-one interactions and negotiations between the various actors.

As shown in Fig. 7, negotiation might start between the representative of a ship and a terminal operator to identify an appropriate time slot, often as a part of the contractual arrangement. As the date or time for the slot gets closer, other port call actors would become involved using the initial negotiation between the ship representative and the terminal operator as their point of departure. Depending on the type of trade, this might take place a long time before the actual port call, such as is the case for cruise ship visits, or may be framed within a larger agreement, such as within container scheduling or recurrent ferry visits capturing multiple port calls within the same agreement, or it may concern one visit as might happen in the bulk and general cargo trade.

The initial agreement between the ship representative and the terminal operator will form the foundation for other actors within the port to agree with the ship representative for activities related to passage to/from berth and for services. Other actors will negotiate agreement around this foundational time slot allocation.

Digital data sharing of a ship’s progress will enable a time slot allocation to be revised, if necessary, and thus there is greater opportunity to maintain the desired synchronisation between the client’s (the shipping company) requirements and the service providers.

By collecting performance times for each slot in a port, predictive analytics can be used to provide guidance on improving timings including buffer times for each service in each port. Of course, the long-term goal is to minimise buffer times since they lower resource utilisation.

## 6 Outlook: What Will Happen Next?

The establishment of message formats, communication channels, and interaction procedures are just foundational capabilities. The real benefits come when data derived from different areas of operations and related systems of production in the ecosystem are used in optimising the overall ecosystem’s performance. The winners are not the ones that are in possession of data, but the ones who can optimise for the good of the whole ecosystem. This is also a call for innovators to enter and enrich the maritime sector by offering new digital value-adding services.

By increasing its information richness through digital data sharing, the maritime transportation sector can improve resource management and its overall efficiency. Ship movements can be conducted with a reduced carbon footprint and a port’s resources more fully utilised.

Every industry needs to continually adapt its practices to take advantage of technology that raises its capital productivity. Time slot allocation, a mechanism to synchronise joint actions, is a concept that works well in other sectors. With the support of digital technology, it should therefore also be considered for shipping.

## References

- Haraldson, S., Lind, M., Breitenbach, S., Croston, J. C., Karlsson, M., & Hirt, G. (2020). The port as a set of socio-technical systems: A multi-organisational view (Chapter 4). In M. Lind, M. Michaelides, R. Ward, & R. T. Watson (Eds.), Maritime informatics. Heidelberg: Springer.

Google Scholar

- Lind, M., Bergmann, M., Haraldson, S., Watson, R. T., Park, J., Gimenez, J., & Andersen, T. (2018a). Port Collaborative Decision Making (PortCDM): An enabler for Port Call Optimization empowered by international harmonization. Concept Note #1, STM Validation Project. Retrieved from https://www.ipcdmc.org/galerie

- Lind, M., Bergmann, M., Haraldson, S., Watson, R. T., Park, J., Gimenez, J., & Andersen, T. (2018b). The skilled collaborators – The winners in a digitized maritime sector. Concept Note #2, STM Validation Project. Retrieved from https://www.ipcdmc.org/galerie

- Lind, M., Bergmann, M., Haraldson, S., Watson, R. T., Park, J., Gimenez, J., & Andersen, T. (2018c). Enabling effective port resource management: Integrating systems of production data streams. Concept Note #3, STM Validation Project. Retrieved from https://www.ipcdmc.org/galerie

- Lind, M., Haraldson, S., Karlsson, M., Watson, R. T. (2016). Overcoming the inability to predict – A PortCDM future. 10th IHMA Congress – Global Port & Marine Operations, Vancouver, Canada, April 30–May 2, 2016.

Google Scholar

- Lind, M., Ward, R., Bergmann, M., Haraldson, S., Zerem, A., Hoffman, J., & Eklund, E. (2020). Maritime informatics for increased collaboration (Chapter 8). In M. Lind, M. Michaelides, R. Ward, & R. T. Watson (Eds.), Maritime informatics. Heidelberg: Springer.

Google Scholar

- Watson, R. T. (2019). Capital, systems and objects: The foundation and future of organizations. Athens, GA: eGreen Press.

Google Scholar

- Watson, R. T., Lind, M., Delmeire, N., & Liesa, F. (2020). Shipping: A self-organising ecosystem (Chapter 2). In M. Lind, M. Michaelides, R. Ward, & R. T. Watson (Eds.), Maritime informatics. Heidelberg: Springer.

Google Scholar

Download references

## Author information

### Authors and Affiliations

- Research Institutes of Sweden (RISE) and Chalmers University of Technology, Gothenburg, Sweden

Mikael Lind

- Pymble, NSW, Australia

Robert Ward

- University of Georgia, Athens, GA, USA

Richard T. Watson

- Research Institutes of Sweden (RISE), Gothenburg, Sweden

Sandra Haraldson & Almir Zerem

- Pragmatique Denmark, Copenhagen, Denmark

Svend Paulsen

Authors- Mikael LindView author publications

Search author on:PubMed Google Scholar

- Robert WardView author publications

Search author on:PubMed Google Scholar

- Richard T. WatsonView author publications

Search author on:PubMed Google Scholar

- Sandra HaraldsonView author publications

Search author on:PubMed Google Scholar

- Almir ZeremView author publications

Search author on:PubMed Google Scholar

- Svend PaulsenView author publications

Search author on:PubMed Google Scholar

### Corresponding author

Correspondence to
Mikael Lind.

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

Lind, M., Ward, R., Watson, R.T., Haraldson, S., Zerem, A., Paulsen, S. (2021). Decision Support for Port Visits.

In: Lind, M., Michaelides, M., Ward, R., T. Watson, R. (eds) Maritime Informatics. Progress in IS. Springer, Cham. https://doi.org/10.1007/978-3-030-50892-0_11

### Download citation

- .RIS

- .ENW

- .BIB

- DOI: https://doi.org/10.1007/978-3-030-50892-0_11

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

- Situational awareness

- Time slot allocation

- Port call optimisation

- Systems of record

## Publish with us

Policies and ethics

### Profiles

-
Richard T. Watson

View author profile
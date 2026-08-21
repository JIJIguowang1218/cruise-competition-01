# 演示模拟数据 Schema 与编号体系（v0.1）

> 目的：让 demo 能由 mock 数据驱动、所有按钮有内容；编号/留痕可溯源（答辩要用）。
> 数据 = `mock-data.js`（window.MOCK）；引擎 = `sim-core.js`（浏览器内"仿真核=Fake 后端"）；渲染 = 由 sim-core 计算出的"时间分段"实时生成多段矩形。
> 真实产品：同一 schema 由船载本地服务提供，契约一致；演示用浏览器内仿真核模拟，不需要真后端。

---

## 1. 编号与追溯体系（traceability identity）

### 1.1 分层编号
| 层 | 编号 | 示例 | 说明 |
|---|---|---|---|
| 会话 | `voyageNo` | `VN-0420` | 船次+航次，会话级 |
| 事件 | `eventNo` | 库内 `E01-0001`；库外 `X-0003` | 稳定、人读：`E{事件库ID}-{本次流水}` |
| 追溯 | `trace_id` | `A13F-9B2C` | 8 位十六进制，由(eventNo+discoverAt)确定性哈希得到；可复制/扫码，稳定唯一 |
| 审计记录 | `{trace}-A{n:03}` | `A13F-9B2C-A001` | append-only 审计条目 |
| 端口执行 | `{trace}-P{portCode}{n:03}` | `A13F-9B2C-PAPP001` | 每个告知/执行端口的执回执 |
| 审批/签署 | `{trace}-S{roleCode}{n:03}` | `A13F-9B2C-SCAPT01` | 每个审批/签署动作 |
| 动作执行 | `{trace}-X{actionId}{n:03}` | `A13F-9B2C-XA02001` | 动作库 A01–A19 落地 |
| 人工处置单 | `{trace}-JOB{n:03}` | `A13F-9B2C-JOB001` | 转人工接管/最小登记 |

### 1.2 端口码 / 角色码
- 端口：`APP`(乘客App) `SCR`(船载屏) `PA`(广播) `CRW`(船员端) `OTA`(OTA/客服) `VIS`(港口/外部) `MGMT`(内部系统)
- 角色：`DUTY`(值班) `MGR`(经理) `LEGAL`(法务) `CAPT`(船长) `MED`(医疗) `ENG`(工程)

### 1.3 哈希链（留痕防篡改）
- 每条审计记录：`hash_i = H(hash_{i-1} + recordNo + payload)`（demo 用 FNV-1a；生产用 SHA-256）。
- `audit[0].hash` 为头哈希（hash(seed)）；任一条被改 → 链断裂，校验报错。
- 界面展示：审计 Tab 显示"append-only · 哈希链 · 可导出 PDF"。

---

## 2. 事件对象（一个事件的完整档案）

> 每个字段负责界面某处；sim-core 主要读 `timeline`（2.2），交互写 `state.machine`（2.4）。

### 2.1 事件头
`eventNo` `name` `type`(E-xx) `level`(L1–4) `category` `semanticType`(任务/持续运营/峰值计划) `state` `currentRole` `needsCaptain` `pinned` `flash` `foldGroup`

### 2.2 时间锚（引擎画多段矩形的依据，秒=会话内偏移）
- `discover: {at, signals[], confidence}`
- `handoffs: [{at, from, to, kind: "normal"|"error"}]` → 瞬时移交竖线
- `approval: {waitStart, dueAt, outcome, decidedAt}` → 待确认/审批等待段(§12)
- `exec: {from, to, port, status}`
- `holding: {from, to}`, `peakMark: bool` → 受控持续段/峰值标记
- `recoverAt` → 恢复空心点
- `upgrade: {to, at, reason: "timeout"|"physical"}` → 升级红竖线+双因
- `outlib: {isX, riskLevel}` → 库外灰矩形

### 2.3 决策卡/推理/审批/端口/审计
- `summary` `confidence` `reasoning{sections[]}` `alternatives[]` `clauses[{id,snippet}]`
- `chain[{role,status,actionAt}]` `currentStep` `dueAt` `takeover{taken,by,at,note}` `escalate{to,reason}`
- `ports[{portCode,status,at,content}]`
- `audit[{no,at,actor,action,payload,hash}]`

### 2.4 状态机
- `state.machine = { current, allow:[...] }`；动作：confirm / refuse / takeover / (系统)upgrade / justHandle
- 转移规则（不允许组合，demo 先实现核心）：待审批:→confirm/re/takeover/超时upgrade；执行:→recover；接管:→(仅人工)…

---

## 3. 校验规则（validate.js / 生成前自检）
- 编号唯一（eventNo、trace_id 不冲突）
- 时间锚严格升序：`discover.at < handoff.at <= approval.waitStart < decidedAt < exec.from < ...`
- `approval.dueAt = waitStart + level时限`
- 有移交竖线才可能有审批等待段；有审批等待段才可能有执行段（除"受控持续"与"接管"例外）
- 端口/角色/状态取值必须在枚举内；升级 reason 仅 timeout/physical
- 有最终段的"该闭合的时刻"对应的恢复点/关闭标记必须存在（沿用 grammar §9.1 一致性）

## 4. 怎么加一条事件（Authoring，面向你我）
1. 说"在 XX 阶段加一条 E01，约 5 分钟后移交值班、2 分钟后确认"；
2. 我按现有阶段时间轴**自动算偏移**，按 schema 插入 `mock-data.js`；
3. 跑 validate 自检（时间有序/编号唯一/枚举合法）后，图即自动生成。

## 5. 变更记录
- v0.1（2026-08-20）：编号体系 + 事件 schema + 校验规则 + 待确认/审批等待段（grammar §12）落地。

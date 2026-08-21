# 演示模拟数据 Schema 与编号体系（v0.4）

> 目的：让 demo 能由 mock 数据驱动、所有按钮有内容；编号/留痕可溯源（答辩要用）。
> 数据 = `mock-data.js`（window.MOCK）；引擎 = `sim-core.js`（浏览器内"仿真核=Fake 后端"）；渲染 = 由 sim-core 计算出的"时间分段"实时生成多段矩形。
> 真实产品：同一 schema 由船载本地服务提供，契约一致；演示用浏览器内仿真核模拟，不需要真后端。
> 版本说明：v0.4 = 落实 2026-08-22 规则修订——①挂起=琥珀点闭合（不再长期占车道）、再检/衍生=新事件且仅日志 lineage；②航变/赔付风险 = 本系统 AI 推理产物（弱信号→信度→升级事件）并同步法务/客服端口；③parentTrace 血缘字段。

---

## 1. 编号与追溯体系（traceability identity）

### 1.1 分层编号
| 层 | 编号 | 示例 | 说明 |
|---|---|---|---|
| 会话 | `voyageNo` | `VN-0420` | 船次+航次，会话级 |
| 事件 | `eventNo` | 库内 `E01-0001`；库外 `X-0003`；衍生 `E01-0001-C1` / `X-0003-C1` | 稳定、人读：`E{事件库ID}-{本次流水}`；`-C{n}`=衍生子事件 |
| 追溯 | `trace_id` | `A13F-9B2C` | 8 位十六进制，由(eventNo+discoverAt)确定性哈希得到；可复制/扫码，稳定唯一 |
| 血缘 | `parentTrace` | `A13F-9B2C` | 衍生事件记录其来源事件 trace_id（**仅日志关联，时间轴不画连线**） |
| 审计记录 | `{trace}-A{n:03}` | `A13F-9B2C-A001` | append-only 审计条目 |
| 端口执行 | `{trace}-P{portCode}{n:03}` | `A13F-9B2C-PAPP001` | 每个告知/执行端口的执回执 |
| 审批/签署 | `{trace}-S{roleCode}{n:03}` | `A13F-9B2C-SCAPT01` | 每个审批/签署动作 |
| 动作执行 | `{trace}-X{actionId}{n:03}` | `A13F-9B2C-XA02001` | 动作库 A01–A19 落地 |
| 人工处置单 | `{trace}-JOB{n:03}` | `A13F-9B2C-JOB001` | 转人工接管/最小登记 |

### 1.2 端口码 / 角色码
- 端口：`APP`(乘客App) `SCR`(船载屏) `PA`(广播) `CRW`(船员端) `OTA`(OTA/客服) `VIS`(港口/外部) `MGMT`(内部系统)
- 角色：`DUTY`(值班) `MGR`(经理) `LEGAL`(法务) `CAPT`(船长) `MED`(医疗) `ENG`(工程)
- 说明：**法务/客服（LEGAL/OTA）是"知情/告知端口"**——航变/赔付风险由本系统 AI 推理生成后向其同步，不把判决责任外包给这些端口（见 §2.6）。
- 引擎端口枚举（sim-core `PORT_CODES`）不含 LEGAL：**法务知情同步在数据层用 `portCode:"MGMT"`（内部系统）+ 附加字段 `role:"LEGAL"` 表达**（validate 不检查附加字段）；LEGAL 属角色码（`chain[].role` 合法取值），文案与审计中仍称"法务知情端口"。

### 1.3 哈希链（留痕防篡改）
- 每条审计记录：`hash_i = H(hash_{i-1} + recordNo + payload)`（demo 用 FNV-1a；生产用 SHA-256）。
- `audit[0].hash` 为头哈希（hash(seed)）；任一条被改 → 链断裂，校验报错。
- 界面展示：审计 Tab 显示"append-only · 哈希链 · 可导出 PDF"。

---

## 2. 事件对象（一个事件的完整档案）

> 每个字段负责界面某处；sim-core 主要读 `timeline`（2.2），交互写 `state.machine`（2.4）。

### 2.1 事件头
`eventNo` `name` `type`(E-xx) `level`(L1–4) `category` `semanticType`(任务/持续运营/峰值计划) `state` `currentRole` `needsCaptain` `pinned` `flash` `foldGroup` `parentTrace`(衍生事件血缘，可选)

### 2.2 时间锚（引擎画多段矩形的依据，秒=会话内偏移）
- `discover: {at, signals[], confidence}` — signals 来源含"本系统 AI 推理/风险预测"（§2.6）
- `handoffs: [{at, from, to, kind: "normal"|"error"}]` → 瞬时移交竖线
- `approval: {waitStart, dueAt, outcome, decidedAt}` → 待确认/审批等待段(§12)
- `exec: {from, to, port, status}`
- `suspend: {decidedAt, reason}` → **挂起闭合（琥珀空心点）**：判定挂起后在时间轴上以琥珀点闭合，不再生成持续矩形（v0.4）
- `recoverAt` → 正常恢复（绿色空心点）
- `peakMark: bool` → 计划内峰值标记（持续运营型）
- `upgrade: {to, at, reason: "timeout"|"physical"}` → 升级红竖线+双因
- `outlib: {isX, riskLevel}` → 库外灰矩形
- `recheck: {every, reads:[{at, verdict:"still"|"recovered"|"upgrade"|"accident", note}]}` → **挂起后的周期再检（v0.4 新增，进日志，不占时间轴）**
  - `still`    → 仍同类拥堵：**仅记日志，不生成新事件**
  - `recovered`→ 恢复：仅日志，关闭监测（无新事件）
  - `upgrade`  → 等级提升：**生成衍生新事件**（parentTrace=本事件）
  - `accident` → 拥挤中出现事故：**生成衍生新事件**（如 E13/E20，parentTrace 关联）

### 2.3 决策卡/推理/审批/端口/审计
- `summary` `confidence` `reasoning{sections[]}` `alternatives[]` `clauses[{id,snippet}]`
- `chain[{role,status,actionAt}]` `currentStep` `dueAt` `takeover{taken,by,at,note}` `escalate{to,reason}`
- `ports[{portCode,status,at,content}]`
- `audit[{no,at,actor,action,payload,hash}]`
- 推理附件 =「结论 + 置信度 + 推理全文」；可含 `pipeline[]`（信号清单→预处理→分类→长链推演→条款检索→置信度分解→方案比对→兜底边界），供"模拟 AI 推理后台"展示（预先生成）
- 风险预测作为 `discover.signals[]` 中 `src:"ai-risk"` 的一条，并注明"本系统 AI 推理产物，同步法务/客服端口"（§2.6）

### 2.4 状态机
- `state.machine = { current, allow:[...] }`；动作：confirm / refuse / takeover / recover / **suspend** / (系统)upgrade / justHandle / ignore / archive / escalate
- 转移规则（不允许组合，demo 先实现核心）：
  - 待审批:→confirm / refuse / takeover / 超时upgrade
  - 执行中:→recover（正常恢复·绿点）| **suspend（挂起·琥珀点，v0.4）**
  - 挂起:→（时间轴已闭合；后续由 recheck 生成衍生新事件，不沿用本事件）
  - 接管:→(仅人工)…
- **挂起语义**：事件在时间轴以琥珀点闭合；再检/升级/事故一律作为**新事件**生成（parentTrace 血缘，仅日志可查），**不重新打开原矩形、不画流转线**。

### 2.5 挂起 / 再检 / 衍生事件的生命周期（v0.4 新增，逻辑链总纲）

```
[持续运营型/任务型可挂起]
 检测 → 发现段 → (建议→待确认→exec) → 执行段
     ├─ 判据恢复(迟滞通过) → ●绿空心点(正常恢复)
     └─ 判定挂起 ──────────→ ●琥珀空心点(挂起闭合，时间轴到此为止)
               │
               ▼ 周期再检(recheck.reads，进日志)
      still(仍同类)  → 仅日志"保持监测"                     ← 默认不再生成新事件
      recovered      → 仅日志"恢复，关闭监测"
      upgrade/accident→ 生成衍生新事件(parentTrace=本事件)
                        → 新事件按自身等级落进自己车道，独立时间轴
```

- **两条血缘线必须分清（逻辑边界）**：
  - 关系 A（同异常演化·画线）：X 升级为正式事件、L3→L4 升级 = 同一条异常的抬头 → 红竖线/实线/升级线（见时间轴语法 §8.4/§11）。
  - 关系 B（挂起后的独立事件·不画线）：挂起后的再检/衍生 = 另起的新事件 → **仅日志 parentTrace 关联**。
- 禁止事项：不得把"挂起后"的再检画回原车道；不得给关系 B 画流转线；同一事件同一时刻只有一个闭合点（绿=恢复 / 琥珀=挂起）。

### 2.6 航变/赔付风险 = 本系统 AI 推理产物（v0.4 明确口径）

- 航变风险不是外部端口数据，而是**本系统 AI 推理模块**的输出：
  - 多源弱信号（天气/船期/接驳/离船批次…）→ AI 风险推理 → **信度不足**：以"航变风险状态 chip"呈现在态势图/信息端口条，**不占时间轴**；
  - **信度足够**：升级为**正式事件**（E09 等）进入时间轴作为影响调度的安全事件继续处理；
  - 同时**同步下发法务/客服端口**（告知口径；法务/客服是知情端口，不反向承担判决）。
- 数据表示：事件 `discover.signals[]` 中 `{src:"ai-risk", …}` 注明该信号为本系统产物；推理附件引用"赔付/安抚风险"作为输入。

---

## 3. 校验规则（validate.js / 生成前自检）
- 编号唯一（eventNo、trace_id 不冲突；衍生子事件 `-C{n}` 也与父不冲突）
- 时间锚严格升序：`discover.at < handoff.at <= approval.waitStart < decidedAt < exec.from < suspend.at|recoverAt`
- `approval.dueAt = waitStart + level时限`
- 有移交竖线才可能有审批等待段；有审批等待段才可能有执行段（受控持续/挂起除外）
- 端口/角色/状态取值必须在枚举内；升级 reason 仅 timeout/physical
- **闭合点一致性**：每个呈现"最终末端"的事件必须有且仅有一个闭合点——`recoverAt`（绿）或 `suspend.decidedAt`（琥珀），不得并存、不得缺失
- **挂起后无时间锚**：事件 `suspend.decidedAt` 之后不得再有 `exec`/`recover`/`upgrade` 等本事件的时间锚（后续一切走 recheck→衍生新事件）
- `recheck.reads[].at` 依次升序且 ≥ `suspend.decidedAt`；`verdict` 在枚举内
- 衍生事件（含 `-C`）必须有 `parentTrace`，且 `parentTrace` 能在全集内命中一个已存在事件的 trace_id
- 有最终段（非挂起）的"该闭合时刻"对应的恢复点必须存在（沿用 grammar §9.1 一致性）

## 4. 怎么加一条事件（Authoring，面向你我）
1. 说"在 XX 阶段加一条 E01（持续运营型），约 5 分钟后移交值班、2 分钟后确认、再 1 分钟后判定挂起；挂起后每 5 分钟再检"；
2. 我按现有阶段时间轴**自动算偏移**，按 schema 插入 `mock-data.js`（含 `recheck.reads` 判定序列）；
3. 跑 validate 自检（时间有序/编号唯一/枚举合法/闭合点一致/parentTrace 命中）后，图即自动生成。

## 5. 变更记录
- v0.1（2026-08-20）：编号体系 + 事件 schema + 校验规则 + 待确认/审批等待段（grammar §12）落地。
- v0.4（2026-08-22）：①挂起=琥珀点闭合、再检 still=仅日志、upgrade/accident=衍生新事件（parentTrace 血缘，不画线）；②航变/赔付风险=本系统 AI 推理产物（信度阈值→升级事件，同步法务/客服端口）；③闭合点一致性、recheck、parentTrace 校验入 validate。
- v0.4.1（2026-08-22）：补充法务知情端口的引擎表达口径（`portCode:"MGMT"` + `role:"LEGAL"`，§1.2）；sim-core 修复 `levelTimeout(L4)` falsy 穿透 bug（L4 时限=0 正确生效）。

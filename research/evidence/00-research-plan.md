# Round 2 补充调研计划

> 创建时间：2026-08-16
> 状态：执行中
> 决策人：用户（产品负责人）2026-08-16 拍板

## 已确认决策

| 决策点 | 结论 |
|---|---|
| 调研范围 | 全量重建九条流 |
| 方向一处理 | 降级为「待验证假设」，等痛点 v3 证据重新评选 |
| 数据渠道 | 先只用公开网络检索；结果不足再决定是否补充登录态/付费渠道 |
| 付费服务 | 先用免费渠道，卡住再评估 |

## 证据标准（沿用 research-synthesis 技能）

- **证据等级**：L0 官方/一手（船厂、船公司、监管、学术原始数据）；L1 权威媒体/机构报告；L2 用户生成内容（UGC）；L3 推断。
- **置信度**：Strong（≥5 个独立来源）/ Moderate（3–4）/ Emerging（2）/ Weak（1）。
- **合成规则**：nugget（单条观察 + 来源 + 日期 + 原文引用）→ pattern（≥3 独立来源）→ insight → recommendation；不基于 Weak 证据做方向决策；矛盾证据必须显式记录，不得抹平。
- **禁止**：无来源陈述、把旧文档结论当作已验证事实、以 1–2 个来源形成 pattern。

## 九条调研流

| 批次 | 流 | 输出文件 |
|---|---|---|
| 批1 | ① 竞赛基线 | `batch1/01-competition-baseline.md` |
| 批1 | ② 船与工程基线 | `batch1/02-ship-engineering-baseline.md` |
| 批1 | ③ 市场与行业 | `batch1/03-market-industry.md` |
| 批2 | ④ 乘客体验痛点 | `batch2/04-passenger-pain-points.md` |
| 批2 | ⑤ 船员与运营痛点 | `batch2/05-crew-ops-pain-points.md` |
| 批2 | ⑥ 安全与法规 | `batch2/06-safety-regulation.md` |
| 批3 | ⑦ AI 技术可行性 | `batch3/07-ai-tech-feasibility.md` |
| 批3 | ⑧ 竞品对标 | `batch3/08-competitor-benchmark.md` |
| 批3 | ⑨ 经验库全量挖掘 | `batch3/09-hackathon-mining.md` |

## 执行约定

1. 每个子代理只负责一条流，按 `TEMPLATE.md` 输出。
2. 所有来源同时写入 `evidence-index.md`（一条来源一行）。
3. 子代理不得修改 `research/`、`ideas/`、`design/` 下的旧文件。
4. Git 小步提交：每个子代理完成一批产出即提交一次。
5. 批 1+2 完成后：Gate 1 向用户提交痛点 v3 与方向重选建议。
6. 批 3 完成后：Gate 2 提交新匹配矩阵与最终方向建议。

## 待产出物

- [x] 本计划
- [ ] 批 1：① 竞赛基线 / ② 船与工程基线 / ③ 市场与行业
- [ ] 批 2：④ 乘客痛点 / ⑤ 船员与运营痛点 / ⑥ 安全与法规
- [ ] 批 3：⑦ AI 技术 / ⑧ 竞品 / ⑨ 经验库挖掘
- [ ] `pain-points-v3.md`（证据台账 + 重分级）
- [ ] `patterns-judges-like-v2.md`（全量经验库提炼）
- [ ] `pain-ai-matching-v2.md`（新匹配矩阵）
- [ ] Gate 1 / Gate 2 决策记录

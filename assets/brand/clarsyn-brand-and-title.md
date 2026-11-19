# ClarSyn 品牌与标题规范

> 状态：已定稿（2026-08-22）
> 名称：**ClarSyn**（英文生造词，无中文名）

---

## 1. 名称释义

- 构词：**Clar**（Clarity）+ **Syn**（Synthesis / Synergy）
- 含义：**清晰的综合研判**
  - Clar → 把复杂信号、多路信息看清楚
  - Syn → 把分散的事件、角色、端口综合成可执行的判断
- 定位：不是导航系统，不是“AI 助手”，而是一个**面向邮轮靠港接驳场景的多 Agent 协同动态调度系统**。

---

## 2. 官方标题

### 正标题
```
ClarSyn
```

### 副标题（中文）
```
基于多agent协同的邮轮靠港接驳动态调度系统
```

### 副标题（英文）
```
Multi-Agent Collaborative Dynamic Scheduling System for Cruise Berthing & Shore Connection
```

---

## 3. 名称使用视觉规则

- 正式品牌写法：**ClarSyn**（C 和 S 大写）
- 全小写 `clarsyn` 可用于包名、域名、路由等代码场景
- 文字风格：
  - 仅 **C** 和 **S** 使用像素风，其余字母使用非像素无衬线字体
  - 像素化字母的像素之间保持紧凑（当前为 6px 网格、1px 间隙）
  - **C** 使用系统蓝 `#4c8dff`（库外/感知色）
  - **S** 使用系统琥珀 `#f0a43f`（预警/检测色）
  - 其余正常字母使用浅色 `#e6ebf2`
- 意义：C = Clarity（清晰），S = Synthesis（综合），用两种颜色区分两个词根，同时呼应系统里的感知/预警色彩语言。

---

## 4. 标题排版建议

- 正标题采用混合式 Logo：C/S 像素 SVG + 其余字母正常无衬线字体
- **ClarSyn 与中文副标题同一行**：ClarSyn 在左，中文副标题在右，垂直居中对齐
- 英文副标题放在这一行下方，14px 左右、浅灰蓝 `#c7d0dc`
- 小写字母的最高/最低处与 C/S 像素块保持一致（`y` 的下降部除外）
- 整体不设背景框；如果背景太亮可保留轻微文字投影保证可读性

---

## 5. 界面放置建议

| 位置 | 用途 | 状态 |
|---|---|---|
| 开场片头中央 | 品牌 hero 展示，ClarSyn + 中文副标题同一行 | ✅ 已落地 |
| 顶栏左侧品牌位 | 常驻品牌标识，ClarSyn Logo + “事件协同工作台” | ✅ 已落地 |
| 演示结尾 | 顶栏左侧 ClarSyn Logo 闪烁两下收尾，不做独立落版 | ✅ 已落地 |
| 演示文稿/答辩封面 | 使用 ClarSyn 像素 Logo + 官方副标题 | 后续外部使用 |

当前已在 `p1-captain-hifi.html` 落地，并生成 SVG 预览：

```
assets/brand/clarsyn-title-preview.svg
```

---

## 6. 已落地文件

- 高保真：`prototypes/wireframes/p1-captain-hifi.html`
  - 开场标题已替换为 ClarSyn + 中英文副标题
  - 片头使用 ClarSyn 混合式 Logo（C/S 像素 + 其余字母正常字体）
  - 顶栏左侧已放置 ClarSyn 小 Logo
  - 演示结尾触发顶栏 Logo 闪烁两下
- SVG 预览：`assets/brand/clarsyn-title-preview.svg`
- 单独像素字母：`assets/brand/clarsyn-pixel-C.svg`、`assets/brand/clarsyn-pixel-S.svg`
- 本规范：`design/b-port-shore-and-itinerary/clarsyn-brand-and-title.md`
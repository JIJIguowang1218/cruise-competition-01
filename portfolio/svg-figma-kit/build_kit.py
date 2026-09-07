#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_kit.py — 生成咨询图形语汇 SVG 素材库（Figma 导入用）

设计约束：
  1. 参数化：层数/段数可变，需要几层就生成几层
  2. Figma 友好：无 <style>/CSS class/<defs>，全部 inline 属性；无编组嵌套
  3. 单色平铺：每个色块独立 fill，Figma 里点选即可改色
  4. 命名统一：kebab-case，按类别前缀分组
"""

import math
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "shapes")

# 中性灰阶 —— 仅作占位，Figma 内自行替换
RAMP = ["#2E3A46", "#4A5A6A", "#6B7C8C", "#93A2B0", "#BCC7D1", "#DCE3E9"]
LINE = "#5A6672"
FAINT = "#C8D0D8"
ON_DARK = "#FFFFFF"
ON_LIGHT = "#26313B"
FONT = "Inter, 'Helvetica Neue', Arial, sans-serif"

files = []


def shade(i, n):
    """按序号从深到浅取色。"""
    if n <= 1:
        return RAMP[0]
    idx = round(i * (len(RAMP) - 2) / (n - 1))
    return RAMP[idx]


def text(x, y, s, size=14, fill=ON_DARK, anchor="middle", weight="500"):
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" '
            f'dominant-baseline="central">{s}</text>')


def svg(name, w, h, body, note=""):
    doc = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
           f'viewBox="0 0 {w} {h}" fill="none">\n'
           f'  <!-- {name}{" · " + note if note else ""} -->\n  '
           + "\n  ".join(body) + "\n</svg>\n")
    with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as f:
        f.write(doc)
    files.append((name, w, h, note))


def polar(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def annulus(cx, cy, r_out, r_in, a0, a1):
    x0, y0 = polar(cx, cy, r_out, a0)
    x1, y1 = polar(cx, cy, r_out, a1)
    x2, y2 = polar(cx, cy, r_in, a1)
    x3, y3 = polar(cx, cy, r_in, a0)
    la = 1 if abs(a1 - a0) > 180 else 0
    return (f"M{x0:.2f},{y0:.2f} A{r_out},{r_out} 0 {la} 1 {x1:.2f},{y1:.2f} "
            f"L{x2:.2f},{y2:.2f} A{r_in},{r_in} 0 {la} 0 {x3:.2f},{y3:.2f} Z")


# ══════════════════ 流程类 Process ══════════════════

def chevron_chain(n):
    w, h, notch, gap = 190, 86, 30, 6
    W = n * (w + gap) - gap + notch
    b = []
    for i in range(n):
        x = i * (w + gap)
        left = f"L{x + notch},{h / 2} " if i else ""
        b.append(f'<path d="M{x},0 H{x + w} L{x + w + notch},{h / 2} L{x + w},{h} '
                 f'H{x} {left}Z" fill="{shade(i, n)}"/>')
        b.append(text(x + w / 2 + notch / 2, h / 2, f"阶段 {i + 1}", 15))
    svg(f"process-chevron-{n}", W, h, b, f"{n} 段 V 型流程链")


def arrow_bar(n):
    w, h, tip, gap = 168, 64, 22, 10
    W = n * (w + gap) - gap
    b = []
    for i in range(n):
        x = i * (w + gap)
        b.append(f'<path d="M{x},0 H{x + w - tip} L{x + w},{h / 2} L{x + w - tip},{h} '
                 f'H{x} Z" fill="{shade(i, n)}"/>')
        b.append(text(x + (w - tip) / 2, h / 2, f"步骤 {i + 1}", 14))
    svg(f"process-arrow-{n}", W, h, b, f"{n} 段箭头流程条")


def step_stairs(n):
    w, rise, gap, base = 150, 52, 8, 60
    H = base + n * rise + 20
    W = n * (w + gap) - gap
    b = []
    for i in range(n):
        x, hh = i * (w + gap), base + i * rise
        b.append(f'<rect x="{x}" y="{H - hh}" width="{w}" height="{hh}" rx="3" fill="{shade(i, n)}"/>')
        b.append(text(x + w / 2, H - hh + 26, f"L{i + 1}", 15))
    svg(f"process-stairs-{n}", W, H, b, f"{n} 级递进阶梯")


def snake_flow(n, per_row=5):
    w, h, gx, gy = 168, 72, 46, 54
    rows = math.ceil(n / per_row)
    W, H = per_row * (w + gx) - gx, rows * (h + gy) - gy
    b = []
    for i in range(n):
        r, c = divmod(i, per_row)
        c = c if r % 2 == 0 else per_row - 1 - c
        x, y = c * (w + gx), r * (h + gy)
        b.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{shade(i, n)}"/>')
        b.append(text(x + w / 2, y + h / 2, f"环节 {i + 1}", 14))
        if i == n - 1:
            break
        nr = (i + 1) // per_row
        if nr == r:  # 同行水平箭头
            d = 1 if r % 2 == 0 else -1
            sx = x + w + 6 if d > 0 else x - 6
            ex = sx + d * (gx - 12)
            b.append(f'<path d="M{sx},{y + h / 2} H{ex}" stroke="{LINE}" stroke-width="2"/>')
            b.append(f'<path d="M{ex},{y + h / 2} l{-d * 9},-5 v10 Z" fill="{LINE}"/>')
        else:  # 折行垂直箭头
            cx = x + w / 2
            b.append(f'<path d="M{cx},{y + h + 6} V{y + h + gy - 12}" stroke="{LINE}" stroke-width="2"/>')
            b.append(f'<path d="M{cx},{y + h + gy - 6} l-5,-9 h10 Z" fill="{LINE}"/>')
    svg(f"process-snake-{n}", W, H, b, f"{n} 环节蛇形流程（{per_row}/行）")


def cycle_ring(n):
    S, cx, cy = 420, 210, 210
    r_out, r_in, gap = 190, 118, 4
    b = []
    for i in range(n):
        a0 = -90 + i * 360 / n + gap
        a1 = -90 + (i + 1) * 360 / n - gap
        b.append(f'<path d="{annulus(cx, cy, r_out, r_in, a0, a1)}" fill="{shade(i, n)}"/>')
        tx, ty = polar(cx, cy, (r_out + r_in) / 2, (a0 + a1) / 2)
        b.append(text(tx, ty, f"{i + 1}", 20, weight="600"))
    b.append(f'<circle cx="{cx}" cy="{cy}" r="{r_in - 14}" fill="none" '
             f'stroke="{FAINT}" stroke-width="2" stroke-dasharray="5 5"/>')
    b.append(text(cx, cy, "闭环", 18, ON_LIGHT, weight="600"))
    svg(f"process-cycle-{n}", S, S, b, f"{n} 段循环环（主循环/回写）")


def pipeline_bar(n):
    W, h = 900, 46
    b, seg = [], W / n
    for i in range(n):
        x = i * seg
        b.append(f'<rect x="{x:.1f}" y="0" width="{seg - 2:.1f}" height="{h}" fill="{shade(i, n)}"/>')
        b.append(text(x + seg / 2, h / 2, f"{i + 1}", 14))
    svg(f"process-pipeline-{n}", W, h, b, f"{n} 段管道条（页顶进度指示）")


# ══════════════════ 层级类 Hierarchy ══════════════════

def pyramid(n, inverted=False):
    W, layer, gap, apex = 620, 84, 6, 0.14
    H = n * (layer + gap) - gap
    b = []
    for i in range(n):
        k = (n - 1 - i) if inverted else i
        y = i * (layer + gap)
        tw = W * (apex + (1 - apex) * k / n)
        bw = W * (apex + (1 - apex) * (k + 1) / n)
        if inverted:
            tw, bw = bw, tw
        b.append(f'<path d="M{(W - tw) / 2:.1f},{y} H{(W + tw) / 2:.1f} '
                 f'L{(W + bw) / 2:.1f},{y + layer} H{(W - bw) / 2:.1f} Z" fill="{shade(i, n)}"/>')
        b.append(text(W / 2, y + layer / 2, f"层 {i + 1}", 15))
    name = f"hier-pyramid-inverted-{n}" if inverted else f"hier-pyramid-{n}"
    svg(name, W, H, b, f"{n} 层{'倒置' if inverted else ''}金字塔")


def funnel(n):
    W, layer, gap = 620, 80, 12
    H = n * (layer + gap) - gap
    b = []
    for i in range(n):
        tw = W * (1 - 0.72 * i / n)
        bw = W * (1 - 0.72 * (i + 1) / n)
        y = i * (layer + gap)
        b.append(f'<path d="M{(W - tw) / 2:.1f},{y} H{(W + tw) / 2:.1f} '
                 f'L{(W + bw) / 2:.1f},{y + layer} H{(W - bw) / 2:.1f} Z" fill="{shade(i, n)}"/>')
        b.append(text(W / 2, y + layer / 2, f"收敛 {i + 1}", 15))
    svg(f"hier-funnel-{n}", W, H, b, f"{n} 级漏斗（收敛/筛选）")


def nested_rings(n):
    S, cx = 460, 230
    b = []
    for i in range(n):
        r = 220 - i * (200 / n)
        b.append(f'<circle cx="{cx}" cy="{cx}" r="{r:.1f}" fill="{shade(i, n)}"/>')
    for i in range(n):
        r_o = 220 - i * (200 / n)
        r_i = 220 - (i + 1) * (200 / n)
        b.append(text(cx, cx - (r_o + r_i) / 2, f"第 {i + 1} 层", 15))
    svg(f"hier-rings-{n}", S, S, b, f"{n} 层同心圆（由外向内嵌套）")


def nested_boxes(n):
    W, H, pad = 620, 420, 52
    b = []
    for i in range(n):
        x, y = i * pad, i * pad * 0.62
        b.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{W - 2 * x:.0f}" height="{H - 2 * y:.0f}" '
                 f'rx="6" fill="{shade(i, n)}"/>')
        b.append(text(W / 2, y + 26, f"第 {i + 1} 层", 15))
    svg(f"hier-nested-boxes-{n}", W, H, b, f"{n} 层同心方框（嵌套结构）")


def layer_stack(n):
    W, h, gap = 760, 74, 8
    H = n * (h + gap) - gap
    b = []
    for i in range(n):
        y = i * (h + gap)
        b.append(f'<rect x="0" y="{y}" width="{W}" height="{h}" rx="4" fill="{shade(i, n)}"/>')
        b.append(text(24, y + h / 2, f"层 {i + 1}", 16, anchor="start", weight="600"))
        b.append(text(W - 24, y + h / 2, "说明文字", 13, anchor="end", weight="400"))
    svg(f"hier-layer-stack-{n}", W, H, b, f"{n} 层横向分层条")


def org_tree():
    W, H = 820, 380
    bw, bh = 180, 62
    b = [f'<rect x="{(W - bw) / 2}" y="0" width="{bw}" height="{bh}" rx="4" fill="{RAMP[0]}"/>',
         text(W / 2, bh / 2, "根节点", 15)]
    kids = 3
    y2 = 150
    xs = [(W / kids) * (i + 0.5) - bw / 2 for i in range(kids)]
    b.append(f'<path d="M{W / 2},{bh} V{y2 - 40}" stroke="{LINE}" stroke-width="2"/>')
    b.append(f'<path d="M{xs[0] + bw / 2},{y2 - 40} H{xs[-1] + bw / 2}" stroke="{LINE}" stroke-width="2"/>')
    for i, x in enumerate(xs):
        b.append(f'<path d="M{x + bw / 2},{y2 - 40} V{y2}" stroke="{LINE}" stroke-width="2"/>')
        b.append(f'<rect x="{x:.1f}" y="{y2}" width="{bw}" height="{bh}" rx="4" fill="{RAMP[2]}"/>')
        b.append(text(x + bw / 2, y2 + bh / 2, f"分支 {i + 1}", 14))
        y3 = 300
        b.append(f'<path d="M{x + bw / 2},{y2 + bh} V{y3 - 22} '
                 f'M{x + bw / 2 - 48},{y3 - 22} H{x + bw / 2 + 48}" '
                 f'stroke="{LINE}" stroke-width="1.5"/>')
        for j in range(2):
            cx = x + bw / 2 + (j - 0.5) * 96
            b.append(f'<path d="M{cx},{y3 - 22} V{y3}" stroke="{LINE}" stroke-width="1.5"/>')
            b.append(f'<rect x="{cx - 42:.1f}" y="{y3}" width="84" height="46" rx="4" fill="{RAMP[4]}"/>')
            b.append(text(cx, y3 + 23, f"{i + 1}.{j + 1}", 13, ON_LIGHT))
    svg("hier-org-tree", W, H + 46, b, "组织/分解树（1-3-6）")


def issue_tree():
    W, H = 780, 420
    bw, bh = 190, 56
    b = [f'<rect x="0" y="{H / 2 - bh / 2}" width="{bw}" height="{bh}" rx="4" fill="{RAMP[0]}"/>',
         text(bw / 2, H / 2, "核心议题", 15)]
    n2, x2 = 3, 280
    ys = [H * (i + 0.5) / n2 - bh / 2 for i in range(n2)]
    b.append(f'<path d="M{bw},{H / 2} H{x2 - 40} M{x2 - 40},{ys[0] + bh / 2} '
             f'V{ys[-1] + bh / 2}" stroke="{LINE}" stroke-width="2"/>')
    for i, y in enumerate(ys):
        b.append(f'<path d="M{x2 - 40},{y + bh / 2} H{x2}" stroke="{LINE}" stroke-width="2"/>')
        b.append(f'<rect x="{x2}" y="{y:.1f}" width="{bw}" height="{bh}" rx="4" fill="{RAMP[2]}"/>')
        b.append(text(x2 + bw / 2, y + bh / 2, f"子问题 {i + 1}", 14))
        x3 = 560
        b.append(f'<path d="M{x2 + bw},{y + bh / 2} H{x3 - 26} '
                 f'M{x3 - 26},{y - 31 + bh / 2} V{y + 31 + bh / 2}" '
                 f'stroke="{LINE}" stroke-width="1.5"/>')
        for j in range(2):
            yy = y + (j - 0.5) * 62
            b.append(f'<path d="M{x3 - 26},{yy + bh / 2} H{x3}" stroke="{LINE}" stroke-width="1.5"/>')
            b.append(f'<rect x="{x3}" y="{yy:.1f}" width="{W - x3}" height="{bh}" rx="4" fill="{RAMP[4]}"/>')
            b.append(text(x3 + (W - x3) / 2, yy + bh / 2, f"假设 {i + 1}.{j + 1}", 13, ON_LIGHT))
    svg("hier-issue-tree", W, H, b, "议题树 / MECE 分解")


def iceberg():
    W, H, wl = 560, 560, 200
    b = [f'<path d="M280,20 L470,{wl} H90 Z" fill="{RAMP[1]}"/>',
         f'<path d="M90,{wl} H470 L530,{H - 20} H30 Z" fill="{RAMP[4]}"/>',
         f'<path d="M0,{wl} H{W}" stroke="{LINE}" stroke-width="2" stroke-dasharray="8 6"/>',
         text(280, 130, "可见层", 16),
         text(280, wl + 90, "中间层", 16, ON_LIGHT),
         text(280, H - 90, "最深层", 16, ON_LIGHT),
         text(W - 8, wl - 14, "水线", 12, LINE, anchor="end", weight="400")]
    svg("hier-iceberg", W, H, b, "冰山图（表象 / 机制 / 深层）")


# ══════════════════ 矩阵类 Matrix ══════════════════

def matrix(n):
    S, pad, gap = 520, 56, 5
    cell = (S - pad - gap * (n - 1)) / n
    b = []
    for r in range(n):
        for c in range(n):
            x, y = pad + c * (cell + gap), r * (cell + gap)
            lvl = (r + (n - 1 - c)) / (2 * (n - 1)) if n > 1 else 0
            fill = RAMP[min(len(RAMP) - 1, int(lvl * (len(RAMP) - 1)))]
            b.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{cell:.1f}" height="{cell:.1f}" fill="{fill}"/>')
            b.append(text(x + cell / 2, y + cell / 2, f"{r + 1}-{c + 1}", 14,
                          ON_DARK if lvl < 0.6 else ON_LIGHT))
    yaxis = S - pad
    b.append(f'<path d="M{pad - 14},{yaxis} V0 M{pad - 14},{yaxis} H{S}" stroke="{LINE}" stroke-width="2"/>')
    b.append(f'<text x="0" y="{yaxis / 2}" font-family="{FONT}" font-size="14" fill="{ON_LIGHT}" '
             f'text-anchor="middle" transform="rotate(-90 0 {yaxis / 2})" dominant-baseline="hanging">纵轴</text>')
    b.append(text(S / 2, S - 16, "横轴", 14, ON_LIGHT))
    svg(f"matrix-{n}x{n}", S, S, b, f"{n}×{n} 矩阵")


def harvey_balls():
    r, gap = 30, 34
    W = 5 * (2 * r + gap) - gap
    b = []
    for i in range(5):
        cx, cy = r + i * (2 * r + gap), r + 4
        b.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#FFFFFF" stroke="{RAMP[0]}" stroke-width="2.5"/>')
        frac = i / 4
        if frac >= 1:
            b.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{RAMP[0]}"/>')
        elif frac > 0:
            ex, ey = polar(cx, cy, r, -90 + 360 * frac)
            la = 1 if frac > 0.5 else 0
            b.append(f'<path d="M{cx},{cy} L{cx},{cy - r} A{r},{r} 0 {la} 1 {ex:.2f},{ey:.2f} Z" fill="{RAMP[0]}"/>')
        b.append(text(cx, cy + r + 22, f"{i * 25}%", 12, ON_LIGHT, weight="400"))
    svg("matrix-harvey-balls", W, 2 * r + 36, b, "Harvey Ball 五档（评估表用）")


def radar(axes=4):
    S, cx, R = 420, 210, 160
    labels = ["运营", "经济", "风险", "综合"] if axes == 4 else [f"维度{i+1}" for i in range(axes)]
    b = []
    for k in range(3, 0, -1):
        rr = R * k / 3
        pts = " ".join(f"{x:.1f},{y:.1f}" for x, y in
                       (polar(cx, cx, rr, -90 + i * 360 / axes) for i in range(axes)))
        b.append(f'<polygon points="{pts}" fill="{"#FFFFFF" if k < 3 else RAMP[5]}" '
                 f'stroke="{FAINT}" stroke-width="1.5"/>')
    for i in range(axes):
        x, y = polar(cx, cx, R, -90 + i * 360 / axes)
        b.append(f'<path d="M{cx},{cx} L{x:.1f},{y:.1f}" stroke="{FAINT}" stroke-width="1.5"/>')
    vals = [0.85, 0.55, 0.7, 0.65][:axes] + [0.6] * max(0, axes - 4)
    pts = " ".join(f"{x:.1f},{y:.1f}" for x, y in
                   (polar(cx, cx, R * vals[i], -90 + i * 360 / axes) for i in range(axes)))
    b.append(f'<polygon points="{pts}" fill="{RAMP[1]}" fill-opacity="0.55" '
             f'stroke="{RAMP[0]}" stroke-width="2.5"/>')
    for i in range(axes):
        x, y = polar(cx, cx, R + 26, -90 + i * 360 / axes)
        b.append(text(x, y, labels[i], 14, ON_LIGHT))
    svg(f"matrix-radar-{axes}", S, S, b, f"{axes} 维雷达（多方案同框对比）")


def waterfall():
    W, H = 760, 340
    vals = [0, 60, -25, 40, -18, 0]
    labels = ["基线", "+A", "-B", "+C", "-D", "结果"]
    bw, gap = 96, 32
    base, scale, run = H - 50, 2.2, 100
    b = [f'<path d="M0,{base} H{W}" stroke="{LINE}" stroke-width="2"/>']
    for i, v in enumerate(vals):
        x = i * (bw + gap)
        if i in (0, len(vals) - 1):
            h = run * scale if i else 100 * scale
            b.append(f'<rect x="{x}" y="{base - h}" width="{bw}" height="{h}" fill="{RAMP[0]}"/>')
            b.append(text(x + bw / 2, base - h / 2, str(int(h / scale)), 14))
        else:
            h = abs(v) * scale
            y = base - run * scale - (h if v > 0 else 0)
            run += v
            b.append(f'<rect x="{x}" y="{y:.1f}" width="{bw}" height="{h:.1f}" '
                     f'fill="{RAMP[2] if v > 0 else RAMP[4]}"/>')
            b.append(text(x + bw / 2, y + h / 2, f"{v:+d}", 13, ON_DARK if v > 0 else ON_LIGHT))
            b.append(f'<path d="M{x + bw},{base - run * scale:.1f} H{x + bw + gap}" '
                     f'stroke="{FAINT}" stroke-width="1.5" stroke-dasharray="4 4"/>')
        b.append(text(x + bw / 2, base + 24, labels[i], 13, ON_LIGHT, weight="400"))
    svg("matrix-waterfall", W, H, b, "瀑布图（增减归因）")


# ══════════════════ 关系类 Relation ══════════════════

def venn(n):
    if n == 2:
        W, H, r = 520, 340, 130
        b = [f'<circle cx="190" cy="170" r="{r}" fill="{RAMP[1]}" fill-opacity="0.75"/>',
             f'<circle cx="330" cy="170" r="{r}" fill="{RAMP[3]}" fill-opacity="0.75"/>',
             text(130, 170, "A", 18), text(390, 170, "B", 18), text(260, 170, "A∩B", 15)]
        svg("rel-venn-2", W, H, b, "二元维恩")
    else:
        W, H, r = 520, 500, 130
        c = [(260, 155), (185, 290), (335, 290)]
        b = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{RAMP[i * 2]}" fill-opacity="0.65"/>'
             for i, (cx, cy) in enumerate(c)]
        b += [text(260, 90, "A", 18), text(120, 340, "B", 18), text(400, 340, "C", 18),
              text(260, 250, "交集", 14)]
        svg("rel-venn-3", W, H, b, "三元维恩")


def hub_spoke(n):
    S, cx, R, hr, nr = 560, 280, 200, 82, 54
    b = []
    for i in range(n):
        x, y = polar(cx, cx, R, -90 + i * 360 / n)
        b.append(f'<path d="M{cx},{cx} L{x:.1f},{y:.1f}" stroke="{FAINT}" stroke-width="2"/>')
    for i in range(n):
        x, y = polar(cx, cx, R, -90 + i * 360 / n)
        b.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{nr}" fill="{RAMP[3]}"/>')
        b.append(text(x, y, f"节点{i + 1}", 14))
    b.append(f'<circle cx="{cx}" cy="{cx}" r="{hr}" fill="{RAMP[0]}"/>')
    b.append(text(cx, cx, "中心", 17, weight="600"))
    svg(f"rel-hub-spoke-{n}", S, S, b, f"中心辐射（1 + {n}）")


def bridge_gap():
    W, H = 700, 300
    b = [f'<rect x="0" y="150" width="240" height="110" fill="{RAMP[1]}"/>',
         f'<rect x="460" y="150" width="240" height="110" fill="{RAMP[1]}"/>',
         text(120, 205, "现状", 16), text(580, 205, "目标", 16),
         f'<path d="M240,150 H460" stroke="{RAMP[0]}" stroke-width="3" stroke-dasharray="10 7"/>',
         f'<path d="M240,168 V260 M460,168 V260" stroke="{FAINT}" stroke-width="1.5" stroke-dasharray="4 4"/>',
         f'<rect x="272" y="86" width="156" height="48" rx="24" fill="{RAMP[0]}"/>',
         text(350, 110, "断点 / GAP", 14)]
    svg("rel-bridge-gap", W, H, b, "断点/差距桥接图")


def matrix_flow():
    """输入端口 → 处理 → 输出端口（三段口图）"""
    W, H = 900, 460
    bw, bh, gap = 210, 58, 16
    b = []
    for i in range(5):
        y = i * (bh + gap)
        b.append(f'<rect x="0" y="{y}" width="{bw}" height="{bh}" rx="4" fill="{RAMP[4]}"/>')
        b.append(text(bw / 2, y + bh / 2, f"输入 {i + 1}", 14, ON_LIGHT))
        b.append(f'<path d="M{bw + 8},{y + bh / 2} H{330}" stroke="{FAINT}" stroke-width="2"/>')
    b.append(f'<rect x="340" y="60" width="220" height="{H - 120}" rx="6" fill="{RAMP[0]}"/>')
    b.append(text(450, H / 2, "核心处理", 18, weight="600"))
    for i in range(4):
        y = 40 + i * (bh + gap + 14)
        b.append(f'<path d="M568,{y + bh / 2} H{690 - 8}" stroke="{FAINT}" stroke-width="2"/>')
        b.append(f'<rect x="690" y="{y}" width="{bw}" height="{bh}" rx="4" fill="{RAMP[2]}"/>')
        b.append(text(690 + bw / 2, y + bh / 2, f"输出 {i + 1}", 14))
    svg("rel-port-flow", W, H, b, "输入端口 → 核心 → 输出端口")


# ══════════════════ 容器类 Container ══════════════════

def swimlane(n):
    W, label, h, gap = 1200, 220, 110, 6
    H = n * (h + gap) - gap
    b = []
    for i in range(n):
        y = i * (h + gap)
        b.append(f'<rect x="0" y="{y}" width="{label}" height="{h}" fill="{RAMP[1] if i % 2 == 0 else RAMP[2]}"/>')
        b.append(text(label / 2, y + h / 2, f"泳道 {i + 1}", 15, weight="600"))
        b.append(f'<rect x="{label}" y="{y}" width="{W - label}" height="{h}" '
                 f'fill="{"#F4F6F8" if i % 2 == 0 else "#FFFFFF"}" stroke="{FAINT}" stroke-width="1"/>')
    b.append(f'<path d="M{label + 20},{H + 26} H{W - 20}" stroke="{LINE}" stroke-width="2"/>')
    b.append(f'<path d="M{W - 20},{H + 26} l-11,-6 v12 Z" fill="{LINE}"/>')
    b.append(text(label + 20, H + 46, "时间 →", 12, LINE, anchor="start", weight="400"))
    svg(f"container-swimlane-{n}", W, H + 56, b, f"{n} 泳道框架（时间从左到右）")


def bracket_group(n):
    W, H, bx, bw = 560, None, 40, 34
    ih, gap = 62, 14
    H = n * (ih + gap) - gap
    b = [f'<path d="M{bx + bw},0 H{bx + bw / 2} V{H / 2 - 14} L{bx},{H / 2} '
         f'L{bx + bw / 2},{H / 2 + 14} V{H} H{bx + bw}" stroke="{RAMP[0]}" '
         f'stroke-width="2.5" fill="none" stroke-linejoin="round"/>']
    for i in range(n):
        y = i * (ih + gap)
        b.append(f'<rect x="{bx + bw + 24}" y="{y}" width="{W - bx - bw - 24}" height="{ih}" '
                 f'rx="4" fill="{shade(i, n)}"/>')
        b.append(text(bx + bw + 48, y + ih / 2, f"要素 {i + 1}", 14, anchor="start"))
    b.append(text(bx - 12, H / 2, "分组", 14, ON_LIGHT, anchor="end"))
    svg(f"container-bracket-{n}", W, H, b, f"{n} 项大括号分组")


def callout_card():
    W, H = 420, 240
    b = [f'<rect x="0" y="0" width="{W}" height="{H}" rx="6" fill="#FFFFFF" stroke="{FAINT}" stroke-width="1.5"/>',
         f'<rect x="0" y="0" width="{W}" height="8" rx="4" fill="{RAMP[0]}"/>',
         f'<path d="M{W - 34},8 H{W} V42 Z" fill="{RAMP[2]}"/>',
         text(24, 46, "卡片标题", 17, ON_LIGHT, anchor="start", weight="600"),
         f'<path d="M24,68 H{W - 24}" stroke="{FAINT}" stroke-width="1"/>']
    for i in range(3):
        y = 100 + i * 34
        b.append(f'<circle cx="30" cy="{y}" r="4" fill="{RAMP[2]}"/>')
        b.append(text(46, y, f"要点 {i + 1}", 14, ON_LIGHT, anchor="start", weight="400"))
    b.append(f'<path d="M24,{H - 40} H{W - 24}" stroke="{FAINT}" stroke-width="1"/>')
    b.append(text(24, H - 22, "来源：", 11, LINE, anchor="start", weight="400"))
    svg("container-callout-card", W, H, b, "卡片（标题条 + 要点 + 来源脚注 + 角标）")


def banner():
    W, H, notch = 560, 56, 22
    b = [f'<path d="M0,0 H{W - notch} L{W},{H / 2} L{W - notch},{H} H0 Z" fill="{RAMP[0]}"/>',
         f'<path d="M0,{H} l-0,0 h14 l-14,14 Z" fill="{RAMP[2]}"/>',
         text(24, H / 2, "章节 / 结论条", 17, anchor="start", weight="600")]
    svg("container-banner", W, H + 14, b, "旗标条（页顶结论 / 章节标记）")


def kpi_block(n):
    bw, bh, gap = 220, 150, 16
    W = n * (bw + gap) - gap
    b = []
    for i in range(n):
        x = i * (bw + gap)
        b.append(f'<rect x="{x}" y="0" width="{bw}" height="{bh}" rx="5" fill="#F4F6F8" '
                 f'stroke="{FAINT}" stroke-width="1"/>')
        b.append(f'<rect x="{x}" y="0" width="5" height="{bh}" rx="2.5" fill="{RAMP[0]}"/>')
        b.append(text(x + 24, 34, f"指标 {i + 1}", 13, LINE, anchor="start", weight="400"))
        b.append(text(x + 24, 78, "00", 40, ON_LIGHT, anchor="start", weight="700"))
        b.append(text(x + 24, 122, "单位 / 口径说明", 12, LINE, anchor="start", weight="400"))
    svg(f"container-kpi-{n}", W, bh, b, f"{n} 联 KPI 数字块")


# ══════════════════ 连接件 Connector ══════════════════

def connectors():
    W, H = 760, 420
    b = []
    # tip = (x, dy, dir)：箭头顶点相对行基线的位置与朝向，必须与路径终点一致
    rows = [
        ("实线箭头", 'M20,0 H180', [(180, 0, "r")], None),
        ("虚线箭头（回写）", 'M20,0 H180', [(180, 0, "r")], "8 6"),
        ("双向箭头", 'M28,0 H172', [(180, 0, "r"), (20, 0, "l")], None),
        ("弯头连接", 'M20,0 H100 V40 H180', [(180, 40, "r")], None),
        ("回环（复检）", 'M20,0 H140 A24,24 0 1 1 140,40 H20', [(20, 40, "l")], "6 5"),
    ]
    for i, (label, d, tips, dash) in enumerate(rows):
        y = 40 + i * 76
        da = ' stroke-dasharray="{}"'.format(dash) if dash else ""
        b.append(f'<path transform="translate(0,{y})" d="{d}" stroke="{LINE}" stroke-width="2.5" '
                 f'fill="none"{da}/>')
        for tx, dy, dr in tips:
            sign = -11 if dr == "r" else 11
            b.append(f'<path d="M{tx},{y + dy} l{sign},-6 v12 Z" fill="{LINE}"/>')
        b.append(text(210, y + 8, label, 14, ON_LIGHT, anchor="start", weight="400"))
    # 闸门 / 判断菱形 / 状态点
    b.append(f'<path d="M470,60 l40,-26 l40,26 l-40,26 Z" fill="#FFFFFF" stroke="{RAMP[0]}" stroke-width="2.5"/>')
    b.append(text(510, 96, "判断", 12, ON_LIGHT, weight="400"))
    b.append(f'<rect x="474" y="146" width="72" height="34" rx="3" fill="#FFFFFF" stroke="{RAMP[0]}" stroke-width="2.5"/>')
    b.append(f'<path d="M474,163 H546 M498,146 V180 M522,146 V180" stroke="{RAMP[0]}" stroke-width="2"/>')
    b.append(text(510, 196, "闸门", 12, ON_LIGHT, weight="400"))
    for j, (lbl, col) in enumerate([("自动", RAMP[4]), ("AI", RAMP[2]), ("人工", RAMP[0])]):
        cx = 486 + j * 48
        b.append(f'<circle cx="{cx}" cy="256" r="15" fill="{col}"/>')
        b.append(text(cx, 288, lbl, 11, ON_LIGHT, weight="400"))
    svg("connector-set", W, H, b, "连接件：箭头 / 虚线 / 弯头 / 回环 / 判断 / 闸门 / 状态点")


def timeline(n):
    W, H = 1000, 260
    b = [f'<path d="M40,{H / 2} H{W - 40}" stroke="{LINE}" stroke-width="2.5"/>',
         f'<path d="M{W - 40},{H / 2} l-12,-7 v14 Z" fill="{LINE}"/>']
    for i in range(n):
        x = 90 + i * (W - 190) / max(1, n - 1)
        up = i % 2 == 0
        b.append(f'<circle cx="{x:.1f}" cy="{H / 2}" r="9" fill="{RAMP[0]}"/>')
        y = H / 2 - 34 if up else H / 2 + 34
        b.append(f'<path d="M{x:.1f},{H / 2} V{y:.1f}" stroke="{FAINT}" stroke-width="1.5"/>')
        by = y - 54 if up else y
        b.append(f'<rect x="{x - 76:.1f}" y="{by:.1f}" width="152" height="54" rx="4" fill="{shade(i, n)}"/>')
        b.append(text(x, by + 27, f"节点 {i + 1}", 14))
    svg(f"connector-timeline-{n}", W, H, b, f"{n} 节点时间轴（上下交错）")


# ══════════════════ 生成 ══════════════════

def main():
    os.makedirs(OUT, exist_ok=True)
    for n in (3, 4, 5):
        chevron_chain(n)
        arrow_bar(n)
        step_stairs(n)
        pyramid(n)
        pyramid(n, inverted=True)
        funnel(n)
        nested_rings(n)
        nested_boxes(n)
        layer_stack(n)
        cycle_ring(n)
        pipeline_bar(n)
        hub_spoke(n + 2)
        bracket_group(n)
        kpi_block(n)
        swimlane(n + 1)
        timeline(n + 1)
    snake_flow(9)          # 第 3 页：九段研究流程
    org_tree()
    issue_tree()
    iceberg()
    matrix(2); matrix(3)
    harvey_balls()
    radar(4); radar(6)
    waterfall()
    venn(2); venn(3)
    bridge_gap()
    matrix_flow()
    callout_card()
    banner()
    connectors()

    # 预览接触表
    cards = "\n".join(
        f'<figure><img src="shapes/{n}.svg" alt="{n}"><figcaption>'
        f'<b>{n}</b><span>{note}</span><em>{w}×{h}</em></figcaption></figure>'
        for n, w, h, note in sorted(files))
    html = f"""<!doctype html><meta charset="utf-8"><title>图形语汇素材库</title>
<style>
body{{font:14px/1.6 system-ui,sans-serif;background:#F7F8FA;color:#26313B;margin:0;padding:32px}}
h1{{font-size:20px;margin:0 0 4px}} p.sub{{color:#6B7C8C;margin:0 0 28px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}}
figure{{margin:0;background:#fff;border:1px solid #E3E8ED;border-radius:8px;padding:16px;display:flex;flex-direction:column}}
img{{width:100%;height:190px;object-fit:contain;object-position:center}}
figcaption{{margin-top:12px;border-top:1px solid #EEF1F4;padding-top:10px;display:flex;flex-direction:column;gap:2px}}
b{{font-size:13px;font-family:ui-monospace,monospace}} span{{color:#6B7C8C;font-size:12px}}
em{{color:#A8B4BF;font-size:11px;font-style:normal}}
</style>
<h1>咨询图形语汇 · SVG 素材库</h1>
<p class="sub">共 {len(files)} 个图元 · 灰阶为占位色，Figma 内点选色块直接替换 · 全部为参数化几何，无 clipart</p>
<div class="grid">{cards}</div>"""
    with open(os.path.join(os.path.dirname(OUT), "index.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"生成 {len(files)} 个 SVG → {OUT}")


if __name__ == "__main__":
    main()

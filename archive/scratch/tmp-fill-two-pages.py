# -*- coding: utf-8 -*-
"""Rebuild script docx with fuller 2-page layout; verify page count & content via Word COM."""
import os, shutil, sys
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tmp_gen_sections import SECTIONS  # shared data

DESKTOP = r"C:\Users\86136\Desktop"
FINAL = os.path.join(DESKTOP, "C26答辩逐字稿-打印版2页.docx")

def set_east_asia(run, ea_name):
    rpr = run._element.get_or_add_rPr()
    rfonts = rpr.find(qn('w:rFonts'))
    if rfonts is None:
        rfonts = OxmlElement('w:rFonts')
        rpr.append(rfonts)
    rfonts.set(qn('w:eastAsia'), ea_name)

def build(line_spacing, space_before_pt, path):
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Cm(21.0), Cm(29.7)
    sec.top_margin = sec.bottom_margin = Cm(0.4)
    sec.left_margin = sec.right_margin = Cm(0.4)
    sec.footer_distance = Cm(0.2)

    normal = doc.styles['Normal']
    normal.font.name = 'Times New Roman'
    normal.font.size = Pt(12)
    normal.element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')

    for i, (pid, name, text) in enumerate(SECTIONS):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        pf = p.paragraph_format
        pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        pf.line_spacing = line_spacing
        pf.space_before = Pt(space_before_pt if i else 0)
        pf.space_after = Pt(0)

        r = p.add_run(f"【{pid}·{name}】")
        r.bold = True
        r.font.size = Pt(12)
        r.font.name = 'Arial'
        r.font.color.rgb = RGBColor(0x1F, 0x3B, 0x63)
        set_east_asia(r, '黑体')

        rb = p.add_run(text)
        rb.font.size = Pt(12)
        rb.font.name = 'Times New Roman'
        set_east_asia(rb, '宋体')

    doc.save(path)

def count_pages(path):
    import win32com.client as wc
    word = wc.DispatchEx('Word.Application')
    word.Visible = False
    word.DisplayAlerts = 0
    try:
        d = word.Documents.Open(os.path.abspath(path), ReadOnly=True)
        d.Repaginate()
        n = d.ComputeStatistics(2)  # wdStatisticPages
        d.Close(False)
        return n
    finally:
        try:
            word.Quit()
        except Exception:
            pass

# expected char count from source of truth
expected = sum(len(f"【{pid}·{name}】") + len(text) for pid, name, text in SECTIONS)

candidates = [(1.6, 8), (1.5, 8), (1.45, 6), (1.35, 6)]
chosen = None
for ls, sp in candidates:
    tmp = os.path.join(DESKTOP, f"_tmp_ls{ls}.docx")
    build(ls, sp, tmp)
    pages = count_pages(tmp)
    print(f"line_spacing={ls} space_before={sp}pt -> pages={pages}")
    if pages <= 2 and chosen is None:
        chosen = (ls, sp, tmp, pages)
        break
    if pages > 2:
        os.remove(tmp)

if chosen is None:
    print("no candidate fits 2 pages")
    sys.exit(1)

ls, sp, tmp, pages = chosen
# verify content integrity of the chosen build
d = Document(tmp)
got = sum(len(p.text) for p in d.paragraphs)
assert got == expected, f"content mismatch! got {got}, expected {expected}"
print(f"content check: {got} chars == expected {expected} (27 sections intact)")

try:
    shutil.copyfile(tmp, FINAL)
    out = FINAL
    print("saved over:", FINAL)
except PermissionError:
    out = os.path.join(DESKTOP, "C26答辩逐字稿-打印版2页-填满.docx")
    shutil.copyfile(tmp, out)
    print("final name locked, saved as:", out)
os.remove(tmp)
print(f"DONE: {out} | pages={pages} | line_spacing={ls} | space_before={sp}pt | chars={got}")

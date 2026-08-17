# -*- coding: utf-8 -*-
"""OCR the WeChat article PDF into markdown using RapidOCR."""
import sys, io, os
import fitz
from rapidocr_onnxruntime import RapidOCR

PDF = r"C:\Users\LHM\Desktop\HermesWorkspace\cruise-competition-01\research\round2\source-archive\user-supplied\20250606-upload-公众号文章.pdf"
OUT = r"C:\Users\LHM\Desktop\HermesWorkspace\cruise-competition-01\research\round2\source-archive\user-supplied\20250606-公众号文章-OCR.md"

sys.stdout.reconfigure(encoding="utf-8")
ocr = RapidOCR()
doc = fitz.open(PDF)
parts = []
for i in range(doc.page_count):
    page = doc[i]
    pix = page.get_pixmap(dpi=200)
    img_bytes = pix.tobytes("png")
    result, _ = ocr(img_bytes)
    lines = []
    if result:
        # result: list of [box, text, score]
        for box, text, score in result:
            lines.append(text)
    parts.append(f"\n\n<!-- ===== 第 {i+1} 页 ===== -->\n" + "\n".join(lines))
    print(f"page {i+1}/{doc.page_count} done", flush=True)

with open(OUT, "w", encoding="utf-8") as f:
    f.write("# 公众号文章 OCR 转录（20250606-upload）\n\n> 来源 PDF：20250606-upload-公众号文章.pdf（55 页，RapidOCR 转录，2026-08-17）\n> 注意：OCR 可能有误字，引用前请对照原 PDF。\n")
    f.write("\n".join(parts))
print("DONE ->", OUT)

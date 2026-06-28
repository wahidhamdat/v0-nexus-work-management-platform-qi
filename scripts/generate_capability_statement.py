#!/usr/bin/env python3
"""
Monakes Capability Statement — One-Page Professional PDF
Uses ReportLab with Inter font for institutional-grade output.
"""

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
import os

# ── Font Registration ──────────────────────────────────────────────
FONT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "fonts")

pdfmetrics.registerFont(TTFont("Inter-Regular", os.path.join(FONT_DIR, "Inter-Regular.ttf")))
pdfmetrics.registerFont(TTFont("Inter-Medium", os.path.join(FONT_DIR, "Inter-Medium.ttf")))
pdfmetrics.registerFont(TTFont("Inter-SemiBold", os.path.join(FONT_DIR, "Inter-SemiBold.ttf")))
pdfmetrics.registerFont(TTFont("Inter-Bold", os.path.join(FONT_DIR, "Inter-Bold.ttf")))

# ── Colors ─────────────────────────────────────────────────────────
MAROON = HexColor("#8A1538")
BG_WARM = HexColor("#F7F5F2")
HEADING = HexColor("#1A1A1A")
BODY = HexColor("#5A5A5A")
DARK = HexColor("#1A1A1A")
WHITE = HexColor("#FFFFFF")
BORDER_LIGHT = HexColor("#1A1A1A")
BORDER_LIGHT.opacity = 0.06
WHITE_70 = HexColor("#B3B3B3")

# ── Page Setup ─────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4  # 595.27 x 841.89 pts
MARGIN = 14 * mm     # 39.69 pts
USABLE_W = PAGE_W - 2 * MARGIN

OUTPUT = os.path.join(os.path.dirname(__file__), "..", "public", "monakes-capability-statement.pdf")
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)

c = canvas.Canvas(OUTPUT, pagesize=A4)
c.setTitle("Monakes — Capability Statement")
c.setAuthor("Monakes for Artificial Intelligence Solutions LLC")

# ── Page Background ────────────────────────────────────────────────
c.setFillColor(BG_WARM)
c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

# ── Header Strip (white bg, thin maroon bottom border) ─────────────
HEADER_TOP = MARGIN
HEADER_H = 62 * mm
HEADER_BOTTOM = HEADER_TOP + HEADER_H

# White header background
c.setFillColor(WHITE)
c.rect(MARGIN, PAGE_H - HEADER_TOP - HEADER_H, USABLE_W, HEADER_H, fill=1, stroke=0)

# Thin #8A1538 bottom border on header
c.setStrokeColor(MAROON)
c.setLineWidth(0.5)
c.line(MARGIN, PAGE_H - HEADER_BOTTOM, PAGE_W - MARGIN, PAGE_H - HEADER_BOTTOM)

# Header — Left-aligned text
x_left = MARGIN + 6 * mm
y = PAGE_H - HEADER_TOP - 10 * mm

# Company name — small caps weight
c.setFillColor(HEADING)
c.setFont("Inter-Bold", 9)
c.drawString(x_left, y, "MONAKES FOR ARTIFICIAL INTELLIGENCE SOLUTIONS LLC")

# Address line
y -= 13
c.setFont("Inter-Regular", 7.5)
c.setFillColor(BODY)
c.drawString(x_left, y, "Qatar Science & Technology Park, Education City, Doha, Qatar")

# QSTP line — maroon, small caps
y -= 12
c.setFillColor(MAROON)
c.setFont("Inter-Bold", 7)
c.drawString(x_left, y, "A QSTP PORTFOLIO COMPANY")

# Header — Right-aligned: monakes.com
x_right = PAGE_W - MARGIN - 6 * mm
c.setFillColor(MAROON)
c.setFont("Inter-Bold", 9)
# Centered vertically in the header strip
y_center = PAGE_H - HEADER_TOP - HEADER_H / 2 + 4
c.drawRightString(x_right, y_center, "monakes.com")

# ── FIRST RULE (after header) ──────────────────────────────────────
rule_y = PAGE_H - HEADER_BOTTOM - 6 * mm
c.setStrokeColor(MAROON)
c.setLineWidth(0.5)
c.line(MARGIN, rule_y, PAGE_W - MARGIN, rule_y)

# ── Content Area ───────────────────────────────────────────────────
content_top = rule_y - 7 * mm
x = x_left
y = content_top

# Helper: draw a section label
def section_label(text, y_pos):
    c.setFillColor(MAROON)
    c.setFont("Inter-Bold", 6.5)
    c.drawString(x, y_pos, text.upper())
    return y_pos - 4 * mm  # space after label

# Helper: draw a body paragraph with word wrapping
def body_paragraph(text, y_pos, font="Inter-Regular", size=8, leading=11.5, max_width=None):
    if max_width is None:
        max_width = USABLE_W - 6 * mm
    c.setFillColor(BODY)
    c.setFont(font, size)
    
    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        test_line = current_line + (" " if current_line else "") + word
        if c.stringWidth(test_line, font, size) > max_width:
            lines.append(current_line)
            current_line = word
        else:
            current_line = test_line
    if current_line:
        lines.append(current_line)
    
    for line in lines:
        c.drawString(x, y_pos, line)
        y_pos -= leading
    return y_pos - 2 * mm  # extra space after paragraph

# Helper: draw a thin maroon rule
def thin_rule(y_pos):
    c.setStrokeColor(MAROON)
    c.setLineWidth(0.5)
    c.line(MARGIN, y_pos, PAGE_W - MARGIN, y_pos)
    return y_pos - 7 * mm

# ── CORE CAPABILITY ────────────────────────────────────────────────
y = section_label("CORE CAPABILITY", y)

y = body_paragraph(
    "Monakes is an AI-powered procurement evaluation platform that generates a complete, legally defensible "
    "audit record for government tender evaluations within 48 hours. Every score is timestamped at the moment "
    "it is created, traced to the specific clause and page in the original document, and locked. The record is "
    "built as evaluation happens — not assembled afterward under pressure.",
    y
)

y = thin_rule(y)

# ── WHAT IT DOES ────────────────────────────────────────────────────
y = section_label("WHAT IT DOES", y)

# Item helper — lead phrase in Medium (bold-like), then body sentence
def what_item(lead, body_text, y_pos):
    # Subtle left border bar
    bar_x = MARGIN + 1 * mm
    bar_h = 22  # approximate
    c.setStrokeColor(MAROON)
    c.setLineWidth(1.5)
    c.line(bar_x, y_pos - 4, bar_x, y_pos - bar_h)
    
    indent = 6 * mm
    text_x = MARGIN + indent
    text_w = USABLE_W - indent
    
    # Lead phrase
    c.setFillColor(HEADING)
    c.setFont("Inter-Bold", 8)
    c.drawString(text_x, y_pos, lead)
    
    # Body sentence — inline after lead, or wrap
    c.setFillColor(BODY)
    c.setFont("Inter-Regular", 8)
    
    # Calculate if body fits on same line after lead
    lead_w = c.stringWidth(lead + "  ", "Inter-Bold", 8)
    
    words = body_text.split()
    lines = []
    current_line = ""
    first_line = True
    
    for word in words:
        test_line = current_line + (" " if current_line else "") + word
        available_w = text_w - (lead_w if first_line else 0)
        test_font = ("Inter-Bold", 8) if first_line and not current_line else ("Inter-Regular", 8)
        
        if c.stringWidth(test_line, "Inter-Regular", 8) > available_w:
            if first_line and not current_line:
                # First word doesn't fit on lead line — move to next line
                lines.append("")
                first_line = False
                current_line = word
            else:
                lines.append(current_line)
                current_line = word
                first_line = False
        else:
            current_line = test_line
    
    if current_line:
        lines.append(current_line)
    
    # Draw first line inline with lead
    if lines:
        if first_line and lines[0]:
            # Body continues on same line as lead
            c.drawString(text_x + lead_w, y_pos, "  " + lines[0])
        else:
            # Body starts on new line
            c.drawString(text_x, y_pos - 11.5, lines[0])
        # Draw remaining lines
        for i, line in enumerate(lines[1:], 1):
            if first_line:
                c.drawString(text_x, y_pos - (i * 11.5), line)
            else:
                c.drawString(text_x, y_pos - ((i + 1) * 11.5), line)
    
    # Calculate total height
    total_lines = len(lines) + (0 if first_line and lines else 0)
    if first_line and lines:
        total_lines -= 0  # first line inline
    else:
        total_lines += 1  # lead takes one line, body starts on next
    
    # Actually let me simplify — just draw body as separate paragraph under lead
    # This is cleaner and more reliable
    ...
    return y_pos - 4 * mm


# Simpler approach: lead phrase on its own line, body paragraph indented below
def what_item_simple(lead, body_text, y_pos):
    indent = 6 * mm
    text_x = MARGIN + indent
    text_w = USABLE_W - indent
    
    # Thin vertical bar on the left
    bar_x = MARGIN + 2 * mm
    bar_top = y_pos + 2
    bar_bottom = y_pos - 10  # will adjust
    
    c.setFillColor(HEADING)
    c.setFont("Inter-Bold", 8)
    c.drawString(text_x, y_pos, lead)
    
    y_pos -= 12
    
    # Body text with wrapping
    c.setFillColor(BODY)
    c.setFont("Inter-Regular", 8)
    
    words = body_text.split()
    lines = []
    current_line = ""
    for word in words:
        test_line = current_line + (" " if current_line else "") + word
        if c.stringWidth(test_line, "Inter-Regular", 8) > text_w:
            lines.append(current_line)
            current_line = word
        else:
            current_line = test_line
    if current_line:
        lines.append(current_line)
    
    bar_bottom = y_pos - (len(lines) - 1) * 11.5 - 2
    
    # Draw bar
    c.setStrokeColor(MAROON)
    c.setLineWidth(1.2)
    c.line(bar_x, bar_top, bar_x, bar_bottom)
    
    for line in lines:
        c.drawString(text_x, y_pos, line)
        y_pos -= 11.5
    
    return y_pos - 3 * mm


y = what_item_simple(
    "Parallel deployment.",
    "Runs in parallel with any live tender cycle. No change to the institution's ERP, committee, "
    "legal timelines, or existing systems.",
    y
)

y = what_item_simple(
    "48-hour evidentiary record.",
    "Produces a clause-level evidentiary record in 48 hours. In a validated deployment on a live "
    "Gulf government infrastructure tender, the institution's manual process took 19 days and was "
    "found incomplete in three scoring areas on direct comparison.",
    y
)

y = what_item_simple(
    "Sovereign infrastructure.",
    "Deploys on the client's own infrastructure. No data leaves their environment. Compatible with "
    "any in-country hosting model.",
    y
)

y = thin_rule(y)

# ── THE SPECIFIC CONVERSATION ──────────────────────────────────────
y = section_label("THE SPECIFIC CONVERSATION", y)

y = body_paragraph(
    "Malomatia and JAGGAER signed an MoU in March 2024 to deliver spend management solutions "
    "in Qatar's energy and utilities sector. JAGGAER optimizes procurement workflow and spend "
    "visibility. Monakes generates the evidentiary documentation layer that makes the output of "
    "that workflow legally defensible when a decision is challenged — formally or otherwise. The "
    "two platforms solve adjacent problems in the same procurement cycle. There is no overlap. "
    "There is a gap between them that government clients are currently exposed in.",
    y
)

y = body_paragraph(
    "Monakes does not require Malomatia to build anything, configure anything, or train anyone. "
    "Configuration is completed by Monakes before the first tender. Delivery is Malomatia's client "
    "relationship. The platform does the documentation work.",
    y
)

y = thin_rule(y)

# ── Footer Strip (#1A1A1A bg) ──────────────────────────────────────
FOOTER_H = 16 * mm
footer_top = MARGIN  # from bottom

# Dark footer background
c.setFillColor(DARK)
c.rect(MARGIN, footer_top, USABLE_W, FOOTER_H, fill=1, stroke=0)

# Subtle maroon top border
c.setStrokeColor(MAROON)
c.setLineWidth(0.5)
c.line(MARGIN, footer_top + FOOTER_H, PAGE_W - MARGIN, footer_top + FOOTER_H)

# Footer text
footer_y = footer_top + FOOTER_H / 2 + 3
footer_font_size = 7

# Left: Mohammed H, Founder
c.setFillColor(WHITE)
c.setFont("Inter-Medium", footer_font_size)
c.drawString(x_left, footer_y, "Mohammed H, Founder")

# Center: hamdat@monakes.com
c.setFont("Inter-Regular", footer_font_size)
c.setFillColor(WHITE_70)
email = "hamdat@monakes.com"
email_w = c.stringWidth(email, "Inter-Regular", footer_font_size)
c.drawString(PAGE_W / 2 - email_w / 2, footer_y, email)

# Right: monakes.com
c.setFillColor(WHITE_70)
c.setFont("Inter-Regular", footer_font_size)
c.drawRightString(PAGE_W - MARGIN - 6 * mm, footer_y, "monakes.com")

# ── Save ────────────────────────────────────────────────────────────
c.save()
print(f"✓ PDF saved to: {OUTPUT}")
print(f"  Size: {os.path.getsize(OUTPUT) / 1024:.1f} KB")

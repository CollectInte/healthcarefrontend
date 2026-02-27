import React, { useRef, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Backdrop } from "@mui/material";
import "./PrescriptionPreview.css";

/* ─────────────────────────────────────────────────────────────────
   SCREEN CONSTANTS  (A4 card: 794×1123px @ 96dpi, pad 36v/48h)
───────────────────────────────────────────────────────────────── */
const PAGE_W     = 794;
const PAGE_PAD_H = 48;   // horizontal padding each side
const PAGE_H     = 1123;
const PAGE_PAD_V = 36;   // vertical padding top/bottom
const HEADER_H   = 170;  // px — approx rendered height of screen header
const FOOTER_H   = 80;   // px — approx rendered height of screen footer
const BODY_AVAIL = PAGE_H - PAGE_PAD_V * 2 - HEADER_H - FOOTER_H; // ~761px

function measureHeight(html, containerRef) {
  if (!containerRef.current) return 0;
  containerRef.current.innerHTML = html;
  return containerRef.current.scrollHeight;
}

/* ─────────────────────────────────────────────────────────────────
   FORMAT DATE
───────────────────────────────────────────────────────────────── */
function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/* ─────────────────────────────────────────────────────────────────
   PRINT CONSTANTS
   @page margins mirror the screen card padding so 1px = 1px.
     top/bottom: PAGE_PAD_V=36px → 36/3.7795 ≈ 9.525mm
     left/right: PAGE_PAD_H=48px → 48/3.7795 ≈ 12.7mm
   Content width = PAGE_W - 2*PAGE_PAD_H = 698px  (same as screen)
   Body available = same BODY_AVAIL as screen so pagination matches.
───────────────────────────────────────────────────────────────── */
const PRINT_CONTENT_W = PAGE_W - PAGE_PAD_H * 2; // 698px

/* ─────────────────────────────────────────────────────────────────
   MEASURE PRINT CHUNKS
   Uses exactly the same width + font settings as the screen
   measure div, so splitPrintChunks gives identical page breaks.
───────────────────────────────────────────────────────────────── */
function measurePrintChunk(html) {
  const div = document.createElement("div");
  div.style.cssText = [
    "position:absolute",
    "top:-9999px",
    "left:-9999px",
    `width:${PRINT_CONTENT_W}px`,
    'font-family:"Georgia","Times New Roman",serif',
    "font-size:13px",
    "visibility:hidden",
    "box-sizing:border-box",
  ].join(";");
  div.innerHTML = html;
  document.body.appendChild(div);
  const h = div.scrollHeight;
  document.body.removeChild(div);
  return h;
}

/* ─────────────────────────────────────────────────────────────────
   SPLIT PRINT CHUNKS INTO PAGES  (same logic as screen splitter)
───────────────────────────────────────────────────────────────── */
function splitPrintChunks(chunks) {
  const pages = [];
  let current = [];
  let usedH   = 0;

  for (const chunk of chunks) {
    const h = measurePrintChunk(chunk);
    if (usedH + h <= BODY_AVAIL) {
      current.push(chunk);
      usedH += h;
    } else if (h > BODY_AVAIL) {
      if (current.length) { pages.push(current); current = []; usedH = 0; }
      pages.push([chunk]);
    } else {
      pages.push(current);
      current = [chunk];
      usedH   = h;
    }
  }
  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}

/* ─────────────────────────────────────────────────────────────────
   PRINT CHUNK BUILDER
   Produces identical HTML markup + class names as buildChunks()
   so the same CSS rules apply in the print window.
───────────────────────────────────────────────────────────────── */
function buildPrintChunks({ consultations, medicines, tests, notes, description }) {
  const fmtWhen = (w) => {
    if (!w) return "—";
    if (Array.isArray(w)) return w.join(", ");
    if (typeof w === "string") return w.split(",").map(v => v.trim()).join(", ");
    return "—";
  };

  const chunks = [];

  if (consultations.length > 0) {
    const rows = consultations.map((c, i) =>
      `<tr><td>${i + 1}</td><td>${c.name || "—"}</td><td>${c.description || "—"}</td></tr>`
    ).join("");
    chunks.push(`
      <div class="rx-section-title">Consultation Types</div>
      <table class="rx-table">
        <thead><tr><th>#</th><th>Consultation</th><th>Description</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`);
  }

  if (medicines.length > 0) {
    const rows = medicines.map((m, i) => `
      <tr>
        <td>${i + 1}</td><td>${m.medicine_name || "—"}</td><td>${m.type || "—"}</td>
        <td>${m.strength || ""}${m.unit || ""}</td><td>${m.quantity || "—"}</td>
        <td>${fmtWhen(m.when_to_take)}</td><td>${m.duration || "—"}</td>
        <td>${m.description || "—"}</td>
      </tr>`).join("");
    chunks.push(`
      <div class="rx-section-title">Medicines</div>
      <table class="rx-table">
        <thead>
          <tr><th>#</th><th>Medicine</th><th>Type</th><th>Strength</th>
          <th>Qty</th><th>When To Take</th><th>Duration</th><th>Notes</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`);
  }

  if (tests.length > 0) {
    const rows = tests.map((t, i) =>
      `<tr><td>${i + 1}</td><td>${t.test_name || "—"}</td>
       <td>${t.test_type || "—"}</td><td>${t.description || "—"}</td></tr>`
    ).join("");
    chunks.push(`
      <div class="rx-section-title">Tests</div>
      <table class="rx-table">
        <thead><tr><th>#</th><th>Test</th><th>Type</th><th>Notes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`);
  }

  if (notes || description) {
    chunks.push(`
      <div class="rx-notes">
        ${notes       ? `<div><strong>Notes:</strong> ${notes}</div>`      : ""}
        ${description ? `<div><strong>Info:</strong> ${description}</div>` : ""}
      </div>`);
  }

  return chunks;
}

/* ─────────────────────────────────────────────────────────────────
   BUILD PRINT HTML
   ─ CSS is a direct copy of PrescriptionPreview.css screen styles
   ─ @page margins = screen card paddings → pixel-perfect match
   ─ Each page div is self-contained: header + body + footer
   ─ .rx-page-break { page-break-after:always } separates pages
───────────────────────────────────────────────────────────────── */
function buildPrintHTML({
  clinic, branch, patient, doctor, appointment,
  consultations, medicines, tests, notes, description,
}) {
  const logoHTML = clinic.logo
    ? `<img src="${clinic.logo}" crossorigin="anonymous" class="rx-logo" alt="logo" />`
    : `<div class="rx-logo-placeholder">${(clinic.name || "C").charAt(0)}</div>`;

  const footerLogoHTML = clinic.logo
    ? `<img src="${clinic.logo}" crossorigin="anonymous" class="rx-footer-logo" alt="logo" />`
    : "";

  // ── identical structure to screen <Header> JSX ──
  const headerBlock = `
    <div class="rx-header-wrap">
      <div class="rx-header-top">
        <div class="rx-header-logo">${logoHTML}</div>
        <div class="rx-header-center">
          <div class="rx-clinic-name">${clinic.name || ""}</div>
          ${branch && branch !== "—" ? `<div class="rx-branch">Branch: ${branch}</div>` : ""}
        </div>
        <div class="rx-header-right">
          ${clinic.phone   ? `<div>&#128222; ${clinic.phone}</div>` : ""}
          ${clinic.email   ? `<div>&#9993; ${clinic.email}</div>`   : ""}
          ${clinic.address ? `<div class="clinic-address">${clinic.address}</div>` : ""}
        </div>
      </div>
      <hr class="rx-divider" />
      <div class="rx-meta">
        <div class="rx-meta-block">
          <div class="rx-label">Patient</div>
          <div class="rx-meta-val">${patient.name || "—"}</div>
          <small class="rx-meta-small">ID: ${patient.id || "—"}</small>
        </div>
        <div class="rx-meta-block">
          <div class="rx-label">Doctor</div>
          <div class="rx-meta-val">${doctor?.name || "—"}</div>
          <small class="rx-meta-small">${doctor?.qualification || ""}</small>
        </div>
        <div class="rx-meta-block">
          <div class="rx-label">Appointment Date</div>
          <div class="rx-meta-val">${fmtDate(appointment?.appointment_date)}</div>
          <div class="rx-label" style="margin-top:7px">Appointment ID</div>
          <div class="rx-meta-val">${appointment?.id ? "#" + appointment.id : "—"}</div>
        </div>
      </div>
      <hr class="rx-divider-thin" />
    </div>`;

  // ── identical structure to screen <Footer> JSX ──
  const footerBlock = (pageNum, total) => `
    <div class="rx-footer">
      <div class="rx-footer-left">
        ${footerLogoHTML}
        <div class="rx-footer-name">${clinic.name || ""}</div>
      </div>
      <div class="rx-signature-area">
        <div class="rx-sign-label">Electronically Signed by</div>
        <div class="rx-sign-name">${doctor?.name || ""}</div>
        <div class="rx-sign-qual">${doctor?.qualification || ""}</div>
      </div>
      <div class="rx-footer-right">
        ${clinic.phone ? `<div>&#128222; ${clinic.phone}</div>` : ""}
        ${clinic.email ? `<div>&#9993; ${clinic.email}</div>`   : ""}
        <div style="font-size:10px;color:#aaa;margin-top:4px;">
          Page ${pageNum} of ${total}
        </div>
      </div>
    </div>`;

  const chunks = buildPrintChunks({ consultations, medicines, tests, notes, description });
  const pages  = splitPrintChunks(chunks);
  const total  = pages.length;

  const pagesHTML = pages.map((pageChunks, idx) => `
    <div class="rx-page${idx < total - 1 ? " rx-page-break" : ""}">
      ${headerBlock}
      <div class="rx-body-content">${pageChunks.join("")}</div>
      ${footerBlock(idx + 1, total)}
    </div>`).join("\n");

  // ── CSS mirrors PrescriptionPreview.css 1:1 ──
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Prescription</title>
  <style>
    @page {
      size: A4 portrait;
      /* Mirror screen card padding: 36px v → 9.525mm, 48px h → 12.7mm */
      margin: 9.525mm 12.7mm;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 13px;
      color: #1a1a2e;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── PAGE ── */
    .rx-page {
      width: 100%;
      display: flex;
      flex-direction: column;
      /* usable A4 height after margins */
      min-height: calc(297mm - 19.05mm);
    }

    .rx-page-break {
      page-break-after: always;
      break-after: page;
    }

    .rx-body-content { flex: 1; }

    /* ── HEADER — exact copy of screen CSS ── */
    .rx-header-wrap { flex-shrink: 0; margin-bottom: 4px; }

    .rx-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    .rx-header-logo { flex-shrink: 0; width: 70px; }

    .rx-logo {
      width: 64px; height: 64px;
      object-fit: contain; border-radius: 6px; display: block;
    }

    .rx-logo-placeholder {
      width: 64px; height: 64px; border-radius: 8px;
      background: linear-gradient(135deg, #2e5560, #3f6f7a);
      color: #fff; font-size: 26px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }

    .rx-header-center { flex: 1; text-align: center; }

    .rx-clinic-name {
      font-size: 22px; font-weight: 700; color: #1a237e;
      letter-spacing: 0.02em; line-height: 1.2;
    }

    .rx-branch { font-size: 11.5px; color: #666; margin-top: 3px; }

    .rx-header-right {
      font-size: 11px; line-height: 1.7;
      text-align: right; max-width: 210px;
      color: #333; flex-shrink: 0;
    }

    .clinic-address { color: #555; line-height: 1.45; margin-top: 2px; }

    .rx-divider { border: none; border-top: 2.5px solid #1a237e; margin: 0 0 10px; }
    .rx-divider-thin { border: none; border-top: 1px solid #ccc; margin: 10px 0 6px; }

    /* ── META ── */
    .rx-meta { display: flex; justify-content: space-between; }
    .rx-meta-block { flex: 1; padding: 4px 0; }
    .rx-meta-block + .rx-meta-block {
      border-left: 1px solid #e8e8e8;
      padding-left: 16px; margin-left: 16px;
    }

    .rx-label {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; color: #1a237e; margin-bottom: 3px;
    }

    .rx-meta-val { font-size: 13.5px; font-weight: 700; color: #111; line-height: 1.3; }
    .rx-meta-small { font-size: 10.5px; color: #666; display: block; margin-top: 2px; }

    /* ── SECTION TITLE ── */
    .rx-section-title {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.07em; color: #1a237e;
      border-bottom: 1.5px solid #1a237e;
      padding-bottom: 3px; margin: 16px 0 7px;
    }

    /* ── TABLE ── */
    .rx-table {
      width: 100%; border-collapse: collapse;
      font-size: 11.5px; font-family: "Georgia", "Times New Roman", serif;
    }

    .rx-table th {
      background: #e8eaf6; color: #1a237e;
      padding: 6px 8px; font-size: 9.5px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.04em;
      text-align: left; border-bottom: 1px solid #c5cae9;
    }

    .rx-table td {
      padding: 6px 8px; border-bottom: 1px solid #f0f0f0;
      vertical-align: top; color: #222;
    }

    .rx-table tbody tr:nth-child(even) td { background: #fafafa; }
    .rx-table tr { page-break-inside: avoid; break-inside: avoid; }

    /* ── NOTES ── */
    .rx-notes {
      background: #f7f7f7; border-left: 3px solid #1a237e;
      padding: 8px 12px; margin-top: 14px;
      font-size: 11.5px; line-height: 1.6; color: #333;
    }

    /* ── FOOTER — exact copy of screen CSS ── */
    .rx-footer {
      flex-shrink: 0;
      margin-top: auto;
      padding-top: 12px;
      border-top: 2px solid #1a237e;
      display: flex; justify-content: space-between; align-items: flex-start;
      font-size: 11px; color: #333; gap: 12px;
    }

    .rx-footer-left { display: flex; align-items: center; gap: 8px; flex: 1; }

    .rx-footer-logo { width: 32px; height: 32px; object-fit: contain; border-radius: 4px; }

    .rx-footer-name { font-weight: 700; color: #1a237e; font-size: 12px; }

    .rx-signature-area { text-align: center; flex: 1; line-height: 1.55; }

    .rx-sign-label {
      font-size: 9px; font-weight: 700; color: #555;
      text-transform: uppercase; letter-spacing: 0.06em;
    }

    .rx-sign-name { font-size: 12.5px; font-weight: 700; color: #1a1a2e; }
    .rx-sign-qual { font-size: 10px; color: #666; }

    .rx-footer-right { text-align: right; flex: 1; line-height: 1.7; font-size: 11px; }
  </style>
</head>
<body>
${pagesHTML}
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────────
   HEADER  (screen only)
───────────────────────────────────────────────────────────────── */
function Header({ clinic, branch, patient, doctor, appointment }) {
  return (
    <div className="rx-header-wrap">
      <div className="rx-header-top">
        <div className="rx-header-logo">
          {clinic.logo ? (
            <img src={clinic.logo} alt="logo" crossOrigin="anonymous" className="rx-logo" />
          ) : (
            <div className="rx-logo-placeholder">{clinic.name?.charAt(0) ?? "C"}</div>
          )}
        </div>
        <div className="rx-header-center">
          <div className="rx-clinic-name">{clinic.name || "Clinic"}</div>
          {branch && branch !== "—" && <div className="rx-branch">Branch: {branch}</div>}
        </div>
        <div className="rx-header-right">
          {clinic.phone   && <div>📞 {clinic.phone}</div>}
          {clinic.email   && <div>✉ {clinic.email}</div>}
          {clinic.address && <div className="clinic-address">{clinic.address}</div>}
        </div>
      </div>
      <hr className="rx-divider" />
      <div className="rx-meta">
        <div className="rx-meta-block">
          <div className="rx-label">Patient</div>
          <div className="rx-meta-val">{patient.name || "—"}</div>
          <small className="rx-meta-small">ID: {patient.id || "—"}</small>
        </div>
        <div className="rx-meta-block">
          <div className="rx-label">Doctor</div>
          <div className="rx-meta-val">{doctor?.name || "—"}</div>
          <small className="rx-meta-small">{doctor?.qualification || ""}</small>
        </div>
        <div className="rx-meta-block">
          <div className="rx-label">Appointment Date</div>
          <div className="rx-meta-val">{fmtDate(appointment?.appointment_date)}</div>
          <div className="rx-label" style={{ marginTop: 7 }}>Appointment ID</div>
          <div className="rx-meta-val">{appointment?.id ? `#${appointment.id}` : "—"}</div>
        </div>
      </div>
      <hr className="rx-divider-thin" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FOOTER  (screen only)
───────────────────────────────────────────────────────────────── */
function Footer({ clinic, doctor }) {
  return (
    <div className="rx-footer">
      <div className="rx-footer-left">
        {clinic.logo && (
          <img src={clinic.logo} alt="logo" crossOrigin="anonymous" className="rx-footer-logo" />
        )}
        <div className="rx-footer-name">{clinic.name}</div>
      </div>
      <div className="rx-signature-area">
        <div className="rx-sign-label">Electronically Signed by</div>
        <div className="rx-sign-name">{doctor?.name}</div>
        <div className="rx-sign-qual">{doctor?.qualification}</div>
      </div>
      <div className="rx-footer-right">
        {clinic.phone && <div>📞 {clinic.phone}</div>}
        {clinic.email && <div>✉ {clinic.email}</div>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BUILD SCREEN CHUNKS
───────────────────────────────────────────────────────────────── */
function buildChunks({ consultations, medicines, tests, notes, description }) {
  const chunks = [];

  if (consultations.length > 0) {
    chunks.push(`<div class="rx-section-title">Consultation Types</div>`);
    chunks.push(`
      <table class="rx-table">
        <thead><tr><th>#</th><th>Consultation</th><th>Description</th></tr></thead>
        <tbody>
          ${consultations.map((c, i) =>
            `<tr><td>${i + 1}</td><td>${c.name || "—"}</td><td>${c.description || "—"}</td></tr>`
          ).join("")}
        </tbody>
      </table>`);
  }

  if (medicines.length > 0) {
    chunks.push(`<div class="rx-section-title">Medicines</div>`);
    chunks.push(`
      <table class="rx-table">
        <thead>
          <tr><th>#</th><th>Medicine</th><th>Type</th><th>Strength</th>
          <th>Qty</th><th>When To Take</th><th>Duration</th><th>Notes</th></tr>
        </thead>
        <tbody>
          ${medicines.map((m, i) => {
            const when = Array.isArray(m.when_to_take)
              ? m.when_to_take.join(", ")
              : typeof m.when_to_take === "string"
                ? m.when_to_take.split(",").map(v => v.trim()).join(", ")
                : "—";
            return `<tr>
              <td>${i + 1}</td><td>${m.medicine_name || "—"}</td><td>${m.type || "—"}</td>
              <td>${m.strength || ""}${m.unit || ""}</td><td>${m.quantity || "—"}</td>
              <td>${when || "—"}</td><td>${m.duration || "—"}</td><td>${m.description || "—"}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>`);
  }

  if (tests.length > 0) {
    chunks.push(`<div class="rx-section-title">Tests</div>`);
    chunks.push(`
      <table class="rx-table">
        <thead><tr><th>#</th><th>Test</th><th>Type</th><th>Notes</th></tr></thead>
        <tbody>
          ${tests.map((t, i) =>
            `<tr><td>${i + 1}</td><td>${t.test_name || "—"}</td>
            <td>${t.test_type || "—"}</td><td>${t.description || "—"}</td></tr>`
          ).join("")}
        </tbody>
      </table>`);
  }

  if (notes || description) {
    let html = `<div class="rx-notes">`;
    if (notes)       html += `<div><strong>Notes:</strong> ${notes}</div>`;
    if (description) html += `<div><strong>Info:</strong> ${description}</div>`;
    html += `</div>`;
    chunks.push(html);
  }

  return chunks;
}

/* ─────────────────────────────────────────────────────────────────
   SCREEN PAGE SPLITTER
───────────────────────────────────────────────────────────────── */
function splitIntoPages(chunks, measure) {
  const pages = [];
  let current = [];
  let usedH   = 0;

  for (const chunk of chunks) {
    const chunkH = measure(chunk);
    if (usedH + chunkH <= BODY_AVAIL) {
      current.push(chunk);
      usedH += chunkH;
    } else if (chunkH > BODY_AVAIL) {
      if (current.length) { pages.push(current); current = []; usedH = 0; }
      pages.push([chunk]);
    } else {
      pages.push(current);
      current = [chunk];
      usedH   = chunkH;
    }
  }
  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}

/* ─────────────────────────────────────────────────────────────────
   SAVE OVERLAY
───────────────────────────────────────────────────────────────── */
function SaveOverlay({ status }) {
  if (!status) return null;
  const msg = status === "saving" ? "Saving prescription…" : "Sending email to patient…";
  return (
    <Backdrop open sx={{ zIndex: 9999, flexDirection: "column", gap: 2, color: "#fff" }}>
      <CircularProgress color="inherit" size={52} thickness={4} />
      <div style={{
        fontSize: "1rem", fontWeight: 600,
        background: "rgba(0,0,0,0.55)", padding: "10px 24px",
        borderRadius: 8, marginTop: 8,
      }}>
        {msg}
      </div>
    </Backdrop>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function PrescriptionPreview({
  data          = {},
  onConfirmSave,
  onClose,
  saving        = false,
}) {
  const consultations = data.consultations ?? [];
  const patient       = data.patient       ?? {};
  const doctor        = data.doctor        ?? {};
  const medicines     = data.medicines     ?? [];
  const tests         = data.tests         ?? [];
  const notes         = data.notes         ?? "";
  const description   = data.description   ?? "";
  const clinic        = data.clinic        ?? {};
  const branch        = data.branch        ?? "—";
  const appointment   = data.appointment   ?? {};

  const measureRef                  = useRef(null);
  const [pages, setPages]           = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveError, setSaveError]   = useState("");

  /* ── Build screen pages ── */
  useEffect(() => {
    if (!measureRef.current) return;
    const measure = (html) => measureHeight(html, measureRef);
    const chunks  = buildChunks({ consultations, medicines, tests, notes, description });
    setPages(splitIntoPages(chunks, measure));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    JSON.stringify(consultations),
    JSON.stringify(medicines),
    JSON.stringify(tests),
    notes, description,
  ]);

  /* ── Print ── */
  const handlePrint = () => {
    // measurePrintChunk() touches document.body — must run in the current window
    const html = buildPrintHTML({
      clinic, branch, patient, doctor, appointment,
      consultations, medicines, tests, notes, description,
    });

    const win = window.open("", "_blank", "width=900,height=720");
    if (!win) { alert("Pop-up blocked. Please allow pop-ups for this site."); return; }

    win.document.open();
    win.document.write(html);
    win.document.close();

    const tryPrint = () => {
      if (win.closed) return;
      if (win.document.readyState === "complete") {
        win.focus();
        win.print();
      } else {
        setTimeout(tryPrint, 120);
      }
    };
    setTimeout(tryPrint, 600);
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!onConfirmSave) return;
    setSaveError("");
    setSaveStatus("saving");
    try {
      await onConfirmSave();
      setSaveStatus(null);
      onClose?.();
    } catch (err) {
      setSaveStatus(null);
      setSaveError(err?.message || "Save failed. Please try again.");
    }
  };

  const hfProps = { clinic, branch, patient, doctor, appointment };

  return (
    <>
      <SaveOverlay status={saveStatus} />

      <Box sx={{ display: "flex", flexDirection: "column", height: "100%", background: "#6b6b6b" }}>

        {/* ── Action bar ── */}
        <Box sx={{
          display: "flex", alignItems: "center",
          justifyContent: "flex-end", gap: 1, flexWrap: "wrap",
          px: 3, py: 1.5,
          background: "#fff", borderBottom: "1px solid #e0e0e0",
          flexShrink: 0,
        }}>
          {saveError && (
            <span style={{ color: "#d32f2f", fontSize: "0.82rem", marginRight: "auto" }}>
              ⚠ {saveError}
            </span>
          )}
          {onClose && (
            <Button variant="outlined" color="error" size="small" onClick={onClose} disabled={!!saveStatus}>
              ✖ Close
            </Button>
          )}
          <Button variant="outlined" size="small" onClick={handlePrint} disabled={!!saveStatus}>
            🖨 Print / Save as PDF
          </Button>
          {onConfirmSave && (
            <Button
              variant="contained" size="small"
              onClick={handleSave} disabled={!!saveStatus}
              sx={{ background: "#3f6f7a", "&:hover": { background: "#2e5560" }, minWidth: 140 }}
            >
              {saveStatus === "saving"    ? "Saving…"
                
                : "Confirm & Save"}
            </Button>
          )}
        </Box>

        {/* ── Hidden measure div ── */}
        <div
          ref={measureRef}
          style={{
            position: "absolute", top: -9999, left: -9999,
            width: PAGE_W - PAGE_PAD_H * 2,
            visibility: "hidden",
            fontFamily: '"Georgia","Times New Roman",serif',
            fontSize: 13,
          }}
        />

        {/* ── A4 page cards ── */}
        <div className="rx-preview-scroll">
          {pages === null ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#3f6f7a" }} />
            </Box>
          ) : (
            pages.map((pageChunks, pageIdx) => (
              <div key={pageIdx} className="rx-page">
                <Header {...hfProps} />
                <div
                  className="rx-body-content"
                  dangerouslySetInnerHTML={{ __html: pageChunks.join("") }}
                />
                <Footer clinic={clinic} doctor={doctor} />
                <div className="rx-page-num">
                  Page {pageIdx + 1} of {pages.length}
                </div>
              </div>
            ))
          )}
        </div>
      </Box>
    </>
  );
}
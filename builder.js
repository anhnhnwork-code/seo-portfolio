/* ═══════════════════════════════════════════════════════════════════════
   builder.js — khuôn dựng trang portfolio.

   File này là NGUỒN DUY NHẤT sinh ra index.html.
   - editor.html  nạp file này để xem trước và tải file về
   - build.js     nạp file này để sinh lại index.html từ dòng lệnh

   Nhờ vậy trang thật và trình soạn không bao giờ lệch nhau.
   Bạn KHÔNG cần sửa file này để đổi nội dung — hãy dùng editor.html.
   ═══════════════════════════════════════════════════════════════════════ */
(function (root) {
'use strict';

/* ── CSS của trang portfolio — giao diện tối, kiểu creative studio ──── */
const CSS = `
:root {
  color-scheme: dark;

  --bg:            #0a0a09;
  --bg-3:          #1b1b19;
  --surface-1:     #131312;   /* nền biểu đồ */

  --text-primary:  #f6f5f1;
  --text-secondary:#a8a69c;
  --text-muted:    #6f6d65;

  --line:          #262523;
  --line-strong:   #3a3936;
  --ring:          rgba(255,255,255,0.10);

  --accent:        #ccff33;
  --accent-ink:    #0a0a09;

  /* Bảng màu chuỗi dữ liệu — thứ tự cố định, đã kiểm định mù màu
     trên đúng nền #131312 (CVD ΔE 9.4 · tương phản ≥ 3:1) */
  --series-1:      #3987e5;
  --series-2:      #d95926;
  --series-3:      #199e70;

  --font: "Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", sans-serif;
  --maxw: 1240px;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  margin: 0; background: var(--bg); color: var(--text-primary);
  font-family: var(--font); font-size: 16px; line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.wrap { max-width: var(--maxw); margin-inline: auto; padding-inline: 28px; }
@media (max-width: 560px) { .wrap { padding-inline: 20px; } }

a { color: inherit; text-decoration: none; }
h1, h2, h3, h4 { margin: 0; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }

/* ── Hiệu ứng xuất hiện khi cuộn ───────────────────────────────────── */
html.js .rv { opacity: 0; transform: translateY(20px); }
html.js .rv.in { opacity: 1; transform: none; transition: opacity .7s cubic-bezier(.2,.7,.3,1), transform .7s cubic-bezier(.2,.7,.3,1); }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  html.js .rv { opacity: 1; transform: none; }
  * { animation: none !important; transition: none !important; }
}

/* ── Thanh điều hướng ──────────────────────────────────────────────── */
.nav {
  position: fixed; inset: 0 0 auto 0; z-index: 50;
  transition: background .3s, border-color .3s, backdrop-filter .3s;
  border-bottom: 1px solid transparent;
}
.nav.stuck {
  background: rgba(10,10,9,.82);
  backdrop-filter: saturate(160%) blur(14px);
  border-bottom-color: var(--line);
}
.nav-inner { display: flex; align-items: center; gap: 30px; height: 72px; }
.nav-brand { font-weight: 800; letter-spacing: -0.03em; font-size: 17px; margin-right: auto; }
.nav-links { display: flex; gap: 30px; list-style: none; margin: 0; padding: 0; }
.nav-links a { color: var(--text-secondary); font-size: 14px; font-weight: 500; position: relative; }
.nav-links a::after {
  content: ''; position: absolute; left: 0; right: 100%; bottom: -5px;
  height: 1px; background: var(--accent); transition: right .28s;
}
.nav-links a:hover { color: var(--text-primary); }
.nav-links a:hover::after { right: 0; }
@media (max-width: 860px) { .nav-links { display: none; } }

/* ── Mở đầu ────────────────────────────────────────────────────────── */
.hero {
  min-height: 100svh; display: flex; align-items: center;
  padding: 128px 0 72px; position: relative;
}
.hero::before {
  content: ''; position: absolute; z-index: -1;
  top: -18%; left: 50%; transform: translateX(-50%);
  width: min(1100px, 130vw); aspect-ratio: 1;
  background: radial-gradient(circle, rgba(204,255,51,.09) 0%, transparent 62%);
  pointer-events: none;
}
.eyebrow {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-secondary); font-weight: 600;
  border: 1px solid var(--line-strong); border-radius: 999px; padding: 7px 16px;
}
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
.dot::after {
  content: ''; display: block; width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent); animation: ping 2s ease-out infinite;
}
@keyframes ping { 0% { transform: scale(1); opacity: .8 } 100% { transform: scale(3.4); opacity: 0 } }

.hero h1 {
  font-size: clamp(3rem, 11vw, 8.5rem); font-weight: 900;
  letter-spacing: -0.045em; line-height: 0.92; margin: 30px 0 0;
}
.hero .role {
  font-size: clamp(1.05rem, 2.3vw, 1.6rem); color: var(--text-secondary);
  font-weight: 500; margin-top: 20px; letter-spacing: -0.01em;
}
.hero .lede { max-width: 60ch; margin-top: 26px; font-size: clamp(15.5px, 1.5vw, 18px); color: var(--text-secondary); }

.cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 38px; }
.btn {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 13px 24px; border-radius: 999px; font-size: 14.5px; font-weight: 600;
  border: 1px solid var(--line-strong); cursor: pointer;
  transition: background .22s, color .22s, border-color .22s, transform .22s;
}
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.btn-primary:hover { background: #dbff5e; border-color: #dbff5e; }
.btn-ghost { color: var(--text-primary); }
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

/* ── Dải chữ chạy ──────────────────────────────────────────────────── */
.marquee { border-block: 1px solid var(--line); overflow: hidden; padding: 20px 0; }
.marquee-track { display: flex; width: max-content; animation: slide 46s linear infinite; }
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee-track span {
  display: inline-flex; align-items: center; gap: 30px; padding-right: 30px;
  font-size: clamp(1rem, 2.1vw, 1.7rem); font-weight: 800;
  letter-spacing: -0.02em; text-transform: uppercase; white-space: nowrap;
}
.marquee-track span::after { content: '✦'; color: var(--accent); font-size: .7em; }
@keyframes slide { to { transform: translateX(-50%); } }

/* ── Chỉ số lớn ────────────────────────────────────────────────────── */
.stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  border-top: 1px solid var(--line);
}
.stat { padding: 40px 28px 44px; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); }
.stat:last-child { border-right: 0; }
.stat .val {
  font-size: clamp(2.6rem, 6vw, 4.4rem); font-weight: 900;
  letter-spacing: -0.05em; line-height: 1; color: var(--accent);
}
.stat .lbl { font-size: 13.5px; color: var(--text-secondary); margin-top: 14px; max-width: 24ch; }

/* ── Khung mục ─────────────────────────────────────────────────────── */
section { padding: clamp(80px, 11vw, 150px) 0; }
.sec-head { margin-bottom: 56px; }
.sec-label {
  display: inline-block; font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent); font-weight: 700; margin-bottom: 20px;
}
.sec-head h2 { font-size: clamp(2rem, 5.2vw, 3.8rem); font-weight: 900; letter-spacing: -0.04em; max-width: 20ch; }
.sec-head p { color: var(--text-secondary); margin: 22px 0 0; font-size: 16.5px; max-width: 62ch; }

/* ── Dự án: danh sách dòng lớn, bấm để mở ──────────────────────────── */
.cases { border-top: 1px solid var(--line); }
.case { border-bottom: 1px solid var(--line); }
.case > summary {
  display: grid; grid-template-columns: 58px 1fr 40px; gap: 22px; align-items: start;
  padding: 32px 0; cursor: pointer; list-style: none;
}
.case > summary::-webkit-details-marker { display: none; }
.case-idx { font-size: 12.5px; color: var(--text-muted); font-variant-numeric: tabular-nums; padding-top: 10px; letter-spacing: .1em; }
.case h3 {
  font-size: clamp(1.3rem, 3.2vw, 2.35rem); font-weight: 800;
  letter-spacing: -0.035em; transition: color .25s;
}
.case > summary:hover h3 { color: var(--accent); }
.case-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.tag {
  font-size: 12px; font-weight: 500; color: var(--text-secondary);
  border: 1px solid var(--line-strong); border-radius: 999px; padding: 4px 12px;
}
.plus {
  width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--line-strong);
  display: grid; place-items: center; margin-top: 6px;
  transition: transform .3s, border-color .25s, background .25s, color .25s;
  font-size: 17px; color: var(--text-secondary); line-height: 1;
}
.case > summary:hover .plus { border-color: var(--accent); color: var(--accent); }
.case[open] > summary .plus { transform: rotate(45deg); background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.case-open { padding: 4px 0 40px 80px; }
@media (max-width: 720px) {
  .case > summary { grid-template-columns: 34px 1fr 34px; gap: 14px; }
  .plus { width: 30px; height: 30px; font-size: 15px; }
  .case-open { padding-left: 0; }
}
.case-meta { font-size: 13.5px; color: var(--text-muted); margin: 0 0 26px; }
.case-body { display: grid; grid-template-columns: 1fr 1fr; gap: 34px; }
@media (max-width: 760px) { .case-body { grid-template-columns: 1fr; gap: 26px; } }
.case-body h4 { font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; font-weight: 700; }
.case-body p { margin: 0; color: var(--text-secondary); font-size: 15.5px; }
.case-body ul { margin: 0; padding: 0; list-style: none; color: var(--text-secondary); font-size: 15.5px; }
.case-body li { padding-left: 20px; position: relative; margin-bottom: 9px; }
.case-body li::before { content: ''; position: absolute; left: 0; top: 11px; width: 7px; height: 1px; background: var(--accent); }

.results {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
  gap: 1px; background: var(--line); border: 1px solid var(--line);
  margin-top: 34px; border-radius: 4px; overflow: hidden;
}
.result { background: var(--bg); padding: 22px 20px; }
.result .val { font-size: clamp(1.6rem, 2.6vw, 2.1rem); font-weight: 900; letter-spacing: -0.04em; color: var(--accent); line-height: 1; }
.result .lbl { font-size: 12.5px; color: var(--text-secondary); margin-top: 10px; }

/* ── Biểu đồ ───────────────────────────────────────────────────────── */
.chart-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
figure.chart { margin: 0; background: var(--surface-1); border: 1px solid var(--line); border-radius: 14px; padding: 30px 30px 22px; }
.chart-title { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.025em; }
.chart-sub { font-size: 13.5px; color: var(--text-secondary); margin-top: 6px; }
.legend { display: flex; flex-wrap: wrap; gap: 20px; margin: 22px 0 12px; }
.legend-item { display: inline-flex; align-items: center; gap: 9px; font-size: 13.5px; color: var(--text-secondary); }
.swatch { width: 11px; height: 11px; border-radius: 3px; flex: none; }
/* Trên màn hình hẹp biểu đồ cuộn ngang thay vì co nhỏ đến mức không đọc được */
.chart-canvas { overflow-x: auto; overscroll-behavior-x: contain; }
.chart-inner { position: relative; min-width: 660px; }
.chart-inner svg { display: block; width: 100%; height: auto; overflow: visible; }

.tooltip {
  position: absolute; pointer-events: none; opacity: 0;
  transform: translate(-50%, -100%);
  background: var(--bg-3); color: var(--text-primary);
  border: 1px solid var(--line-strong); border-radius: 9px;
  padding: 10px 13px; font-size: 13px; line-height: 1.5;
  box-shadow: 0 10px 30px rgba(0,0,0,.5); white-space: nowrap; z-index: 5;
  transition: opacity .09s ease;
}
.tooltip.on { opacity: 1; }
.tooltip.below { transform: translate(-50%, 0); }
.tt-head { font-weight: 700; margin-bottom: 5px; }
.tt-row { display: flex; align-items: center; gap: 8px; }
.tt-row .swatch { width: 9px; height: 9px; }
.tt-val { margin-left: auto; padding-left: 16px; font-variant-numeric: tabular-nums; font-weight: 700; }

.chart-foot { display: flex; align-items: center; gap: 16px; margin-top: 16px; flex-wrap: wrap; }
.link-btn {
  background: none; border: 0; padding: 0; cursor: pointer; font: inherit;
  font-size: 13.5px; font-weight: 600; color: var(--accent);
  text-decoration: underline; text-underline-offset: 4px;
}
.chart-note { font-size: 12.5px; color: var(--text-muted); }
.data-table { width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 13.5px; }
.data-table caption { text-align: left; font-size: 12.5px; color: var(--text-muted); padding-bottom: 10px; }
.data-table th, .data-table td { text-align: right; padding: 8px 11px; border-bottom: 1px solid var(--line); font-variant-numeric: tabular-nums; }
.data-table th:first-child, .data-table td:first-child { text-align: left; }
.data-table thead th { color: var(--text-secondary); font-weight: 700; }
.table-scroll { overflow-x: auto; }

/* ── Năng lực ──────────────────────────────────────────────────────── */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
@media (max-width: 940px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .grid-3 { grid-template-columns: 1fr; } }
.card { background: var(--bg); padding: 36px 30px 38px; transition: background .3s; }
.card:hover { background: var(--surface-1); }
.card h3 { font-size: 1.18rem; font-weight: 800; }
.card p { color: var(--text-secondary); font-size: 15px; margin: 12px 0 0; }
.card ul { margin: 20px 0 0; padding: 0; list-style: none; color: var(--text-secondary); font-size: 14.5px; }
.card li { padding-left: 18px; position: relative; margin-bottom: 7px; }
.card li::before { content: ''; position: absolute; left: 0; top: 10px; width: 6px; height: 1px; background: var(--accent); }
.card-icon { font-size: 24px; margin-bottom: 20px; display: block; }

/* ── Quy trình ─────────────────────────────────────────────────────── */
.steps { border-top: 1px solid var(--line); }
.step {
  display: grid; grid-template-columns: 110px 1fr 1.4fr; gap: 28px;
  padding: 34px 0; border-bottom: 1px solid var(--line); align-items: baseline;
}
@media (max-width: 800px) { .step { grid-template-columns: 60px 1fr; gap: 18px; } .step p { grid-column: 2; } }
.step .n { font-size: clamp(1.4rem, 2.6vw, 2rem); font-weight: 900; color: var(--text-muted); letter-spacing: -0.04em; }
.step h3 { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 800; }
.step p { font-size: 15px; color: var(--text-secondary); margin: 0; }

/* ── Công cụ ───────────────────────────────────────────────────────── */
.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip {
  font-size: 14px; color: var(--text-secondary); border: 1px solid var(--line-strong);
  border-radius: 999px; padding: 9px 18px; transition: color .22s, border-color .22s;
}
.chip:hover { color: var(--accent); border-color: var(--accent); }

/* ── Liên hệ ───────────────────────────────────────────────────────── */
#lien-he { border-top: 1px solid var(--line); }
.contact h2 { font-size: clamp(1.9rem, 5vw, 3.4rem); font-weight: 900; letter-spacing: -0.04em; max-width: 18ch; }
.contact p { color: var(--text-secondary); max-width: 56ch; margin: 24px 0 0; font-size: 16.5px; }
.mailto {
  display: inline-block; margin-top: 44px;
  font-size: clamp(1.4rem, 5.4vw, 3.4rem); font-weight: 900; letter-spacing: -0.045em;
  border-bottom: 2px solid var(--line-strong); padding-bottom: 8px;
  transition: color .25s, border-color .25s; word-break: break-word;
}
.mailto:hover { color: var(--accent); border-color: var(--accent); }

footer { border-top: 1px solid var(--line); padding: 34px 0 52px; font-size: 13.5px; color: var(--text-muted); }
footer .wrap { display: flex; flex-wrap: wrap; gap: 14px; justify-content: space-between; align-items: center; }
.foot-links { display: flex; gap: 20px; }
.foot-links a:hover { color: var(--accent); }

.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
`;

/* ── Mã chạy trên trang: hiệu ứng cuộn, thanh nav ────────────────────
   Viết dưới dạng hàm thật rồi tuần tự hoá bằng toString() khi nhúng,
   nên không phải escape ký tự nào.                                    */
function pageRuntime() {
  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('stuck', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const d = e.target.dataset.delay;
        if (d) e.target.style.transitionDelay = d + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    targets.forEach(t => io.observe(t));
  }
}

/* ── Mã vẽ biểu đồ ──────────────────────────────────────────────────── */
function chartRuntime(GROWTH, RANK) {
  const nf = new Intl.NumberFormat('vi-VN');
  const SVGNS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}) => {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };

  /* Thang đo tự động: chọn bước chia "đẹp" theo dữ liệu thực tế,
     nhờ vậy đổi số liệu trong trình soạn là biểu đồ vẫn cân đối. */
  function niceScale(max, n) {
    if (!(max > 0)) return { max: 1, ticks: [0, 1] };
    const raw = max / (n || 5);
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
    const top = Math.ceil(max / step) * step;
    const ticks = [];
    for (let v = 0; v <= top + step / 1000; v += step) ticks.push(Math.round(v * 1000) / 1000);
    return { max: top, ticks };
  }

  function buildLegend(host, series) {
    if (!host) return;
    host.innerHTML = series.map(s =>
      '<span class="legend-item"><span class="swatch" style="background:' + s.color + '"></span>' + s.name + '</span>'
    ).join('');
  }

  /* Gắn SVG vào khung cuộn ngang; tooltip nằm cùng khung nên toạ độ luôn khớp */
  function mountChart(host, svg) {
    const inner = document.createElement('div');
    inner.className = 'chart-inner';
    inner.appendChild(svg);
    const tip = document.createElement('div');
    tip.className = 'tooltip';
    inner.appendChild(tip);
    host.appendChild(inner);
    return tip;
  }

  /* ── Biểu đồ đường: xu hướng theo thời gian ─────────────────────── */
  function drawGrowth() {
    const host = document.getElementById('growthChart');
    if (!host || !GROWTH.series.length) return;
    buildLegend(document.getElementById('legendGrowth'), GROWTH.series);

    const W = 860, H = 360;
    const padL = 46, padR = 172, padT = 16, padB = 40;
    const plotW = W - padL - padR, plotH = H - padT - padB;

    const flat = GROWTH.series.reduce((a, s) => a.concat(s.values), []);
    const scale = niceScale(Math.max.apply(null, flat), 6);
    const n = GROWTH.labels.length;
    const x = i => n === 1 ? padL + plotW / 2 : padL + (plotW * i) / (n - 1);
    const y = v => padT + plotH - (plotH * v) / scale.max;

    const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': GROWTH.alt });

    scale.ticks.forEach(v => {
      svg.appendChild(el('line', { x1: padL, x2: padL + plotW, y1: y(v), y2: y(v),
        stroke: v === 0 ? 'var(--line-strong)' : 'var(--line)', 'stroke-width': 1 }));
      const t = el('text', { x: padL - 10, y: y(v) + 4, 'text-anchor': 'end',
        fill: 'var(--text-muted)', 'font-size': 11.5 });
      t.setAttribute('style', 'font-variant-numeric:tabular-nums');
      t.textContent = nf.format(v);
      svg.appendChild(t);
    });

    const every = Math.max(1, Math.ceil(n / 8));
    GROWTH.labels.forEach((m, i) => {
      if (i % every !== 0 && i !== n - 1) return;
      const t = el('text', { x: x(i), y: padT + plotH + 22, 'text-anchor': 'middle',
        fill: 'var(--text-muted)', 'font-size': 11.5 });
      t.textContent = m;
      svg.appendChild(t);
    });

    GROWTH.series.forEach(s => {
      const d = s.values.map((v, i) => (i ? 'L' : 'M') + x(i) + ',' + y(v)).join(' ');
      svg.appendChild(el('path', { d: d, fill: 'none', stroke: s.color,
        'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

      const last = s.values[s.values.length - 1];
      svg.appendChild(el('circle', { cx: x(n - 1), cy: y(last), r: 4.5,
        fill: s.color, stroke: 'var(--surface-1)', 'stroke-width': 2 }));

      const lbl = el('text', { x: x(n - 1) + 12, y: y(last) - 3,
        fill: 'var(--text-primary)', 'font-size': 12.5, 'font-weight': 700 });
      lbl.textContent = nf.format(last);
      svg.appendChild(lbl);

      const sub = el('text', { x: x(n - 1) + 12, y: y(last) + 13,
        fill: 'var(--text-secondary)', 'font-size': 11.5 });
      sub.textContent = s.name;
      svg.appendChild(sub);
    });

    const cross = el('line', { x1: 0, x2: 0, y1: padT, y2: padT + plotH,
      stroke: 'var(--line-strong)', 'stroke-width': 1, opacity: 0 });
    svg.appendChild(cross);

    const dots = GROWTH.series.map(s => {
      const c = el('circle', { r: 5, fill: s.color, stroke: 'var(--surface-1)', 'stroke-width': 2, opacity: 0 });
      svg.appendChild(c);
      return c;
    });

    const hit = el('rect', { x: padL, y: padT, width: plotW, height: plotH, fill: 'transparent' });
    svg.appendChild(hit);
    const tip = mountChart(host, svg);

    const show = (evt) => {
      const box = svg.getBoundingClientRect();
      const px = ((evt.clientX - box.left) / box.width) * W;
      let i = n === 1 ? 0 : Math.round(((px - padL) / plotW) * (n - 1));
      i = Math.max(0, Math.min(n - 1, i));

      cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i));
      cross.setAttribute('opacity', 1);
      dots.forEach((c, k) => {
        c.setAttribute('cx', x(i));
        c.setAttribute('cy', y(GROWTH.series[k].values[i]));
        c.setAttribute('opacity', 1);
      });

      tip.innerHTML = '<div class="tt-head">' + GROWTH.labels[i] + '</div>' +
        GROWTH.series.map(s =>
          '<div class="tt-row"><span class="swatch" style="background:' + s.color + '"></span>' +
          s.name + '<span class="tt-val">' + nf.format(s.values[i]) + '</span></div>'
        ).join('');
      tip.classList.add('on', 'below');
      const half = tip.offsetWidth / 2 + 4;
      const lx = Math.max(half, Math.min(box.width - half, (x(i) / W) * box.width));
      tip.style.left = lx + 'px';
      tip.style.top = ((padT + 8) / H * box.height) + 'px';
    };
    const hide = () => {
      tip.classList.remove('on');
      cross.setAttribute('opacity', 0);
      dots.forEach(c => c.setAttribute('opacity', 0));
    };
    hit.addEventListener('mousemove', show);
    hit.addEventListener('mouseleave', hide);

    const tbl = document.getElementById('growthTable');
    if (tbl) tbl.innerHTML =
      '<table class="data-table"><caption>' + GROWTH.tableCaption + '</caption>' +
      '<thead><tr><th scope="col">' + GROWTH.rowHeader + '</th>' +
      GROWTH.labels.map(m => '<th scope="col">' + m + '</th>').join('') + '</tr></thead><tbody>' +
      GROWTH.series.map(s => '<tr><th scope="row">' + s.name + '</th>' +
        s.values.map(v => '<td>' + nf.format(v) + '</td>').join('') + '</tr>').join('') +
      '</tbody></table>';
  }

  /* ── Biểu đồ cột nhóm: so sánh trước / sau ──────────────────────── */
  function drawRank() {
    const host = document.getElementById('rankChart');
    if (!host || !RANK.series.length) return;
    buildLegend(document.getElementById('legendRank'), RANK.series);

    const W = 860, H = 360;
    const padL = 54, padR = 16, padT = 20, padB = 48;
    const plotW = W - padL - padR, plotH = H - padT - padB;

    const flat = RANK.series.reduce((a, s) => a.concat(s.values), []);
    const scale = niceScale(Math.max.apply(null, flat), 4);
    const cats = RANK.categories.length;
    const groupW = plotW / cats;
    const gap = 2;                                   // khe 2px giữa hai cột kề nhau
    const k = RANK.series.length;
    const barW = Math.max(6, (groupW - 34 - gap * (k - 1)) / k);
    const y = v => padT + plotH - (plotH * v) / scale.max;

    const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': RANK.alt });

    scale.ticks.forEach(v => {
      svg.appendChild(el('line', { x1: padL, x2: padL + plotW, y1: y(v), y2: y(v),
        stroke: v === 0 ? 'var(--line-strong)' : 'var(--line)', 'stroke-width': 1 }));
      const t = el('text', { x: padL - 10, y: y(v) + 4, 'text-anchor': 'end',
        fill: 'var(--text-muted)', 'font-size': 11.5 });
      t.setAttribute('style', 'font-variant-numeric:tabular-nums');
      t.textContent = nf.format(v);
      svg.appendChild(t);
    });

    const barPath = (bx, by, bw, bh, r) => {
      const rr = Math.min(r, bh);
      return 'M' + bx + ',' + (by + bh) + ' L' + bx + ',' + (by + rr) +
             ' Q' + bx + ',' + by + ' ' + (bx + rr) + ',' + by +
             ' L' + (bx + bw - rr) + ',' + by +
             ' Q' + (bx + bw) + ',' + by + ' ' + (bx + bw) + ',' + (by + rr) +
             ' L' + (bx + bw) + ',' + (by + bh) + ' Z';
    };

    RANK.categories.forEach((cat, ci) => {
      const gx = padL + groupW * ci + (groupW - (barW * k + gap * (k - 1))) / 2;

      RANK.series.forEach((s, si) => {
        const v = s.values[ci] || 0;
        const bx = gx + si * (barW + gap);
        const by = y(v), bh = padT + plotH - by;

        const p = el('path', { d: barPath(bx, by, barW, bh, 4), fill: s.color });
        svg.appendChild(p);

        p.addEventListener('mouseenter', () => {
          const box = svg.getBoundingClientRect();
          tip.innerHTML = '<div class="tt-head">' + cat + '</div>' +
            '<div class="tt-row"><span class="swatch" style="background:' + s.color + '"></span>' +
            s.name + '<span class="tt-val">' + nf.format(v) + '</span></div>';
          tip.classList.add('on');
          const half = tip.offsetWidth / 2 + 4;
          const lx = Math.max(half, Math.min(box.width - half, ((bx + barW / 2) / W) * box.width));
          tip.style.left = lx + 'px';
          tip.style.top = (by / H * box.height - 8) + 'px';
        });
        p.addEventListener('mouseleave', () => tip.classList.remove('on'));

        const lbl = el('text', { x: bx + barW / 2, y: by - 8, 'text-anchor': 'middle',
          fill: 'var(--text-secondary)', 'font-size': 11.5, 'font-weight': 700 });
        lbl.setAttribute('style', 'font-variant-numeric:tabular-nums');
        lbl.textContent = nf.format(v);
        svg.appendChild(lbl);
      });

      const ct = el('text', { x: padL + groupW * ci + groupW / 2, y: padT + plotH + 24,
        'text-anchor': 'middle', fill: 'var(--text-secondary)', 'font-size': 12 });
      ct.textContent = cat;
      svg.appendChild(ct);
    });

    const tip = mountChart(host, svg);

    const tbl = document.getElementById('rankTable');
    if (tbl) tbl.innerHTML =
      '<table class="data-table"><caption>' + RANK.tableCaption + '</caption>' +
      '<thead><tr><th scope="col">' + RANK.rowHeader + '</th>' +
      RANK.series.map(s => '<th scope="col">' + s.name + '</th>').join('') + '</tr></thead><tbody>' +
      RANK.categories.map((c, i) => '<tr><th scope="row">' + c + '</th>' +
        RANK.series.map(s => '<td>' + nf.format(s.values[i] || 0) + '</td>').join('') + '</tr>').join('') +
      '</tbody></table>';
  }

  document.querySelectorAll('[data-table]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.table);
      const open = target.hasAttribute('hidden');
      target.toggleAttribute('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Ẩn bảng dữ liệu' : 'Xem dạng bảng';
    });
  });

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  drawGrowth();
  drawRank();
}

/* ── Tiện ích ─────────────────────────────────────────────────────── */
const SERIES_VARS = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'];

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
const lines = t => String(t || '').split('\n').map(s => s.trim()).filter(Boolean);
const jsonSafe = o => JSON.stringify(o).replace(/</g, '\\u003c');

/* ── Dựng trang ───────────────────────────────────────────────────── */
function buildHTML(d) {
  const m = d.meta, url = m.url.replace(/\/?$/, '/');

  const pickSeries = arr => arr.slice(0, 3).map((s, i) => ({
    name: s.name, color: SERIES_VARS[i], values: s.values
  }));
  const growth = {
    labels: d.charts.growth.labels, alt: d.charts.growth.alt,
    tableCaption: d.charts.growth.tableCaption, rowHeader: d.charts.growth.rowHeader,
    series: pickSeries(d.charts.growth.series)
  };
  const rank = {
    categories: d.charts.rank.categories, alt: d.charts.rank.alt,
    tableCaption: d.charts.rank.tableCaption, rowHeader: d.charts.rank.rowHeader,
    series: pickSeries(d.charts.rank.series)
  };

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage', '@id': url + '#page', url: url,
        name: m.title, inLanguage: 'vi-VN',
        mainEntity: { '@id': url + '#person' }
      },
      {
        '@type': 'Person', '@id': url + '#person',
        name: m.name, jobTitle: m.role, email: 'mailto:' + m.email, url: url,
        description: m.description,
        knowsAbout: lines(d.knowsAbout),
        worksFor: m.orgName ? { '@type': 'Organization', name: m.orgName, url: m.orgUrl } : undefined,
        sameAs: lines(d.sameAs)
      }
    ]
  };

  const statHTML = d.hero.stats.map((s, i) =>
    '      <div class="stat rv" data-delay="' + (i * 70) + '"><div class="val">' + esc(s.val) +
    '</div><div class="lbl">' + esc(s.lbl) + '</div></div>'
  ).join('\n');

  /* Dải chữ chạy: lặp danh sách hai lần để vòng lặp liền mạch */
  const kw = lines(d.knowsAbout);
  const marqueeRun = kw.map(k => '<span>' + esc(k) + '</span>').join('');

  const caseHTML = d.cases.map((c, i) =>
`      <details class="case rv" name="case">
        <summary>
          <span class="case-idx">${String(i + 1).padStart(2, '0')}</span>
          <span>
            <h3>${esc(c.title)}</h3>
            <span class="case-tags">${lines(c.tags).map(t => '<span class="tag">' + esc(t) + '</span>').join('')}</span>
          </span>
          <span class="plus" aria-hidden="true">+</span>
        </summary>
        <div class="case-open">
          <p class="case-meta">${esc(c.meta)}</p>
          <div class="case-body">
            <div>
              <h4>Bối cảnh</h4>
              <p>${esc(c.context)}</p>
            </div>
            <div>
              <h4>Việc đã làm</h4>
              <ul>
${lines(c.actions).map(a => '                <li>' + esc(a) + '</li>').join('\n')}
              </ul>
            </div>
          </div>
          <div class="results">
${c.results.map(r => '            <div class="result"><div class="val">' + esc(r.val) + '</div><div class="lbl">' + esc(r.lbl) + '</div></div>').join('\n')}
          </div>
        </div>
      </details>`
  ).join('\n\n');

  const skillHTML = d.skills.map((s, i) =>
`      <article class="card rv" data-delay="${(i % 3) * 80}">
        <span class="card-icon" aria-hidden="true">${esc(s.icon)}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
        <ul>
${lines(s.items).map(x => '          <li>' + esc(x) + '</li>').join('\n')}
        </ul>
      </article>`
  ).join('\n\n');

  const stepHTML = d.process.map((s, i) =>
`      <div class="step rv">
        <div class="n">${String(i + 1).padStart(2, '0')}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
      </div>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Trang này được sinh tự động từ editor.html — đừng sửa tay, hãy sửa trong trình soạn. -->

<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="${esc(m.name)}">
<meta name="theme-color" content="#0a0a09">

<meta property="og:type" content="profile">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="${esc(m.name)} — ${esc(m.role)}">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.ogDescription || m.description)}">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(m.name)} — ${esc(m.role)}">
<meta name="twitter:description" content="${esc(m.ogDescription || m.description)}">

<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${esc(m.favicon || '📈')}</text></svg>">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;800;900&display=swap" rel="stylesheet">

<!-- Dữ liệu có cấu trúc: giúp Google hiểu bạn là một thực thể (entity) -->
<script type="application/ld+json">
${jsonSafe(ld)}
</script>

<script>document.documentElement.classList.add('js');</script>
<style>${CSS}</style>
</head>

<body>

<a href="#main" class="visually-hidden">Bỏ qua điều hướng</a>

<nav class="nav" aria-label="Điều hướng chính">
  <div class="wrap nav-inner">
    <span class="nav-brand">${esc(m.name)}</span>
    <ul class="nav-links">
      <li><a href="#case-studies">${esc(d.sections.cases.nav)}</a></li>
      <li><a href="#ket-qua">${esc(d.sections.charts.nav)}</a></li>
      <li><a href="#nang-luc">${esc(d.sections.skills.nav)}</a></li>
      <li><a href="#quy-trinh">${esc(d.sections.process.nav)}</a></li>
      <li><a href="#lien-he">${esc(d.sections.contact.nav)}</a></li>
    </ul>
  </div>
</nav>

<main id="main">

<header class="hero">
  <div class="wrap">
    <span class="eyebrow rv"><span class="dot" aria-hidden="true"></span> ${esc(d.hero.badge)}</span>
    <h1 class="rv" data-delay="60">${esc(m.name)}</h1>
    <p class="role rv" data-delay="120">${esc(d.hero.role)}</p>
    <p class="lede rv" data-delay="180">${esc(d.hero.lede)}</p>
    <div class="cta-row rv" data-delay="240">
      <a class="btn btn-primary" href="#case-studies">${esc(d.hero.cta1)}</a>
      <a class="btn btn-ghost" href="#lien-he">${esc(d.hero.cta2)}</a>
    </div>
  </div>
</header>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">${marqueeRun}${marqueeRun}</div>
</div>

<section class="stats-sec" style="padding:0">
  <div class="stats">
${statHTML}
  </div>
</section>

<section id="case-studies">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">${esc(d.sections.cases.label)}</div>
      <h2>${esc(d.sections.cases.title)}</h2>
      <p>${esc(d.sections.cases.desc)}</p>
    </div>

    <div class="cases">

${caseHTML}

    </div>
  </div>
</section>

<section id="ket-qua">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">${esc(d.sections.charts.label)}</div>
      <h2>${esc(d.sections.charts.title)}</h2>
      <p>${esc(d.sections.charts.desc)}</p>
    </div>

    <div class="chart-grid">

      <figure class="chart rv">
        <figcaption>
          <div class="chart-title">${esc(d.charts.growth.title)}</div>
          <div class="chart-sub">${esc(d.charts.growth.sub)}</div>
        </figcaption>
        <div class="legend" id="legendGrowth"></div>
        <div class="chart-canvas" id="growthChart"></div>
        <div class="chart-foot">
          <button class="link-btn" type="button" data-table="growthTable" aria-expanded="false">Xem dạng bảng</button>
          <span class="chart-note">Di chuột lên biểu đồ để xem số liệu từng mốc.</span>
        </div>
        <div class="table-scroll" id="growthTable" hidden></div>
      </figure>

      <figure class="chart rv">
        <figcaption>
          <div class="chart-title">${esc(d.charts.rank.title)}</div>
          <div class="chart-sub">${esc(d.charts.rank.sub)}</div>
        </figcaption>
        <div class="legend" id="legendRank"></div>
        <div class="chart-canvas" id="rankChart"></div>
        <div class="chart-foot">
          <button class="link-btn" type="button" data-table="rankTable" aria-expanded="false">Xem dạng bảng</button>
          <span class="chart-note">Di chuột lên từng cột để xem số liệu.</span>
        </div>
        <div class="table-scroll" id="rankTable" hidden></div>
      </figure>

    </div>
  </div>
</section>

<section id="nang-luc">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">${esc(d.sections.skills.label)}</div>
      <h2>${esc(d.sections.skills.title)}</h2>
    </div>

    <div class="grid-3">

${skillHTML}

    </div>
  </div>
</section>

<section id="quy-trinh">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">${esc(d.sections.process.label)}</div>
      <h2>${esc(d.sections.process.title)}</h2>
    </div>

    <div class="steps">
${stepHTML}
    </div>
  </div>
</section>

<section id="cong-cu">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">${esc(d.sections.tools.label)}</div>
      <h2>${esc(d.sections.tools.title)}</h2>
    </div>
    <div class="chips rv">
${lines(d.tools).map(t => '      <span class="chip">' + esc(t) + '</span>').join('\n')}
    </div>
  </div>
</section>

<section id="lien-he">
  <div class="wrap contact">
    <h2 class="rv">${esc(d.contact.heading)}</h2>
    <p class="rv" data-delay="80">${esc(d.contact.text)}</p>
    <a class="mailto rv" data-delay="140" href="mailto:${esc(m.email)}">${esc(m.email)}</a>
    <div class="cta-row rv" data-delay="200">
${lines(d.contact.links).map(l => {
  const parts = l.split('|');
  const label = (parts[0] || '').trim();
  const href = (parts[1] || '').trim();
  return '      <a class="btn btn-ghost" href="' + esc(href) + '" rel="noopener">' + esc(label) + '</a>';
}).join('\n')}
    </div>
  </div>
</section>

</main>

<footer>
  <div class="wrap">
    <span>© <span id="year">2026</span> ${esc(m.name)} · ${esc(m.role)}</span>
    <span class="foot-links">
      <a href="#main">Lên đầu trang</a>
    </span>
    <span>${esc(d.footerNote)}</span>
  </div>
</footer>

<script>
const GROWTH = ${jsonSafe(growth)};
const RANK = ${jsonSafe(rank)};
(${chartRuntime.toString()})(GROWTH, RANK);
(${pageRuntime.toString()})();
</script>

</body>
</html>
`;
}

/* ── Nội dung mặc định ────────────────────────────────────────────── */
const DEFAULT = {
  meta: {
    name: 'Nguyễn Anh',
    role: 'Senior SEO Specialist',
    title: 'Nguyễn Anh — Senior SEO Specialist | Portfolio dự án SEO',
    description: 'Portfolio của Nguyễn Anh — Senior SEO Specialist với 8+ năm kinh nghiệm. 24 dự án SEO cho E-commerce, Fintech, Y tế, SaaS: tăng trưởng traffic organic, khôi phục sau Core Update, Local SEO đa chi nhánh và GEO/AI Search.',
    ogDescription: '8+ năm, 24 dự án. Traffic organic trung bình +412%. Chuyên Technical SEO, E-E-A-T cho YMYL, Local SEO đa chi nhánh và GEO/AI Search.',
    url: 'https://anhnhnwork-code.github.io/seo-portfolio/',
    email: 'kythuatseo@seongon.com',
    favicon: '📈',
    orgName: 'SEONGON',
    orgUrl: 'https://seongon.com/'
  },
  knowsAbout: 'Technical SEO\nSemantic SEO\nE-E-A-T\nLocal SEO\nSEO Analytics\nGenerative Engine Optimization\nCore Web Vitals\nProgrammatic SEO\nEntity SEO',
  sameAs: 'https://github.com/anhnhnwork-code',
  hero: {
    badge: 'Đang nhận dự án tư vấn',
    role: 'Senior SEO Specialist · 8+ năm triển khai SEO tăng trưởng',
    lede: 'Tôi xây hệ thống SEO cho những website phức tạp — thương mại điện tử hàng chục nghìn URL, ngành YMYL bị siết E-E-A-T, chuỗi thương hiệu đa chi nhánh. Cách làm của tôi bắt đầu từ dữ liệu và kiến trúc, không bắt đầu từ danh sách từ khóa: hiểu Google đang đọc website như thế nào, sửa cái đang chặn, rồi mới mở rộng nội dung.',
    cta1: 'Xem 6 dự án tiêu biểu',
    cta2: 'Liên hệ hợp tác',
    stats: [
      { val: '8+', lbl: 'Năm kinh nghiệm SEO' },
      { val: '24', lbl: 'Dự án đã triển khai' },
      { val: '+412%', lbl: 'Traffic organic trung bình sau 12 tháng' },
      { val: '3.860', lbl: 'Từ khóa đưa lên top 10' }
    ]
  },
  sections: {
    cases: {
      nav: 'Dự án', label: 'Dự án tiêu biểu',
      title: 'Sáu bài toán SEO khác nhau, sáu cách giải khác nhau',
      desc: 'Mỗi dự án dưới đây được mô tả theo cùng một cấu trúc: bối cảnh khi tiếp nhận, việc đã làm, và kết quả đo được. Số liệu lấy từ Google Search Console và GA4 tại thời điểm kết thúc giai đoạn. Bấm vào từng dòng để mở chi tiết.'
    },
    charts: {
      nav: 'Kết quả', label: 'Kết quả đo được',
      title: 'Tăng trưởng nhìn theo thời gian, không nhìn theo ảnh chụp màn hình',
      desc: 'Hai biểu đồ dưới đây lấy từ ba dự án dài hạn. Traffic được quy về chỉ số gốc 100 ở tháng bắt đầu để so sánh được giữa các website có quy mô rất khác nhau.'
    },
    skills: { nav: 'Năng lực', label: 'Năng lực chuyên môn', title: 'Sáu mảng tôi làm trực tiếp, không chỉ điều phối' },
    process: { nav: 'Quy trình', label: 'Cách tôi làm việc', title: 'Năm giai đoạn, kết thúc mỗi giai đoạn đều có thứ bàn giao được' },
    tools: { nav: 'Công cụ', label: 'Bộ công cụ', title: 'Công cụ dùng hằng ngày' },
    contact: { nav: 'Liên hệ' }
  },
  cases: [
    {
      tags: 'E-commerce\nNội thất cao cấp\n14 tháng',
      title: 'Tái cấu trúc website 12.000 URL và mở khoá tăng trưởng sau 18 tháng đi ngang',
      meta: 'Vai trò: SEO Lead · Đội ngũ: 1 dev, 2 content, 1 SEO executive',
      context: 'Website có 12.000 URL nhưng chỉ 32% được Google index như trang hữu ích. Danh mục và bộ lọc sinh ra hàng nghìn URL trùng nội dung, cannibalization xảy ra ở hầu hết cụm sản phẩm chính. Traffic organic đi ngang suốt 18 tháng dù vẫn xuất bản đều.',
      actions: 'Thiết kế lại taxonomy danh mục, gộp 340 trang trùng lặp về trang chuẩn\nXử lý index bloat: chặn URL bộ lọc bằng robots + canonical, dọn 4.100 URL rác\nXây entity hub theo cụm chủ đề, nối internal link theo mô hình pillar–cluster\nTối ưu Core Web Vitals: LCP từ 4,1s xuống 1,8s (lazy-load, ảnh WebP, critical CSS)',
      results: [
        { val: '+520%', lbl: 'Traffic organic' },
        { val: '386', lbl: 'Từ khóa top 3 (từ 42)' },
        { val: '+310%', lbl: 'Doanh thu từ organic' },
        { val: '91%', lbl: 'Tỷ lệ index hữu ích (từ 32%)' }
      ]
    },
    {
      tags: 'Fintech\nYMYL\n12 tháng',
      title: 'Khôi phục và vượt đỉnh sau Helpful Content Update trong ngành vay tiêu dùng',
      meta: 'Vai trò: SEO Consultant · Trọng tâm: E-E-A-T và chất lượng nội dung',
      context: 'Mất 47% traffic organic sau Helpful Content Update. Ngành tài chính thuộc nhóm YMYL nên tín hiệu chuyên môn yếu là điểm chết: nội dung không ghi tác giả, không trích nguồn, 240 bài viết mỏng chỉ diễn giải lại nhau.',
      actions: 'Xây hệ thống tác giả có hồ sơ chuyên môn thật, gắn schema Person và liên kết thực thể\nChuẩn hoá trích dẫn nguồn cấp 1: văn bản NHNN, thông tư, báo cáo ngành\nAudit và viết lại 240 bài mỏng; gộp 86 bài trùng chủ đề\nBổ sung schema Organization, FAQ, quy trình kiểm duyệt nội dung hiển thị công khai',
      results: [
        { val: '5 tháng', lbl: 'Phục hồi 100% traffic đã mất' },
        { val: '+280%', lbl: 'So với đỉnh trước update' },
        { val: '1.240', lbl: 'Từ khóa top 10' },
        { val: '−44%', lbl: 'Chi phí mỗi lead (CPL)' }
      ]
    },
    {
      tags: 'Y tế\nLocal SEO\n9 tháng',
      title: 'Local SEO cho chuỗi 18 phòng khám: từ NAP hỗn loạn đến top 3 Local Pack',
      meta: 'Vai trò: SEO Lead · Phạm vi: 18 chi nhánh tại 6 tỉnh thành',
      context: 'Mười tám hồ sơ Google Business Profile do các chi nhánh tự quản lý, thông tin NAP không đồng nhất, nhiều hồ sơ trùng. Website không có trang đích theo khu vực nên toàn bộ truy vấn dịch vụ kèm địa danh rơi vào tay đối thủ.',
      actions: 'Chuẩn hoá NAP toàn hệ thống, gộp hồ sơ trùng, thống nhất danh mục dịch vụ trên GBP\nXây 18 landing page theo địa bàn với nội dung riêng, gắn schema MedicalClinic\nThiết lập quy trình thu thập đánh giá và phản hồi trong 24 giờ\nTối ưu bài đăng GBP định kỳ, ảnh thực tế và mục hỏi đáp cho từng chi nhánh',
      results: [
        { val: '+410%', lbl: 'Cuộc gọi từ Google Business Profile' },
        { val: '84/96', lbl: 'Từ khóa vào top 3 Local Pack' },
        { val: '+365%', lbl: 'Traffic organic' },
        { val: '+228%', lbl: 'Lượt đặt lịch online' }
      ]
    },
    {
      tags: 'SaaS B2B\nProgrammatic SEO\n16 tháng',
      title: 'Programmatic SEO đưa một SaaS Việt ra thị trường Đông Nam Á',
      meta: 'Vai trò: Head of SEO · Ngôn ngữ: tiếng Việt và tiếng Anh',
      context: 'Sản phẩm muốn mở rộng ra khu vực nhưng toàn bộ nội dung chỉ có tiếng Việt, không có cấu trúc đa ngôn ngữ. Nội dung tập trung ở giai đoạn nhận biết, thiếu hẳn các truy vấn cuối phễu nơi người dùng đã sẵn sàng chọn công cụ.',
      actions: 'Thiết lập cấu trúc đa ngôn ngữ với hreflang, tách sitemap theo thị trường\nXây 1.200 trang programmatic dạng so sánh và thay thế công cụ, có kiểm duyệt chất lượng\nBổ sung nội dung cuối phễu: bảng giá, tích hợp, use case theo ngành\nChiến dịch digital PR thu về 68 backlink từ tên miền DR 50+',
      results: [
        { val: '+740%', lbl: 'Traffic organic' },
        { val: '+196%', lbl: 'MQL đến từ organic' },
        { val: '21 → 54', lbl: 'Domain Rating' },
        { val: '38%', lbl: 'Tổng traffic đến từ trang programmatic' }
      ]
    },
    {
      tags: 'Bất động sản\nCore Update\n7 tháng',
      title: 'Cắt bỏ 410 bài viết để cứu một website bất động sản sau Core Update',
      meta: 'Vai trò: SEO Consultant · Trọng tâm: content pruning và cannibalization',
      context: 'Mất 62% lượt hiển thị sau Core Update tháng 3. Nguyên nhân chính: gần 900 bài sản xuất hàng loạt bằng AI, không kiểm chứng số liệu thị trường, 94 cụm từ khóa bị nhiều bài cùng cạnh tranh.',
      actions: 'Audit toàn bộ 890 bài theo hiệu suất và giá trị thông tin thực tế\nXoá và gộp 410 bài giá trị thấp, chuyển hướng 301 về trang chuẩn\nViết lại 180 bài cốt lõi bằng dữ liệu giao dịch và quy hoạch có nguồn\nGiải quyết cannibalization ở 94 cụm từ khóa, phân vai rõ cho từng URL',
      results: [
        { val: '118%', lbl: 'Hiển thị so với trước update' },
        { val: '+145%', lbl: 'Traffic organic' },
        { val: '+82%', lbl: 'Thời gian trên trang' },
        { val: '−31%', lbl: 'Tỷ lệ thoát' }
      ]
    },
    {
      tags: 'Giáo dục\nGEO / AI Search\n6 tháng',
      title: 'Tối ưu hiện diện trong AI Overview và các công cụ tìm kiếm AI',
      meta: 'Vai trò: SEO Strategist · Trọng tâm: entity và định dạng trích dẫn',
      context: 'Traffic giảm dần dù thứ hạng giữ nguyên: AI Overview trả lời trực tiếp nên người dùng không còn nhấp vào kết quả. Thương hiệu hoàn toàn vắng mặt trong câu trả lời của ChatGPT và Perplexity cho các truy vấn thuộc lĩnh vực của mình.',
      actions: 'Cấu trúc lại nội dung theo dạng trả lời trước, giải thích sau để dễ được trích dẫn\nXây thực thể thương hiệu trên Wikidata và củng cố tín hiệu Knowledge Graph\nChuẩn hoá schema chi tiết cho khoá học, giảng viên, đánh giá\nTheo dõi tần suất được trích dẫn trong AI Overview bằng script tự viết',
      results: [
        { val: '156', lbl: 'Lượt được trích dẫn trong AI Overview' },
        { val: '+890%', lbl: 'Traffic giới thiệu từ công cụ AI' },
        { val: '+67%', lbl: 'Lượt tìm kiếm thương hiệu' },
        { val: '4/6', lbl: 'Chủ đề có mặt trong câu trả lời AI' }
      ]
    }
  ],
  charts: {
    growth: {
      title: 'Tăng trưởng traffic organic theo tháng',
      sub: 'Chỉ số hoá, tháng 0 = 100. Ba dự án dài hạn, dữ liệu Google Search Console.',
      alt: 'Biểu đồ đường thể hiện chỉ số traffic organic của ba dự án qua 12 tháng, tất cả đều tăng từ mốc 100.',
      tableCaption: 'Chỉ số traffic organic theo tháng (tháng 0 = 100)',
      rowHeader: 'Dự án',
      labels: ['T0','T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
      series: [
        { name: 'E-commerce nội thất', values: [100,108,121,140,172,214,265,318,372,430,488,556,620] },
        { name: 'Fintech (YMYL)',      values: [100, 96,104,128,158,190,226,258,292,318,342,362,380] },
        { name: 'Chuỗi phòng khám',    values: [100,112,128,152,186,224,268,310,348,384,414,442,465] }
      ]
    },
    rank: {
      title: 'Phân bố thứ hạng từ khóa trước và sau 12 tháng',
      sub: 'Dự án E-commerce nội thất — 2.091 từ khóa theo dõi.',
      alt: 'Biểu đồ cột so sánh số lượng từ khóa theo nhóm thứ hạng trước và sau 12 tháng triển khai.',
      tableCaption: 'Số lượng từ khóa theo nhóm thứ hạng',
      rowHeader: 'Nhóm thứ hạng',
      categories: ['Top 1–3','Top 4–10','Top 11–20','Top 21–50','Ngoài top 50'],
      series: [
        { name: 'Trước triển khai', values: [ 42, 118, 205, 486, 1240] },
        { name: 'Sau 12 tháng',     values: [386, 854, 611, 402,  168] }
      ]
    }
  },
  skills: [
    { icon: '⚙️', title: 'Technical SEO', desc: 'Xử lý những thứ chặn Google trước khi nghĩ đến nội dung.',
      items: 'Crawl budget, index bloat, log file analysis\nJavaScript rendering, hydration, SSR/ISR\nCore Web Vitals và tối ưu hiệu năng\nMigration website không mất traffic' },
    { icon: '🧠', title: 'Semantic & Entity SEO', desc: 'Xây kiến trúc chủ đề để website được hiểu như một thực thể có thẩm quyền.',
      items: 'Topic cluster và internal link theo ngữ nghĩa\nSchema markup nâng cao, Knowledge Graph\nPhân tích khoảng trống nội dung so với đối thủ' },
    { icon: '🛡️', title: 'E-E-A-T cho ngành YMYL', desc: 'Chuẩn hoá tín hiệu chuyên môn cho tài chính, y tế, pháp lý.',
      items: 'Hệ thống tác giả và quy trình kiểm duyệt\nTrích dẫn nguồn cấp 1, minh bạch dữ liệu\nPhục hồi sau Core Update và Helpful Content Update' },
    { icon: '📍', title: 'Local SEO đa chi nhánh', desc: 'Chuẩn hoá hiện diện địa phương cho chuỗi và hệ thống nhượng quyền.',
      items: 'Quản trị Google Business Profile ở quy mô lớn\nLanding page theo địa bàn, schema địa điểm\nChiến lược đánh giá và tín hiệu địa phương' },
    { icon: '📊', title: 'SEO Analytics & tự động hoá', desc: 'Đo được thì mới cải thiện được — và không đo bằng tay.',
      items: 'GA4, BigQuery, Looker Studio\nScript Python cho crawl, phân cụm từ khóa, theo dõi thứ hạng\nMô hình dự báo traffic và ưu tiên hạng mục theo tác động' },
    { icon: '✨', title: 'GEO — tối ưu cho tìm kiếm AI', desc: 'Giữ hiện diện khi câu trả lời không còn nằm ở trang kết quả.',
      items: 'Định dạng nội dung dễ được trích dẫn\nXây thực thể thương hiệu và tín hiệu nguồn tin cậy\nTheo dõi hiện diện trong AI Overview, ChatGPT, Perplexity' }
  ],
  process: [
    { title: 'Audit & đo lường', desc: 'Crawl toàn site, đọc log file, dựng lại hệ đo lường. Kết thúc bằng danh sách vấn đề đã xếp theo mức tác động.' },
    { title: 'Chiến lược & kiến trúc', desc: 'Bản đồ chủ đề, cấu trúc URL, phân vai từng trang. Chốt chỉ số mục tiêu và mốc thời gian trước khi triển khai.' },
    { title: 'Triển khai kỹ thuật', desc: 'Làm việc trực tiếp với đội dev: ticket cụ thể, tiêu chí nghiệm thu rõ, kiểm tra lại sau khi lên production.' },
    { title: 'Nội dung & thực thể', desc: 'Brief chi tiết cho người viết, chuẩn E-E-A-T, schema và internal link gắn ngay khi xuất bản.' },
    { title: 'Đo lường & mở rộng', desc: 'Báo cáo hai tuần một lần theo chỉ số kinh doanh, không chỉ thứ hạng. Nhân rộng những gì đã chứng minh hiệu quả.' }
  ],
  tools: 'Screaming Frog\nSitebulb\nAhrefs\nSemrush\nGoogle Search Console\nGA4\nGoogle Tag Manager\nBigQuery\nLooker Studio\nPython (pandas, Scrapy)\nPageSpeed Insights\nSchema.org / JSON-LD\nClaude API\nGoogle Business Profile',
  contact: {
    heading: 'Cần một người nhìn ra vấn đề trước khi nó ăn mất traffic?',
    text: 'Tôi nhận tư vấn audit, triển khai dài hạn và đào tạo đội in-house. Gửi cho tôi tên miền và bài toán bạn đang gặp — tôi sẽ phản hồi trong 24 giờ.',
    links: 'GitHub | https://github.com/anhnhnwork-code'
  },
  footerNote: 'Số liệu theo Google Search Console & GA4'
};

const API = { CSS, buildHTML, DEFAULT, esc, lines };
if (typeof module !== 'undefined' && module.exports) module.exports = API;
else root.PortfolioBuilder = API;

})(typeof globalThis !== 'undefined' ? globalThis : this);

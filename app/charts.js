// Grafik SVG NusaData, digambar langsung dari angka — tanpa pustaka luar.
//
// Tiga pembuat di sini: kolom (untuk deret tahunan), garis (untuk deret
// bulanan atau triwulanan), dan batang mendatar (untuk pangsa). Masing-masing
// mengembalikan potongan SVG atau HTML yang bisa disisipkan ke halaman.
// Setiap nilai juga muncul sebagai teks di dalam grafik, dan tiap elemen
// membawa <title> supaya pembaca layar tetap mendapat angkanya. Tabel
// pendamping di halaman yang sama memuat angka yang sama persis.

// Bulatkan batas atas sumbu ke angka yang enak dibaca.
function roundUp(top) {
  if (top <= 0) return 5;
  const step = top <= 10 ? 1 : top <= 50 ? 5 : top <= 200 ? 10 : 50;
  return Math.ceil(top / step) * step;
}

// Bulatkan batas bawah sumbu ke angka yang enak dibaca.
function roundDown(bottom) {
  if (bottom >= 0) return 0;
  const step = bottom >= -10 ? 1 : 5;
  return Math.floor(bottom / step) * step;
}

// Tulis angka dengan koma desimal ala Indonesia.
function idNum(value) {
  return String(Math.round(value * 100) / 100).replace('.', ',');
}

// Garis-garis grid mendatar beserta label nilainya.
function gridLines(padLeft, padTop, plotW, plotH, low, span, width) {
  return [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const v = low + f * span;
    const y = padTop + ((1 - f) * plotH);
    return `<line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${padLeft + plotW}" y2="${y.toFixed(1)}" stroke="#dde5ec" stroke-width="1"/>`
      + `<text x="${padLeft - 7}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#68798a">${idNum(v)}</text>`;
  }).join('');
}

// Grafik kolom. points: [{ label, value }].
export function columnChart(points, opts = {}) {
  const width = 640;
  const height = opts.height ?? 260;
  const left = 46;
  const right = 14;
  const topPad = 28;
  const bottomPad = 32;
  const vals = points.map((p) => p.value);
  const high = roundUp(Math.max(...vals, 0.1));
  const low = roundDown(Math.min(...vals, 0));
  const span = high - low;
  const plotW = width - left - right;
  const plotH = height - topPad - bottomPad;
  const zeroY = topPad + ((high - 0) / span) * plotH;
  const slot = plotW / points.length;
  const colW = Math.min(44, slot * 0.6);
  const up = opts.color ?? '#0f766e';
  const down = opts.negativeColor ?? '#b91c1c';

  let columns = '';
  points.forEach((p, i) => {
    const x = left + i * slot + (slot - colW) / 2;
    const isNeg = p.value < 0;
    const y = isNeg ? zeroY : topPad + ((high - p.value) / span) * plotH;
    const h = (Math.abs(p.value) / span) * plotH;
    columns += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${colW.toFixed(1)}" height="${Math.max(h, 1).toFixed(1)}" rx="3" fill="${isNeg ? down : up}"><title>${p.label}: ${idNum(p.value)}</title></rect>`;
    columns += `<text x="${(x + colW / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="12" fill="#17222e">${idNum(p.value)}</text>`;
    columns += `<text x="${(x + colW / 2).toFixed(1)}" y="${(height - 11).toFixed(1)}" text-anchor="middle" font-size="12" fill="#4c5d6d">${p.label}</text>`;
  });

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik kolom" xmlns="http://www.w3.org/2000/svg">`
    + gridLines(left, topPad, plotW, plotH, low, span, width)
    + `<line x1="${left}" y1="${zeroY.toFixed(1)}" x2="${width - right}" y2="${zeroY.toFixed(1)}" stroke="#94a3b8" stroke-width="1"/>`
    + columns + `</svg>`;
}

// Grafik garis. points: [{ label, value }].
export function trendChart(points, opts = {}) {
  const width = 640;
  const height = opts.height ?? 260;
  const left = 46;
  const right = 18;
  const topPad = 28;
  const bottomPad = 32;
  const vals = points.map((p) => p.value);
  const high = roundUp(Math.max(...vals));
  const low = roundDown(Math.min(...vals));
  const span = high - low || 1;
  const plotW = width - left - right;
  const plotH = height - topPad - bottomPad;
  const color = opts.color ?? '#0f766e';

  const xy = points.map((p, i) => ({
    x: left + (i / Math.max(points.length - 1, 1)) * plotW,
    y: topPad + ((high - p.value) / span) * plotH,
    p,
  }));
  const path = xy.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
  const fill = opts.area === false ? '' : `<path d="${path} L${xy[xy.length - 1].x.toFixed(1)},${(topPad + plotH).toFixed(1)} L${xy[0].x.toFixed(1)},${(topPad + plotH).toFixed(1)} Z" fill="${color}" opacity="0.08"/>`;
  const dots = xy.map((pt) => `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4" fill="#ffffff" stroke="${color}" stroke-width="2"><title>${pt.p.label}: ${idNum(pt.p.value)}</title></circle>`).join('');
  const values = xy.map((pt) => `<text x="${pt.x.toFixed(1)}" y="${(pt.y - 11).toFixed(1)}" text-anchor="middle" font-size="12" fill="#17222e">${idNum(pt.p.value)}</text>`).join('');
  const labels = xy.map((pt, i) => {
    const anchor = i === 0 ? 'start' : i === xy.length - 1 ? 'end' : 'middle';
    return `<text x="${pt.x.toFixed(1)}" y="${(height - 11).toFixed(1)}" text-anchor="${anchor}" font-size="12" fill="#4c5d6d">${pt.p.label}</text>`;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik garis" xmlns="http://www.w3.org/2000/svg">`
    + gridLines(left, topPad, plotW, plotH, low, span, width)
    + fill
    + `<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`
    + dots + values + labels + `</svg>`;
}

// Batang mendatar untuk pangsa (misalnya pangsa sektor terhadap PDB).
// rows: [{ name, share }]. Mengembalikan HTML.
export function shareBars(rows, opts = {}) {
  const color = opts.color ?? '#0f766e';
  const biggest = Math.max(...rows.map((r) => r.share));
  return rows.map((r) => {
    const pct = ((r.share / biggest) * 100).toFixed(1);
    return `<div class="share"><div class="share-row"><span>${r.name}</span><strong>${idNum(r.share)}%</strong></div>`
      + `<div class="share-track"><div class="share-fill" style="width:${pct}%;background:${color}"></div></div></div>`;
  }).join('');
}

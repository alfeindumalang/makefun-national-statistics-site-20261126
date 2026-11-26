// Halaman-halaman NusaData.
//
// Tiap rute hash (#/, #/ekonomi, dan seterusnya) punya satu fungsi yang
// mengembalikan HTML untuk rute itu. Angka datang dari data.js, grafik
// dari charts.js. Semua tautan menunjuk ke rute di dalam situs ini sendiri;
// tidak ada halaman yang mengambil apa pun dari luar.

import {
  META, HEADLINE_CARDS, GROWTH_YEARLY, GROWTH_QUARTERLY, TOP_SECTORS,
  SPENDING_SHARES, CENSUS_SERIES, CENSUS_PROFILE, PROVINCE_POP,
  INFLATION_MONTHS, INFLATION_YEARS, INFLATION_PARTS, JOBLESS, POVERTY,
  HDI, TRADE_YEARS, RELEASES, buildExplorerRows,
} from './data.js';
import { columnChart, trendChart, shareBars } from './charts.js';

const comma = (n) => String(n).replace('.', ',');

function srcLine(text) {
  return `<p class="source">Sumber: ${text}</p>`;
}

function pageHead(kicker, title, intro) {
  return `<p class="kicker">${kicker}</p><h1>${title}</h1><p class="lede">${intro}</p>`;
}

function statCards() {
  return `<div class="stat-grid">${HEADLINE_CARDS.map((h) => `
    <article class="stat"><p class="stat-label">${h.title}</p>
    <p class="stat-value">${h.figure}</p>
    <p class="stat-detail">${h.detail}</p>
    <p class="stat-origin">${h.origin}</p></article>`).join('')}</div>`;
}

function panel(title, body, note) {
  return `<section class="card"><h2>${title}</h2>${body}${note ? `<p class="source">${note}</p>` : ''}</section>`;
}

function gridTable(title, head, rows, note) {
  return `<section class="card"><h2>${title}</h2>
  <div class="table-wrap"><table class="data-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
  <tbody>${rows}</tbody></table></div>${note ? `<p class="source">${note}</p>` : ''}</section>`;
}

function factList(items) {
  return `<dl class="facts">${items.map((r) => `<div><dt>${r.label}</dt><dd>${r.value}</dd></div>`).join('')}</dl>`;
}

function idThousands(n) {
  return n.toLocaleString('id-ID');
}

export function pageHome() {
  const growth = GROWTH_YEARLY.points;
  const inflation = INFLATION_MONTHS.points;
  return `
  ${pageHead('Portal Statistik Indonesia', 'Indonesia dalam angka', `${META.motto} Delapan angka utama di bawah ini mengikuti rilis resmi terbaru.`)}
  ${statCards()}
  <div class="duo">
    ${panel('Pertumbuhan ekonomi, 2019–2025', `
      <div class="toggle" role="group" aria-label="Jenis grafik pertumbuhan">
        <button type="button" data-chart-toggle="growth" data-kind="bar" class="active" aria-pressed="true">Kolom</button>
        <button type="button" data-chart-toggle="growth" data-kind="line" aria-pressed="false">Garis</button>
      </div>
      <div id="growth-chart">${columnChart(growth, { color: '#0f766e', negativeColor: '#b91c1c' })}</div>`,
      `${GROWTH_YEARLY.origin} — persen year-on-year.`)}
    ${panel('Inflasi bulanan 2025', trendChart(inflation, { color: '#15803d' }),
      `${INFLATION_MONTHS.origin} — persen year-on-year. Februari 2025 sempat deflasi −0,09%.`)}
  </div>
  <section class="card"><h2>Rilis angka terbaru</h2>
    <ul class="releases">${RELEASES.map((r) => `
      <li><p class="release-date">${r.date}</p><p class="release-title">${r.title}</p><p>${r.body}</p></li>`).join('')}
    </ul></section>
  <section class="card"><h2>Jelajahi menurut topik</h2>
    <nav class="topic-links" aria-label="Topik statistik">
      <a href="#/ekonomi">Ekonomi — PDB dan lapangan usaha</a>
      <a href="#/penduduk">Penduduk — jumlah dan sebaran</a>
      <a href="#/harga">Harga — inflasi dan daya beli</a>
      <a href="#/kerja">Ketenagakerjaan — pengangguran</a>
      <a href="#/sosial">Sosial — kemiskinan dan IPM</a>
      <a href="#/perdagangan">Perdagangan — ekspor dan impor</a>
      <a href="#/data">Penjelajah data — semua indikator</a>
    </nav></section>`;
}

export function pageEconomy() {
  const quarterly = GROWTH_QUARTERLY.points;
  const annual = GROWTH_YEARLY.points;
  const sectorRows = TOP_SECTORS.rows.map((s) => `<tr><td>${s.name}</td><td>${comma(s.share)}%</td><td>${s.growth === null ? 'terkontraksi' : comma(s.growth) + '%'}</td></tr>`).join('');
  const spendRows = SPENDING_SHARES.rows.map((s) => `<tr><td>${s.name}</td><td>${comma(s.share)}%</td></tr>`).join('');
  return `
  ${pageHead('Ekonomi', 'Perekonomian Indonesia', 'Produk Domestik Bruto (PDB) Triwulan III-2025 mencapai Rp6.060,0 triliun atas dasar harga berlaku dan Rp3.444,8 triliun atas dasar harga konstan 2010, tumbuh 5,04% dibanding Triwulan III-2024.')}
  <div class="duo">
    ${panel('Pertumbuhan PDB per triwulan', trendChart(quarterly), `${GROWTH_QUARTERLY.origin} — persen year-on-year.`)}
    ${panel('Pertumbuhan PDB tahunan', columnChart(annual, { negativeColor: '#b91c1c' }), `${GROWTH_YEARLY.origin} — persen year-on-year. Tahun 2020 terkontraksi karena pandemi.`)}
  </div>
  <div class="duo">
    ${panel('Lima lapangan usaha terbesar (pangsa PDB Triwulan III-2025)', shareBars(TOP_SECTORS.rows), `${TOP_SECTORS.origin} — ${TOP_SECTORS.remark}`)}
    ${gridTable('Lapangan usaha: pangsa dan pertumbuhan', ['Lapangan usaha', 'Pangsa PDB', 'Tumbuh (yoy)'], sectorRows, 'Pertumbuhan tertinggi: jasa pendidikan 10,59% (yoy). Sumber: BPS, 5 November 2025.')}
  </div>
  ${gridTable('PDB menurut pengeluaran, Triwulan III-2025', ['Komponen', 'Pangsa PDB'], spendRows, `${SPENDING_SHARES.origin}. Konsumsi rumah tangga menjadi sumber pertumbuhan terbesar (2,54 persen poin), diikuti ekspor neto (2,15) dan PMTB (1,59).`)}
  <section class="card"><h2>Catatan wilayah</h2>
  <p>Pulau Jawa tetap menjadi penggerak utama perekonomian: tumbuh 5,17% pada Triwulan III-2025 dengan kontribusi 56,68% terhadap PDB nasional. Sulawesi tumbuh 5,84%, Sumatera 4,90%, Kalimantan 4,70%, dan Maluku–Papua 2,64%.</p>
  ${srcLine('BPS — Pertumbuhan Ekonomi Triwulan III-2025.')}</section>`;
}

export function pagePopulation() {
  const series = CENSUS_SERIES.points;
  const provinceRows = PROVINCE_POP.rows.map((p) => `<tr><td>${p.rank}</td><td>${p.province}</td><td>${idThousands(p.population)}</td></tr>`).join('');
  return `
  ${pageHead('Penduduk', 'Penduduk Indonesia', 'Pada pertengahan 2025 penduduk Indonesia mencapai 284,44 juta jiwa dan tumbuh 1,01% dalam setahun. Survei Penduduk Antar Sensus (SUPAS) 2025 mencatat 284,67 juta jiwa.')}
  <div class="duo">
    ${panel('Jumlah penduduk, 2010–2025', columnChart(series, { color: '#0f766e' }), `${CENSUS_SERIES.origin} — juta jiwa.`)}
    <section class="card"><h2>Profil penduduk (SUPAS 2025)</h2>
      ${factList(CENSUS_PROFILE.facts)}
      ${srcLine(CENSUS_PROFILE.origin)}</section>
  </div>
  ${gridTable('Provinsi terpadat dan tersedikit, 2025', ['Peringkat', 'Provinsi', 'Penduduk (jiwa)'], provinceRows, `${PROVINCE_POP.origin}. Provinsi median: ${idThousands(PROVINCE_POP.median)} jiwa dari ${PROVINCE_POP.provinceCount} provinsi. Jawa Barat, Jawa Timur, dan Jawa Tengah selalu menjadi tiga provinsi terpadat.`)}
  <section class="card"><h2>Membaca angka ini</h2>
  <p>Lebih dari separuh penduduk tinggal di Pulau Jawa, sementara Papua Selatan menjadi provinsi dengan penduduk paling sedikit (549.651 jiwa). Generasi Z adalah kelompok usia terbesar, dan penduduk lanjut usia sudah mencapai hampir 12% — dua hal yang sama-sama penting untuk perencanaan sekolah, lapangan kerja, dan layanan kesehatan.</p></section>`;
}

export function pagePrices() {
  const monthly = INFLATION_MONTHS.points;
  const annual = INFLATION_YEARS.points;
  const partRows = INFLATION_PARTS.rows.map((r) => `<tr><td>${r.name}</td><td>${comma(r.value)}%</td></tr>`).join('');
  return `
  ${pageHead('Harga', 'Inflasi dan harga', 'Inflasi Oktober 2025 tercatat 2,86% year-on-year — naik dari 2,65% pada September 2025 — dan tetap berada dalam sasaran Bank Indonesia sebesar 2,5±1%.')}
  <div class="duo">
    ${panel('Inflasi bulanan 2025', trendChart(monthly, { color: '#15803d' }), `${INFLATION_MONTHS.origin} — persen year-on-year.`)}
    ${panel('Inflasi tahun kalender', columnChart(annual, { color: '#15803d' }), `${INFLATION_YEARS.origin} — persen. Puncak 2022 (5,51%) terjadi saat harga energi global melonjak.`)}
  </div>
  ${gridTable('Komponen inflasi, Oktober 2025', ['Komponen', 'Inflasi (yoy)'], partRows, `${INFLATION_PARTS.origin}. ${INFLATION_PARTS.remark}`)}
  <section class="card"><h2>Apa artinya?</h2>
  <p>Inflasi inti 2,36% menunjukkan tekanan harga dari sisi permintaan tetap terjaga, sementara makanan bergejolak 6,59% menjadi penyumbang kenaikan terbesar. Untuk rumah tangga, angka yang paling terasa adalah harga pangan: kelompok makanan, minuman, dan tembakau naik 4,99% dalam setahun.</p>
  ${srcLine('BPS, 3 November 2025; Bank Indonesia, Analisis Inflasi Oktober 2025.')}</section>`;
}

export function pageJobs() {
  const series = JOBLESS.points;
  return `
  ${pageHead('Ketenagakerjaan', 'Pengangguran di Indonesia', 'Tingkat Pengangguran Terbuka (TPT) pada Agustus 2025 sebesar 4,85%, turun dari 4,91% pada Agustus 2024. Jumlah penganggur tercatat 7,46 juta orang.')}
  ${panel('Tingkat Pengangguran Terbuka, Agustus', trendChart(series, { color: '#a16207' }), `${JOBLESS.origin} — persen. TPT mengukur penganggur terhadap angkatan kerja.`)}
  <section class="card"><h2>Yang perlu diperhatikan</h2>
    ${factList(JOBLESS.facts)}
    ${srcLine(`${JOBLESS.origin} — Agustus 2025.`)}
    <p>Turunnya TPT seiring bertambahnya 1,90 juta penduduk bekerja dibanding Agustus 2024. Namun lulusan SMK masih menghadapi TPT tertinggi (8,63%), yang menunjukkan pekerjaan yang tersedia belum sepenuhnya cocok dengan keterampilan lulusan kejuruan.</p></section>`;
}

export function pageSocial() {
  const poverty = POVERTY.points;
  const hdi = HDI.points;
  return `
  ${pageHead('Sosial', 'Kemiskinan dan pembangunan manusia', 'Tingkat kemiskinan Maret 2025 turun ke 8,47% — terendah sejak pandemi — sementara Indeks Pembangunan Manusia 2024 mencapai 75,02 dan terus naik ke 75,90 pada 2025.')}
  <div class="duo">
    ${panel('Tingkat kemiskinan, Maret', trendChart(poverty, { color: '#7e22ce' }), `${POVERTY.origin} — persen penduduk.`)}
    ${panel('Indeks Pembangunan Manusia', columnChart(hdi, { color: '#7e22ce' }), `${HDI.origin} — skor 0–100, kategori tinggi.`)}
  </div>
  <div class="duo">
    <section class="card"><h2>Kemiskinan, Maret 2025</h2>
      ${factList(POVERTY.facts)}
      ${srcLine(`${POVERTY.origin} — Susenas Maret 2025, 345 ribu rumah tangga sampel.`)}</section>
    <section class="card"><h2>Dimensi IPM, 2024</h2>
      ${factList(HDI.dimensions)}
      ${srcLine(`${HDI.origin} — IPM 2024, Volume 19, 2025.`)}
      <p>IPM mengukur tiga hal: umur panjang dan hidup sehat, pengetahuan, dan standar hidup layak. Ketiganya membaik pada 2024.</p></section>
  </div>`;
}

export function pageTrade() {
  const balance = TRADE_YEARS.rows.map((r) => ({ label: r.year, value: r.balance }));
  const tradeRows = TRADE_YEARS.rows.map((r) => `<tr><td>${r.year}</td><td>US$${r.exports.toFixed(2)} M</td><td>US$${r.imports.toFixed(2)} M</td><td>US$${r.balance.toFixed(2)} M</td></tr>`).join('');
  return `
  ${pageHead('Perdagangan', 'Ekspor, impor, dan neraca dagang', 'Indonesia mencatat surplus perdagangan US$31,04 miliar pada 2024 — tahun kelima berturut-turut surplus sejak Mei 2020. Ekspor mencapai US$264,70 miliar, naik 2,29% dari 2023.')}
  <div class="duo">
    ${panel('Surplus perdagangan, 2021–2024', columnChart(balance, { color: '#0f766e' }), `${TRADE_YEARS.origin} — miliar dolar AS.`)}
    <section class="card"><h2>Catatan perdagangan 2024</h2>
      ${factList(TRADE_YEARS.facts)}
      ${srcLine(`${TRADE_YEARS.origin}.`)}</section>
  </div>
  ${gridTable('Ekspor dan impor, 2021–2024', ['Tahun', 'Ekspor', 'Impor', 'Surplus'], tradeRows, `${TRADE_YEARS.origin} — miliar dolar AS. Ekspor 2022 (US$291,90 miliar) adalah yang tertinggi dalam deret ini, didorong harga komoditas.`)}
  <section class="card"><h2>Membaca neraca dagang</h2>
  <p>Surplus berarti Indonesia menjual lebih banyak ke luar negeri daripada membeli. Pada 2024 surplus menyusut dari US$36,89 miliar (2023) karena impor tumbuh lebih cepat — terutama bahan baku dan barang modal, yang justru menandakan aktivitas industri di dalam negeri sedang berjalan.</p></section>`;
}

export function pageData() {
  const rows = buildExplorerRows();
  const topics = [...new Set(rows.map((r) => r.topic))];
  return `
  ${pageHead('Penjelajah data', 'Semua indikator dalam satu tabel', `Cari berdasarkan nama indikator atau saring menurut topik. Tabel ini memuat ${rows.length} indikator; setiap baris membawa nilai, periode, dan sumbernya — klik judul kolom untuk mengurutkan.`)}
  <section class="card">
    <div class="explorer-tools">
      <label> Cari indikator
        <input id="explorer-search" type="search" placeholder="misalnya: inflasi, PDB, kemiskinan" autocomplete="off">
      </label>
      <label> Topik
        <select id="explorer-topic">
          <option value="">Semua topik</option>
          ${topics.map((t) => `<option value="${t}">${t}</option>`).join('')}
        </select>
      </label>
      <p id="explorer-count" aria-live="polite"></p>
    </div>
    <div class="table-wrap"><table class="data-table sortable" id="explorer-table">
      <thead><tr>
        <th><button type="button" data-sort="topic">Topik</button></th>
        <th><button type="button" data-sort="indicator">Indikator</button></th>
        <th><button type="button" data-sort="value">Nilai</button></th>
        <th><button type="button" data-sort="period">Periode</button></th>
        <th><button type="button" data-sort="source">Sumber</button></th>
      </tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r.topic}</td><td>${r.indicator}</td><td>${r.value}</td><td>${r.period}</td><td>${r.source}</td></tr>`).join('')}</tbody>
    </table></div>
    <p class="source">Semua angka di tabel ini berasal dari data.js situs ini, yang mengutip publikasi resmi BPS, Bank Indonesia, dan Kementerian Keuangan.</p>
  </section>`;
}

export function pageAbout() {
  return `
  ${pageHead('Tentang', 'Tentang NusaData', 'NusaData adalah portal statistik Indonesia yang menyajikan angka resmi dengan penjelasan yang mudah dibaca — tanpa jargon yang tidak perlu dan tanpa angka tanpa sumber.')}
  <section class="card"><h2>Cara membaca situs ini</h2>
    <ul class="plain-list">
      <li><strong>Setiap angka membawa sumber dan periode.</strong> Kalau sebuah angka tidak punya sumber yang bisa dicek, ia tidak tampil di sini.</li>
      <li><strong>Grafik selalu ditemani tabel atau daftar angka.</strong> Grafik membantu melihat pola; angka pastinya ada di tabel di bawah atau di samping grafik.</li>
      <li><strong>“yoy” berarti dibanding periode yang sama tahun lalu,</strong> “qtq” dibanding triwulan sebelumnya, dan “c-to-c” berarti kumulatif sejak awal tahun dibanding periode yang sama tahun lalu.</li>
      <li><strong>Situs ini bekerja tanpa internet.</strong> Semua halaman, grafik, dan angka tersimpan di berkas situs ini sendiri.</li>
    </ul></section>
  <section class="card"><h2>Sumber data</h2>
    <ul class="plain-list">
      <li>Badan Pusat Statistik (BPS) — Berita Resmi Statistik dan publikasi: pertumbuhan ekonomi, inflasi, ketenagakerjaan, kemiskinan, IPM, dan penduduk.</li>
      <li>Bank Indonesia (BI) — Analisis Inflasi Oktober 2025 dan sasaran inflasi 2,5±1%.</li>
      <li>Kementerian Keuangan (Kemenkeu) — siaran pers neraca perdagangan 2024.</li>
      <li>Kementerian Perdagangan (Kemendag) — Pusat Data dan Sistem Informasi, diolah dari data BPS.</li>
      <li>Kementerian Kesehatan — Profil Kesehatan Indonesia 2025, untuk estimasi penduduk provinsi.</li>
    </ul>
    <p class="source">Angka terakhir diperbarui: November 2025 (rilis SUPAS 2025: 30 Juni 2026).</p></section>
  <section class="card"><h2>Batasan</h2>
    <p>Situs ini menyajikan angka yang sudah diterbitkan hingga November 2025. Angka dapat direvisi oleh instansi penerbitnya pada rilis berikutnya. Untuk angka terbaru, periksa publikasi resmi di bps.go.id, bi.go.id, dan kemenkeu.go.id.</p></section>`;
}

export const ROUTES = {
  '/': pageHome,
  '/ekonomi': pageEconomy,
  '/penduduk': pagePopulation,
  '/harga': pagePrices,
  '/kerja': pageJobs,
  '/sosial': pageSocial,
  '/perdagangan': pageTrade,
  '/data': pageData,
  '/tentang': pageAbout,
};

export const NAV_LINKS = [
  { href: '#/', label: 'Beranda', route: '/' },
  { href: '#/ekonomi', label: 'Ekonomi', route: '/ekonomi' },
  { href: '#/penduduk', label: 'Penduduk', route: '/penduduk' },
  { href: '#/harga', label: 'Harga', route: '/harga' },
  { href: '#/kerja', label: 'Kerja', route: '/kerja' },
  { href: '#/sosial', label: 'Sosial', route: '/sosial' },
  { href: '#/perdagangan', label: 'Perdagangan', route: '/perdagangan' },
  { href: '#/data', label: 'Data', route: '/data' },
  { href: '#/tentang', label: 'Tentang', route: '/tentang' },
];

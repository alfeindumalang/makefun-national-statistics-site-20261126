// Angka resmi Indonesia untuk NusaData.
//
// Semua deret di bawah memakai angka yang sudah diterbitkan oleh Badan
// Pusat Statistik, Bank Indonesia, dan Kementerian Keuangan. Setiap angka
// disertai sumber dan periodenya di tempat ia ditampilkan, jadi tidak ada
// angka di situs ini yang berdiri tanpa rujukan. Nilai ditulis dalam
// satuan yang disebut di labelnya masing-masing.

export const META = {
  site: 'NusaData',
  subtitle: 'Portal Statistik Indonesia',
  motto: 'Angka resmi Indonesia, diterangkan dengan bahasa yang mudah diikuti.',
  lastUpdate: 'November 2025',
  disclaimer: 'Angka-angka di situs ini adalah angka resmi yang diterbitkan BPS, Bank Indonesia, dan Kementerian Keuangan. Setiap angka membawa sumber dan periodenya.',
};

export const AGENCIES = {
  bps: 'Badan Pusat Statistik (BPS)',
  bi: 'Bank Indonesia (BI)',
  kemenkeu: 'Kementerian Keuangan (Kemenkeu)',
  kemendag: 'Kementerian Perdagangan (Kemendag), diolah dari BPS',
};

// Delapan angka utama yang tampil di beranda.
export const HEADLINE_CARDS = [
  { title: 'Penduduk', figure: '284,44 jt', detail: 'pertengahan 2025, tumbuh 1,01%', origin: 'BPS' },
  { title: 'PDB Triwulan III-2025', figure: 'Rp6.060 T', detail: 'tumbuh 5,04% (yoy)', origin: 'BPS, 5 Nov 2025' },
  { title: 'Inflasi Oktober 2025', figure: '2,86%', detail: 'year-on-year; sasaran BI 2,5±1%', origin: 'BPS, 3 Nov 2025' },
  { title: 'Pengangguran (TPT)', figure: '4,85%', detail: 'Agustus 2025; 7,46 juta orang', origin: 'BPS' },
  { title: 'Kemiskinan', figure: '8,47%', detail: 'Maret 2025; 23,85 juta orang', origin: 'BPS, 25 Jul 2025' },
  { title: 'IPM 2024', figure: '75,02', detail: 'kategori tinggi; 2025: 75,90', origin: 'BPS' },
  { title: 'Ekspor 2024', figure: 'US$264,70 M', detail: 'surplus dagang US$31,04 M', origin: 'BPS / Kemenkeu' },
  { title: 'Rasio Gini', figure: '0,375', detail: 'Maret 2025, turun dari 0,379', origin: 'BPS' },
];

// Pertumbuhan ekonomi tahunan, persen year-on-year (BPS).
export const GROWTH_YEARLY = {
  origin: 'BPS — Berita Resmi Statistik Pertumbuhan Ekonomi',
  unit: 'persen (yoy)',
  points: [
    { label: '2019', value: 5.02 },
    { label: '2020', value: -2.07 },
    { label: '2021', value: 3.7 },
    { label: '2022', value: 5.31 },
    { label: '2023', value: 5.05 },
    { label: '2024', value: 5.03 },
    { label: '2025', value: 5.11 },
  ],
};

// Pertumbuhan PDB per triwulan, persen year-on-year (BPS, BRS 5 Nov 2025).
export const GROWTH_QUARTERLY = {
  origin: 'BPS — BRS No. 102/11/Th. XXVIII, 5 November 2025',
  unit: 'persen (yoy)',
  points: [
    { label: 'T1-24', value: 5.11 },
    { label: 'T2-24', value: 5.05 },
    { label: 'T3-24', value: 4.95 },
    { label: 'T4-24', value: 5.02 },
    { label: 'T1-25', value: 4.87 },
    { label: 'T2-25', value: 5.12 },
    { label: 'T3-25', value: 5.04 },
  ],
};

// Lima lapangan usaha terbesar: pangsa PDB Triwulan III-2025 dan
// pertumbuhan setahunnya (BPS, 5 November 2025).
export const TOP_SECTORS = {
  origin: 'BPS — Pertumbuhan Ekonomi Triwulan III-2025',
  remark: 'Kelima lapangan usaha ini menyumbang 65,02% dari PDB.',
  rows: [
    { name: 'Industri pengolahan', share: 19.15, growth: 5.54 },
    { name: 'Pertanian, kehutanan, perikanan', share: 14.35, growth: 4.93 },
    { name: 'Perdagangan besar dan eceran', share: 13.19, growth: 5.49 },
    { name: 'Konstruksi', share: 9.82, growth: 4.21 },
    { name: 'Pertambangan dan penggalian', share: 8.51, growth: null },
  ],
};

// Pangsa komponen pengeluaran terhadap PDB Triwulan III-2025 (BPS).
export const SPENDING_SHARES = {
  origin: 'BPS — Pertumbuhan Ekonomi Triwulan III-2025',
  rows: [
    { name: 'Konsumsi rumah tangga', share: 53.14 },
    { name: 'Pembentukan modal tetap bruto', share: 29.09 },
    { name: 'Ekspor barang dan jasa', share: 23.64 },
  ],
};

// Jumlah penduduk menurut sensus dan survei, juta jiwa (BPS).
export const CENSUS_SERIES = {
  origin: 'BPS — Sensus Penduduk dan SUPAS; 2025 proyeksi pertengahan tahun',
  unit: 'juta jiwa',
  points: [
    { label: '2010', value: 237.64, note: 'Sensus Penduduk 2010' },
    { label: '2015', value: 255.18, note: 'SUPAS 2015' },
    { label: '2020', value: 270.2, note: 'Sensus Penduduk 2020' },
    { label: '2025', value: 284.44, note: 'Proyeksi pertengahan 2025' },
  ],
};

// Gambaran penduduk dari SUPAS 2025 (BPS).
export const CENSUS_PROFILE = {
  origin: 'BPS — Hasil Survei Penduduk Antar Sensus (SUPAS) 2025',
  facts: [
    { label: 'Jumlah penduduk (SUPAS 2025)', value: '284,67 juta jiwa' },
    { label: 'Generasi terbesar', value: 'Gen Z — 24,93%' },
    { label: 'Penduduk lanjut usia (60+)', value: '11,97%' },
    { label: 'Angka fertilitas total (TFR)', value: '2,13 anak per perempuan' },
    { label: 'Tinggal di Pulau Jawa', value: '56% dari penduduk' },
    { label: 'Bisa berbahasa Indonesia', value: '98,12%' },
  ],
};

// Provinsi terpadat dan tersedikit, pertengahan 2025 (BPS, Proyeksi
// Penduduk 2020–2050).
export const PROVINCE_POP = {
  origin: 'BPS, Proyeksi Penduduk 2020–2050, pertengahan 2025',
  median: 3781549,
  provinceCount: 38,
  rows: [
    { province: 'Jawa Barat', population: 50759003, rank: 1 },
    { province: 'Jawa Timur', population: 42089271, rank: 2 },
    { province: 'Jawa Tengah', population: 38233933, rank: 3 },
    { province: 'Papua Barat', population: 587645, rank: 37 },
    { province: 'Papua Selatan', population: 549651, rank: 38 },
  ],
};

// Inflasi bulanan 2025, persen year-on-year (BPS, rilis bulanan).
export const INFLATION_MONTHS = {
  origin: 'BPS — Berita Resmi Statistik Inflasi, rilis bulanan 2025',
  unit: 'persen (yoy)',
  points: [
    { label: 'Jan', value: 0.76 },
    { label: 'Feb', value: -0.09 },
    { label: 'Mar', value: 1.03 },
    { label: 'Apr', value: 1.95 },
    { label: 'Mei', value: 1.6 },
    { label: 'Jun', value: 1.87 },
    { label: 'Jul', value: 2.37 },
    { label: 'Agu', value: 2.31 },
    { label: 'Sep', value: 2.65 },
    { label: 'Okt', value: 2.86 },
  ],
};

// Inflasi tahun kalender, persen (BPS).
export const INFLATION_YEARS = {
  origin: 'BPS — Inflasi tahun kalender',
  unit: 'persen',
  points: [
    { label: '2019', value: 2.72 },
    { label: '2020', value: 1.68 },
    { label: '2021', value: 1.87 },
    { label: '2022', value: 5.51 },
    { label: '2023', value: 2.61 },
    { label: '2024', value: 1.57 },
    { label: '2025', value: 2.92 },
  ],
};

// Komponen inflasi Oktober 2025, persen year-on-year (BPS dan BI).
export const INFLATION_PARTS = {
  origin: 'BPS dan Bank Indonesia — Analisis Inflasi Oktober 2025',
  remark: 'IHK Oktober 2025 tercatat 109,04 (Oktober 2024: 106,01).',
  rows: [
    { name: 'Inflasi umum', value: 2.86 },
    { name: 'Inflasi inti', value: 2.36 },
    { name: 'Makanan bergejolak (volatile food)', value: 6.59 },
    { name: 'Harga diatur pemerintah (administered prices)', value: 1.45 },
  ],
};

// Tingkat Pengangguran Terbuka bulan Agustus, persen (BPS).
export const JOBLESS = {
  origin: 'BPS — Keadaan Ketenagakerjaan Agustus',
  unit: 'persen',
  points: [
    { label: '2021', value: 6.49 },
    { label: '2022', value: 5.86 },
    { label: '2023', value: 5.32 },
    { label: '2024', value: 4.91 },
    { label: '2025', value: 4.85 },
  ],
  facts: [
    { label: 'Jumlah penganggur, Agustus 2025', value: '7,46 juta orang' },
    { label: 'TPT tertinggi menurut pendidikan', value: 'SMK — 8,63%' },
    { label: 'Penduduk bekerja bertambah vs Agustus 2024', value: '1,90 juta orang' },
  ],
};

// Tingkat kemiskinan bulan Maret, persen (BPS, Susenas).
export const POVERTY = {
  origin: 'BPS — Profil Kemiskinan, Susenas Maret',
  unit: 'persen',
  points: [
    { label: '2021', value: 10.14 },
    { label: '2022', value: 9.54 },
    { label: '2023', value: 9.36 },
    { label: '2024', value: 9.03 },
    { label: '2025', value: 8.47 },
  ],
  facts: [
    { label: 'Penduduk miskin, Maret 2025', value: '23,85 juta orang' },
    { label: 'Kemiskinan perkotaan', value: '6,73%' },
    { label: 'Kemiskinan perdesaan', value: '11,03%' },
    { label: 'Garis kemiskinan', value: 'Rp609.160 per kapita per bulan' },
    { label: 'Rasio Gini', value: '0,375 (turun dari 0,379)' },
    { label: 'Kemiskinan ekstrem', value: '0,85% — 2,38 juta orang' },
    { label: 'September 2025', value: '8,25%' },
  ],
};

// Indeks Pembangunan Manusia (BPS).
export const HDI = {
  origin: 'BPS — Indeks Pembangunan Manusia',
  unit: 'skor (0–100)',
  points: [
    { label: '2021', value: 72.29 },
    { label: '2022', value: 73.69 },
    { label: '2023', value: 74.39 },
    { label: '2024', value: 75.02 },
    { label: '2025', value: 75.9 },
  ],
  dimensions: [
    { label: 'Umur harapan hidup saat lahir, 2024', value: '74,15 tahun' },
    { label: 'Harapan lama sekolah, 2024', value: '13,21 tahun' },
    { label: 'Rata-rata lama sekolah, 2024', value: '8,85 tahun' },
    { label: 'Pengeluaran riil per kapita, 2024', value: 'Rp12,34 juta per tahun' },
  ],
};

// Perdagangan luar negeri, miliar dolar AS (BPS, diolah Kemendag).
export const TRADE_YEARS = {
  origin: 'BPS, diolah Pusat Data dan Sistem Informasi Kemendag',
  unit: 'miliar dolar AS',
  rows: [
    { year: '2021', exports: 231.61, imports: 196.27, balance: 35.34 },
    { year: '2022', exports: 291.9, imports: 237.44, balance: 54.46 },
    { year: '2023', exports: 258.82, imports: 221.93, balance: 36.89 },
    { year: '2024', exports: 264.7, imports: 233.66, balance: 31.04 },
  ],
  facts: [
    { label: 'Ekspor nonmigas 2024', value: 'US$248,83 miliar' },
    { label: 'Ekspor migas 2024', value: 'US$15,89 miliar' },
    { label: 'Mitra penyumbang surplus terbesar 2024', value: 'India — US$14,67 miliar' },
    { label: 'Mitra penyumbang surplus kedua 2024', value: 'Amerika Serikat — US$14,34 miliar' },
    { label: 'Surplus beruntun sejak', value: 'Mei 2020' },
  ],
};

// Rilis angka terbaru untuk beranda.
export const RELEASES = [
  { date: '5 Nov 2025', title: 'Ekonomi Triwulan III-2025 tumbuh 5,04% (yoy)', body: 'PDB atas dasar harga berlaku Rp6.060,0 triliun. Industri pengolahan menjadi sumber pertumbuhan terbesar (1,13 persen poin).' },
  { date: '3 Nov 2025', title: 'Inflasi Oktober 2025 sebesar 2,86% (yoy)', body: 'Inflasi bulanan 0,28% dan tahun kalender 2,10%. Kelompok makanan, minuman, dan tembakau memberi andil terbesar.' },
  { date: '5 Nov 2025', title: 'IPM 2025 mencapai 75,90', body: 'Naik 0,88 poin dari 75,02 pada 2024. Tiga provinsi masuk kategori sangat tinggi: DKI Jakarta, DI Yogyakarta, dan Riau.' },
  { date: '25 Jul 2025', title: 'Kemiskinan Maret 2025 turun ke 8,47%', body: 'Jumlah penduduk miskin 23,85 juta orang, turun 1,37 juta dari Maret 2024. Kemiskinan ekstrem 0,85%.' },
  { date: '5 Nov 2025', title: 'TPT Agustus 2025 sebesar 4,85%', body: 'Jumlah penganggur 7,46 juta orang. TPT lulusan SMK masih tertinggi, 8,63%.' },
  { date: '30 Jun 2026', title: 'SUPAS 2025: penduduk 284,67 juta jiwa', body: 'Gen Z menjadi generasi terbesar (24,93%). Penduduk lanjut usia 11,97% dan TFR 2,13 anak per perempuan.' },
];

const comma = (n) => String(n).replace('.', ',');

// Semua baris untuk penjelajah data, dirangkai dari deret-deret di atas.
export function buildExplorerRows() {
  const rows = [];
  for (const card of HEADLINE_CARDS) {
    rows.push({ topic: 'Utama', indicator: card.title, value: card.figure, period: card.detail, source: card.origin });
  }
  for (const p of GROWTH_YEARLY.points) {
    rows.push({ topic: 'Ekonomi', indicator: 'Pertumbuhan PDB', value: `${comma(p.value)}%`, period: p.label, source: 'BPS' });
  }
  for (const s of TOP_SECTORS.rows) {
    rows.push({ topic: 'Ekonomi', indicator: `Pangsa PDB — ${s.name}`, value: `${comma(s.share)}%`, period: 'Triwulan III-2025', source: 'BPS' });
  }
  for (const p of CENSUS_SERIES.points) {
    rows.push({ topic: 'Penduduk', indicator: 'Jumlah penduduk', value: `${comma(p.value)} juta jiwa`, period: p.label, source: 'BPS' });
  }
  for (const p of INFLATION_YEARS.points) {
    rows.push({ topic: 'Harga', indicator: 'Inflasi tahun kalender', value: `${comma(p.value)}%`, period: p.label, source: 'BPS' });
  }
  for (const p of JOBLESS.points) {
    rows.push({ topic: 'Ketenagakerjaan', indicator: 'Tingkat Pengangguran Terbuka (Agustus)', value: `${comma(p.value)}%`, period: p.label, source: 'BPS' });
  }
  for (const p of POVERTY.points) {
    rows.push({ topic: 'Sosial', indicator: 'Tingkat kemiskinan (Maret)', value: `${comma(p.value)}%`, period: p.label, source: 'BPS' });
  }
  for (const p of HDI.points) {
    rows.push({ topic: 'Sosial', indicator: 'Indeks Pembangunan Manusia', value: comma(p.value), period: p.label, source: 'BPS' });
  }
  for (const t of TRADE_YEARS.rows) {
    rows.push({ topic: 'Perdagangan', indicator: 'Ekspor', value: `US$${t.exports.toFixed(2)} M`, period: t.year, source: 'BPS / Kemendag' });
    rows.push({ topic: 'Perdagangan', indicator: 'Impor', value: `US$${t.imports.toFixed(2)} M`, period: t.year, source: 'BPS / Kemendag' });
  }
  return rows;
}

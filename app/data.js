// NusaData — angka-angka situs.
//
// Setiap angka di sini berasal dari publikasi resmi: Badan Pusat
// Statistik (BPS), Bank Indonesia, dan Kementerian Keuangan. Angka
// disimpan sebagai bilangan mentah beserta labelnya, supaya grafik,
// tabel, dan penjelajah data semuanya membaca sumber yang sama.

// Format bilangan ala Indonesia: koma desimal, titik ribuan, tanpa
// nol yang tidak perlu di belakang koma ("3,7" bukan "3,70").
export function angka(n) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Format dolar dengan dua desimal memakai titik, seperti yang dipakai
// tabel perdagangan ("US$231.61 M").
export function dolar(n) {
  return `US$${n.toFixed(2)} M`;
}

// Delapan kartu angka utama di beranda. "nilai" dan "rincian" sudah
// dalam bentuk tampil, karena tiap kartu memakai satuannya sendiri.
export const UTAMA = [
  { judul: "Penduduk", nilai: "284,44 jt", rincian: "pertengahan 2025, tumbuh 1,01%", sumber: "BPS" },
  { judul: "PDB Triwulan III-2025", nilai: "Rp6.060 T", rincian: "tumbuh 5,04% (yoy)", sumber: "BPS, 5 Nov 2025" },
  { judul: "Inflasi Oktober 2025", nilai: "2,86%", rincian: "year-on-year; sasaran BI 2,5±1%", sumber: "BPS, 3 Nov 2025" },
  { judul: "Pengangguran (TPT)", nilai: "4,85%", rincian: "Agustus 2025; 7,46 juta orang", sumber: "BPS" },
  { judul: "Kemiskinan", nilai: "8,47%", rincian: "Maret 2025; 23,85 juta orang", sumber: "BPS, 25 Jul 2025" },
  { judul: "IPM 2024", nilai: "75,02", rincian: "kategori tinggi; 2025: 75,90", sumber: "BPS" },
  { judul: "Ekspor 2024", nilai: "US$264,70 M", rincian: "surplus dagang US$31,04 M", sumber: "BPS / Kemenkeu" },
  { judul: "Rasio Gini", nilai: "0,375", rincian: "Maret 2025, turun dari 0,379", sumber: "BPS" },
];

// Deret waktu. Tiap pasangan adalah [label, nilai] — label yang
// tampil di sumbu grafik, nilai yang digambar dan dilabeli.
export const DERET = {
  // Pertumbuhan PDB tahunan, persen year-on-year.
  pdbTahunan: [
    ["2019", 5.02], ["2020", -2.07], ["2021", 3.7], ["2022", 5.31],
    ["2023", 5.05], ["2024", 5.03], ["2025", 5.11],
  ],
  // Pertumbuhan PDB per triwulan, persen year-on-year.
  pdbTriwulan: [
    ["T1-24", 5.11], ["T2-24", 5.05], ["T3-24", 4.95], ["T4-24", 5.02],
    ["T1-25", 4.87], ["T2-25", 5.12], ["T3-25", 5.04],
  ],
  // Jumlah penduduk hasil sensus dan proyeksi, juta jiwa.
  sensus: [
    ["2010", 237.64], ["2015", 255.18], ["2020", 270.2], ["2025", 284.44],
  ],
  // Inflasi bulanan 2025, persen year-on-year.
  inflasiBulanan: [
    ["Jan", 0.76], ["Feb", -0.09], ["Mar", 1.03], ["Apr", 1.95],
    ["Mei", 1.6], ["Jun", 1.87], ["Jul", 2.37], ["Agu", 2.31],
    ["Sep", 2.65], ["Okt", 2.86],
  ],
  // Inflasi tahun kalender, persen.
  inflasiTahunan: [
    ["2019", 2.72], ["2020", 1.68], ["2021", 1.87], ["2022", 5.51],
    ["2023", 2.61], ["2024", 1.57], ["2025", 2.92],
  ],
  // Tingkat Pengangguran Terbuka bulan Agustus, persen.
  tpt: [
    ["2021", 6.49], ["2022", 5.86], ["2023", 5.32], ["2024", 4.91], ["2025", 4.85],
  ],
  // Tingkat kemiskinan bulan Maret, persen penduduk.
  kemiskinan: [
    ["2021", 10.14], ["2022", 9.54], ["2023", 9.36], ["2024", 9.03], ["2025", 8.47],
  ],
  // Indeks Pembangunan Manusia, skor 0–100.
  ipm: [
    ["2021", 72.29], ["2022", 73.69], ["2023", 74.39], ["2024", 75.02], ["2025", 75.9],
  ],
  // Surplus perdagangan, miliar dolar AS.
  surplus: [
    ["2021", 35.34], ["2022", 54.46], ["2023", 36.89], ["2024", 31.04],
  ],
};

// Ekspor dan impor per tahun: [tahun, ekspor, impor], miliar dolar AS.
export const DAGANG_TAHUNAN = [
  ["2021", 231.61, 196.27],
  ["2022", 291.9, 237.44],
  ["2023", 258.82, 221.93],
  ["2024", 264.7, 233.66],
];

// Lima lapangan usaha terbesar menurut pangsa PDB Triwulan III-2025.
// "tumbuh" memakai null bila lapangan usahanya terkontraksi.
export const LAPANGAN = [
  { nama: "Industri pengolahan", pangsa: 19.15, tumbuh: 5.54 },
  { nama: "Pertanian, kehutanan, perikanan", pangsa: 14.35, tumbuh: 4.93 },
  { nama: "Perdagangan besar dan eceran", pangsa: 13.19, tumbuh: 5.49 },
  { nama: "Konstruksi", pangsa: 9.82, tumbuh: 4.21 },
  { nama: "Pertambangan dan penggalian", pangsa: 8.51, tumbuh: null },
];

// PDB menurut pengeluaran, Triwulan III-2025: [komponen, pangsa].
export const PENGELUARAN = [
  ["Konsumsi rumah tangga", 53.14],
  ["Pembentukan modal tetap bruto", 29.09],
  ["Ekspor barang dan jasa", 23.64],
];

// Provinsi terpadat dan tersedikit, pertengahan 2025 (proyeksi BPS).
// Hanya ujung-ujungnya yang ditampilkan; mediannya disimpan terpisah.
export const PROVINSI = [
  { urutan: 1, nama: "Jawa Barat", jiwa: 50759003 },
  { urutan: 2, nama: "Jawa Timur", jiwa: 42089271 },
  { urutan: 3, nama: "Jawa Tengah", jiwa: 38233933 },
  { urutan: 37, nama: "Papua Barat", jiwa: 587645 },
  { urutan: 38, nama: "Papua Selatan", jiwa: 549651 },
];
export const PROVINSI_MEDIAN_JIWA = 3781549;
export const PROVINSI_JUMLAH = 38;

// Profil penduduk dari SUPAS 2025: [keterangan, nilai].
export const PROFIL_SUPAS = [
  ["Jumlah penduduk (SUPAS 2025)", "284,67 juta jiwa"],
  ["Generasi terbesar", "Gen Z — 24,93%"],
  ["Penduduk lanjut usia (60+)", "11,97%"],
  ["Angka fertilitas total (TFR)", "2,13 anak per perempuan"],
  ["Tinggal di Pulau Jawa", "56% dari penduduk"],
  ["Bisa berbahasa Indonesia", "98,12%"],
];

// Komponen inflasi Oktober 2025: [komponen, inflasi yoy].
export const KOMPONEN_HARGA = [
  ["Inflasi umum", "2,86%"],
  ["Inflasi inti", "2,36%"],
  ["Makanan bergejolak (volatile food)", "6,59%"],
  ["Harga diatur pemerintah (administered prices)", "1,45%"],
];

// Fakta ketenagakerjaan Agustus 2025: [keterangan, nilai].
export const FAKTA_KERJA = [
  ["Jumlah penganggur, Agustus 2025", "7,46 juta orang"],
  ["TPT tertinggi menurut pendidikan", "SMK — 8,63%"],
  ["Penduduk bekerja bertambah vs Agustus 2024", "1,90 juta orang"],
];

// Fakta kemiskinan Maret 2025: [keterangan, nilai].
export const FAKTA_MISKIN = [
  ["Penduduk miskin, Maret 2025", "23,85 juta orang"],
  ["Kemiskinan perkotaan", "6,73%"],
  ["Kemiskinan perdesaan", "11,03%"],
  ["Garis kemiskinan", "Rp609.160 per kapita per bulan"],
  ["Rasio Gini", "0,375 (turun dari 0,379)"],
  ["Kemiskinan ekstrem", "0,85% — 2,38 juta orang"],
  ["September 2025", "8,25%"],
];

// Dimensi IPM 2024: [keterangan, nilai].
export const DIMENSI_IPM = [
  ["Umur harapan hidup saat lahir, 2024", "74,15 tahun"],
  ["Harapan lama sekolah, 2024", "13,21 tahun"],
  ["Rata-rata lama sekolah, 2024", "8,85 tahun"],
  ["Pengeluaran riil per kapita, 2024", "Rp12,34 juta per tahun"],
];

// Catatan perdagangan 2024: [keterangan, nilai].
export const CATATAN_DAGANG = [
  ["Ekspor nonmigas 2024", "US$248,83 miliar"],
  ["Ekspor migas 2024", "US$15,89 miliar"],
  ["Mitra penyumbang surplus terbesar 2024", "India — US$14,67 miliar"],
  ["Mitra penyumbang surplus kedua 2024", "Amerika Serikat — US$14,34 miliar"],
  ["Surplus beruntun sejak", "Mei 2020"],
];

// Rilis angka terbaru di beranda, urut dari yang terbaru.
export const RILIS = [
  {
    tanggal: "5 Nov 2025",
    judul: "Ekonomi Triwulan III-2025 tumbuh 5,04% (yoy)",
    isi: "PDB atas dasar harga berlaku Rp6.060,0 triliun. Industri pengolahan menjadi sumber pertumbuhan terbesar (1,13 persen poin).",
  },
  {
    tanggal: "3 Nov 2025",
    judul: "Inflasi Oktober 2025 sebesar 2,86% (yoy)",
    isi: "Inflasi bulanan 0,28% dan tahun kalender 2,10%. Kelompok makanan, minuman, dan tembakau memberi andil terbesar.",
  },
  {
    tanggal: "5 Nov 2025",
    judul: "IPM 2025 mencapai 75,90",
    isi: "Naik 0,88 poin dari 75,02 pada 2024. Tiga provinsi masuk kategori sangat tinggi: DKI Jakarta, DI Yogyakarta, dan Riau.",
  },
  {
    tanggal: "25 Jul 2025",
    judul: "Kemiskinan Maret 2025 turun ke 8,47%",
    isi: "Jumlah penduduk miskin 23,85 juta orang, turun 1,37 juta dari Maret 2024. Kemiskinan ekstrem 0,85%.",
  },
  {
    tanggal: "5 Nov 2025",
    judul: "TPT Agustus 2025 sebesar 4,85%",
    isi: "Jumlah penganggur 7,46 juta orang. TPT lulusan SMK masih tertinggi, 8,63%.",
  },
  {
    tanggal: "30 Jun 2026",
    judul: "SUPAS 2025: penduduk 284,67 juta jiwa",
    isi: "Gen Z menjadi generasi terbesar (24,93%). Penduduk lanjut usia 11,97% dan TFR 2,13 anak per perempuan.",
  },
];

// Tautan topik di beranda: [rute, judul, keterangan].
export const TOPIK_TAUTAN = [
  ["ekonomi", "Ekonomi", "PDB dan lapangan usaha"],
  ["penduduk", "Penduduk", "jumlah dan sebaran"],
  ["harga", "Harga", "inflasi dan daya beli"],
  ["kerja", "Ketenagakerjaan", "pengangguran"],
  ["sosial", "Sosial", "kemiskinan dan IPM"],
  ["perdagangan", "Perdagangan", "ekspor dan impor"],
  ["data", "Penjelajah data", "semua indikator"],
];

// Nama-nama topik untuk saringan di penjelajah data.
export const NAMA_TOPIK = ["Utama", "Ekonomi", "Penduduk", "Harga", "Ketenagakerjaan", "Sosial", "Perdagangan"];

// Penjelajah data: 54 baris yang dirangkai dari angka-angka di atas,
// supaya satu perubahan angka tercermin di grafik dan di tabel.
// Urutannya: Utama, Ekonomi, Penduduk, Harga, Ketenagakerjaan,
// Sosial, lalu Perdagangan.
export function barisPenjelajah() {
  const baris = [];
  const tambah = (topik, indikator, nilai, periode, sumber) =>
    baris.push({ topik, indikator, nilai, periode, sumber });

  for (const kartu of UTAMA) {
    tambah("Utama", kartu.judul, kartu.nilai, kartu.rincian, kartu.sumber);
  }
  for (const [tahun, nilai] of DERET.pdbTahunan) {
    tambah("Ekonomi", "Pertumbuhan PDB", `${angka(nilai)}%`, tahun, "BPS");
  }
  for (const lap of LAPANGAN) {
    tambah("Ekonomi", `Pangsa PDB — ${lap.nama}`, `${angka(lap.pangsa)}%`, "Triwulan III-2025", "BPS");
  }
  for (const [tahun, nilai] of DERET.sensus) {
    tambah("Penduduk", "Jumlah penduduk", `${angka(nilai)} juta jiwa`, tahun, "BPS");
  }
  for (const [tahun, nilai] of DERET.inflasiTahunan) {
    tambah("Harga", "Inflasi tahun kalender", `${angka(nilai)}%`, tahun, "BPS");
  }
  for (const [tahun, nilai] of DERET.tpt) {
    tambah("Ketenagakerjaan", "Tingkat Pengangguran Terbuka (Agustus)", `${angka(nilai)}%`, tahun, "BPS");
  }
  for (const [tahun, nilai] of DERET.kemiskinan) {
    tambah("Sosial", "Tingkat kemiskinan (Maret)", `${angka(nilai)}%`, tahun, "BPS");
  }
  for (const [tahun, nilai] of DERET.ipm) {
    tambah("Sosial", "Indeks Pembangunan Manusia", angka(nilai), tahun, "BPS");
  }
  for (const [tahun, ekspor, impor] of DAGANG_TAHUNAN) {
    tambah("Perdagangan", "Ekspor", dolar(ekspor), tahun, "BPS / Kemendag");
    tambah("Perdagangan", "Impor", dolar(impor), tahun, "BPS / Kemendag");
  }
  return baris;
}

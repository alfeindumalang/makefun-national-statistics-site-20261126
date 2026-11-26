// NusaData — halaman-halaman situs.
//
// Tiap rute hash punya satu fungsi yang mengembalikan judul dan isi
// HTML-nya. Semua teks dan angka berasal dari data.js; grafik dari
// charts.js. Fungsi-fungsi kecil di bawah merapikan pola yang
// berulang: kepala halaman, kartu, daftar fakta, batang pangsa, tabel.

import {
  angka, dolar, UTAMA, DERET, DAGANG_TAHUNAN, LAPANGAN, PENGELUARAN,
  PROVINSI, PROVINSI_MEDIAN_JIWA, PROVINSI_JUMLAH, PROFIL_SUPAS,
  KOMPONEN_HARGA, FAKTA_KERJA, FAKTA_MISKIN, DIMENSI_IPM, CATATAN_DAGANG,
  RILIS, TOPIK_TAUTAN, NAMA_TOPIK, barisPenjelajah,
} from "./data.js";
import { grafikKolom, grafikGaris } from "./charts.js";

// Amankan teks sebelum dimasukkan ke HTML.
function esc(teks) {
  return String(teks)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Kepala tiap halaman: kicker kecil, judul besar, satu paragraf pembuka.
function kepala(kicker, judul, pembuka) {
  return `<p class="kicker">${esc(kicker)}</p><h1>${esc(judul)}</h1><p class="lede">${esc(pembuka)}</p>`;
}

// Kartu putih dengan judul, isi bebas, dan catatan sumber di bawah.
function kartu(judul, isi, sumber) {
  return `<section class="card"><h2>${esc(judul)}</h2>${isi}` +
    (sumber ? `<p class="source">${esc(sumber)}</p>` : "") +
    `</section>`;
}

// Daftar pasangan keterangan–nilai (dl.facts di style.css).
function daftarFakta(pasangan) {
  const baris = pasangan
    .map(([ket, nilai]) => `<div><dt>${esc(ket)}</dt><dd>${esc(nilai)}</dd></div>`)
    .join("");
  return `<dl class="facts">${baris}</dl>`;
}

// Batang pangsa mendatar: lebar batang sebanding dengan pangsa
// terbesar, supaya perbandingan antar baris langsung terbaca.
function batangPangsa(butir) {
  const terbesar = Math.max(...butir.map(([, pangsa]) => pangsa));
  return butir
    .map(([nama, pangsa]) => {
      const lebar = ((pangsa / terbesar) * 100).toFixed(1);
      return `<div class="share"><div class="share-row"><span>${esc(nama)}</span><strong>${angka(pangsa)}%</strong></div>` +
        `<div class="share-track"><div class="share-fill" style="width:${lebar}%;background:#0f766e"></div></div></div>`;
    })
    .join("");
}

// Tabel sederhana dari kepala kolom dan baris-baris sel.
function tabel(kepalaKolom, baris) {
  const th = kepalaKolom.map((k) => `<th>${esc(k)}</th>`).join("");
  const tr = baris
    .map((sel) => `<tr>${sel.map((s) => `<td>${esc(s)}</td>`).join("")}</tr>`)
    .join("");
  return `<div class="table-wrap"><table class="data-table"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

// Sakelar Kolom/Garis untuk grafik pertumbuhan di beranda. Tombolnya
// membawa data-chart-toggle supaya main.js bisa memasangnya kembali
// setiap kali grafik digambar ulang.
function sakelarGrafik() {
  return `<div class="toggle">` +
    `<button type="button" data-chart-toggle="growth" data-kind="bar" class="active">Kolom</button>` +
    `<button type="button" data-chart-toggle="growth" data-kind="line">Garis</button>` +
    `</div>`;
}

// Grafik pertumbuhan PDB tahunan dalam salah satu dari dua bentuk.
export function grafikPertumbuhan(bentuk) {
  if (bentuk === "line") {
    return grafikGaris(DERET.pdbTahunan, { bawah: -3, atas: 6, warna: "#0f766e" });
  }
  return grafikKolom(DERET.pdbTahunan, { bawah: -3, atas: 6 });
}

// ---- Beranda -------------------------------------------------------

function beranda() {
  const kartuUtama = UTAMA.map((k) =>
    `<article class="stat kpi"><p class="stat-label">${esc(k.judul)}</p>` +
    `<p class="stat-value">${esc(k.nilai)}</p>` +
    `<p class="stat-detail">${esc(k.rincian)}</p>` +
    `<p class="stat-origin">${esc(k.sumber)}</p></article>`,
  ).join("");
  const rilis = RILIS.map((r) =>
    `<li><p class="release-date">${esc(r.tanggal)}</p>` +
    `<p class="release-title">${esc(r.judul)}</p><p>${esc(r.isi)}</p></li>`,
  ).join("");
  const tautan = TOPIK_TAUTAN.map(([rute, judul, ket]) =>
    `<a href="#/${rute}">${esc(judul)} — ${esc(ket)}</a>`,
  ).join("");
  return {
    judul: "Beranda",
    isi:
      kepala("Portal Statistik Indonesia", "Indonesia dalam angka",
        "Angka resmi Indonesia, diterangkan dengan bahasa yang mudah diikuti. Delapan angka utama di bawah ini mengikuti rilis resmi terbaru.") +
      `<div class="stat-grid">${kartuUtama}</div>` +
      `<div class="duo">` +
      kartu("Pertumbuhan ekonomi, 2019–2025",
        sakelarGrafik() +
        `<div id="growth-chart">${grafikPertumbuhan("bar")}</div>`,
        "BPS — Berita Resmi Statistik Pertumbuhan Ekonomi — persen year-on-year.") +
      kartu("Inflasi bulanan 2025",
        grafikGaris(DERET.inflasiBulanan, { bawah: -1, atas: 3, warna: "#15803d" }),
        "BPS — Berita Resmi Statistik Inflasi, rilis bulanan 2025 — persen year-on-year. Februari 2025 sempat deflasi −0,09%.") +
      `</div>` +
      kartu("Rilis angka terbaru", `<ul class="releases">${rilis}</ul>`, "") +
      kartu("Jelajahi menurut topik", `<div class="topic-links">${tautan}</div>`, ""),
  };
}

// ---- Ekonomi -------------------------------------------------------

function ekonomi() {
  const tabelLapangan = tabel(
    ["Lapangan usaha", "Pangsa PDB", "Tumbuh (yoy)"],
    LAPANGAN.map((lap) => [
      lap.nama,
      `${angka(lap.pangsa)}%`,
      lap.tumbuh === null ? "terkontraksi" : `${angka(lap.tumbuh)}%`,
    ]),
  );
  const tabelPengeluaran = tabel(
    ["Komponen", "Pangsa PDB"],
    PENGELUARAN.map(([nama, pangsa]) => [nama, `${angka(pangsa)}%`]),
  );
  return {
    judul: "Ekonomi",
    isi:
      kepala("Ekonomi", "Perekonomian Indonesia",
        "Produk Domestik Bruto (PDB) Triwulan III-2025 mencapai Rp6.060,0 triliun atas dasar harga berlaku dan Rp3.444,8 triliun atas dasar harga konstan 2010, tumbuh 5,04% dibanding Triwulan III-2024.") +
      `<div class="duo">` +
      kartu("Pertumbuhan PDB per triwulan",
        grafikGaris(DERET.pdbTriwulan, { bawah: 0, atas: 6, warna: "#0f766e" }),
        "BPS — BRS No. 102/11/Th. XXVIII, 5 November 2025 — persen year-on-year.") +
      kartu("Pertumbuhan PDB tahunan",
        grafikKolom(DERET.pdbTahunan, { bawah: -3, atas: 6 }),
        "BPS — Berita Resmi Statistik Pertumbuhan Ekonomi — persen year-on-year. Tahun 2020 terkontraksi karena pandemi.") +
      `</div>` +
      `<div class="duo">` +
      kartu("Lima lapangan usaha terbesar (pangsa PDB Triwulan III-2025)",
        batangPangsa(LAPANGAN.map((lap) => [lap.nama, lap.pangsa])),
        "BPS — Pertumbuhan Ekonomi Triwulan III-2025 — Kelima lapangan usaha ini menyumbang 65,02% dari PDB.") +
      kartu("Lapangan usaha: pangsa dan pertumbuhan", tabelLapangan,
        "Pertumbuhan tertinggi: jasa pendidikan 10,59% (yoy). Sumber: BPS, 5 November 2025.") +
      `</div>` +
      kartu("PDB menurut pengeluaran, Triwulan III-2025", tabelPengeluaran,
        "BPS — Pertumbuhan Ekonomi Triwulan III-2025. Konsumsi rumah tangga menjadi sumber pertumbuhan terbesar (2,54 persen poin), diikuti ekspor neto (2,15) dan PMTB (1,59).") +
      kartu("Catatan wilayah",
        `<p>Pulau Jawa tetap menjadi penggerak utama perekonomian: tumbuh 5,17% pada Triwulan III-2025 dengan kontribusi 56,68% terhadap PDB nasional. Sulawesi tumbuh 5,84%, Sumatera 4,90%, Kalimantan 4,70%, dan Maluku–Papua 2,64%.</p>`,
        "Sumber: BPS — Pertumbuhan Ekonomi Triwulan III-2025."),
  };
}

// ---- Penduduk ------------------------------------------------------

function penduduk() {
  const barisProvinsi = PROVINSI.map((p) => [
    String(p.urutan),
    p.nama,
    p.jiwa.toLocaleString("id-ID"),
  ]);
  return {
    judul: "Penduduk",
    isi:
      kepala("Penduduk", "Penduduk Indonesia",
        "Pada pertengahan 2025 penduduk Indonesia mencapai 284,44 juta jiwa dan tumbuh 1,01% dalam setahun. Survei Penduduk Antar Sensus (SUPAS) 2025 mencatat 284,67 juta jiwa.") +
      kartu("Jumlah penduduk, 2010–2025",
        grafikKolom(DERET.sensus, { bawah: 0, atas: 300 }),
        "BPS — Sensus Penduduk dan SUPAS; 2025 proyeksi pertengahan tahun — juta jiwa.") +
      kartu("Profil penduduk (SUPAS 2025)", daftarFakta(PROFIL_SUPAS),
        "Sumber: BPS — Hasil Survei Penduduk Antar Sensus (SUPAS) 2025") +
      kartu("Provinsi terpadat dan tersedikit, 2025",
        tabel(["Peringkat", "Provinsi", "Penduduk (jiwa)"], barisProvinsi),
        `BPS, Proyeksi Penduduk 2020–2050, pertengahan 2025. Provinsi median: ${PROVINSI_MEDIAN_JIWA.toLocaleString("id-ID")} jiwa dari ${PROVINSI_JUMLAH} provinsi. Jawa Barat, Jawa Timur, dan Jawa Tengah selalu menjadi tiga provinsi terpadat.`) +
      kartu("Membaca angka ini",
        `<p>Lebih dari separuh penduduk tinggal di Pulau Jawa, sementara Papua Selatan menjadi provinsi dengan penduduk paling sedikit (549.651 jiwa). Generasi Z adalah kelompok usia terbesar, dan penduduk lanjut usia sudah mencapai hampir 12% — dua hal yang sama-sama penting untuk perencanaan sekolah, lapangan kerja, dan layanan kesehatan.</p>`,
        ""),
  };
}

// ---- Harga ---------------------------------------------------------

function harga() {
  return {
    judul: "Harga",
    isi:
      kepala("Harga", "Inflasi dan harga",
        "Inflasi Oktober 2025 tercatat 2,86% year-on-year — naik dari 2,65% pada September 2025 — dan tetap berada dalam sasaran Bank Indonesia sebesar 2,5±1%.") +
      kartu("Inflasi bulanan 2025",
        grafikGaris(DERET.inflasiBulanan, { bawah: -1, atas: 3, warna: "#15803d" }),
        "BPS — Berita Resmi Statistik Inflasi, rilis bulanan 2025 — persen year-on-year.") +
      kartu("Inflasi tahun kalender",
        grafikKolom(DERET.inflasiTahunan, { bawah: 0, atas: 6 }),
        "BPS — Inflasi tahun kalender — persen. Puncak 2022 (5,51%) terjadi saat harga energi global melonjak.") +
      kartu("Komponen inflasi, Oktober 2025",
        tabel(["Komponen", "Inflasi (yoy)"], KOMPONEN_HARGA),
        "BPS dan Bank Indonesia — Analisis Inflasi Oktober 2025. IHK Oktober 2025 tercatat 109,04 (Oktober 2024: 106,01).") +
      kartu("Apa artinya?",
        `<p>Inflasi inti 2,36% menunjukkan tekanan harga dari sisi permintaan tetap terjaga, sementara makanan bergejolak 6,59% menjadi penyumbang kenaikan terbesar. Untuk rumah tangga, angka yang paling terasa adalah harga pangan: kelompok makanan, minuman, dan tembakau naik 4,99% dalam setahun.</p>`,
        "Sumber: BPS, 3 November 2025; Bank Indonesia, Analisis Inflasi Oktober 2025."),
  };
}

// ---- Kerja ---------------------------------------------------------

function kerja() {
  return {
    judul: "Kerja",
    isi:
      kepala("Ketenagakerjaan", "Pengangguran di Indonesia",
        "Tingkat Pengangguran Terbuka (TPT) pada Agustus 2025 sebesar 4,85%, turun dari 4,91% pada Agustus 2024. Jumlah penganggur tercatat 7,46 juta orang.") +
      kartu("Tingkat Pengangguran Terbuka, Agustus",
        grafikKolom(DERET.tpt, { bawah: 0, atas: 7 }),
        "BPS — Keadaan Ketenagakerjaan Agustus — persen. TPT mengukur penganggur terhadap angkatan kerja.") +
      kartu("Yang perlu diperhatikan", daftarFakta(FAKTA_KERJA),
        "Sumber: BPS — Keadaan Ketenagakerjaan Agustus — Agustus 2025.") +
      `<p>Turunnya TPT seiring bertambahnya 1,90 juta penduduk bekerja dibanding Agustus 2024. Namun lulusan SMK masih menghadapi TPT tertinggi (8,63%), yang menunjukkan pekerjaan yang tersedia belum sepenuhnya cocok dengan keterampilan lulusan kejuruan.</p>`,
  };
}

// ---- Sosial --------------------------------------------------------

function sosial() {
  return {
    judul: "Sosial",
    isi:
      kepala("Sosial", "Kemiskinan dan pembangunan manusia",
        "Tingkat kemiskinan Maret 2025 turun ke 8,47% — terendah sejak pandemi — sementara Indeks Pembangunan Manusia 2024 mencapai 75,02 dan terus naik ke 75,90 pada 2025.") +
      `<div class="duo">` +
      kartu("Tingkat kemiskinan, Maret",
        grafikKolom(DERET.kemiskinan, { bawah: 0, atas: 15 }),
        "BPS — Profil Kemiskinan, Susenas Maret — persen penduduk.") +
      kartu("Indeks Pembangunan Manusia",
        grafikKolom(DERET.ipm, { bawah: 0, atas: 80 }),
        "BPS — Indeks Pembangunan Manusia — skor 0–100, kategori tinggi.") +
      `</div>` +
      `<div class="duo">` +
      kartu("Kemiskinan, Maret 2025", daftarFakta(FAKTA_MISKIN),
        "Sumber: BPS — Profil Kemiskinan, Susenas Maret — Susenas Maret 2025, 345 ribu rumah tangga sampel.") +
      kartu("Dimensi IPM, 2024", daftarFakta(DIMENSI_IPM),
        "Sumber: BPS — Indeks Pembangunan Manusia — IPM 2024, Volume 19, 2025.") +
      `</div>` +
      `<p>IPM mengukur tiga hal: umur panjang dan hidup sehat, pengetahuan, dan standar hidup layak. Ketiganya membaik pada 2024.</p>`,
  };
}

// ---- Perdagangan ---------------------------------------------------

function perdagangan() {
  const barisDagang = DAGANG_TAHUNAN.map(([tahun, ekspor, impor]) => [
    tahun,
    dolar(ekspor),
    dolar(impor),
    dolar(ekspor - impor),
  ]);
  return {
    judul: "Perdagangan",
    isi:
      kepala("Perdagangan", "Ekspor, impor, dan neraca dagang",
        "Indonesia mencatat surplus perdagangan US$31,04 miliar pada 2024 — tahun kelima berturut-turut surplus sejak Mei 2020. Ekspor mencapai US$264,70 miliar, naik 2,29% dari 2023.") +
      kartu("Surplus perdagangan, 2021–2024",
        grafikKolom(DERET.surplus, { bawah: 0, atas: 60 }),
        "BPS, diolah Pusat Data dan Sistem Informasi Kemendag — miliar dolar AS.") +
      kartu("Catatan perdagangan 2024", daftarFakta(CATATAN_DAGANG),
        "Sumber: BPS, diolah Pusat Data dan Sistem Informasi Kemendag.") +
      kartu("Ekspor dan impor, 2021–2024",
        tabel(["Tahun", "Ekspor", "Impor", "Surplus"], barisDagang),
        "BPS, diolah Pusat Data dan Sistem Informasi Kemendag — miliar dolar AS. Ekspor 2022 (US$291,90 miliar) adalah yang tertinggi dalam deret ini, didorong harga komoditas.") +
      kartu("Membaca neraca dagang",
        `<p>Surplus berarti Indonesia menjual lebih banyak ke luar negeri daripada membeli. Pada 2024 surplus menyusut dari US$36,89 miliar (2023) karena impor tumbuh lebih cepat — terutama bahan baku dan barang modal, yang justru menandakan aktivitas industri di dalam negeri sedang berjalan.</p>`,
        ""),
  };
}

// ---- Penjelajah data -----------------------------------------------

function penjelajah() {
  const baris = barisPenjelajah();
  const opsiTopik = NAMA_TOPIK.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");
  const kolom = [
    ["topic", "Topik"],
    ["indicator", "Indikator"],
    ["value", "Nilai"],
    ["period", "Periode"],
    ["source", "Sumber"],
  ];
  const kepalaTabel = kolom
    .map(([kunci, label]) => `<th><button type="button" data-sort="${kunci}">${esc(label)}</button></th>`)
    .join("");
  const isiTabel = baris
    .map((b) =>
      `<tr><td>${esc(b.topik)}</td><td>${esc(b.indikator)}</td><td>${esc(b.nilai)}</td>` +
      `<td>${esc(b.periode)}</td><td>${esc(b.sumber)}</td></tr>`,
    )
    .join("");
  return {
    judul: "Data",
    isi:
      kepala("Penjelajah Data", "Semua indikator dalam satu tabel",
        "Cari berdasarkan nama indikator atau saring menurut topik. Tabel ini memuat 54 indikator; setiap baris membawa nilai, periode, dan sumbernya — klik judul kolom untuk mengurutkan.") +
      `<div class="explorer-tools">` +
      `<label>Cari indikator<input id="explorer-search" type="search" placeholder="Ketik untuk mencari"></label>` +
      `<label>Topik<select id="explorer-topic"><option value="">Semua topik</option>${opsiTopik}</select></label>` +
      `<p id="explorer-count">${baris.length} dari ${baris.length} indikator ditampilkan.</p>` +
      `</div>` +
      `<div class="table-wrap"><table class="data-table" id="explorer-table">` +
      `<thead><tr>${kepalaTabel}</tr></thead><tbody>${isiTabel}</tbody></table></div>` +
      `<p class="source">Semua angka di tabel ini berasal dari data.js situs ini, yang mengutip publikasi resmi BPS, Bank Indonesia, dan Kementerian Keuangan.</p>`,
  };
}

// ---- Tentang --------------------------------------------------------

function tentang() {
  return {
    judul: "Tentang",
    isi:
      kepala("Tentang", "Tentang NusaData",
        "NusaData adalah portal statistik Indonesia yang menyajikan angka resmi dengan penjelasan yang mudah dibaca — tanpa jargon yang tidak perlu dan tanpa angka tanpa sumber.") +
      kartu("Cara membaca situs ini",
        `<ul class="plain-list">` +
        `<li>Setiap angka membawa sumber dan periode. Kalau sebuah angka tidak punya sumber yang bisa dicek, ia tidak tampil di sini.</li>` +
        `<li>Grafik selalu ditemani tabel atau daftar angka. Grafik membantu melihat pola; angka pastinya ada di tabel di bawah atau di samping grafik.</li>` +
        `<li>“yoy” berarti dibanding periode yang sama tahun lalu, “qtq” dibanding triwulan sebelumnya, dan “c-to-c” berarti kumulatif sejak awal tahun dibanding periode yang sama tahun lalu.</li>` +
        `<li>Situs ini bekerja tanpa internet. Semua halaman, grafik, dan angka tersimpan di berkas situs ini sendiri.</li>` +
        `</ul>`,
        "") +
      kartu("Sumber data",
        `<ul class="plain-list">` +
        `<li>Badan Pusat Statistik (BPS) — Berita Resmi Statistik dan publikasi: pertumbuhan ekonomi, inflasi, ketenagakerjaan, kemiskinan, IPM, dan penduduk.</li>` +
        `<li>Bank Indonesia (BI) — Analisis Inflasi Oktober 2025 dan sasaran inflasi 2,5±1%.</li>` +
        `<li>Kementerian Keuangan (Kemenkeu) — siaran pers neraca perdagangan 2024.</li>` +
        `<li>Kementerian Perdagangan (Kemendag) — Pusat Data dan Sistem Informasi, diolah dari data BPS.</li>` +
        `<li>Kementerian Kesehatan — Profil Kesehatan Indonesia 2025, untuk estimasi penduduk provinsi.</li>` +
        `</ul><p>Angka terakhir diperbarui: November 2025 (rilis SUPAS 2025: 30 Juni 2026).</p>`,
        "") +
      kartu("Batasan",
        `<p>Situs ini menyajikan angka yang sudah diterbitkan hingga November 2025. Angka dapat direvisi oleh instansi penerbitnya pada rilis berikutnya. Untuk angka terbaru, periksa publikasi resmi di bps.go.id, bi.go.id, dan kemenkeu.go.id.</p>`,
        ""),
  };
}

// ---- Peta rute -----------------------------------------------------

// Kunci "" adalah beranda; kunci lain mengikuti bagian hash sesudah "#/".
export const HALAMAN = {
  "": beranda,
  ekonomi,
  penduduk,
  harga,
  kerja,
  sosial,
  perdagangan,
  data: penjelajah,
  tentang,
};

// Tautan navigasi utama, sesuai urutan tampilnya di kepala situs.
export const NAVIGASI = [
  ["", "Beranda"],
  ["ekonomi", "Ekonomi"],
  ["penduduk", "Penduduk"],
  ["harga", "Harga"],
  ["kerja", "Kerja"],
  ["sosial", "Sosial"],
  ["perdagangan", "Perdagangan"],
  ["data", "Data"],
  ["tentang", "Tentang"],
];

// NusaData — router hash dan kendali halaman.
//
// Situs ini satu halaman: hash sesudah "#/" memilih rute, lalu
// main.js menggambar halaman dari views.js ke dalam <main id="app">.
// Kendali yang hidup hanya dua: sakelar Kolom/Garis di beranda dan
// penjelajah data (cari, saring topik, urutkan kolom).

import { HALAMAN, NAVIGASI, grafikPertumbuhan } from "./views.js";
import { barisPenjelajah } from "./data.js";

const wadah = document.getElementById("app");
const navigasi = document.getElementById("main-nav");

// Bangun tautan navigasi sekali di awal.
for (const [rute, label] of NAVIGASI) {
  const tautan = document.createElement("a");
  tautan.href = `#/${rute}`;
  tautan.textContent = label;
  navigasi.append(tautan);
}

// Rute dari hash saat ini, misalnya "#/ekonomi" menjadi "ekonomi".
function ruteSaatIni() {
  return location.hash.replace(/^#\/?/, "").split("/")[0] || "";
}

// Tandai tautan navigasi yang halamannya sedang dibuka.
function tandaiNavigasi(rute) {
  for (const tautan of navigasi.querySelectorAll("a")) {
    const milik = tautan.getAttribute("href") === `#/${rute}`;
    if (milik) tautan.setAttribute("aria-current", "page");
    else tautan.removeAttribute("aria-current");
  }
}

// Sakelar Kolom/Garis di beranda: gambar ulang grafiknya saja,
// tanpa memuat ulang halaman.
function pasangSakelar() {
  const tombol = wadah.querySelectorAll("[data-chart-toggle='growth']");
  for (const btn of tombol) {
    btn.addEventListener("click", () => {
      for (const lain of tombol) lain.classList.remove("active");
      btn.classList.add("active");
      const tempat = document.getElementById("growth-chart");
      if (tempat) tempat.innerHTML = grafikPertumbuhan(btn.dataset.kind);
    });
  }
}

// ---- Penjelajah data -----------------------------------------------
// Baris tidak digambar ulang saat disaring atau diurutkan: saringan
// menyembunyikan baris (display none), pengurutan memindahkan baris
// di dalam tbody. Urutan aslinya adalah urutan barisPenjelajah().

let kolomUrut = null;
let urutNaik = true;

// Ambil angka pertama dari sebuah sel, bila ada, untuk pengurutan
// numerik. Titik ribuan Indonesia dibuang, koma desimal dipertahankan.
function angkaDariTeks(teks) {
  const cocok = teks.match(/-?[\d.,]+/);
  if (!cocok) return null;
  let mentah = cocok[0];
  if (mentah.includes(",") && mentah.includes(".")) mentah = mentah.replaceAll(".", "");
  else if (mentah.includes(".") && !mentah.includes(",")) mentah = mentah.replaceAll(".", "");
  const nilai = Number(mentah.replace(",", "."));
  return Number.isFinite(nilai) ? nilai : null;
}

function bandingkanSel(a, b) {
  const angkaA = angkaDariTeks(a);
  const angkaB = angkaDariTeks(b);
  if (angkaA !== null && angkaB !== null) return angkaA - angkaB;
  return a.localeCompare(b, "id");
}

function pasangPenjelajah() {
  const cari = document.getElementById("explorer-search");
  const topik = document.getElementById("explorer-topic");
  const hitung = document.getElementById("explorer-count");
  const tabel = document.getElementById("explorer-table");
  const tubuh = tabel.querySelector("tbody");
  const semuaBaris = [...tubuh.querySelectorAll("tr")];
  const total = semuaBaris.length;

  // Saring berdasarkan kata kunci (nama indikator) dan pilihan topik.
  function saring() {
    const kata = cari.value.trim().toLowerCase();
    const topikDipilih = topik.value;
    let terlihat = 0;
    for (const baris of semuaBaris) {
      const sel = baris.querySelectorAll("td");
      const cocokKata = !kata || sel[1].textContent.toLowerCase().includes(kata);
      const cocokTopik = !topikDipilih || sel[0].textContent === topikDipilih;
      const tampil = cocokKata && cocokTopik;
      baris.style.display = tampil ? "" : "none";
      if (tampil) terlihat += 1;
    }
    hitung.textContent = `${terlihat} dari ${total} indikator ditampilkan.`;
  }

  // Urutkan berdasarkan kolom yang diklik; klik kedua membalik arah.
  function urutkan(kunci) {
    const indeks = { topic: 0, indicator: 1, value: 2, period: 3, source: 4 }[kunci];
    if (indeks === undefined) return;
    if (kolomUrut === kunci) urutNaik = !urutNaik;
    else { kolomUrut = kunci; urutNaik = true; }
    const arah = urutNaik ? 1 : -1;
    const terurut = [...semuaBaris].sort((a, b) => {
      const teksA = a.querySelectorAll("td")[indeks].textContent;
      const teksB = b.querySelectorAll("td")[indeks].textContent;
      return arah * bandingkanSel(teksA, teksB);
    });
    for (const baris of terurut) tubuh.append(baris);
  }

  cari.addEventListener("input", saring);
  topik.addEventListener("change", saring);
  for (const tombol of tabel.querySelectorAll("[data-sort]")) {
    tombol.addEventListener("click", () => urutkan(tombol.dataset.sort));
  }
}

// ---- Gambar halaman -------------------------------------------------

function tampilkan() {
  const rute = ruteSaatIni();
  const gambar = HALAMAN[rute] ?? HALAMAN[""];
  const halaman = gambar();
  wadah.innerHTML = halaman.isi;
  document.title = `NusaData — ${halaman.judul} | Portal Statistik Indonesia`;
  tandaiNavigasi(rute);
  window.scrollTo(0, 0);
  if (rute === "") pasangSakelar();
  if (rute === "data") pasangPenjelajah();
}

window.addEventListener("hashchange", tampilkan);
tampilkan();

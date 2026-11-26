// NusaData — grafik SVG tanpa pustaka luar.
//
// Dua jenis grafik saja, keduanya digambar dari deret [label, nilai]:
// kolom (batang tegak, dipakai untuk deret tahunan) dan garis (dengan
// area tipis di bawahnya, dipakai untuk deret bulanan dan triwulanan).
// Sumbu tegaknya selalu memakai lima tanda: batas bawah, batas atas,
// dan tiga titik di antaranya, supaya tiap grafik mudah dibandingkan.

import { angka } from "./data.js";

// Ukuran kanvas dan ruang tepinya, dalam satuan viewBox.
const LEBAR = 640;
const TINGGI = 300;
const TEPI_KIRI = 46;
const TEPI_KANAN = 12;
const TEPI_ATAS = 24;
const TEPI_BAWAH = 30;

// Lima tanda sumbu dari batas bawah sampai batas atas.
export function tandaSumbu(bawah, atas) {
  const langkah = (atas - bawah) / 4;
  return [0, 1, 2, 3, 4].map((i) => bawah + i * langkah);
}

// Fungsi posisi tegak: nilai menjadi koordinat y di dalam kanvas.
function posisiY(nilai, bawah, atas) {
  const tinggiGambar = TINGGI - TEPI_ATAS - TEPI_BAWAH;
  return TEPI_ATAS + ((atas - nilai) / (atas - bawah)) * tinggiGambar;
}

// Garis-garis mendatar beserta label angkanya di sisi kiri.
function garisSumbu(bawah, atas) {
  const lebarGambar = LEBAR - TEPI_KIRI - TEPI_KANAN;
  return tandaSumbu(bawah, atas)
    .map((tanda) => {
      const y = posisiY(tanda, bawah, atas);
      return (
        `<line x1="${TEPI_KIRI}" y1="${y}" x2="${TEPI_KIRI + lebarGambar}" y2="${y}" stroke="#e6edf0" stroke-width="1" />` +
        `<text x="${TEPI_KIRI - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="#68798a">${angka(tanda)}</text>`
      );
    })
    .join("");
}

// Garis nol yang lebih tegas, bila nol berada di dalam rentang.
function garisNol(bawah, atas) {
  if (bawah >= 0 || atas <= 0) return "";
  const y = posisiY(0, bawah, atas);
  const lebarGambar = LEBAR - TEPI_KIRI - TEPI_KANAN;
  return `<line x1="${TEPI_KIRI}" y1="${y}" x2="${TEPI_KIRI + lebarGambar}" y2="${y}" stroke="#c3d2da" stroke-width="1.5" />`;
}

// Grafik kolom: satu batang per titik. Batang negatif (misalnya
// kontraksi 2020) digambar ke bawah dari garis nol dengan warna merah.
export function grafikKolom(deret, { bawah, atas, warna = "#0f766e", warnaNegatif = "#b91c1c" }) {
  const jumlah = deret.length;
  const lebarSlot = (LEBAR - TEPI_KIRI - TEPI_KANAN) / jumlah;
  const lebarBatang = Math.min(48, lebarSlot * 0.62);
  const yNol = posisiY(0, bawah, atas);
  const batang = deret
    .map(([label, nilai], i) => {
      const tengah = TEPI_KIRI + lebarSlot * (i + 0.5);
      const yNilai = posisiY(nilai, bawah, atas);
      const atasBatang = Math.min(yNilai, yNol);
      const tinggiBatang = Math.abs(yNilai - yNol);
      const labelY = Math.min(yNilai, yNol) - 7;
      return (
        `<rect x="${(tengah - lebarBatang / 2).toFixed(1)}" y="${atasBatang.toFixed(1)}" ` +
        `width="${lebarBatang.toFixed(1)}" height="${Math.max(tinggiBatang, 1).toFixed(1)}" rx="3" ` +
        `fill="${nilai < 0 ? warnaNegatif : warna}" />` +
        `<text x="${tengah.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#17222e">${angka(nilai)}</text>` +
        `<text x="${tengah.toFixed(1)}" y="${TINGGI - 8}" text-anchor="middle" font-size="12" fill="#68798a">${label}</text>`
      );
    })
    .join("");
  return (
    `<svg viewBox="0 0 ${LEBAR} ${TINGGI}" role="img" xmlns="http://www.w3.org/2000/svg">` +
    garisSumbu(bawah, atas) + garisNol(bawah, atas) + batang +
    `</svg>`
  );
}

// Grafik garis: titik-titik dihubungkan satu garis, dengan area tipis
// di bawah garis dan lingkaran kecil di tiap titik. Label nilai duduk
// di atas titiknya, label kategori di bawah sumbu.
export function grafikGaris(deret, { bawah, atas, warna = "#15803d" }) {
  const jumlah = deret.length;
  const lebarSlot = (LEBAR - TEPI_KIRI - TEPI_KANAN) / jumlah;
  const titik = deret.map(([label, nilai], i) => ({
    label,
    nilai,
    x: TEPI_KIRI + lebarSlot * (i + 0.5),
    y: posisiY(nilai, bawah, atas),
  }));
  const yNol = posisiY(0, bawah, atas);
  const garis = titik.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${garis} L${titik[titik.length - 1].x.toFixed(1)},${yNol.toFixed(1)} ` +
    `L${titik[0].x.toFixed(1)},${yNol.toFixed(1)} Z`;
  const lingkaran = titik
    .map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#ffffff" stroke="${warna}" stroke-width="2" />`)
    .join("");
  const labelNilai = titik
    .map((p) =>
      `<text x="${p.x.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#17222e">${angka(p.nilai)}</text>`,
    )
    .join("");
  const labelKategori = titik
    .map((p) =>
      `<text x="${p.x.toFixed(1)}" y="${TINGGI - 8}" text-anchor="middle" font-size="12" fill="#68798a">${p.label}</text>`,
    )
    .join("");
  return (
    `<svg viewBox="0 0 ${LEBAR} ${TINGGI}" role="img" xmlns="http://www.w3.org/2000/svg">` +
    garisSumbu(bawah, atas) + garisNol(bawah, atas) +
    `<path d="${area}" fill="${warna}" fill-opacity="0.08" />` +
    `<path d="${garis}" fill="none" stroke="${warna}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />` +
    lingkaran + labelNilai + labelKategori +
    `</svg>`
  );
}

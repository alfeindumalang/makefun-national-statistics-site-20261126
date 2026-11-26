# NusaData — Portal Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/alfeindumalang/makefun-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/alfeindumalang/makefun-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Portal statistik nasional Indonesia yang berjalan sepenuhnya dari berkas
statis, tanpa satu pun permintaan jaringan. Beranda menyajikan delapan
angka utama; halaman Ekonomi, Penduduk, Harga, Kerja, Sosial, dan
Perdagangan masing-masing membawa grafik, tabel, dan penjelasan; halaman
Data memuat penjelajah semua indikator (cari, saring, urutkan); halaman
Tentang menjelaskan sumber dan cara membaca angka.

## Angka

Semua angka adalah angka resmi yang sudah diterbitkan — Badan Pusat
Statistik (BPS), Bank Indonesia, dan Kementerian Keuangan — dan setiap
angka di situs membawa sumber beserta periodenya. Contoh: penduduk
284,44 juta jiwa (pertengahan 2025, BPS); PDB Triwulan III-2025
Rp6.060,0 triliun, tumbuh 5,04% (yoy); inflasi Oktober 2025 sebesar
2,86% (yoy); TPT Agustus 2025 sebesar 4,85%; kemiskinan Maret 2025
sebesar 8,47%; IPM 2024 sebesar 75,02; ekspor 2024 sebesar US$264,70
miliar dengan surplus US$31,04 miliar.

## Menjalankan

```sh
node serve.ts        # http://localhost:8080
```

## Menyerahkan (cara kerja program)

`main.ts` (Node 22, pustaka standar saja) menyalin `app/` dan
`screenshots/` ke direktori keluaran lalu menulis `dossier.json` dengan
`buildDossier` dari `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Struktur

- `app/index.html` — kerangka halaman
- `app/style.css` — seluruh gaya situs
- `app/data.js` — angka-angka beserta sumbernya
- `app/charts.js` — grafik SVG (kolom, garis, batang mendatar)
- `app/views.js` — halaman-halaman per rute
- `app/main.js` — router hash dan semua kendali (sakelar grafik,
  pencarian, saringan, pengurutan)
- `screenshots/` — 4 potret layar asli dari situs ini
- `vendor/makefun-frontend.ts` — pustaka make.fun, tidak diubah
- `shots.json` — daftar potret layar dan tampilannya

## Lisensi

MIT — lihat `LICENSE`.

// NusaData — program penyerahan entry (Node 22, pustaka standar saja).
//
// Situsnya sudah jadi sebagai berkas statis di app/ (halaman, gaya, dan
// skripnya), dan potret layarnya ada di screenshots/. Program ini hanya
// bertugas menyerahkannya: menyalin kedua folder itu ke direktori keluaran
// lalu menulis dossier.json di sana, memakai pustaka vendored make.fun.
// vendor/makefun-frontend.ts dibiarkan apa adanya — pemeriksa membangun
// ulang dossier dengan pustaka yang sama dan membandingkannya byte demi
// byte dengan yang program ini tulis.
//
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Batas-batas yang dipakai pemeriksa (lihat RULES.txt di kit): teks dossier
// dibatasi 160 KiB, paling banyak 4 potret layar @ 256 KiB, app/ paling
// banyak 993 berkas dan direktori dengan total 16 MiB.
const DOSSIER_LIMITS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function syncFolder(name) {
  const from = join(repoRoot, name);
  const to = join(outputDir, name);
  mkdirSync(to, { recursive: true });
  if (existsSync(from)) cpSync(from, to, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
syncFolder('app');
syncFolder('screenshots');

const dossierPath = join(outputDir, 'dossier.json');
writeFileSync(dossierPath, buildDossier(outputDir, DOSSIER_LIMITS));

// Ringkasan singkat di akhir, supaya dua run yang berbeda isinya
// langsung terlihat bila ada yang berubah.
console.log(`dossier ditulis: ${dossierPath}`);

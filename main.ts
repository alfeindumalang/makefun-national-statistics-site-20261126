// NusaData — program penyerahan entri make.fun.
//
// Menyalin situs (app/) dan potret layarnya (screenshots/) dari repo
// ini ke direktori keluaran, lalu menulis dossier.json dengan
// buildDossier dari pustaka make.fun. Dijalankan dua kali oleh grader;
// kedua jalan harus menulis byte yang sama.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Tanpa variabel itu, keluarannya ditulis ke /output. Hanya pustaka
// standar Node yang dipakai; tidak ada jaringan, tidak ada jam.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// Repo ini: direktori tempat main.ts berada.
const repo = dirname(fileURLToPath(import.meta.url));

// Direktori keluaran: dari lingkungan, atau /output bila tidak diset.
const keluaran = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Batas-batas gerbang bounty ini, seperti yang dipakai pemeriksanya.
const BATAS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
};

// Bersihkan keluaran lama supaya tidak ada berkas sisa yang terbawa.
rmSync(keluaran, { recursive: true, force: true });
mkdirSync(keluaran, { recursive: true });

// Salin situs dan potret layarnya apa adanya. Gagal dengan pesan
// yang jelas bila salah satu direktorinya tidak ada, supaya jalan
// yang gagal tidak menulis keluaran setengah jadi.
for (const nama of ["app", "screenshots"]) {
  if (!existsSync(join(repo, nama))) {
    throw new Error(`direktori ${nama}/ tidak ditemukan di ${repo}`);
  }
}
cpSync(join(repo, "app"), join(keluaran, "app"), { recursive: true });
cpSync(join(repo, "screenshots"), join(keluaran, "screenshots"), { recursive: true });

// Tulis dossier yang sama seperti yang ditulis pemeriksa dari berkas ini.
const dossier = buildDossier(keluaran, BATAS);
writeFileSync(join(keluaran, "dossier.json"), dossier);
console.log(`dossier.json ditulis: ${dossier.length} byte ke ${keluaran}`);

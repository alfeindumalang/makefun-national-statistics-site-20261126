// Server pengembangan kecil untuk NusaData (Node 22, pustaka standar
// saja): menyajikan app/ di http://localhost:8080 supaya situs bisa dibuka
// di peramban desktop dan diuji ukurannya. Bukan server produksi — ia
// hanya mengirim berkas statis dan menolak semua path yang keluar dari
// folder app/.
//
//   node serve.ts [--port <nomor>]

import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(fileURLToPath(new URL('./app', import.meta.url)));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

function pickPort() {
  const flag = process.argv.indexOf('--port');
  const wanted = flag === -1 ? 8080 : Number(process.argv[flag + 1]);
  return Number.isInteger(wanted) && wanted > 0 && wanted < 65536 ? wanted : 8080;
}

function serveFile(req, res) {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let path = url.pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    res.writeHead(400).end('bad request');
    return;
  }
  if (path.endsWith('/')) path += 'index.html';
  const file = resolve(join(appRoot, normalize(path)));
  if (file !== appRoot && !file.startsWith(appRoot + sep)) {
    res.writeHead(403).end('forbidden');
    return;
  }
  let size;
  try {
    const info = statSync(file);
    if (!info.isFile()) throw new Error('not a file');
    size = info.size;
  } catch {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, {
    'content-type': MIME[extname(file)] ?? 'application/octet-stream',
    'content-length': size,
  });
  createReadStream(file).pipe(res);
}

const port = pickPort();
createServer(serveFile).listen(port, () => {
  console.log(`NusaData di http://localhost:${port}/`);
});

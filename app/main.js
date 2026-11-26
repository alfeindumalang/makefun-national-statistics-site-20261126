// NusaData — penggerak halaman dan kendali di dalamnya.
//
// Berkas ini mengerjakan tiga hal: merender halaman sesuai hash di alamat,
// memasang sakelar jenis grafik di beranda, dan menghidupkan penjelajah
// data (pencarian, saringan topik, pengurutan kolom). Setiap kendali di sini
// benar-benar berfungsi — tidak ada tombol pajangan.

import { ROUTES, NAV_LINKS, pageHome } from './views.js';
import { GROWTH_YEARLY } from './data.js';
import { columnChart, trendChart } from './charts.js';

const appRoot = document.getElementById('app');
const navRoot = document.getElementById('main-nav');

navRoot.innerHTML = NAV_LINKS.map((l) => `<a href="${l.href}" data-route="${l.route}">${l.label}</a>`).join('');

// Rute dari hash saat ini; hash yang tidak dikenal kembali ke beranda.
function routeFromHash() {
  const raw = (window.location.hash || '#/').slice(1).split('?')[0] || '/';
  return ROUTES[raw] ? raw : '/';
}

function markNav(route) {
  navRoot.querySelectorAll('a').forEach((a) => {
    if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

// Sakelar Kolom/Garis pada grafik pertumbuhan di beranda.
function bindGrowthSwitch() {
  const buttons = appRoot.querySelectorAll('[data-chart-toggle="growth"]');
  if (buttons.length === 0) return;
  const box = document.getElementById('growth-chart');
  const points = GROWTH_YEARLY.points;
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      for (const b of buttons) {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      }
      box.innerHTML = btn.dataset.kind === 'line'
        ? trendChart(points)
        : columnChart(points, { color: '#0f766e', negativeColor: '#b91c1c' });
    });
  }
}

// Pencarian, saringan topik, dan pengurutan kolom di penjelajah data.
function bindExplorer() {
  const search = document.getElementById('explorer-search');
  const topic = document.getElementById('explorer-topic');
  const count = document.getElementById('explorer-count');
  const table = document.getElementById('explorer-table');
  if (!search || !table) return;
  const rows = [...table.tBodies[0].rows];
  const colIndex = { topic: 0, indicator: 1, value: 2, period: 3, source: 4 };
  const sort = { key: null, dir: 1 };

  function refresh() {
    const q = search.value.trim().toLowerCase();
    const t = topic.value;
    let shown = 0;
    for (const row of rows) {
      const matchTopic = t === '' || row.cells[0].textContent === t;
      const matchText = q === '' || row.textContent.toLowerCase().includes(q);
      const ok = matchTopic && matchText;
      row.style.display = ok ? '' : 'none';
      if (ok) shown += 1;
    }
    count.textContent = `${shown} dari ${rows.length} indikator ditampilkan.`;
  }

  search.addEventListener('input', refresh);
  topic.addEventListener('change', refresh);

  for (const btn of table.querySelectorAll('[data-sort]')) {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      sort.dir = sort.key === key ? -sort.dir : 1;
      sort.key = key;
      const idx = colIndex[key];
      const visible = rows.filter((r) => r.style.display !== 'none');
      const hidden = rows.filter((r) => r.style.display === 'none');
      visible.sort((a, b) => a.cells[idx].textContent.localeCompare(b.cells[idx].textContent, 'id') * sort.dir);
      const body = table.tBodies[0];
      for (const r of [...visible, ...hidden]) body.appendChild(r);
      for (const b of table.querySelectorAll('[data-sort]')) b.removeAttribute('aria-sort');
      btn.setAttribute('aria-sort', sort.dir === 1 ? 'ascending' : 'descending');
    });
  }

  refresh();
}

function render() {
  const route = routeFromHash();
  appRoot.innerHTML = (ROUTES[route] || pageHome)();
  markNav(route);
  bindGrowthSwitch();
  bindExplorer();
  const label = NAV_LINKS.find((l) => l.route === route)?.label ?? 'Beranda';
  document.title = `NusaData — ${label} | Portal Statistik Indonesia`;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();

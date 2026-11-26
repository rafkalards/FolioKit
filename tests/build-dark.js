// Membuat style-dark.css: salinan style.css versi tema gelap, dipakai saat course dibuka langsung dari file (file://),
// karena di sana browser memblokir pembacaan CSSOM sehingga tema gelap tidak bisa dibuat saat itu juga.
// Jalankan ulang setiap kali style.css berubah:  node tests/build-dark.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const ROOT = path.resolve(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
const srv = http.createServer((q, s) => {
  const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return s.writeHead(404).end();
  s.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(s);
});
srv.listen(0, '127.0.0.1', async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto(`http://127.0.0.1:${srv.address().port}/index.html`);
  await p.waitForTimeout(1500);
  const css = await p.evaluate(() => {
    thApply('dark');
    const sh = [...document.styleSheets].find((s) => s.href && /\/style\.css$/.test(s.href));
    return [...sh.cssRules].map((r) => r.cssText).join('\n');
  });
  fs.writeFileSync(path.join(ROOT, 'style-dark.css'), '/* Dibuat otomatis oleh tests/build-dark.js dari style.css. Jangan diedit langsung. */\n' + css + '\n');
  console.log('style-dark.css dibuat,', Math.round(css.length / 1024), 'KB');
  await b.close();
  srv.close();
});

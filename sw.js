/* Service worker: menyimpan semua file web di browser supaya tetap bisa dibuka tanpa internet.
   Cara kerja: file diambil dari simpanan dulu (cepat dan jalan offline), lalu diperbarui diam-diam
   dari internet kalau sedang online. Versi baru terpakai saat halaman dibuka berikutnya.
   Ganti VER kalau daftar FILES berubah. */
const VER = 'foliokit-v3';
const FILES = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'intro.mp4',
  'intro-poster.jpg',
  'fonts/fonts.css',
  'fonts/inter-var-latin.woff2',
  'fonts/inter-var-latin-ext.woff2',
  'fonts/poppins-500-latin.woff2',
  'fonts/poppins-500-latin-ext.woff2',
  'fonts/poppins-600-latin.woff2',
  'fonts/poppins-600-latin-ext.woff2',
  'fonts/poppins-700-latin.woff2',
  'fonts/poppins-700-latin-ext.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'vendor/three-folio.min.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(VER)
      .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith('foliokit-') && k !== VER).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/* Video diputar per potongan (header Range). Potong dari file utuh yang tersimpan. */
async function ranged(req, res) {
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!m) return res;
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  const start = m[1] ? +m[1] : Math.max(0, size - +m[2]);
  const end = m[1] && m[2] ? Math.min(+m[2], size - 1) : size - 1;
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
  }
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'video/mp4',
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // YouTube, Canva, dll. dibiarkan lewat internet

  if (req.headers.has('range')) {
    e.respondWith(
      caches.match(url.origin + url.pathname).then((hit) =>
        hit ? ranged(req, hit) : fetch(req),
      ),
    );
    return;
  }

  // Halaman utama disimpan dengan satu kunci saja, apa pun alamat yang dipakai untuk membukanya.
  const key = req.mode === 'navigate' ? 'index.html' : url.origin + url.pathname;
  e.respondWith(
    caches.open(VER).then(async (c) => {
      const hit = await c.match(key);
      const net = fetch(req)
        .then((res) => {
          // Simpan hanya file yang memang ada di daftar, dan hanya kalau jawabannya berhasil.
          if (res.ok && res.type === 'basic' && !res.redirected && hit) c.put(key, res.clone());
          return res;
        })
        .catch(() => undefined);
      if (hit) {
        e.waitUntil(net);
        return hit;
      }
      return (await net) || Response.error();
    }),
  );
});

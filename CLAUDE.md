# Catatan proyek untuk Claude

Web multimedia pembelajaran "Pembelajaran Portofolio Digital Menggunakan Canva" untuk fresh graduate. Tugas Kelompok 1, Teknologi Pendidikan A, UNJ, mata kuliah Pengembangan Multimedia Pembelajaran, model Hannafin & Peck. Akan diuji coba oleh dosen.

## Cara bicara dengan pemilik

- Pakai bahasa Indonesia santai dan singkat ("gw"/"lu" boleh). Hindari kalimat yang terdengar seperti AI dan kata yang tidak perlu.
- Setelah selesai, laporkan hasilnya singkat: apa yang berubah dan apa yang perlu dicek.

## Aturan tampilan dan isi (wajib dijaga)

- Terasa seperti aplikasi: satu layar tanpa scroll halaman. Isi panjang menggulir di dalam kartunya sendiri.
- Semua menu ada di kiri seperti LMS. Laptop dan tablet lanskap (lebar 900px ke atas) memakai sidebar kiri `#side` berisi semua menu (Cari, Belajar, Bantuan, Lainnya) dengan tombol buka/tutup `.stog`: lebar ↔ ramping (kelas `html.srail`, diatur `sideMode()`/`sideTog()`, pilihan disimpan di localStorage `pdc_side`). Default lebar di 1200px ke atas, ramping di 900–1199px. HP dan tablet berdiri memakai header atas `.top` dengan tombol ☰ di kiri yang membuka laci menu dari kiri (sheet `menu` dengan kelas `.drawer`). Halaman awal (`welcome`) tanpa sidebar.
- Palet biru muda (v8). Tidak ada mode gelap.
- Teks bahasa Indonesia santai dan manusiawi, tanpa kalimat yang tidak perlu.
- Isi dibuka lewat klik. Aktivitas terkunci sampai semua materi selesai, lalu praktik, evaluasi, dan refleksi berurutan (`lock()`).
- Animasi banyak tapi ringan. Hormati `prefers-reduced-motion`, kelas `.lite` (perangkat lemah), dan `.hid` (tab tersembunyi).
- Login sudah dihapus. Akses pemilik dan pengguna dibedakan lewat peran artifact (`ROLE`).
- Jangan mengubah fungsi yang tidak diminta.

## Struktur kode

- `index.html`: kerangka (splash, `#side`, header `.top`, `main#view`, sheet `#sh`, `#toast`).
- `style.css`: semua gaya. Bagian baru ditambahkan di akhir file. Urutan cascade penting.
- `script.js`: semua logika dan isi materi. Bagian penting:
  - `S` adalah state, disimpan di localStorage dengan kunci `pdc_v10:<uid>` lewat `save()`. Nilai awalnya ada di `def()`.
  - `go(r, i, dir)` merender `SCR[r](i)` ke `#view`, lalu `AFT[r]` menjalankan hook setelah render. `hdr()` memperbarui header dan memanggil `sideR()` untuk sidebar.
  - Sheet dibuka dengan `sheet(k)` (peta `SH`) dan ditutup dengan `closeSh()`.
  - `lock(r, i)` menentukan bagian yang terkunci. `nxt()` memberi langkah berikutnya.
  - Ikon: `I(nama)` membaca peta `P`. Tambahkan ikon baru ke `P` dulu, karena nama yang tidak ada menghasilkan ikon kosong.
  - Data materi `M`, aktivitas `AK`, praktik `PR`, kuis `QZ`, FAQ offline Kak Folio `FAQ`, rujukan `REFS`, tur `TOURS`.
  - Aksesibilitas ada di bagian akhir file: `inert`, focus trap, live region, dan skip link.
  - Setiap layar ditandai `data-r="<rute>"` di `section.scr`, dipakai CSS untuk gaya khusus per layar (misalnya Aktivitas).
  - Beranda: `estM()` (perkiraan menit), `sisaM()`, `doneN()`, dan target kecil hari ini `tgH()`/`tgSet()` yang disimpan di `S.tg`.
  - Video YouTube **selalu diputar di dalam halaman** (`ytB`, `vLoad`, `vPick` + sheet `vplay`). Jangan tambahkan tombol atau tulisan yang membuka YouTube di tab baru (permintaan pemilik).
  - Efek: `fx()` memberi `.tilt` + `.glow` (kartu miring mengikuti kursor), loading antar halaman (`#ldb` + kelas `.ldsk`) di akhir file, dan ilustrasi 3D halaman awal `w3d()`/`w3dRun()`.
  - Mode offline ada di paling akhir file: pendaftaran `sw.js` (ditunda sampai halaman tenang) dan pesan "butuh internet" untuk YouTube, Canva, dan tautan luar.
- `vendor/three-folio.min.js`: Three.js (MIT) berisi bagian yang dipakai `w3dRun()` saja, dimuat hanya di halaman awal lewat http/https. Dibuat dari `vendor/three-folio.entry.js` dengan `npx esbuild vendor/three-folio.entry.js --bundle --minify --format=esm --legal-comments=inline --outfile=vendor/three-folio.min.js` (butuh `npm install three esbuild`). Kalau `w3dRun()` memakai kelas Three.js baru, tambahkan ke file entry lalu buat ulang.
- `intro.mp4` dan `intro-poster.jpg`: video intro. Alamat `/_blob/...` hanya ada di claude.ai, di hosting lain otomatis memakai file lokal.
- `sw.js` (service worker) dan `manifest.json`: mode offline dan install sebagai aplikasi (PWA). File disajikan dari simpanan dulu, lalu diperbarui diam-diam saat online.
  - **Kalau menambah, menghapus, atau mengganti nama file yang dipakai web, perbarui daftar `FILES` dan naikkan `VER` di `sw.js`.**
- `fonts/`: Poppins dan Inter (subset latin) disimpan lokal lewat `fonts/fonts.css`, supaya tampilan sama saat offline. Jangan kembali ke Google Fonts.
- `icons/`: ikon aplikasi untuk manifest dan layar utama HP.

## Tempat web ini berjalan

**GitHub** `rafkalards/FolioKit` (branch `main`), dipasang di GitHub Pages: https://rafkalards.github.io/FolioKit/. Ini satu-satunya versi yang dipakai dan dibagikan (artifact claude.ai lama sudah dihapus). Di sini Kak Folio memakai jawaban offline, video YouTube bisa diputar langsung, dan web bisa dibuka tanpa internet setelah sekali dibuka online (PWA).

Fitur AI (`sample`: jawaban AI Kak Folio dan cek portofolio pakai AI) sudah dihapus atas permintaan pemilik. Kak Folio menjawab dari `FAQ` saja. Sisa kapabilitas claude.ai lain (`db`, `user`, `downloads`, `assets`) tidak aktif di GitHub Pages dan kodenya otomatis memakai cadangan.

Setiap perubahan harus di-commit dan di-push ke `main` (permintaan tetap dari pemilik).

## Tes

Butuh Node.js, Playwright (Chromium), dan Python dengan Pillow. Jalankan dari folder `tests/`. Hasil screenshot masuk ke `tests/out/` (diabaikan git).

```
npm install
npx playwright install chromium
node tests/flow.js hp        # alur pengguna baru di HP sampai sertifikat (atau: lap)
node tests/nav.js            # tombol kembali/maju browser dan pencarian menu
node tests/keyboard.js       # 17 cek keyboard di laptop
node tests/keyboard-hp.js    # 17 cek keyboard di HP
node tests/sweep.js lap      # buka semua layar dan klik semua tombol (lap, hp, tab, hpS, lapS, rail, tabL)
node tests/backup.js         # cadangan progres, tampilan cetak, fallback video
node tests/tester-hint.js    # petunjuk penguji dan Mode pratinjau
node tests/shots.js base hp,lap   # screenshot deterministik untuk perbandingan piksel
python tests/compare.py tests/out/base tests/out/baru
```

Temuan sweep yang memang bukan masalah: `vbadge`, tumpang tindih `.pf` 0px, dan overlay buku layar penuh.

Sebelum push: semua tes di atas lolos tanpa error di HP dan laptop.

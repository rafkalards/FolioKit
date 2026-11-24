# Catatan proyek untuk Claude

Web multimedia pembelajaran "Pembelajaran Portofolio Digital Menggunakan Canva" untuk fresh graduate. Tugas Kelompok 1, Teknologi Pendidikan A, UNJ, mata kuliah Pengembangan Multimedia Pembelajaran, model Hannafin & Peck. Akan diuji coba oleh dosen.

## Cara bicara dengan pemilik

- Pakai bahasa Indonesia santai dan singkat ("gw"/"lu" boleh). Hindari kalimat yang terdengar seperti AI dan kata yang tidak perlu.
- Setelah selesai, laporkan hasilnya singkat: apa yang berubah dan apa yang perlu dicek.

## Aturan tampilan dan isi (wajib dijaga)

- Terasa seperti aplikasi: satu layar tanpa scroll halaman. Isi panjang menggulir di dalam kartunya sendiri.
- Laptop dan tablet lanskap (lebar 900px ke atas) memakai sidebar kiri `#side`. Di lebar 900–1199px sidebar jadi rel ikon. HP dan tablet berdiri memakai header atas `.top`. Halaman awal (`welcome`) tanpa sidebar.
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
- `intro.mp4` dan `intro-poster.jpg`: video intro. Di claude.ai diambil dari `/_blob/...`, di hosting lain otomatis memakai file lokal.

## Dua tempat web ini berjalan

1. **Artifact claude.ai** (link yang dibagikan ke dosen). Fitur `sample` (AI online), `db` (progres ke server), `user` (peran), `downloads`, dan `assets` hanya aktif di sini. Artifact hanya bisa diperbarui dari sesi claude.ai yang punya alat Artifact.
2. **GitHub** `rafkalards/FolioKit` (branch `main`), bisa dipasang di GitHub Pages. Di sini Kak Folio memakai jawaban offline dan video YouTube bisa diputar langsung.

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

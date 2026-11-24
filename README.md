# Pembelajaran Portofolio Digital Menggunakan Canva

Multimedia pembelajaran interaktif berbasis web tentang cara membuat portofolio digital dengan Canva, ditujukan untuk fresh graduate.

Dikembangkan oleh Kelompok 1, Teknologi Pendidikan A, Universitas Negeri Jakarta, untuk mata kuliah Pengembangan Multimedia Pembelajaran dengan model pengembangan Hannafin & Peck.

- Arman Fadhilah (Project Manager)
- Bhimo Chrisandy (Desainer Instruksional)
- Rafli Putra Ardi (Desainer Instruksional)

## Fitur

- **Tes awal** 8 soal, nilainya dibandingkan dengan evaluasi akhir.
- **8 materi** dalam mode Cerita (slide) dan mode Ringkasan, lengkap dengan gambaran animasi, contoh, kartu bolak-balik, video, dan cek cepat.
- **Peta konsep** rangkuman semua materi.
- **7 aktivitas** latihan, terbuka setelah semua materi selesai.
- **Praktik di Canva** dengan simulasi dan daftar langkah.
- **Evaluasi** 8 soal, **refleksi**, dan **rapor** hasil belajar.
- **Sertifikat** yang bisa diunduh (nilai evaluasi minimal 70).
- **Contoh portofolio** berbentuk buku 8 halaman, versi baik dan versi kurang tepat.
- **Kak Folio**, asisten tanya jawab dengan 51 jawaban offline.
- Galeri template Canva, lencana, tur panduan, pencarian menu, dan halaman sumber materi.
- Progres tersimpan otomatis di browser, bisa dicadangkan ke file dan dipulihkan di perangkat lain.
- Tampilan seperti aplikasi: di laptop dan tablet navigasi ada di sidebar kiri (jadi rel ikon di layar sedang), di HP pakai header ringkas.
- Satu layar tanpa scroll, menyesuaikan HP, tablet, dan laptop, serta bisa dipakai dengan keyboard.

## Teknologi

HTML, CSS, dan JavaScript murni, tanpa framework dan tanpa proses build. Font dimuat dari Google Fonts.

## Struktur

```
index.html        halaman utama
style.css         semua tampilan
script.js         semua logika dan isi materi
intro.mp4         video intro (53 detik)
intro-poster.jpg  gambar sampul video intro
tests/            tes otomatis (Playwright)
CLAUDE.md         catatan proyek untuk Claude Code
```

## Cara menjalankan

Buka `index.html` lewat web server, misalnya:

```
python -m http.server
```

lalu buka `http://localhost:8000`.

Bisa juga dipasang di GitHub Pages: buka **Settings → Pages**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu simpan. Di hosting sendiri, video YouTube di materi bisa diputar langsung di halaman.

Fitur yang memakai layanan Claude (jawaban AI langsung, cek portofolio pakai AI, dan penyimpanan progres ke server) hanya aktif saat dibuka sebagai artifact di claude.ai. Di hosting lain, Kak Folio tetap menjawab dari daftar jawaban offline.

## Status

Siap diuji coba.

/*
 * script.js: interaksi media pembelajaran "Portofolio Digital Menggunakan Canva"
 * Kelompok 1 · Teknologi Pendidikan A · Pengembangan Multimedia Pembelajaran
 *
 * Cara kerja singkat:
 *  - Semua layar dibuat oleh fungsi SCR.<nama>() lalu ditampilkan oleh go(nama, nomor).
 *  - AFT.<nama>() dijalankan setelah layar tampil (animasi, tur, dll).
 *  - Jendela kecil (menu, contoh, Kak Folio, dll) dibuka dengan sheet(nama).
 *  - Progres disimpan di objek S (localStorage) lewat save().
 *  - lock() menentukan bagian mana yang masih terkunci, nxt() bagian berikutnya.
 *
 * Daftar bagian (cari dengan "===== nama bagian" atau "----- nama bagian"):
 *   1. Konten
 *   2. Data
 *   3. Data per akun
 *   4. Suara
 *   5. Utilitas
 *   6. Navigasi
 *   7. Beranda
 *   8. Contoh interaktif
 *   9. Video YouTube (dimuat saat diklik)
 *  10. Materi
 *  11. Aktivitas
 *  12. Praktik
 *  13. Evaluasi
 *  14. Refleksi
 *  15. Rapor
 *  16. Panel
 *  17. Efek interaksi
 *  18. Warna sampul materi dan rak buku dekorasi
 *  19. Mode pratinjau
 *  20. Kuesioner uji coba
 *  21. Akses pemilik vs pengguna (panel pemilik)
 *  22. Video intro
 *  23. Homepage: judul muncul per kata & sorotan kursor
 *  24. Homepage: jaring titik bergerak (ikut kursor)
 *  25. Materi: gambaran singkat beranimasi (mesin linimasa sederhana)
 *  26. Mode cerita: slide berurutan per materi
 *  27. Peta materi
 *  28. Contoh portofolio jadi (16:9, benar vs kurang tepat)
 *  29. Kamus istilah
 *  30. Ikon tambahan dan kapabilitas AI/unduhan
 *  31. Perbandingan tes awal vs evaluasi
 *  32. Tes awal
 *  33. Peta konsep
 *  34. Tur panduan
 *  35. Kak Folio versi bawaan (tanpa internet)
 *  36. Navigasi
 *  37. Asisten AI
 *  38. Cek portofolio pakai AI
 *  39. Sertifikat
 *  40. Gaya template Canva
 *  41. Profil
 *  42. Cek cepat
 *  43. Lencana
 *  44. Simulasi portofolio
 *  45. Efek teks mengetik
 *  46. Efek transisi antarlayar
 */
const P = {
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 7h6"/>',
  task: '<path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="2"/>',
  lap: '<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/>',
  chk: '<path d="M5 12l5 5 9-10"/>',
  ref: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  arr: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  bk: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  dn: '<path d="M6 9l6 6 6-6"/>',
  play: '<path d="M8 5l11 7-11 7z" fill="currentColor"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z"/>',
  warn: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  flag: '<path d="M5 21V4h11l-2 4 2 4H5"/>',
  rst: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  out: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l5-5-5-5M15 12H3"/>',
  crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  ai: '<path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
  dl: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
};
const I = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;
const esc = (s) =>
  String(s == null ? '' : s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/* ---------- konten ---------- */

const M = [
  {
    t: 'Konsep Portofolio Digital',
    s: 'Apa itu portofolio digital, dan kenapa penting buat cari kerja pertama.',
    p: [
      [
        'Apa itu portofolio digital?',
        'Kumpulan bukti kemampuanmu, misalnya karya, proyek, sertifikat, dan pengalaman. Semuanya disusun rapi dan bisa dibuka online.',
      ],
      [
        'Bedanya dengan CV',
        'CV bilang kamu bisa. Portofolio menunjukkan buktinya. Keduanya saling melengkapi, bukan saling menggantikan.',
      ],
      [
        'Fungsinya',
        'Ada tiga: menunjukkan kompetensi, menyimpan karyamu di satu tempat, dan membantu perekrut menilai kamu sebelum wawancara.',
      ],
      [
        'Manfaatnya buat kamu',
        'Perekrut lebih cepat paham kemampuanmu, kamu lebih pede waktu wawancara, dan isinya bisa diperbarui kapan saja tanpa cetak ulang.',
      ],
    ],
    h: [
      'Menganggap portofolio sama saja dengan CV',
      'Memasukkan semua file tanpa dipilih',
      'Lupa menyertakan tautan yang bisa dibuka',
    ],
    tip: 'Sebelum mulai, tanya ke diri sendiri: siapa yang bakal lihat portofolio ini, dan apa yang ingin mereka yakini tentang aku?',
    v: ['SqUFC4R_vpM', 'Cara Membuat Portofolio Lamaran Kerja'],
  },
  {
    t: 'Struktur Portofolio Digital',
    s: 'Lima bagian yang hampir selalu ada di portofolio yang enak dibaca.',
    p: [
      [
        'Profil diri',
        'Nama, satu kalimat posisi (misalnya "Desainer Grafis, fresh graduate"), dan 2 sampai 3 kalimat tentang minatmu.',
      ],
      [
        'Pendidikan dan pengalaman',
        'Kampus, jurusan, tahun lulus, lalu magang, organisasi, atau kepanitiaan yang nyambung dengan bidangmu. Singkat saja.',
      ],
      ['Skill', 'Cukup 5 sampai 8 skill. Kelompokkan biar gampang dibaca, misalnya Desain, Aplikasi, Komunikasi.'],
      [
        'Proyek atau karya',
        'Bagian paling penting. Tiap karya diberi judul, peranmu, alat yang dipakai, dan hasilnya.',
      ],
      [
        'Kontak',
        'Email aktif, LinkedIn, dan nomor yang bisa dihubungi. Taruh di akhir dan pastikan semuanya masih aktif.',
      ],
    ],
    h: ['Profil kepanjangan, isinya cerita hidup', 'Skill cuma daftar tanpa bukti karya', 'Lupa mencantumkan kontak'],
    tip: 'Tiap skill yang kamu tulis sebaiknya punya minimal satu karya yang membuktikannya.',
    v: ['RsMxYg7RIe4', 'Cara Bikin Portfolio untuk Melamar Kerja'],
  },
  {
    t: 'Menentukan Isi Portofolio',
    s: 'Tidak semua karya harus masuk. Pilih yang paling nyambung dengan kerjaan yang kamu incar.',
    p: [
      [
        'Pilih informasi yang relevan',
        'Mulai dari tujuanmu. Kalau melamar jadi desainer, informasi soal hobi memasak mungkin tidak perlu.',
      ],
      [
        'Pilih karya yang relevan',
        'Pakai tiga saringan: relevan dengan posisi, kualitasnya bikin kamu bangga, dan peran serta hasilnya jelas. Tiga sampai enam karya terbaik sudah cukup.',
      ],
      [
        'Sesuaikan dengan pekerjaan',
        'Desainer menonjolkan karya visual. Staf administrasi menonjolkan pengalaman organisasi, ketelitian, dan sertifikat. Satu portofolio bisa disesuaikan untuk tiap lamaran.',
      ],
    ],
    h: [
      'Memasukkan semua karya yang pernah dibuat',
      'Karya tanpa keterangan peran dan hasil',
      'Gambar buram atau resolusinya kecil',
    ],
    tip: 'Uji tiap karya: kalau dihapus, apakah perekrut kehilangan bukti penting? Kalau tidak, hapus saja.',
    v: ['wMyNU7E7208', 'Gini Cara Membuat Portofolio yang Dilirik HRD'],
  },
  {
    t: 'Mengenal Canva',
    s: 'Tampilan Canva dan fitur dasar yang bakal sering kamu pakai.',
    p: [
      [
        'Tampilan Canva',
        'Di beranda ada kolom cari template, tombol Buat desain, dan daftar desain terakhir. Untuk portofolio, pilih ukuran Presentasi (16:9) atau Website.',
      ],
      [
        'Template',
        'Kerangka siap pakai. Ganti teks, warna, dan fotonya, tapi pertahankan susunannya supaya tetap rapi.',
      ],
      [
        'Teks dan elemen',
        'Menu Teks untuk judul dan isi, menu Elemen untuk bentuk, garis, ikon, dan foto. Karya sendiri dimasukkan lewat menu Unggahan.',
      ],
      [
        'Pengaturan desain',
        'Toolbar di atas kanvas dipakai untuk mengatur huruf, warna, ukuran, dan posisi. Klik kanan untuk duplikat atau kunci elemen.',
      ],
    ],
    h: [
      'Memilih template yang terlalu ramai',
      'Memakai elemen berlabel Pro tanpa sadar',
      'Tidak memberi nama file desain',
    ],
    tip: 'Salah klik? Tekan Ctrl+Z (atau Cmd+Z di Mac) untuk membatalkan.',
    v: ['ynwUuEELPYw', 'Belajar Canva untuk Pemula dari Nol'],
  },
  {
    t: 'Prinsip Dasar Desain',
    s: 'Empat hal yang bikin portofolio terlihat rapi tanpa harus jago desain.',
    p: [
      [
        'Layout',
        'Atur posisi dan susunan informasi. Pakai jarak tepi yang sama dan beri ruang kosong. Ruang kosong bikin mata tidak capek.',
      ],
      [
        'Warna',
        'Satu warna utama, satu pendukung, sisanya netral. Pastikan teks kontras dengan latarnya, misalnya teks gelap di latar terang.',
      ],
      [
        'Tipografi',
        'Maksimal dua jenis huruf: satu untuk judul, satu untuk isi. Bedakan ukurannya, misalnya judul 32, subjudul 20, isi 14.',
      ],
      ['Konsistensi', 'Gaya yang sama diulang di semua halaman. Warna, huruf, dan posisi judul jangan berubah-ubah.'],
    ],
    h: ['Terlalu banyak warna dan jenis huruf', 'Teks menumpuk tanpa jarak', 'Gaya berubah di tiap halaman'],
    tip: 'Coba sipitkan mata saat melihat desainmu. Kalau judul dan karya utama masih kelihatan jelas, susunannya sudah oke.',
    v: null,
  },
  {
    t: 'Membuat Portofolio dengan Canva',
    s: 'Urutan kerja dari template kosong sampai portofolio siap diperiksa.',
    p: [
      ['Menentukan template', 'Pilih template yang sesuai bidang dan tujuanmu. Yang simpel biasanya lebih aman.'],
      [
        'Memasukkan konten',
        'Isi profil, pendidikan, pengalaman, dan skill. Pakai kalimat pendek, bukan paragraf panjang.',
      ],
      [
        'Menyusun karya',
        'Unggah karya sebagai gambar yang jelas. Tambahkan keterangan 2 sampai 3 baris: masalahnya apa, peranmu apa, hasilnya apa.',
      ],
      [
        'Mengatur tampilan',
        'Terapkan layout, warna, huruf, dan konsistensi. Susunan yang disarankan: sampul, profil, pendidikan, skill, 3 sampai 4 halaman karya, lalu kontak.',
      ],
    ],
    h: ['Karya cuma ditempel tanpa keterangan', 'Halamannya kebanyakan', 'Urutan halaman loncat-loncat'],
    tip: 'Kerjakan satu halaman sampai rapi dulu, baru pindah ke halaman berikutnya.',
    v: ['lqKBnNoWVVU', 'Tutorial Lengkap Membuat Portofolio Digital dengan Canva'],
  },
  {
    t: 'Publikasi Portofolio',
    s: 'Cek ulang, simpan, lalu bagikan ke orang yang tepat.',
    p: [
      [
        'Memeriksa hasil',
        'Cek salah ketik, kelengkapan, kualitas gambar, dan tautan. Minta satu teman membacanya dua menit, biasanya dia menemukan yang kamu lewatkan.',
      ],
      [
        'Menyimpan',
        'PDF untuk lamaran lewat email, PNG atau JPG untuk media sosial. Beri nama file yang jelas, misalnya NamaLengkap_Portofolio_Posisi.pdf.',
      ],
      [
        'Membagikan',
        'Di Canva klik Bagikan, lalu atur akses jadi "hanya lihat". Buka tautannya di jendela penyamaran untuk memastikan orang lain bisa membukanya.',
      ],
      [
        'Menyesuaikan dengan pekerjaan',
        'Sebelum dikirim, pastikan isi dan karya yang tampil memang cocok dengan posisi yang kamu lamar.',
      ],
    ],
    h: [
      'Mengirim tautan dengan akses edit',
      'Tidak mengecek tautan sebelum dibagikan',
      'Nama file "Desain tanpa judul"',
    ],
    tip: 'Simpan satu versi PDF sebagai cadangan, jaga-jaga kalau internet sedang bermasalah.',
    v: ['BkhwVxaeLF8', 'Cara Membuat Buku Portofolio Digital dengan Canva dan Heyzine Flipbook'],
  },
  {
    t: 'Evaluasi dan Perbaikan',
    s: 'Cara menilai portofolio sendiri, lalu memperbaikinya satu per satu.',
    p: [
      ['Cek kelengkapan', 'Lima bagian ada semua? Karyanya relevan? Informasinya benar?'],
      [
        'Cek desain',
        'Mudah dibaca, rapi, warnanya nyaman, hurufnya konsisten? Beri nilai 1 sampai 4 untuk tiap poin. Targetnya minimal 3.',
      ],
      [
        'Perbaikan',
        'Mulai dari yang paling penting: kesalahan informasi dulu, lalu masalah desain besar, terakhir detail kecil.',
      ],
      [
        'Refleksi',
        'Tanya diri sendiri: kalau aku jadi perekrut, apa kesan pertamaku dalam 10 detik? Lalu minta pendapat orang lain.',
      ],
    ],
    h: ['Menilai cuma dari selera sendiri', 'Memperbaiki semuanya sekaligus', 'Tidak minta pendapat orang lain'],
    tip: 'Masukan paling berguna datang dari orang yang mirip dengan pembacamu, misalnya kakak tingkat yang sudah bekerja.',
    v: null,
  },
];

const AK = [
  { k: 'a1', t: 'Fungsi Portofolio', m: 'Konsep' },
  { k: 'a2', t: 'Susun Strukturnya', m: 'Struktur' },
  { k: 'a3', t: 'Pilih Karya yang Pas', m: 'Studi kasus' },
  { k: 'a4', t: 'Mana yang Lebih Enak Dibaca?', m: 'Prinsip desain' },
  { k: 'a5', t: 'Cocokkan Istilah', m: 'Istilah kunci' },
  { k: 'a6', t: 'Benar atau Salah', m: 'Salah kaprah' },
  { k: 'a7', t: 'Urutkan Langkahnya', m: 'Alur kerja' },
];

const PR = [
  {
    t: 'Pilih template',
    d: 'Mulai dari kerangka yang sudah rapi.',
    l: [
      'Buka canva.com, lalu masuk atau daftar.',
      'Klik Buat desain, pilih Presentasi (16:9).',
      'Ketik "portfolio" di kolom cari, pilih template yang simpel.',
    ],
  },
  {
    t: 'Isi data dirimu',
    d: 'Ganti teks contoh dengan datamu sendiri.',
    l: [
      'Tulis nama dan satu kalimat posisi di halaman sampul.',
      'Isi profil, pendidikan, pengalaman, dan skill.',
      'Pakai kalimat pendek supaya gampang dibaca.',
    ],
  },
  {
    t: 'Masukkan karya',
    d: 'Bagian yang paling dilihat perekrut.',
    l: [
      'Unggah 3 sampai 6 karya terbaik lewat menu Unggahan.',
      'Tulis judul, peranmu, dan hasilnya di setiap karya.',
      'Taruh karya paling kuat di urutan pertama.',
    ],
  },
  {
    t: 'Rapikan tampilan',
    d: 'Sentuhan akhir sebelum diperiksa.',
    l: [
      'Pakai maksimal dua jenis huruf.',
      'Satu warna utama, satu pendukung, sisanya netral.',
      'Samakan jarak dan posisi judul di semua halaman.',
    ],
  },
];

const QZ = [
  [
    'Halaman portofoliomu terlalu padat, pembaca jadi susah fokus ke karya utama. Apa yang sebaiknya kamu lakukan?',
    [
      'Menambah informasi tentang diri di awal halaman',
      'Mengurangi elemen yang tidak penting dan memperbesar karya utama',
      'Menambah warna dan ikon biar lebih ramai',
      'Membuat halaman baru untuk tiap jenis karya',
    ],
    1,
    4,
    'Ruang kosong dan fokus ke karya utama bikin pembaca tidak bingung.',
  ],
  [
    'Mana yang termasuk prinsip dasar desain portofolio?',
    [
      'Layout, warna, tipografi, konsistensi',
      'Urutan abjad nama file',
      'Jumlah folder di laptop',
      'Ukuran layar perekrut',
    ],
    0,
    4,
    'Empat prinsip ini dibahas di Materi 5.',
  ],
  [
    'Apa yang perlu dilakukan sebelum portofolio dibagikan?',
    [
      'Langsung dibagikan saja',
      'Memeriksa kelengkapan, kualitas gambar, keterbacaan, dan kecocokan isi',
      'Menghapus semua karya lama',
      'Mengganti template',
    ],
    1,
    6,
    'Cek ulang dulu supaya kesan pertamanya baik.',
  ],
  [
    'Karya yang ditampilkan sebaiknya...',
    [
      'Semua karya yang pernah dibuat',
      'Karya yang relevan dengan bidang kerja yang dituju',
      'Karya yang paling lama',
      'Karya yang paling sedikit halamannya',
    ],
    1,
    2,
    'Pilih yang nyambung dengan posisi yang kamu lamar.',
  ],
  [
    'Urutan struktur portofolio yang umum adalah...',
    [
      'Profil, pendidikan dan pengalaman, skill, karya, kontak',
      'Kontak, karya, profil',
      'Karya saja',
      'Pendidikan saja',
    ],
    0,
    1,
    'Dari kenalan, lihat bukti, sampai cara menghubungi.',
  ],
  [
    'Kamu mau membagikan tautan portofolio dari Canva ke perekrut. Akses yang tepat adalah...',
    ['Bisa edit', 'Hanya lihat', 'Bisa komentar dan edit', 'Tidak perlu diatur'],
    1,
    6,
    'Dengan akses hanya lihat, isi portofoliomu tidak bisa diubah orang lain.',
  ],
  [
    'Kamu melamar lewat email. Format yang paling aman untuk dilampirkan adalah...',
    ['PDF', 'File Canva mentah', 'Foto layar dari HP', 'Dokumen Word yang belum dirapikan'],
    0,
    6,
    'PDF tampil sama di perangkat apa pun.',
  ],
  [
    'Saat mengevaluasi portofolio, apa yang sebaiknya diperbaiki lebih dulu?',
    ['Detail kecil seperti ikon', 'Kesalahan informasi', 'Ganti warna latar', 'Tambah animasi'],
    1,
    7,
    'Informasi yang salah paling merugikan, jadi itu dulu.',
  ],
];

const RQ = [
  'Menurutmu, portofolio yang kamu punya sekarang sudah menunjukkan kemampuan yang dicari di bidang kerja impianmu? Kenapa?',
  'Apa satu hal yang paling ingin kamu perbaiki dulu dari portofoliomu?',
];
const RC = ['Kelengkapan isi', 'Kerapian desain', 'Kesan pertama'];
const TEAM = [
  ['Arman Fadhilah', 'Project Manager'],
  ['Bhimo Chrisandy', 'Desainer Instruksional'],
  ['Rafli Putra Ardi', 'Desainer Instruksional'],
];
const REFS = [
  [
    'Masoem University (2026). Cara menggunakan Canva untuk membuat desain portofolio yang profesional dan minimalis',
    'https://masoemuniversity.ac.id/artikel/cara-menggunakan-canva-untuk-membuat-desain-portofolio-yang-profesional-dan-minimalis/',
  ],
  [
    'Jurnal SOLMA (2024). Desain portofolio dan konten kreator menggunakan aplikasi Canva',
    'https://journal.uhamka.ac.id/index.php/solma/article/view/13250',
  ],
  [
    'Unesa (2025). Portofolio digital menggunakan Canva sebagai rekam jejak belajar yang profesional',
    'https://s2tp.fip.unesa.ac.id/post/portofolio-digital-siswa-menggunakan-canva-untuk-menyusun-rekam-jejak-belajar-yang-profesional',
  ],
  [
    'Journal ASDKVI (2025). Penerapan Canva pada mata kuliah pengembangan portofolio di ITB STIKOM Bali',
    'https://journal.asdkvi.or.id/index.php/Imajinasi/article/view/1000',
  ],
];

/* daftar video materi diambil langsung dari data materi, jadi selalu sama dengan yang dipakai */
const VIDS = () => M.filter((m) => m.v).map((m, i) => [m.v[0], m.v[1], M.indexOf(m) + 1]);
function srcSheet() {
  const li = (t, u, s) =>
    `<a class="srci" href="${u}" target="_blank" rel="noopener"><span>${t}</span>${s ? `<small>${s}</small>` : ''}</a>`;
  return `<p class="small" style="margin-bottom:12px">Materi di course ini disusun dari rujukan berikut. Artikel kebuka di tab baru, videonya langsung diputar di sini.</p>
<p class="srch">Artikel dan jurnal</p>${REFS.map((r) => li(r[0], r[1], r[1].split('/')[2])).join('')}
<p class="srch">Video materi</p>${VIDS()
    .map(
      (v) =>
        `<button class="srci" onclick="vPick('${v[0]}','${esc(v[1]).replace(/'/g, '&#39;')}')"><span>${I('play')} ${esc(v[1])}</span><small>Dipakai di Materi ${v[2]}</small></button>`,
    )
    .join('')}
<p class="srch">Model pengembangan</p><div class="srci"><span>Hannafin, M. J., &amp; Peck, K. L. (1988). <i>The Design, Development, and Evaluation of Instructional Software</i>. New York: Macmillan.</span></div>`;
}
/* ---------- data ---------- */
/* ---------- data per akun ---------- */
const KEY = 'pdc_v10';
const ls = {
  g: (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  s: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  },
  r: (k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  },
};
const def = () => ({
  pre: { done: 0, sc: null, skip: 0 },
  tour: {},
  cname: '',
  cpos: '',
  mode: 'story',
  sr: {},
  mk: null,
  iv: 0,
  prev: 0,
  sv: null,
  name: '',
  started: 0,
  md: {},
  a: {},
  pr: {},
  ev: { best: null, tries: 0 },
  rf: { t0: '', t1: '', r: {}, done: 0 },
  link: '',
  acc: null,
  cq: {},
  bd: {},
  sim: null,
  simOk: 0,
  tg: null,
  pc: {},
});
let UID = null,
  S = def();
function loadUser(uid) {
  UID = uid;
  S = def();
  try {
    const o = JSON.parse(ls.g(KEY + ':' + uid) || 'null');
    if (o && typeof o == 'object') {
      S = Object.assign(def(), o);
      S.rf = Object.assign(def().rf, o.rf || {});
      S.ev = Object.assign(def().ev, o.ev || {});
      S.pre = Object.assign(def().pre, o.pre || {});
      S.tour = o.tour || {};
    }
  } catch (e) {}
}
const save = () => {
  if (!UID) return;
  try {
    badgeChk();
  } catch (e) {}
  ls.s(KEY + ':' + UID, JSON.stringify(S));
  try {
    pushLater();
  } catch (e) {}
};
const ROLE = { owner: false, edit: false, ready: false };
if (ls.g(KEY) && !ls.g(KEY + ':guest')) {
  ls.s(KEY + ':guest', ls.g(KEY));
  ls.r(KEY);
}
loadUser('guest');
const R = {};
let cur = { r: '', i: 0 };

const mN = () => [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => S.md[i]).length;
const aN = () => AK.filter((a) => S.a[a.k]).length;
const prN = () => PR.filter((_, i) => S.pr[i]).length;
const pct = () =>
  Math.round(((mN() + aN() + (prN() == 4 ? 1 : 0) + (S.ev.tries ? 1 : 0) + (S.rf.done ? 1 : 0)) / 18) * 100);
function lock(r, i) {
  if (S.prev && ROLE.edit) return '';
  if (r == 'materi' && i > 0 && !S.md[i - 1]) return `Selesaikan Materi ${i} dulu ya, biar urut.`;
  if (r == 'konsep' && mN() < 8) return 'Peta konsep terbuka setelah 8 materi selesai.';
  if (r == 'akt' || /^a\d$/.test(r))
    return mN() < 8 ? `Aktivitas terbuka setelah semua materi selesai. Tinggal ${8 - mN()} materi lagi.` : '';
  if (r == 'praktik')
    return mN() < 8
      ? 'Selesaikan materi dan aktivitas dulu ya.'
      : aN() < 7
        ? `Praktik terbuka setelah semua aktivitas selesai. Tinggal ${7 - aN()} lagi.`
        : '';
  if (r == 'evaluasi') return lock('praktik') || (prN() < 4 ? 'Evaluasi terbuka setelah praktik selesai.' : '');
  if (r == 'refleksi') return lock('evaluasi') || (!S.ev.tries ? 'Kerjakan evaluasi dulu, baru refleksi.' : '');
  return '';
}
function nxt() {
  if (!S.pre.done && !S.pre.skip && mN() == 0) return { r: 'pre', i: 0, l: 'Tes awal: 8 soal singkat', ic: 'flag' };
  for (let i = 0; i < 8; i++) if (!S.md[i]) return { r: 'materi', i, l: `Materi ${i + 1}: ${M[i].t}`, ic: 'book' };
  for (let j = 0; j < 7; j++)
    if (!S.a[AK[j].k]) return { r: AK[j].k, i: 0, l: `Aktivitas ${j + 1}: ${AK[j].t}`, ic: 'task' };
  if (prN() < 4) return { r: 'praktik', i: 0, l: 'Praktik bikin portofolio di Canva', ic: 'lap' };
  if (!S.ev.tries) return { r: 'evaluasi', i: 0, l: 'Evaluasi: 8 soal singkat', ic: 'flag' };
  if (!S.rf.done) return { r: 'refleksi', i: 0, l: 'Refleksi diri', ic: 'ref' };
  return { r: 'rapor', i: 0, l: 'Lihat rapor belajarmu', ic: 'star' };
}
const firstM = () => {
  for (let i = 0; i < 8; i++) if (!S.md[i]) return i;
  return 0;
};

/* ---------- suara ---------- */
let AC;
function sfx(t) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state == 'suspended') AC.resume();
    const n = AC.currentTime,
      f = { tap: [620, 0.05, 0.03], ok: [660, 0.12, 0.05], no: [210, 0.14, 0.05], up: [520, 0.09, 0.04] }[t] || [
        600, 0.05, 0.03,
      ];
    const play = (fr, dl, d) => {
      const o = AC.createOscillator(),
        g = AC.createGain();
      o.type = t == 'no' ? 'triangle' : 'sine';
      o.frequency.setValueAtTime(fr, n + dl);
      g.gain.setValueAtTime(0, n + dl);
      g.gain.linearRampToValueAtTime(f[2], n + dl + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, n + dl + d);
      o.connect(g).connect(sfxOut());
      o.start(n + dl);
      o.stop(n + dl + d + 0.02);
    };
    play(f[0], 0, f[1]);
    if (t == 'ok') play(880, 0.09, 0.16);
    if (t == 'up') play(780, 0.07, 0.1);
  } catch (e) {}
}
document.addEventListener(
  'pointerdown',
  (e) => {
    if (e.target.closest('button,a')) sfx('tap');
  },
  { passive: true },
);

/* ---------- utilitas ---------- */
function toast(m, ic = 'info') {
  const t = document.getElementById('toast');
  t.innerHTML = I(ic) + '<span>' + m + '</span>';
  t.classList.add('on');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('on'), 2800);
}
function hdr() {
  const p = pct();
  document.getElementById('rg').style.strokeDashoffset = 94.25 * (1 - p / 100);
  document.getElementById('rgt').textContent = p + '%';
  const C = {
    home: '<b>Beranda</b>',
    materi: `Materi <b>${cur.i + 1}/8</b>`,
    akt: '<b>Aktivitas</b>',
    praktik: '<b>Praktik</b>',
    evaluasi: '<b>Evaluasi</b>',
    refleksi: '<b>Refleksi</b>',
    rapor: '<b>Rapor</b>',
    pre: '<b>Tes awal</b>',
    konsep: '<b>Peta konsep</b>',
    studio: '<b>Studio</b>',
  };
  document.documentElement.dataset.r = cur.r;
  {
    const pv = document.getElementById('pvt');
    if (pv) pv.hidden = !(S.prev && ROLE.edit) || cur.r == 'welcome';
    const ow = document.getElementById('owt');
    if (ow) ow.hidden = !ROLE.owner;
  }
  {
    const ab = document.getElementById('aib');
    if (ab) ab.hidden = cur.r == 'welcome';
  }
  const av = document.getElementById('avb');
  if (av) {
    av.style.display = UID && cur.r != 'welcome' ? '' : 'none';
    const ac = S.acc || {};
    av.innerHTML = ac.pic
      ? `<img src="${esc(ac.pic)}" alt="" referrerpolicy="no-referrer">`
      : `<b>${esc((S.name || 'T')[0].toUpperCase())}</b>`;
  }
  {
    const cb = document.getElementById('crumb');
    const clk = cur.r == 'materi' || /^a\d$/.test(cur.r);
    cb.classList.toggle('clk', clk);
    cb.title = clk ? (cur.r == 'materi' ? 'Buka peta materi' : 'Lihat semua aktivitas') : '';
  }
  document.getElementById('crumb').innerHTML = /^a\d$/.test(cur.r)
    ? `Aktivitas <b>${cur.r[1]}/7</b>`
    : C[cur.r] || '';
  sideR();
}
/* ---------- sidebar kiri (laptop dan tablet) ---------- */
function sideR() {
  const sd = document.getElementById('side');
  if (!sd) return;
  const r = cur.r,
    p = pct(),
    ac = S.acc || {};
  const it = (k, ic, l, on, go_, lk, bd) =>
    `<button class="sit${on ? ' on' : ''}${lk ? ' lk' : ''}" data-k="${k}" onclick="${go_}" title="${l}"${on ? ' aria-current="page"' : ''}><span class="sic">${I(ic)}</span><span class="stx">${l}</span>${lk ? `<span class="sbg">${I('lock')}</span>` : bd ? `<span class="sbg">${bd}</span>` : ''}</button>`;
  const fr = (n, t) => (n >= t ? I('chk') : n + '/' + t);
  const learn = [
    it('home', 'home', 'Beranda', r == 'home' || r == 'pre', "go('home')"),
    it('materi', 'book', 'Materi', r == 'materi', 'go(\'materi\',firstM())', '', fr(mN(), 8)),
    it('konsep', 'map', 'Peta konsep', r == 'konsep', "go('konsep')", lock('konsep')),
    it('akt', 'task', 'Aktivitas', r == 'akt' || /^a\d$/.test(r), "go('akt')", lock('akt'), fr(aN(), 7)),
    it('praktik', 'lap', 'Praktik', r == 'praktik', "go('praktik')", lock('praktik'), fr(prN(), 4)),
    it('evaluasi', 'flag', 'Evaluasi', r == 'evaluasi', "go('evaluasi')", lock('evaluasi'), S.ev.tries ? String(S.ev.best) : ''),
    it('refleksi', 'ref', 'Refleksi', r == 'refleksi', "go('refleksi')", lock('refleksi'), S.rf.done ? I('chk') : ''),
    it('rapor', 'star', 'Rapor', r == 'rapor', "go('rapor')"),
  ].join('');
  // semua menu ada di sidebar (permintaan pemilik: seperti LMS). Jendela "menu" tetap ada untuk pencarian dan laci di HP.
  const ai = typeof SMP != 'undefined' && SMP,
    aicek = ai && typeof SMPI != 'undefined' && SMPI;
  const help =
    it('ai', 'ai', 'Tanya Kak Folio', 0, "sheet('ai')") +
    it('book', 'doc', 'Contoh portofolio', 0, "sheet('book')") +
    it('tpl', 'grid', 'Gaya template', 0, "sheet('tpl')") +
    (S.ev.best >= 70 ? it('cert', 'award', 'Sertifikat', 0, "sheet('cert')") : '') +
    it('src', 'doc', 'Sumber materi', 0, "sheet('src')");
  const etc =
    it('tur', 'info', 'Ulangi tur', 0, "tourStart(cur.r=='materi'?'materi':'home',1)") +
    it('survey', 'star', 'Beri penilaian', 0, "sheet('survey')") +
    (ROLE.edit ? it('prev', 'eye', 'Mode pratinjau', 0, "sheet('prev')") : '') +
    it('set', 'gear', 'Pengaturan', 0, "sheet('set')") +
    it('about', 'target', 'Tentang', 0, "sheet('about')") +
    it('reset', 'rst', 'Mulai dari awal', 0, "sheet('reset')");
  const rail = document.documentElement.classList.contains('srail');
  const tags =
    (ROLE.owner ? `<button class="stag" onclick="sheet('owner')">Pemilik</button>` : '') +
    (S.prev && ROLE.edit ? `<button class="stag pv" onclick="sheet('prev')">Mode pratinjau</button>` : '');
  sd.innerHTML = `<div class="sbrow"><button class="sbrand" onclick="go('welcome',0,'b')" aria-label="Ke halaman awal" title="Halaman awal"><span class="logo"><svg class="i" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M7 9h4M7 13h7"/></svg></span><span class="sbt"><b>FolioKit</b><small>Belajar portofolio</small></span></button><button class="stog" onclick="sideTog()" aria-label="${rail ? 'Lebarkan menu' : 'Ciutkan menu'}" title="${rail ? 'Lebarkan menu' : 'Ciutkan menu'}" aria-expanded="${!rail}">${I(rail ? 'arr' : 'bk')}</button></div>
<div class="snav">${it('cari', 'search', 'Cari', 0, 'mCari()')}<p class="slab">Belajar</p>${learn}<p class="slab">Studio</p>${it('studio', 'spark', 'Bikin portofolio', r == 'studio', "go('studio')")}<p class="slab">Bantuan</p>${help}<p class="slab">Lainnya</p>${etc}</div>
<div class="sfoot">${tags ? `<div class="stags">${tags}</div>` : ''}<div class="sprog" title="Progres belajar ${p}%"><div class="spt"><span>Progres</span><b>${p}%</b></div><div class="spb"><i style="width:${p}%"></i></div></div><button class="sacc" onclick="sheet('acc')" title="Profil"><span class="sav">${ac.pic ? `<img src="${esc(ac.pic)}" alt="" referrerpolicy="no-referrer">` : `<b>${esc((S.name || 'T')[0].toUpperCase())}</b>`}</span><span class="stx"><b>${esc(S.name || 'Tamu')}</b><small>Profil</small></span></button></div>`;
}
/* Sidebar lebar atau ramping (ikon saja). Default: lebar di layar 1200px ke atas, ramping di 900–1199px.
   Tombol di sidebar mengganti mode, pilihannya disimpan di perangkat ini. */
function sideMode() {
  let pref = '';
  try {
    pref = localStorage.getItem('pdc_side') || '';
  } catch (e) {}
  const w = innerWidth,
    rail = w >= 900 && (pref == 'min' || (pref != 'max' && w < 1200));
  document.documentElement.classList.toggle('srail', rail);
  return rail;
}
function sideTog() {
  const rail = document.documentElement.classList.contains('srail');
  try {
    localStorage.setItem('pdc_side', rail ? 'max' : 'min');
  } catch (e) {}
  sideMode();
  sideR();
  sfx('tap');
  const b = document.querySelector('.side .stog');
  if (b) b.focus({ preventScroll: true });
}
sideMode();
addEventListener('resize', () => {
  const was = document.documentElement.classList.contains('srail');
  if (sideMode() != was) sideR();
});
/* Tombol "Cari" di sidebar: buka laci menu dan langsung fokus ke kolom pencarian */
function mCari() {
  sheet('menu');
  setTimeout(() => {
    const q = document.getElementById('msq');
    if (q) q.focus();
  }, 320);
}
function conf() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const c = document.getElementById('cf'),
    x = c.getContext('2d'),
    W = (c.width = innerWidth),
    H = (c.height = innerHeight),
    cl = ['#1e4fb0', '#3b7be8', '#7c3aed', '#22c55e', '#f59e0b'],
    ps = [...Array(90)].map(() => ({
      x: W / 2 + (Math.random() - 0.5) * 120,
      y: H * 0.35,
      vx: (Math.random() - 0.5) * 11,
      vy: -Math.random() * 10 - 4,
      s: Math.random() * 6 + 4,
      c: cl[(Math.random() * 5) | 0],
      r: Math.random() * 6,
    }));
  let f = 0;
  // kanvas confetti hanya ditampilkan saat confetti berjalan, supaya tidak jadi lapisan berat di atas halaman
  c.classList.add('on');
  (function a() {
    x.clearRect(0, 0, W, H);
    ps.forEach((p) => {
      p.vy += 0.32;
      p.x += p.vx;
      p.y += p.vy;
      p.r += 0.1;
      x.save();
      x.translate(p.x, p.y);
      x.rotate(p.r);
      x.fillStyle = p.c;
      x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      x.restore();
    });
    if (++f < 110) requestAnimationFrame(a);
    else {
      x.clearRect(0, 0, W, H);
      c.classList.remove('on');
    }
  })();
}

/* ---------- navigasi ---------- */
const ORD = [
  'welcome',
  'home',
  'pre',
  'materi',
  'konsep',
  'akt',
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'praktik',
  'evaluasi',
  'refleksi',
  'rapor',
  'studio',
];
const SCR = {},
  AFT = {};
function go(r, i = 0, dir) {
  const L = lock(r, i);
  if (L) {
    toast(L, 'lock');
    sfx('no');
    if (HNAV && HNAV.r === r && HNAV.i === i) HNAV = 0;
    return;
  }
  INGO = 1;
  try {
    const same = r == cur.r && i == cur.i;
    if (!dir) {
      const a = ORD.indexOf(cur.r),
        b = ORD.indexOf(r);
      dir = b < a || (r == cur.r && i < cur.i) ? 'b' : 'f';
    }
    document.documentElement.dataset.dir = dir;
    closeSh();
    const V = document.getElementById('view'),
      keep = same ? (V.querySelector('.pb.scroll') || {}).scrollTop || 0 : 0;
    cur = { r, i };
    V.innerHTML = `<section class="scr${same ? ' still' : ''}" data-r="${r}"><div class="wrap">${SCR[r](i)}</div></section>`;
    if (same) {
      const pb = V.querySelector('.pb.scroll');
      if (pb) pb.scrollTop = keep;
    }
    hdr();
    if (AFT[r]) AFT[r](i);
  } finally {
    INGO = 0;
  }
  navPush(r, i);
  document.title =
    ({
      welcome: 'Portofolio Digital dengan Canva',
      home: 'Beranda',
      materi: 'Materi ' + (i + 1),
      akt: 'Aktivitas',
      praktik: 'Praktik',
      evaluasi: 'Evaluasi',
      refleksi: 'Refleksi',
      rapor: 'Rapor',
      studio: 'Studio portofolio',
    }[r] || 'Aktivitas ' + r[1]) + ' · FolioKit';
}
document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') closeSh();
  if (
    cur.r == 'materi' &&
    !document.getElementById('sh').classList.contains('on') &&
    !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')
  ) {
    if (document.getElementById('slt')) {
      if (e.key == 'ArrowRight') slStep(1);
      if (e.key == 'ArrowLeft') slStep(-1);
      return;
    }
    if (e.key == 'ArrowRight' && cur.i < 7) go('materi', cur.i + 1);
    if (e.key == 'ArrowLeft' && cur.i > 0) go('materi', cur.i - 1);
  }
});

SCR.welcome = () => {
  const J = [
    ['book', 'Materi', '8 topik singkat'],
    ['task', 'Aktivitas', '7 latihan seru'],
    ['lap', 'Praktik', 'Langsung di Canva'],
    ['flag', 'Evaluasi', '8 soal'],
    ['ref', 'Refleksi', 'Nilai dirimu'],
  ];
  return `<div class="wel"><div class="wtop stagger"><span class="tag">${I('spark')} Multimedia pembelajaran interaktif untuk fresh graduate</span><h1>Pembelajaran Portofolio Digital <br>Menggunakan <span class="shine">Canva</span></h1><p class="lead">Belajar bikin portofolio yang rapi dan nyambung dengan kerjaan incaranmu. Sedikit baca, banyak coba.</p><div class="row wcta">${UID && S.started ? `<button class="btn big shim" onclick="go('home',0,'f')">Lanjut belajar${S.name ? ', ' + esc(S.name) : ''} ${I('arr')}</button>` : `<button class="btn big shim" onclick="sheet('nama')">Mulai ${I('arr')}</button>`}<button class="btn g big" onclick="sheet('goal')">${I('target')} Tujuan belajar</button></div></div>
 <div class="jrn" aria-label="Alur belajar"><svg class="jl" viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true"><path d="M40 10H960"/><path class="jlg" d="M40 10H960" pathLength="100"/></svg>${J.map((x, k) => `<div class="js" style="--k:${k}"><span class="ji">${I(x[0])}<i>${k + 1}</i></span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div>
 <div class="wmk" aria-hidden="true"><span class="wm1"></span><span class="wm2"></span><span class="wm3"></span><i class="spk" style="left:14%;top:18%;--d:0s;--s:1"></i><i class="spk" style="left:84%;top:14%;--d:1.1s;--s:0.8"></i><i class="spk" style="left:9%;top:52%;--d:2.2s;--s:0.7"></i><i class="spk" style="left:91%;top:48%;--d:0.6s;--s:1"></i><i class="spk" style="left:22%;top:80%;--d:1.7s;--s:0.8"></i><i class="spk" style="left:78%;top:78%;--d:2.8s;--s:0.9"></i><i class="spk" style="left:50%;top:6%;--d:3.3s;--s:0.6"></i><i class="spk" style="left:64%;top:62%;--d:4.1s;--s:0.6"></i></div><div class="wspot" aria-hidden="true"></div><div class="wbg" aria-hidden="true"><span class="au a1"></span><span class="au a2"></span><span class="au a3"></span><canvas id="wcv"></canvas><canvas id="w3d" aria-hidden="true"></canvas><div class="wv w1"><svg viewBox="0 0 2880 200" preserveAspectRatio="none"><path d="M0 120 C 240 60 480 60 720 120 S 1200 180 1440 120 S 1920 60 2160 120 S 2640 180 2880 120 V200 H0 Z" fill="#93c5fd" fill-opacity=".35"/></svg></div><div class="wv w2"><svg viewBox="0 0 2880 200" preserveAspectRatio="none"><path d="M0 120 C 240 60 480 60 720 120 S 1200 180 1440 120 S 1920 60 2160 120 S 2640 180 2880 120 V200 H0 Z" fill="#3b82f6" fill-opacity=".18"/></svg></div><div class="wv w3"><svg viewBox="0 0 2880 200" preserveAspectRatio="none"><path d="M0 120 C 240 60 480 60 720 120 S 1200 180 1440 120 S 1920 60 2160 120 S 2640 180 2880 120 V200 H0 Z" fill="#7c3aed" fill-opacity=".12"/></svg></div></div></div>`;
};
AFT.welcome = () => {
  wTitle();
  wSpot();
  wNet();
  w3d();
};
function startNow(nv) {
  S.name = String(nv || '').trim();
  S.started = 1;
  save();
  sfx('up');
  go('home', 0, 'f');
}
function nameSheet() {
  return `<div class="nmw"><div class="nml">${shelfH()}</div><div class="nmr"><span class="tag">${I('spark')} Sebelum mulai</span><h4>Mau dipanggil siapa?</h4><p class="small">Boleh dikosongkan.</p><form class="nm" onsubmit="event.preventDefault();const v=this.querySelector('input').value;loadBtn(this.querySelector('button'),()=>{closeSh();startNow(v)},'Menyiapkan...')"><input id="nmI" maxlength="24" placeholder="Nama panggilanmu" autocomplete="given-name" aria-label="Nama panggilan" value="${esc(S.name)}"><button class="btn" type="submit">Mulai belajar ${I('arr')}</button></form><button class="link" onclick="closeSh();startNow('')">Lewati, langsung mulai</button></div></div>`;
}
/* ---------- beranda ---------- */
/* Perkiraan waktu belajar (menit). Kasar saja, buat gambaran pengguna, bukan target. */
const estM = (r, i = 0) =>
  r == 'materi'
    ? Math.max(3, Math.round((M[i].p.length + 5) * 0.8))
    : /^a\d$/.test(r)
      ? 3
      : ({ pre: 4, praktik: 20, evaluasi: 8, refleksi: 3 }[r] ?? 0);
const doneN = () => mN() + aN() + (prN() == 4 ? 1 : 0) + (S.ev.tries ? 1 : 0) + (S.rf.done ? 1 : 0);
const sisaM = () =>
  [0, 1, 2, 3, 4, 5, 6, 7].reduce((t, i) => t + (S.md[i] ? 0 : estM('materi', i)), 0) +
  AK.reduce((t, a) => t + (S.a[a.k] ? 0 : estM(a.k)), 0) +
  (prN() == 4 ? 0 : estM('praktik')) +
  (S.ev.tries ? 0 : estM('evaluasi')) +
  (S.rf.done ? 0 : estM('refleksi'));
/* Target kecil hari ini: opsional, tanpa streak atau hukuman. Disimpan di S.tg = {d: tanggal, k: 'm'|'a', b: jumlah awal}. */
const hariIni = () => {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};
function tgSet(k) {
  S.tg = k ? { d: hariIni(), k, b: k == 'm' ? mN() : aN() } : null;
  save();
  sfx(k ? 'ok' : 'tap');
  go('home', 0);
}
function tgH() {
  const t = S.tg && S.tg.d == hariIni() ? S.tg : null;
  const bisaM = mN() < 8,
    bisaA = mN() >= 8 && aN() < 7;
  if (t) {
    const ok = (t.k == 'm' ? mN() : aN()) > t.b;
    const lbl = t.k == 'm' ? 'Selesaikan 1 materi' : 'Selesaikan 1 aktivitas';
    return `<div class="tgb ${ok ? 'ok' : ''}"><span class="tgi">${I(ok ? 'chk' : 'target')}</span><div class="tgt"><small>Target hari ini</small><b>${lbl}</b><span>${ok ? 'Udah kelar. Santai dulu juga boleh.' : 'Belum kelar, pelan-pelan aja.'}</span></div><button class="link" onclick="tgSet(null)">${ok ? 'Tutup' : 'Batal'}</button></div>`;
  }
  if (!bisaM && !bisaA) return '';
  return `<div class="tgb"><span class="tgi">${I('target')}</span><div class="tgt"><small>Target kecil hari ini</small><span>Nggak wajib, pilih kalau mau.</span></div><div class="tgc">${bisaM ? `<button class="chip" onclick="tgSet('m')">1 materi</button>` : ''}${bisaA ? `<button class="chip" onclick="tgSet('a')">1 aktivitas</button>` : ''}</div></div>`;
}
SCR.home = () => {
  const n = nxt(),
    p = pct(),
    nm = S.name ? ', ' + esc(S.name) : '';
  const lanjut = n.r == 'materi' && S.sr && S.sr[n.i] > 0 && !S.md[n.i];
  const durN =
    p >= 100
      ? 0
      : lanjut
        ? Math.max(1, Math.round(estM('materi', n.i) * (1 - S.sr[n.i] / (M[n.i].p.length + 5))))
        : estM(n.r, n.i);
  const sisa = sisaM();
  const msg =
    p == 0
      ? 'Mulai dari dasar, satu per satu.'
      : p >= 100
        ? 'Semua bagian sudah beres. Kamu bisa buka lagi bagian mana pun, atau lihat rapormu.'
        : 'Lanjut dari yang terakhir, yuk.';
  const st = [
    ['Materi', 'book', 'materi', mN() / 8, `${mN()} dari 8 materi`],
    ['Aktivitas', 'task', 'akt', aN() / 7, `${aN()} dari 7 latihan`],
    ['Praktik', 'lap', 'praktik', prN() / 4, `${prN()} dari 4 langkah di Canva`],
    ['Evaluasi', 'flag', 'evaluasi', S.ev.tries ? 1 : 0, S.ev.tries ? `Nilai terbaik ${S.ev.best}` : '8 soal singkat'],
    ['Refleksi', 'ref', 'refleksi', S.rf.done ? 1 : 0, S.rf.done ? 'Sudah diisi' : '2 pertanyaan untuk dirimu'],
  ];
  const ci = { materi: 0, praktik: 2, evaluasi: 3, refleksi: 4 }[n.r] ?? (/^a\d$/.test(n.r) ? 1 : -1);
  return `<div class="home home2"><div class="card hello"><div class="htop">${buildH()}${skyH()}</div><div class="hmid stagger"><span class="tag">${I('home')} Beranda</span><h2 data-type>${salam()}${nm}.</h2><p class="lead">${msg}</p>
 <div class="nextc glowb"><span class="ic">${I(n.ic)}</span><div style="flex:1;min-width:0"><small>${p == 0 ? 'Mulai dari' : p >= 100 ? 'Sudah selesai' : n.r == 'materi' && S.sr && S.sr[n.i] > 0 ? 'Lanjut dari terakhir' : 'Berikutnya'}</small><b>${n.l}</b>${lanjut || durN ? `<span class="nxs">${lanjut ? `Slide ${S.sr[n.i] + 1} dari ${M[n.i].p.length + 5}` : ''}${lanjut && durN ? ', ' : ''}${durN ? `sekitar ${durN} menit${lanjut ? ' lagi' : ''}` : ''}</span>` : ''}</div></div>
 <div class="row" style="margin-top:6px">${!S.iv && mN() == 0 ? `<button class="btn big shim" onclick="sheet('intro')">${I('play')} Tonton intro, lalu mulai</button><button class="link" onclick="S.iv=1;save();goNext()">Lewati intro</button>` : ''}<button class="btn big shim" ${!S.iv && mN() == 0 ? 'hidden' : ''} onclick="go('${n.r}',${n.i})">${p == 0 ? 'Mulai belajar' : p >= 100 ? 'Buka rapor' : 'Lanjut belajar'} ${I('arr')}</button></div></div><div class="hring" title="Progres belajar ${p}%"><svg viewBox="0 0 36 36" aria-hidden="true"><circle class="bgc" cx="18" cy="18" r="15"/><circle class="fgc" cx="18" cy="18" r="15" stroke-dasharray="94.25" stroke-dashoffset="${(94.25 * (1 - p / 100)).toFixed(2)}"/></svg><b>${p}%</b><small>progres</small></div></div>
 <div class="hgrid">
 <div class="card path">${ROLE.edit && !S.prev && !S.phint ? `<div class="phint"><span class="ic">${I('eye')}</span><div><b>Lagi menguji course ini?</b><small>Nyalakan Mode pratinjau biar semua bagian kebuka tanpa ngerjain dari awal.</small></div><button class="btn sm" onclick="sheet('prev')">Buka</button><button class="x" aria-label="Tutup petunjuk" onclick="S.phint=1;save();this.closest('.phint').remove()">${I('x')}</button></div>` : ''}<div class="pathh"><h3>Alur belajarmu</h3><span class="pathm">${doneN()} dari 18 langkah${sisa ? `, sekitar ${sisa} menit lagi` : ', semua udah beres'}</span></div><div class="tln">${st
   .map((s, k) => {
     const lk = lock(s[2]),
       dn = s[3] >= 1;
     // garis waktu: teks kecil hanya untuk langkah yang sedang/sudah dikerjakan dan satu langkah terkunci berikutnya,
     // supaya tidak ada teks yang terpotong. Alasan lengkap tetap muncul saat langkah terkunci diklik.
     const firstLock = lk && st.findIndex((x) => lock(x[2])) == k;
     const SINGKAT = {
       akt: `Kebuka setelah ${8 - mN()} materi lagi`,
       praktik: 'Kebuka setelah semua aktivitas beres',
       evaluasi: 'Kebuka setelah praktik beres',
       refleksi: 'Kebuka setelah evaluasi',
     };
     const sub = lk ? (firstLock ? SINGKAT[s[2]] || '' : '') : s[4];
     return `<button class="stg ${dn ? 'done' : ''} ${lk ? 'lock' : ''} ${k == ci ? 'cur' : ''}" onclick="${s[2] == 'materi' ? "go('materi',firstM())" : `go('${s[2]}')`}"${lk ? ` title="${esc(lk)}"` : ''}><span class="n">${lk ? I('lock') : dn ? I('chk') : k + 1}</span><span class="t"><b>${s[0]}</b>${sub ? `<small>${sub}</small>` : ''}</span>${k == ci && !dn ? `<span class="mini"><i style="width:${Math.round(s[3] * 100)}%"></i></span>` : ''}</button>`;
   })
   .join('')}</div></div>
 <div class="hside">${tgH() ? `<div class="card hsc">${tgH()}</div>` : ''}<div class="card hsc hqk"><h3>Pintasan</h3><div class="qk" role="group" aria-label="Pintasan">${[
   ['intro', 'play', 'Intro', '53 detik', '#2d6fd6,#60a5fa'],
   ['book', 'doc', 'Contoh', '7 halaman', '#7c3aed,#a78bfa'],
   ['goal', 'target', 'Tujuan', 'belajar', '#0891b2,#22d3ee'],
   ['how', 'map', 'Panduan', 'cara pakai', '#15803d,#4ade80'],
   ['badges', 'star', 'Lencana', bdN() + '/' + BD.length, '#d97706,#fbbf24'],
   ['studio', 'spark', 'Studio', 'bikin sendiri', '#be123c,#fb7185'],
 ]
   .map(
     (q, k) =>
       `<button class="qki" style="--g:linear-gradient(135deg,${q[4]});--k:${k}" onclick="${q[0] == 'studio' ? "go('studio')" : `sheet('${q[0]}')`}"><span class="qic">${I(q[1])}</span><span class="qtx"><b>${q[2]}</b><small>${q[3]}</small></span></button>`,
   )
   .join('')}</div></div><div class="card hsc hst"><h3>Ringkasan</h3><div class="hstg">${[['Materi', mN() + '/8'], ['Aktivitas', aN() + '/7'], ['Lencana', bdN() + '/' + BD.length], ['Nilai evaluasi', S.ev.tries ? String(S.ev.best) : '-']].map((x) => `<div><b>${x[1]}</b><small>${x[0]}</small></div>`).join('')}</div></div></div></div></div>`;
};

/* animasi beranda: portofolio dirakit */
setInterval(() => {
  const e = document.querySelector('.sk-tm');
  if (e) {
    const d = new Date();
    e.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
}, 20000);
function buildH() {
  const slot = (x, k, g) =>
    `<rect x="${x}" y="60" width="40" height="30" rx="5" fill="none" stroke="#c7d2fe" stroke-width="1.2" stroke-dasharray="3 3"/><g class="pc pc${k}" style="--dx:${128 - x - 20}px;--dy:-18px"><rect x="${x}" y="60" width="40" height="30" rx="5" fill="url(#pcG${k})"/><path d="M${x + 6} ${84}l8-10 6 6 5-5 9 9z" fill="#fff" opacity=".85"/><circle cx="${x + 30}" cy="${67}" r="3" fill="#fff" opacity=".9"/></g>`;
  return `<div class="hbd" aria-hidden="true"><div class="hb-cap"><span class="hb-dot"></span>Portofoliomu lagi dirakit</div><div class="hb-stage"><svg class="hbs" viewBox="0 -10 320 150" preserveAspectRatio="xMidYMid meet">
<defs><radialGradient id="pBlob"><stop offset="0" stop-color="#d0bfff" stop-opacity=".75"/><stop offset="1" stop-color="#d0bfff" stop-opacity="0"/></radialGradient>
<linearGradient id="pJk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c7cfa"/><stop offset="1" stop-color="#3b5bdb"/></linearGradient>
<linearGradient id="pAv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffa8a8"/><stop offset="1" stop-color="#b197fc"/></linearGradient>
<linearGradient id="pcG0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#748ffc"/><stop offset="1" stop-color="#7048e8"/></linearGradient>
<linearGradient id="pcG1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc078"/><stop offset="1" stop-color="#f76707"/></linearGradient>
<linearGradient id="pcG2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#63e6be"/><stop offset="1" stop-color="#0ca678"/></linearGradient></defs>
<circle cx="92" cy="78" r="58" fill="url(#pBlob)" class="p-blob"/>
<circle cx="250" cy="128" r="70" fill="#e7f0ff" opacity=".6"/>
<g class="p-spk"><path d="M36 30l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#fcc419"/><path d="M134 18l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" fill="#b197fc" style="animation-delay:.8s"/><path d="M312 104l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" fill="#4dabf7" style="animation-delay:1.6s"/><circle cx="24" cy="70" r="1.8" fill="#74c0fc" style="animation-delay:1.2s"/></g>
<ellipse cx="92" cy="135" rx="30" ry="3.6" fill="#a5b4fc" opacity=".45"/><ellipse cx="228" cy="129" rx="70" ry="3" fill="#a5b4fc" opacity=".3"/>
<g class="p-plant"><path d="M30 120c-7-8-6-18-1-23 2 8 4 14 1 23zM33 120c2-10 9-15 15-15-2 8-7 13-15 15zM31 120c-3-8-11-11-16-10 3 6 9 10 16 10z" fill="#38d9a9"/><path d="M31 120c0-12 2-20 6-26" fill="none" stroke="#20c997" stroke-width="1.2"/></g><path d="M22 119h18l-2.5 15h-13z" fill="#845ef7"/>
<g class="p-board"><rect x="153" y="16" width="156" height="104" rx="11" fill="#c5d0fa" opacity=".45"/><rect x="148" y="10" width="156" height="104" rx="11" fill="#fff"/>
<circle cx="159" cy="20" r="2.4" fill="#ff8787"/><circle cx="166" cy="20" r="2.4" fill="#ffd43b"/><circle cx="173" cy="20" r="2.4" fill="#69db7c"/><rect x="236" y="17" width="58" height="6" rx="3" fill="#f1f3f5"/><path d="M148 28H304" stroke="#edf2ff" stroke-width="1.2"/>
<circle cx="167" cy="44" r="7.5" fill="url(#pAv)" class="p-av"/><rect x="179" y="38" width="62" height="5" rx="2.5" fill="#364fc7" class="p-ln"/><rect x="179" y="47" width="40" height="3.6" rx="1.8" fill="#bac8ff" class="p-ln p-ln2"/>
${slot(158, 0)}${slot(206, 1)}${slot(254, 2)}
<rect x="158" y="99" width="88" height="4" rx="2" fill="#edf2ff" class="p-ft"/><rect x="250" y="99" width="44" height="4" rx="2" fill="#edf2ff" class="p-ft"/>
<g class="p-ok"><rect x="232" y="-3" width="76" height="20" rx="10" fill="#12b886" opacity=".18"/><rect x="232" y="-5" width="76" height="20" rx="10" fill="#fff" stroke="#8ce99a" stroke-width="1"/><circle cx="243" cy="5" r="6.5" fill="#12b886"/><path d="M240 5.2l2.1 2.1 3.9-4.2" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><text x="253" y="8.1" font-family="Poppins,system-ui,sans-serif" font-size="8.4" font-weight="600" letter-spacing=".1" fill="#087f5b" text-rendering="geometricPrecision">Siap dikirim</text></g></g>
<g class="p-chip"><rect x="122" y="96" width="22" height="16" rx="5" fill="#fff"/><text x="127" y="107.5" font-family="Poppins,sans-serif" font-size="8.5" font-weight="700" fill="#5c7cfa">Aa</text></g>
<g class="p-cf"><circle cx="196" cy="6" r="2" fill="#fcc419"/><circle cx="226" cy="2" r="1.6" fill="#f06595"/><rect x="214" y="10" width="3" height="3" fill="#4dabf7" transform="rotate(25 215 11)"/><circle cx="318" cy="22" r="1.8" fill="#51cf66"/><rect x="242" y="-2" width="3" height="3" fill="#845ef7" transform="rotate(40 243 0)"/></g>
<g class="p-girl">
<path d="M84 88 L80 111 L78 131" fill="none" stroke="#1c2a6b" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M96 88 L100 111 L103 131" fill="none" stroke="#24357e" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M70 135q0-5 8-5h3q2 0 2 3v2z" fill="#fff" stroke="#ced4da" stroke-width=".8"/><path d="M100 135q0-5 6-5h3q4 0 5 5z" fill="#fff" stroke="#ced4da" stroke-width=".8"/>
<rect x="77" y="84" width="26" height="9" rx="3" fill="#1c2a6b"/>
<path d="M78 54 L73 75 L84 82" fill="none" stroke="#3b5bdb" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M75 54 Q76 46 90 45.5 Q104 46 105 54 L102 88 Q90 91 78 88 Z" fill="url(#pJk)"/>
<path d="M85 46.5 L90 62 L95 46.5 Z" fill="#fff"/><path d="M85 46.5 L88 60 L82 58 Z M95 46.5 L92 60 L98 58 Z" fill="#4263eb"/>
<g transform="rotate(-10 88 80)"><rect x="80" y="70" width="15" height="20" rx="2.5" fill="#343a40"/><rect x="81.5" y="71.5" width="12" height="16" rx="1.5" fill="#a5d8ff"/><rect x="83" y="74" width="9" height="2" rx="1" fill="#fff"/><rect x="83" y="78" width="6" height="5" rx="1" fill="#748ffc"/></g>
<circle cx="85" cy="82" r="3.4" fill="#f1b48a"/>
<g class="p-head"><rect x="87" y="38" width="6.5" height="9" rx="2" fill="#e8a87c"/><circle cx="90" cy="31" r="11.5" fill="#f5c09a"/>
<path d="M78.6 32 Q77 17 91 17.5 Q103 18.5 102 28 Q96 23 87 25 Q83.5 30 82.5 38 Q79 36 78.6 32Z" fill="#2b2d42"/><circle cx="86" cy="14" r="6" fill="#2b2d42"/><path d="M83 12q3-2 6 0" fill="none" stroke="#495057" stroke-width="1.2" stroke-linecap="round"/>
<circle cx="81.5" cy="33" r="2.3" fill="#e8a87c"/><circle cx="81.5" cy="36.5" r="1.1" fill="#fcc419"/>
<g class="p-eye"><ellipse cx="96.2" cy="31" rx="1.4" ry="1.7" fill="#212529"/></g><path d="M94 27.4q2-1.2 4 0" fill="none" stroke="#2b2d42" stroke-width="1" stroke-linecap="round"/>
<circle cx="97.5" cy="35" r="2.1" fill="#ff8787" opacity=".45"/><path d="M93.5 36.2q2.6 2.2 5.2-.2" fill="none" stroke="#c2410c" stroke-width="1.2" stroke-linecap="round"/></g>
<g class="p-arm"><path d="M101 53 L110 67" stroke="url(#pJk)" stroke-width="8" stroke-linecap="round"/><g class="p-fa"><path d="M110 67 L120 72" stroke="#f5c09a" stroke-width="6" stroke-linecap="round"/><circle cx="121.5" cy="72.5" r="3.6" fill="#f5c09a"/></g></g>
</g></svg></div></div>`;
}
/* ---------- contoh interaktif ---------- */
function say(id, h) {
  const e = document.getElementById(id);
  if (e) e.innerHTML = `<div class="say">${h}</div>`;
}
function only(b, sel) {
  b.parentNode.querySelectorAll(sel).forEach((x) => x.classList.toggle('on', x == b));
}
function exH(i) {
  if (i == 0)
    return `<p>Dua pelamar Desainer Grafis sama-sama menulis "mahir desain". Kalau kamu HRD-nya, mana yang lebih meyakinkan?</p><div class="two"><button class="pv" data-x="0" onclick="ex0(0)"><h5>Pelamar A: CV saja</h5><div class="ln" style="width:80%"></div><div class="ln" style="width:60%"></div><p style="margin-top:8px">"Mahir desain, kreatif, cepat belajar."</p></button><button class="pv" data-x="1" onclick="ex0(1)"><h5>Pelamar B: CV dan portofolio</h5><div class="ln" style="width:70%"></div><div class="tiles"><i style="background:#93c5fd"></i><i style="background:#c4b5fd"></i><i style="background:#fcd34d"></i></div><p style="margin-top:6px">3 poster acara dan 1 logo UMKM</p></button></div><div id="ex0s"></div>`;
  if (i == 1)
    return `<p>Klik tiap bagian di menu kiri untuk melihat contoh isinya.</p><div class="mock"><nav>${['Profil', 'Pendidikan', 'Skill', 'Karya', 'Kontak'].map((x, j) => `<button class="${j ? '' : 'on'}" onclick="ex1(${j},this)">${j + 1}. ${x}</button>`).join('')}</nav><div class="scn" id="ex1s"></div></div>`;
  if (i == 2)
    return `<p>Pilih satu karya, lalu lihat apakah lolos tiga saringan.</p><div class="chips">${['Poster acara kampus', 'Foto liburan ke pantai', 'Logo UMKM tanpa keterangan'].map((x, j) => `<button class="chip" onclick="ex2(${j},this)">${x}</button>`).join('')}</div><div id="ex2s"></div>`;
  if (i == 3) {
    const H = [
      [
        '8%',
        '55%',
        'Bilah kiri',
        'Isinya menu Desain (template), Elemen, Teks, Unggahan, dan Proyek. Dari sini kamu menambahkan isi ke kanvas.',
        ['0', '13%', '16%', '87%'],
      ],
      [
        '58%',
        '58%',
        'Kanvas',
        'Halaman desainmu. Klik teks atau gambar di sini untuk mengubahnya.',
        ['30%', '30%', '56%', '48%'],
      ],
      [
        '58%',
        '18%',
        'Toolbar',
        'Muncul saat kamu klik elemen. Dipakai untuk ganti huruf, ukuran, warna, dan posisi.',
        ['16%', '13%', '84%', '10%'],
      ],
      [
        '58%',
        '92%',
        'Panel halaman',
        'Tempat menambah, mengurutkan, dan menduplikat halaman portofoliomu.',
        ['16%', '85%', '84%', '15%'],
      ],
    ];
    return `<p>Ini gambaran sederhana editor Canva. Klik angka untuk tahu fungsinya.</p><div class="cvs"><div style="position:absolute;inset:0 0 auto 0;height:13%;background:#7c3aed"></div><div style="position:absolute;left:0;top:13%;bottom:0;width:16%;background:#18191b"></div><div style="position:absolute;left:16%;right:0;top:13%;height:10%;background:#fff;border-bottom:1px solid #e5e7eb"></div><div style="position:absolute;left:16%;right:0;top:23%;bottom:15%;background:#ebecf0"></div><div style="position:absolute;left:30%;right:14%;top:30%;bottom:22%;background:#fff;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1)"><div style="margin:10% 8% 0;height:12%;width:50%;background:#1e4fb0;border-radius:3px"></div><div style="margin:4% 8%;height:6%;width:34%;background:#cbd5e1;border-radius:3px"></div></div><div style="position:absolute;left:16%;right:0;bottom:0;height:15%;background:#fff;border-top:1px solid #e5e7eb"></div>${H.map((h, j) => `<div class="z" style="left:${h[4][0]};top:${h[4][1]};width:${h[4][2]};height:${h[4][3]}"></div><button class="hs" style="left:calc(${h[0]} - 13px);top:calc(${h[1]} - 13px)" onclick="ex3(${j},this)" data-t="${h[2]}" data-d="${h[3]}" aria-label="${h[2]}">${j + 1}</button>`).join('')}</div><div id="ex3s"></div>`;
  }
  if (i == 4)
    return `<p>Geser pembatas di gambar untuk membandingkan desain yang ramai dengan yang rapi.</p><div class="cmp" id="cmp"><div class="bad"><b>PORTOFOLIO SAYA!!!</b><span>Saya orangnya kreatif ✦✦✦ dan suka desain</span><span>Karya: poster, logo, feed, banner, dll dll</span></div><div class="good"><small style="color:#64748b">Desainer Grafis</small><b>Nadia Putri</b><span style="font-size:13px">Visual yang jelas untuk brand kecil.</span><div style="display:flex;gap:6px;margin-top:4px"><i style="flex:1;height:44px;border-radius:6px;background:#dbeafe"></i><i style="flex:1;height:44px;border-radius:6px;background:#e0e7ff"></i><i style="flex:1;height:44px;border-radius:6px;background:#dbeafe"></i></div></div><span class="bar"></span><input type="range" min="0" max="100" value="50" aria-label="Geser perbandingan desain" oninput="document.getElementById('cmp').style.setProperty('--x',this.value+'%')"></div><p class="small">Kiri: banyak warna, tiga jenis huruf, tanpa jarak. Kanan: dua warna, satu jenis huruf, jaraknya lega.</p>`;
  if (i == 5)
    return `<p>Klik tiap langkah untuk lihat apa yang dikerjakan.</p><div class="tl">${['Template', 'Konten', 'Karya', 'Tampilan', 'Simpan'].map((x, j) => `<button onclick="ex5(${j},this)"><span>${j + 1}</span>${x}</button>`).join('')}</div><div id="ex5s"></div>`;
  if (i == 6)
    return `<p>Portofolionya mau dipakai untuk apa? Pilih salah satu.</p><div class="chips">${['Lamaran lewat email', 'Unggah ke Instagram', 'Dibuka online lewat tautan'].map((x, j) => `<button class="chip" onclick="ex6(${j},this)">${x}</button>`).join('')}</div><div id="ex6s"></div>`;
  if (i == 7)
    return `<p>Bayangkan ini portofolio temanmu. Coba nilai dengan skala 1 sampai 4.</p><div class="rb">${RC.map((c, j) => `<span>${c}</span><div class="sc4">${[1, 2, 3, 4].map((v) => `<button onclick="ex7(${j},${v},this)">${v}</button>`).join('')}</div>`).join('')}</div><div id="ex7s"></div>`;
}
function ex0(k) {
  document.querySelectorAll('.pv').forEach((b) => b.classList.toggle('pick', b.dataset.x == k));
  say(
    'ex0s',
    k == 1
      ? '<b>Betul.</b> Pelamar B langsung bisa dinilai dari karyanya. Pelamar A cuma bisa ditebak.'
      : '<b>Coba pikir lagi.</b> Kata "kreatif" belum ada buktinya. Pelamar B menunjukkan karya nyata, jadi lebih mudah dinilai.',
  );
  sfx(k == 1 ? 'ok' : 'no');
}
const EX1 = [
  ['Nadia Putri', 'Desainer Grafis, fresh graduate. Suka bikin visual yang sederhana dan jelas untuk brand kecil.'],
  [
    'Pendidikan dan pengalaman',
    'S1 Teknologi Pendidikan, lulus 2026. Magang 3 bulan di agensi kreatif sebagai desainer junior.',
  ],
  ['Skill', 'Desain: layout, tipografi. Aplikasi: Canva, Figma. Komunikasi: presentasi, kerja tim.'],
  ['Poster Acara Kampus', 'Peran: desainer utama. Alat: Canva. Hasil: dipakai di semua media sosial kampus.'],
  ['Kontak', 'nadia.putri@email.com · linkedin.com/in/nadiaputri'],
];
function ex1(j, b) {
  only(b, 'button');
  document.getElementById('ex1s').innerHTML =
    `<div style="animation:fin .3s"><h5>${EX1[j][0]}</h5><p style="margin-top:6px">${EX1[j][1]}</p>${j == 3 ? '<div class="tiles" style="max-width:220px"><i style="background:#93c5fd"></i><i style="background:#c4b5fd"></i><i style="background:#fcd34d"></i></div>' : ''}</div>`;
}
const EX2 = [
  [1, 1, 1, '<b>Masuk.</b> Nyambung dengan posisi desainer, hasilnya bagus, dan peranmu jelas.'],
  [
    0,
    1,
    0,
    '<b>Jangan dimasukkan.</b> Fotonya mungkin bagus, tapi tidak ada hubungannya dengan posisi yang kamu lamar.',
  ],
  [
    1,
    1,
    0,
    '<b>Masuk, tapi lengkapi dulu.</b> Tambahkan keterangan peran dan hasilnya. Tanpa itu, perekrut tidak tahu kontribusimu.',
  ],
];
function ex2(j, b) {
  only(b, '.chip');
  const r = EX2[j];
  say(
    'ex2s',
    `<div class="row" style="gap:14px;margin-bottom:6px">${['Relevan', 'Berkualitas', 'Terbukti'].map((t, k) => `<span style="color:${r[k] ? 'var(--ok)' : 'var(--no)'};font-weight:600">${r[k] ? '✓' : '✗'} ${t}</span>`).join('')}</div>${r[3]}`,
  );
}
function ex3(j, b) {
  only(b, '.hs');
  b.parentNode.querySelectorAll('.z').forEach((z, k) => z.classList.toggle('on', k == j));
  say('ex3s', `<b>${b.dataset.t}.</b> ${b.dataset.d}`);
}
const EX5 = [
  'Cari "portfolio" di Canva dan pilih template yang simpel. Ukuran Presentasi 16:9 paling serbaguna.',
  'Isi profil, pendidikan, pengalaman, dan skill. Hapus teks contoh yang tidak terpakai.',
  'Unggah 3 sampai 6 karya. Tiap karya diberi judul, peran, dan hasil.',
  'Rapikan jarak, samakan huruf dan warna di semua halaman.',
  'Simpan versi awal, lalu cek ulang sebelum dibagikan.',
];
function ex5(j, b) {
  only(b, 'button');
  say('ex5s', `<b>Langkah ${j + 1}.</b> ${EX5[j]}`);
}
const EX6 = [
  ['PDF', 'Usahakan ukurannya di bawah 10 MB. Tambahkan juga tautan Canva di badan email sebagai versi online.'],
  ['PNG atau JPG', 'Unduh per halaman. Pilih halaman karya terbaikmu untuk dijadikan unggahan.'],
  [
    'Tautan "hanya lihat"',
    'Di Canva klik Bagikan, lalu ubah akses supaya siapa saja yang punya tautan bisa melihat. Cek dulu di jendela penyamaran.',
  ],
];
function ex6(j, b) {
  only(b, '.chip');
  say('ex6s', `<b>Pakai ${EX6[j][0]}.</b> ${EX6[j][1]}`);
}
const E7 = {};
function ex7(j, v, b) {
  E7[j] = v;
  only(b, 'button');
  const k = Object.keys(E7);
  if (k.length < 3) return say('ex7s', `Sudah ${k.length} dari 3 dinilai.`);
  const avg = ((E7[0] + E7[1] + E7[2]) / 3).toFixed(1),
    lo = k.filter((x) => E7[x] < 3).map((x) => RC[x].toLowerCase());
  say(
    'ex7s',
    lo.length
      ? `Rata-rata ${avg}. Yang perlu diperbaiki dulu: <b>${lo.join(', ')}</b>.`
      : `Rata-rata ${avg}. Semua sudah di angka 3 ke atas. Tinggal minta pendapat orang lain.`,
  );
}

/* ===== Video YouTube (dimuat saat diklik) ===== */
/* Video selalu diputar langsung di dalam halaman (permintaan pemilik: jangan pindah tab).
   Tidak ada tombol atau tulisan yang mengajak membuka YouTube di tab baru. */
/* Tiap tampilan video punya id sendiri (u), karena video yang sama bisa muncul di materi dan di jendela video sekaligus. */
let VUID = 0;
const vph = (id, t, u) =>
  `<button class="vph" onclick="vLoad('${u}')" aria-label="Putar video"><img class="vth" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" onload="vChk(this)" onerror="this.remove()"><span class="pl">${I('play')}</span><b>${t}</b><small>Klik untuk memutar di sini</small></button>`;
const ytB = (id, t) => {
  const u = 'v_' + id + '_' + ++VUID;
  return `<div class="emb" id="${u}" data-id="${id}" data-t="${esc(t)}">${vph(id, esc(t), u)}</div><div class="row vrow" style="margin-top:8px;display:none"><button class="link vx" onclick="vOff('${u}')">${I('x')} Tutup video</button></div>`;
};
/* Video yang sudah dihapus dari YouTube memberi gambar abu-abu 120px. Kalau itu yang muncul, cukup beri keterangan. */
function vChk(img) {
  if (img.naturalWidth > 120) return;
  const w = img.closest('.emb');
  if (!w) return;
  w.innerHTML = `<div class="vph vgone"><span class="pl">${I('info')}</span><b>${esc(w.dataset.t || 'Video')}</b><small>Videonya udah nggak ada di YouTube.</small></div>`;
}
function vLoad(u) {
  const w = document.getElementById(u);
  if (!w) return;
  const id = w.dataset.id;
  const og = /^https?:/.test(location.origin) ? '&origin=' + encodeURIComponent(location.origin) : '';
  w.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1${og}" title="Video YouTube" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen></iframe>`;
  const r = w.nextElementSibling;
  if (r && r.classList.contains('vrow')) r.style.display = '';
}
function vOff(u) {
  const w = document.getElementById(u);
  if (!w) return;
  w.innerHTML = vph(w.dataset.id, w.dataset.t, u);
  const r = w.nextElementSibling;
  if (r && r.classList.contains('vrow')) r.style.display = 'none';
}
/* Video dari halaman Sumber materi diputar di jendela video, bukan di tab baru. */
let VSEL = null;
function vPick(id, t) {
  VSEL = [id, t];
  sheet('vplay');
}

function unload(root) {
  root.querySelectorAll('.emb').forEach((e) => {
    if (e.querySelector('iframe')) vOff(e.id);
  });
  root.querySelectorAll('.aslot').forEach((s) => {
    if (s.innerHTML) {
      s.innerHTML = '';
      const b = s.closest('.art').querySelector('.ab1');
      if (b) b.innerHTML = I('eye') + ' Baca di sini';
    }
  });
}

/* ---------- materi ---------- */
SCR.materi = (i) => {
  const m = M[i],
    story = (S.mode || 'story') == 'story',
    SL_ = slides(i),
    next = i < 7 ? lock('materi', i + 1) : 'x';
  const row = (ic, cl, t, body) =>
    `<div class="acc"><button class="ah" aria-expanded="false" onclick="acc(this)"><span class="ic ${cl}">${typeof ic == 'number' ? `<b class="nb">${ic}</b>` : I(ic)}</span><b>${t}</b><span class="ck">${I('chk')}</span><span class="cv">${I('dn')}</span></button><div class="ab"><div><div class="ai">${body}</div></div></div></div>`;
  const listBody = `<div class="vcard"><div class="vhd"><span>${I('play')} Gambaran singkat</span><button class="link" onclick="visReplay(this)">${I('rst')} Putar ulang</button></div>${VIS[i]()}<p class="vcap">${VCAP[i]}</p></div><div class="grp">Isi materi</div>${m.p.map((x, j) => row(j + 1, 'num', x[0], `<p>${hl(x[1])}</p>`)).join('')}<div class="grp">Lihat dan coba</div>${row('spark', 'e', 'Contoh yang bisa kamu coba', `<div class="exw">${exH(i)}</div>`)}${row('copy', '', 'Kartu bolak-balik', `<p class="small" style="margin-bottom:8px">Klik kartu untuk membaliknya. Coba tebak dulu isinya sebelum dibalik.</p><div class="flips">${m.p.map((x, j) => `<button class="flip" onclick="this.classList.toggle('on');this.setAttribute('aria-pressed',this.classList.contains('on'))" aria-pressed="false"><span class="fi"><span class="ff"><small>Kartu ${j + 1}</small><b>${x[0]}</b><em>Klik untuk lihat penjelasan</em></span><span class="fbk">${x[1]}</span></span></button>`).join('')}</div>`)}${m.v ? row('play', 'v', 'Video: ' + m.v[1], ytB(m.v[0], m.v[1])) : ''}${row('warn', 'w', 'Yang sering salah', `<ul>${m.h.map((x) => `<li>${x}</li>`).join('')}</ul>`)}${row('bulb', 'w', 'Tips singkat', `<p>${m.tip}</p>`)}${row('target', 'e', 'Cek cepat: 1 soal' + (S.cq[i] ? ' · benar' : ''), cqH(i))}${row('chk', 'e', 'Yang perlu kamu ingat', `<ul>${TK[i].map((t) => `<li>${t}</li>`).join('')}</ul>`)}`;
  const lbl = S.md[i]
    ? i == 7
      ? mN() == 8
        ? 'Ke aktivitas'
        : 'Lanjut'
      : 'Lanjut ke materi ' + (i + 2)
    : 'Sudah paham';
  const head = `<div class="ph"><div class="row" style="justify-content:space-between;gap:8px"><span class="tag">Materi ${i + 1} dari 8${S.md[i] ? ' · selesai' : ''}</span><div class="row" style="gap:8px"><div class="seg2 mseg" role="tablist"><button role="tab" aria-selected="${story}" class="${story ? 'on' : ''}" onclick="setMode('story')">${I('play')}<span>Cerita</span></button><button role="tab" aria-selected="${!story}" class="${story ? '' : 'on'}" onclick="setMode('list')">${I('book')}<span>Ringkasan</span></button></div><button class="btn sm g mdd" onclick="sheet('mlist')">${I('map')} Peta</button></div></div><h2>${m.t}</h2>${story ? `<div class="dotsl" id="sdots">${SL_.map((_, k) => `<i title="Slide ${k + 1}" onclick="slGo(${k})"></i>`).join('')}</div>` : `<p>${m.s}</p><div class="mprog"><span class="tr"><i id="mpi"></i></span><span id="mpt">0 dari ${m.p.length + (m.v ? 7 : 6)} bagian dibuka</span><span class="hide-m small" style="margin-left:auto">Pindah materi: <span class="kbd">←</span> <span class="kbd">→</span></span></div>`}</div>`;
  const foot = story
    ? `<div class="pf"><button class="btn g" id="slp" onclick="slStep(-1)" aria-label="Slide sebelumnya">${I('bk')}<span class="lbl">Sebelumnya</span></button><span class="small slc" id="slc"></span><button class="btn" id="sln" onclick="slStep(1)">Lanjut ${I('arr')}</button></div>`
    : `<div class="pf"><button class="btn g" ${i == 0 ? 'disabled' : ''} onclick="go('materi',${i - 1})" aria-label="Materi sebelumnya">${I('bk')}<span class="lbl">Sebelumnya</span></button><button class="btn" onclick="listDone(this,${i})">${lbl} ${I(S.md[i] ? 'arr' : 'chk')}</button><button class="btn g" ${i == 7 || next ? 'disabled' : ''} onclick="go('materi',${i + 1})" aria-label="Materi berikutnya"><span class="lbl">Berikutnya</span>${I('arr')}</button></div>`;
  const bodyH = story
    ? `<div class="pb sl-wrap" id="pb"><div class="sltrack" id="slt">${SL_.map((h, k) => `<section class="sld" aria-hidden="true">${h}</section>`).join('')}</div></div>`
    : `<div class="pb scroll" id="pb">${listBody}</div>`;
  return `<div class="mat"><nav class="card rail mapr" aria-label="Peta materi">${mapH(i)}</nav><article class="card pane">${head}${bodyH}${foot}</article></div>`;
};
AFT.materi = (i) => {
  if ((S.mode || 'story') == 'story') {
    R.sl = R.sl || {};
    S.sr = S.sr || {};
    slShow(R.sl[i] != null ? R.sl[i] : Math.min(S.sr[i] || 0, document.getElementById('slt').children.length - 1), 0);
    slSwipe();
  } else visStart();
  const b = document.querySelector('.mock nav button');
  if (b) ex1(0, b);
  mapAnim();
};
function acc(b) {
  const a = b.parentNode,
    o = a.classList.contains('open');
  document.querySelectorAll('.acc.open').forEach((x) => {
    x.classList.remove('open');
    x.querySelector('.ah').setAttribute('aria-expanded', 'false');
    unload(x);
  });
  if (!o) {
    a.classList.add('open', 'seen');
    mprog();
    b.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      const pb = document.getElementById('pb');
      if (!pb) return;
      const t = a.offsetTop - pb.offsetTop - 8;
      if (t < pb.scrollTop || t > pb.scrollTop + pb.clientHeight * 0.45) pb.scrollTo({ top: t, behavior: 'smooth' });
    }, 340);
  }
}
function doneM(i) {
  const was = S.md[i];
  S.md[i] = 1;
  save();
  if (!was) {
    sfx('ok');
    if (mN() == 8) {
      conf();
      toast('Semua materi beres. Aktivitas udah kebuka.', 'chk');
    } else toast(`Materi ${i + 1} selesai.`, 'chk');
  }
  if (i < 7) go('materi', i + 1, 'f');
  else if (mN() == 8) go('konsep', 0, 'f');
  else {
    const n = nxt();
    toast(`Masih ada yang belum: ${n.l}`, 'info');
    go(n.r, n.i, 'b');
  }
}

/* ---------- aktivitas ---------- */
SCR.akt = () => {
  const n = nxt(),
    pl = lock('praktik');
  return `<div class="ah2"><div><h2>Aktivitas</h2><p>Boleh diulang sampai benar.</p></div><span class="tag">${aN()} dari 7 selesai${aN() < 7 ? `, sekitar ${(7 - aN()) * estM('a1')} menit lagi` : ''}</span></div>
 <div class="agrid stagger">${AK.map((a, j) => `<button class="at ${S.a[a.k] ? 'ok' : ''} ${n.r == a.k ? 'nx glowb' : ''}" onclick="go('${a.k}')"><span class="num">${S.a[a.k] ? '✓ Selesai' : 'Aktivitas ' + (j + 1)}</span><b>${a.t}</b><span class="ad">${AD[j]}</span><small>${a.m}<span class="ago">${S.a[a.k] ? 'Ulangi' : 'Mulai'} ${I('arr')}</span></small></button>`).join('')}<button class="at prk ${pl ? 'lkd' : ''}" onclick="go('praktik')"><span class="num">${pl ? 'Terkunci' : 'Terbuka'}</span><b>Lanjut ke praktik</b><small>${pl ? 'Selesaikan semua aktivitas dulu' : 'Saatnya bikin di Canva'}</small></button></div>`;
};
function shell(k, q, body) {
  const j = +k[1];
  return `<article class="card pane"><div class="ph"><div class="row" style="justify-content:space-between"><span class="tag">Aktivitas ${j} dari 7 · ${AK[j - 1].m}</span><button class="btn sm g" onclick="go('akt',0,'b')">${I('task')} Semua aktivitas</button></div><h2>${AK[j - 1].t}</h2><p>${q}</p></div><div class="pb scroll">${body}</div><div class="pf"><button class="btn g" onclick="reAct('${k}')">${I('rst')}<span class="lbl">Ulangi</span></button><button class="btn" id="anx" ${S.a[k] ? '' : 'disabled'} onclick="nextAct('${k}')">${j < 7 ? 'Aktivitas berikutnya' : 'Ke praktik'} ${I('arr')}</button></div></article>`;
}
function reAct(k) {
  delete R[k];
  go(k, 0, 'f');
  document.querySelector('.scr').classList.add('still');
}
function nextAct(k) {
  const j = +k[1];
  go(j < 7 ? 'a' + (j + 1) : 'praktik', 0, 'f');
}
function win(k, msg) {
  const first = !S.a[k];
  S.a[k] = 1;
  save();
  if (first) {
    sfx('ok');
    setTimeout(() => {
      const b = document.getElementById('anx');
      if (b) b.disabled = false;
      hdr();
    }, 0);
    if (aN() == 7) {
      conf();
      toast('Semua aktivitas beres. Praktik udah kebuka.', 'chk');
    }
  }
  return `<div class="fb ok">${I('chk')}<span>${msg}</span></div>`;
}
const bad = (m) => `<div class="fb no">${I('x')}<span>${m}</span></div>`;

const A1 = {
  o: [
    'Media untuk menunjukkan kompetensi dan pengalaman, terutama untuk persiapan masuk dunia kerja',
    'Dokumen berisi riwayat gaji dan identitas pribadi lengkap',
    'Kumpulan semua file di laptop tanpa disusun',
  ],
  a: 0,
  w: [
    '',
    'Riwayat gaji dan data pribadi lengkap bukan isi portofolio. Coba lagi.',
    'Portofolio justru dipilih dan disusun rapi. Coba lagi.',
  ],
  ok: 'Tepat. Portofolio dipakai untuk menunjukkan kemampuanmu ke perekrut.',
};
const A4 = {
  a: 1,
  w: ['Tampilan A memang ramai, tapi bikin mata capek dan susah fokus. Coba bandingkan dengan B.', ''],
  ok: 'Betul. Tampilan B memakai layout rapi, warna senada, satu jenis huruf, dan gayanya konsisten.',
};
SCR.a1 = () =>
  shell(
    'a1',
    'Pilih satu jawaban.',
    `<p class="q">Mana yang paling tepat menggambarkan fungsi portofolio digital?</p><div class="opts">${A1.o.map((o, j) => `<button class="op" onclick="mcq('a1',${j},this)"><span class="l">${'ABC'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="fb_a1"></div>`,
  );
SCR.a4 = () =>
  shell(
    'a4',
    'Dua tampilan halaman profil. Klik yang menurutmu lebih enak dibaca.',
    `<div class="two"><button class="vm" onclick="mcq('a4',0,this)"><div class="vmA"><b>HALO!! INI AKU</b><span>kreatif ✿ rajin ✿ suka desain</span><i style="right:12px;top:10px">★</i><i style="left:40%;bottom:8px">✦</i><i style="right:30%;bottom:20px">♥</i></div><b>Tampilan A</b></button><button class="vm" onclick="mcq('a4',1,this)"><div class="vmB"><small style="color:#64748b">Desainer Grafis</small><b>Nadia Putri</b><div class="bx"><i></i><i></i><i></i></div></div><b>Tampilan B</b></button></div><div id="fb_a4"></div>`,
  );
function mcq(k, j, b) {
  const D = k == 'a1' ? A1 : A4,
    f = document.getElementById('fb_' + k);
  if (j == D.a) {
    b.parentNode.querySelectorAll('.op,.vm').forEach((x) => (x.disabled = true));
    b.classList.add('ok');
    f.innerHTML = win(k, D.ok);
  } else {
    b.classList.add('no');
    b.disabled = true;
    sfx('no');
    f.innerHTML = bad(D.w[j]);
  }
}

const A2O = ['Profil', 'Pendidikan dan pengalaman', 'Skill', 'Karya', 'Kontak'],
  A2S = [3, 0, 4, 1, 2];
SCR.a2 = () => {
  const q = R.a2 || (R.a2 = []);
  let fb = '';
  if (q.length == 5) {
    fb =
      q.join() == '0,1,2,3,4'
        ? win('a2', 'Urutannya pas: kenalan dulu, lihat bukti, lalu tahu cara menghubungi.')
        : bad(
            'Belum pas. Urutan yang umum: Profil, Pendidikan dan pengalaman, Skill, Karya, Kontak. Klik Ulangi untuk coba lagi.',
          );
  }
  return shell(
    'a2',
    'Klik kartu satu per satu, dari bagian pertama sampai terakhir.',
    `<div class="slot" aria-label="Urutanmu">${q.length ? q.map((x, j) => `<span class="tag">${j + 1}. ${A2O[x]}</span>`).join('') : '<span class="small" style="padding:0 4px">Urutanmu muncul di sini.</span>'}</div><div class="cards">${A2S.map((x) => `<button class="kc ${q.includes(x) ? 'on' : ''}" ${q.includes(x) || q.length == 5 ? 'disabled' : ''} onclick="R.a2.push(${x});${'go'}('a2')"><span class="o">${q.includes(x) ? q.indexOf(x) + 1 : ''}</span>${A2O[x]}</button>`).join('')}</div>${fb}`,
  );
};

const KR = [
  ['A', 'Poster kampanye digital acara kampus'],
  ['B', 'Piagam juara 1 turnamen Mobile Legends antarjurusan'],
  ['C', 'Redesain logo brand UMKM lokal'],
  ['D', 'Surat keterangan panitia seksi konsumsi bakti sosial'],
  ['E', 'Desain feed Instagram organisasi'],
];
SCR.a3 = () => {
  const p = R.a3 || (R.a3 = { pk: {}, done: 0 }),
    n = Object.values(p.pk).filter(Boolean).length;
  let fb = '';
  if (p.done)
    fb =
      p.pk.B && p.pk.D
        ? win(
            'a3',
            'Tepat. Piagam game dan surat panitia konsumsi tidak menunjukkan kemampuan desain, jadi tidak perlu dimasukkan.',
          )
        : bad(
            'Belum tepat. Jawabannya B dan D (yang hijau), karena keduanya tidak menunjukkan kemampuan desain. Sisanya justru karya desain yang relevan. Klik Ulangi untuk coba lagi.',
          );
  return shell(
    'a3',
    'Kamu melamar sebagai Graphic Designer dan punya lima berkas ini. Pilih dua yang paling tidak nyambung untuk dimasukkan.',
    `<div class="cards">${KR.map((k) => {
      const on = p.pk[k[0]],
        bd = 'BD'.includes(k[0]);
      const c = p.done ? (bd ? 'ok' : on ? 'no' : '') : on ? 'on' : '';
      return `<button class="kc ${c}" ${p.done ? 'disabled' : ''} onclick="a3('${k[0]}')"><span class="o">${p.done ? (bd ? '✓' : on ? '✗' : '') : on ? '✓' : k[0]}</span>${k[1]}</button>`;
    }).join(
      '',
    )}</div><div class="row" style="margin-top:12px"><button class="btn sm" ${n != 2 || p.done ? 'disabled' : ''} onclick="R.a3.done=1;go('a3')">${I('chk')} Cek pilihanku</button><span class="small">${p.done ? '' : n + ' dari 2 dipilih'}</span></div>${fb}`,
  );
};
function a3(k) {
  const p = R.a3,
    n = Object.values(p.pk).filter(Boolean).length;
  if (!p.pk[k] && n >= 2) {
    toast('Cukup pilih dua. Batalkan salah satu dulu.', 'info');
    return;
  }
  p.pk[k] = !p.pk[k];
  go('a3');
}

const M5 = [
    ['Layout', 'Susunan posisi elemen agar rapi dan mudah dibaca'],
    ['Tipografi', 'Pemilihan jenis, ukuran, dan gaya huruf'],
    ['Kurasi', 'Memilih karya dan informasi yang paling relevan'],
    ['Template', 'Kerangka tampilan siap pakai di Canva'],
    ['Konsistensi', 'Gaya yang sama di semua halaman'],
  ],
  O5 = [3, 0, 4, 2, 1];
SCR.a5 = () => {
  const s = R.a5 || (R.a5 = { m: [], sel: null });
  return shell(
    'a5',
    'Klik satu istilah di kiri, lalu klik pengertiannya di kanan.',
    `<div class="mt"><div>${M5.map((x, j) => `<button class="${s.m.includes(j) ? 'ok' : s.sel === j ? 'on' : ''}" onclick="a5L(${j},this)">${x[0]}</button>`).join('')}</div><div>${O5.map((j) => `<button class="${s.m.includes(j) ? 'ok' : ''}" onclick="a5R(${j},this)">${M5[j][1]}</button>`).join('')}</div></div>${s.m.length == 5 ? win('a5', 'Semua pasangan cocok. Istilah-istilah ini bakal sering kamu temui saat praktik.') : `<div class="fb n">${I('info')}<span>${s.m.length} dari 5 pasangan cocok.</span></div>`}`,
  );
};
function a5L(j, b) {
  R.a5.sel = j;
  only(b, 'button');
}
function a5R(j, b) {
  const s = R.a5;
  if (s.sel == null) {
    toast('Pilih istilah di kolom kiri dulu.', 'info');
    return;
  }
  if (s.sel == j) {
    s.m.push(j);
    s.sel = null;
    sfx('up');
    go('a5');
  } else {
    b.classList.remove('no');
    void b.offsetWidth;
    b.classList.add('no');
    sfx('no');
    toast('Belum cocok. Coba pasangan lain.', 'x');
  }
}

const T6 = [
  [
    'Portofolio digital sama persis dengan CV.',
    0,
    'CV berisi ringkasan informasi, portofolio memperlihatkan bukti karya.',
  ],
  [
    'Semakin banyak karya dimasukkan, semakin baik.',
    0,
    'Pilih yang relevan dan terbaik. Tiga sampai enam karya sudah cukup.',
  ],
  [
    'Akses tautan portofolio sebaiknya "hanya lihat".',
    1,
    'Dengan akses hanya lihat, orang lain tidak bisa mengubah portofoliomu.',
  ],
  [
    'Memakai banyak jenis huruf bikin desain lebih menarik.',
    0,
    'Cukup satu atau dua jenis huruf supaya tampilan konsisten dan mudah dibaca.',
  ],
  [
    'Portofolio perlu dicek ulang sebelum dibagikan.',
    1,
    'Cek salah ketik, kualitas gambar, dan tautan supaya kesan pertamanya baik.',
  ],
];
SCR.a6 = () => {
  const s = R.a6 || (R.a6 = { i: 0, a: [] }),
    fin = s.i >= 5,
    sc = s.a.filter((v, j) => v == T6[j][1]).length;
  const dots = `<div class="dots">${T6.map((_, j) => `<i class="${j < s.a.length ? (s.a[j] == T6[j][1] ? 'ok' : 'no') : j == s.i ? 'on' : ''}"></i>`).join('')}</div>`;
  if (fin)
    return shell(
      'a6',
      'Benar atau salah?',
      `${dots}<div class="tfc"><p class="q">Skormu ${sc} dari 5</p><p class="small">${sc == 5 ? 'Sempurna, semuanya benar.' : 'Baca lagi penjelasan yang tadi salah. Kalau mau, klik Ulangi.'}</p></div>${win('a6', 'Aktivitas selesai. Salah kaprah yang paling sering sudah kamu kenali.')}`,
    );
  const x = T6[s.i],
    ans = s.a[s.i];
  return shell(
    'a6',
    'Benar atau salah?',
    `${dots}<div class="tfc"><span class="tag">Pernyataan ${s.i + 1} dari 5</span><p class="q">"${x[0]}"</p><div class="row" style="justify-content:center">${[
      ['Benar', 1],
      ['Salah', 0],
    ]
      .map(
        (b) =>
          `<button class="btn ${ans != null && b[1] == x[1] ? 'okb' : 'g'}" ${ans != null ? 'disabled' : ''} style="min-width:120px" onclick="a6(${b[1]})">${b[0]}</button>`,
      )
      .join(
        '',
      )}</div>${ans != null ? `<div class="fb ${ans == x[1] ? 'ok' : 'no'}">${I(ans == x[1] ? 'chk' : 'x')}<span><b>${ans == x[1] ? 'Tepat.' : 'Kurang tepat.'}</b> ${x[2]}</span></div><button class="btn" style="margin-top:12px" onclick="R.a6.i++;go('a6')">${s.i < 4 ? 'Pernyataan berikutnya' : 'Lihat skor'} ${I('arr')}</button>` : ''}</div>`,
  );
};
function a6(v) {
  R.a6.a[R.a6.i] = v;
  sfx(v == T6[R.a6.i][1] ? 'ok' : 'no');
  go('a6');
}

const S7 = [
    'Tentukan tujuan dan pilih template',
    'Masukkan profil, pendidikan, dan skill',
    'Unggah dan susun karya',
    'Rapikan layout, warna, dan huruf',
    'Periksa hasilnya',
    'Simpan atau bagikan',
  ],
  O7 = [3, 0, 5, 2, 4, 1];
SCR.a7 = () => {
  const o = R.a7 || (R.a7 = []);
  return shell(
    'a7',
    'Klik langkah sesuai urutan yang benar, dari yang pertama.',
    `<div class="slot">${o.length ? o.map((i, j) => `<span class="tag">${j + 1}. ${S7[i]}</span>`).join('') : '<span class="small" style="padding:0 4px">Langkah yang kamu pilih muncul di sini.</span>'}</div><div class="cards">${O7.filter(
      (i) => !o.includes(i),
    )
      .map((i) => `<button class="kc" onclick="a7(${i},this)"><span class="o"></span>${S7[i]}</button>`)
      .join(
        '',
      )}</div>${o.length == 6 ? win('a7', 'Urutannya benar. Alur ini yang akan kamu pakai di praktik.') : `<div class="fb n">${I('info')}<span>Cari langkah ke-${o.length + 1}.</span></div>`}`,
  );
};
function a7(i, b) {
  if (i == R.a7.length) {
    R.a7.push(i);
    sfx('up');
    go('a7');
  } else {
    b.classList.remove('no');
    void b.offsetWidth;
    b.classList.add('no');
    sfx('no');
    toast(`Itu belum langkah ke-${R.a7.length + 1}.`, 'x');
  }
}

/* ---------- praktik ---------- */
/* checklist pribadi di samping praktik, disimpan di S.pc */
const PCHK = [
  'Nama dan posisi yang dilamar kebaca jelas di sampul',
  'Ada kontak yang bisa dihubungi (email atau LinkedIn)',
  'Karya terkuat ada di urutan pertama',
  'Tiap karya ada judul, peranmu, dan hasilnya',
  'Udah dicek typo-nya, minimal sekali',
  'Tautan Canva udah diset bisa dilihat semua orang',
];
SCR.praktik = () => {
  const k = R.pk == null ? Math.min(prN(), 3) : R.pk,
    p = PR[k],
    all = prN() == 4;
  return `<div class="prak ${R.pm == 'sim' ? 'one' : ''}"><article class="card pane"><div class="ph"><span class="tag">Praktik · ${prN()} dari 4 langkah</span><h2>Bikin portofoliomu di Canva</h2><p>${R.pm == 'sim' ? 'Atur di sini, hasilnya langsung kelihatan.' : 'Buka Canva di tab lain, kerjakan langkahnya, lalu centang di sini.'}</p></div><div class="pb scroll">${pmSeg()}${
    R.pm == 'sim'
      ? simH()
      : `<div class="steps">${PR.map((s, j) => `<button class="${j == k ? 'on' : ''} ${S.pr[j] ? 'ok' : ''}" onclick="R.pk=${j};go('praktik')"><span>${S.pr[j] ? '✓' : j + 1}</span>${s.t}</button>`).join('')}</div>
 <h3 class="pp" style="font-size:19px">${k + 1}. ${p.t}</h3><p class="small">${p.d}</p><ul class="do">${p.l.map((x, j) => `<li><span>${j + 1}</span>${x}</li>`).join('')}</ul><button class="tick ${S.pr[k] ? 'on' : ''}" onclick="tick(${k})"><span class="bx">${I('chk')}</span>${S.pr[k] ? 'Langkah ini sudah selesai' : 'Tandai langkah ini selesai'}</button>
 ${all ? `<div class="fb ok">${I('chk')}<span>Keren, portofoliomu sudah jadi. Evaluasi sudah terbuka.</span></div>` : ''}`
  }</div>
 <div class="pf">${R.pm == 'sim' ? `<span></span><button class="btn" onclick="R.pm='steps';go('praktik',0,'b')">${I('task')} Lanjut ke langkah di Canva</button>` : `<button class="btn g" ${k == 0 ? 'disabled' : ''} onclick="R.pk=${k - 1};go('praktik')">${I('bk')}<span class="lbl">Sebelumnya</span></button>${all ? `<button class="btn" onclick="go('evaluasi')">Ke evaluasi ${I('arr')}</button>` : `<button class="btn g" ${k == 3 ? 'disabled' : ''} onclick="R.pk=${k + 1};go('praktik')"><span class="lbl">Berikutnya</span>${I('arr')}</button>`}`}</div></article>
 <aside class="card pside"><a class="btn" href="https://www.canva.com" target="_blank" rel="noopener">${I('ext')} Buka Canva</a><button class="btn g" onclick="sheet('vid')">${I('play')} Lihat tutorial</button><button class="btn g" onclick="sheet('book')">${I('doc')} Contoh jadi</button><button class="btn g" onclick="sheet('tpl')">${I('grid')} Gaya template</button><button class="btn g" onclick="sheet('ai')">${I('chat')} Tanya Kak Folio</button><div class="hide-m" style="width:100%"><p class="small" style="margin:8px 0 6px">Tautan portofoliomu (opsional)</p><input class="inp" placeholder="https://www.canva.com/design/..." value="${esc(S.link)}" oninput="S.link=this.value.trim();save()" aria-label="Tautan portofolio"></div><div class="pchk hide-m"><p class="pchkh">Cek dulu sebelum dikirim</p>${PCHK.map((x, j) => `<label class="pchki"><input type="checkbox" ${S.pc && S.pc[j] ? 'checked' : ''} onchange="S.pc=S.pc||{};S.pc[${j}]=this.checked;save()"><span>${x}</span></label>`).join('')}</div></aside></div>`;
};
function tick(k) {
  S.pr[k] = !S.pr[k];
  save();
  if (S.pr[k]) {
    sfx('ok');
    if (prN() == 4) {
      conf();
      toast('Praktik beres. Evaluasi udah kebuka.', 'chk');
    } else {
      const nx = PR.findIndex((_, j) => !S.pr[j]);
      R.pk = nx < 0 ? k : nx;
    }
  }
  go('praktik');
}

/* ---------- evaluasi ---------- */
const evSc = (e) => Math.round((e.a.filter((v, j) => v == QZ[j][2]).length / QZ.length) * 100);
SCR.evaluasi = () => {
  const e = R.ev || (R.ev = { i: 0, a: [] });
  if (e.i >= QZ.length) {
    const sc = evSc(e),
      wrong = [...new Set(QZ.map((q, j) => (e.a[j] != q[2] ? q[3] : null)).filter((x) => x != null))];
    return `<article class="card pane"><div class="pb scroll"><div class="res" style="padding:10px 0"><div class="bring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" stroke="var(--pl)"/><circle cx="60" cy="60" r="52" stroke="${sc >= 70 ? 'var(--ok)' : 'var(--p)'}" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="${326.7 * (1 - sc / 100)}"/></svg><div class="v"><div>${sc}<small>dari 100</small></div></div></div><div><h2 data-type class="pp" style="color:var(--pd);font-size:clamp(20px,2.6vw,26px)">${sc >= 85 ? 'Mantap, hampir semua benar.' : sc >= 70 ? 'Bagus, sebagian besar sudah kamu pahami.' : 'Lumayan. Ada beberapa bagian yang perlu dibaca lagi.'}</h2><p style="color:var(--mute);margin-top:6px">Nilai terbaik ${S.ev.best} · percobaan ke-${S.ev.tries}</p>${cmpH(sc)}${sc >= 70 ? `<button class="btn sm" style="margin-top:12px" onclick="sheet('cert')">${I('award')} Ambil sertifikatmu</button>` : ''}${wrong.length ? `<p style="margin-top:12px;font-weight:600">Coba baca ulang:</p><div class="chips">${wrong.map((m) => `<button class="chip" onclick="go('materi',${m})">Materi ${m + 1}: ${M[m].t}</button>`).join('')}</div>` : ''}</div></div></div><div class="pf"><button class="btn g" onclick="R.ev=null;go('evaluasi',0,'f')">${I('rst')}<span class="lbl">Coba lagi</span></button><button class="btn" onclick="go('refleksi')">Ke refleksi ${I('arr')}</button></div></article>`;
  }
  const q = QZ[e.i],
    a = e.a[e.i];
  return `<article class="card pane"><div class="ph"><div class="row" style="justify-content:space-between"><span class="tag">Soal ${e.i + 1} dari ${QZ.length}</span><span class="small">Nilai terbaik: ${S.ev.best ?? 'belum ada'}</span></div><div class="qbar" style="margin-top:12px"><i style="width:${(e.i / QZ.length) * 100}%"></i></div></div><div class="pb scroll"><p class="q">${q[0]}</p><div class="opts">${q[1].map((o, j) => `<button class="op ${a != null ? (j == q[2] ? 'ok' : j == a ? 'no' : '') : ''}" ${a != null ? 'disabled' : ''} onclick="evA(${j})"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div>${a != null ? `<div class="fb ${a == q[2] ? 'ok' : 'no'}">${I(a == q[2] ? 'chk' : 'x')}<span><b>${a == q[2] ? 'Benar.' : 'Kurang tepat.'}</b> ${q[4]}</span></div>` : ''}</div><div class="pf"><span></span><button class="btn" ${a == null ? 'disabled' : ''} onclick="${e.i < QZ.length - 1 ? 'evN()' : "loadBtn(this,evN,'Menghitung nilai...')"}">${e.i < QZ.length - 1 ? 'Soal berikutnya' : 'Lihat hasil'} ${I('arr')}</button></div></article>`;
};
function evA(j) {
  const e = R.ev;
  e.a[e.i] = j;
  sfx(j == QZ[e.i][2] ? 'ok' : 'no');
  go('evaluasi');
}
function evN() {
  const e = R.ev;
  e.i++;
  if (e.i >= QZ.length) {
    const sc = evSc(e);
    S.ev.tries++;
    S.ev.best = Math.max(S.ev.best ?? 0, sc);
    save();
    if (sc >= 70) {
      conf();
      sfx('ok');
    }
  }
  go('evaluasi', 0, 'f');
}

/* ---------- refleksi ---------- */
SCR.refleksi =
  () => `<article class="card pane"><div class="ph"><span class="tag">Refleksi</span><h2>Sekarang giliran kamu menilai diri sendiri</h2><p>Tulis apa adanya, nggak ada jawaban salah.</p></div><div class="pb scroll">${RQ.map((q, j) => `<p style="font-weight:600;margin:${j ? '16px' : '0'} 0 8px">${j + 1}. ${q}</p><textarea class="inp" maxlength="500" placeholder="Tulis di sini..." aria-label="Jawaban ${j + 1}" oninput="S.rf.t${j}=this.value;save();document.getElementById('c${j}').textContent=this.value.length+'/500';rfChk()">${esc(S.rf['t' + j])}</textarea><div class="small" style="text-align:right" id="c${j}">${S.rf['t' + j].length}/500</div>`).join('')}
 <p style="font-weight:600;margin:14px 0 4px">3. Kalau dinilai 1 sampai 4, portofoliomu sekarang ada di angka berapa?</p><div class="rb">${RC.map((c, j) => `<span>${c}</span><div class="sc4">${[1, 2, 3, 4].map((v) => `<button class="${S.rf.r[j] == v ? 'on' : ''}" onclick="S.rf.r[${j}]=${v};save();only(this,'button');rfChk()">${v}</button>`).join('')}</div>`).join('')}</div></div>
 <div class="pf"><span class="small" id="rfh"></span><button class="btn" id="rfb" onclick="if(rfOk())morph(this,rfDone)">Simpan dan selesai ${I('chk')}</button></div></article>`;
AFT.refleksi = () => rfChk();
AFT.praktik = () => {
  if (R.pm == 'sim') simU();
};
const rfOk = () => S.rf.t0.trim().length >= 5 && S.rf.t1.trim().length >= 5 && Object.keys(S.rf.r).length == 3;
function rfChk() {
  const b = document.getElementById('rfb'),
    h = document.getElementById('rfh');
  if (!b) return;
  b.disabled = !rfOk();
  h.textContent = rfOk() ? '' : 'Isi semuanya dulu ya.';
}
function rfDone() {
  if (!rfOk()) return;
  const f = !S.rf.done;
  S.rf.done = 1;
  save();
  sfx('ok');
  if (f) conf();
  go('rapor', 0, 'f');
}

/* ---------- rapor ---------- */
SCR.rapor = () => {
  const p = pct(),
    r = S.rf.r,
    avg = Object.keys(r).length == 3 ? ((r[0] + r[1] + r[2]) / 3).toFixed(1) : '-';
  return `<article class="card pane"><div class="pb scroll"><div class="res" style="padding:8px 0 18px"><div class="bring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" stroke="var(--pl)"/><circle cx="60" cy="60" r="52" stroke="${p >= 100 ? 'var(--ok)' : 'var(--p)'}" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="${326.7 * (1 - p / 100)}"/></svg><div class="v"><div>${p}%<small>progres</small></div></div></div><div><span class="tag">${I('star')} Rapor belajar</span><h2 data-cine class="pp" style="color:var(--pd);margin-top:8px;font-size:clamp(20px,2.8vw,28px)">${p >= 100 ? `Selesai${S.name ? ', ' + esc(S.name) : ''}. Portofoliomu siap dipakai melamar.` : 'Rapor sementara. Masih ada bagian yang belum selesai.'}</h2><p style="color:var(--mute);margin-top:6px">${p >= 100 ? 'Jangan lupa perbarui portofoliomu setiap ada karya baru.' : ''}</p></div></div>
 <div class="stats">${[
   ['Materi', mN() + '/8', mN() == 8],
   ['Aktivitas', aN() + '/7', aN() == 7],
   ['Praktik', prN() + '/4', prN() == 4],
   ['Tes awal', S.pre.sc ?? '-', S.pre.sc != null],
   ['Evaluasi', S.ev.best ?? '-', S.ev.best >= 70],
   ['Nilai diri', avg, !!S.rf.done],
 ]
   .map((x) => `<div class="st ${x[2] ? 'ok' : ''}"><b>${x[1]}</b><small>${x[0]}</small></div>`)
   .join('')}</div>
 ${/^https?:\/\//.test(S.link) ? `<p style="margin-top:14px" class="small">Tautan portofoliomu: <a href="${esc(S.link)}" target="_blank" rel="noopener">${esc(S.link)}</a></p>` : ''}
 ${S.rf.t1 ? `<div class="say" style="margin-top:14px"><b>Rencana perbaikanmu:</b> ${esc(S.rf.t1)}</div>` : ''}${S.pre.sc != null && S.ev.best != null ? cmpH(S.ev.best) : ''}<div class="rpx"><button class="rpb" onclick="sheet('cert')">${I('award')}<b>Sertifikat</b><small>${S.ev.best >= 70 ? 'Siap diunduh' : 'Nilai evaluasi min. 70'}</small></button><button class="rpb" onclick="go('konsep')">${I('net')}<b>Peta konsep</b><small>Rangkuman 8 materi</small></button><button class="rpb" onclick="sheet('book')">${I('doc')}<b>Contoh portofolio</b><small>Bandingkan sama punyamu</small></button></div><p style="font-weight:600;margin:16px 0 8px">Lencana (${bdN()} dari ${BD.length})</p>${bdGrid()}</div>
 <div class="pf"><button class="btn g" onclick="sheet('reset')">${I('rst')}<span class="lbl">Mulai dari awal</span></button><div class="row"><button class="btn g" onclick="sheet('survey')">${I('star')}<span class="lbl">Beri penilaian</span></button><button class="btn g" onclick="loadBtn(this,copyR,'Menyalin...',1)">${I('copy')}<span class="lbl">Salin ringkasan</span></button><button class="btn" onclick="go('home',0,'b')">${I('home')} Beranda</button></div></div></article>`;
};
function copyR() {
  const t = `Rapor belajar FolioKit${S.name ? ' - ' + S.name : ''}\nMateri ${mN()}/8, Aktivitas ${aN()}/7, Praktik ${prN()}/4, Evaluasi ${S.ev.best ?? '-'}\nProgres ${pct()}%${S.link ? '\nPortofolio: ' + S.link : ''}`;
  const f = () => toast('Browser ini nggak bisa nyalin otomatis. Salin manual aja ya.', 'x');
  try {
    navigator.clipboard.writeText(t).then(() => toast('Ringkasan disalin.', 'chk'), f);
  } catch (e) {
    f();
  }
}

/* ---------- panel ---------- */
function sheet(k) {
  const sh = document.getElementById('sh'),
    b = document.getElementById('shb');
  sh.classList.toggle('mid', k != 'menu' && k != 'mlist' && k != 'acc');
  sh.classList.toggle(
    'xwide',
    k == 'nama' || k == 'owner' || k == 'intro' || k == 'book' || k == 'cert' || k == 'tpl' || k == 'aicek',
  );
  sh.classList.toggle('aish', k == 'ai');
  // jendela menu tampil sebagai laci yang geser dari kiri (menu utama di HP, pencarian di laptop)
  // menu, profil, dan daftar materi tampil sebagai laci dari kiri supaya nyambung dengan sidebar kiri
  sh.classList.toggle('drawer', k == 'menu' || k == 'acc' || k == 'mlist');
  sh.classList.toggle('radial', k == 'radial');
  if (k != 'owner' && OWU) {
    OWU();
    OWU = null;
  }
  sh.classList.toggle('wide', k == 'badges');
  const SH = {
    menu: [
      'Menu',
      () => {
        const mi = (ic, t, on, sm, lk) =>
          `<button class="mi ${lk ? 'lk' : ''}" onclick="${on}"><span class="ic">${I(lk ? 'lock' : ic)}</span><b>${t}</b>${sm ? `<small>${lk ? 'Terkunci' : sm}</small>` : lk ? '<small>Terkunci</small>' : ''}</button>`;
        const nav = [
          ['home', 'Beranda', 'home', ''],
          ['book', 'Materi', 'materi', `${mN()}/8`],
          ['task', 'Aktivitas', 'akt', `${aN()}/7`],
          ['lap', 'Praktik', 'praktik', `${prN()}/4`],
          ['flag', 'Evaluasi', 'evaluasi', S.ev.best != null ? 'Nilai ' + S.ev.best : ''],
          ['ref', 'Refleksi', 'refleksi', S.rf.done ? 'Selesai' : ''],
          ['star', 'Rapor', 'rapor', ''],
        ]
          .map((x) => mi(x[0], x[1], x[2] == 'materi' ? "go('materi',firstM())" : `go('${x[2]}')`, x[3], lock(x[2])))
          .join('');
        const help =
          mi('chat', 'Tanya Kak Folio', "sheet('ai')", 'Tanya jawab') +
          mi('doc', 'Contoh portofolio jadi', "sheet('book')", '7 halaman') +
          mi('grid', 'Gaya template Canva', "sheet('tpl')", '3 gaya') +
          (lock('konsep') ? '' : mi('net', 'Peta konsep', "go('konsep')", 'Rangkuman')) +
          (S.ev.best >= 70 ? mi('award', 'Sertifikat', "sheet('cert')", 'Siap diunduh') : '') +
          mi('doc', 'Sumber materi', "sheet('src')", REFS.length + VIDS().length + ' rujukan');
        const etc =
          mi('out', 'Halaman awal', "go('welcome',0,'b')", '') +
          mi(
            'info',
            'Ulangi tur panduan',
            "closeSh();setTimeout(()=>tourStart(cur.r=='materi'?'materi':'home',1),350)",
            '',
          ) +
          mi('star', 'Beri penilaian', "sheet('survey')", S.sv && S.sv.at ? 'Terkirim' : '1 menit') +
          (ROLE.edit ? mi('eye', 'Mode pratinjau', "sheet('prev')", S.prev ? 'Aktif' : 'Untuk penguji') : '') +
          mi('gear', 'Pengaturan', "sheet('set')", 'Teks, animasi, suara') +
          mi('target', 'Tentang', "sheet('about')", '') +
          mi('rst', 'Mulai dari awal', "sheet('reset')", '');
        return (
          `<label class="msr">${I('search')}<input id="msq" type="search" placeholder="Cari materi atau pertanyaan..." autocomplete="off" oninput="mSearch(this.value)" aria-label="Cari"></label><div id="msres" hidden></div><div id="mlist0">` +
          (ROLE.owner
            ? `<button class="mi own" onclick="sheet('owner')"><span class="ic">${I('crown')}</span><b>Panel pemilik</b><small>Khusus kamu</small></button>`
            : '') +
          `<p class="mgh">Belajar</p>${nav}<p class="mgh">Studio</p>${mi('spark', 'Bikin portofolio sendiri', "go('studio')", 'Studio')}<p class="mgh">Bantuan</p>${help}<p class="mgh">Lainnya</p><div class="mgo">${etc}</div></div>`
        );
      },
    ],
    acc: ['Profil', accSheet],
    nama: ['Sebelum mulai', nameSheet],
    ai: ['Tanya Kak Folio', aiSheet],
    cert: ['Sertifikat', certSheet],
    tpl: ['Gaya template Canva', tplSheet],
    intro: ['Video intro', introSheet],
    owner: ['Panel pemilik', ownSheet],
    survey: ['Beri penilaian', svSheet],
    prev: [
      'Mode pratinjau',
      () =>
        `<p>${S.prev ? 'Mode pratinjau sedang aktif. Semua bagian terbuka tanpa harus menyelesaikan materi dulu.' : 'Mode ini membuka semua bagian sekaligus, cocok untuk dosen atau penguji yang ingin melihat isi course dengan cepat.'}</p><p class="small" style="margin-top:8px">Progres belajar tidak berubah. Kunci akan kembali seperti biasa setelah mode ini dimatikan.</p><div class="row" style="margin-top:16px;justify-content:flex-end">${S.prev ? `<button class="btn g" onclick="closeSh()">Tutup</button><button class="btn" onclick="prevOff()">Matikan pratinjau</button>` : `<button class="btn g" onclick="closeSh()">Batal</button><button class="btn" onclick="prevOn(1)">${I('eye')} Buka semua bagian</button>`}</div>`,
    ],
    badges: [
      'Lencana',
      () => `<p class="small" style="margin-bottom:10px">${bdN()} dari ${BD.length} lencana terbuka.</p>${bdGrid()}`,
    ],
    mlist: ['Peta materi', () => `<div class="mapb">${mapInner(cur.r == 'materi' ? cur.i : firstM())}</div>`],
    book: ['Contoh portofolio jadi', bookH],
    goal: [
      'Tujuan belajar',
      () =>
        `<p class="small" style="margin-bottom:6px">Setelah selesai, kamu bisa:</p>${['Menjelaskan apa itu portofolio digital, fungsinya, dan susunannya.', 'Memilih informasi dan karya yang cocok dengan pekerjaan yang dituju.', 'Memakai fitur dasar Canva untuk menyusun portofolio.', 'Menerapkan prinsip desain: layout, warna, tipografi, dan konsistensi.'].map((x, j) => `<div class="goal"><span>${j + 1}</span><p>${x}</p></div>`).join('')}<p class="small" style="margin-top:10px">Hasil akhirnya: satu portofolio digital buatanmu sendiri.</p>`,
    ],
    how: [
      'Cara pakai',
      () =>
        [
          ['book', 'Baca materinya', 'Belajar per slide. Mau lihat semua sekaligus? Pilih mode Ringkasan.'],
          ['task', 'Kerjakan aktivitas', 'Terbuka setelah 8 materi selesai. Boleh diulang.'],
          ['lap', 'Praktik di Canva', 'Ikuti 4 langkah sambil membuka Canva di tab lain.'],
          ['flag', 'Evaluasi dan refleksi', '8 soal singkat, lalu menilai portofoliomu sendiri.'],
        ]
          .map(
            (x) =>
              `<div class="goal"><span>${I(x[0])}</span><div><b>${x[1]}</b><p class="small">${x[2]}</p></div></div>`,
          )
          .join('') + ``,
    ],
    src: ['Sumber materi', srcSheet],
    set: ['Pengaturan', setSheet],
    radial: ['Menu', radSheet],
    about: [
      'Tentang',
      () =>
        `<div class="team">${TEAM.map((x) => `<div><span class="av">${x[0][0]}</span><b>${x[0]}</b>${x[1]}</div>`).join('')}</div><div class="kv"><b>Judul</b><span>Pembelajaran Pembuatan Portofolio Digital Menggunakan Canva bagi Fresh Graduate</span><b>Jenis</b><span>Multimedia pembelajaran interaktif</span><b>Mata kuliah</b><span>Pengembangan Multimedia Pembelajaran</span><b>Prodi</b><span>Teknologi Pendidikan, Universitas Negeri Jakarta</span><b>Model</b><span>Hannafin and Peck</span></div><p style="font-weight:600;font-size:14px;margin-bottom:4px">Rujukan</p><div class="refs">${REFS.map((r) => `<a href="${r[1]}" target="_blank" rel="noopener">${r[0]}</a>`).join('')}</div>${ROLE.edit ? `<div class="sep"></div><button class="mi" onclick="sheet('prev')"><span class="ic">${I('eye')}</span><b>Mode pratinjau</b><small>${S.prev ? 'Aktif' : 'Mati'}</small></button>` : ''}`,
    ],
    vid: [
      'Tutorial membuat portofolio',
      () => ytB('lqKBnNoWVVU', 'Tutorial Lengkap Membuat Portofolio Digital dengan Canva'),
    ],
    vplay: [
      'Video materi',
      () =>
        (VSEL ? ytB(VSEL[0], VSEL[1]) : '') +
        `<button class="link" style="margin-top:10px" onclick="sheet('src')">${I('arr')} Kembali ke sumber materi</button>`,
    ],
    reset: [
      'Mulai dari awal?',
      () =>
        `<p>Semua progres, jawaban, dan refleksi akun ini di browser ini akan dihapus. Ini tidak bisa dibatalkan.</p><div class="row" style="margin-top:16px;justify-content:flex-end"><button class="btn g" onclick="closeSh()">Batal</button><button class="btn" style="background:var(--no)" onclick="doReset()">Ya, hapus</button></div>`,
    ],
  };
  // jendela yang sudah dihapus (misalnya cek portofolio AI) diarahkan ke Kak Folio
  if (!SH[k]) k = 'ai';
  document.getElementById('sht').textContent = SH[k][0];
  b.innerHTML = SH[k][1]();
  b.scrollTop = 0;
  document.getElementById('ov').classList.add('on');
  sh.classList.add('on');
  setTimeout(() => {
    const f = sh.querySelector('.shh .ib');
    if (f) f.focus({ preventScroll: true });
  }, 50);
}
function closeSh() {
  const sh = document.getElementById('sh');
  if (!sh.classList.contains('on')) return;
  sh.querySelectorAll('video').forEach((v) => {
    try {
      v.pause();
    } catch (e) {}
  });
  if (OWU) {
    OWU();
    OWU = null;
  }
  unload(sh);
  sh.classList.remove('on');
  document.getElementById('ov').classList.remove('on');
}
function doReset() {
  ls.r(KEY + ':' + UID);
  loadUser('guest');
  Object.keys(R).forEach((k) => delete R[k]);
  closeSh();
  toast('Progres udah dihapus.', 'rst');
  go('welcome', 0, 'b');
}

/* ===== Efek interaksi ===== */
function salam() {
  const h = new Date().getHours();
  return h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam';
}
function mprog() {
  const all = document.querySelectorAll('#pb .acc'),
    n = document.querySelectorAll('#pb .acc.seen').length,
    i = document.getElementById('mpi'),
    t = document.getElementById('mpt');
  if (!i || !all.length) return;
  i.style.width = Math.round((n / all.length) * 100) + '%';
  t.textContent = n >= all.length ? 'Semua bagian sudah kamu buka' : `${n} dari ${all.length} bagian dibuka`;
}
const RM = matchMedia('(prefers-reduced-motion:reduce)'),
  HOV = matchMedia('(hover:hover) and (pointer:fine)');
/* transisi antarlayar dengan View Transitions (kalau browser mendukung) */
{
  const go0 = go;
  go = function (r, i = 0, dir) {
    const same = r == cur.r && i == cur.i;
    if (!cur.r || lock(r, i) || same || RM.matches || document.getElementById('splash')) return go0(r, i, dir);
    if (txBusy) {
      txPend = [r, i, dir];
      return;
    }
    txGo(() => go0(r, i, dir));
  };
}
/* efek riak saat diklik */
document.addEventListener(
  'pointerdown',
  (e) => {
    const el = e.target.closest(
      '.btn,.at,.stg,.op,.kc,.chip,.mi,.ri,.ah,.tick,.vm,.pv,.tl button,.steps button,.mt button',
    );
    if (!el || el.disabled) return;
    el.classList.add('rp');
    const r = el.getBoundingClientRect(),
      d = Math.max(r.width, r.height) * 2.2,
      sp = document.createElement('span');
    sp.className = 'rpl';
    sp.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    el.appendChild(sp);
    setTimeout(() => sp.remove(), 650);
  },
  { passive: true },
);
/* kartu sedikit miring dan bercahaya mengikuti kursor */
function fx() {
  if (!HOV.matches || RM.matches || document.documentElement.classList.contains('lite')) return; // kartu miring dilewati di perangkat lemah
  document.querySelectorAll('.at,.stg,.pv,.vm,.qki,.nextc,.kc,.op').forEach((el) => {
    if (el._fx) return;
    el._fx = 1;
    el.classList.add('tilt', 'glow');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', x * 100 + '%');
      el.style.setProperty('--my', y * 100 + '%');
      // kartu kecil miring lebih jelas, kartu lebar lebih halus supaya tetap nyaman dibaca
      const k = r.width > 420 ? 4 : 10;
      el.style.setProperty('--rx', ((0.5 - y) * k).toFixed(2) + 'deg');
      el.style.setProperty('--ry', ((x - 0.5) * k * 1.2).toFixed(2) + 'deg');
      // bayangan bergeser berlawanan arah miring, supaya kartu terasa terangkat
      el.style.setProperty('--shx', ((0.5 - x) * 14).toFixed(1) + 'px');
      el.style.setProperty('--shy', (8 + (y - 0.5) * 12).toFixed(1) + 'px');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
}
/* angka naik pelan */
function countUp(el, to, suf = '') {
  if (RM.matches) {
    el.firstChild.nodeValue = to + suf;
    return;
  }
  const t0 = performance.now(),
    d = 900;
  (function f(t) {
    const k = Math.min(1, (t - t0) / d),
      e = 1 - Math.pow(1 - k, 3);
    el.firstChild.nodeValue = Math.round(to * e) + suf;
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}
function nums() {
  document.querySelectorAll('.bring .v>div').forEach((d) => {
    const n = d.firstChild;
    if (!n || n.nodeType != 3) return;
    const m = n.nodeValue.match(/^(\d+)(%?)$/);
    if (m) countUp(d, +m[1], m[2]);
  });
}
let lastP = null;
{
  const h0 = hdr;
  hdr = function () {
    h0();
    const el = document.getElementById('rgt'),
      p = pct();
    if (lastP != null && lastP !== p && !RM.matches) {
      const a = lastP,
        t0 = performance.now();
      (function f(t) {
        const k = Math.min(1, (t - t0) / 700);
        el.textContent = Math.round(a + (p - a) * (1 - Math.pow(1 - k, 3))) + '%';
        if (k < 1) requestAnimationFrame(f);
      })(t0);
    }
    lastP = p;
  };
}
/* jalankan setelah tiap layar dirender */
new MutationObserver(() => {
  fx();
  nums();
  mprog();
}).observe(document.getElementById('view'), { childList: true });

/* transisi antarlayar: balok, garis, dan belah ketupat bergantian */
const TXS = ['bars', 'panels', 'diamond'];
let txi = 0,
  txBusy = false,
  txPend = null;
function txGo(run) {
  const el = document.getElementById('tx');
  if (!el) {
    run();
    return;
  }
  txBusy = true;
  const st = TXS[txi++ % TXS.length],
    inT = st == 'diamond' ? 600 : 470,
    outT = st == 'diamond' ? 560 : 480;
  document.documentElement.classList.add('tx');
  el.className = 'on ' + st + ' in';
  setTimeout(() => {
    try {
      run();
    } catch (e) {
      console.error(e);
    }
    el.classList.remove('in');
    void el.offsetWidth;
    el.classList.add('out');
    setTimeout(() => {
      el.className = '';
      document.documentElement.classList.remove('tx');
      txBusy = false;
      if (txPend) {
        const q = txPend;
        txPend = null;
        go(q[0], q[1], q[2]);
      }
    }, outT);
  }, inT);
}

/* ===== Warna sampul materi dan rak buku dekorasi ===== */
const COVC = [
  ['#1e4fb0', '#3b82f6'],
  ['#7c3aed', '#a78bfa'],
  ['#0f766e', '#2dd4bf'],
  ['#2d6fd6', '#93c5fd'],
  ['#be123c', '#fb7185'],
  ['#123a8f', '#5aa3f0'],
  ['#b45309', '#fbbf24'],
  ['#4338ca', '#818cf8'],
];
function shelfH() {
  const cov = (j) =>
      `<div class="cov" style="--a:${COVC[j][0]};--b:${COVC[j][1]}"><small>MATERI ${j + 1}</small><b>${M[j].t}</b><i></i></div>`,
    col = (c) => {
      const ids = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => (k + c * 2) % 8);
      return `<div class="bkc">${[...ids, ...ids].map(cov).join('')}</div>`;
    };
  return `<div class="bk lgbk" aria-hidden="true"><div class="bkg">${[0, 1, 2, 3].map(col).join('')}</div></div>`;
}
/* efek tombol "unduh": panah turun, bar terisi, lalu centang */
function loadBtn(b, cb, txt, restore) {
  if (!b || b.classList.contains('run')) return;
  if (RM.matches) {
    cb();
    return;
  }
  const h = b.innerHTML;
  b.style.minWidth = b.offsetWidth + 'px';
  b.classList.add('ldb', 'run');
  b.innerHTML = `<span class="dli"><svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5"/></svg></span><span>${txt || 'Memproses...'}</span><i class="dlp"></i>`;
  setTimeout(() => {
    b.classList.remove('run');
    b.classList.add('done');
    b.querySelector('.dli').innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>';
    sfx('ok');
    setTimeout(() => {
      if (!b.isConnected) return;
      cb();
      if (restore)
        setTimeout(() => {
          if (!b.isConnected) return;
          b.classList.remove('ldb', 'done');
          b.style.minWidth = '';
          b.innerHTML = h;
        }, 1400);
    }, 420);
  }, 950);
}

/* ===== mode pratinjau ===== */
function prevOn(direct) {
  if (!ROLE.edit) {
    toast('Mode pratinjau cuma buat pemilik.', 'lock');
    return;
  }
  if (!direct && !S.prev) {
    sheet('prev');
    return;
  }
  S.prev = 1;
  if (!S.started) S.started = 1;
  save();
  closeSh();
  toast('Mode pratinjau aktif. Semua bagian terbuka.', 'eye');
  go(cur.r == 'welcome' ? 'home' : cur.r, cur.i, 'f');
  hdr();
}
function prevOff() {
  S.prev = 0;
  save();
  closeSh();
  toast('Mode pratinjau dimatikan.', 'info');
  const L = lock(cur.r);
  if (L) go('home', 0, 'b');
  else {
    go(cur.r, cur.i);
    hdr();
  }
}
/* ===== kuesioner uji coba ===== */
const SVQ = [
  'Tampilan course ini menarik dan nyaman dilihat.',
  'Materinya mudah dipahami.',
  'Navigasinya mudah, aku tidak bingung harus ke mana.',
  'Aktivitas dan contoh membantu aku paham.',
  'Aku merasa siap membuat portofolio sendiri di Canva.',
];
function svSheet() {
  const v = S.sv || { r: {}, t: '' };
  if (v.at) {
    const avg = (SVQ.reduce((a, _, i) => a + (v.r[i] || 0), 0) / SVQ.length).toFixed(1);
    return `<div class="svdone"><span class="md" style="width:56px;height:56px;border-radius:50%;margin:0 auto 8px;display:grid;place-items:center;background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#fff">${I('star')}</span><b class="pp" style="font-size:18px;color:#123a8f">Terima kasih atas penilaianmu!</b><div class="big2">${avg}<span class="small"> / 5</span></div><p class="small">Rata-rata dari ${SVQ.length} pertanyaan.</p></div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn g" onclick="S.sv.at=0;save();sheet('survey')">${I('rst')} Ubah jawaban</button><button class="btn" onclick="loadBtn(this,svCopy,'Menyalin...',1)">${I('copy')} Salin jawaban</button></div>`;
  }
  return `<p class="small" style="margin-bottom:6px">1 = sangat tidak setuju, 5 = sangat setuju.</p>${SVQ.map((q, i) => `<div class="svq"><p>${i + 1}. ${q}</p><div class="sv5">${[1, 2, 3, 4, 5].map((n) => `<button class="${v.r[i] == n ? 'on' : ''}" onclick="svSet(${i},${n},this)" aria-label="Nilai ${n}">${n}</button>`).join('')}</div><div class="svl"><span>Sangat tidak setuju</span><span>Sangat setuju</span></div></div>`).join('')}<div class="svq"><p>6. Ada saran atau bagian yang bikin bingung?</p><textarea class="inp" maxlength="500" placeholder="Boleh dikosongkan" oninput="svD().t=this.value;save()">${esc(v.t || '')}</textarea></div><div class="row" style="justify-content:space-between;margin-top:8px"><span class="small" id="svh">${Object.keys(v.r).length}/${SVQ.length} dijawab</span><button class="btn" id="svb" ${Object.keys(v.r).length < SVQ.length ? 'disabled' : ''} onclick="loadBtn(this,svSend,'Mengirim...')">Kirim penilaian ${I('arr')}</button></div>`;
}
const svD = () => S.sv || (S.sv = { r: {}, t: '', at: 0 });
function svSet(i, n, b) {
  const v = svD();
  v.r[i] = n;
  save();
  only(b, 'button');
  const k = Object.keys(v.r).length,
    h = document.getElementById('svh'),
    bt = document.getElementById('svb');
  if (h) h.textContent = k + '/' + SVQ.length + ' dijawab';
  if (bt) bt.disabled = k < SVQ.length;
}
function svSend() {
  const v = svD();
  v.at = Date.now();
  save();
  conf();
  sheet('survey');
}
function svCopy() {
  const v = svD(),
    t =
      `Penilaian media FolioKit${S.name ? ' - ' + S.name : ''}\n` +
      SVQ.map((q, i) => `${i + 1}. ${q} ${v.r[i] || '-'}/5`).join('\n') +
      (v.t ? `\nSaran: ${v.t}` : '');
  const f = () => toast('Browser ini nggak bisa nyalin otomatis. Salin manual aja ya.', 'x');
  try {
    navigator.clipboard.writeText(t).then(() => toast('Jawaban disalin.', 'chk'), f);
  } catch (e) {
    f();
  }
}

/* ===== Akses pemilik vs pengguna (panel pemilik) ===== */
let ADB = null,
  VID = null,
  OWU = null,
  pushT = null,
  lastPush = '',
  canPush = true;
(async () => {
  try {
    if (window.claude && claude.use) {
      const u = await claude.use('user');
      if (u) {
        ROLE.owner = !!(await u.isOwner());
        ROLE.edit = ROLE.owner || !!(await u.canEdit());
        VID = await u.id();
      }
      ADB = await claude.use('db');
    }
  } catch (e) {}
  ROLE.ready = true;
  hdr();
  if (cur.r == 'welcome' && !document.getElementById('sh').classList.contains('on')) go('welcome');
  pushLater(true);
})();
function progDoc() {
  const v = S.sv && S.sv.at ? { r: S.sv.r, t: S.sv.t || '' } : null;
  return {
    nm: (S.name || '').slice(0, 24),
    p: pct(),
    m: mN(),
    a: aN(),
    pr: prN(),
    ev: S.ev.best,
    pre: S.pre.sc,
    rf: S.rf.done ? 1 : 0,
    sv: v,
  };
}
function pushLater(now) {
  if (!ADB || !VID || !canPush || !S.started) return;
  clearTimeout(pushT);
  pushT = setTimeout(pushNow, now ? 300 : 2500);
}
async function pushNow() {
  const d = progDoc(),
    k = JSON.stringify(d);
  if (k === lastPush) return;
  try {
    d.t = Date.now();
    await ADB.doc('progress/' + VID).set(d);
    lastPush = k;
  } catch (e) {
    if (
      e &&
      (e.code == 'invalid_argument' ||
        e.code == 'not_granted' ||
        e.code == 'revoked' ||
        e.code == 'capability_disabled')
    )
      canPush = false;
  }
}
function ownSheet() {
  if (!ROLE.owner) return `<p class="owe">Panel ini khusus pemilik.</p>`;
  if (!ADB) return `<p class="owe">Data peserta tidak bisa dibaca di tampilan ini.</p>`;
  setTimeout(ownSub, 0);
  return `<div id="owv"><div class="owe"><span class="dots3"><i></i><i></i><i></i></span><p style="margin-top:10px">Memuat data peserta...</p></div></div>`;
}
let OWD = [],
  OWTAB = 'p';
function ownSub() {
  if (OWU) OWU();
  const tm = setTimeout(() => {
    const v = document.getElementById('owv');
    if (v && !OWD.length) v.innerHTML = '<p class="owe">Data belum bisa dimuat. Coba buka lagi sebentar lagi.</p>';
  }, 10000);
  OWU = ADB.collection('progress').onSnapshot(
    (sn) => {
      clearTimeout(tm);
      OWD = sn.docs.filter((d) => d.exists).map((d) => Object.assign({ id: d.id }, d.data()));
      ownRender();
    },
    (e) => {
      clearTimeout(tm);
      const v = document.getElementById('owv');
      if (v) v.innerHTML = '<p class="owe">Data peserta tidak bisa dibaca.</p>';
    },
  );
}
function ago(t) {
  if (!t) return '-';
  const m = Math.round((Date.now() - t) / 60000);
  return m < 1
    ? 'baru saja'
    : m < 60
      ? m + ' menit lalu'
      : m < 1440
        ? Math.round(m / 60) + ' jam lalu'
        : Math.round(m / 1440) + ' hari lalu';
}
function ownRender() {
  const v = document.getElementById('owv');
  if (!v) return;
  const L = OWD.slice().sort((a, b) => (b.t || 0) - (a.t || 0)),
    n = L.length,
    avgP = n ? Math.round(L.reduce((a, x) => a + (x.p || 0), 0) / n) : 0,
    evs = L.filter((x) => x.ev != null),
    avgE = evs.length ? Math.round(evs.reduce((a, x) => a + x.ev, 0) / evs.length) : '-',
    svs = L.filter((x) => x.sv && x.sv.r),
    both = L.filter((x) => x.pre != null && x.ev != null),
    gain = both.length ? Math.round(both.reduce((a, x) => a + (x.ev - x.pre), 0) / both.length) : '-';
  const tabs = `<div class="seg2"><button class="${OWTAB == 'p' ? 'on' : ''}" onclick="OWTAB='p';ownRender()">${I('task')} Peserta</button><button class="${OWTAB == 's' ? 'on' : ''}" onclick="OWTAB='s';ownRender()">${I('star')} Penilaian (${svs.length})</button></div>`;
  const stats = `<div class="ows"><div><b>${n}</b><small>Peserta</small></div><div><b>${avgP}%</b><small>Rata-rata progres</small></div><div><b>${avgE}</b><small>Rata-rata evaluasi</small></div><div><b>${gain == '-' ? '-' : (gain >= 0 ? '+' : '') + gain}</b><small>Rata-rata kenaikan</small></div><div><b>${svs.length}</b><small>Mengisi penilaian</small></div></div>`;
  let body = '';
  if (OWTAB == 'p')
    body = n
      ? `<div class="owl">${L.map((x) => `<div class="owr"><div><b class="ownm"></b><span class="small">Materi ${x.m || 0}/8 · Aktivitas ${x.a || 0}/7 · Praktik ${x.pr || 0}/4${x.pre != null ? ' · Tes awal ' + x.pre : ''} · ${ago(x.t)}</span></div><span class="owb"><i style="width:${x.p || 0}%"></i></span><span class="ownil">${x.ev != null ? x.ev : '-'}</span></div>`).join('')}</div>`
      : '<p class="owe">Belum ada peserta. Data muncul setelah orang yang kamu undang mulai belajar.</p>';
  else {
    if (!svs.length) body = '<p class="owe">Belum ada yang mengisi penilaian.</p>';
    else {
      const av = SVQ.map((_, i) => svs.reduce((a, x) => a + (+x.sv.r[i] || 0), 0) / svs.length);
      body =
        SVQ.map(
          (q, i) =>
            `<div class="owq"><span>${i + 1}. ${q}</span><span class="owb"><i style="width:${(av[i] / 5) * 100}%"></i></span><b>${av[i].toFixed(1)}</b></div>`,
        ).join('') +
        `<p style="font-weight:600;margin:12px 0 4px">Saran</p>` +
        (svs
          .filter((x) => x.sv.t)
          .map(
            (x) =>
              `<div class="ownote"><b class="ownm" style="display:block;font-size:12px;color:#53638a"></b><span class="owtx"></span></div>`,
          )
          .join('') || '<p class="small">Belum ada saran tertulis.</p>');
    }
  }
  v.innerHTML =
    stats +
    `<div class="row" style="justify-content:space-between;margin-bottom:10px">${tabs}<button class="btn sm g" onclick="loadBtn(this,ownCSV,'Menyalin...',1)">${I('copy')} Salin data (CSV)</button></div>` +
    body +
    `<p class="small" style="margin-top:12px">Data tercatat dari orang yang kamu undang dengan akses Contributor atau Editor. Orang dengan akses Viewer tetap bisa belajar, tapi progresnya tidak tercatat di sini.</p>`;
  /* nama peserta adalah ketikan orang lain: pasang dengan textContent */
  if (OWTAB == 'p') {
    const els = v.querySelectorAll('.owr .ownm');
    L.forEach((x, i) => {
      if (els[i]) els[i].textContent = x.nm || 'Tanpa nama';
    });
  } else {
    const w = svs.filter((x) => x.sv.t),
      els = v.querySelectorAll('.ownote');
    w.forEach((x, i) => {
      if (els[i]) {
        els[i].querySelector('.ownm').textContent = x.nm || 'Tanpa nama';
        els[i].querySelector('.owtx').textContent = x.sv.t;
      }
    });
  }
}
function ownCSV() {
  const q = (s) => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"',
    h = [
      'Nama',
      'Progres %',
      'Materi',
      'Aktivitas',
      'Praktik',
      'Tes awal',
      'Nilai evaluasi',
      'Kenaikan',
      'Refleksi',
      ...SVQ.map((_, i) => 'P' + (i + 1)),
      'Saran',
      'Terakhir aktif',
    ];
  const rows = OWD.map((x) => [
    x.nm || 'Tanpa nama',
    x.p,
    x.m,
    x.a,
    x.pr,
    x.pre,
    x.ev,
    x.pre != null && x.ev != null ? x.ev - x.pre : '',
    x.rf ? 'Ya' : 'Belum',
    ...SVQ.map((_, i) => (x.sv && x.sv.r ? x.sv.r[i] : '')),
    x.sv ? x.sv.t : '',
    x.t ? new Date(x.t).toLocaleString('id-ID') : '',
  ]);
  const t = [h, ...rows].map((r) => r.map(q).join(',')).join('\n'),
    f = () => toast('Browser ini nggak bisa nyalin otomatis. Salin manual aja ya.', 'x');
  try {
    navigator.clipboard.writeText(t).then(() => toast('Data disalin. Tempel di Excel atau Google Sheets.', 'chk'), f);
  } catch (e) {
    f();
  }
}

/* ===== video intro ===== */
/* Alamat /_blob hanya ada di claude.ai. Di hosting sendiri (GitHub Pages) langsung pakai file lokal, jadi tidak ada permintaan yang gagal. */
const ONCLAUDE = /claude|anthropic/i.test(location.hostname);
const IVSRC = ONCLAUDE ? ['/_blob/f892dab1f05451024153491f107da5ee', 'intro.mp4'] : ['intro.mp4'];
let IVPOS = ONCLAUDE ? '/_blob/f586f24001aa1d7461c4a9d4baaec211' : 'intro-poster.jpg';
(function () {
  if (!ONCLAUDE) return;
  const im = new Image();
  im.onerror = () => {
    IVPOS = 'intro-poster.jpg';
    const v = document.getElementById('ivv');
    if (v) v.poster = IVPOS;
  };
  im.src = IVPOS;
})();
function introSheet() {
  const first = mN() == 0 && S.started;
  setTimeout(() => {
    const v = document.getElementById('ivv');
    if (!v) return;
    v.addEventListener('ended', ivEnd);
    v.addEventListener('play', () => {
      if (!S.iv && S.started) {
        S.iv = 1;
        save();
      }
    });
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, 60);
  return `<div class="ivw"><video id="ivv" controls playsinline preload="metadata" poster="${IVPOS}">${IVSRC.map((u) => `<source src="${u}" type="video/mp4">`).join('')}Browser ini tidak bisa memutar video.</video></div><div class="row" style="justify-content:space-between;margin-top:12px"><span></span><div class="row">${S.started ? `<button class="btn ${first ? '' : 'g'}" id="ivgo" onclick="S.iv=1;save();closeSh();${first ? 'goNext()' : "go('materi',firstM())"}">${first ? 'Mulai Materi 1' : 'Ke materi'} ${I('arr')}</button>` : `<button class="btn" onclick="closeSh();sheet('nama')">Mulai belajar ${I('arr')}</button>`}</div></div>`;
}
function ivEnd() {
  const b = document.getElementById('ivgo');
  if (b) {
    b.classList.remove('g');
    b.classList.add('shim');
    b.focus({ preventScroll: true });
  }
}

/* ===== homepage: judul muncul per kata & sorotan kursor ===== */
function wTitle() {
  const h = document.querySelector('.wel h1');
  if (!h || h.dataset.sp) return;
  h.dataset.sp = 1;
  if (RM.matches) return;
  let k = 0;
  [...h.childNodes].forEach((n) => {
    if (n.nodeType == 3) {
      const f = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) {
          f.appendChild(document.createTextNode(w));
          return;
        }
        const sp = document.createElement('span');
        sp.className = 'w';
        sp.style.animationDelay = 0.25 + k++ * 0.09 + 's';
        sp.textContent = w;
        f.appendChild(sp);
      });
      n.replaceWith(f);
    } else if (n.nodeType == 1 && n.classList.contains('shine')) {
      const sp = document.createElement('span');
      sp.className = 'w';
      sp.style.animationDelay = 0.25 + k++ * 0.09 + 's';
      n.replaceWith(sp);
      sp.appendChild(n);
    }
  });
}
function wSpot() {
  const w = document.querySelector('.wel');
  if (!w || !HOV.matches) return;
  w.addEventListener(
    'pointermove',
    (e) => {
      const r = w.getBoundingClientRect();
      w.style.setProperty('--mx', e.clientX - r.left + 'px');
      w.style.setProperty('--my', e.clientY - r.top + 'px');
    },
    { passive: true },
  );
}

/* ===== homepage: jaring titik bergerak (ikut kursor) ===== */
let wnRaf = 0;
const LITE = (() => {
  try {
    const n = navigator,
      c = n.connection || {};
    return (
      (n.hardwareConcurrency && n.hardwareConcurrency <= 4) ||
      (n.deviceMemory && n.deviceMemory <= 4) ||
      c.saveData === true ||
      matchMedia('(hover:none) and (max-width:760px)').matches
    );
  } catch (e) {
    return false;
  }
})();
document.documentElement.classList.toggle('lite', LITE);
document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('hid', document.hidden));
function wNet() {
  cancelAnimationFrame(wnRaf);
  const c = document.getElementById('wcv');
  if (!c || RM.matches) return;
  const x = c.getContext('2d'),
    dpr = Math.min(LITE ? 1.5 : 2, devicePixelRatio || 1);
  let lt = 0;
  let W,
    H,
    P = [],
    m = { x: -999, y: -999 };
  const size = () => {
    const r = c.getBoundingClientRect();
    W = r.width;
    H = r.height;
    c.width = W * dpr;
    c.height = H * dpr;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(LITE ? 38 : 70, (W * H) / (LITE ? 22000 : 16000)));
    P = [...Array(n)].map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 1.2,
    }));
  };
  size();
  const w = c.closest('.wel');
  if (w && HOV.matches) {
    w.addEventListener(
      'pointermove',
      (e) => {
        const r = c.getBoundingClientRect();
        m.x = e.clientX - r.left;
        m.y = e.clientY - r.top;
      },
      { passive: true },
    );
    w.addEventListener('pointerleave', () => {
      m.x = m.y = -999;
    });
  }
  let ro = new ResizeObserver(size);
  ro.observe(c);
  (function f(t) {
    if (!c.isConnected) {
      ro.disconnect();
      return;
    }
    t = t || performance.now();
    f.t0 = f.t0 || t;
    // perangkat lemah: titik-titik bergerak 6 detik lalu diam, supaya halaman awal tidak terus menggambar ulang
    if (LITE && t - f.t0 > 6000) return;
    if (document.hidden || (LITE && t - lt < 32)) {
      wnRaf = requestAnimationFrame(f);
      return;
    }
    const st = lt ? Math.min(3, (t - lt) / 16.7) : 1;
    lt = t;
    x.clearRect(0, 0, W, H);
    for (const p of P) {
      p.x += p.vx * st;
      p.y += p.vy * st;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - m.x,
        dy = p.y - m.y,
        d = Math.hypot(dx, dy);
      if (d < 120) {
        p.x += (dx / d) * 0.8;
        p.y += (dy / d) * 0.8;
      }
    }
    for (let i = 0; i < P.length; i++) {
      const a = P[i];
      for (let j = i + 1; j < P.length; j++) {
        const b = P[j],
          d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          x.strokeStyle = `rgba(45,111,214,${(1 - d / 130) * 0.22})`;
          x.lineWidth = 1;
          x.beginPath();
          x.moveTo(a.x, a.y);
          x.lineTo(b.x, b.y);
          x.stroke();
        }
      }
      const dm = Math.hypot(a.x - m.x, a.y - m.y);
      if (dm < 160) {
        x.strokeStyle = `rgba(124,58,237,${(1 - dm / 160) * 0.35})`;
        x.beginPath();
        x.moveTo(a.x, a.y);
        x.lineTo(m.x, m.y);
        x.stroke();
      }
      x.fillStyle = i % 5 == 0 ? 'rgba(124,58,237,.55)' : 'rgba(45,111,214,.5)';
      x.beginPath();
      x.arc(a.x, a.y, a.r, 0, 7);
      x.fill();
    }
    wnRaf = requestAnimationFrame(f);
  })();
}

/* ===== materi: gambaran singkat beranimasi (mesin linimasa sederhana) ===== */
const CUR =
  '<svg viewBox="0 0 18 22"><path d="M1 1 L1 17 L5.5 12.8 L9 20 L12 18.6 L8.6 11.6 L14.5 11.6 Z" fill="#0f2b66" stroke="#fff" stroke-width="1.4"/></svg>';
const VCAP = [
  'CV bilang kamu bisa. Portofolio menunjukkan buktinya, jadi perekrut lebih yakin.',
  'Lima bagian, dibaca dari atas ke bawah. Bagian karya yang paling banyak dilihat.',
  'Semua karya disaring dulu: relevan, berkualitas, dan jelas buktinya. Yang lolos cukup 3 sampai 6.',
  'Empat menu yang paling sering dipakai: Desain (template), Teks, Elemen, dan Unggahan.',
  'Rapi itu soal layout, warna, tipografi, dan gaya yang konsisten di semua halaman.',
  'Kerjakan berurutan: pilih template, isi data, masukkan karya, lalu rapikan.',
  'Cek dulu, simpan dalam format yang pas, lalu bagikan dengan akses hanya lihat.',
  'Nilai dirimu dengan skala 1 sampai 4, lalu perbaiki yang paling penting dulu.',
];
const VIS = [
  () => `<div class="vis" data-len="7.5">
 <div class="a vp vdoc" style="left:5%;top:7%;width:37%;height:64%"><div class="vhd"><span class="vav"></span><div><b class="vt">Nadia Putri</b><small>CV · Desainer Grafis</small></div></div>${[80, 62, 72, 50].map((w, k) => `<i class="vl grow" data-on="${0.4 + k * 0.3}" style="width:${w}%"></i>`).join('')}<span class="vtag" data-on="1.9">"Aku jago desain"</span></div>
 <div class="a vvs pop" data-on="2.5" style="left:50%;top:44%">vs</div>
 <div class="a vp vdoc" style="left:58%;top:7%;width:37%;height:64%"><div class="vhd"><span class="vav"></span><div><b class="vt">Portofolio</b><small>3 karya pilihan</small></div></div><div class="vtiles">${[['linear-gradient(160deg,#1e4fb0,#7c3aed)', 'Poster'], ['linear-gradient(160deg,#fde68a,#f59e0b)', 'Logo'], ['linear-gradient(160deg,#a5f3fc,#38bdf8)', 'Feed']].map((c, k) => `<i class="pop vimg" data-on="${3 + k * 0.3}" style="background:${c[0]}"><em>${c[1]}</em></i>`).join('')}</div><span class="vtag ok" data-on="4.1">✓ Ada buktinya</span></div>
 <div class="a vban" data-on="4.9">Perekrut lebih yakin karena ada bukti</div></div>`,
  () => {
    const R = ['Profil', 'Pendidikan & pengalaman', 'Skill', 'Karya', 'Kontak'];
    return `<div class="vis" data-len="8">
 ${R.map((r, k) => `<div class="a vrow slide ${k == 3 ? 'key' : ''}" data-on="${0.4 + k * 0.55}" style="top:${8 + k * 17}%">${'<em>' + (k + 1) + '</em>'}${r}${k == 3 ? ' <small style="margin-left:auto;color:#7c3aed">paling dilihat</small>' : ''}</div>`).join('')}
 <div class="a vpage v1p" style="left:64%;top:8%;width:28%;height:84%">${[
   [18, '50%'],
   [12, '80%'],
   [12, '65%'],
   [38, '100%'],
   [10, '55%'],
 ]
   .map(
     (b, k) =>
       `<i class="pop ${k == 3 ? 'hi' : ''}" data-on="${0.4 + k * 0.55}" style="height:${b[0]}%;width:${b[1]}"></i>`,
   )
   .join('')}</div></div>`;
  },
  () => {
    const F = [
      ['ART', 1],
      ['GAME', 0],
      ['LOGO', 1],
      ['SERT', 0],
      ['FEED', 1],
      ['FOTO', 0],
    ];
    return `<div class="vis" data-len="8.5">
 ${F.map((f, k) => `<div class="a vfile ${f[1] ? '' : 'bad'}" data-on="${0.2 + k * 0.12}" data-off="${2.2 + k * 0.35}" data-path="0:${10 + k * 16},18;${1.6 + k * 0.35}:50,46" style="left:${10 + k * 16}%;top:18%">${f[0]}</div>`).join('')}
 <div class="a vfun" data-on="0.6"></div><div class="a vlab" data-on="0.8" style="left:4%;top:12%;padding:3px 9px;border-radius:99px;background:#fff;box-shadow:inset 0 0 0 1px #bcd6f6">Saringan: relevan · berkualitas · terbukti</div>
 ${['#93c5fd', '#fcd34d', '#c4b5fd'].map((c, k) => `<div class="a vout pop" data-on="${4.4 + k * 0.35}" style="left:${36 + k * 14}%;top:82%;background:${c}"></div>`).join('')}
 <div class="a vlab v2l" data-on="5.6" style="left:72%;top:76%">3–6 karya terbaik</div><div class="a vlab" data-on="3.6" style="left:4%;top:44%;color:#b91c1c">✗ tidak nyambung<br>dibuang</div></div>`;
  },
  () => {
    const M2 = [
      ['Desain', 28],
      ['Teks', 44],
      ['Elemen', 60],
      ['Unggahan', 76],
    ];
    const cx = (k) => 14.5,
      cy = (k) => [33, 46, 59, 72][k];
    return `<div class="vis" data-len="9">
 <div class="a ved"><div class="bar">Canva</div><div class="vsd">${[0, 1, 2, 3].map((k) => `<i style="top:${10 + k * 20}%"></i>`).join('')}</div><div class="cv">
  <div class="a" data-on="1.6" style="left:0;top:0;width:32%;height:100%;background:#1e4fb0;border-radius:4px 0 0 4px"></div>
  <div class="a vl grow" data-on="3.4" style="left:40%;top:16%;width:40%;height:12%;background:#123a8f"></div>
  <div class="a pop" data-on="5.2" style="left:40%;top:44%;width:16%;height:30%;border-radius:50%;background:#c4b5fd"></div>
  <div class="a pop" data-on="7" style="left:62%;top:40%;width:28%;height:40%;border-radius:6px;background:linear-gradient(135deg,#93c5fd,#fcd34d)"></div></div></div>
 ${M2.map((m, k) => `<div class="a vtip" data-on="${0.9 + k * 1.8}" data-off="${2 + k * 1.8}" style="left:20%;top:${[30, 43, 56, 69][k]}%">${m[0]}</div>`).join('')}
 <div class="a vcur" data-on="0.2" data-path="0:60,80;0.8:14,32;2.6:14,45;4.4:14,58;6.2:14,71;7.6:62,60" style="left:60%;top:80%">${CUR}</div></div>`;
  },
  () => `<div class="vis" data-len="8">
 <div class="a vcell" style="left:2%"><div class="a vbx" data-path="0:12,18;1:12,14" style="left:12%;top:18%"></div><div class="a vbx" data-path="0:58,30;1:60,14" style="left:58%;top:30%;background:#c4b5fd"></div><div class="a vbx" data-path="0:20,52;1:12,44" style="left:20%;top:52%;width:74%;background:#fcd34d"></div><span class="vlab">Layout</span></div>
 <div class="a vcell" style="left:26.5%">${[
   ['#2d6fd6', 60],
   ['#93c5fd', 30],
   ['#fcd34d', 10],
 ]
   .map(
     (c, k) =>
       `<div class="a vsw grow" data-on="${2.2 + k * 0.3}" style="left:${10 + k * 28}%;width:24%;background:${c[0]}"></div><div class="a vlab" data-on="${2.4 + k * 0.3}" style="left:${10 + k * 28}%;top:16%;font-size:10px">${c[1]}%</div>`,
   )
   .join('')}<span class="vlab">Warna</span></div>
 <div class="a vcell" style="left:51%"><div class="a vaa pop" data-on="3.6">Aa</div>${[70, 50, 60].map((w, k) => `<i class="a vl grow" data-on="${4 + k * 0.25}" style="left:12%;top:${52 + k * 10}%;width:${w}%;height:${k ? 6 : 9}px"></i>`).join('')}<span class="vlab">Tipografi</span></div>
 <div class="a vcell" style="left:75.5%">${[0, 1, 2].map((k) => `<div class="a vmini" style="left:${6 + k * 31}%"><i class="vmh" data-on="${5.2 + k * 0.2}" style="opacity:1;transform:none"></i></div>`).join('')}<div class="a vlab" data-on="5.9" style="left:0;right:0;top:70%;text-align:center;color:#15803d">✓ sama semua</div><span class="vlab">Konsistensi</span></div></div>`,
  () => {
    const ST = ['Template', 'Isi data', 'Karya', 'Rapikan'];
    return `<div class="vis" data-len="8">
 <div class="a vtrack"></div><div class="a vfill grow" data-on="0.3" style="width:76%;transition:transform 5.4s linear,opacity .3s"></div>
 ${ST.map((t, k) => `<div class="a vnode" data-on="${0.6 + k * 1.6}" style="left:${12 + k * 25.3}%;top:18%;opacity:1;transform:none">${k + 1}</div><div class="a vlab" style="left:${12 + k * 25.3}%;top:30%;transform:translateX(-50%)">${t}</div>`).join('')}
 <div class="a vpage" style="left:34%;top:44%;width:32%;height:50%;flex-direction:row;flex-wrap:wrap;align-content:flex-start;gap:4px">
  <i class="pop" data-on="0.8" style="width:100%;height:18%;background:#2d6fd6"></i><i class="grow" data-on="2.4" style="width:70%;height:9%"></i><i class="grow" data-on="2.6" style="width:50%;height:9%"></i>
  ${['#93c5fd', '#fcd34d', '#c4b5fd'].map((c, k) => `<i class="pop" data-on="${4 + k * 0.25}" style="width:30%;height:34%;background:${c}"></i>`).join('')}</div>
 <div class="a vlab pop" data-on="5.8" style="left:68%;top:56%;color:#15803d">✓ rapi &amp; siap</div></div>`;
  },
  () => `<div class="vis" data-len="8">
 <div class="a vpage v6p" style="left:6%;top:12%;width:24%;height:70%"><i style="height:18%;width:60%;background:#2d6fd6"></i><i style="height:8%;width:85%"></i><i style="height:8%;width:70%"></i><i style="height:30%;width:100%;background:#c4b5fd"></i></div>
 ${['Ejaan', 'Gambar', 'Tautan'].map((c, k) => `<div class="a vck slide v6c" data-on="${0.6 + k * 0.5}" style="left:33%;top:${20 + k * 18}%"><b>✓</b>${c}</div>`).join('')}
 ${[
   ['PDF', '#dc2626', 'Lamaran via email'],
   ['PNG', '#2d6fd6', 'Media sosial'],
   ['🔒', '#16a34a', 'Tautan hanya lihat'],
 ]
   .map(
     (b, k) =>
       `<div class="a vbadge v6b" data-on="${2.8 + k * 0.6}" data-path="0:18,46;${2.8 + k * 0.6}:58,${22 + k * 28}" style="left:18%;top:46%"><i style="background:${b[1]}">${b[0]}</i><span>${b[2]}</span></div>`,
   )
   .join('')}</div>`,
  () => `<div class="vis" data-len="9">
 ${[
   ['Kelengkapan isi', 75, '#2d6fd6'],
   ['Kerapian desain', 50, '#f59e0b'],
   ['Kesan pertama', 75, '#2d6fd6'],
 ]
   .map(
     (r, k) =>
       `<div class="a vrub" style="top:${22 + k * 24}%"><span>${r[0]}</span><div class="tr2"></div><div class="fl grow" data-on="${0.5 + k * 0.4}" style="width:${r[1]}%;background:${r[2]}"></div>${k == 1 ? `<div class="fl grow" data-on="4.4" style="width:100%;background:#16a34a"></div>` : ''}</div>`,
   )
   .join('')}
 <div class="a vlab pop v7l" data-on="2.6" data-off="4.4" data-x="v7l" style="left:34%;top:38%;font-size:12px;color:#b45309;background:#fef3c7;padding:2px 8px;border-radius:99px">perlu diperbaiki</div><div class="a vlab pop v7l" data-on="4.6" style="left:34%;top:38%;font-size:12px;color:#15803d;background:#dcfce7;padding:2px 8px;border-radius:99px">sudah diperbaiki ✓</div>
 ${[
   ['Informasi salah', '#dc2626'],
   ['Desain besar', '#f59e0b'],
   ['Detail kecil', '#2d6fd6'],
 ]
   .map(
     (o, k) =>
       `<div class="a vord slide" data-on="${5.4 + k * 0.45}" style="top:${18 + k * 24}%"><em style="background:${o[1]}">${k + 1}</em>${o[0]}</div>`,
   )
   .join('')}
 <div class="a vlab" data-on="5.2" style="left:64%;top:6%">Urutan perbaikan</div></div>`,
];
let visIds = [];
function visRun(root) {
  const len = +root.dataset.len || 8,
    els = [...root.querySelectorAll('[data-on]')],
    mv = [...root.querySelectorAll('[data-path]')].map((e) => ({
      e,
      p: e.dataset.path.split(';').map((x) => {
        const [a, b] = x.split(':');
        return [+a, b.split(',')];
      }),
    }));
  if (RM.matches) {
    els.forEach((e) => e.classList.add('on'));
    mv.forEach((m) => {
      const l = m.p[m.p.length - 1][1];
      m.e.style.left = l[0] + '%';
      m.e.style.top = l[1] + '%';
    });
    return;
  }
  const t0 = performance.now(),
    tick = () => {
      if (!root.isConnected) {
        clearInterval(id);
        return;
      }
      const t = ((performance.now() - t0) / 1000) % len;
      els.forEach((e) => {
        const on = +e.dataset.on,
          off = e.dataset.off ? +e.dataset.off : len - 0.45;
        e.classList.toggle('on', t >= on && t < off);
      });
      mv.forEach((m) => {
        let c = m.p[0][1];
        for (const [a, b] of m.p) if (t >= a) c = b;
        const k = c.join();
        if (m.e._c !== k) {
          m.e._c = k;
          m.e.style.left = c[0] + '%';
          m.e.style.top = c[1] + '%';
        }
      });
    };
  tick();
  const id = setInterval(tick, 90);
  visIds.push(id);
}
function visStart() {
  visIds.forEach(clearInterval);
  visIds = [];
  document.querySelectorAll('#pb .vis').forEach(visRun);
}
function visReplay(b) {
  const v = b.closest('.vcard,.sld').querySelector('.vis'),
    n = v.cloneNode(true);
  n.querySelectorAll('.on').forEach((e) => e.classList.remove('on'));
  v.replaceWith(n);
  visRun(n);
}
/* sorotan kata kunci */
const KW = [
  'bukti',
  'buktinya',
  'karya',
  'kemampuan',
  'tiga saringan',
  'satu kalimat',
  '5 sampai 8',
  'Bagian paling penting',
  'masih aktif',
  'Tiga sampai enam',
  'Maksimal dua',
  'gaya yang sama',
  'kalimat pendek',
  '2 sampai 3 baris',
  'hanya lihat',
  'kesalahan informasi',
  'minimal 3',
  'pendapat orang lain',
  '10 detik',
  'saling melengkapi',
];
function hl(t) {
  t = glo(t);
  let n = 0;
  const used = new Set();
  for (const k of KW) {
    if (n >= 2) break;
    const re = new RegExp('(^|[^\\p{L}])(' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\p{L}])', 'iu');
    if (re.test(t) && !used.has(k.toLowerCase())) {
      t = t.replace(re, (m, a, b) => a + '<mark class="hl">' + b + '</mark>');
      used.add(k.toLowerCase());
      n++;
    }
  }
  return t;
}

/* ===== mode cerita: slide berurutan per materi ===== */
const TK = [
  [
    'Portofolio itu bukti kemampuan, bukan sekadar daftar.',
    'CV dan portofolio saling melengkapi.',
    'Dengan bukti karya, perekrut lebih cepat yakin.',
  ],
  [
    'Lima bagian: profil, pendidikan dan pengalaman, skill, karya, kontak.',
    'Karya adalah bagian yang paling penting.',
    'Tiap skill sebaiknya punya bukti karya.',
  ],
  [
    'Pilih yang relevan dengan posisi yang kamu lamar.',
    'Cukup 3 sampai 6 karya terbaik.',
    'Tulis peran dan hasil di setiap karya.',
  ],
  [
    'Pakai ukuran Presentasi (16:9) atau Website.',
    'Menu utama: Desain, Teks, Elemen, Unggahan.',
    'Pertahankan susunan template supaya tetap rapi.',
  ],
  [
    'Beri ruang kosong dan jarak yang sama.',
    'Satu warna utama, satu pendukung, sisanya netral.',
    'Maksimal dua jenis huruf, gayanya konsisten.',
  ],
  [
    'Urutannya: template, konten, karya, tampilan.',
    'Kalimat pendek, keterangan karya 2 sampai 3 baris.',
    'Rapikan satu halaman dulu, baru lanjut.',
  ],
  [
    'Cek ejaan, gambar, dan tautan sebelum dibagikan.',
    'PDF untuk email, PNG untuk media sosial.',
    'Bagikan tautan dengan akses hanya lihat.',
  ],
  [
    'Nilai dengan skala 1 sampai 4, targetnya minimal 3.',
    'Perbaiki kesalahan informasi lebih dulu.',
    'Minta pendapat orang lain.',
  ],
];
const SIC = [
  ['doc', 'copy', 'target', 'star'],
  ['home', 'book', 'spark', 'lap', 'flag'],
  ['eye', 'target', 'map'],
  ['lap', 'copy', 'doc', 'spark'],
  ['map', 'star', 'doc', 'copy'],
  ['copy', 'doc', 'lap', 'spark'],
  ['eye', 'chk', 'flag', 'target'],
  ['task', 'eye', 'ref', 'bulb'],
];
function slides(i) {
  const m = M[i],
    c = COVC[i],
    o = [];
  o.push(
    `<div class="st1" style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div class="s-h" style="margin-bottom:0">${I('play')} Gambaran singkat</div><button class="link" onclick="visReplay(this)">${I('rst')} Putar ulang</button></div><div style="height:12px"></div><div class="st2">${VIS[i]()}<p class="vcap">${VCAP[i]}</p></div><div class="s-goal st3">${I('target')}<span><b>Di materi ini:</b> ${m.s}</span></div>`,
  );
  m.p.forEach((x, j) =>
    o.push(
      `<div class="s-sub"><div class="st1"><div class="ill2" style="--c1:${c[0]};--c2:${c[1]}"><span class="o2"></span><span class="o1"></span><span class="core">${I(SIC[i][j] || 'book')}</span><b class="nb2">${j + 1}</b></div></div><div class="s-txt"><span class="s-num st2">Bagian ${j + 1} dari ${m.p.length}</span><h3 class="st2">${x[0]}</h3><p class="st3">${hl(x[1])}</p></div></div>`,
    ),
  );
  o.push(
    `<div class="s-h st1">${I('spark')} Coba sendiri</div><div class="exw st2">${exH(i)}</div>${i == 1 || i == 5 || i == 6 ? `<div class="st3" style="margin-top:12px"><button class="btn sm g" onclick="sheet('book')">${I('doc')} Lihat contoh portofolio jadi</button></div>` : ''}`,
  );
  o.push(
    `<div class="s-h st1">${I('bulb')} Hindari dan tips</div><div class="s-two st2"><div class="s-box w"><h4>${I('warn')} Yang sering salah</h4><ul>${m.h.map((x) => `<li>${x}</li>`).join('')}</ul></div><div class="s-box t"><h4>${I('bulb')} Tips</h4><p>${m.tip}</p></div></div>${m.v ? `<div class="st3" style="margin-top:14px"><p class="small" style="margin-bottom:6px">Video contoh</p>${ytB(m.v[0], m.v[1])}</div>` : ''}`,
  );
  o.push(`<div class="s-h st1">${I('target')} Cek cepat</div><div class="st2">${cqH(i)}</div>`);
  o.push(
    `<div class="s-h st1">${I('chk')} Yang perlu kamu ingat</div><ul class="sumL">${TK[i].map((t, k) => `<li style="--k:${k}"><b>${I('chk')}</b>${t}</li>`).join('')}</ul><p class="small st4"></p>`,
  );
  return o;
}
const SL = { k: 0 };
function slShow(k, dir) {
  const t = document.getElementById('slt');
  if (!t) return;
  const all = [...t.children],
    n = all.length,
    i = cur.i;
  k = Math.max(0, Math.min(n - 1, k));
  SL.k = k;
  R.sl = R.sl || {};
  R.sl[i] = k;
  S.sr = S.sr || {};
  if (k > (S.sr[i] || 0)) {
    S.sr[i] = k;
    save();
  }
  all.forEach((sd, j) => {
    const on = j == k;
    if (!on && sd.classList.contains('on')) unload(sd);
    sd.classList.toggle('on', on);
    sd.classList.remove('in-r', 'in-l');
    sd.setAttribute('aria-hidden', !on);
    if (on) {
      if (dir) {
        void sd.offsetWidth;
        sd.classList.add(dir > 0 ? 'in-r' : 'in-l');
      }
      sd.scrollTop = 0;
    }
  });
  document.querySelectorAll('#sdots i').forEach((d, j) => {
    d.classList.toggle('on', j == k);
    d.classList.toggle('done', j <= (S.sr[i] || 0) && j != k);
  });
  const c = document.getElementById('slc'),
    p = document.getElementById('slp'),
    nx = document.getElementById('sln');
  if (c) c.textContent = `${k + 1} / ${n}`;
  if (p) p.disabled = k == 0;
  if (nx) {
    const last = k == n - 1;
    nx.classList.remove('mph', 'ldb', 'done', 'run');
    nx.disabled = false;
    nx.style.width = nx.style.height = nx.style.minWidth = '';
    nx.innerHTML = last
      ? S.md[i]
        ? (i < 7 ? 'Materi berikutnya ' : mN() == 8 ? 'Ke aktivitas ' : 'Lanjut ') + I('arr')
        : 'Sudah paham ' + I('chk')
      : 'Lanjut ' + I('arr');
    nx.classList.toggle('shim', last && !S.md[i]);
  }
  visIds.forEach(clearInterval);
  visIds = [];
  if (k == 0) all[0].querySelectorAll('.vis').forEach(visRun);
}
function slStep(d) {
  const t = document.getElementById('slt');
  if (!t) return;
  const n = t.children.length;
  if (d > 0 && SL.k == n - 1) {
    const b = document.getElementById('sln');
    if (S.md[cur.i]) doneM(cur.i);
    else mDone(b, cur.i);
    return;
  }
  if (d < 0 && SL.k == 0) return;
  slShow(SL.k + d, d);
}
function slGo(k) {
  const i = cur.i;
  if (!S.md[i] && k > ((S.sr && S.sr[i]) || 0) + 1 && !(S.prev && ROLE.edit)) {
    toast('Ikuti urutannya ya, satu per satu.', 'info');
    return;
  }
  slShow(k, k > SL.k ? 1 : -1);
}
function slSwipe() {
  const pb = document.getElementById('pb');
  if (!pb) return;
  let x0 = null,
    y0 = 0;
  pb.addEventListener(
    'touchstart',
    (e) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    },
    { passive: true },
  );
  pb.addEventListener(
    'touchend',
    (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0,
        dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4 && !e.target.closest('.cmp,input,textarea'))
        slStep(dx < 0 ? 1 : -1);
      x0 = null;
    },
    { passive: true },
  );
}
function setMode(m) {
  S.mode = m;
  save();
  go('materi', cur.i);
}
function listDone(b, i) {
  if (!S.md[i]) {
    const rows = [...document.querySelectorAll('#pb .acc')].filter((a) => a.querySelector('.ic.num'));
    const left = rows.filter((a) => !a.classList.contains('seen')).length;
    if (left) {
      toast(`Buka dulu semua bagian isi materi. Masih ${left} lagi.`, 'info');
      sfx('no');
      return;
    }
  }
  mDone(b, i);
}
/* ===== peta materi ===== */
const MSH = ['Konsep', 'Struktur', 'Isi', 'Canva', 'Desain', 'Membuat', 'Publikasi', 'Evaluasi'];
const MPOS = [
  [28, 6],
  [72, 17],
  [28, 28],
  [72, 39],
  [28, 50],
  [72, 61],
  [28, 72],
  [72, 83],
  [40, 95],
];
function mpath(n = MPOS.length - 1) {
  let d = `M${MPOS[0][0]} ${MPOS[0][1]}`;
  for (let k = 1; k <= n; k++) {
    const a = MPOS[k - 1],
      b = MPOS[k],
      my = (a[1] + b[1]) / 2;
    d += ` C${a[0]} ${my} ${b[0]} ${my} ${b[0]} ${b[1]}`;
  }
  return d;
}
function mapInner(i) {
  const d = mpath(),
    done = mN(),
    pr = Math.min(1, done / 8) * 100;
  const nodes = MSH.map((t, k) => {
    const lk = lock('materi', k),
      st = S.md[k] ? 'ok' : k == i ? 'on' : lk ? 'lk' : '';
    return `<div class="mnd ${st}" style="left:${MPOS[k][0]}%;top:${MPOS[k][1]}%"><button onclick="go('materi',${k})" aria-label="Materi ${k + 1}: ${M[k].t}${lk ? ' (terkunci)' : ''}">${S.md[k] ? I('chk') : lk ? I('lock') : k + 1}</button>${S.md[k] ? '<span class="stx">★</span>' : ''}<small>${t}</small></div>`;
  }).join('');
  const fin = lock('akt');
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="mp0" d="${d}"/>${done ? `<path class="mp1" d="${mpath(done)}"/>` : ''}<path class="mp2" d="${d}"/></svg>${nodes}<div class="mnd fin ${fin ? 'lk' : ''}" style="left:${MPOS[8][0]}%;top:${MPOS[8][1]}%"><button onclick="go('akt')" aria-label="Aktivitas">${I(fin ? 'lock' : 'task')}</button><small>Aktivitas</small></div><div class="mme" data-k="${i}" style="left:${MPOS[i][0]}%;top:${MPOS[i][1]}%"><span>${esc((S.name || 'K')[0].toUpperCase())}</span></div>`;
}
function mapH(i) {
  return `<h3><span>Peta materi</span><span style="color:#2d6fd6">${mN()}/8</span></h3><div class="mapb">${mapInner(i)}</div>`;
}
function mapAnim() {
  const me = document.querySelector('.mapr .mme');
  if (!me || RM.matches) return;
  const k = +me.dataset.k,
    from = S.mk != null ? S.mk : k;
  if (from !== k && MPOS[from]) {
    me.style.transition = 'none';
    me.style.left = MPOS[from][0] + '%';
    me.style.top = MPOS[from][1] + '%';
    void me.offsetWidth;
    me.style.transition = '';
    requestAnimationFrame(() => {
      me.style.left = MPOS[k][0] + '%';
      me.style.top = MPOS[k][1] + '%';
    });
  }
  S.mk = k;
  save();
}
/* ===== Contoh portofolio jadi (16:9, benar vs kurang tepat) ===== */
const BKF = (n, t) =>
  `<div class="pgf"><span>Nadia Putri · Portofolio Desain Grafis</span><span>${t ? t + ' · ' : ''}${String(n).padStart(2, '0')} / 08</span></div>`;
const BKAV = `<svg viewBox="0 0 120 120" class="pgav"><circle cx="60" cy="60" r="60" fill="#F4C7B8"/><path d="M22 120c4-26 20-38 38-38s34 12 38 38z" fill="#1D3557"/><path d="M50 84l10 12 10-12" fill="#F8F5F0"/><rect x="53" y="66" width="14" height="18" rx="6" fill="#E9A98B"/><circle cx="60" cy="52" r="22" fill="#F1B596"/><path d="M37 52c0-18 11-28 25-28 13 0 22 9 22 22-7-6-17-9-27-8-6 4-10 10-12 17-4 0-6-1-8-3z" fill="#2B2D42"/><circle cx="64" cy="22" r="9" fill="#2B2D42"/><circle cx="68" cy="53" r="1.8" fill="#2B2D42"/><circle cx="55" cy="53" r="1.8" fill="#2B2D42"/><path d="M57 61q4 3 8 0" stroke="#9A3412" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;
const BKPOSTER = `<div class="art-poster"><i class="c1"></i><i class="c2"></i><div class="bk1"></div><div class="bk2"></div><div class="bk3"></div><small>12–14 MEI 2026 · AULA UTAMA</small><b>FESTIVAL<br>LITERASI<br>KAMPUS</b><span>Baca. Diskusi. Berkarya.</span><em>Gratis untuk mahasiswa</em></div>`;
const BKLOGO = (bad) =>
  bad
    ? `<div class="art-logobad"><b>Kopi Senja!!</b><small>~ ngopi yuk ~</small></div>`
    : `<svg viewBox="0 0 120 120" class="art-logo"><circle cx="60" cy="60" r="56" fill="#1D3557"/><path d="M28 70a32 32 0 0164 0z" fill="#E76F51"/><path d="M20 70h80" stroke="#F8F5F0" stroke-width="3"/><path d="M44 78h32l-4 16a6 6 0 01-6 5H54a6 6 0 01-6-5z" fill="#F8F5F0"/><path d="M76 82h4a5 5 0 010 10h-6" fill="none" stroke="#F8F5F0" stroke-width="3"/><path d="M52 40c-3 4 3 6 0 10M60 36c-3 4 3 6 0 10M68 40c-3 4 3 6 0 10" stroke="#F8F5F0" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
const BKCUP = `<svg viewBox="0 0 120 150" class="art-cup"><ellipse cx="60" cy="140" rx="38" ry="6" fill="#00000018"/><path d="M24 30h72l-8 104a8 8 0 01-8 7H40a8 8 0 01-8-7z" fill="#F8F5F0" stroke="#E5E0D8" stroke-width="2"/><rect x="20" y="20" width="80" height="14" rx="5" fill="#1D3557"/><circle cx="60" cy="84" r="20" fill="#1D3557"/><path d="M45 88a15 15 0 0130 0z" fill="#E76F51"/><path d="M42 88h36" stroke="#F8F5F0" stroke-width="1.6"/></svg>`;
const BKFEED = [
  `<div class="ig" style="background:#1D3557;color:#F8F5F0"><small>OPEN RECRUITMENT</small><b>Divisi Kreatif 2026</b><i style="background:#E76F51"></i></div>`,
  `<div class="ig" style="background:#F8F5F0;color:#1D3557"><small>TIPS</small><b>3 cara bikin poster yang enak dibaca</b><em>1 · 2 · 3</em></div>`,
  `<div class="ig" style="background:#E76F51;color:#fff"><b style="font-size:20px">"Desain yang baik itu jelas."</b></div>`,
  `<div class="ig" style="background:#F8F5F0;color:#1D3557"><small>DATA</small><span class="bars"><i style="height:40%"></i><i style="height:65%"></i><i style="height:85%;background:#E76F51"></i></span><b>Pengikut naik 40%</b></div>`,
  `<div class="ig" style="background:#2A4A73;color:#fff"><small>ACARA</small><b>Webinar Portofolio</b><em>Sabtu, 19.00</em></div>`,
  `<div class="ig" style="background:#F4C7B8;color:#1D3557"><small>GESER →</small><b>Behind the scene festival</b></div>`,
];
const BKFEEDBAD = [
  `<div class="ig" style="background:linear-gradient(45deg,#ff0,#f0f);color:#00f;font-family:'Comic Sans MS',cursive"><b>OPREC!!!</b></div>`,
  `<div class="ig" style="background:#0f0;color:#f00;font-family:Impact,sans-serif"><b>TIPS DESAIN</b></div>`,
  `<div class="ig" style="background:#fff;color:#ccc"><small>quote hari ini kata2 bijak buat kalian semua yang lagi semangat kuliah dan organisasi</small></div>`,
  `<div class="ig" style="background:#000;color:#ff0;font-family:'Courier New',monospace"><b>DATA</b></div>`,
  `<div class="ig" style="background:#f60;color:#00f;font-family:Georgia,serif"><b>WEBINAR</b></div>`,
  `<div class="ig" style="background:repeating-linear-gradient(45deg,#f9c,#f9c 8px,#9cf 8px,#9cf 16px)"><b style="color:#fff">BTS</b></div>`,
];
const BKP2 = [
  {
    t: 'Sampul',
    g: `<div class="pg pgg"><div class="pgcov"><div><span class="pgk">PORTOFOLIO 2026</span><h1>Nadia Putri</h1><p class="pgsub">Desainer Grafis · Fresh Graduate</p><p class="pgtag">Poster, identitas brand, dan konten media sosial yang jelas dan mudah diingat.</p><div class="pgbar"><i></i><i></i></div></div><div class="pgstack"><div class="s1">${BKPOSTER}</div><div class="s2">${BKLOGO()}</div><div class="s3">${BKFEED[0]}</div></div></div>${BKF(1)}</div>`,
    gn: [
      [37, 30, 'Nama dan posisi langsung terbaca', 'Dalam 3 detik pembaca tahu siapa dia dan melamar sebagai apa.'],
      [47, 50, 'Satu kalimat nilai jual', 'Menjelaskan bidangnya tanpa paragraf panjang.'],
      [94, 18, 'Cuplikan karya terbaik', 'Sampul sudah memamerkan karya, bikin penasaran buka halaman berikutnya.'],
    ],
    b: `<div class="pg pgb1"><b class="bt1">PORTOFOLIO SAYA!!!</b><span class="bs1">★</span><span class="bs2">✿</span><span class="bs3">♥</span><small class="bn1">by nadia</small><small class="bfile">Desain tanpa judul</small></div>`,
    bn: [
      [10, 17, 'Judul tidak memberi informasi', '"Portofolio saya" tidak menjelaskan siapa dan posisi apa.'],
      [80, 64, 'Hiasan dan warna berlebihan', 'Pelangi dan clip art bikin kesan tidak profesional.'],
      [16, 87, 'Nama kecil, posisi tidak ada', 'Hal terpenting justru paling susah dicari.'],
    ],
  },
  {
    t: 'Profil',
    g: `<div class="pg pgg"><div class="pgprof">${BKAV}<div><span class="pgk">TENTANG SAYA</span><h2>Halo, saya Nadia.</h2><p class="pgp">Lulusan Teknologi Pendidikan yang suka mengubah informasi rumit jadi visual yang gampang dipahami. Terbiasa mendesain untuk acara kampus dan UMKM.</p><div class="pgch"><span>Poster & publikasi</span><span>Identitas brand</span><span>Konten media sosial</span></div><div class="pgfact"><div><small>Domisili</small><b>Jakarta</b></div><div><small>Lulus</small><b>2026</b></div><div><small>Siap kerja</small><b>Penuh waktu</b></div></div></div></div>${BKF(2, 'Profil')}</div>`,
    gn: [
      [72, 30, 'Kalimat pembuka yang hangat', 'Singkat, langsung menyebut nama.'],
      [95, 44, 'Profil 2–3 kalimat', 'Fokus ke kekuatan dan bidang, bukan cerita hidup.'],
      [
        70,
        78,
        'Info cepat yang berguna',
        'Domisili, tahun lulus, dan ketersediaan menjawab pertanyaan pertama perekrut.',
      ],
    ],
    b: `<div class="pg pgb2"><h2>Tentang aku :)</h2><p>Halo semuanya!! Perkenalkan nama aku Nadia, aku lahir di Jakarta tanggal 5 Mei, aku anak kedua dari tiga bersaudara. Dari kecil aku suka menggambar dan nonton drama Korea. Waktu SD aku pernah juara lomba mewarnai. Aku orangnya rajin, jujur, ramah, mudah bergaul, dan suka belajar hal baru. Hobi aku masak, jalan-jalan, main game, dan dengerin musik. Cita-cita aku pengen jadi orang sukses dan membahagiakan orang tua...</p><small>Hobi: masak · traveling · game · musik · kucing</small></div>`,
    bn: [
      [50, 40, 'Paragraf terlalu panjang', 'Cerita hidup bikin perekrut berhenti membaca.'],
      [41, 90, 'Info tidak relevan', 'Hobi dan cita-cita umum tidak membuktikan kemampuan desain.'],
      [34, 11, 'Huruf dan warna campur aduk', 'Teks pucat di latar terang susah dibaca.'],
    ],
  },
  {
    t: 'Pendidikan & pengalaman',
    g: `<div class="pg pgg"><span class="pgk" style="position:absolute;left:56px;top:48px">PERJALANAN</span><h2 style="position:absolute;left:56px;top:66px">Pendidikan & pengalaman</h2><div class="pgtl">${[
      [
        '2025 · 3 bulan',
        'Magang Desainer Junior',
        'Agensi kreatif, Jakarta',
        'Membuat 40+ desain konten untuk 3 klien UMKM.',
      ],
      [
        '2024 – 2025',
        'Koordinator Divisi Kreatif',
        'Himpunan Mahasiswa',
        'Memimpin 6 orang dan menyusun panduan visual organisasi.',
      ],
      ['2022 – 2026', 'S1 Teknologi Pendidikan', 'Universitas Negeri Jakarta', 'Fokus pada desain media pembelajaran.'],
    ]
      .map(
        (x) =>
          `<div><span class="pgdot"></span><small>${x[0]}</small><b>${x[1]}</b><em>${x[2]}</em><p>${x[3]}</p></div>`,
      )
      .join('')}</div>${BKF(3, 'Perjalanan')}</div>`,
    gn: [
      [34, 29, 'Yang terbaru di atas', 'Pengalaman paling relevan langsung terlihat.'],
      [34, 55, 'Ada hasil yang terukur', '"40+ desain untuk 3 klien" lebih meyakinkan daripada "membuat desain".'],
      [95, 29, 'Cuma yang nyambung', 'Kegiatan yang tidak berkaitan dengan desain tidak dimasukkan.'],
    ],
    b: `<div class="pg pgb3"><h2>RIWAYAT PENDIDIKAN DAN PENGALAMAN</h2><p>SD Negeri 01 Jakarta (2010-2016)<br>SMP Negeri 5 Jakarta (2016-2019)<br>SMA Negeri 8 Jakarta (2019-2022)<br>S1 Teknologi Pendidikan (2022-sekarang)<br>Anggota paduan suara SMP<br>Panitia konsumsi 17 Agustus RT<br>Peserta seminar nasional (5 kali)<br>Magang di agensi kreatif<br>Ketua kelas kelas 4 SD<br>Anggota pramuka</p></div>`,
    bn: [
      [35, 16, 'Semua dimasukkan sejak SD', 'Perekrut fresh graduate cukup melihat jenjang terakhir.'],
      [72, 26, 'Tanpa peran dan hasil', 'Cuma daftar nama kegiatan, tidak ada yang dikerjakan.'],
      [57, 8, 'Tidak ada hierarki', 'Semua tulisan sama besar, mata bingung mulai dari mana.'],
    ],
  },
  {
    t: 'Skill',
    g: `<div class="pg pgg"><span class="pgk" style="position:absolute;left:56px;top:48px">KEAHLIAN</span><h2 style="position:absolute;left:56px;top:66px">Skill</h2><div class="pgsk">${[
      ['Desain', 'Layout dan tata letak', 'Tipografi', 'Warna dan kontras'],
      ['Aplikasi', 'Canva', 'Figma', 'Adobe Illustrator'],
      ['Kerja tim', 'Presentasi ide', 'Manajemen waktu', 'Menerima masukan'],
    ]
      .map(
        (g) =>
          `<div><b>${g[0]}</b>${g
            .slice(1)
            .map((x) => `<span>${x}</span>`)
            .join('')}</div>`,
      )
      .join(
        '',
      )}</div><p class="pgproof">Bukti: semua skill desain di atas bisa dilihat di Karya 1 sampai 3.</p>${BKF(4, 'Keahlian')}</div>`,
    gn: [
      [31, 30, 'Dikelompokkan', 'Desain, aplikasi, dan kerja tim terpisah, gampang dipindai.'],
      [64, 30, 'Cuma 9 skill pilihan', 'Masih dalam batas 5–8 per kelompok, tidak berlebihan.'],
      [53, 86, 'Ada buktinya', 'Skill dihubungkan ke karya, bukan sekadar klaim.'],
    ],
    b: `<div class="pg pgb4"><h2>MY SKILLS</h2><div>${[
      ['Photoshop', 95],
      ['Illustrator', 90],
      ['Canva', 100],
      ['Figma', 85],
      ['Microsoft Word', 100],
      ['Excel', 80],
      ['Public speaking', 75],
      ['Leadership', 90],
    ]
      .map((x) => `<p><span>${x[0]}</span><i><b style="width:${x[1]}%"></b></i><em>${x[1]}%</em></p>`)
      .join(
        '',
      )}</div><small>rajin · jujur · ramah · disiplin · kreatif · teliti · tanggung jawab · mudah bergaul · cepat belajar · suka tantangan</small></div>`,
    bn: [
      [50, 37, 'Persentase tidak berarti', '"Photoshop 95%" tidak bisa dibuktikan dan terkesan asal.'],
      [50, 79, 'Daftar sifat umum', 'Semua pelamar menulis rajin dan jujur. Tidak membedakan kamu.'],
      [95, 11, 'Tanpa bukti karya', 'Tidak ada satu pun skill yang dihubungkan ke hasil kerja.'],
    ],
  },
  {
    t: 'Karya 1 · Poster',
    g: `<div class="pg pgg"><div class="pgwork"><div class="pgart">${BKPOSTER}</div><div class="pgcase"><span class="pgk">KARYA 01 · POSTER ACARA</span><h2>Festival Literasi Kampus</h2>${[
      ['Masalah', 'Acara tahun lalu sepi karena publikasinya kurang menarik.'],
      ['Peranku', 'Desainer utama: konsep, poster, dan turunan media sosial.'],
      ['Alat', 'Canva dan Figma'],
    ]
      .map((x) => `<div class="pgrow"><small>${x[0]}</small><p>${x[1]}</p></div>`)
      .join(
        '',
      )}<div class="pgres"><div><b>1.200+</b><small>pengunjung</small></div><div><b>3x</b><small>lipat dari tahun lalu</small></div></div></div></div>${BKF(5, 'Karya')}</div>`,
    gn: [
      [34, 9, 'Karya tampil besar', 'Gambar jadi pusat perhatian di halamannya.'],
      [96, 32, 'Masalah, peran, alat', 'Pembaca paham konteks dan kontribusi pribadimu.'],
      [97, 66, 'Hasil dalam angka', 'Bukti dampak yang paling diingat perekrut.'],
    ],
    b: `<div class="pg pgb5"><h2>Poster</h2><div class="blurart">${BKPOSTER}</div><p>ini poster yang aku bikin</p></div>`,
    bn: [
      [31, 48, 'Gambar kecil dan buram', 'Resolusi rendah bikin karya bagus jadi terlihat jelek.'],
      [52, 62, 'Tanpa keterangan', 'Tidak ada masalah, peran, alat, maupun hasil.'],
      [18, 9, 'Judul tidak spesifik', '"Poster" saja tidak menjelaskan untuk apa dan siapa.'],
    ],
  },
  {
    t: 'Karya 2 · Logo',
    g: `<div class="pg pgg"><span class="pgk" style="position:absolute;left:56px;top:48px">KARYA 02 · REBRANDING UMKM</span><h2 style="position:absolute;left:56px;top:66px">Logo baru Kopi Senja</h2><div class="pglogo"><div class="pgba"><div>${BKLOGO(1)}<small>Sebelum</small></div><span class="pgar">→</span><div>${BKLOGO()}<small>Sesudah</small></div></div><div class="pgmock">${BKCUP}<div class="pgpal"><i style="background:#1D3557"></i><i style="background:#E76F51"></i><i style="background:#F8F5F0"></i></div></div><div class="pgcase2"><p><b>Masalah:</b> logo lama susah dibaca dari jauh dan tidak cocok di kemasan.</p><p><b>Solusi:</b> simbol matahari terbenam dan cangkir, huruf tegas, dua warna utama.</p><p><b>Hasil:</b> dipakai di gelas, menu, dan papan nama sejak Maret 2026.</p></div></div>${BKF(6, 'Karya')}</div>`,
    gn: [
      [30, 24, 'Sebelum dan sesudah', 'Perbandingan langsung menunjukkan kontribusimu.'],
      [66, 44, 'Contoh penerapan', 'Logo terlihat di gelas, bukti desainnya benar-benar dipakai.'],
      [60, 86, 'Cerita singkat', 'Masalah, solusi, hasil dalam tiga baris.'],
    ],
    b: `<div class="pg pgb6"><h2>karya2 aku</h2><div class="bcol">${BKLOGO(1)}<div class="blurart s">${BKPOSTER}</div>${BKFEEDBAD[0]}${BKFEEDBAD[1]}<div class="bl">LOGO??</div>${BKFEEDBAD[4]}</div></div>`,
    bn: [
      [50, 50, 'Karya ditumpuk berantakan', 'Pembaca tidak tahu mana yang harus dilihat.'],
      [20, 18, 'Tanpa judul dan penjelasan', '"karya2 aku" tidak memberi konteks apa pun.'],
      [80, 80, 'Tidak dikurasi', 'Semua karya dimasukkan, termasuk yang kurang bagus.'],
    ],
  },
  {
    t: 'Karya 3 · Media sosial',
    g: `<div class="pg pgg"><div class="pgwork"><div class="pgfeed">${BKFEED.join('')}</div><div class="pgcase"><span class="pgk">KARYA 03 · KONTEN INSTAGRAM</span><h2>Feed Himpunan Mahasiswa</h2>${[
      ['Masalah', 'Feed lama tidak konsisten, akun jarang dilihat.'],
      ['Peranku', 'Membuat panduan visual dan 24 konten dalam 2 bulan.'],
      ['Alat', 'Canva (Brand Kit dan template)'],
    ]
      .map((x) => `<div class="pgrow"><small>${x[0]}</small><p>${x[1]}</p></div>`)
      .join(
        '',
      )}<div class="pgres"><div><b>+40%</b><small>pengikut</small></div><div><b>2x</b><small>interaksi per unggahan</small></div></div></div></div>${BKF(7, 'Karya')}</div>`,
    gn: [
      [43, 24, 'Gaya feed konsisten', 'Warna dan huruf sama di semua unggahan, langsung terasa rapi.'],
      [96, 46, 'Peran yang jelas', 'Menyebut jumlah konten dan durasi kerja.'],
      [97, 70, 'Dampak terukur', 'Angka pertumbuhan jadi bukti kuat.'],
    ],
    b: `<div class="pg pgb7"><div class="pgfeed bad">${BKFEEDBAD.join('')}</div><p>Desain IG</p></div>`,
    bn: [
      [28, 70, 'Warna dan huruf beda-beda', 'Tidak ada konsistensi, terlihat seperti dibuat orang berbeda.'],
      [74, 40, 'Keterangan cuma dua kata', 'Tidak ada peran, proses, atau hasil.'],
      [46, 30, 'Kontras buruk', 'Teks abu-abu di latar putih nyaris tidak terbaca.'],
    ],
  },
  {
    t: 'Kontak',
    g: `<div class="pg pgg pgend"><span class="pgk">MARI TERHUBUNG</span><h1 style="font-size:52px">Terima kasih!</h1><p class="pgsub" style="margin-top:6px">Saya siap berdiskusi tentang posisi Desainer Grafis di tim Anda.</p><div class="pgct">${[
      ['Email', 'nadia.putri@email.com'],
      ['LinkedIn', 'linkedin.com/in/nadiaputri'],
      ['Telepon', '0812-3456-xxxx'],
    ]
      .map((x) => `<div><small>${x[0]}</small><b>${x[1]}</b></div>`)
      .join(
        '',
      )}</div><p class="pgnote">Versi PDF tersedia · tautan Canva dengan akses "hanya lihat"</p>${BKF(8, 'Kontak')}</div>`,
    gn: [
      [72, 31, 'Penutup yang sopan', 'Mengajak lanjut ke tahap berikutnya.'],
      [93, 57, 'Kontak lengkap dan profesional', 'Email nama asli, LinkedIn, dan nomor aktif.'],
      [73, 69, 'Akses aman', 'Tautan "hanya lihat" dan cadangan PDF.'],
    ],
    b: `<div class="pg pgb8"><h1>THANK YOU ♥♥♥</h1><p>kontak: nadia_cute99@email.com</p><small>link canva (bisa diedit): canva.com/design/xxxx/edit</small></div>`,
    bn: [
      [68, 56, 'Email tidak profesional', 'Pakai email dengan nama asli, bukan nama panggilan.'],
      [75, 62, 'Tautan bisa diedit', 'Siapa pun bisa mengubah portofoliomu. Atur jadi "hanya lihat".'],
      [50, 73, 'Kontak tidak lengkap', 'Tidak ada LinkedIn atau nomor yang bisa dihubungi.'],
    ],
  },
];
let BK = 0,
  BKV = 'g',
  BKS = 0;
function bookH() {
  BK = 0;
  BKV = 'g';
  BKS = 0;
  setTimeout(() => {
    bkUpd();
    bkFit();
  }, 20);
  return `<div class="bk2"><div class="bk2h"><div class="seg2 bkseg" role="tablist"><button role="tab" class="on" id="bkvg" onclick="bkVer('g')">${I('chk')} Versi benar</button><button role="tab" id="bkvb" onclick="bkVer('b')">${I('x')} Versi kurang tepat</button></div><button class="link" onclick="bkFull()">${I('ext')} Layar penuh</button></div><div class="bk2v" id="bkv"><div class="bk2c" id="bkc"></div></div><div class="bk2n" id="bkn2"></div><div class="bkc2"><button class="btn g sm" id="bkp" onclick="bkGo(-1)" aria-label="Halaman sebelumnya">${I('bk')}<span class="bkl">Sebelumnya</span></button><div style="text-align:center"><b class="pp" id="bkt" style="color:#123a8f"></b><div class="bkd" id="bkd" style="justify-content:center;margin-top:6px">${BKP2.map((_, k) => `<i onclick="bkTo(${k})"></i>`).join('')}</div></div><button class="btn sm" id="bkn" onclick="bkGo(1)" aria-label="Halaman berikutnya"><span class="bkl">Berikutnya</span>${I('arr')}</button></div></div>`;
}
function bkPage() {
  const p = BKP2[BK],
    bad = BKV == 'b',
    notes = bad ? p.bn : p.gn;
  return `${bad ? p.b : p.g}${notes.map((n, j) => `<button class="hsp ${bad ? 'bad' : ''} ${j == BKS ? 'on' : ''}" style="left:${n[0]}%;top:${n[1]}%" onclick="bkSel(${j})" aria-label="${esc(n[2])}">${j + 1}</button>`).join('')}`;
}
function bkNotes() {
  const p = BKP2[BK],
    bad = BKV == 'b',
    notes = bad ? p.bn : p.gn;
  return `<p class="bkh ${bad ? 'bad' : ''}">${bad ? I('x') + ' Kenapa halaman ini kurang tepat' : I('chk') + ' Kenapa halaman ini sudah bagus'}</p><ol>${notes.map((n, j) => `<li class="${j == BKS ? 'on' : ''}" onclick="bkSel(${j})"><span>${j + 1}</span><div><b>${n[2]}</b><small>${n[3]}</small></div></li>`).join('')}</ol>`;
}
function bkUpd(anim) {
  const c = document.getElementById('bkc'),
    n = document.getElementById('bkn2');
  if (!c) return;
  c.innerHTML = bkPage();
  if (anim) {
    c.classList.remove('turnf', 'turnb');
    void c.offsetWidth;
    c.classList.add(anim);
  }
  if (n) n.innerHTML = bkNotes();
  const t = document.getElementById('bkt');
  if (t) t.textContent = `${BK + 1}. ${BKP2[BK].t}`;
  document.querySelectorAll('#bkd i').forEach((d, k) => d.classList.toggle('on', k == BK));
  const p = document.getElementById('bkp'),
    nx = document.getElementById('bkn');
  if (p) p.disabled = BK == 0;
  if (nx) nx.disabled = BK == BKP2.length - 1;
  ['g', 'b'].forEach((v) => {
    const b = document.getElementById('bkv' + v);
    if (b) b.classList.toggle('on', BKV == v);
  });
  bkFsSync();
}
function bkFit() {
  const v = document.getElementById('bkv'),
    c = document.getElementById('bkc');
  if (!v || !c) return;
  const w = v.clientWidth,
    s = w / 960;
  c.style.transform = `scale(${s})`;
  v.style.height = 540 * s + 'px';
}
addEventListener('resize', () => {
  bkFit();
  bkFsFit();
});
function bkGo(d) {
  const nb = Math.max(0, Math.min(BKP2.length - 1, BK + d));
  if (nb == BK) return;
  BK = nb;
  BKS = 0;
  sfx('up');
  bkUpd(d > 0 ? 'turnf' : 'turnb');
}
function bkTo(k) {
  if (k == BK) return;
  const d = k > BK ? 1 : -1;
  BK = k;
  BKS = 0;
  sfx('up');
  bkUpd(d > 0 ? 'turnf' : 'turnb');
}
function bkVer(v) {
  if (BKV == v) return;
  BKV = v;
  BKS = 0;
  sfx('tap');
  bkUpd('flipv');
}
function bkSel(j) {
  BKS = j;
  document.querySelectorAll('.bk2c .hsp,#bkfs .hsp').forEach((h, k) => h.classList.toggle('on', k % 3 == j || k == j));
  document.querySelectorAll('#bkn2 li').forEach((l, k) => l.classList.toggle('on', k == j));
  const fsn = document.getElementById('bkfsn');
  if (fsn) {
    const p = BKP2[BK],
      n = (BKV == 'b' ? p.bn : p.gn)[j];
    fsn.innerHTML = `<b>${j + 1}. ${n[2]}</b> ${n[3]}`;
  }
  sfx('tap');
}
/* layar penuh: di HP berdiri, halaman diputar biar besar */
function bkFull() {
  if (document.getElementById('bkfs')) return;
  const o = document.createElement('div');
  o.id = 'bkfs';
  o.innerHTML = `<div class="bkfw" id="bkfw"><div class="bk2c" id="bkfc"></div></div><div class="bkfb"><button class="ib" onclick="bkGo(-1)" aria-label="Sebelumnya">${I('bk')}</button><span id="bkfsn" class="bkfsn"></span><button class="ib" onclick="bkGo(1)" aria-label="Berikutnya">${I('arr')}</button><button class="ib" onclick="bkFsClose()" aria-label="Tutup layar penuh">${I('x')}</button></div>`;
  document.body.appendChild(o);
  requestAnimationFrame(() => o.classList.add('on'));
  bkFsSync();
  bkFsFit();
}
function bkFsSync() {
  const c = document.getElementById('bkfc');
  if (!c) return;
  c.innerHTML = bkPage();
  const p = BKP2[BK],
    n = (BKV == 'b' ? p.bn : p.gn)[BKS],
    s = document.getElementById('bkfsn');
  if (s && n) s.innerHTML = `<b>${BKS + 1}. ${n[2]}</b> ${n[3]}`;
}
function bkFsFit() {
  const w = document.getElementById('bkfw'),
    c = document.getElementById('bkfc');
  if (!w || !c) return;
  const W = innerWidth,
    H = innerHeight - 64,
    rot = H > W * 1.15 && W < 760;
  const s = rot ? Math.min(H / 960, W / 540) * 0.96 : Math.min(W / 960, H / 540) * 0.96;
  c.style.transform = `scale(${s})`;
  w.style.width = 960 * s + 'px';
  w.style.height = 540 * s + 'px';
  w.classList.toggle('rot', rot);
}
function bkFsClose() {
  const o = document.getElementById('bkfs');
  if (o) {
    o.classList.remove('on');
    setTimeout(() => o.remove(), 200);
  }
}
document.addEventListener(
  'keydown',
  (e) => {
    const fs = document.getElementById('bkfs');
    if (fs && e.key == 'Escape') {
      bkFsClose();
      e.stopPropagation();
      return;
    }
    if (document.getElementById('bkv') && (fs || document.getElementById('sh').classList.contains('on'))) {
      if (e.key == 'ArrowRight') bkGo(1);
      if (e.key == 'ArrowLeft') bkGo(-1);
    }
  },
  true,
);
{
  let x0 = null;
  document.addEventListener(
    'touchstart',
    (e) => {
      if (e.target.closest('#bkv,#bkfs')) x0 = e.touches[0].clientX;
    },
    { passive: true },
  );
  document.addEventListener(
    'touchend',
    (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      const rot = document.querySelector('#bkfw.rot');
      if (Math.abs(dx) > 50 && !rot) bkGo(dx < 0 ? 1 : -1);
    },
    { passive: true },
  );
}

/* ===== kamus istilah ===== */
const GL = {
  perekrut: 'Orang dari perusahaan yang menyaring dan menilai pelamar kerja.',
  kompetensi: 'Kemampuan yang kamu punya: pengetahuan, keterampilan, dan sikap kerja.',
  template: 'Kerangka desain siap pakai. Kamu tinggal mengganti isinya.',
  Unggahan: 'Menu di Canva untuk memasukkan file milikmu sendiri, misalnya foto karya.',
  Toolbar: 'Deretan tombol di atas kanvas untuk mengatur huruf, warna, ukuran, dan posisi.',
  Layout: 'Susunan posisi elemen di halaman supaya rapi dan enak dibaca.',
  Tipografi: 'Urusan memilih jenis, ukuran, dan gaya huruf.',
  Konsistensi: 'Gaya yang sama diulang di semua halaman.',
  kontras: 'Perbedaan terang-gelap antara teks dan latar, supaya teks mudah dibaca.',
  'ruang kosong': 'Area kosong di sekitar elemen. Bikin desain terasa lega dan tidak sumpek.',
  PDF: 'Format dokumen yang tampil sama di perangkat apa pun. Paling aman untuk lamaran.',
  PNG: 'Format gambar. Cocok untuk diunggah ke media sosial.',
  'jendela penyamaran': 'Mode browser tanpa akun yang login. Berguna untuk cek apakah tautanmu bisa dibuka orang lain.',
  'Presentasi (16:9)': 'Ukuran desain melebar seperti layar laptop. Paling serbaguna untuk portofolio.',
  relevan: 'Nyambung dengan posisi kerja yang kamu lamar.',
};
function glo(t) {
  let n = 0;
  for (const k in GL) {
    if (n >= 2) break;
    const re = new RegExp('(^|[^\\p{L}])(' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\p{L}])', 'iu');
    if (re.test(t)) {
      t = t.replace(re, (m, a, b) => a + `<button type="button" class="term" data-g="${k}">${b}</button>`);
      n++;
    }
  }
  return t;
}
document.addEventListener(
  'click',
  (e) => {
    const pop = document.getElementById('gpop'),
      tb = e.target.closest('.term');
    if (!pop) return;
    if (!tb) {
      if (!e.target.closest('#gpop')) pop.classList.remove('on');
      return;
    }
    e.stopPropagation();
    const k = tb.dataset.g;
    pop.innerHTML = `<b>${I('book')}<span></span></b><div></div>`;
    pop.querySelector('b span').textContent = tb.textContent;
    pop.querySelector('div').textContent = GL[k] || '';
    const r = tb.getBoundingClientRect();
    pop.classList.remove('on');
    pop.style.left = '0px';
    pop.style.top = '0px';
    const pw = Math.min(290, innerWidth - 24);
    let x = Math.min(Math.max(12, r.left + r.width / 2 - pw / 2), innerWidth - pw - 12),
      y = r.bottom + 10;
    pop.style.maxWidth = pw + 'px';
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    requestAnimationFrame(() => {
      const h = pop.offsetHeight;
      if (y + h > innerHeight - 12) pop.style.top = r.top - h - 10 + 'px';
      pop.classList.add('on');
    });
    sfx('tap');
  },
  true,
);
document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    const p = document.getElementById('gpop');
    if (p) p.classList.remove('on');
  }
});
document.addEventListener(
  'scroll',
  () => {
    const p = document.getElementById('gpop');
    if (p) p.classList.remove('on');
  },
  true,
);

/* ===== Ikon tambahan dan kapabilitas AI/unduhan ===== */
Object.assign(P, {
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5"/>',
  net: '<circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5" r="2"/><circle cx="19.5" cy="5" r="2"/><circle cx="4.5" cy="19" r="2"/><circle cx="19.5" cy="19" r="2"/><path d="M6 6.5l3.8 3.8M18 6.5l-3.8 3.8M6 17.5l3.8-3.8M18 17.5l-3.8-3.8"/>',
  grid: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>',
  chat: '<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/>',
  send: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  dl: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/>',
  img: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  x: P.x || '<path d="M6 6l12 12M18 6L6 18"/>',
});
function goNext() {
  const n = nxt();
  go(n.r, n.i);
}
var SMP = window.SMP || null,
  SMPI = null,
  DLS = null;
/* Fitur AI (jawaban AI langsung dan cek portofolio pakai AI) sudah dihapus: hanya jalan di claude.ai, tidak di GitHub Pages.
   Kak Folio tetap jalan dengan kumpulan jawaban bawaan (FAQ). */
(async () => {
  try {
    if (window.claude && claude.use) DLS = await claude.use('downloads');
  } catch (e) {
    DLS = null;
  }
})();

/* ---------- perbandingan tes awal vs evaluasi ---------- */
function cmpH(sc) {
  const a = S.pre.sc;
  if (a == null) return '';
  const d = sc - a;
  return `<div class="cmpx"><div><small>Tes awal</small><b>${a}</b></div><span class="cmpa">${I('arr')}</span><div><small>Evaluasi</small><b>${sc}</b></div><div class="cmpd ${d > 0 ? 'up' : d < 0 ? 'dn' : ''}"><b>${d > 0 ? '+' : ''}${d}</b><small>${d > 0 ? 'poin naik' : d < 0 ? 'poin turun' : 'sama'}</small></div></div>`;
}

/* ---------- Tes awal ---------- */
SCR.pre = () => {
  const t = R.pre || (R.pre = { st: 0, i: 0, a: [] });
  if (S.pre.done && !t.st) {
    const sc = S.pre.sc;
    return `<article class="card pane"><div class="pb scroll"><div class="res" style="padding:10px 0"><div class="bring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" stroke="var(--pl)"/><circle cx="60" cy="60" r="52" stroke="var(--p)" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="${326.7 * (1 - sc / 100)}"/></svg><div class="v"><div>${sc}<small>dari 100</small></div></div></div><div><span class="tag">${I('flag')} Tes awal selesai</span><h2 class="pp" style="color:var(--pd);font-size:clamp(20px,2.6vw,26px);margin-top:8px">Ini titik awalmu${S.name ? ', ' + esc(S.name) : ''}.</h2><p style="color:var(--mute);margin-top:6px">Nanti dibandingin sama nilai evaluasi di akhir.</p></div></div><p class="kh" style="margin-top:18px">Yang bakal kamu pelajari</p><div class="prel">${M.map((m, k) => `<button onclick="go('materi',${k})"><span>${S.md[k] ? I('chk') : k + 1}</span><b>${m.t}</b><small>sekitar ${estM('materi', k)} menit</small></button>`).join('')}</div></div><div class="pf"><span></span><button class="btn shim" onclick="go('materi',firstM())">Mulai Materi 1 ${I('arr')}</button></div></article>`;
  }
  if (!t.st)
    return `<article class="card pane"><div class="ph"><span class="tag">${I('flag')} Sebelum mulai</span><h2>Tes awal dulu, yuk</h2><p>Jawab sebisanya, salah nggak apa-apa. Nilainya nanti dibandingin sama evaluasi di akhir.</p></div><div class="pb scroll"><div class="prei">${[
      ['task', '8 soal', 'Pilihan ganda, sekali jalan'],
      ['flag', 'Sekitar 4 menit', 'Nggak ada batas waktu'],
      ['eye', 'Tanpa pembahasan', 'Biar nilainya jujur'],
    ]
      .map((x, k) => `<div style="--k:${k}"><span>${I(x[0])}</span><b>${x[1]}</b><small>${x[2]}</small></div>`)
      .join(
        '',
      )}</div><div class="pre3d" aria-hidden="true"><div class="p3s"><div class="p3c c1"><i>A</i><i>B</i><i class="ok">C</i><i>D</i></div><div class="p3c c2"><i>A</i><i class="ok">B</i><i>C</i><i>D</i></div><div class="p3c c3"><b>?</b></div></div><span class="p3o o1"></span><span class="p3o o2"></span><span class="p3o o3"></span></div><p class="pretip">Soalnya sama persis kayak evaluasi di akhir. Dari situ kelihatan seberapa jauh kamu berkembang.</p></div><div class="pf"><button class="btn g" onclick="S.pre.skip=1;save();go('materi',firstM())">Lewati</button><button class="btn shim" onclick="R.pre.st=1;go('pre',0,'f')">Mulai tes awal ${I('arr')}</button></div></article>`;
  const q = QZ[t.i],
    a = t.a[t.i];
  return `<article class="card pane"><div class="ph"><div class="row" style="justify-content:space-between"><span class="tag">Tes awal · Soal ${t.i + 1} dari ${QZ.length}</span><button class="link" onclick="S.pre.skip=1;save();R.pre=null;go('materi',firstM())">Lewati tes</button></div><div class="qbar" style="margin-top:12px"><i style="width:${(t.i / QZ.length) * 100}%"></i></div></div><div class="pb scroll"><p class="q">${q[0]}</p><div class="opts">${q[1].map((o, j) => `<button class="op ${a === j ? 'on' : ''}" onclick="preA(${j})"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div></div><div class="pf"><span class="small prem"></span><button class="btn" ${a == null ? 'disabled' : ''} onclick="${t.i < QZ.length - 1 ? 'preN()' : "loadBtn(this,preN,'Menyimpan...')"}">${t.i < QZ.length - 1 ? 'Soal berikutnya' : 'Selesai'} ${I('arr')}</button></div></article>`;
};
function preA(j) {
  R.pre.a[R.pre.i] = j;
  sfx('tap');
  document.querySelectorAll('#view .opts .op').forEach((b, k) => b.classList.toggle('on', k == j));
  const nb = document.querySelector('#view .pf .btn');
  if (nb) nb.disabled = false;
}
function preN() {
  const t = R.pre;
  t.i++;
  if (t.i >= QZ.length) {
    const sc = Math.round((t.a.filter((v, j) => v == QZ[j][2]).length / QZ.length) * 100);
    S.pre = { done: 1, sc, skip: 0 };
    save();
    sfx('ok');
    R.pre = null;
  }
  go('pre', 0, 'f');
}

/* ---------- Peta konsep ---------- */
var KSEL = 0;
SCR.konsep = () => {
  const n = 8,
    cx = 50,
    cy = 50,
    pos = [...Array(n)].map((_, k) => {
      const a = ((-90 + k * 45) * Math.PI) / 180;
      return [cx + 37 * Math.cos(a), cy + 38 * Math.sin(a)];
    });
  const lines = pos
    .map(
      ([x, y], k) =>
        `<path class="kl" style="--k:${k}" d="M${cx} ${cy} Q${(cx + x) / 2 + (k % 2 ? 4 : -4)} ${(cy + y) / 2 + (k % 2 ? -4 : 4)} ${x} ${y}" pathLength="1"/>`,
    )
    .join('');
  void lines;
  /* Papan catatan: tiap materi jadi kertas tempel, disambung benang sesuai urutan (zig-zag). */
  const NC = ['#ffffff', '#e3effd', '#ede9fe', '#dff5f2', '#fff6d9', '#e8f0ff', '#f3e8ff', '#e0f2fe'],
    ROT = [-3, 2, -2, 3, 2, -3, 3, -2];
  const place = (k) => {
    const dc = k < 4 ? k + 1 : 8 - k,
      dr = k < 4 ? 1 : 2,
      mr = Math.floor(k / 2) + 1,
      mc = Math.floor(k / 2) % 2 == 0 ? (k % 2) + 1 : 2 - (k % 2);
    return { dc, dr, mc, mr };
  };
  const str = (pts) =>
    'M' +
    pts
      .map(([x, y], j) => (j ? `Q${(pts[j - 1][0] + x) / 2} ${(pts[j - 1][1] + y) / 2 + 5} ${x} ${y}` : `${x} ${y}`))
      .join(' ');
  const dPts = [...Array(8)].map((_, k) => { const p = place(k); return [(p.dc - 0.5) * 25, p.dr == 1 ? 25 : 75]; }),
    mPts = [...Array(8)].map((_, k) => { const p = place(k); return [(p.mc - 0.5) * 50, (p.mr - 0.5) * 25]; });
  const notes = M.map((m, k) => {
    const p = place(k);
    return `<button class="knote ${k == KSEL ? 'on' : ''}" style="--nc:${NC[k]};--rot:${ROT[k]}deg;--dc:${p.dc};--dr:${p.dr};--mc:${p.mc};--mr:${p.mr}" onclick="kSel(${k})" aria-label="Materi ${k + 1}: ${m.t}"><i class="kpin" aria-hidden="true"></i><small>Materi ${k + 1}</small><b>${MSH[k]}</b><span>${TK[k][0]}</span></button>`;
  }).join('');
  return `<div class="km"><article class="card kmc"><div class="ph"><span class="tag">${I('net')} Rangkuman</span><h2>Peta konsep</h2><p>Klik kertasnya buat lihat poin pentingnya.</p></div><div class="kboard" id="kmap"><svg class="kstr d" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${str(dPts)}"/></svg><svg class="kstr m" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${str(mPts)}"/></svg>${notes}</div></article><article class="card kpan" id="kpan">${kPan(KSEL)}</article></div>`;
};
function kPan(k) {
  const m = M[k];
  return `<div class="pb scroll"><span class="tag" style="--c:${COVC[k][0]}">Materi ${k + 1} dari 8</span><h3 class="pp kt">${m.t}</h3><p class="small">${m.s}</p><p class="kh">Yang perlu diingat</p><ul class="sumL kl3">${TK[k].map((t, j) => `<li style="--k:${j}"><b>${I('chk')}</b>${t}</li>`).join('')}</ul><p class="kh">Isi materinya</p><div class="chips">${m.p.map((x) => `<span class="chip">${x[0]}</span>`).join('')}</div></div><div class="pf"><div class="row"><button class="btn g sm" ${k == 0 ? 'disabled' : ''} onclick="kSel(${k - 1})" aria-label="Materi sebelumnya">${I('bk')}</button><button class="btn g sm" ${k == 7 ? 'disabled' : ''} onclick="kSel(${k + 1})" aria-label="Materi berikutnya">${I('arr')}</button></div><div class="row"><button class="btn g" onclick="go('materi',${k})">${I('book')}<span class="lbl">Buka materi</span></button>${aN() < 7 ? `<button class="btn" onclick="go('akt')">Ke aktivitas ${I('arr')}</button>` : `<button class="btn" onclick="go('home',0,'b')">${I('home')} Beranda</button>`}</div></div>`;
}
function kSel(k) {
  KSEL = Math.max(0, Math.min(7, k));
  sfx('tap');
  document.querySelectorAll('.kn, .knote').forEach((b) => b.classList.remove('on'));
  document.querySelectorAll('.knote').forEach((b, j) => b.classList.toggle('on', j == KSEL));
  const p = document.getElementById('kpan');
  if (p) {
    p.innerHTML = kPan(KSEL);
    p.classList.remove('kin');
    void p.offsetWidth;
    p.classList.add('kin');
  }
}

/* ---------- Tur panduan ---------- */
const TOURS = {
  home: [
    ['.hello .nextc', 'Mulai dari sini', 'Kotak ini selalu nunjukin bagian yang harus kamu kerjain berikutnya.'],
    ['.hello .btn.big:not([hidden])', 'Tombol utama', 'Klik ini buat mulai atau lanjut belajar dari terakhir kali.'],
    ['.qk', 'Pintasan', 'Video intro, contoh portofolio, tujuan, panduan, dan lencanamu ada di sini.'],
    [
      '.card.path',
      'Alur belajar',
      'Lima tahap ini kebuka berurutan. Yang kekunci bakal kebuka setelah tahap sebelumnya selesai.',
    ],
    ['.side .snav', 'Navigasi', 'Semua tahap belajar ada di sini. Yang bergembok kebuka setelah tahap sebelumnya selesai.'],
    ['#aib:not([hidden]), .side [data-k="ai"]', 'Tanya Kak Folio', 'Bingung soal portofolio atau Canva? Tanya Kak Folio aja.'],
    [
      '.top .ib[aria-label="Buka menu"], .side [data-k="cari"]',
      'Menu',
      'Pindah ke bagian mana pun, buka peta konsep, sertifikat, atau ulangi tur ini.',
    ],
  ],
  materi: [
    [
      '.mseg',
      'Pilih cara belajar',
      'Cerita: materi dibagi per slide. Ringkasan: semua bagian dalam satu halaman, tinggal buka yang kamu mau.',
    ],
    [
      '#sdots',
      'Posisi slide',
      'Titik-titik ini nunjukin kamu lagi di slide ke berapa. Bisa diklik buat balik ke slide sebelumnya.',
    ],
    ['#sln', 'Lanjut', 'Klik ini buat ke slide berikutnya. Di HP kamu juga bisa geser layar ke kiri.'],
    ['.mapr', 'Peta materi', 'Materi yang udah selesai hijau, yang lagi dibuka biru, sisanya kekunci sampai giliran.'],
    ['.mdd', 'Peta materi', 'Ketuk ini buat lihat materi mana yang udah selesai dan mana yang masih kekunci.'],
  ],
};
var TR = null;
function tourMaybe(k) {
  if (S.tour && S.tour[k]) return;
  setTimeout(() => {
    if (
      cur.r !== k ||
      document.getElementById('splash') ||
      document.getElementById('sh').classList.contains('on') ||
      TR
    )
      return;
    tourStart(k);
  }, 1200);
}
/* elemen pertama yang benar-benar terlihat (sidebar di laptop, header di HP) */
function vq(sel) {
  return [...document.querySelectorAll(sel)].find((e) => e.offsetParent && e.getBoundingClientRect().width > 0) || null;
}
function tourStart(k, force) {
  const st = (TOURS[k] || []).filter((x) => {
    return !!vq(x[0]);
  });
  if (!st.length) return;
  tourEnd(true);
  const o = document.createElement('div');
  o.id = 'tour';
  o.innerHTML = `<div class="tsp"></div><div class="tbx" role="dialog" aria-live="polite"><small class="tst"></small><b class="ttl"></b><p class="ttx"></p><div class="tbt"><button class="link tsk">Lewati</button><button class="btn sm tnx"></button></div></div>`;
  document.body.appendChild(o);
  TR = { k, st, i: 0, o };
  o.querySelector('.tsk').onclick = () => tourEnd();
  o.querySelector('.tnx').onclick = () => {
    TR.i++;
    if (TR.i >= TR.st.length) tourEnd();
    else tourShow();
  };
  o.addEventListener('click', (e) => {
    if (e.target === o) e.stopPropagation();
  });
  tourShow();
  requestAnimationFrame(() => o.classList.add('on'));
}
function tourShow() {
  if (!TR) return;
  const [sel, t, x] = TR.st[TR.i],
    e = vq(sel);
  if (!e) {
    TR.i++;
    if (TR.i >= TR.st.length) return tourEnd();
    return tourShow();
  }
  // bagian yang ditunjuk bisa berada di bawah (misalnya beranda HP yang digulir): gulir dulu supaya terlihat
  let r = e.getBoundingClientRect();
  if (r.top < 60 || r.bottom > innerHeight - 20) {
    e.scrollIntoView({ block: 'center', behavior: 'instant' });
    r = e.getBoundingClientRect();
  }
  const pd = 8,
    sp = TR.o.querySelector('.tsp'),
    bx = TR.o.querySelector('.tbx');
  sp.style.cssText = `left:${r.left - pd}px;top:${r.top - pd}px;width:${r.width + pd * 2}px;height:${r.height + pd * 2}px`;
  bx.querySelector('.tst').textContent = `${TR.i + 1} dari ${TR.st.length}`;
  bx.querySelector('.ttl').textContent = t;
  bx.querySelector('.ttx').textContent = x;
  bx.querySelector('.tnx').innerHTML = TR.i == TR.st.length - 1 ? 'Siap, mulai!' : 'Lanjut ' + I('arr');
  const bw = Math.min(300, innerWidth - 24);
  bx.style.width = bw + 'px';
  const bh = bx.offsetHeight || 150;
  let top = r.bottom + pd + 12;
  if (top + bh > innerHeight - 12) top = r.top - pd - 12 - bh;
  if (top < 12) top = Math.min(innerHeight - bh - 12, r.bottom + pd + 12);
  let left = r.left + r.width / 2 - bw / 2;
  left = Math.max(12, Math.min(innerWidth - bw - 12, left));
  bx.style.left = left + 'px';
  // kotak tur selalu di dalam layar
  bx.style.top = Math.max(12, Math.min(innerHeight - bh - 12, top)) + 'px';
  bx.classList.remove('pop2');
  void bx.offsetWidth;
  bx.classList.add('pop2');
  sfx('tap');
}
function tourEnd(silent) {
  if (!TR) return;
  const o = TR.o,
    k = TR.k;
  S.tour = S.tour || {};
  S.tour[k] = 1;
  save();
  TR = null;
  o.classList.remove('on');
  setTimeout(() => o.remove(), 250);
}
addEventListener('resize', () => {
  if (TR) tourShow();
});
document.addEventListener(
  'keydown',
  (e) => {
    if (TR && e.key == 'Escape') tourEnd();
  },
  true,
);
{
  const h0 = AFT.materi;
  AFT.materi = (i) => {
    h0 && h0(i);
    tourMaybe('materi');
  };
}
AFT.home = () => tourMaybe('home');
AFT.konsep = () => {
  const p = document.getElementById('kpan');
  if (p) p.classList.add('kin');
};

/* ---------- Kak Folio versi bawaan (tanpa internet) ---------- */
const FAQ = [
  [
    'Apa itu portofolio digital?',
    [
      'apa itu portofolio',
      'pengertian portofolio',
      'portofolio itu apa',
      'arti portofolio',
      'maksud portofolio',
      'portofolio digital itu',
      'apa portofolio digital',
    ],
    'Portofolio digital itu kumpulan bukti kemampuanmu, misalnya karya, proyek, sertifikat, dan pengalaman. Semuanya disusun rapi dan bisa dibuka online. Penjelasan lengkapnya ada di Materi 1.',
  ],
  [
    'Bedanya CV sama portofolio apa?',
    ['beda', 'bedanya', 'perbedaan', 'cv', 'resume', 'daftar riwayat hidup'],
    'Gampangnya gini:\n- **CV** bilang kamu bisa.\n- **Portofolio** nunjukin buktinya.\nKeduanya saling melengkapi, bukan saling menggantikan. Jadi tetap kirim dua-duanya ya. Lihat Materi 1.',
  ],
  [
    'Apa fungsi portofolio?',
    ['fungsi', 'gunanya', 'kegunaan', 'buat apa portofolio', 'untuk apa portofolio'],
    'Ada tiga fungsi utama:\n- Menunjukkan kompetensimu.\n- Menyimpan semua karyamu di satu tempat.\n- Membantu perekrut menilai kamu sebelum wawancara.\nDibahas di Materi 1.',
  ],
  [
    'Apa manfaat portofolio buat fresh graduate?',
    [
      'manfaat',
      'keuntungan',
      'kenapa perlu',
      'kenapa harus',
      'harus buat',
      'alasan',
      'penting',
      'fresh graduate perlu',
    ],
    'Manfaatnya:\n- Perekrut lebih cepat paham kemampuanmu.\n- Kamu lebih pede waktu wawancara.\n- Isinya bisa diperbarui kapan aja tanpa cetak ulang.\nLihat Materi 1.',
  ],
  [
    'Bagian apa saja yang harus ada di portofolio?',
    ['bagian', 'struktur', 'isi portofolio', 'susunan', 'komponen', 'apa saja yang ada'],
    'Ada lima bagian yang hampir selalu ada:\n- Profil diri\n- Pendidikan dan pengalaman\n- Skill\n- Proyek atau karya (paling penting)\n- Kontak\nDetailnya di Materi 2.',
  ],
  [
    'Profil diri isinya apa?',
    ['profil', 'tentang saya', 'about me', 'perkenalan diri', 'deskripsi diri'],
    'Isi profil cukup: nama, satu kalimat posisi (misalnya "Desainer Grafis, fresh graduate"), dan 2 sampai 3 kalimat tentang minatmu. Jangan sampai jadi cerita hidup ya. Lihat Materi 2.',
  ],
  [
    'Pendidikan dan pengalaman ditulis gimana?',
    ['pendidikan', 'pengalaman', 'magang', 'organisasi', 'kepanitiaan', 'riwayat'],
    'Tulis kampus, jurusan, dan tahun lulus. Lalu tambahkan magang, organisasi, atau kepanitiaan yang nyambung sama bidangmu. Singkat aja, nggak perlu semua kegiatan. Lihat Materi 2.',
  ],
  [
    'Berapa skill yang sebaiknya ditulis?',
    ['skill', 'keahlian', 'kemampuan', 'berapa skill', 'hard skill', 'soft skill'],
    'Cukup 5 sampai 8 skill. Kelompokkan biar gampang dibaca, misalnya Desain, Aplikasi, Komunikasi. Tiap skill sebaiknya punya minimal satu karya yang membuktikannya. Lihat Materi 2.',
  ],
  [
    'Kontak apa saja yang perlu dicantumkan?',
    ['kontak', 'isi kontak', 'bagian kontak', 'email', 'linkedin', 'nomor', 'hubungi', 'whatsapp'],
    'Cantumkan email aktif, LinkedIn, dan nomor yang bisa dihubungi. Taruh di halaman terakhir dan pastikan semuanya masih aktif sebelum dikirim. Lihat Materi 2.',
  ],
  [
    'Bagian mana yang paling penting?',
    ['paling penting', 'terpenting', 'utama', 'fokus'],
    'Bagian proyek atau karya. Di situ perekrut lihat bukti kemampuanmu. Tiap karya kasih judul, peranmu, alat yang dipakai, dan hasilnya. Lihat Materi 2.',
  ],
  [
    'Berapa karya yang ideal dimasukkan?',
    [
      'berapa karya',
      'jumlah karya',
      'banyak karya',
      'berapa proyek',
      'semua karya',
      'karya yang dimasukkan',
      'berapa banyak',
    ],
    'Tiga sampai enam karya terbaik udah cukup. Nggak perlu semua karya masuk. Pilih yang paling nyambung sama posisi yang kamu lamar. Lihat Materi 3.',
  ],
  [
    'Gimana cara memilih karya?',
    ['memilih karya', 'pilih karya', 'seleksi', 'saringan', 'kurasi', 'karya mana', 'karya yang masuk', 'milih karya'],
    'Pakai tiga saringan:\n- Relevan dengan posisi yang dilamar.\n- Kualitasnya bikin kamu bangga.\n- Peran dan hasilnya jelas.\nTips: kalau sebuah karya dihapus dan perekrut nggak kehilangan bukti penting, hapus aja. Lihat Materi 3.',
  ],
  [
    'Aku belum punya karya, gimana?',
    [
      'belum punya karya',
      'tidak punya karya',
      'belum ada karya',
      'tanpa pengalaman',
      'tidak ada pengalaman',
      'belum ada pengalaman',
      'belum punya pengalaman',
      'belum pengalaman',
      'fresh grad',
      'belum kerja',
      'pemula',
      'tidak ada karya',
      'baru lulus',
      'tidak punya pengalaman',
    ],
    'Tenang, banyak fresh graduate yang sama. Kamu bisa pakai:\n- Tugas kuliah atau proyek kelas yang relevan.\n- Kegiatan organisasi atau kepanitiaan (misalnya desain poster acara).\n- Proyek pribadi kecil yang sengaja kamu bikin buat latihan.\nYang penting tulis peran dan hasilnya dengan jelas. Lihat Materi 3.',
  ],
  [
    'Keterangan karya yang baik seperti apa?',
    ['keterangan', 'deskripsi karya', 'caption', 'penjelasan karya', 'peran', 'hasil'],
    'Tulis 2 sampai 3 baris: masalahnya apa, peranmu apa, dan hasilnya apa. Contoh: "Poster acara kampus. Aku desainer utamanya, pakai Canva. Dipakai di semua media sosial kampus." Lihat Materi 6.',
  ],
  [
    'Portofolio perlu beda untuk tiap lamaran?',
    [
      'menyesuaikan',
      'sesuaikan',
      'beda lamaran',
      'lamaran beda',
      'tiap lamaran',
      'setiap lamaran',
      'posisi berbeda',
      'beda beda',
      'berbeda beda',
      'satu portofolio',
      'lamaran',
    ],
    'Sebaiknya iya. Satu portofolio bisa disesuaikan per lamaran. Desainer menonjolkan karya visual, staf administrasi menonjolkan pengalaman organisasi, ketelitian, dan sertifikat. Lihat Materi 3.',
  ],
  [
    'Ukuran desain apa yang dipakai di Canva?',
    ['ukuran', '16:9', 'presentasi', 'website', 'format desain', 'dimensi'],
    'Untuk portofolio pilih ukuran Presentasi (16:9) atau Website. Presentasi paling serbaguna karena enak dilihat di laptop dan gampang disimpan jadi PDF. Lihat Materi 4.',
  ],
  [
    'Apa itu template?',
    ['template', 'apa itu template', 'kerangka'],
    'Template itu kerangka desain siap pakai. Kamu tinggal ganti teks, warna, dan fotonya, tapi pertahankan susunannya supaya tetap rapi. Pilih yang simpel biar lebih aman. Lihat Materi 4.',
  ],
  [
    'Gimana cara memasukkan karya sendiri ke Canva?',
    [
      'unggah',
      'upload',
      'memasukkan karya',
      'masukkan karya',
      'masukkan foto',
      'masukkan hasil',
      'tambah karya',
      'menambahkan karya',
      'tambahkan karya',
      'gambar sendiri',
      'foto sendiri',
      'desain sendiri',
      'karya sendiri',
      'hasil desain',
      'import',
    ],
    'Pakai menu Unggahan. Unggah file karyamu, lalu seret ke halaman. Pastikan gambarnya jelas, jangan yang buram atau resolusinya kecil. Lihat Materi 4.',
  ],
  [
    'Menu apa saja yang sering dipakai di Canva?',
    ['menu canva', 'fitur canva', 'elemen', 'teks', 'toolbar', 'tampilan canva'],
    'Yang paling sering dipakai:\n- **Teks**: buat judul dan isi.\n- **Elemen**: bentuk, garis, ikon, foto.\n- **Unggahan**: karya milikmu sendiri.\n- **Toolbar** di atas kanvas: atur huruf, warna, ukuran, posisi.\nLihat Materi 4.',
  ],
  [
    'Kalau salah klik di Canva gimana?',
    ['salah klik', 'undo', 'batal', 'ctrl z', 'kembali'],
    'Tekan Ctrl+Z (atau Cmd+Z di Mac) buat membatalkan. Klik kanan juga bisa dipakai buat duplikat atau mengunci elemen biar nggak kegeser. Lihat Materi 4.',
  ],
  [
    'Elemen Pro di Canva itu apa?',
    ['pro', 'berbayar', 'premium', 'mahkota', 'bayar'],
    'Ada elemen dan template yang berlabel Pro, artinya berbayar. Hati-hati jangan kepakai tanpa sadar, karena bisa muncul tanda air atau diminta bayar waktu disimpan. Pilih yang gratis aja. Lihat Materi 4.',
  ],
  [
    'Prinsip desain apa yang perlu diperhatikan?',
    ['prinsip desain', 'desain', 'biar rapi', 'tampilan rapi', 'estetik', 'berantakan', 'tidak rapi', 'jelek'],
    'Ada empat:\n- **Layout**: jarak tepi sama dan ada ruang kosong.\n- **Warna**: satu utama, satu pendukung, sisanya netral.\n- **Tipografi**: maksimal dua jenis huruf.\n- **Konsistensi**: gaya sama di semua halaman.\nLihat Materi 5.',
  ],
  [
    'Berapa jenis huruf yang boleh dipakai?',
    ['huruf', 'font', 'tipografi', 'jenis huruf', 'ukuran huruf'],
    'Maksimal dua jenis huruf: satu buat judul, satu buat isi. Bedakan ukurannya, misalnya judul 32, subjudul 20, isi 14. Lihat Materi 5.',
  ],
  [
    'Warna apa yang bagus buat portofolio?',
    ['warna', 'palet', 'kombinasi warna', 'kontras'],
    'Pakai satu warna utama, satu pendukung, sisanya netral. Pastikan teks kontras dengan latarnya, misalnya teks gelap di latar terang. Hindari terlalu banyak warna. Lihat Materi 5.',
  ],
  [
    'Apa itu ruang kosong dan kenapa penting?',
    [
      'ruang kosong',
      'whitespace',
      'spasi',
      'jarak',
      'sesak',
      'terlalu padat',
      'terlalu penuh',
      'padat',
      'penuh',
      'ramai',
    ],
    'Ruang kosong itu area kosong di sekitar elemen. Fungsinya bikin desain lega dan mata nggak capek. Kalau halaman terasa padat, kurangi elemen yang nggak penting dan perbesar karya utamanya. Lihat Materi 5.',
  ],
  [
    'Gimana cara cek desainku udah rapi atau belum?',
    ['cek desain', 'sudah rapi', 'sipitkan', 'menilai desain'],
    'Coba sipitkan mata waktu lihat desainmu. Kalau judul dan karya utama masih kelihatan jelas, susunannya udah oke. Lihat Materi 5.',
  ],
  [
    'Apa itu konsistensi dalam desain?',
    ['konsistensi', 'konsisten', 'seragam', 'sama di semua'],
    'Konsistensi artinya gaya yang sama diulang di semua halaman. Warna, huruf, dan posisi judul jangan berubah-ubah tiap halaman. Lihat Materi 5.',
  ],
  [
    'Urutan bikin portofolio di Canva gimana?',
    ['urutan', 'langkah', 'cara membuat', 'cara bikin', 'tahapan', 'step'],
    'Urutannya:\n- Tentukan template.\n- Masukkan konten (profil, pendidikan, skill).\n- Susun karya beserta keterangannya.\n- Rapikan tampilan (layout, warna, huruf).\nKerjakan satu halaman sampai rapi dulu, baru lanjut. Lihat Materi 6.',
  ],
  [
    'Portofolio sebaiknya berapa halaman?',
    ['berapa halaman', 'jumlah halaman', 'halaman', 'panjang portofolio'],
    'Susunan yang disarankan: sampul, profil, pendidikan, skill, 3 sampai 4 halaman karya, lalu kontak. Jangan kebanyakan halaman ya. Lihat Materi 6.',
  ],
  [
    'Kalimat di portofolio sebaiknya seperti apa?',
    ['kalimat', 'tulisan', 'paragraf', 'bahasa', 'teks panjang'],
    'Pakai kalimat pendek, bukan paragraf panjang. Perekrut biasanya cuma memindai sekilas, jadi yang singkat dan jelas lebih gampang dibaca. Lihat Materi 6.',
  ],
  [
    'Apa yang dicek sebelum portofolio dibagikan?',
    [
      'cek sebelum',
      'sebelum kirim',
      'sebelum dikirim',
      'sebelum dibagikan',
      'sebelum share',
      'memeriksa',
      'periksa',
      'salah ketik',
      'typo',
      'cek ulang',
    ],
    'Cek salah ketik, kelengkapan, kualitas gambar, dan tautannya. Minta satu teman membacanya dua menit, biasanya dia nemuin yang kamu lewatkan. Lihat Materi 7.',
  ],
  [
    'Simpan portofolio pakai format apa?',
    ['format', 'pdf', 'png', 'jpg', 'simpan', 'download', 'unduh'],
    'Tergantung tujuannya:\n- **PDF**: buat lamaran lewat email.\n- **PNG atau JPG**: buat media sosial.\nKasih nama file yang jelas, misalnya NamaLengkap_Portofolio_Posisi.pdf. Lihat Materi 7.',
  ],
  [
    'Nama file yang baik seperti apa?',
    ['nama file', 'penamaan', 'desain tanpa judul', 'judul file'],
    'Pakai format NamaLengkap_Portofolio_Posisi.pdf. Jangan kirim file bernama "Desain tanpa judul" ya, kesannya kurang profesional. Lihat Materi 7.',
  ],
  [
    'Gimana cara bikin tautan Canva yang hanya lihat?',
    ['tautan', 'link', 'bagikan', 'share', 'hanya lihat', 'akses'],
    'Di Canva klik **Bagikan**, lalu atur akses tautannya jadi "hanya lihat". Habis itu buka tautannya di jendela penyamaran buat mastiin orang lain bisa membukanya. Lihat Materi 7.',
  ],
  [
    'Kenapa tautan harus hanya lihat, bukan edit?',
    [
      'akses edit',
      'bisa edit',
      'kenapa hanya lihat',
      'diubah orang',
      'view only',
      'bukan edit',
      'harus hanya lihat',
      'kenapa tautan',
    ],
    'Kalau aksesnya "bisa edit", orang lain bisa mengubah portofoliomu. Dengan "hanya lihat", isinya aman dan tetap seperti yang kamu buat. Lihat Materi 7.',
  ],
  [
    'Apa itu jendela penyamaran?',
    ['penyamaran', 'incognito', 'private', 'mode samaran'],
    'Jendela penyamaran itu mode browser tanpa akun yang login. Dipakai buat ngecek apakah tautan portofoliomu bisa dibuka orang lain yang nggak punya akses ke akunmu. Lihat Materi 7.',
  ],
  [
    'Gimana cara menilai portofolio sendiri?',
    [
      'menilai',
      'tahu sudah bagus',
      'sudah bagus belum',
      'evaluasi diri',
      'nilai sendiri',
      'nilai portofolio',
      'cara nilai',
      'menilai sendiri',
      'skala',
      'rubrik',
      'bagus atau belum',
      'sudah bagus',
    ],
    'Cek dua hal:\n- **Kelengkapan**: lima bagian ada? Karyanya relevan? Informasinya benar?\n- **Desain**: mudah dibaca, rapi, warna nyaman, huruf konsisten?\nBeri nilai 1 sampai 4 tiap poin, targetnya minimal 3. Lihat Materi 8.',
  ],
  [
    'Yang diperbaiki duluan apa?',
    ['diperbaiki', 'perbaikan', 'memperbaiki', 'urutan memperbaiki', 'urutan perbaikan', 'dulu', 'prioritas'],
    'Urutannya: kesalahan informasi dulu, lalu masalah desain yang besar, terakhir detail kecil. Jangan perbaiki semuanya sekaligus. Lihat Materi 8.',
  ],
  [
    'Minta pendapat ke siapa?',
    ['pendapat', 'masukan', 'feedback', 'saran', 'minta tolong'],
    'Masukan paling berguna datang dari orang yang mirip pembacamu, misalnya kakak tingkat yang udah kerja. Tanya juga: kalau aku jadi perekrut, apa kesan pertamaku dalam 10 detik? Lihat Materi 8.',
  ],
  [
    'Kesalahan apa yang sering terjadi?',
    ['kesalahan', 'salah', 'sering salah', 'hindari', 'jangan'],
    'Beberapa yang paling sering:\n- Menganggap portofolio sama dengan CV.\n- Memasukkan semua karya tanpa dipilih.\n- Karya tanpa keterangan peran dan hasil.\n- Terlalu banyak warna dan jenis huruf.\n- Mengirim tautan dengan akses edit.\nCek bagian "Hindari dan tips" di tiap materi.',
  ],
  [
    'Kenapa materi berikutnya terkunci?',
    [
      'terkunci',
      'kekunci',
      'lock',
      'tidak bisa dibuka',
      'tidak bisa dibuka',
      'kunci',
      'tidak bisa masuk',
      'tidak kebuka',
      'belum bisa dibuka',
      'belum kebuka',
      'belum terbuka',
    ],
    'Materi dibuka berurutan biar belajarnya runtut. Selesaikan materi sebelumnya sampai slide terakhir, lalu klik **Sudah paham**. Aktivitas kebuka setelah 8 materi selesai, praktik setelah semua aktivitas, dan seterusnya.',
  ],
  [
    'Cara pakai course ini gimana?',
    ['cara pakai', 'cara menggunakan', 'panduan', 'bingung pakai', 'navigasi', 'pakai web', 'pakai course', 'tur'],
    'Ikuti tombol utama di Beranda, nanti kamu diarahkan berurutan: tes awal, 8 materi, peta konsep, 7 aktivitas, praktik di Canva, evaluasi, refleksi, lalu rapor. Mau lihat tur panduannya lagi? Buka menu kanan atas, pilih **Ulangi tur panduan**.',
  ],
  [
    'Bedanya mode Cerita dan Ringkasan?',
    ['mode cerita', 'ringkasan', 'cerita', 'mode baca'],
    '**Cerita**: materi dibagi per slide, cocok buat belajar pertama kali.\n**Ringkasan**: semua bagian dalam satu halaman, tinggal buka yang kamu mau. Cocok buat mengulang.',
  ],
  [
    'Tes awal itu buat apa?',
    ['tes awal', 'pretest', 'pre test', 'sebelum belajar'],
    'Tes awal dipakai buat lihat kemampuanmu sebelum belajar. Nilainya nanti dibandingkan sama evaluasi di akhir, jadi kelihatan kamu naik berapa poin. Salah juga nggak apa-apa.',
  ],
  [
    'Gimana cara dapat sertifikat?',
    ['sertifikat', 'certificate', 'piagam'],
    'Sertifikat kebuka kalau nilai evaluasimu minimal 70. Setelah itu buka rapor atau menu, pilih **Sertifikat**, cek namamu, lalu unduh sebagai gambar PNG.',
  ],
  [
    'Progresku tersimpan di mana?',
    ['progres', 'tersimpan', 'hilang', 'simpan progres', 'data'],
    'Progresmu tersimpan otomatis di browser yang kamu pakai. Jadi pakai browser dan perangkat yang sama ya. Kalau datanya dihapus atau pakai mode penyamaran, progres bisa hilang.',
  ],
  [
    'Apa itu lencana?',
    ['lencana', 'badge', 'penghargaan'],
    'Lencana itu penghargaan kecil yang kamu dapat otomatis sambil belajar, misalnya waktu selesai Materi 1 atau dapat nilai evaluasi 85 ke atas. Ada 8 lencana. Lihat di pintasan Lencana di Beranda.',
  ],
  [
    'Praktiknya dikerjakan di mana?',
    ['praktik', 'canva langsung', 'mengerjakan', 'simulasi'],
    'Praktiknya langsung di Canva: buka Canva di tab lain, kerjakan 4 langkahnya, lalu centang di course ini. Ada juga mode **Coba simulasi** buat latihan dulu sebelum ke Canva.',
  ],
  [
    'Contoh portofolio jadi ada?',
    ['contoh', 'contoh portofolio', 'referensi', 'inspirasi'],
    'Ada! Buka pintasan **Contoh** di Beranda. Isinya buku 7 halaman portofolio contoh. Klik titik kuningnya buat lihat kenapa bagian itu udah bagus.',
  ],
  [
    'Template Canva yang cocok buatku apa?',
    [
      'template cocok',
      'template yang cocok',
      'gaya template',
      'minimalis',
      'kreatif',
      'profesional',
      'rekomendasi template',
      'pilih template',
      'desainer',
    ],
    'Coba buka menu, pilih **Gaya template Canva**. Ada tiga gaya: Minimalis, Kreatif, dan Profesional, lengkap sama cocoknya buat bidang apa dan tombol buat cari di Canva.',
  ],
];
const FSTOP = new Set(
  'yang dan di ke dari itu ini apa aja saja gimana bagaimana cara kalau kalo aku saya kamu ya sih dong nih tuh untuk buat dengan atau ada adalah bisa harus perlu sebaiknya mau jadi juga lagi udah sudah biar agar supaya karena kenapa tidak nggak gak ga'.split(
    ' ',
  ),
);
const FSL = {
  udah: 'sudah',
  dah: 'sudah',
  sumpek: 'padat',
  rame: 'padat',
  slide: 'halaman',
  slides: 'halaman',
  lembar: 'halaman',
  diklik: 'dibuka',
  klik: 'buka',
  kebuka: 'dibuka',
  ngeklik: 'buka',
  lulusan: 'lulus',
  tau: 'tahu',
  liat: 'lihat',
  dikit: 'sedikit',
  banget: '',
  bgt: '',
  kok: '',
  sih: '',
  dong: '',
  deh: '',
  nih: '',
  kak: '',
  tuh: 'itu',
  tu: 'itu',
  gabisa: 'tidak bisa',
  gbs: 'tidak bisa',
  gakbisa: 'tidak bisa',
  ga: 'tidak',
  gak: 'tidak',
  nggak: 'tidak',
  ngga: 'tidak',
  enggak: 'tidak',
  g: 'tidak',
  yg: 'yang',
  dgn: 'dengan',
  dg: 'dengan',
  utk: 'untuk',
  tdk: 'tidak',
  bgt: 'banget',
  gmn: 'gimana',
  gimana: 'gimana',
  apaan: 'apa',
  macem: 'macam',
  dapet: 'dapat',
  dpt: 'dapat',
  simpen: 'simpan',
  kesimpen: 'tersimpan',
  dimasukin: 'dimasukkan',
  masukin: 'masukkan',
  bikin: 'buat',
  gw: 'aku',
  gue: 'aku',
  sy: 'saya',
  ak: 'aku',
  pake: 'pakai',
  pakek: 'pakai',
  kyk: 'kayak',
  kek: 'kayak',
  udh: 'sudah',
  blm: 'belum',
  krn: 'karena',
  jg: 'juga',
  aja: 'saja',
  bener: 'benar',
  dipake: 'dipakai',
  ngedit: 'edit',
  diedit: 'edit',
  ngecek: 'cek',
  dicek: 'cek',
  ngirim: 'kirim',
  link: 'tautan',
  file: 'file',
  hp: 'hp',
  foto: 'foto',
  fonts: 'font',
};
const fNorm = (t) =>
  ' ' +
  String(t || '')
    .toLowerCase()
    .replace(/[^a-z0-9:]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => FSL[w] || w)
    .join(' ') +
  ' ';
const fTok = (t) =>
  fNorm(t)
    .trim()
    .split(' ')
    .filter((w) => w && !FSTOP.has(w));
function fStem(w) {
  const b0 = w.replace(/(nya|lah|kah|pun)$/, '');
  const bases = new Set([b0]);
  if (b0.length > 5) {
    bases.add(b0.replace(/kan$/, ''));
    bases.add(b0.replace(/an$/, ''));
    bases.add(b0.replace(/in$/, ''));
  } else if (b0.length > 4) {
    bases.add(b0.replace(/an$/, ''));
    bases.add(b0.replace(/in$/, ''));
  }
  const out = new Set();
  for (const x of bases) {
    const pre = [
      ['meng', ''],
      ['meny', 's'],
      ['mem', 'p'],
      ['mem', ''],
      ['men', 't'],
      ['men', ''],
      ['me', ''],
      ['peng', ''],
      ['peny', 's'],
      ['pem', 'p'],
      ['pem', ''],
      ['pen', 't'],
      ['pen', ''],
      ['per', ''],
      ['pe', ''],
      ['di', ''],
      ['ter', ''],
      ['ber', ''],
      ['ke', ''],
      ['se', ''],
    ];
    out.add(x);
    for (const [p, r] of pre)
      if (x.startsWith(p) && x.length - p.length >= 3) {
        const y = r + x.slice(p.length);
        out.add(y);
        if (y.startsWith('per') && y.length > 6) out.add(y.slice(3));
      }
    if (/^m[aiueo]/.test(x)) out.add('p' + x.slice(1));
    if (/^n[aiueo]/.test(x)) out.add('t' + x.slice(1));
    if (/^ny/.test(x)) out.add('s' + x.slice(2));
    if (/^ng[aiueo]/.test(x)) out.add('k' + x.slice(2));
  }
  return out;
}
const fStems = (t) => {
  const S2 = new Set();
  fTok(t).forEach((w) => {
    if (w == 'portofolio' || w == 'canva') return;
    fStem(w).forEach((v) => v.length >= 3 && S2.add(v));
  });
  return S2;
};
let FIDX = null;
function faqFind(q) {
  if (!FIDX) FIDX = FAQ.map((f) => fStems(f[0] + ' ' + f[1].join(' ')));
  const n = fNorm(q),
    qt = n.trim().split(' '),
    qs = fTok(q)
      .filter((w) => w != 'portofolio' && w != 'canva')
      .map(fStem);
  return FAQ.map((f, i) => {
    let sc = 0;
    f[1].forEach((k) => {
      const kk = fNorm(k),
        multi = kk.trim().includes(' ');
      if (n.includes(kk)) sc += multi ? 4 : 3;
      else if (!multi) {
        const w = kk.trim();
        if (w.length >= 4 && qt.some((t) => t.length > w.length && t.startsWith(w))) sc += 3;
      }
    });
    qs.forEach((set) => {
      for (const v of set) {
        if (FIDX[i].has(v)) {
          sc += 1.5;
          break;
        }
      }
    });
    return { i, sc };
  }).sort((a, b) => b.sc - a.sc);
}
function faqAnswer(q) {
  const r = faqFind(q),
    top = r[0];
  if (!top || top.sc < 3) {
    const sug = r
      .filter((x) => x.sc > 0)
      .slice(0, 3)
      .map((x) => FAQ[x.i][0]);
    const pick = sug.length ? sug : [FAQ[1][0], FAQ[10][0], FAQ[34][0]];
    return {
      t: 'Hmm, aku belum punya jawaban yang pas buat itu. Coba salah satu pertanyaan ini, atau tulis pakai kata kunci yang lebih spesifik (misalnya "jumlah karya" atau "format PDF").',
      sug: pick,
    };
  }
  const rel = r
    .slice(1)
    .filter((x) => x.sc >= 2)
    .slice(0, 2)
    .map((x) => FAQ[x.i][0]);
  return { t: FAQ[top.i][2], sug: rel };
}

/* ================= Navigasi ================= */
var INGO = 0,
  HNAV = 0,
  HPOP = 0;
P.search = '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>';
/* tombol kembali di HP / browser: balik ke layar sebelumnya, bukan keluar */
function navPush(r, i) {
  if (HNAV && HNAV.r === r && HNAV.i === i) {
    HNAV = 0;
    return;
  }
  try {
    const st = history.state;
    if (st && st.r === r && st.i === i && !st.sh) return;
    const ns = { r, i };
    if (!st || !st.r || st.sh) history.replaceState(ns, '');
    else history.pushState(ns, '');
  } catch (e) {}
}
{
  const sh0 = sheet;
  sheet = function (k) {
    sh0(k);
    try {
      const st = history.state;
      if (!(st && st.sh)) history.pushState(Object.assign({ r: cur.r, i: cur.i }, st || {}, { sh: 1 }), '');
    } catch (e) {}
  };
}
{
  const cs0 = closeSh;
  closeSh = function (fromPop) {
    const was = document.getElementById('sh').classList.contains('on');
    cs0();
    if (was && fromPop !== true && !INGO) {
      try {
        if (history.state && history.state.sh) {
          HPOP = 1;
          history.back();
        }
      } catch (e) {}
    }
  };
}
addEventListener('popstate', (e) => {
  if (HPOP) {
    HPOP = 0;
    return;
  }
  const st = e.state;
  if (document.getElementById('bkfs')) {
    bkFsClose();
    try {
      history.pushState(
        Object.assign({}, st || {}, { sh: document.getElementById('sh').classList.contains('on') ? 1 : 0 }),
        '',
      );
    } catch (x) {}
    return;
  }
  if (TR) {
    tourEnd();
  }
  if (document.getElementById('sh').classList.contains('on')) {
    closeSh(true);
    if (!st || (st.r === cur.r && st.i === cur.i)) return;
  }
  if (st && st.r && (st.r !== cur.r || st.i !== cur.i)) {
    if (lock(st.r, st.i)) {
      try {
        history.replaceState({ r: cur.r, i: cur.i }, '');
      } catch (x) {}
      return;
    }
    HNAV = { r: st.r, i: st.i };
    go(st.r, st.i, 'b');
  }
});
/* judul kecil di atas bisa diklik */
document.getElementById('crumb').addEventListener('click', () => {
  if (cur.r == 'materi') sheet('mlist');
  else if (/^a\d$/.test(cur.r)) go('akt');
});
/* pencarian di menu */
var MSIDX = null;
function mIdx() {
  const L = [];
  M.forEach((m, i) => {
    L.push({
      t: m.t,
      s: `Materi ${i + 1}`,
      ic: 'book',
      a: `mGoSlide(${i},0)`,
      x: m.t + ' ' + m.s,
      lk: () => lock('materi', i),
    });
    m.p.forEach((p, j) =>
      L.push({
        t: p[0],
        s: `Materi ${i + 1} · ${m.t}`,
        ic: 'doc',
        a: `mGoSlide(${i},${j + 1})`,
        x: p[0] + ' ' + (GL[p[0]] || '') + ' ' + p[1].replace(/<[^>]+>/g, ''),
        lk: () => lock('materi', i),
      }),
    );
  });
  [
    ['Aktivitas', 'akt', 'task', 'latihan kuis'],
    ['Praktik di Canva', 'praktik', 'lap', 'langkah canva template'],
    ['Evaluasi', 'evaluasi', 'flag', 'tes soal nilai'],
    ['Refleksi', 'refleksi', 'ref', 'menilai diri'],
    ['Rapor', 'rapor', 'star', 'hasil nilai lencana'],
    ['Peta konsep', 'konsep', 'net', 'rangkuman semua materi'],
  ].forEach((x) =>
    L.push({ t: x[0], s: 'Halaman', ic: x[2], a: `go('${x[1]}')`, x: x[0] + ' ' + x[3], lk: () => lock(x[1]) }),
  );
  [
    ['Contoh portofolio jadi', 'book', 'doc', 'contoh portofolio benar salah'],
    ['Gaya template Canva', 'tpl', 'grid', 'template minimalis kreatif profesional'],
    ['Sertifikat', 'cert', 'award', 'sertifikat unduh'],
    ['Video intro', 'intro', 'play', 'video intro pengenalan'],
    ['Sumber materi', 'src', 'doc', 'sumber rujukan referensi daftar pustaka jurnal artikel video'],
    ['Tentang', 'about', 'target', 'tentang tim kelompok pengembang dosen'],
  ].forEach((x) => L.push({ t: x[0], s: 'Bantuan', ic: x[2], a: `sheet('${x[1]}')`, x: x[0] + ' ' + x[3] }));
  FAQ.forEach((f) =>
    L.push({
      t: f[0],
      s: 'Tanya Kak Folio',
      ic: 'chat',
      a: `mAsk(${JSON.stringify(f[0]).replace(/"/g, '&quot;')})`,
      x: f[0] + ' ' + f[1].join(' '),
    }),
  );
  L.forEach((o) => {
    o.st = fStems(o.x);
    o.n = fNorm(o.t);
  });
  return L;
}
function mSearch(q) {
  const res = document.getElementById('msres'),
    ml = document.getElementById('mlist0');
  if (!res || !ml) return;
  q = q.trim();
  if (!q) {
    res.hidden = true;
    ml.hidden = false;
    return;
  }
  MSIDX = MSIDX || mIdx();
  const qn = fNorm(q),
    qs = fTok(q)
      .filter((w) => w != 'portofolio')
      .map(fStem);
  const qw = fTok(q).filter((w) => w != 'portofolio' && w.length >= 3);
  const sc = MSIDX.map((o) => {
    let v = 0;
    if (o.n.includes(qn.trim())) v += 5;
    qs.forEach((set) => {
      for (const x of set) {
        if (o.st.has(x)) {
          v += 2;
          break;
        }
      }
    });
    if (v) {
      const head = fNorm(o.x).slice(0, o.t.length + 48);
      const all = fNorm(o.x);
      qw.forEach((w) => {
        if (head.includes(' ' + w)) v += 1.5;
        const c = all.split(' ' + w).length - 1;
        if (c > 1) v += Math.min(2, (c - 1) * 0.75);
      });
    }
    return { o, v };
  })
    .filter((x) => x.v >= 2)
    .sort((a, b) => b.v - a.v)
    .slice(0, 8);
  ml.hidden = true;
  res.hidden = false;
  res.innerHTML = sc.length
    ? sc
        .map(({ o }) => {
          const lk = o.lk && o.lk();
          return `<button class="mi ${lk ? 'lk' : ''}" onclick="${o.a}"><span class="ic">${I(lk ? 'lock' : o.ic)}</span><span class="msx"><b>${esc(o.t)}</b><small>${esc(o.s)}${lk ? ' · terkunci' : ''}</small></span></button>`;
        })
        .join('')
    : `<div class="msno">${I('search')}<b>Belum ketemu</b><small>Coba kata lain, atau tanya langsung ke Kak Folio.</small><button class="btn sm" onclick="mAsk(document.getElementById('msq').value)">${I('chat')} Tanya Kak Folio</button></div>`;
}
function mGoSlide(i, k) {
  if (lock('materi', i)) {
    toast(lock('materi', i), 'lock');
    sfx('no');
    return;
  }
  R.sl = R.sl || {};
  R.sl[i] = k;
  closeSh();
  if (cur.r == 'materi' && cur.i == i && document.getElementById('slt')) {
    slShow(k, 1);
    return;
  }
  go('materi', i);
}
function mAsk(q) {
  q = String(q || '').trim();
  if (!q) return;
  sheet('ai');
  setTimeout(() => aiSend(q), 60);
}

/* ---------- Asisten AI ---------- */
function aiKB() {
  return (
    M.map(
      (m, i) =>
        `Materi ${i + 1}: ${m.t}. ${m.s}\n` +
        m.p.map((x) => `- ${x[0]}: ${x[1]}`).join('\n') +
        `\nKesalahan umum: ${m.h.join('; ')}\nTips: ${m.tip}`,
    ).join('\n\n') +
    `\n\nLangkah praktik di Canva:\n` +
    PR.map((x, i) => `${i + 1}. ${x.t}: ${x.l.join(' ')}`).join('\n')
  );
}
const AIR =
  () => `Kamu adalah "Kak Folio", asisten belajar di media pembelajaran interaktif "Portofolio Digital Menggunakan Canva" untuk fresh graduate di Indonesia.
Cara menjawab:
- Bahasa Indonesia santai dan ramah, sapa pengguna dengan "kamu". Jangan kaku seperti robot.
- Singkat dan jelas: maksimal sekitar 120 kata. Boleh pakai poin pendek yang diawali "- ".
- Utamakan isi materi di bawah. Kalau cocok, sebutkan materi yang bisa dibaca ulang dengan format "Materi N".
- Kalau pertanyaan di luar portofolio, Canva, atau melamar kerja, jawab singkat lalu ajak kembali ke topik.
- Jangan mengarang fitur atau menu Canva yang tidak kamu yakini. Bilang terus terang kalau tidak yakin.
- Jangan pakai heading atau tabel.
Pengguna sedang membuka: ${aiWhere()}.${S.name ? ' Nama panggilannya: ' + S.name + '.' : ''}

ISI MATERI:
${aiKB()}`;
function aiWhere() {
  if (cur.r == 'materi') return 'Materi ' + (cur.i + 1) + ' (' + M[cur.i].t + ')';
  const n = {
    home: 'Beranda',
    akt: 'daftar aktivitas',
    praktik: 'praktik di Canva',
    evaluasi: 'evaluasi',
    refleksi: 'refleksi',
    rapor: 'rapor',
    konsep: 'peta konsep',
    pre: 'tes awal',
  }[cur.r];
  return n || (/^a\d$/.test(cur.r) ? 'Aktivitas ' + cur.r[1] : 'halaman awal');
}
const AIQ = [
  'Bedanya CV sama portofolio apa?',
  'Fresh graduate belum punya karya, terus gimana?',
  'Berapa karya yang ideal?',
  'Cara bikin tautan Canva yang hanya lihat?',
];
function aiMd(t) {
  let h = esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(
      /\bMateri ([1-8])\b/g,
      (m, n) => `<button class="ailk" onclick="go('materi',${n - 1})">Materi ${n}</button>`,
    );
  const L = h.split('\n');
  let out = '',
    ul = false;
  for (const l of L) {
    const m = l.match(/^\s*[-•*]\s+(.*)/);
    if (m) {
      if (!ul) {
        out += '<ul>';
        ul = true;
      }
      out += `<li>${m[1]}</li>`;
    } else {
      if (ul) {
        out += '</ul>';
        ul = false;
      }
      if (l.trim()) out += `<p>${l}</p>`;
    }
  }
  if (ul) out += '</ul>';
  return out;
}
function aiSheet() {
  const T = R.ai || (R.ai = { t: [], busy: 0 });
  setTimeout(aiScroll, 30);
  return `<div class="aiw"><div class="aim" id="aim">${T.t.length ? T.t.map(aiBub).join('') : `<div class="aihi"><span class="aiav">${I('spark')}</span><div><b>Halo${S.name ? ', ' + esc(S.name) : ''}! Aku Kak Folio.</b><p class="small">Tanya apa aja soal portofolio dan Canva.</p><span class="aimode">${I('book')} Jawaban dari materi FolioKit</span></div></div>`}</div>${T.t.length ? '' : `<div class="aiq">${AIQ.map((q) => `<button class="chip" onclick="aiSend(this.textContent)">${q}</button>`).join('')}</div>`}<form class="aif" onsubmit="event.preventDefault();aiSend(this.q.value)"><input name="q" class="inp" maxlength="400" placeholder="Tulis pertanyaanmu..." autocomplete="off" aria-label="Pertanyaan" ${T.busy ? 'disabled' : ''}><button class="btn aibt" type="${T.busy ? 'button' : 'submit'}" onclick="${T.busy ? 'aiStop()' : ''}" aria-label="${T.busy ? 'Berhenti' : 'Kirim'}">${I(T.busy ? 'stop' : 'send')}</button></form><p class="small aint"></p></div>`;
}
function aiBub(m) {
  return m.role == 'user'
    ? `<div class="aiu">${esc(m.content)}</div>`
    : `<div class="aia"><span class="aiav">${I('spark')}</span><div class="aitx">${aiInner(m)}</div></div>`;
}
function aiInner(m) {
  return (
    (m.err
      ? `<p class="aier">${esc(m.content)}</p>`
      : m.content
        ? aiMd(m.content)
        : '<span class="dots3"><i></i><i></i><i></i></span>') +
    (m.note ? `<p class="ainote">${esc(m.note)}</p>` : '') +
    (m.sug && m.sug.length && !R.ai.busy
      ? `<div class="aisug">${m.sug.map((q) => `<button class="chip" onclick="aiSend(this.textContent)">${esc(q)}</button>`).join('')}</div>`
      : '')
  );
}
function aiScroll() {
  const m = document.getElementById('aim');
  if (m) m.scrollTop = m.scrollHeight;
}
var AICTL = null;
async function aiSend(q) {
  q = String(q || '').trim();
  const T = R.ai || (R.ai = { t: [], busy: 0 });
  if (!q || T.busy) return;
  T.t.push({ role: 'user', content: q });
  const ans = { role: 'assistant', content: '' };
  T.t.push(ans);
  T.busy = 1;
  sheet('ai');
  const upd = () => {
    const b = document.querySelectorAll('#aim .aia .aitx');
    const el = b[b.length - 1];
    if (el) el.innerHTML = aiInner(ans);
    aiScroll();
  };
  const local = async (note) => {
    const f = faqAnswer(q);
    ans.err = 0;
    ans.content = '';
    ans.note = note || '';
    ans.sug = f.sug;
    await new Promise((r) => setTimeout(r, 900)); // titik "lagi ngetik" dulu
    const full = f.t;
    if (RM.matches) {
      ans.content = full;
    } else {
      for (let i = 0; i < full.length; i += 3) {
        ans.content = full.slice(0, i);
        upd();
        await new Promise((r) => setTimeout(r, 16));
      }
      ans.content = full;
    }
  };
  // Kak Folio selalu menjawab dari kumpulan tanya jawab bawaan (fitur AI sudah dihapus)
  await local();
  T.busy = 0;
  if (document.getElementById('aim')) sheet('ai');
}
function aiStop() {
  if (AICTL) AICTL.abort();
}

/* ---------- Sertifikat ---------- */
function certSheet() {
  if (!(S.ev.best >= 70))
    return `<div class="aino">${I('award')}<b>Sertifikat belum terbuka</b><p class="small">Sertifikat bisa diambil setelah nilai evaluasimu minimal 70. ${S.ev.best != null ? 'Nilai terbaikmu sekarang ' + S.ev.best + '.' : 'Kamu belum mengerjakan evaluasi.'}</p>${lock('evaluasi') ? '' : `<button class="btn sm" onclick="go('evaluasi')">${I('flag')} Ke evaluasi</button>`}</div>`;
  setTimeout(certDraw, 40);
  return `<div class="crt"><div class="crtv"><img id="crti" alt="Pratinjau sertifikat"><span class="crtl" id="crtl"><span class="dots3"><i></i><i></i><i></i></span></span></div><div class="crtf"><label class="small" style="font-weight:600">Nama di sertifikat<input class="inp" id="crtn" style="margin-top:6px" maxlength="40" value="${esc(S.cname || S.name || '')}" placeholder="Tulis nama lengkapmu" oninput="S.cname=this.value;save();clearTimeout(window.crtT);window.crtT=setTimeout(certDraw,300)"></label><p class="small">Nilai evaluasi: <b>${S.ev.best}</b>${S.pre.sc != null ? ` · naik ${S.ev.best - S.pre.sc} poin dari tes awal` : ''}</p><button class="btn" onclick="loadBtn(this,certSave,'Menyiapkan...')">${I('dl')} Unduh sertifikat (PNG)</button><p class="small" id="crth">Nggak keunduh? Tekan lama gambarnya, lalu simpan.</p></div></div>`;
}
function certDraw() {
  const W = 1600,
    H = 1131,
    c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const x = c.getContext('2d');
  const nm = (S.cname || S.name || 'Peserta').trim() || 'Peserta';
  const go2 = () => {
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#f4f9ff');
    g.addColorStop(1, '#eef2ff');
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);
    const b = x.createLinearGradient(0, 0, W, 0);
    b.addColorStop(0, '#1e4fb0');
    b.addColorStop(0.5, '#3b82f6');
    b.addColorStop(1, '#7c3aed');
    x.fillStyle = b;
    x.fillRect(0, 0, W, 22);
    x.fillRect(0, H - 22, W, 22);
    x.strokeStyle = '#c7d7f5';
    x.lineWidth = 3;
    x.strokeRect(60, 60, W - 120, H - 120);
    x.strokeStyle = '#e0e9fb';
    x.lineWidth = 1.5;
    x.strokeRect(78, 78, W - 156, H - 156);
    x.globalAlpha = 0.08;
    x.fillStyle = '#7c3aed';
    x.beginPath();
    x.arc(W - 140, 190, 240, 0, 7);
    x.fill();
    x.fillStyle = '#3b82f6';
    x.beginPath();
    x.arc(150, H - 150, 260, 0, 7);
    x.fill();
    x.globalAlpha = 1;
    x.textAlign = 'center';
    x.fillStyle = '#7c3aed';
    x.font = '600 26px Poppins, sans-serif';
    x.fillText('SERTIFIKAT PENYELESAIAN', W / 2, 215);
    x.fillStyle = '#123a8f';
    x.font = '700 64px Poppins, sans-serif';
    x.fillText('Portofolio Digital dengan Canva', W / 2, 300);
    x.fillStyle = '#53638a';
    x.font = '400 28px Inter, sans-serif';
    x.fillText('Diberikan kepada', W / 2, 400);
    let fs = 86;
    x.font = `700 ${fs}px Poppins, sans-serif`;
    while (x.measureText(nm).width > W - 360 && fs > 40) {
      fs -= 4;
      x.font = `700 ${fs}px Poppins, sans-serif`;
    }
    const ng = x.createLinearGradient(W / 2 - 400, 0, W / 2 + 400, 0);
    ng.addColorStop(0, '#1e4fb0');
    ng.addColorStop(1, '#7c3aed');
    x.fillStyle = ng;
    x.fillText(nm, W / 2, 510);
    x.strokeStyle = '#fbbf24';
    x.lineWidth = 5;
    x.lineCap = 'round';
    x.beginPath();
    x.moveTo(W / 2 - 140, 550);
    x.lineTo(W / 2 + 140, 550);
    x.stroke();
    x.fillStyle = '#0f2b66';
    x.font = '400 28px Inter, sans-serif';
    x.fillText('telah menyelesaikan seluruh rangkaian belajar: 8 materi, 7 aktivitas,', W / 2, 625);
    x.fillText('praktik membuat portofolio di Canva, evaluasi, dan refleksi.', W / 2, 668);
    const box = (cx, lbl, val) => {
      x.fillStyle = '#fff';
      x.strokeStyle = '#d6e4f7';
      x.lineWidth = 2;
      const w = 262,
        h = 104,
        l = cx - w / 2,
        t = 712;
      x.beginPath();
      x.roundRect ? x.roundRect(l, t, w, h, 18) : x.rect(l, t, w, h);
      x.fill();
      x.stroke();
      x.fillStyle = '#123a8f';
      x.font = '700 40px Poppins, sans-serif';
      x.fillText(val, cx, t + 56);
      x.fillStyle = '#53638a';
      x.font = '500 20px Inter, sans-serif';
      x.fillText(lbl, cx, t + 86);
    };
    const pre = S.pre.sc;
    const items = [['Nilai evaluasi', String(S.ev.best)]];
    if (pre != null) items.push(['Kenaikan dari tes awal', (S.ev.best - pre >= 0 ? '+' : '') + (S.ev.best - pre)]);
    items.push(['Lencana', bdN() + '/' + BD.length]);
    const gap = 290,
      st = W / 2 - (gap * (items.length - 1)) / 2;
    items.forEach((it, k) => box(st + k * gap, it[0], it[1]));
    const dt = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    x.fillStyle = '#53638a';
    x.font = '400 22px Inter, sans-serif';
    x.fillText('Jakarta, ' + dt, W / 2, 878);
    const sig = [
      [W / 2 - 430, 'Arman Fadhilah', 'Project Manager'],
      [W / 2, 'Bhimo Chrisandy', 'Desainer Instruksional'],
      [W / 2 + 430, 'Rafli Putra Ardi', 'Desainer Instruksional'],
    ];
    sig.forEach(([cx, n, r]) => {
      x.strokeStyle = '#bcd6f6';
      x.lineWidth = 2;
      x.beginPath();
      x.moveTo(cx - 150, 945);
      x.lineTo(cx + 150, 945);
      x.stroke();
      x.fillStyle = '#123a8f';
      x.font = '600 24px Poppins, sans-serif';
      x.fillText(n, cx, 978);
      x.fillStyle = '#53638a';
      x.font = '400 18px Inter, sans-serif';
      x.fillText(r, cx, 1005);
    });
    x.fillStyle = '#93a3c3';
    x.font = '400 16px Inter, sans-serif';
    x.fillText(
      'Sertifikat media pembelajaran · Pengembangan Multimedia Pembelajaran · Teknologi Pendidikan A',
      W / 2,
      1036,
    );
    CERT = c;
    const im = document.getElementById('crti'),
      l = document.getElementById('crtl');
    if (im) {
      im.src = c.toDataURL('image/png');
      im.onload = () => {
        if (l) l.remove();
      };
    }
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go2, go2);
}
var CERT = null;
function certSave() {
  if (!CERT) {
    certDraw();
    toast('Sertifikat masih disiapkan, coba lagi sebentar.', 'info');
    return;
  }
  const fn =
    'Sertifikat Portofolio Digital - ' +
    ((S.cname || S.name || 'Peserta')
      .trim()
      .replace(/[\\/:*?"<>|]/g, '')
      .slice(0, 40) || 'Peserta') +
    '.png';
  CERT.toBlob(async (bl) => {
    if (!bl) {
      toast('Gambarnya belum jadi, coba sekali lagi ya.', 'x');
      return;
    }
    if (DLS) {
      try {
        await DLS.save({ filename: fn, data: bl });
        toast('Sertifikat tersimpan.', 'chk');
      } catch (e) {
        const c = e && e.code;
        if (c == 'declined') toast('Unduhan dibatalkan.', 'info');
        else if (c == 'rate_limited') toast('Tunggu sebentar, lalu coba lagi.', 'info');
        else {
          certFallback(bl, fn);
        }
      }
    } else certFallback(bl, fn);
  }, 'image/png');
}
function certFallback(bl, fn) {
  try {
    const u = URL.createObjectURL(bl),
      a = document.createElement('a');
    a.href = u;
    a.download = fn;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 4000);
    const h = document.getElementById('crth');
    if (h)
      h.innerHTML =
        '<b>Kalau unduhan tidak muncul</b>, tekan lama atau klik kanan gambar sertifikatnya, lalu pilih simpan gambar.';
  } catch (e) {
    toast('Browser ini nggak bisa unduh otomatis. Simpan gambarnya manual aja ya.', 'info');
  }
}

/* ---------- Gaya template Canva ---------- */
const TPL = [
  {
    n: 'Minimalis',
    q: 'portfolio minimalist',
    d: 'Bersih, banyak ruang kosong, fokus ke karya.',
    c: 'Desainer grafis, UI/UX, fotografer, atau siapa pun yang mau karyanya paling menonjol.',
    pal: ['#111827', '#F3F4F6', '#2563EB'],
    f: 'Poppins + Inter',
    tip: 'Pakai satu warna aksen aja buat judul dan tombol.',
  },
  {
    n: 'Kreatif',
    q: 'portfolio creative colorful',
    d: 'Warna berani dan bentuk dinamis, tapi tetap rapi.',
    c: 'Bidang kreatif: ilustrator, konten kreator, social media, desain kemasan.',
    pal: ['#7C3AED', '#F59E0B', '#FDF2F8'],
    f: 'Montserrat + Open Sans',
    tip: 'Batasi dua warna utama biar nggak ramai.',
  },
  {
    n: 'Profesional',
    q: 'portfolio professional resume',
    d: 'Formal dan terstruktur, gampang dipindai perekrut.',
    c: 'Administrasi, pendidikan, keuangan, marketing, atau perusahaan yang formal.',
    pal: ['#1E3A8A', '#FFFFFF', '#64748B'],
    f: 'Lato + Lato',
    tip: 'Taruh ringkasan pencapaian dalam angka di halaman profil.',
  },
];
function tplPrev(k) {
  const t = TPL[k],
    [a, b, c] = t.pal;
  if (k == 0)
    return `<div class="tpv" style="background:${b}"><i style="left:8%;top:12%;width:30%;height:8%;background:${a};border-radius:3px"></i><i style="left:8%;top:24%;width:20%;height:4%;background:#cbd5e1;border-radius:2px"></i><i style="left:8%;top:40%;width:26%;height:44%;background:#e5e7eb;border-radius:4px"></i><i style="left:37%;top:40%;width:26%;height:44%;background:#e5e7eb;border-radius:4px"></i><i style="left:66%;top:40%;width:26%;height:44%;background:#e5e7eb;border-radius:4px"></i><i style="left:84%;top:12%;width:8%;height:8%;background:${c};border-radius:50%"></i></div>`;
  if (k == 1)
    return `<div class="tpv" style="background:${c}"><i style="left:-10%;top:-20%;width:55%;height:80%;background:${a};border-radius:50%"></i><i style="right:-8%;bottom:-25%;width:45%;height:70%;background:${b};border-radius:50%;opacity:.9"></i><i style="left:8%;top:18%;width:32%;height:9%;background:#fff;border-radius:4px"></i><i style="left:8%;top:31%;width:22%;height:5%;background:#fde68a;border-radius:3px"></i><i style="left:52%;top:20%;width:38%;height:30%;background:#fff;border-radius:8px;transform:rotate(4deg)"></i><i style="left:46%;top:56%;width:30%;height:28%;background:#fff;border-radius:8px;transform:rotate(-5deg)"></i></div>`;
  return `<div class="tpv" style="background:${b}"><i style="left:0;top:0;width:30%;height:100%;background:${a}"></i><i style="left:7%;top:12%;width:16%;height:22%;background:#93c5fd;border-radius:50%"></i><i style="left:6%;top:42%;width:18%;height:4%;background:#fff;border-radius:2px;opacity:.8"></i><i style="left:6%;top:50%;width:14%;height:3%;background:#fff;border-radius:2px;opacity:.5"></i><i style="left:36%;top:12%;width:40%;height:8%;background:${a};border-radius:3px"></i><i style="left:36%;top:26%;width:56%;height:3%;background:${c};opacity:.5;border-radius:2px"></i><i style="left:36%;top:32%;width:50%;height:3%;background:${c};opacity:.5;border-radius:2px"></i><i style="left:36%;top:44%;width:26%;height:40%;background:#e2e8f0;border-radius:4px"></i><i style="left:65%;top:44%;width:27%;height:40%;background:#e2e8f0;border-radius:4px"></i></div>`;
}
function tplSheet() {
  return `<p class="small" style="margin-bottom:12px">Pilih gaya yang cocok sama posisi yang kamu lamar.</p><div class="tpg">${TPL.map((t, k) => `<div class="tpc" style="--k:${k}">${tplPrev(k)}<div class="tpb"><b class="pp">${t.n}</b><p class="small">${t.d}</p><p class="tpk"><b>Cocok buat:</b> ${t.c}</p><div class="tpp">${t.pal.map((c) => `<span title="${c}" style="background:${c}"></span>`).join('')}<small>${t.f}</small></div><p class="tpk">${I('bulb')} ${t.tip}</p><a class="btn sm" href="https://www.canva.com/templates/?query=${encodeURIComponent(t.q)}" target="_blank" rel="noopener">${I('ext')} Cari gaya ${t.n} di Canva</a></div></div>`).join('')}</div>`;
}

/* ---------- profil ---------- */
function accSheet() {
  const nm = S.name || '';
  return `<div class="accw"><span class="avl" id="accA">${esc((nm || '?')[0].toUpperCase())}</span><div style="flex:1;min-width:0"><b id="accN">${esc(nm || 'Tanpa nama')}</b><span class="small">Progres belajar ${pct()}%</span><span class="accb"><i style="width:${pct()}%"></i></span></div></div>
<div class="accs">${[
    ['Materi', mN() + '/8'],
    ['Aktivitas', aN() + '/7'],
    ['Lencana', bdN() + '/' + BD.length],
    ['Evaluasi', S.ev.best ?? '-'],
  ]
    .map((x) => `<div><b>${x[1]}</b><small>${x[0]}</small></div>`)
    .join('')}</div>
<form class="accf" onsubmit="event.preventDefault();accSave()"><label class="small" style="font-weight:600" for="accI">Nama panggilan</label><div class="accr"><input class="inp" id="accI" maxlength="24" value="${esc(nm)}" placeholder="Tulis nama panggilanmu" autocomplete="given-name" oninput="accLive(this.value)"><button class="btn" id="accS" type="submit" disabled>${I('chk')} Simpan</button></div><p class="small" id="accH"></p></form>
<div class="bak"><b>Cadangan progres</b><p class="small">Simpan progresmu ke file, lalu buka di HP atau laptop lain.</p><div class="row"><button class="btn sm g" type="button" onclick="bakSave()">${I('dl')} Simpan cadangan</button><button class="btn sm g" type="button" onclick="document.getElementById('bakF').click()">${I('rst')} Pulihkan</button><input type="file" id="bakF" accept=".json,application/json" hidden onchange="bakLoad(this)"></div><p class="small" id="bakH"></p></div>`;
}
/* ---------- cadangan progres (file .json) ---------- */
function bakSave() {
  const data = JSON.stringify({ app: 'portofolio-canva', v: 1, t: new Date().toISOString(), s: S }, null, 1);
  const bl = new Blob([data], { type: 'application/json' });
  const fn = 'Progres Portofolio Canva - ' + ((S.name || 'saya').replace(/[\\/:*?"<>|]/g, '').slice(0, 30) || 'saya') + '.json';
  const h = document.getElementById('bakH');
  const ok = () => {
    if (h) h.innerHTML = I('chk') + ' Cadangan tersimpan.';
  };
  const fb = () => {
    try {
      const u = URL.createObjectURL(bl),
        a = document.createElement('a');
      a.href = u;
      a.download = fn;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 4000);
      ok();
    } catch (e) {
      toast('Di sini belum bisa unduh langsung.', 'info');
    }
  };
  if (DLS)
    DLS.save({ filename: fn, data: bl }).then(ok, (e) => {
      const c = e && e.code;
      if (c == 'declined') toast('Unduhan dibatalkan.', 'info');
      else if (c == 'rate_limited') toast('Tunggu sebentar, lalu coba lagi.', 'info');
      else fb();
    });
  else fb();
}
function bakLoad(inp) {
  const f = inp.files && inp.files[0];
  inp.value = '';
  if (!f) return;
  const h = document.getElementById('bakH');
  const bad = (m) => {
    if (h) h.innerHTML = I('warn') + ' ' + m;
    sfx('no');
  };
  if (f.size > 500000) return bad('File terlalu besar, sepertinya bukan file cadangan.');
  f.text().then(
    (txt) => {
      let o;
      try {
        o = JSON.parse(txt);
      } catch (e) {
        return bad('File tidak bisa dibaca. Pilih file cadangan .json dari course ini.');
      }
      if (!o || o.app != 'portofolio-canva' || !o.s || typeof o.s != 'object') return bad('Ini bukan file cadangan dari course ini.');
      const d = def(),
        n = {};
      Object.keys(d).forEach((k) => {
        if (k in o.s && (typeof o.s[k] == typeof d[k] || d[k] === null || o.s[k] === null)) n[k] = o.s[k];
      });
      const keep = { prev: S.prev };
      S = Object.assign(def(), n, keep);
      S.rf = Object.assign(def().rf, n.rf || {});
      S.ev = Object.assign(def().ev, n.ev || {});
      S.pre = Object.assign(def().pre, n.pre || {});
      S.tour = n.tour || {};
      save();
      hdr();
      sfx('ok');
      toast('Progres dipulihkan.', 'chk');
      closeSh();
      go('home', 0, 'b');
    },
    () => bad('File tidak bisa dibaca.')
  );
}
function accLive(v) {
  const t = v.trim(),
    a = document.getElementById('accA'),
    n = document.getElementById('accN'),
    b = document.getElementById('accS'),
    h = document.getElementById('accH');
  if (a) a.textContent = (t || '?')[0].toUpperCase();
  if (n) n.textContent = t || 'Tanpa nama';
  if (b) b.disabled = t === (S.name || '');
  if (h) {
    h.className = 'small';
    h.textContent = t === (S.name || '') ? '' : 'Belum disimpan.';
  }
}
function accSave() {
  const i = document.getElementById('accI');
  if (!i) return;
  const t = i.value.trim().slice(0, 24),
    old = S.name || '';
  if (t === old) return;
  S.name = t;
  if (!S.cname || S.cname === old) S.cname = t;
  save();
  hdr();
  sfx('ok');
  const hh = document.querySelector('.hello h2');
  if (hh && cur.r == 'home') {
    hh.removeAttribute('data-type');
    hh.textContent = salam() + (t ? ', ' + t : '') + '.';
  }
  const b = document.getElementById('accS'),
    h = document.getElementById('accH'),
    a = document.getElementById('accA');
  if (b) {
    b.disabled = true;
  }
  if (h) {
    h.className = 'small accok';
    h.innerHTML = I('chk') + ' Nama tersimpan.';
  }
  if (a) {
    a.classList.remove('accp');
    void a.offsetWidth;
    a.classList.add('accp');
  }
  toast(t ? `Oke, sekarang kamu dipanggil ${t}.` : 'Nama dikosongkan.', 'chk');
}

/* ===== cek cepat ===== */
const CQ = [
  [
    'Apa bedanya CV dan portofolio?',
    [
      'CV berisi bukti karya, portofolio cuma daftar',
      'CV menyebut kemampuan, portofolio menunjukkan buktinya',
      'Keduanya sama persis',
    ],
    1,
  ],
  ['Bagian mana yang paling banyak dilihat perekrut?', ['Profil diri', 'Proyek atau karya', 'Kontak'], 1],
  [
    'Berapa jumlah karya yang disarankan?',
    ['Satu karya saja', 'Tiga sampai enam karya terbaik', 'Semua karya yang pernah dibuat'],
    1,
  ],
  ['Di Canva, karyamu sendiri dimasukkan lewat menu...', ['Elemen', 'Unggahan', 'Teks'], 1],
  ['Berapa jenis huruf maksimal yang disarankan?', ['Dua', 'Empat', 'Bebas, makin banyak makin bagus'], 0],
  [
    'Keterangan karya yang baik berisi...',
    ['Masalah, peran, dan hasil', 'Tanggal dan ukuran file', 'Nama aplikasinya saja'],
    0,
  ],
  ['Akses tautan Canva yang tepat untuk perekrut adalah...', ['Bisa edit', 'Hanya lihat', 'Bisa komentar'], 1],
  [
    'Saat memperbaiki portofolio, mana yang didahulukan?',
    ['Detail kecil seperti ikon', 'Kesalahan informasi', 'Ganti warna latar'],
    1,
  ],
];
function cqH(i) {
  const q = CQ[i],
    d = S.cq[i];
  return `<div class="cqw"><p class="q" style="font-size:15px">${q[0]}</p><div class="opts">${q[1].map((o, j) => `<button class="op ${d && j == q[2] ? 'ok' : ''}" ${d ? 'disabled' : ''} onclick="cq(${i},${j},this)"><span class="l">${'ABC'[j]}</span><span>${o}</span></button>`).join('')}</div><div class="cqf">${d ? `<div class="fb ok">${I('chk')}<span>Benar. Kamu sudah paham bagian ini.</span></div>` : ''}</div></div>`;
}
function cq(i, j, b) {
  const q = CQ[i],
    f = b.closest('.cqw').querySelector('.cqf');
  if (j == q[2]) {
    b.parentNode.querySelectorAll('.op').forEach((x) => (x.disabled = true));
    b.classList.add('ok');
    S.cq[i] = 1;
    save();
    sfx('ok');
    f.innerHTML = `<div class="fb ok">${I('chk')}<span>Benar. Kamu sudah paham bagian ini.</span></div>`;
  } else {
    b.classList.add('no');
    b.disabled = true;
    sfx('no');
    f.innerHTML = `<div class="fb no">${I('x')}<span>Belum tepat. Coba buka lagi bagian isi materi di atas, lalu pilih jawaban lain.</span></div>`;
  }
}

/* ===== lencana ===== */
const BD = [
  ['mulai', 'Langkah pertama', 'Selesai materi 1', 'flag', () => S.md[0]],
  ['buku', 'Kutu buku', 'Selesai 8 materi', 'book', () => mN() == 8],
  ['teliti', 'Teliti', 'Semua cek cepat benar', 'target', () => CQ.every((_, i) => S.cq[i])],
  ['akt', 'Pemecah soal', 'Selesai 7 aktivitas', 'task', () => aN() == 7],
  ['sim', 'Perancang', 'Simulasi lolos semua cek', 'spark', () => S.simOk],
  ['desainer', 'Desainer', 'Selesai praktik di Canva', 'lap', () => prN() == 4],
  ['juara', 'Juara', 'Nilai evaluasi 85+', 'star', () => S.ev.best >= 85],
  ['refleksi', 'Kenal diri', 'Mengisi refleksi', 'ref', () => S.rf.done],
];
const bdN = () => BD.filter((b) => S.bd && S.bd[b[0]]).length;
const bdGrid = () =>
  `<div class="bdg2">${BD.map((b) => {
    const on = S.bd && S.bd[b[0]];
    return `<div class="bd ${on ? '' : 'off'}"><span class="md">${I(on ? b[3] : 'lock')}</span><b>${b[1]}</b>${b[2]}</div>`;
  }).join('')}</div>`;
let bdQ = [],
  bdBusy = false;
function badgeChk() {
  if (!S.bd) S.bd = {};
  BD.forEach((b) => {
    if (!S.bd[b[0]] && b[4]()) {
      S.bd[b[0]] = 1;
      bdQ.push(b);
    }
  });
  if (bdQ.length && !bdBusy) bdShow();
}
function bdShow() {
  const b = bdQ.shift();
  if (!b) {
    bdBusy = false;
    return;
  }
  bdBusy = true;
  const el = document.getElementById('bdp');
  el.innerHTML = `<span class="md">${I(b[3])}</span><div><small>Lencana baru</small><b>${b[1]}</b></div>`;
  setTimeout(() => {
    el.classList.add('on');
    sfx('up');
  }, 300);
  setTimeout(() => {
    el.classList.remove('on');
    setTimeout(bdShow, 450);
  }, 2900);
}

/* ===== simulasi portofolio ===== */
const SIMC = ['#1e4fb0', '#0f766e', '#7c3aed', '#be123c'],
  SIMK = [
    ['Poster acara kampus', 1],
    ['Logo UMKM', 1],
    ['Feed Instagram organisasi', 1],
    ['Foto liburan', 0],
  ];
const simD = () => S.sim || (S.sim = { nm: S.name || '', pos: 'Desainer Grafis', c: 0, f: 0, l: 0, k: [0, 1] });
function pmSeg() {
  const m = R.pm || 'steps';
  return `<div class="seg2" role="tablist"><button role="tab" aria-selected="${m == 'steps'}" class="${m == 'steps' ? 'on' : ''}" onclick="R.pm='steps';go('praktik',0,'b')">${I('task')} Langkah di Canva</button><button role="tab" aria-selected="${m == 'sim'}" class="${m == 'sim' ? 'on' : ''}" onclick="R.pm='sim';go('praktik',0,'f')">${I('spark')} Coba simulasi</button></div>`;
}
function simH() {
  const d = simD();
  return `<div class="sim"><div class="simc">
<label>Nama<input class="inp" maxlength="28" value="${esc(d.nm)}" oninput="simD().nm=this.value;save();simU()"></label>
<label>Posisi yang dilamar<input class="inp" maxlength="34" value="${esc(d.pos)}" oninput="simD().pos=this.value;save();simU()"></label>
<span class="lb">Warna utama</span><div class="sw">${SIMC.map((c, j) => `<button style="--c:${c}" class="${d.c == j ? 'on' : ''}" aria-label="Warna ${j + 1}" onclick="simD().c=${j};save();only(this,'button');simU()"></button>`).join('')}</div>
<span class="lb">Gaya huruf</span><div class="chips">${['Modern', 'Klasik'].map((x, j) => `<button class="chip ${d.f == j ? 'on' : ''}" onclick="simD().f=${j};save();only(this,'.chip');simU()">${x}</button>`).join('')}</div>
<span class="lb">Tata letak</span><div class="chips">${['Kolom samping', 'Pita atas'].map((x, j) => `<button class="chip ${d.l == j ? 'on' : ''}" onclick="simD().l=${j};save();only(this,'.chip');simU()">${x}</button>`).join('')}</div>
<span class="lb">Karya yang ditampilkan</span><div class="chips">${SIMK.map((k, j) => `<button class="chip ${d.k.includes(j) ? 'on' : ''}" onclick="simK(${j},this)">${k[0]}</button>`).join('')}</div>
</div><div><div id="simv"></div><ul class="ckl" id="simf"></ul></div></div>`;
}
function simK(j, b) {
  const d = simD(),
    i = d.k.indexOf(j);
  if (i < 0) d.k.push(j);
  else d.k.splice(i, 1);
  d.k.sort();
  b.classList.toggle('on', i < 0);
  save();
  simU();
}
function simU() {
  const v = document.getElementById('simv'),
    f = document.getElementById('simf');
  if (!v) return;
  const d = simD(),
    ff = d.f ? "Georgia,'Times New Roman',serif" : 'Poppins,sans-serif',
    ks = d.k.map((i) => SIMK[i]);
  v.innerHTML = `<div class="pvw l${d.l}" style="--tc:${SIMC[d.c]};font-family:${ff}"><div class="pvh"><span class="pva">${esc((d.nm || '?').trim()[0] || '?').toUpperCase()}</span><div><b>${esc(d.nm || 'Namamu')}</b><small>${esc(d.pos || 'Posisi yang kamu lamar')}</small></div></div><div class="pvb"><span class="pvt">Karya pilihan</span><div class="pvk">${ks.map((k) => `<div class="${k[1] ? '' : 'bad'}"><i></i><span>${k[0]}</span></div>`).join('') || '<span class="small">Belum ada karya dipilih.</span>'}</div><div class="pvc">email@contoh.com · linkedin.com/in/namamu</div></div></div>`;
  const good = ks.filter((k) => k[1]).length,
    bad = ks.some((k) => !k[1]);
  const C = [
    [!!d.nm.trim(), 'Nama sudah diisi', 'Isi namamu dulu'],
    [!!d.pos.trim(), 'Posisi yang dilamar jelas', 'Tulis posisi yang kamu lamar'],
    [good >= 2, 'Minimal dua karya yang relevan', 'Pilih minimal dua karya yang relevan'],
    [!bad, 'Semua karya nyambung dengan posisi', 'Foto liburan tidak nyambung dengan posisi kerja. Hapus saja.'],
  ];
  f.innerHTML =
    C.map((c) => `<li class="${c[0] ? 'y' : 'n'}"><span>${c[0] ? '✓' : '!'}</span>${c[0] ? c[1] : c[2]}</li>`).join(
      '',
    ) +
    (C.every((c) => c[0])
      ? `<li class="y"><span>★</span><b>Mantap, susunan ini siap kamu buat di Canva.</b></li>`
      : '');
  const ok = C.every((c) => c[0]) ? 1 : 0;
  if (ok && !S.simOk) {
    S.simOk = 1;
    save();
    conf();
  } else if (ok != S.simOk && !ok) {
    S.simOk = S.simOk;
  }
}

/* ===== Efek teks mengetik ===== */
function typeIt(el) {
  const full = el.textContent;
  el.dataset.typed = 1;
  if (RM.matches || !full) return;
  el.setAttribute('aria-label', full);
  el.textContent = '';
  el.classList.add('typing');
  let i = 0;
  const step = () => {
    if (!el.isConnected) return;
    el.textContent = full.slice(0, ++i);
    if (i < full.length) setTimeout(step, 34 + Math.random() * 38);
    else setTimeout(() => el.classList.remove('typing'), 1400);
  };
  setTimeout(step, 250);
}
new MutationObserver(() => document.querySelectorAll('[data-type]:not([data-typed])').forEach(typeIt)).observe(
  document.getElementById('view'),
  { childList: true, subtree: true },
);

/* ===== Efek transisi antarlayar ===== */
const AD = [
  'Pilih satu jawaban yang paling pas soal fungsi portofolio.',
  'Susun lima bagian portofolio dari awal sampai akhir.',
  'Kamu pelamar desainer. Singkirkan dua berkas yang tidak nyambung.',
  'Bandingkan dua desain, pilih yang lebih enak dibaca.',
  'Pasangkan lima istilah dengan pengertiannya.',
  'Lima pernyataan. Tebak benar atau salah.',
  'Urutkan enam langkah membuat portofolio.',
];
function skyH() {
  const d = new Date(),
    h = d.getHours(),
    t = h < 5 ? 3 : h < 11 ? 0 : h < 15 ? 1 : h < 18 ? 2 : 3,
    L = ['Pagi', 'Siang', 'Sore', 'Malam'][t],
    ic = ['🌤', '☀️', '🌇', '🌙'][t];
  const P = [
    ['#ffd8a8', '#ffe8cc', '#a5d8ff'],
    ['#4dabf7', '#a5d8ff', '#e7f5ff'],
    ['#5f3dc4', '#f783ac', '#ffc078'],
    ['#0b1437', '#1c2a6b', '#3b4f9a'],
  ][t];
  const night = t == 3,
    stars = night
      ? [
          [8, 14],
          [18, 30],
          [30, 10],
          [40, 24],
          [52, 8],
          [60, 34],
          [72, 16],
          [84, 28],
          [92, 8],
          [24, 46],
          [66, 48],
          [46, 42],
        ]
          .map(
            (p, k) =>
              `<circle class="sk-st" cx="${p[0] * 1.6}" cy="${10 + p[1] * 1.3}" r="${k % 3 ? 0.9 : 1.4}" style="animation-delay:${(k * 0.37).toFixed(2)}s"/>`,
          )
          .join('')
      : '';
  const orb = night
    ? `<g class="sk-moon"><circle cx="112" cy="42" r="24" fill="url(#skGlow)"/><mask id="skMk"><rect x="90" y="20" width="44" height="44" fill="#fff"/><circle cx="118" cy="37" r="10" fill="#000"/></mask><circle cx="112" cy="42" r="11" fill="#f8fafc" mask="url(#skMk)"/><circle cx="105" cy="44" r="1.6" fill="#e2e8f0"/><circle cx="107" cy="49" r="1" fill="#e2e8f0"/></g>`
    : `<g class="sk-sun" style="--sy:${t == 2 ? 74 : t == 0 ? 56 : 40}px"><circle cx="112" cy="0" r="30" fill="url(#skGlow)"/><g class="sk-ray">${[...Array(12)].map((_, k) => `<rect x="111" y="-24" width="2" height="7" rx="1" fill="#fff3bf" opacity=".8" transform="rotate(${k * 30} 112 0)"/>`).join('')}</g><circle cx="112" cy="0" r="12" fill="${t == 2 ? '#ff922b' : '#ffd43b'}"/><circle cx="108" cy="-4" r="5" fill="#fff" opacity=".35"/></g>`;
  const cloud = (x, y, sc, o, dl) =>
    `<g class="sk-cl" style="animation-delay:${dl}s;opacity:${o}"><g transform="translate(${x} ${y}) scale(${sc})"><ellipse cx="0" cy="6" rx="16" ry="6" fill="#fff"/><circle cx="-6" cy="2" r="7" fill="#fff"/><circle cx="4" cy="0" r="9" fill="#fff"/></g></g>`;
  const clouds = night
    ? cloud(30, 50, 0.9, 0.12, -8) + cloud(120, 70, 0.7, 0.1, -20)
    : cloud(24, 40, 1, 0.95, -4) + cloud(96, 62, 0.8, 0.8, -16) + cloud(56, 78, 0.6, 0.7, -27);
  const birds =
    t < 2
      ? `<g class="sk-bd"><path class="sk-w" d="M0 0q4-4 8 0q4-4 8 0" fill="none" stroke="#1e3a8a" stroke-width="1.4" stroke-linecap="round"/><path class="sk-w" d="M22 8q3-3 6 0q3-3 6 0" fill="none" stroke="#1e3a8a" stroke-width="1.2" stroke-linecap="round" style="animation-delay:.2s"/></g>`
      : '';
  const shoot = night
    ? `<path class="sk-sh" d="M20 22 l26 10" stroke="url(#skSh)" stroke-width="1.6" stroke-linecap="round"/>`
    : '';
  const bld = [
    [-30, 112, 16],
    [-14, 104, 14],
    [0, 114, 14],
    [13, 100, 11],
    [23, 110, 16],
    [38, 116, 12],
    [49, 102, 14],
    [62, 111, 15],
    [76, 106, 11],
    [86, 115, 15],
    [100, 99, 13],
    [112, 109, 12],
    [123, 104, 15],
    [137, 113, 14],
    [150, 107, 13],
    [162, 115, 16],
    [177, 103, 14],
  ];
  const city = bld
    .map(([x, y, w], k) => {
      let win = '';
      for (let yy = y + 4; yy < 143; yy += 6)
        for (let xx = x + 3; xx < x + w - 3; xx += 5) {
          const r = (xx * 7 + yy * 13 + k) % 5;
          if (night ? r < 2 : r < 1)
            win += `<rect class="${night ? 'sk-wn' : ''}" x="${xx}" y="${yy}" width="2.2" height="3" rx=".5" fill="${night ? '#ffe066' : 'rgba(255,255,255,.55)'}" style="animation-delay:${((xx + yy) % 9) * 0.4}s"/>`;
        }
      return `<rect x="${x}" y="${y}" width="${w - 1}" height="${150 - y}" rx="1.5" fill="${night ? (k % 2 ? '#121a3f' : '#18224d') : t == 2 ? (k % 2 ? '#5b3a8c' : '#6c44a3') : k % 2 ? '#5c7cfa' : '#748ffc'}" opacity="${night ? 1 : 0.92}"/><rect x="${x}" y="${y}" width="${Math.max(2, (w - 1) * 0.32)}" height="${150 - y}" fill="#fff" opacity="${night ? 0.03 : 0.12}"/>${win}`;
    })
    .join('');
  return `<div class="sky t${t}"><svg class="sk" viewBox="0 0 160 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="skBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset=".6" stop-color="${P[1]}"/><stop offset="1" stop-color="${P[2]}"/></linearGradient><radialGradient id="skGlow"><stop offset="0" stop-color="${night ? '#e0e7ff' : '#fff9db'}" stop-opacity=".9"/><stop offset="1" stop-color="${night ? '#e0e7ff' : '#fff9db'}" stop-opacity="0"/></radialGradient><linearGradient id="skSh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
<rect x="-100" y="-100" width="360" height="260" fill="url(#skBg)"/>${stars}${shoot}${orb}${clouds}${birds}
<path d="M-60 122 Q20 104 80 116 T220 110 V150 H-60Z" fill="${night ? '#1e2a5e' : t == 2 ? '#9c36b5' : '#91a7ff'}" opacity=".7"/>${city}<rect x="-60" y="144" width="300" height="6" fill="${night ? '#0b1029' : '#364fc7'}" opacity=".6"/></svg><span class="lbl"><i>${ic}</i>${L}<b class="sk-tm">${String(h).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</b></span></div>`;
}
function morph(b, cb) {
  if (RM.matches || !b) {
    cb();
    return;
  }
  b.style.width = b.offsetWidth + 'px';
  b.style.height = b.offsetHeight + 'px';
  void b.offsetWidth;
  b.classList.add('mph');
  b.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>';
  const s = Math.max(44, Math.min(52, b.offsetHeight));
  b.style.width = s + 'px';
  b.style.height = s + 'px';
  b.disabled = true;
  sfx('ok');
  setTimeout(cb, 750);
}
function mDone(b, i) {
  if (S.md[i]) return doneM(i);
  morph(b, () => doneM(i));
}
/* cahaya mendekat mengikuti kursor */
let pxF = 0,
  pxE = null;
document.addEventListener(
  'pointermove',
  (e) => {
    if (!HOV.matches || RM.matches || document.documentElement.classList.contains('lite')) return; // perangkat lemah: lewati
    pxE = e;
    if (pxF) return;
    pxF = requestAnimationFrame(() => {
      pxF = 0;
      const ev = pxE;
      // baca semua posisi dulu, baru tulis semua gaya (kalau diselang-seling, browser menghitung ulang tata letak berkali-kali)
      const els = [...document.querySelectorAll('.at,.stg,.bd,.kc,.op,.flip .ff')],
        rs = els.map((el) => el.getBoundingClientRect());
      els.forEach((el, k) => {
        const r = rs[k];
        if (!r.width) return;
        const dx = Math.max(r.left - ev.clientX, 0, ev.clientX - r.right),
          dy = Math.max(r.top - ev.clientY, 0, ev.clientY - r.bottom),
          po = Math.max(0, 1 - Math.hypot(dx, dy) / 160);
        // elemen yang jauh dari kursor dan memang sudah redup tidak perlu ditulis ulang
        if (po == 0 && el._po === 0) return;
        el._po = po;
        el.classList.add('prox');
        el.style.setProperty('--px', ev.clientX - r.left + 'px');
        el.style.setProperty('--py', ev.clientY - r.top + 'px');
        el.style.setProperty('--po', po.toFixed(2));
      });
    });
  },
  { passive: true },
);
/* judul sinematik */
function cineIt(el) {
  el.dataset.typed = 1;
  const t = el.textContent.trim();
  if (!t) return;
  el.setAttribute('aria-label', t);
  el.classList.add('cine');
  el.innerHTML = t
    .split(/(\s+)/)
    .map((w, k) =>
      /^\s+$/.test(w)
        ? w
        : `<span class="w" aria-hidden="true" style="animation-delay:${0.15 + k * 0.05}s">${esc(w)}</span>`,
    )
    .join('');
}
new MutationObserver(() => document.querySelectorAll('[data-cine]:not([data-typed])').forEach(cineIt)).observe(
  document.getElementById('view'),
  { childList: true, subtree: true },
);
go('welcome', 0, 'f');
fx();
nums();
document.querySelectorAll('[data-cine]:not([data-typed])').forEach(cineIt);
document.querySelectorAll('[data-type]:not([data-typed])').forEach(typeIt);
/* Loading screen pembuka: bar progres mengikuti proses muat yang sebenarnya (font, gambar, halaman siap).
   Kunjungan kedua di sesi yang sama lebih cepat. Paling lama 6 detik, lalu tetap ditutup. */
{
  const sp = document.getElementById('splash');
  let seen = false;
  try {
    seen = sessionStorage.getItem('pdc_intro') == '1';
    sessionStorage.setItem('pdc_intro', '1');
  } catch (e) {}
  let done = false;
  const hide = () => {
    if (done) return;
    done = true;
    sp.classList.add('out');
    setTimeout(() => sp.remove(), 500);
  };
  const lw = sp.querySelector('.lwt');
  if (lw) lw.onclick = hide;
  if (RM.matches) hide();
  else {
    if (seen) sp.classList.add('quick');
    const fill = document.getElementById('ldgf'),
      pct = document.getElementById('ldgp'),
      txt = document.getElementById('ldgt');
    // tugas yang ditunggu: halaman siap (sudah, karena kode ini jalan setelah layar pertama dirender), font, dan semua gambar
    const tugas = [
      Promise.resolve(),
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),
      document.readyState == 'complete' ? Promise.resolve() : new Promise((r) => addEventListener('load', r, { once: true })),
    ];
    let selesai = 0;
    tugas.forEach((t) => t.then(() => selesai++, () => selesai++));
    const t0 = performance.now(),
      minDur = seen ? 500 : 1700,
      maxDur = 6000;
    const PESAN = [
      [0, 'Nyiapin materi…'],
      [35, 'Ngerapihin tampilan…'],
      [65, 'Dikit lagi…'],
      [90, 'Hampir kelar…'],
    ];
    let shown = 0;
    const step = (now) => {
      if (done) return;
      // waktu frame bisa sedikit lebih awal dari t0, jadi dijaga tidak negatif
      const el = Math.max(0, now - t0);
      const target = el > maxDur ? 100 : Math.min((selesai / tugas.length) * 100, (el / minDur) * 100);
      if (target > shown) shown = Math.min(target, shown + (target - shown) * 0.18 + 0.4);
      const p = Math.max(0, Math.min(100, Math.round(shown)));
      if (fill) fill.style.width = p + '%';
      if (pct) pct.textContent = p + '%';
      if (txt) txt.textContent = p >= 100 ? 'Udah siap' : (PESAN.filter((m) => p >= m[0]).pop() || PESAN[0])[1];
      if (p >= 100) return setTimeout(hide, seen ? 120 : 320);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    setTimeout(hide, maxDur + 1500);
  }
}

/* ===== Aksesibilitas (keyboard dan pembaca layar) ===== */
// 1) Elemen kecil yang bisa diklik (titik slide, titik halaman buku, daftar penjelasan, judul kecil di header)
//    dibuat bisa dijangkau Tab dan dipencet dengan Enter/Spasi. Slide yang tidak tampil dibuat inert
//    supaya fokus tidak nyasar ke isi yang tersembunyi.
function a11yEnhance(root) {
  root = root || document;
  root.querySelectorAll('#sdots i').forEach((d, k) => {
    d.setAttribute('role', 'button');
    d.tabIndex = 0;
    d.setAttribute('aria-label', 'Slide ' + (k + 1));
    d.setAttribute('aria-current', d.classList.contains('on') ? 'step' : 'false');
  });
  root.querySelectorAll('#bkd i').forEach((d, k) => {
    d.setAttribute('role', 'button');
    d.tabIndex = 0;
    d.setAttribute('aria-label', 'Halaman ' + (k + 1));
    d.setAttribute('aria-current', d.classList.contains('on') ? 'page' : 'false');
  });
  root.querySelectorAll('.bk2n li').forEach((li) => {
    li.setAttribute('role', 'button');
    li.tabIndex = 0;
    li.setAttribute('aria-pressed', li.classList.contains('on') ? 'true' : 'false');
  });
  root.querySelectorAll('.sld').forEach((sd) => {
    sd.inert = !sd.classList.contains('on');
  });
  const cb = document.getElementById('crumb');
  if (cb) {
    const clk = cb.classList.contains('clk');
    if (clk) {
      cb.setAttribute('role', 'button');
      cb.tabIndex = 0;
    } else {
      cb.removeAttribute('role');
      cb.removeAttribute('tabindex');
    }
  }
}
{
  let raf = 0;
  const run = () => {
    raf = 0;
    a11yEnhance();
  };
  new MutationObserver(() => {
    if (!raf) raf = requestAnimationFrame(run);
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
  document.getElementById('ov').setAttribute('aria-hidden', 'true');
}
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role=button]:not(button)')) {
    e.preventDefault();
    e.target.click();
  }
});

// 2) Saat jendela (sheet), tur, atau layar penuh terbuka: bagian di belakangnya dibuat inert,
//    fokus pindah ke dalam jendela, dan kembali ke tombol pemicu setelah ditutup.
let A11Y_OPENER = null;
function a11yLayer() {
  const app = document.getElementById('app'),
    sh = document.getElementById('sh');
  const shOn = sh.classList.contains('on'),
    fs = !!document.getElementById('bkfs'),
    tour = !!TR;
  app.inert = shOn || fs || tour;
  sh.inert = fs || tour;
  const sk = document.querySelector('.skip');
  if (sk) sk.inert = shOn || fs || tour;
}
// fokus Tab berputar di dalam lapisan yang sedang terbuka (jendela, layar penuh, atau tur)
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const layer = document.getElementById('bkfs') || (TR && document.getElementById('tour')) || (document.getElementById('sh').classList.contains('on') && document.getElementById('sh'));
  if (!layer) return;
  const f = [...layer.querySelectorAll('button,a[href],input:not([type=file]),textarea,select,[tabindex="0"]')].filter((x) => !x.disabled && !x.closest('[inert]') && (x.offsetParent || getComputedStyle(x).position === 'fixed'));
  if (!f.length) return;
  const i = f.indexOf(document.activeElement);
  if (e.shiftKey && (i <= 0)) {
    e.preventDefault();
    f[f.length - 1].focus();
  } else if (!e.shiftKey && (i === -1 || i === f.length - 1)) {
    e.preventDefault();
    f[0].focus();
  }
});
{
  const sh1 = sheet;
  sheet = function (k) {
    const sh = document.getElementById('sh');
    if (!sh.classList.contains('on')) A11Y_OPENER = document.activeElement;
    sh1(k);
    a11yLayer();
    setTimeout(() => {
      if (!sh.classList.contains('on') || sh.contains(document.activeElement)) return;
      const f = sh.querySelector('#shb input:not([type=file]),#shb textarea,#shb button,#shb [tabindex="0"]') || sh.querySelector('button');
      if (f) f.focus({ preventScroll: true });
    }, 60);
  };
  const cs1 = closeSh;
  closeSh = function (x) {
    const was = document.getElementById('sh').classList.contains('on');
    cs1(x);
    a11yLayer();
    if (was && A11Y_OPENER && document.contains(A11Y_OPENER) && !INGO) {
      try {
        A11Y_OPENER.focus({ preventScroll: true });
      } catch (e) {}
    }
    if (was) A11Y_OPENER = null;
  };
  const ts1 = tourStart;
  tourStart = function (k, f) {
    ts1(k, f);
    a11yLayer();
    const t = document.querySelector('#tour .tnx');
    if (t) setTimeout(() => t.focus({ preventScroll: true }), 80);
  };
  const te1 = tourEnd;
  tourEnd = function (s) {
    te1(s);
    setTimeout(a11yLayer, 0);
  };
  let fsOpener = null;
  const bf1 = bkFull;
  bkFull = function () {
    fsOpener = document.activeElement;
    bf1();
    const o = document.getElementById('bkfs');
    if (o) {
      o.setAttribute('role', 'dialog');
      o.setAttribute('aria-modal', 'true');
      o.setAttribute('aria-label', 'Contoh portofolio layar penuh');
      const c = o.querySelector('[aria-label="Tutup layar penuh"]');
      if (c) setTimeout(() => c.focus({ preventScroll: true }), 60);
    }
    a11yLayer();
  };
  const bc1 = bkFsClose;
  bkFsClose = function () {
    bc1();
    setTimeout(() => {
      a11yLayer();
      if (fsOpener && document.contains(fsOpener)) fsOpener.focus({ preventScroll: true });
    }, 220);
  };
}

// 3) Pindah layar diumumkan ke pembaca layar, dan fokus keyboard dipindah ke awal konten
//    (hanya saat layar benar-benar berganti, bukan saat layar yang sama diperbarui).
let A11Y_LAST = '';
{
  const live = document.createElement('div');
  live.id = 'srlive';
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  document.body.appendChild(live);
  const np1 = navPush;
  navPush = function (r, i) {
    np1(r, i);
    const key = r + ':' + i;
    if (key === A11Y_LAST) return;
    const first = !A11Y_LAST;
    A11Y_LAST = key;
    const h = document.querySelector('#view h1,#view h2');
    live.textContent = document.title.split(' · ')[0] + (h ? ': ' + h.textContent : '');
    if (!first && document.activeElement && (document.activeElement === document.body || !document.contains(document.activeElement))) {
      const v = document.getElementById('view');
      v.focus({ preventScroll: true });
    }
  };
}
// tautan "Lewati ke konten" memindahkan fokus tanpa mengubah alamat halaman (supaya tombol kembali tetap normal)
document.querySelector('.skip').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('view').focus();
});


/* ===== Loading antar halaman: garis progres tipis + kilau skeleton sekilas ===== */
/* Konten tetap langsung tampil, efek ini hanya memberi kesan "sedang memuat" tanpa menambah jeda. */
{
  const bar = document.createElement('div');
  bar.id = 'ldb';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ldT = 0;
  let ldN = 0;
  const ldStart = (r) => {
    if (RM.matches) return;
    clearTimeout(ldT);
    bar.className = '';
    void bar.offsetWidth;
    bar.className = 'run';
    ldT = setTimeout(() => (bar.className = 'end'), 520);
    // kilau skeleton di kartu layar baru: tunggu sampai layar baru benar-benar terpasang (transisi bisa menunda)
    const id = ++ldN,
      t0 = Date.now();
    const cek = () => {
      if (id != ldN || document.documentElement.classList.contains('lite')) return;
      const s = document.querySelector(`#view .scr[data-r="${r}"]:not(.still)`);
      if (!s) return Date.now() - t0 < 1500 && setTimeout(cek, 50);
      s.classList.add('ldsk');
      setTimeout(() => s.classList.remove('ldsk'), 650);
    };
    cek();
  };
  const go1 = go;
  go = function (r, i = 0, dir) {
    const pindah = cur.r && !(r == cur.r && i == cur.i) && !lock(r, i);
    go1(r, i, dir);
    if (pindah) ldStart(r);
  };
}

/* ===== Ilustrasi 3D halaman awal (Three.js) ===== */
/* Kartu portofolio mini mengambang di pinggir layar, di belakang judul, dan ikut miring mengikuti kursor.
   Three.js dimuat hanya di halaman awal dari vendor/three-folio.min.js (bagian Three.js yang dipakai saja).
   Kalau browser tidak mendukung WebGL, file dibuka langsung (file://), pengguna memilih kurangi animasi,
   atau perangkat lemah (.lite), ilustrasi biasa tetap tampil seperti sebelumnya. */
var W3D = null; // var: dipanggil dari AFT.welcome sebelum baris ini dijalankan
function w3d() {
  const c = document.getElementById('w3d');
  if (!c || W3D || RM.matches || document.documentElement.classList.contains('lite')) return;
  if (!/^https?:$/.test(location.protocol)) return;
  let ok = false;
  try {
    const t = document.createElement('canvas');
    ok = !!(t.getContext('webgl2') || t.getContext('webgl'));
  } catch (e) {}
  if (!ok) return;
  W3D = 'muat';
  // Three.js (±545 KB) dimuat setelah loading screen selesai dan browser sedang santai, supaya pembukaan tetap ringan.
  const muat = () =>
    import('./vendor/three-folio.min.js')
      .then((T) => w3dRun(T, c))
      .catch(() => (W3D = null));
  const tunggu = () => {
    if (!document.contains(c)) return (W3D = null);
    if (document.getElementById('splash')) return setTimeout(tunggu, 200);
    window.requestIdleCallback ? requestIdleCallback(muat, { timeout: 1500 }) : setTimeout(muat, 300);
  };
  tunggu();
}
function w3dRun(T, c) {
  if (!document.contains(c)) return (W3D = null);
  const hp = innerWidth < 761;
  const R = new T.WebGLRenderer({ canvas: c, alpha: true, antialias: true, powerPreference: 'low-power' });
  R.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  R.outputColorSpace = T.SRGBColorSpace;
  const scene = new T.Scene();
  const cam = new T.PerspectiveCamera(35, 1, 0.1, 100);
  cam.position.z = 14;
  const grp = new T.Group();
  scene.add(grp);
  const PAL = [
    ['#2d6fd6', '#93c5fd'],
    ['#7c3aed', '#c4b5fd'],
    ['#0891b2', '#a5f3fc'],
    ['#3b82f6', '#dbeafe'],
    ['#1e4fb0', '#bfdbfe'],
    ['#5aa3f0', '#e0e7ff'],
    ['#6d28d9', '#ddd6fe'],
  ];
  const rr = (g, x, y, w, h, r) => {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  };
  // gambar isi kartu: pita judul, foto profil, baris teks, dan tiga karya
  const tex = (k) => {
    const cv = document.createElement('canvas');
    cv.width = 256;
    cv.height = 336;
    const g = cv.getContext('2d'),
      [a, b] = PAL[k % PAL.length];
    g.fillStyle = '#ffffff';
    rr(g, 0, 0, 256, 336, 26);
    g.fill();
    const gr = g.createLinearGradient(0, 0, 256, 90);
    gr.addColorStop(0, a);
    gr.addColorStop(1, b);
    g.save();
    rr(g, 0, 0, 256, 336, 26);
    g.clip();
    g.fillStyle = gr;
    g.fillRect(0, 0, 256, 92);
    g.restore();
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.arc(52, 92, 30, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = b;
    g.beginPath();
    g.arc(52, 92, 24, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#123a8f';
    rr(g, 26, 138, 150, 14, 7);
    g.fill();
    g.fillStyle = '#bcd6f6';
    rr(g, 26, 162, 200, 9, 5);
    g.fill();
    rr(g, 26, 178, 160, 9, 5);
    g.fill();
    for (let j = 0; j < 3; j++) {
      const c2 = PAL[(k + j + 1) % PAL.length];
      const gg = g.createLinearGradient(0, 210, 0, 290);
      gg.addColorStop(0, c2[1]);
      gg.addColorStop(1, c2[0]);
      g.fillStyle = gg;
      rr(g, 26 + j * 70, 206, 62, 84, 12);
      g.fill();
    }
    g.fillStyle = '#e3effd';
    rr(g, 26, 304, 120, 9, 5);
    g.fill();
    const t = new T.CanvasTexture(cv);
    t.colorSpace = T.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  };
  // bentuk kartu bersudut bulat, UV dipetakan ke ukuran kartu
  const W = 2.2,
    H = 2.9,
    sh = new T.Shape(),
    r = 0.22;
  sh.moveTo(-W / 2 + r, -H / 2);
  sh.lineTo(W / 2 - r, -H / 2);
  sh.quadraticCurveTo(W / 2, -H / 2, W / 2, -H / 2 + r);
  sh.lineTo(W / 2, H / 2 - r);
  sh.quadraticCurveTo(W / 2, H / 2, W / 2 - r, H / 2);
  sh.lineTo(-W / 2 + r, H / 2);
  sh.quadraticCurveTo(-W / 2, H / 2, -W / 2, H / 2 - r);
  sh.lineTo(-W / 2, -H / 2 + r);
  sh.quadraticCurveTo(-W / 2, -H / 2, -W / 2 + r, -H / 2);
  const geo = new T.ShapeGeometry(sh, 6);
  const pos = geo.attributes.position,
    uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
  const shadowMat = new T.MeshBasicMaterial({ color: new T.Color('#1e4fb0'), transparent: true, opacity: 0.1, depthWrite: false });
  // posisi kartu: melingkar di pinggir, menjauhi judul di tengah
  const SPOT = hp
    ? [
        [-1.7, 4.6, -3, 0.5],
        [1.9, 4.2, -5, 0.45],
        [-1.9, -4.5, -4, 0.5],
        [1.7, -4.8, -3, 0.45],
      ]
    : [
        [-7.6, 2.7, -2, 0.82],
        [-8.6, -1.4, -5, 0.7],
        [-7.9, -4.1, -2, 0.55],
        [7.8, 3.0, -3, 0.78],
        [8.8, -0.6, -6, 0.75],
        [8.0, -4.2, -2, 0.55],
        [0.2, 5.2, -9, 0.6],
      ];
  const cards = SPOT.map(([x, y, z, s], k) => {
    const m = new T.Group();
    const face = new T.Mesh(geo, new T.MeshBasicMaterial({ map: tex(k), transparent: true, opacity: hp ? 0.55 : 0.95, side: T.DoubleSide }));
    const shd = new T.Mesh(geo, shadowMat);
    shd.position.set(0.12, -0.16, -0.05);
    m.add(shd, face);
    m.position.set(x, y, z);
    m.scale.setScalar(s);
    m.rotation.set((Math.random() - 0.5) * 0.4, (x > 0 ? -1 : 1) * (0.35 + Math.random() * 0.25), (Math.random() - 0.5) * 0.25);
    m.userData = { x, y, z, ph: Math.random() * Math.PI * 2, sp: 0.5 + Math.random() * 0.5, ry: m.rotation.y, rx: m.rotation.x };
    grp.add(m);
    return m;
  });
  let tx = 0,
    ty = 0;
  const onMove = (e) => {
    tx = e.clientX / innerWidth - 0.5;
    ty = e.clientY / innerHeight - 0.5;
  };
  addEventListener('pointermove', onMove, { passive: true });
  const size = () => {
    const w = c.clientWidth || innerWidth,
      h = c.clientHeight || innerHeight;
    R.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  };
  size();
  addEventListener('resize', size);
  const t0 = performance.now();
  let raf = 0;
  const stop = () => {
    cancelAnimationFrame(raf);
    removeEventListener('pointermove', onMove);
    removeEventListener('resize', size);
    cards.forEach((m) => m.children[1].material.map.dispose() || m.children[1].material.dispose());
    geo.dispose();
    shadowMat.dispose();
    R.dispose();
    W3D = null;
  };
  const loop = (now) => {
    if (!document.contains(c)) return stop();
    raf = requestAnimationFrame(loop);
    if (document.hidden || document.documentElement.classList.contains('hid')) return;
    const t = (now - t0) / 1000;
    grp.rotation.y += (tx * 0.22 - grp.rotation.y) * 0.05;
    grp.rotation.x += (ty * 0.14 - grp.rotation.x) * 0.05;
    for (const m of cards) {
      const u = m.userData;
      m.position.y = u.y + Math.sin(t * u.sp + u.ph) * 0.18;
      m.rotation.y = u.ry + Math.sin(t * 0.4 * u.sp + u.ph) * 0.12;
      m.rotation.x = u.rx + Math.cos(t * 0.35 * u.sp + u.ph) * 0.06;
    }
    R.render(scene, cam);
  };
  raf = requestAnimationFrame(loop);
  W3D = 'jalan';
  requestAnimationFrame(() => c.classList.add('on'));
}
/* ===== Mode offline (PWA) ===== */
/* sw.js menyimpan semua file web di browser, jadi setelah sekali dibuka pakai internet,
   web tetap bisa dibuka tanpa jaringan dan bisa di-install seperti aplikasi.
   Hanya dipasang di hosting sendiri (misalnya GitHub Pages), tidak di dalam pratinjau Claude atau saat dibuka langsung dari file. */
if (
  'serviceWorker' in navigator &&
  /^https?:$/.test(location.protocol) &&
  window.top === window &&
  !/claude|anthropic/i.test(location.hostname)
) {
  // Didaftarkan setelah halaman tenang, supaya unduhan file offline (±4 MB) tidak berebut dengan halaman yang sedang dibuka.
  window.addEventListener('load', () => {
    const daftar = () => navigator.serviceWorker.register('sw.js').catch(() => {});
    setTimeout(() => (window.requestIdleCallback ? requestIdleCallback(daftar, { timeout: 4000 }) : daftar()), 3000);
  });
}
// Video YouTube, Canva, dan rujukan luar butuh internet. Saat offline, beri tahu dengan halus.
const NEED_NET = 'Bagian ini butuh internet. Materi lain tetap bisa dibuka.';
document.addEventListener(
  'click',
  (e) => {
    if (navigator.onLine) return;
    const a = e.target.closest && e.target.closest('a[href^="http"], button.vph');
    if (!a) return;
    if (a.tagName === 'A' && new URL(a.href, location.href).origin === location.origin) return;
    e.preventDefault();
    e.stopPropagation();
    toast(NEED_NET, 'info');
  },
  true,
);
window.addEventListener('offline', () => toast('Kamu lagi offline. Materi tetap bisa dibuka.', 'info'));
window.addEventListener('online', () => toast('Internet udah nyambung lagi.', 'chk'));

/* ===== Aktivitas: pengingat materi di bawah soal (mengisi ruang kosong dan bantu yang lupa) ===== */
const AKM = { a1: 0, a2: 1, a3: 2, a4: 4, a5: 3, a6: 0, a7: 5 };
function akHint(r) {
  const pane = document.querySelector('#view .scr[data-r="' + r + '"] .pane');
  if (!pane || pane.querySelector('.ahint')) return;
  const k = AKM[r],
    m = M[k],
    pf = pane.querySelector('.pf');
  const el = document.createElement('div');
  el.className = 'ahint';
  el.innerHTML =
    '<span class="ic">' + I('bulb') + '</span><div><b>Lupa materinya?</b><small>Materi ' + (k + 1) + ', ' + m.t + '. ' + m.s +
    '</small></div><button class="link" onclick="go(\'materi\',' + k + ')">Buka lagi</button>';
  pane.insertBefore(el, pf || null);
}
Object.keys(AKM).forEach((r) => {
  const prev = AFT[r];
  AFT[r] = (i) => {
    if (prev) prev(i);
    akHint(r);
  };
});

/* ===== Studio Portofolio: bikin portofolio sendiri, terpisah dari alur belajar ===== */
/* Bisa dibuka kapan saja (tidak dikunci). Data di S.st, foto dikecilkan dulu supaya muat di penyimpanan browser.
   Hasil bisa disimpan sebagai PDF lewat jendela cetak browser. Jalan tanpa internet dan tanpa AI. */
const STPL = [
  ['Minimalis', 'Bersih dan lega, fokus ke karya.'],
  ['Kreatif', 'Warna berani dan bentuk dinamis.'],
  ['Profesional', 'Formal, rapi, gampang dipindai.'],
];
const STCOL = ['#1e4fb0', '#0f766e', '#7c3aed', '#be123c', '#c2410c', '#111827'];
const STFONT = [
  ['Modern', 'Poppins, sans-serif', 'Inter, sans-serif'],
  ['Klasik', 'Georgia, serif', 'Inter, sans-serif'],
  ['Tegas', 'Poppins, sans-serif', 'Poppins, sans-serif'],
];
const STSEC = [
  ['riwayat', 'Pendidikan & pengalaman'],
  ['skill', 'Skill'],
  ['karya', 'Karya'],
  ['kontak', 'Kontak'],
];
const STTAB = [
  ['profil', 'Profil', 'home'],
  ['riwayat', 'Riwayat', 'book'],
  ['skill', 'Skill', 'star'],
  ['karya', 'Karya', 'grid'],
  ['kontak', 'Kontak', 'chat'],
  ['tampilan', 'Tampilan', 'spark'],
  ['cek', 'Cek & simpan', 'chk'],
];
const STPRE = [
  ['linear-gradient(160deg,#1e4fb0,#7c3aed)', 'Poster'],
  ['linear-gradient(160deg,#fde68a,#f59e0b)', 'Logo'],
  ['linear-gradient(160deg,#a5f3fc,#38bdf8)', 'Media sosial'],
  ['linear-gradient(160deg,#bbf7d0,#16a34a)', 'Kemasan'],
  ['linear-gradient(160deg,#fecdd3,#e11d48)', 'Ilustrasi'],
  ['linear-gradient(160deg,#e9d5ff,#7c3aed)', 'Presentasi'],
];
const STBIO = [
  'Fresh graduate yang suka bikin desain sederhana tapi jelas pesannya.',
  'Terbiasa bikin konten media sosial untuk organisasi kampus, dari ide sampai unggah.',
  'Suka merapikan informasi jadi visual yang gampang dipahami orang awam.',
];
const STSKILL = ['Canva', 'Adobe Illustrator', 'Tipografi', 'Layout', 'Copywriting', 'Fotografi', 'Microsoft Office', 'Komunikasi', 'Kerja tim', 'Manajemen waktu'];
const stD = () => {
  if (!S.st)
    S.st = {
      tab: 'profil',
      pg: 0,
      nm: S.name || '',
      pos: '',
      bio: '',
      foto: '',
      edu: [{ t: '', s: '', y: '' }],
      exp: [],
      skill: [],
      karya: [],
      kontak: { em: '', hp: '', li: '', web: '' },
      tpl: 0,
      c: 0,
      f: 0,
      sec: ['riwayat', 'skill', 'karya', 'kontak'],
    };
  return S.st;
};
const stW = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
/* ---------- daftar cek ---------- */
function stChecks(d) {
  const k = d.karya;
  return [
    [d.nm.trim().length >= 2, 'Nama udah diisi', 'profil'],
    [d.pos.trim().length >= 3, 'Posisi yang dilamar udah jelas', 'profil'],
    [stW(d.bio) >= 5 && stW(d.bio) <= 30, 'Kalimat tentang diri pendek dan jelas (5 sampai 30 kata)', 'profil'],
    [!!d.foto, 'Ada foto profil yang rapi', 'profil'],
    [d.edu.some((x) => x.t.trim()) || d.exp.some((x) => x.t.trim()), 'Ada minimal satu riwayat pendidikan atau pengalaman', 'riwayat'],
    [d.skill.length >= 3, 'Ada minimal 3 skill', 'skill'],
    [k.length >= 3 && k.length <= 6, 'Jumlah karya 3 sampai 6', 'karya'],
    [k.length > 0 && k.every((x) => x.t.trim() && x.p.trim()), 'Tiap karya ada judul dan peranmu', 'karya'],
    [!!(d.kontak.em.trim() || d.kontak.hp.trim()), 'Ada kontak yang bisa dihubungi', 'kontak'],
    [d.sec.includes('karya') && d.sec.includes('kontak'), 'Halaman Karya dan Kontak dipakai', 'tampilan'],
  ];
}
/* ---------- halaman-halaman portofolio ---------- */
function stPages(d) {
  const P = [['sampul', 'Sampul']];
  d.sec.forEach((s) => P.push([s, STSEC.find((x) => x[0] == s)[1]]));
  return P;
}
function stFoto(d, cls) {
  return d.foto ? `<span class="${cls}" style="background-image:url('${d.foto}')"></span>` : `<span class="${cls} sil"></span>`;
}
function stPage(d, key) {
  const nm = esc(d.nm.trim() || 'Nama Kamu'),
    pos = esc(d.pos.trim() || 'Posisi yang dilamar'),
    bio = esc(d.bio.trim() || 'Tulis satu kalimat tentang dirimu di bagian Profil.');
  const head = (t) => `<div class="sth"><span class="stk">${t}</span></div>`;
  const li = (a) =>
    a.filter((x) => x.t.trim()).map((x) => `<li><b>${esc(x.t)}</b>${x.s.trim() ? `<span>${esc(x.s)}</span>` : ''}${x.y.trim() ? `<em>${esc(x.y)}</em>` : ''}</li>`).join('') ||
    '<li class="ste">Belum diisi</li>';
  let in_ = '';
  if (key == 'sampul')
    in_ = `<div class="stcov">${stFoto(d, 'stph')}<div><span class="stk">Portofolio</span><h1>${nm}</h1><p class="stpos">${pos}</p><p class="stbio">${bio}</p></div></div>`;
  if (key == 'riwayat')
    in_ = `${head('Pendidikan &amp; pengalaman')}<div class="st2c"><div><h3>Pendidikan</h3><ul class="stl">${li(d.edu)}</ul></div><div><h3>Pengalaman</h3><ul class="stl">${li(d.exp)}</ul></div></div>`;
  if (key == 'skill')
    in_ = `${head('Skill')}<div class="stsk">${d.skill.map((x) => `<span>${esc(x)}</span>`).join('') || '<p class="ste">Tambahkan skill di bagian Skill.</p>'}</div>`;
  if (key == 'karya')
    in_ = `${head('Karya')}<div class="stkr n${Math.min(Math.max(d.karya.length, 1), 6)}">${
      d.karya
        .map(
          (k) =>
            `<figure><span class="stim" style="${k.img ? `background-image:url('${k.img}')` : `background:${STPRE[k.pre || 0][0]}`}">${k.img ? '' : '<i></i>'}</span><figcaption><b>${esc(k.t || 'Judul karya')}</b><small>${esc(k.p || 'Peranmu')}</small>${k.d.trim() ? `<span>${esc(k.d)}</span>` : ''}</figcaption></figure>`,
        )
        .join('') || '<p class="ste">Tambahkan 3 sampai 6 karya di bagian Karya.</p>'
    }</div>`;
  if (key == 'kontak') {
    const K = d.kontak,
      rows = [
        ['Email', K.em],
        ['WhatsApp', K.hp],
        ['LinkedIn', K.li],
        ['Web / Behance', K.web],
      ].filter((r) => r[1].trim());
    in_ = `<div class="stend"><span class="stk">Mari terhubung</span><h1>Terima kasih</h1><p class="stpos">${nm} · ${pos}</p><div class="stct">${rows.map((r) => `<p><b>${r[0]}</b>${esc(r[1])}</p>`).join('') || '<p class="ste">Isi kontakmu di bagian Kontak.</p>'}</div></div>`;
  }
  return `<div class="stpg t${d.tpl}" style="--c:${STCOL[d.c] || d.c};--fh:${STFONT[d.f][1]};--fb:${STFONT[d.f][2]}"><i class="std1"></i><i class="std2"></i><div class="stin">${in_}</div></div>`;
}
/* ---------- isian tiap tab ---------- */
const stIn = (lab, key, val, ph, max = 60) =>
  `<label class="stf">${lab}<input class="inp" maxlength="${max}" value="${esc(val)}" placeholder="${ph}" oninput="stSet('${key}',this.value)"></label>`;
function stTabH(d) {
  const t = d.tab;
  if (t == 'profil')
    return `<div class="stfoto">${stFoto(d, 'stfp')}<div><b>Foto profil</b><small>Pakai foto setengah badan, latar polos, wajah kelihatan jelas.</small><div class="row"><label class="btn g sm stup">${I('dl')} Pilih foto<input type="file" accept="image/*" onchange="stImg(this,'foto')"></label>${d.foto ? `<button class="link" onclick="stSet('foto','');go('studio')">Hapus</button>` : ''}</div></div></div>
${stIn('Nama', 'nm', d.nm, 'Nama lengkap atau panggilan', 30)}${stIn('Posisi yang dilamar', 'pos', d.pos, 'Contoh: Desainer Grafis', 40)}
<label class="stf">Satu kalimat tentang dirimu<textarea class="inp" rows="3" maxlength="220" placeholder="5 sampai 30 kata" oninput="stSet('bio',this.value)">${esc(d.bio)}</textarea></label>
<p class="sth2">Bingung? Pakai contoh ini lalu ubah sesukamu:</p><div class="chips">${STBIO.map((b, j) => `<button class="chip" onclick="stSet('bio',STBIO[${j}]);go('studio')">${b.split(' ').slice(0, 4).join(' ')}…</button>`).join('')}</div>`;
  if (t == 'riwayat') {
    const L = (arr, key, lab, ph) =>
      `<div class="stgrp"><div class="stgh"><b>${lab}</b><button class="btn g sm" onclick="stAdd('${key}')">+ Tambah</button></div>${arr
        .map(
          (x, j) =>
            `<div class="stitem"><input class="inp" maxlength="60" value="${esc(x.t)}" placeholder="${ph[0]}" oninput="stRow('${key}',${j},'t',this.value)"><div class="st2i"><input class="inp" maxlength="60" value="${esc(x.s)}" placeholder="${ph[1]}" oninput="stRow('${key}',${j},'s',this.value)"><input class="inp" maxlength="20" value="${esc(x.y)}" placeholder="Tahun" oninput="stRow('${key}',${j},'y',this.value)"></div><button class="ib stdel" onclick="stDel('${key}',${j})" aria-label="Hapus">${I('x')}</button></div>`,
        )
        .join('') || '<p class="sth2">Belum ada. Klik Tambah.</p>'}</div>`;
    return L(d.edu, 'edu', 'Pendidikan', ['Contoh: S1 Teknologi Pendidikan', 'Kampus atau sekolah']) + L(d.exp, 'exp', 'Pengalaman', ['Contoh: Desainer konten (magang)', 'Tempat atau organisasi']);
  }
  if (t == 'skill')
    return `<div class="stskin"><input class="inp" id="stsk" maxlength="30" placeholder="Ketik skill lalu tekan Enter" onkeydown="if(event.key=='Enter'){event.preventDefault();stSkill(this.value)}"><button class="btn sm" onclick="stSkill(document.getElementById('stsk').value)">Tambah</button></div>
<div class="stchips">${d.skill.map((x, j) => `<span class="chip on">${esc(x)}<button onclick="stSkDel(${j})" aria-label="Hapus ${esc(x)}">${I('x')}</button></span>`).join('') || '<p class="sth2">Belum ada skill.</p>'}</div>
<p class="sth2">Saran skill (klik buat nambah):</p><div class="chips">${STSKILL.filter((x) => !d.skill.includes(x)).map((x) => `<button class="chip" onclick="stSkill('${x}')">+ ${x}</button>`).join('')}</div>`;
  if (t == 'karya')
    return `<div class="stgh"><b>Karya (${d.karya.length}/6)</b><button class="btn sm" ${d.karya.length >= 6 ? 'disabled' : ''} onclick="stKAdd()">+ Tambah karya</button></div>${d.karya
      .map(
        (k, j) =>
          `<div class="stkitem"><label class="stkimg" style="${k.img ? `background-image:url('${k.img}')` : `background:${STPRE[k.pre || 0][0]}`}" title="Ganti gambar"><input type="file" accept="image/*" onchange="stImg(this,'karya',${j})"><span>${I('dl')} ${k.img ? 'Ganti' : 'Unggah'}</span></label><div class="stkf"><input class="inp" maxlength="50" value="${esc(k.t)}" placeholder="Judul karya" oninput="stKSet(${j},'t',this.value)"><input class="inp" maxlength="60" value="${esc(k.p)}" placeholder="Peranmu, misalnya: desain dari nol" oninput="stKSet(${j},'p',this.value)"><textarea class="inp" rows="2" maxlength="140" placeholder="Hasilnya (opsional), misalnya: dipakai buat acara 300 peserta" oninput="stKSet(${j},'d',this.value)">${esc(k.d)}</textarea></div><div class="stkbt"><button class="ib" ${j == 0 ? 'disabled' : ''} onclick="stKMove(${j},-1)" aria-label="Naikkan">${I('bk')}</button><button class="ib" ${j == d.karya.length - 1 ? 'disabled' : ''} onclick="stKMove(${j},1)" aria-label="Turunkan">${I('arr')}</button><button class="ib" onclick="stKDel(${j})" aria-label="Hapus karya">${I('x')}</button></div></div>`,
      )
      .join('') || '<p class="sth2">Belum ada karya. Klik Tambah karya, lalu unggah gambar karyamu sendiri. Kalau belum ada gambarnya, pakai warna contoh dulu.</p>'}<p class="sth2">Taruh karya paling kuat di urutan pertama.</p>`;
  if (t == 'kontak') {
    const K = d.kontak;
    return `${stIn('Email', 'kontak.em', K.em, 'nama@email.com', 60)}${stIn('WhatsApp', 'kontak.hp', K.hp, '08xx xxxx xxxx', 20)}${stIn('LinkedIn', 'kontak.li', K.li, 'linkedin.com/in/namamu', 60)}${stIn('Web atau Behance (opsional)', 'kontak.web', K.web, 'behance.net/namamu', 60)}<p class="sth2">Pakai email yang kelihatan profesional, misalnya nama.lengkap@email.com.</p>`;
  }
  if (t == 'tampilan')
    return `<p class="stlb">Template</p><div class="sttpl">${STPL.map((x, j) => `<button class="${d.tpl == j ? 'on' : ''}" onclick="stSet('tpl',${j});go('studio')"><span class="stth t${j}"><i></i><i></i><i></i></span><b>${x[0]}</b><small>${x[1]}</small></button>`).join('')}</div>
<p class="stlb">Warna utama</p><div class="sw">${STCOL.map((c, j) => `<button style="--c:${c}" class="${d.c === j ? 'on' : ''}" aria-label="Warna ${j + 1}" onclick="stSet('c',${j});go('studio')"></button>`).join('')}<label class="stcc" title="Warna lain"><input type="color" value="${typeof d.c == 'string' ? d.c : STCOL[d.c]}" oninput="stSet('c',this.value)"></label></div>
<p class="stlb">Pasangan huruf</p><div class="chips">${STFONT.map((f, j) => `<button class="chip ${d.f == j ? 'on' : ''}" style="font-family:${f[1]}" onclick="stSet('f',${j});go('studio')">${f[0]}</button>`).join('')}</div>
<p class="stlb">Halaman dan urutannya</p><div class="stsec">${d.sec
      .map(
        (s, k) =>
          `<div class="stsr"><span>${k + 2}</span><b>${STSEC.find((x) => x[0] == s)[1]}</b><button class="ib" ${k == 0 ? 'disabled' : ''} onclick="stSMove(${k},-1)" aria-label="Naikkan">${I('bk')}</button><button class="ib" ${k == d.sec.length - 1 ? 'disabled' : ''} onclick="stSMove(${k},1)" aria-label="Turunkan">${I('arr')}</button><button class="ib" onclick="stSTog('${s}')" aria-label="Sembunyikan">${I('x')}</button></div>`,
      )
      .join('')}</div>${STSEC.some((x) => !d.sec.includes(x[0])) ? `<div class="chips" style="margin-top:8px">${STSEC.filter((x) => !d.sec.includes(x[0])).map((x) => `<button class="chip" onclick="stSTog('${x[0]}')">+ ${x[1]}</button>`).join('')}</div>` : ''}<p class="sth2">Halaman 1 selalu sampul.</p>`;
  const c = stChecks(d),
    ok = c.filter((x) => x[0]).length;
  return `<div class="stscore"><b>${ok}<small>/${c.length}</small></b><p>${ok == c.length ? 'Lengkap. Simpan jadi PDF, lalu bikin versi finalnya di Canva.' : ok >= 7 ? 'Udah bagus. Benerin yang oranye biar makin kuat.' : 'Masih ada yang kosong. Klik baris oranye buat langsung ke bagiannya.'}</p></div>
<ul class="stck">${c.map((x) => `<li class="${x[0] ? 'ok' : ''}"><button onclick="stTab('${x[2]}')">${I(x[0] ? 'chk' : 'info')}<span>${x[1]}</span></button></li>`).join('')}</ul>
<div class="stact"><button class="btn" onclick="stPrint()">${I('dl')} Simpan sebagai PDF</button><button class="btn g" onclick="stCopy()">${I('copy')} Salin semua teks</button><a class="btn g" href="https://www.canva.com" target="_blank" rel="noopener">${I('ext')} Buka Canva</a><button class="link" onclick="stReset()">Mulai dari kosong</button></div>
<p class="sth2">PDF-nya bisa langsung dikirim, atau dipakai sebagai contekan waktu bikin di Canva. Teks yang disalin tinggal ditempel ke template Canva.</p>`;
}
/* ---------- aksi ---------- */
function stSet(key, v) {
  const d = stD();
  if (key.startsWith('kontak.')) d.kontak[key.slice(7)] = v;
  else d[key] = v;
  save();
  stU();
}
function stTab(t) {
  stD().tab = t;
  save();
  go('studio');
}
function stAdd(key) {
  stD()[key].push({ t: '', s: '', y: '' });
  save();
  go('studio');
}
function stRow(key, j, f, v) {
  stD()[key][j][f] = v;
  save();
  stU();
}
function stDel(key, j) {
  stD()[key].splice(j, 1);
  save();
  go('studio');
}
function stSkill(v) {
  v = String(v || '').trim();
  const d = stD();
  if (!v) return;
  if (d.skill.length >= 12) return toast('Cukup 12 skill, pilih yang paling kuat.');
  if (!d.skill.includes(v)) d.skill.push(v);
  save();
  go('studio');
  setTimeout(() => document.getElementById('stsk')?.focus(), 50);
}
function stSkDel(j) {
  stD().skill.splice(j, 1);
  save();
  go('studio');
}
function stKAdd() {
  const d = stD();
  if (d.karya.length >= 6) return;
  d.karya.push({ t: '', p: '', d: '', img: '', pre: d.karya.length % STPRE.length });
  save();
  go('studio');
}
function stKSet(j, f, v) {
  stD().karya[j][f] = v;
  save();
  stU();
}
function stKMove(j, dir) {
  const a = stD().karya,
    k = j + dir;
  if (k < 0 || k >= a.length) return;
  [a[j], a[k]] = [a[k], a[j]];
  save();
  go('studio');
}
function stKDel(j) {
  stD().karya.splice(j, 1);
  save();
  go('studio');
}
function stSMove(k, dir) {
  const a = stD().sec,
    j = k + dir;
  if (j < 0 || j >= a.length) return;
  [a[k], a[j]] = [a[j], a[k]];
  save();
  go('studio');
}
function stSTog(s) {
  const a = stD().sec,
    i = a.indexOf(s);
  if (i < 0) a.push(s);
  else a.splice(i, 1);
  stD().pg = 0;
  save();
  go('studio');
}
function stPg(i) {
  const d = stD(),
    n = stPages(d).length;
  d.pg = (i + n) % n;
  save();
  stU();
}
/* foto dikecilkan dulu (maks 720px, JPEG) supaya penyimpanan browser tidak penuh */
function stImg(inp, where, j) {
  const f = inp.files && inp.files[0];
  if (!f) return;
  if (!/^image\//.test(f.type)) return toast('Pilih file gambar ya (JPG atau PNG).');
  const r = new FileReader();
  r.onload = () => {
    const im = new Image();
    im.onload = () => {
      const m = 720,
        sc = Math.min(1, m / Math.max(im.width, im.height)),
        c = document.createElement('canvas');
      c.width = Math.round(im.width * sc);
      c.height = Math.round(im.height * sc);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      const url = c.toDataURL('image/jpeg', 0.78);
      const d = stD();
      if (where == 'foto') d.foto = url;
      else if (d.karya[j]) d.karya[j].img = url;
      try {
        save();
      } catch (e) {
        toast('Penyimpanan browser penuh. Coba pakai gambar yang lebih kecil.');
      }
      go('studio');
    };
    im.onerror = () => toast('Gambarnya nggak bisa dibuka. Coba file lain.');
    im.src = r.result;
  };
  r.readAsDataURL(f);
}
function stText(d) {
  const L = [];
  L.push(d.nm, d.pos, d.bio, '');
  if (d.edu.some((x) => x.t)) L.push('PENDIDIKAN', ...d.edu.filter((x) => x.t).map((x) => [x.t, x.s, x.y].filter(Boolean).join(', ')), '');
  if (d.exp.some((x) => x.t)) L.push('PENGALAMAN', ...d.exp.filter((x) => x.t).map((x) => [x.t, x.s, x.y].filter(Boolean).join(', ')), '');
  if (d.skill.length) L.push('SKILL', d.skill.join(', '), '');
  if (d.karya.length) L.push('KARYA', ...d.karya.map((k) => [k.t, k.p, k.d].filter(Boolean).join(' | ')), '');
  const K = d.kontak;
  L.push('KONTAK', ...[K.em, K.hp, K.li, K.web].filter(Boolean));
  return L.join('\n').trim();
}
function stCopy() {
  const t = stText(stD());
  (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject())
    .then(() => toast('Semua teks udah disalin. Tinggal tempel di Canva.', 'chk'))
    .catch(() => toast('Browser ini nggak bisa nyalin otomatis. Salin manual aja ya.'));
}
function stPrint() {
  const d = stD(),
    box = document.createElement('div');
  box.id = 'stprint';
  box.innerHTML = stPages(d).map((p) => stPage(d, p[0])).join('');
  document.body.appendChild(box);
  document.documentElement.classList.add('stprinting');
  const done = () => {
    document.documentElement.classList.remove('stprinting');
    box.remove();
    removeEventListener('afterprint', done);
  };
  addEventListener('afterprint', done);
  setTimeout(() => {
    window.print();
    setTimeout(done, 1500);
  }, 150);
}
function stReset() {
  if (!confirm('Hapus semua isian di Studio dan mulai dari kosong?')) return;
  S.st = null;
  save();
  go('studio');
}
/* ---------- tampilan ---------- */
function stU() {
  const d = stD(),
    P = stPages(d);
  if (d.pg >= P.length) d.pg = 0;
  const v = document.getElementById('stv'),
    th = document.getElementById('stth'),
    pn = document.getElementById('stpn');
  if (v) v.innerHTML = stPage(d, P[d.pg][0]);
  if (pn) pn.textContent = `Halaman ${d.pg + 1} dari ${P.length}: ${P[d.pg][1]}`;
  if (th) th.innerHTML = P.map((p, i) => `<button class="${i == d.pg ? 'on' : ''}" onclick="stPg(${i})" aria-label="Halaman ${i + 1}: ${p[1]}"><span class="stmini">${stPage(d, p[0])}</span><small>${i + 1}. ${p[1]}</small></button>`).join('');
  const c = stChecks(d),
    ok = c.filter((x) => x[0]).length,
    b = document.getElementById('stsc');
  if (b) b.textContent = ok + '/' + c.length;
}
SCR.studio = () => {
  const d = stD(),
    mv = R.sv || 'form';
  return `<div class="stud ${mv == 'prev' ? 'showp' : ''}"><article class="card pane stfrm"><div class="ph"><div class="row" style="justify-content:space-between;align-items:center"><span class="tag">${I('spark')} Studio portofolio</span><span class="stscp">Kelengkapan <b id="stsc"></b></span></div><h2>Bikin portofoliomu sendiri</h2><p>Isi bagian di bawah, hasilnya langsung kelihatan.</p><div class="sttabs" role="tablist">${STTAB.map((x) => `<button role="tab" aria-selected="${d.tab == x[0]}" class="${d.tab == x[0] ? 'on' : ''}" onclick="stTab('${x[0]}')">${I(x[2])}<span>${x[1]}</span></button>`).join('')}</div></div>
<div class="pb scroll">${stTabH(d)}</div><div class="pf stpfm"><button class="btn g" onclick="R.sv='prev';go('studio')">${I('eye')} Lihat hasil</button></div></article>
<article class="card stprv"><div class="stpvh"><b id="stpn"></b><div class="row"><button class="ib" onclick="stPg(stD().pg-1)" aria-label="Halaman sebelumnya">${I('bk')}</button><button class="ib" onclick="stPg(stD().pg+1)" aria-label="Halaman berikutnya">${I('arr')}</button><button class="btn g sm stbk" onclick="R.sv='form';go('studio')">${I('bk')} Balik isi</button></div></div><div class="stvw"><div id="stv"></div></div><div class="stthumbs" id="stth"></div></article></div>`;
};
AFT.studio = () => stU();

/* ===== Pengaturan course ===== */
/* Disimpan di S.set per pengguna. Ukuran teks lewat zoom, animasi tenang lewat kelas .calm (+ .lite supaya efek berat ikut mati),
   kontras lewat .hc, spasi baca lewat .sp, suara lewat pembungkus sfx(), tema terang/gelap lewat thApply(), musik latar lewat mu*(). */
P.gear =
  '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M2.5 12h3M18.5 12h3M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/>';
P.pal =
  '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7.2" r="1.2"/><circle cx="14.5" cy="7.2" r="1.2"/>';
P.music = '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>';
P.vol = '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>';
P.mute = '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>';
P.lines = '<path d="M4 6h16M4 12h16M4 18h10"/>';
P.phone = '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2M3.5 9v6M20.5 9v6"/>';
P.cloud = '<path d="M7 18.5a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.6 1.6A3.8 3.8 0 0 1 17.5 18.5z"/><path d="M9.5 14l2 2 3.5-3.5"/>';
P.drop = '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>';
P.wave = '<path d="M2.5 9c2.4 0 2.4-2 4.8-2s2.4 2 4.7 2 2.4-2 4.7-2 2.4 2 4.8 2M2.5 15c2.4 0 2.4-2 4.8-2s2.4 2 4.7 2 2.4-2 4.7-2 2.4 2 4.8 2"/>';
P.piano =
  '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M8 4.5v15M13 4.5v15M18 4.5v15M6.5 4.5v8h3v-8M11.5 4.5v8h3v-8M16.5 4.5v8h3v-8"/>';
const SETD = { fs: 'md', calm: 0, sound: 1, hc: 0, th: 'light', sp: 0, mus: '', mv: 50, sv: 70, duck: 1, vib: 1, nav: 'side' };
const setG = () => Object.assign({}, SETD, S.set || {});
const LITE0 = document.documentElement.classList.contains('lite');
const VIBOK = 'vibrate' in navigator && matchMedia('(pointer: coarse)').matches;

/* ---------- tema terang / gelap ----------
   Bawaan terang (palet biru muda). Tema gelap dibuat otomatis dari warna yang sudah ada: tiap warna di style.css (CSSOM)
   dan atribut style di halaman diubah terang-gelapnya lewat OKLCH. Latar terang jadi biru tua, teks gelap jadi terang,
   warna utama (tombol, aksen) tetap. "Ikuti perangkat" membaca prefers-color-scheme. Ilustrasi SVG tidak diubah. */
const CRX = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b|rgba?\(\s*[\d.]+[\s,]+[\d.]+[\s,]+[\d.]+\s*(?:[,/]\s*[\d.]+%?\s*)?\)/gi;
const THSH = ['background', 'border', 'border-color', 'border-top', 'border-right', 'border-bottom', 'border-left', 'outline', 'text-decoration', 'mask'];
const THTX = /^(color|caret-color|-webkit-text-fill-color|text-decoration-color|text-emphasis-color|--ink|--mute|--pd)$/;
// dokumen (halaman Studio, buku contoh portofolio) tetap putih seperti kertas
const THKEEP = /\.(stpg|stin|std[12]|pg[a-z0-9]*)\b/;
const THFILE = location.protocol == 'file:'; // stylesheet dari file lokal tidak bisa dibaca CSSOM
const MQD = matchMedia('(prefers-color-scheme: dark)');
let THK = 0, // 0 terang, 1 gelap (yang sedang dipakai)
  THO = null,
  THMO = null;
const THC = {};
function thRgb(s) {
  if (s[0] == '#') {
    let h = s.slice(1);
    if (h.length < 5) h = h.replace(/./g, '$&$&');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length == 8 ? parseInt(h.slice(6, 8), 16) / 255 : null];
  }
  const n = s.match(/[\d.]+%?/g);
  const a = n[3] == null ? null : /%$/.test(n[3]) ? parseFloat(n[3]) / 100 : +n[3];
  return [+n[0], +n[1], +n[2], a];
}
function thLch(r, g, b) {
  const li = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const R = li(r),
    G = li(g),
    B = li(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B),
    m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B),
    s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  let H = (Math.atan2(Bb, A) * 180) / Math.PI;
  return [L, Math.hypot(A, Bb), H < 0 ? H + 360 : H];
}
function thFromLch(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const out = (c) => {
    const a = c * Math.cos(hr),
      bb = c * Math.sin(hr);
    const l2 = (L + 0.3963377774 * a + 0.2158037573 * bb) ** 3,
      m2 = (L - 0.1055613458 * a - 0.0638541728 * bb) ** 3,
      s2 = (L - 0.0894841775 * a - 1.291485548 * bb) ** 3;
    return [
      4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2,
      -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2,
      -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s2,
    ];
  };
  let v = out(C);
  for (let i = 0; i < 40 && v.some((x) => x < -0.0005 || x > 1.0005); i++) v = out((C *= 0.94)); // jaga tetap di gamut layar
  return v.map((c) => {
    c = Math.min(1, Math.max(0, c));
    return Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055));
  });
}
// t = warna teks, b = latar/garis. Hasil null berarti warnanya dibiarkan.
function thDark(r, g, b, kind) {
  let [L, C, H] = thLch(r, g, b);
  if (kind == 'a') kind = L < 0.5 ? 't' : 'b';
  if (C < 0.02) {
    H = 262; // abu-abu netral diberi sedikit rona biru supaya serasi
    C = Math.max(C, 0.05);
  }
  if (kind == 't') {
    if (L >= 0.62) return null;
    return thFromLch(0.97 - L * 0.36, C * 0.75, H);
  }
  if (C > 0.1) return null; // warna cerah (ikon, tombol, aksen) dibiarkan
  // gelapnya sedang (biru-abu), bukan hitam: kartu putih 0.32, latar halaman 0.28, garis dan isian sedikit lebih terang
  // putih jadi lapisan kaca tipis (ikut warna kartu di bawahnya)
  if (L >= 0.995) return [168, 190, 245, 0.13];
  if (L >= 0.97) return [160, 184, 240, 0.08];
  if (L > 0.72) return thFromLch(0.33 + (0.97 - L) * 0.6, Math.max(C * 0.9, 0.045), H);
  if (L > 0.6) return thFromLch(L * 0.8, C * 0.9, H);
  return null;
}
function thCol(s, kind) {
  const k = kind + s;
  if (k in THC) return THC[k];
  const c = thRgb(s.toLowerCase()),
    n = thDark(c[0], c[1], c[2], kind);
  let o = s;
  if (n) {
    const a = n[3] == null ? c[3] : (c[3] == null ? 1 : c[3]) * n[3];
    o = a == null ? '#' + n.slice(0, 3).map((x) => x.toString(16).padStart(2, '0')).join('') : `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${+a.toFixed(3)})`;
  }
  return (THC[k] = o);
}
// fill/stroke: garis gelap diperlakukan seperti teks, garis terang seperti latar
// teks yang memakai warna utama (var(--p) dkk.) diganti versi terangnya
const THVAR = /var\(--(p|p2|pd)\)/;
const thStr = (v, p) => (THTX.test(p) ? v.replace(/var\(--(p|p2|pd)\)/g, 'var(--tx-$1)') : v).replace(CRX, (m) => thCol(m, THTX.test(p) ? 't' : /^(fill|stroke|stop-color)$/.test(p) ? 'a' : 'b'));
// latar cerah (kuning, hijau, dsb.) di aturan yang sama: warna teksnya dibiarkan supaya tetap kontras
function thVivid(st) {
  const v = st.getPropertyValue('background-color') + ' ' + st.getPropertyValue('background-image') + ' ' + st.getPropertyValue('background');
  return (v.match(CRX) || []).some((m) => {
    const c = thRgb(m.toLowerCase());
    if (c[3] != null && c[3] < 0.6) return false;
    const [L, C] = thLch(c[0], c[1], c[2]);
    return C > 0.1 && L > 0.55;
  });
}
function thScan() {
  THO = [];
  const walk = (rs) => {
    for (const r of rs) {
      if (r.media && /print/.test(r.media.mediaText)) continue; // hasil cetak tetap terang
      if (r.cssRules) walk(r.cssRules);
      // aturan khusus tema gelap (html.dark) sudah ditulis untuk gelap, jadi tidak diubah lagi
      if (!r.style || THKEEP.test(r.selectorText || '') || /html\.dark/.test(r.selectorText || '')) continue;
      CRX.lastIndex = 0;
      if (!CRX.test(r.style.cssText) && !THVAR.test(r.style.cssText)) continue; // aturan tanpa warna dilewati cepat
      const keepTx = thVivid(r.style);
      for (let i = 0; i < r.style.length; i++) {
        const p = r.style[i],
          v = r.style.getPropertyValue(p);
        CRX.lastIndex = 0;
        if (keepTx && THTX.test(p)) continue;
        if (v && (CRX.test(v) || (THTX.test(p) && THVAR.test(v)))) THO.push([r.style, p, v, r.style.getPropertyPriority(p)]);
      }
      // shorthand yang memakai var() tidak terurai ke longhand, jadi dibaca utuh
      for (const p of THSH) {
        const v = r.style.getPropertyValue(p);
        CRX.lastIndex = 0;
        if (v && v.includes('var(') && CRX.test(v)) THO.push([r.style, p, v, r.style.getPropertyPriority(p)]);
      }
    }
  };
  for (const sh of document.styleSheets) {
    try {
      walk(sh.cssRules);
    } catch (e) {}
  }
}
// atribut style di elemen halaman (bukan di dalam ilustrasi SVG)
function thEl(el, on) {
  if (el.__th === on) return;
  if (el.__th0 == null) el.__th0 = el.getAttribute('style') || '';
  el.setAttribute('style', el.__th0);
  if (on) {
    const st = el.style,
      keepTx = thVivid(st);
    for (let i = 0; i < st.length; i++) {
      const p = st[i],
        v = st.getPropertyValue(p);
      CRX.lastIndex = 0;
      if (keepTx && THTX.test(p)) continue;
      if (v && (CRX.test(v) || (THTX.test(p) && THVAR.test(v)))) st.setProperty(p, thStr(v, p), st.getPropertyPriority(p));
    }
  }
  el.__th = on;
}
function thTree(root, on) {
  if (root.nodeType != 1) return;
  const ok = (e) => !(e instanceof SVGElement) && !e.closest('.stpg,.pg');
  if (root.hasAttribute('style') && ok(root)) thEl(root, on);
  root.querySelectorAll('[style]').forEach((e) => ok(e) && thEl(e, on));
}
// dibuka dari file: CSSOM diblokir, jadi pakai salinan gelap yang sudah jadi (style-dark.css, dibuat tests/build-dark.js)
function thFileCss(on) {
  let l = document.getElementById('dcss');
  if (on && !l) {
    l = document.createElement('link');
    l.rel = 'stylesheet';
    l.id = 'dcss';
    l.href = 'style-dark.css';
    const m = document.querySelector('link[href$="style.css"]');
    m ? m.after(l) : document.head.appendChild(l);
  }
  if (!on && l) l.remove();
}
const thMode = (k) => (k == 'dark' || (k == 'auto' && MQD.matches) ? 1 : 0);
function thApply(k) {
  const on = thMode(k);
  if (on == THK) return;
  if (THFILE) thFileCss(on);
  else {
    if (!THO) thScan();
    for (const [st, p, v, pr] of THO) st.setProperty(p, on ? thStr(v, p) : v, pr);
  }
  thTree(document.body, on);
  if (on && !THMO) {
    THMO = new MutationObserver((ms) => {
      if (!THK) return;
      for (const m of ms) for (const n of m.addedNodes) thTree(n, 1);
    });
    THMO.observe(document.body, { childList: true, subtree: true });
  }
  const h = document.documentElement;
  h.classList.toggle('dark', !!on);
  h.style.colorScheme = on ? 'dark' : '';
  const mt = document.querySelector('meta[name="theme-color"]');
  if (mt) mt.content = on ? '#0f1a33' : '#2d6fd6';
  THK = on;
}
MQD.addEventListener && MQD.addEventListener('change', () => setG().th == 'auto' && thApply('auto'));
// cetak (PDF portofolio, rapor) selalu pakai tampilan terang
window.addEventListener('beforeprint', () => THK && thApply('light'));
window.addEventListener('afterprint', () => thApply(setG().th));

/* ---------- musik latar ----------
   Dibuat langsung di browser lewat Web Audio (tanpa file lagu), jadi ringan, bebas hak cipta, dan tetap jalan offline.
   Berhenti sendiri saat tab disembunyikan, dan dipelankan saat video YouTube sedang terbuka. */
const MUSK = {
  lofi: ['Lo-fi santai', 'music', 'Ketukan pelan buat nemenin belajar'],
  piano: ['Piano tenang', 'piano', 'Denting lembut, nggak ganggu fokus'],
  hujan: ['Suara hujan', 'drop', 'Rintik hujan di luar jendela'],
  ombak: ['Ombak pantai', 'wave', 'Deburan ombak yang pelan'],
};
const MU = { k: '', out: null, bus: null, rv: null, src: [], nx: 0, st: 0, iv: 0, dk: 1, nz: {} };
const mtof = (n) => 440 * Math.pow(2, (n - 69) / 12);
function muCtx() {
  AC = AC || new (window.AudioContext || window.webkitAudioContext)();
  if (AC.state == 'suspended') AC.resume();
  return AC;
}
function muNoise(kind) {
  if (MU.nz[kind]) return MU.nz[kind];
  const sr = AC.sampleRate,
    n = sr * (kind == 'crk' ? 4 : 3),
    b = AC.createBuffer(1, n, sr),
    d = b.getChannelData(0);
  let last = 0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    if (kind == 'white') d[i] = w;
    else if (kind == 'brown') {
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    } else d[i] = Math.random() < 0.00035 ? (Math.random() * 2 - 1) * 0.7 : w * 0.012; // derak piringan hitam
  }
  return (MU.nz[kind] = b);
}
function muLoop(kind, chain, vol) {
  const s = AC.createBufferSource(),
    g = AC.createGain();
  s.buffer = muNoise(kind);
  s.loop = true;
  g.gain.value = vol;
  let x = s;
  for (const f of chain) {
    const bq = AC.createBiquadFilter();
    bq.type = f[0];
    bq.frequency.value = f[1];
    if (f[2]) bq.Q.value = f[2];
    x.connect(bq);
    x = bq;
  }
  x.connect(g).connect(MU.out);
  s.start();
  MU.src.push(s);
  return { s, g, last: x };
}
function muLfo(param, hz, amt) {
  const o = AC.createOscillator(),
    g = AC.createGain();
  o.frequency.value = hz;
  g.gain.value = amt;
  o.connect(g).connect(param);
  o.start();
  MU.src.push(o);
}
function muTone(f, t, d, v, typ, cut, atk, wet) {
  const o = AC.createOscillator(),
    g = AC.createGain(),
    lp = AC.createBiquadFilter();
  o.type = typ || 'sine';
  o.frequency.value = f;
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(cut || 2400, t);
  lp.frequency.exponentialRampToValueAtTime(Math.max(300, (cut || 2400) * 0.35), t + d);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(v, t + (atk || 0.01));
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(lp).connect(g);
  g.connect(MU.bus);
  if (wet !== 0) g.connect(MU.rv);
  o.start(t);
  o.stop(t + d + 0.05);
}
function muPad(ns, t, d, v) {
  for (const n of ns)
    for (const dt of [-7, 7]) {
      const o = AC.createOscillator(),
        g = AC.createGain(),
        lp = AC.createBiquadFilter();
      o.type = 'triangle';
      o.frequency.value = mtof(n);
      o.detune.value = dt;
      lp.type = 'lowpass';
      lp.frequency.value = 900;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v, t + 0.9);
      g.gain.setValueAtTime(v, t + d - 0.5);
      g.gain.linearRampToValueAtTime(0, t + d + 0.4);
      o.connect(lp).connect(g);
      g.connect(MU.bus);
      g.connect(MU.rv);
      o.start(t);
      o.stop(t + d + 0.5);
    }
}
function muHit(t, kind) {
  if (kind == 'kick') {
    const o = AC.createOscillator(),
      g = AC.createGain();
    o.frequency.setValueAtTime(115, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.22);
    g.gain.setValueAtTime(0.26, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    o.connect(g).connect(MU.bus);
    o.start(t);
    o.stop(t + 0.35);
    return;
  }
  const s = AC.createBufferSource(),
    f = AC.createBiquadFilter(),
    g = AC.createGain(),
    d = kind == 'hat' ? 0.05 : 0.2;
  s.buffer = muNoise('white');
  f.type = kind == 'hat' ? 'highpass' : 'bandpass';
  f.frequency.value = kind == 'hat' ? 7000 : 1700;
  g.gain.setValueAtTime(kind == 'hat' ? 0.03 : 0.07, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  s.connect(f).connect(g).connect(MU.bus);
  s.start(t, Math.random() * 2, d + 0.05);
}
function muDrop(t) {
  const o = AC.createOscillator(),
    g = AC.createGain(),
    f = 1500 + Math.random() * 2600;
  o.frequency.setValueAtTime(f, t);
  o.frequency.exponentialRampToValueAtTime(f * 0.55, t + 0.04);
  g.gain.setValueAtTime(0.012 + Math.random() * 0.02, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(g).connect(MU.bus);
  o.start(t);
  o.stop(t + 0.07);
}
const LOFI = [
  [53, 57, 60, 64],
  [52, 55, 59, 62],
  [50, 53, 57, 60],
  [48, 52, 55, 59],
];
const PIANO = [
  [48, 60, 64, 67, 72],
  [45, 57, 60, 64, 69],
  [41, 53, 57, 60, 65],
  [43, 55, 59, 62, 67],
];
const PENT = [72, 74, 76, 79, 81, 84];
function muStep(t) {
  const k = MU.k,
    s = MU.st;
  if (k == 'lofi') {
    const sp = 60 / 72 / 2,
      pos = s % 8,
      ch = LOFI[Math.floor(s / 8) % 4],
      sw = pos % 2 ? sp * 0.14 : 0;
    if (pos == 0) {
      muPad(ch, t, sp * 8, 0.022);
      muTone(mtof(ch[0] - 12), t, 1.5, 0.15, 'sine', 500, 0.02, 0);
    }
    if (pos == 5) muTone(mtof(ch[0] - 12), t + sw, 0.9, 0.11, 'sine', 500, 0.02, 0);
    if (pos == 0 || pos == 4) muHit(t, 'kick');
    if (pos == 2 || pos == 6) muHit(t, 'snr');
    if (pos % 2) muHit(t + sw, 'hat');
    if (Math.random() < (pos % 2 ? 0.18 : 0.34)) {
      const n = Math.random() < 0.6 ? ch[1 + Math.floor(Math.random() * 3)] + 12 : PENT[Math.floor(Math.random() * PENT.length)];
      muTone(mtof(n), t + sw, 1.1, 0.05, 'triangle', 1900, 0.008);
      muTone(mtof(n + 12), t + sw, 0.5, 0.012, 'sine', 3000, 0.008);
    }
    return sp;
  }
  if (k == 'piano') {
    const sp = 60 / 64 / 2,
      pos = s % 8,
      ch = PIANO[Math.floor(s / 8) % 4];
    const pno = (n, tt, v) => {
      muTone(mtof(n), tt, 2.8, v, 'triangle', 2600, 0.006);
      muTone(mtof(n) * 2, tt, 1.2, v * 0.18, 'sine', 4000, 0.006);
    };
    if (pos == 0) pno(ch[0], t, 0.11);
    if (pos % 2 == 0 && Math.random() < 0.9) pno(ch[1 + pos / 2], t, 0.055);
    if (pos % 2 && Math.random() < 0.22) pno(PENT[Math.floor(Math.random() * PENT.length)], t, 0.045);
    return sp;
  }
  if (k == 'hujan') {
    if (Math.random() < 0.7) muDrop(t + Math.random() * 0.1);
    return 0.1;
  }
  return 0.5;
}
function muTick() {
  if (!MU.k || !AC || AC.state != 'running') return;
  const ahead = AC.currentTime + 0.7;
  if (MU.nx < AC.currentTime) MU.nx = AC.currentTime + 0.05;
  while (MU.nx < ahead) {
    MU.nx += muStep(MU.nx);
    MU.st++;
  }
  const want = setG().duck && document.querySelector('iframe[src*="youtube"]') ? 0.08 : 1;
  if (want != MU.dk) {
    MU.dk = want;
    muVol();
  }
}
const MULV = { lofi: 1, piano: 1.5, hujan: 0.45, ombak: 0.5 }; // samakan keras-pelan antarmusik
const muLvl = () => Math.pow(setG().mv / 100, 1.5) * 2 * (MULV[MU.k] || 1) * MU.dk;
function muVol() {
  if (MU.out) MU.out.gain.setTargetAtTime(muLvl(), AC.currentTime, 0.3);
}
function muStop() {
  if (!MU.k) return;
  const out = MU.out,
    src = MU.src;
  MU.k = '';
  MU.src = [];
  MU.out = null;
  clearInterval(MU.iv);
  out.gain.setTargetAtTime(0, AC.currentTime, 0.15);
  setTimeout(() => {
    src.forEach((x) => {
      try {
        x.stop();
      } catch (e) {}
    });
    out.disconnect();
  }, 700);
}
function muStart(k) {
  muCtx();
  MU.k = k;
  MU.st = 0;
  MU.dk = 1;
  MU.out = AC.createGain();
  MU.out.gain.value = 0;
  {
    const lim = AC.createDynamicsCompressor(); // jaga supaya tidak pecah
    lim.threshold.value = -8;
    lim.ratio.value = 12;
    MU.out.connect(lim).connect(AC.destination);
  }
  MU.bus = AC.createGain();
  MU.bus.connect(MU.out);
  MU.rv = AC.createConvolver();
  {
    const sr = AC.sampleRate,
      n = sr * 2.4,
      ir = AC.createBuffer(2, n, sr);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
    }
    MU.rv.buffer = ir;
  }
  const wet = AC.createGain();
  wet.gain.value = k == 'piano' ? 0.5 : 0.28;
  MU.rv.connect(wet).connect(MU.out);
  if (k == 'lofi') muLoop('crk', [['lowpass', 5000]], 0.5);
  if (k == 'hujan') {
    const a = muLoop('white', [['highpass', 450], ['lowpass', 2600]], 0.32);
    muLoop('brown', [['lowpass', 480]], 0.5);
    muLfo(a.last.frequency, 0.06, 500);
  }
  if (k == 'ombak') {
    const a = muLoop('brown', [['lowpass', 650]], 0.34),
      b = muLoop('white', [['highpass', 1800], ['lowpass', 5200]], 0.05);
    muLfo(a.g.gain, 0.085, 0.3);
    muLfo(b.g.gain, 0.085, 0.045);
  }
  MU.nx = AC.currentTime + 0.15;
  MU.out.gain.setTargetAtTime(muLvl(), AC.currentTime, 0.8);
  MU.iv = setInterval(muTick, 200);
  muTick();
}
function muSync() {
  const k = MUSK[setG().mus] ? setG().mus : '';
  if (k == MU.k) return muVol();
  muStop();
  if (k) muStart(k);
}
// Browser baru mengizinkan suara setelah ada sentuhan/klik pertama.
['pointerdown', 'keydown'].forEach((ev) =>
  document.addEventListener(
    ev,
    () => {
      if (setG().mus && !MU.k) muSync();
    },
    { passive: true },
  ),
);
document.addEventListener('visibilitychange', () => {
  if (!AC || !MU.k) return;
  if (document.hidden) AC.suspend();
  else AC.resume();
});

/* ---------- suara efek dan getar ---------- */
let SFXG = null;
function sfxOut() {
  if (!SFXG) {
    SFXG = AC.createGain();
    SFXG.connect(AC.destination);
  }
  SFXG.gain.value = (setG().sv / 70) * 1.0;
  return SFXG;
}
{
  const sfx0 = sfx;
  sfx = function (t) {
    const s = setG();
    if (VIBOK && s.vib && (t == 'ok' || t == 'no'))
      try {
        navigator.vibrate(t == 'ok' ? 14 : [24, 40, 24]);
      } catch (e) {}
    if (!s.sound || !s.sv) return;
    return sfx0(t);
  };
}

/* ---------- terapkan ---------- */
function setApply() {
  const s = setG(),
    h = document.documentElement;
  h.dataset.fs = s.fs;
  h.classList.toggle('calm', !!s.calm);
  h.classList.toggle('lite', LITE0 || !!s.calm);
  h.classList.toggle('hc', !!s.hc);
  h.classList.toggle('sp', !!s.sp);
  h.classList.toggle('nofx', s.fx === 0);
  h.classList.toggle('navr', s.nav == 'radial');
  thApply(s.th);
  h.classList.toggle('dark', !!THK); // rapikan kelas yang dipasang lebih awal dari <head>
  try {
    localStorage.setItem('pdc_th', s.th); // dibaca skrip kecil di <head> saat halaman berikutnya dibuka
  } catch (e) {}
  if (MU.k || (s.mus && AC && AC.state == 'running')) muSync();
}
let SETTAB = 'tam';
function setRe(top) {
  const b = document.getElementById('shb'),
    sh = document.getElementById('sh');
  if (!b || !sh.classList.contains('on') || document.getElementById('sht').textContent != 'Pengaturan') return sheet('set');
  const y = b.scrollTop;
  b.innerHTML = setSheet();
  b.scrollTop = top ? 0 : y;
}
function setOpt(k, v) {
  S.set = Object.assign(setG(), { [k]: v });
  save();
  setApply();
  if (k == 'sound' && v) sfx('ok');
  if (k == 'mus') muSync();
  setRe();
}
function setVol(k, v, done) {
  S.set = Object.assign(setG(), { [k]: +v });
  if (k == 'mv') muVol();
  const o = document.getElementById('sv-' + k);
  if (o) o.textContent = v + '%';
  if (done) {
    save();
    if (k == 'sv') sfx('ok');
  }
}
function setTabGo(k) {
  SETTAB = k;
  setRe(1);
  const t = document.querySelector('.settabs .on');
  if (t) t.focus({ preventScroll: true });
}
function setSide(v) {
  try {
    if (v) localStorage.setItem('pdc_side', v);
    else localStorage.removeItem('pdc_side');
  } catch (e) {}
  sideMode();
  sideR();
  setRe();
}
function setTour() {
  S.tour = {};
  save();
  closeSh();
  toast('Tur panduan bakal muncul lagi di tiap halaman.', 'chk');
  setTimeout(() => tourStart(cur.r == 'materi' ? 'materi' : 'home', 1), 350);
}
function setDef() {
  if (!confirm('Kembalikan semua pengaturan ke bawaan? Progres belajar tidak ikut terhapus.')) return;
  S.set = {};
  save();
  setSide('');
  setApply();
  muSync();
  setRe();
  toast('Pengaturan balik ke bawaan.', 'chk');
}
async function setUpd() {
  if (!navigator.onLine) return toast('Lagi offline. Sambungkan internet dulu ya.', 'warn');
  toast('Ngambil versi terbaru...', 'dl');
  try {
    const reg = navigator.serviceWorker && (await navigator.serviceWorker.getRegistration());
    if (reg) await reg.update();
    if (window.caches)
      for (const k of await caches.keys()) {
        if (!/^foliokit-/.test(k)) continue;
        const c = await caches.open(k);
        await Promise.all(
          (await c.keys()).map((q) =>
            fetch(q.url, { cache: 'reload' })
              .then((r) => r.ok && c.put(q, r))
              .catch(() => {}),
          ),
        );
      }
  } catch (e) {}
  setTimeout(() => location.reload(), 400);
}
async function setInfo() {
  const of = document.getElementById('set-of'),
    st = document.getElementById('set-st');
  if (of) {
    let ok = false;
    try {
      ok = !!(navigator.serviceWorker && navigator.serviceWorker.controller) || (window.caches && (await caches.keys()).some((k) => /^foliokit-/.test(k)));
    } catch (e) {}
    of.textContent = ok ? 'Siap. FolioKit bisa dibuka tanpa internet di browser ini.' : 'Belum siap. Buka sekali saat online, nanti tersimpan sendiri.';
  }
  if (st && navigator.storage && navigator.storage.estimate)
    try {
      const e = await navigator.storage.estimate();
      st.textContent = `Terpakai sekitar ${(e.usage / 1048576).toFixed(1)} MB untuk materi offline dan progres.`;
    } catch (e) {}
}
function setSheet() {
  const s = setG();
  let side = '';
  try {
    side = localStorage.getItem('pdc_side') || '';
  } catch (e) {}
  const lit = (v) => (typeof v == 'number' ? String(v) : `'${v}'`);
  const seg = (fn, opts, cur) =>
    `<div class="setseg" role="group">${opts.map((o) => `<button class="${cur === o[0] ? 'on' : ''}" aria-pressed="${cur === o[0]}" onclick="${fn.replace('$V', lit(o[0]))}">${o[1]}</button>`).join('')}</div>`;
  const row = (ic, t, d, ctl, x) => `<div class="setr ${x || ''}"><span class="ic">${I(ic)}</span><div class="sett"><b>${t}</b><small>${d}</small></div>${ctl}</div>`;
  const rng = (k, lbl, dis) =>
    `<div class="setrg"><input type="range" min="0" max="100" step="5" value="${s[k]}" aria-label="${lbl}" ${dis ? 'disabled' : ''} oninput="setVol('${k}',this.value)" onchange="setVol('${k}',this.value,1)"><output id="sv-${k}">${s[k]}%</output></div>`;
  const TABS = [
    ['tam', 'pal', 'Tampilan'],
    ['sua', 'music', 'Suara'],
    ['bel', 'book', 'Belajar'],
    ['dat', 'cloud', 'Data'],
  ];
  const tabs = `<div class="settabs" role="tablist">${TABS.map((t) => `<button role="tab" aria-selected="${SETTAB == t[0]}" class="${SETTAB == t[0] ? 'on' : ''}" onclick="setTabGo('${t[0]}')">${I(t[1])}<span>${t[2]}</span></button>`).join('')}</div>`;
  let body = '';
  if (SETTAB == 'tam') {
    body =
      row('pal', 'Tema', 'Ikuti perangkat: ikut mode terang/gelap HP atau laptopmu.', seg("setOpt('th',$V)", [['light', 'Terang'], ['dark', 'Gelap'], ['auto', 'Ikuti perangkat']], s.th)) +
      row('doc', 'Ukuran teks', 'Gedein kalau tulisannya kekecilan.', seg("setOpt('fs',$V)", [['sm', 'Kecil'], ['md', 'Normal'], ['lg', 'Besar'], ['xl', 'Paling besar']], s.fs)) +
      row('lines', 'Spasi baca', 'Jarak antarbaris dan antarkata lebih lega, enak buat bacaan panjang.', seg("setOpt('sp',$V)", [[0, 'Normal'], [1, 'Lega']], s.sp)) +
      row('eye', 'Kontras lebih tegas', 'Teks abu-abu dan garis jadi lebih gelap.', seg("setOpt('hc',$V)", [[0, 'Mati'], [1, 'Nyala']], s.hc)) +
      row('spark', 'Animasi', 'Pilih Tenang kalau bikin pusing atau HP terasa berat.', seg("setOpt('calm',$V)", [[0, 'Biasa'], [1, 'Tenang']], s.calm)) +
      row('target', 'Efek kursor & scroll', 'Tombol ketarik halus ke arah kursor, riak saat klik, dan isi yang muncul halus saat digulir.', seg("setOpt('fx',$V)", [[1, 'Nyala'], [0, 'Mati']], s.fx)) +
      row('grid', 'Gaya menu', 'Sidebar: menu selalu di kiri. Radial: menu melingkar dari tombol ☰ di atas, layar jadi lebih lega.', seg("setOpt('nav',$V);sideR&&sideR()", [['side', 'Sidebar'], ['radial', 'Radial']], s.nav)) +
      row('grid', 'Sidebar di laptop', 'Mau lebar, cuma ikon, atau ikut ukuran layar.', seg('setSide($V)', [['', 'Otomatis'], ['max', 'Lebar'], ['min', 'Ikon saja']], side));
  } else if (SETTAB == 'sua') {
    const mus = [['', 'Mati', 'mute', 'Sepi aja']].concat(Object.keys(MUSK).map((k) => [k, MUSK[k][0], MUSK[k][1], MUSK[k][2]]));
    body =
      row(
        'music',
        'Musik latar',
        'Dibuat langsung di browser, jadi tetap jalan saat offline. Berhenti sendiri kalau tab ditinggal.',
        `<div class="mugrid">${mus.map((m) => `<button class="muop ${s.mus == m[0] ? 'on' : ''}" aria-pressed="${s.mus == m[0]}" onclick="setOpt('mus','${m[0]}')"><span class="ic">${I(m[2])}</span><b>${m[1]}</b><small>${m[3]}</small>${s.mus == m[0] && m[0] ? '<i class="eq" aria-hidden="true"><u></u><u></u><u></u></i>' : ''}</button>`).join('')}</div>`,
        'full',
      ) +
      row('vol', 'Volume musik', s.mus ? 'Geser sampai pas di telinga.' : 'Pilih musik dulu di atas.', rng('mv', 'Volume musik', !s.mus)) +
      row('play', 'Pelankan saat video diputar', 'Musik otomatis mengecil waktu kamu buka video materi.', seg("setOpt('duck',$V)", [[1, 'Nyala'], [0, 'Mati']], s.duck)) +
      row('spark', 'Suara efek', 'Bunyi kecil waktu klik dan jawab benar atau salah.', seg("setOpt('sound',$V)", [[1, 'Nyala'], [0, 'Mati']], s.sound)) +
      row('vol', 'Volume suara efek', s.sound ? 'Lepas slider buat dengar contohnya.' : 'Suara efek lagi mati.', rng('sv', 'Volume suara efek', !s.sound)) +
      (VIBOK ? row('phone', 'Getar', 'HP bergetar pelan waktu jawaban benar atau salah.', seg("setOpt('vib',$V)", [[1, 'Nyala'], [0, 'Mati']], s.vib)) : '');
  } else if (SETTAB == 'bel') {
    body =
      row('book', 'Cara baca materi', 'Cerita: slide satu per satu. Ringkasan: semua poin dalam satu halaman.', seg("S.mode=$V;save();setRe()", [['story', 'Cerita'], ['list', 'Ringkasan']], S.mode || 'story')) +
      row('info', 'Tur panduan', 'Tampilkan lagi petunjuk singkat di tiap halaman.', `<button class="btn g sm" onclick="setTour()">Ulangi tur</button>`) +
      row('chat', 'Tanya Kak Folio', 'Bingung soal materi atau Canva? Tanya di sini.', `<button class="btn g sm" onclick="sheet('ai')">Buka</button>`) +
      row('target', 'Peta materi', 'Lihat semua materi dan mana yang udah kelar.', `<button class="btn g sm" onclick="sheet('mlist')">Lihat</button>`);
  } else {
    body =
      row('cloud', 'Versi offline', '<span id="set-of">Ngecek...</span>', `<button class="btn g sm" onclick="setUpd()">${I('rst')} Perbarui sekarang</button>`) +
      row('dl', 'Penyimpanan', '<span id="set-st">Progres tersimpan di browser ini.</span>', `<button class="btn g sm" onclick="sheet('acc')">Cadangkan progres</button>`) +
      row('gear', 'Pengaturan bawaan', 'Balikin tema, suara, dan tampilan ke awal. Progres aman.', `<button class="btn g sm" onclick="setDef()">Kembalikan</button>`) +
      row('rst', 'Mulai dari awal', 'Hapus semua progres di browser ini.', `<button class="btn g sm" onclick="sheet('reset')">Hapus progres</button>`);
    setTimeout(setInfo, 0);
  }
  return `${tabs}<div class="setbody">${body}</div>`;
}
setApply();

/* ===== Efek kursor dan scroll =====
   Kursor (hanya mouse/trackpad): tombol ketarik halus ke arah kursor (magnet) dan riak kecil saat klik.
   Kursor asli tetap dipakai.
   Scroll: isi yang belum kelihatan muncul dengan zoom memantul saat digulir.
   Mati otomatis di mode Animasi Tenang, perangkat lemah (.lite), prefers-reduced-motion, atau lewat Pengaturan. */
SETD.fx = 1;
// efek kursor & scroll ringan, jadi tetap nyala di perangkat yang terdeteksi lemah (.lite); mati lewat setelan, mode Tenang, atau reduced motion
const fxOn = () => setG().fx && !setG().calm && !RM.matches;
{
  const FINE = matchMedia('(pointer: fine)').matches;
  /* magnet: tombol ketarik halus ke arah kursor (pakai properti translate, jadi tidak bentrok dengan transform lain) */
  // semua yang bisa diklik ikut; makin lebar elemennya makin kecil geserannya
  const MAG = 'button, a[href], [role="button"], [onclick], label, summary, .knote';
  let magEl = null;
  // kotak terdekat yang memotong isinya (overflow selain visible)
  const magClip = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.overflowX != 'visible' || s.overflowY != 'visible') return a.getBoundingClientRect();
    }
    return null;
  };
  const magOff = () => {
    if (!magEl) return;
    const el = magEl;
    el.style.translate = '';
    el.__mx = el.__my = 0;
    magBox = null;
    setTimeout(() => el !== magEl && el.classList.remove('mag'), 260); // balik pelan dulu baru lepas transisinya
    magEl = null;
  };
  let magBox = null,
    magEv = null,
    magRaf = 0;
  const magEnter = (el) => {
    const r = el.getBoundingClientRect();
    const mx = el.__mx || 0,
      my = el.__my || 0;
    const r0 = { l: r.left - mx, r: r.right - mx, t: r.top - my, b: r.bottom - my, w: r.width, h: r.height };
    const big = Math.max(r.width, r.height * 2);
    r0.max = big > 400 ? 2 : big > 180 ? 4 : Math.min(10, Math.max(4, r.width / 12));
    r0.cl = magClip(el);
    return r0;
  };
  const magFrame = () => {
    magRaf = 0;
    const e = magEv;
    if (!e || !magEl || !magBox) return;
    const B = magBox,
      max = B.max;
    let dx = Math.max(-max, Math.min(max, (e.clientX - (B.l + B.w / 2)) * 0.3));
    let dy = Math.max(-max, Math.min(max, (e.clientY - (B.t + B.h / 2)) * 0.3));
    // jangan sampai tombol kepotong oleh pembungkus yang overflow-nya disembunyikan/digulir
    const cl = B.cl;
    if (cl) {
      dx = Math.max(Math.min(dx, cl.right - 2 - B.r), cl.left + 2 - B.l);
      dy = Math.max(Math.min(dy, cl.bottom - 2 - B.b), cl.top + 2 - B.t);
      if (B.l < cl.left || B.r > cl.right) dx = 0;
      if (B.t < cl.top || B.b > cl.bottom) dy = 0;
    }
    magEl.__mx = dx;
    magEl.__my = dy;
    magEl.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
  };
  if (FINE) {
    document.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType != 'mouse' || !fxOn()) return magOff();
        const t = e.target.closest && e.target.closest(MAG);
        if (t !== magEl) {
          magOff();
          if (!t || t.disabled) return;
          const B = magEnter(t);
          if (B.w > 760 || B.h > 260) return; // area klik raksasa tidak digeser
          magEl = t;
          magBox = B;
          t.classList.add('mag');
        }
        if (!magEl) return;
        magEv = e;
        if (!magRaf) magRaf = requestAnimationFrame(magFrame);
      },
      { passive: true },
    );
    // posisi tombol berubah saat digulir: lepas magnet supaya dihitung ulang
    document.addEventListener('scroll', () => magOff(), { capture: true, passive: true });
    document.addEventListener('pointerdown', (e) => {
      if (e.pointerType != 'mouse' || !fxOn()) return;
      const r = document.createElement('i');
      r.className = 'curRip';
      r.setAttribute('aria-hidden', 'true');
      r.style.left = e.clientX + 'px';
      r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
    document.documentElement.addEventListener('mouseleave', magOff);
    window.addEventListener('blur', magOff);
  }

  // isi di bawah lipatan (belum kelihatan) diberi kelas .rv lalu muncul saat masuk layar
  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (es) => {
            // berulang: keluar layar = disembunyikan lagi, masuk lagi = muncul memantul lagi.
            // yang masuk bersamaan muncul berurutan (jeda 70ms, maksimal 6 jeda)
            let k = 0;
            es.forEach((x) => {
              const el = x.target;
              // baru muncul setelah sepertiga bagiannya masuk, jadi gerakannya terjadi di depan mata, bukan di tepi
              if (!x.isIntersecting || x.intersectionRatio < 0.02) {
                el.style.transitionDelay = '';
                el.classList.remove('in');
              } else if (x.intersectionRatio >= 0.3 && !el.classList.contains('in')) {
                el.style.transitionDelay = Math.min(k++, 6) * 90 + 'ms';
                el.classList.add('in');
              }
            });
          },
          { threshold: [0, 0.02, 0.3] },
        )
      : null;
  const SEL = '.card, .opt, .setr, .muop, li, .knote, .kv > *, .stitem, .tln > *, .refs a, .mi, .bdg, .chip, .stx2, .pchki, .ckl > *, .qk, .hst, .tag, .vcard, .src a, .srcv, .ahint, .pf, p, h2, h3, img, figure, details, blockquote, table, .row';
  const rvScan = (root) => {
    if (!io || !root || !fxOn()) return;
    const vh = innerHeight;
    const cand = new Set(root.querySelectorAll(SEL));
    root.querySelectorAll('*').forEach((a) => {
      if (a.scrollHeight <= a.clientHeight + 4) return;
      const s = getComputedStyle(a).overflowY;
      if (s != 'auto' && s != 'scroll') return;
      for (const k of a.children) if (k.offsetHeight > 20) cand.add(k);
    });
    // pembungkus yang berisi kandidat lain dilewati, supaya yang beranimasi itu item-itemnya (kelihatan berurutan), bukan satu blok besar
    const wrap = new Set();
    cand.forEach((c) => {
      for (let p = c.parentElement; p && p !== root; p = p.parentElement) {
        if (wrap.has(p)) break;
        wrap.add(p);
      }
    });
    [...cand].forEach((el) => {
      if (wrap.has(el) || (el.parentElement && el.parentElement.closest('.rv'))) return;
      if (el.classList.contains('rv') || el.closest('.stpg,.pg,svg,.sld:not(.on)')) return;
      const r = el.getBoundingClientRect();
      let lim = vh;
      for (let a = el.parentElement; a && a !== root.parentElement; a = a.parentElement) {
        if (/(auto|scroll)/.test(getComputedStyle(a).overflowY)) {
          lim = Math.min(vh, a.getBoundingClientRect().bottom);
          break;
        }
      }
      if (!r.height) return;
      // yang sudah kelihatan langsung tampil (tanpa animasi pertama), tapi tetap ikut efek saat digulir bolak-balik
      if (r.top < lim - 4) el.classList.add('rv', 'in');
      else el.classList.add('rv');
      io.observe(el);
    });
  };
  let rvT = 0;
  const rvIdle = window.requestIdleCallback ? (f) => requestIdleCallback(f, { timeout: 500 }) : (f) => setTimeout(f, 0);
  new MutationObserver((ms) => {
    // abaikan elemen kecil yang datang dan pergi (riak klik, toast, garis progres)
    if (ms.every((m) => [...m.addedNodes, ...m.removedNodes].every((n) => n.nodeType != 1 || n.matches('.curRip,#toast,.toast,i')))) return;
    if (!fxOn()) return;
    clearTimeout(rvT);
    rvT = setTimeout(() => rvIdle(() => {
      rvScan(document.getElementById('view'));
      const sh = document.getElementById('sh');
      if (sh && sh.classList.contains('on')) rvScan(sh);
    }), 120);
  }).observe(document.body, { childList: true, subtree: true });
}

/* ===== Menu radial (HP dan tablet berdiri) =====
   Tombol ☰ di header membuka sheet 'radial': menu melingkar yang keluar dari tengah layar.
   Tombol tutup (×) jadi lingkaran di tengah. Karena memakai sheet biasa, kunci fokus, Esc, dan tombol kembali tetap jalan.
   "Menu lengkap" membuka laci menu lama (sheet 'menu') yang berisi pencarian dan semua bantuan. */
function radSheet() {
  const r = cur.r;
  const L = [
    ['home', 'Beranda', r == 'home', "go('home')", 0],
    ['book', 'Materi', r == 'materi', "go('materi',firstM())", 0],
    ['task', 'Aktivitas', r == 'akt' || /^a\d$/.test(r), "go('akt')", lock('akt')],
    ['lap', 'Praktik', r == 'praktik', "go('praktik')", lock('praktik')],
    ['flag', 'Evaluasi', r == 'evaluasi', "go('evaluasi')", lock('evaluasi')],
    ['ref', 'Refleksi', r == 'refleksi', "go('refleksi')", lock('refleksi')],
    ['star', 'Rapor', r == 'rapor', "go('rapor')", 0],
    ['spark', 'Studio', r == 'studio', "go('studio')", 0],
    ['chat', 'Kak Folio', 0, "sheet('ai')", 0, 1],
    ['grid', 'Lainnya', 0, "sheet('menu')", 0, 1],
  ];
  const n = L.length;
  return `<div class="rad" style="--n:${n}">${L.map((x, i) => {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
    // klik: tutup dulu (kecuali yang membuka jendela lain), lalu pindah halaman
    const on = x[5] ? x[3] : `closeSh();${x[3]}`;
    return `<button class="radi ${x[2] ? 'on' : ''} ${x[4] ? 'lk' : ''}" style="--i:${i};--cx:${Math.cos(a).toFixed(3)};--cy:${Math.sin(a).toFixed(3)}" onclick="${on}" aria-label="${x[1]}${x[4] ? ' (terkunci)' : ''}"${x[2] ? ' aria-current="page"' : ''}><span class="radc">${I(x[4] ? 'lock' : x[0])}</span><span class="radl">${x[1]}</span></button>`;
  }).join('')}</div>`;
}

// tombol ☰: buka menu sesuai setelan Gaya menu
function navMenu() {
  sheet(setG().nav == 'radial' ? 'radial' : 'menu');
}

/* ===== Efek belajar tambahan =====
   B angka berjalan (Beranda, Rapor), D kartu peta konsep terbalik saat dipilih, F selebrasi selesai materi,
   H petunjuk menu terkunci di sidebar. A (jawaban), C (lencana), E (progres), dan denyut tombol lanjut ada di CSS.
   Semua mati di mode Tenang dan reduced motion. */
const fxCalm = () => setG().calm || RM.matches;
/* B: angka berjalan dari 0 */
function cntUp(root) {
  if (!root || fxCalm()) return;
  root.querySelectorAll('b, strong, .num, .rnum').forEach((el) => {
    if (el.children.length || el.closest('.side,.top,svg,.stpg,.pg')) return;
    const m = el.textContent.trim().match(/^(\d{1,3})(%|\/\d{1,3})?$/);
    if (!m || +m[1] == 0) return;
    const to = +m[1],
      suf = m[2] || '',
      t0 = performance.now(),
      dur = 900;
    el.textContent = '0' + suf;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur),
        e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
['home', 'rapor'].forEach((r) => {
  const a0 = AFT[r];
  AFT[r] = function () {
    const o = a0 && a0.apply(this, arguments);
    setTimeout(() => cntUp(document.querySelector(`#view .scr[data-r="${r}"]`)), 60);
    return o;
  };
});
/* D: kartu peta konsep terbalik sekali saat dipilih */
{
  const k0 = kSel;
  kSel = function (k) {
    const o = k0.apply(this, arguments);
    if (!fxCalm()) {
      const n = document.querySelectorAll('.knote')[k];
      if (n) {
        n.classList.remove('kflip');
        void n.offsetWidth;
        n.classList.add('kflip');
        setTimeout(() => n.classList.remove('kflip'), 700);
      }
    }
    return o;
  };
}
/* F: selebrasi selesai materi */
{
  const d0 = doneM;
  doneM = function (i) {
    const was = S.md[i];
    const o = d0.apply(this, arguments);
    if (!was && !fxCalm()) {
      const el = document.createElement('div');
      el.className = 'mcele';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = `<span class="mck">${I('chk')}</span><b>Materi ${i + 1} beres</b><small>${i < 7 ? 'Lanjut ke Materi ' + (i + 2) : 'Semua materi selesai'}</small>`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1900);
    }
    return o;
  };
}
/* H: petunjuk menu terkunci (sidebar laptop): goyang kecil + alasan kenapa masih terkunci */
{
  const tip = document.createElement('div');
  tip.id = 'lktip';
  tip.setAttribute('role', 'tooltip');
  document.body.appendChild(tip);
  const why = (k) => lock(k == 'akt' ? 'akt' : k) || '';
  const show = (b) => {
    const t = why(b.dataset.k);
    if (!t) return;
    const r = b.getBoundingClientRect();
    tip.textContent = t;
    tip.style.left = r.right + 10 + 'px';
    tip.style.top = r.top + r.height / 2 + 'px';
    tip.classList.add('on');
    if (!fxCalm()) {
      b.classList.remove('lknud');
      void b.offsetWidth;
      b.classList.add('lknud');
    }
  };
  const hide = () => tip.classList.remove('on');
  document.addEventListener('pointerover', (e) => {
    const b = e.target.closest && e.target.closest('.side .sit.lk');
    b ? show(b) : hide();
  });
  document.addEventListener('focusin', (e) => {
    const b = e.target.closest && e.target.closest('.side .sit.lk');
    b ? show(b) : hide();
  });
  document.addEventListener('scroll', hide, { capture: true, passive: true });
}

/* ===== Kinerja: perangkat lemah =====
   Di perangkat yang terdeteksi lemah (.lite) atau mode Tenang, animasi hiasan yang berulang tanpa henti
   (gelombang, kilau, titik berdenyut) dihentikan beberapa detik setelah halaman/jendela dibuka, jadi saat diam layar benar-benar diam.
   Animasi yang punya fungsi (titik mengetik, putaran loading, bar musik) dibiarkan. */
function calmLoops() {
  if (!document.documentElement.classList.contains('lite')) return;
  document.getAnimations().forEach((a) => {
    const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : null,
      el = a.effect && a.effect.target;
    if (!t || t.iterations !== Infinity || a.playState != 'running' || !el || !el.closest) return;
    if (el.closest('#splash,.dots3,.dots,.eq,.run,.ldb,#ldb,.sh.radial')) return;
    a.pause();
  });
}
{
  let cT = 0;
  const later = () => {
    clearTimeout(cT);
    cT = setTimeout(calmLoops, 5000);
  };
  const g0 = go;
  go = function () {
    const o = g0.apply(this, arguments);
    later();
    return o;
  };
  const s0 = sheet;
  sheet = function () {
    const o = s0.apply(this, arguments);
    later();
    return o;
  };
  later();
}

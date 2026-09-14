# Desain Awal Project Security Cat

Prototype front-end Security Cat (CyberAttack Simulator Edu) — halaman statis +
tugas praktikum Front-end Modul 1-2, 3-4, 5, 6, 7. Semua simulasi dummy/isolasi,
tanpa serangan nyata.

## Struktur

| Path | Isi |
|---|---|
| `landing.html` | Landing page (entry point) |
| `login.html` | Login operator |
| `register.html` | Registrasi operator baru |
| `dashboard.html` | Dashboard simulasi (butuh login) |
| `tugas-dashboard.html`, `tugas-form.html`, `tugas-list.html` | Modul 1-2: HTML semantik + Tailwind + JS |
| `tugas-typesafe.html` + `src/` + `assets/dist-modul34/` | Modul 3-4: TypeScript strict + Zod |
| `assets/img/logo.png` | Logo lokal (jangan hotlink) |
| `assets/auth.js` | Auth lokal (localStorage + sessionStorage, tanpa DB) |
| `SecurityCat-Modul5-Frameworks/` | Modul 5: React 19 + Vite (lihat README di dalamnya) |
| `SecurityCat-Modul6-NextJS/` | Modul 6: Next.js 15 App Router (lihat README di dalamnya) |
| `SecurityCat-Modul7-State/` | Modul 7: React + Zustand + TanStack Query (lihat README di dalamnya) |
| `docs/Matriks-SRS-Modul-*.md` | Matriks kesesuaian SRS per modul |

## Cara menjalankan (halaman utama)

Pilih salah satu:

1. Laragon: folder ini sudah di `C:\laragon\www\`, buka
   `http://localhost/Desain-Awal-Project-Security-Cat/landing.html`
2. Server statis apa pun dari folder ini, contoh:
   `python -m http.server 8399` lalu buka `http://localhost:8399/landing.html`
3. VS Code Live Server: klik kanan `landing.html` > Open with Live Server.

Jangan buka via `file://` — auth pakai WebCrypto (SHA-256) yang butuh
konteks http/https; di `file://` otomatis fallback hash lemah.

## Alur auth (tanpa database)

- Landing: tombol belajar/sandbox/lab -> `login.html`.
  Tombol "Daftar & Mulai Gratis" / "Daftar Akun Baru" -> `register.html`.
- Register: callsign min 3 karakter, email valid, sandi min 8 karakter +
  centang Pakta Etika. Data tersimpan di `localStorage` (`sc_users_v1`),
  sesi di `sessionStorage` (`sc_session_v1`). Berhasil -> `dashboard.html`.
- Login: bisa pakai callsign atau email + passkey (hash SHA-256).
- Dashboard tanpa sesi otomatis lempar ke `login.html`.
  Tombol keluar: panggil `scLogout()` (kembali ke landing).
- Reset akun demo: di console browser jalankan
  `localStorage.removeItem('sc_users_v1'); sessionStorage.clear();`

## Cara menjalankan tiap modul

- Modul 1-2 & 3-4: cukup serve halaman utama (lihat atas), buka file
  `tugas-*.html`. Untuk rebuild bundle TS Modul 3-4:
  `npm install` lalu `./node_modules/.bin/tsc --noEmit -p tsconfig.json`
  dan bundle via esbuild ke `assets/dist-modul34/app.js`.
- Modul 5/6/7: masing-masing folder punya README sendiri
  (`SecurityCat-Modul5-Frameworks/README.md`, dst) — ikuti itu
  karena tiap folder punya `package.json` dan dependensi sendiri.
  Jangan `npm install` dari root untuk modul 5/6/7.

## Push ke GitHub

`node_modules/`, `dist/`, `.next/` sudah di `.gitignore` dan tidak ikut push.

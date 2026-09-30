# Elefez Farm — Product API

REST API marketplace telur dengan authentication JWT, dibuat untuk assignment
**Authentication & Testing API** (Fullstack Web Development Bootcamp, Dibimbing).

Stack: Node.js, Express, MySQL (`mysql2`), `jsonwebtoken`, `bcryptjs`, `dotenv`.

## Isi repository

| Folder / file | Isi |
| --- | --- |
| `server/` | Backend REST API (Express + MySQL) |
| `server/database/schema.sql` | Struktur database |
| `sql/02_dml.sql` | Data awal (user, kategori, produk, transaksi) |
| `postman/` | Postman Collection dan Environment |
| `postman/openapi.yaml` | Dokumentasi API (OpenAPI 3.0) |
| `src/`, `public/` | Frontend React (terpisah, tidak memanggil API ini) |

## Prasyarat

- Node.js 18 atau lebih baru, beserta npm
- MySQL Server 8.0.16 atau lebih baru, dalam keadaan menyala
- Postman

## 1. Instalasi

```bash
cd server
npm install
```

## 2. Konfigurasi environment

Salin `server/.env.example` menjadi `server/.env`:

```bash
copy .env.example .env      # Windows
cp .env.example .env        # macOS / Linux
```

Lalu sesuaikan isinya dengan MySQL di komputer Anda:

| Variabel | Keterangan | Contoh |
| --- | --- | --- |
| `PORT` | Port server API | `4000` |
| `DB_HOST` | Host MySQL | `localhost` |
| `DB_PORT` | Port MySQL | `3306` |
| `DB_USER` | User MySQL | `root` |
| `DB_PASSWORD` | Password MySQL | *(isi sendiri)* |
| `DB_NAME` | Nama database | `elefez_marketplace` |
| `JWT_SECRET` | Kunci penanda tangan token, **wajib diisi** | *(string acak buatan sendiri)* |
| `JWT_EXPIRES_IN` | Masa berlaku token | `1d` |

File `.env` tidak ikut disertakan di repository maupun ZIP. Jika `JWT_SECRET` kosong, login akan
gagal dengan status 500.

## 3. Import database

Jalankan dua file SQL berikut secara berurutan. File pertama membuat database
`elefez_marketplace` beserta tabelnya, file kedua mengisi data awal.

Lewat terminal (Command Prompt, dari folder `server/`):

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < ../sql/02_dml.sql
```

Atau lewat MySQL Workbench / DBeaver: buka `server/database/schema.sql`, jalankan seluruh isinya,
lalu lakukan hal yang sama untuk `sql/02_dml.sql`.

Hasil yang benar: 12 user, 10 kategori, 15 produk, 15 transaksi.

## 4. Menjalankan server

Dari folder `server/`:

```bash
npm run dev      # dengan auto-restart (nodemon)
npm start        # tanpa auto-restart
```

Server berjalan di `http://localhost:4000`, dengan base URL API `http://localhost:4000/api`.

Cek cepat dari browser atau terminal:

```bash
curl http://localhost:4000/api/products
```

## 5. Testing dengan Postman Collection

1. Buka Postman, klik **Import**, lalu pilih kedua file di `postman/`:
   - `Product-API.postman_collection.json`
   - `Product-API.postman_environment.json`
2. Pilih environment **Product API - Local** di pojok kanan atas.
3. Klik kanan collection **Product API**, pilih **Run collection**, lalu **Run**.

Collection berisi 11 request yang harus dijalankan berurutan:

| # | Folder | Request | Status yang diharapkan |
| --- | --- | --- | --- |
| 1 | Auth | Register | 201 |
| 2 | Auth | Login - Success | 200 |
| 3 | Auth | Login - Wrong Password | 401 |
| 4 | Products | Get All Products | 200 |
| 5 | Products | Create Product - No Token | 401 |
| 6 | Products | Create Product - Validation Error | 422 |
| 7 | Products | Create Product - With Token | 201 |
| 8 | Products | Get Product By Id | 200 |
| 9 | Products | Update Product (PATCH) | 200 |
| 10 | Products | Delete Product | 200 |
| 11 | Products | Get Product Not Found | 404 |

Hal yang perlu diketahui:

- **Tidak perlu akun bawaan.** Request *Register* membuat user baru dengan username acak setiap
  kali dijalankan, sehingga collection bisa diulang tanpa reset database.
- **Token tersimpan otomatis.** Test script pada *Login - Success* menyimpan JWT ke variabel
  `token`, yang dipakai request Products berikutnya.
- **`product_id` tersimpan otomatis** oleh *Create Product - With Token*, lalu dipakai untuk get,
  update, delete, dan pengecekan 404.
- **`category_id` bernilai `1`**, mengacu ke kategori "Telur Ayam Negeri" dari data awal. Jika
  data awal tidak di-import, request 7 akan gagal dengan 422.
- **Port berbeda?** Ubah `base_url` di environment sesuai `PORT` pada `.env`.

Alternatif lewat terminal, tanpa membuka Postman (dari root project):

```bash
npx newman run postman/Product-API.postman_collection.json -e postman/Product-API.postman_environment.json
```

## Endpoint

| Method | Path | Token | Keterangan |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Tidak | Registrasi user, password di-hash dengan bcryptjs |
| POST | `/api/auth/login` | Tidak | Login, mengembalikan JWT |
| GET | `/api/products` | Tidak | Daftar produk, mendukung filter dan urutan |
| GET | `/api/products/:id` | Tidak | Detail produk |
| POST | `/api/products` | Ya | Tambah produk, khusus role `seller` |
| PUT | `/api/products/:id` | Ya | Ubah produk, pemilik produk atau `admin` |
| PATCH | `/api/products/:id` | Ya | Sama seperti PUT, semua field tetap wajib dikirim |
| DELETE | `/api/products/:id` | Ya | Hapus produk, pemilik produk atau `admin` |

Endpoint bertoken membutuhkan header `Authorization: Bearer <token>`.

Format response:

```json
{ "success": true, "message": "Login berhasil", "data": { } }
{ "success": false, "message": "Validasi gagal", "errors": { "name": ["..."] } }
```

| Status | Arti |
| --- | --- |
| 200 / 201 | Berhasil / data berhasil dibuat |
| 401 | Token tidak ada atau tidak valid, atau username/password salah |
| 403 | Sudah login, tetapi role tidak diizinkan atau bukan pemilik produk |
| 404 | Data tidak ditemukan |
| 409 | Produk tidak bisa dihapus karena sudah punya transaksi |
| 422 | Validasi input gagal |

## Dokumentasi API

Dokumentasi lengkap (parameter, request body, contoh response sukses dan error) ada di
`postman/openapi.yaml`. File ini bisa di-import ke Postman lewat **Import**, atau dibuka di
[Swagger Editor](https://editor.swagger.io).

## Menjalankan frontend (opsional)

Frontend React berdiri sendiri dan membaca data dari file Excel, tidak dari API ini.

```bash
npm install      # dari root project
npm run dev      # http://localhost:5173
```

## Masalah yang sering muncul

| Gejala | Penyebab dan solusi |
| --- | --- |
| `ECONNREFUSED` di Postman | Server belum jalan, atau `base_url` tidak cocok dengan `PORT` |
| Semua request membalas 500 | MySQL belum menyala, atau isi `DB_*` di `.env` salah |
| Login membalas 500 | `JWT_SECRET` belum diisi di `.env` |
| Request 7 membalas 422 "Kategori tidak ditemukan" | `sql/02_dml.sql` belum di-import |
| Request Products membalas 401 | *Login - Success* belum dijalankan, atau environment belum dipilih |

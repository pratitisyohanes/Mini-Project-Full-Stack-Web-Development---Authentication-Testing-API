import * as fs from 'node:fs'
import * as XLSX from 'xlsx'

XLSX.set_fs(fs)

const OUTPUT = 'public/data/elefez-marketplace.xlsx'

const users = [
  { id: 1, full_name: 'Admin Elefez', username: 'admin', email: 'admin@example.com', password: 'admin123', phone: '081211110001', role: 'admin', city: 'Jakarta', created_at: '2026-07-01 08:00:00' },
  { id: 2, full_name: 'Budi Santoso', username: 'budi_kandang', email: 'budi@example.com', password: 'telur123', phone: '081211110002', role: 'seller', city: 'Blitar', created_at: '2026-07-02 09:15:00' },
  { id: 3, full_name: 'Siti Rahmawati', username: 'siti_farm', email: 'siti@example.com', password: 'telur123', phone: '081211110003', role: 'seller', city: 'Kendal', created_at: '2026-07-03 10:30:00' },
  { id: 4, full_name: 'Agus Prasetyo', username: 'agus_puyuh', email: 'agus@example.com', password: 'telur123', phone: '081211110004', role: 'seller', city: 'Brebes', created_at: '2026-07-04 11:00:00' },
  { id: 5, full_name: 'Dewi Lestari', username: 'dewi_organik', email: 'dewi@example.com', password: 'telur123', phone: '081211110005', role: 'seller', city: 'Bogor', created_at: '2026-07-05 13:45:00' },
  { id: 6, full_name: 'Rina Wulandari', username: 'rina_w', email: 'rina@example.com', password: 'beli123', phone: '081211110006', role: 'buyer', city: 'Bandung', created_at: '2026-07-10 08:20:00' },
  { id: 7, full_name: 'Andi Saputra', username: 'andi_s', email: 'andi@example.com', password: 'beli123', phone: '081211110007', role: 'buyer', city: 'Surabaya', created_at: '2026-07-11 14:05:00' },
  { id: 8, full_name: 'Maya Putri', username: 'maya_p', email: 'maya@example.com', password: 'beli123', phone: '081211110008', role: 'buyer', city: 'Yogyakarta', created_at: '2026-07-12 16:40:00' },
  { id: 9, full_name: 'Fajar Nugroho', username: 'fajar_n', email: 'fajar@example.com', password: 'beli123', phone: '081211110009', role: 'buyer', city: 'Semarang', created_at: '2026-07-13 07:55:00' },
  { id: 10, full_name: 'Lina Marlina', username: 'lina_m', email: 'lina@example.com', password: 'beli123', phone: '081211110010', role: 'buyer', city: 'Depok', created_at: '2026-07-14 19:10:00' },
  { id: 11, full_name: 'Yusuf Hidayat', username: 'yusuf_h', email: 'yusuf@example.com', password: 'beli123', phone: '081211110011', role: 'buyer', city: 'Malang', created_at: '2026-07-20 10:00:00' },
  { id: 12, full_name: 'Nadia Kurniawan', username: 'nadia_k', email: 'nadia@example.com', password: 'beli123', phone: '081211110012', role: 'buyer', city: 'Bekasi', created_at: '2026-07-21 12:30:00' },
]

const productCategories = [
  { id: 1, name: 'Telur Ayam Negeri', slug: 'telur-ayam-negeri', description: 'Telur harian dari ayam ras petelur untuk kebutuhan dapur.', icon: 'carton.svg', created_at: '2026-07-01 08:00:00' },
  { id: 2, name: 'Telur Ayam Kampung', slug: 'telur-ayam-kampung', description: 'Dari ayam kampung umbaran, kuning telur lebih pekat.', icon: 'hen.svg', created_at: '2026-07-01 08:00:00' },
  { id: 3, name: 'Telur Omega-3', slug: 'telur-omega-3', description: 'Pakan biji rami dan minyak ikan, omega-3 hingga 3x lipat.', icon: 'omega.svg', created_at: '2026-07-01 08:00:00' },
  { id: 4, name: 'Telur Puyuh', slug: 'telur-puyuh', description: 'Butiran kecil kaya protein, pas untuk sate dan sayur.', icon: 'quail.svg', created_at: '2026-07-01 08:00:00' },
  { id: 5, name: 'Telur Bebek', slug: 'telur-bebek', description: 'Cangkang hijau kebiruan, cocok untuk martabak dan kue.', icon: 'egg-animated.svg', created_at: '2026-07-01 08:00:00' },
  { id: 6, name: 'Telur Asin', slug: 'telur-asin', description: 'Telur bebek diasinkan tradisional khas Brebes.', icon: 'salted-egg.svg', created_at: '2026-07-01 08:00:00' },
  { id: 7, name: 'Telur Organik', slug: 'telur-organik', description: 'Ayam free range dengan pakan organik bersertifikat.', icon: 'organic-leaf.svg', created_at: '2026-07-01 08:00:00' },
  { id: 8, name: 'Telur Arab', slug: 'telur-arab', description: 'Dari ayam arab petelur, ukuran kecil dan cangkang putih.', icon: 'shield-check.svg', created_at: '2026-07-01 08:00:00' },
  { id: 9, name: 'Paket Grosir', slug: 'paket-grosir', description: 'Pembelian per peti untuk warung, katering, dan toko kue.', icon: 'truck.svg', created_at: '2026-07-01 08:00:00' },
  { id: 10, name: 'Telur Tetas', slug: 'telur-tetas', description: 'Telur fertil untuk ditetaskan peternak pemula.', icon: 'hen.svg', created_at: '2026-07-01 08:00:00' },
]

const products = [
  { id: 1, category_id: 1, user_id: 2, name: 'Telur Ayam Negeri Grade A 1 kg', description: 'Isi 15–16 butir, disortir ukuran seragam dan dicuci kering.', price: 29000, stock: 120, image: '', rating: 4.7, review_count: 212, created_at: '2026-07-06 08:00:00' },
  { id: 2, category_id: 1, user_id: 2, name: 'Telur Ayam Negeri 1 Tray (30 butir)', description: 'Satu tray penuh untuk stok dapur mingguan keluarga.', price: 58000, stock: 80, image: '', rating: 4.8, review_count: 340, created_at: '2026-07-06 08:10:00' },
  { id: 3, category_id: 1, user_id: 3, name: 'Telur Ayam Negeri Jumbo 1 Tray', description: 'Ukuran jumbo 65–70 gram per butir, favorit toko roti.', price: 65000, stock: 0, image: '', rating: 4.6, review_count: 98, created_at: '2026-07-07 09:00:00' },
  { id: 4, category_id: 1, user_id: 3, name: 'Telur Ayam Negeri Ekonomis 1/2 Tray', description: 'Isi 15 butir ukuran campur, hemat untuk anak kos.', price: 27000, stock: 200, image: '', rating: 4.4, review_count: 150, created_at: '2026-07-07 09:20:00' },
  { id: 5, category_id: 2, user_id: 3, name: 'Telur Ayam Kampung Asli isi 10', description: 'Dipanen pagi dari kandang umbaran di Kendal.', price: 32000, stock: 60, image: '/assets/images/kampung-egg.png', rating: 4.9, review_count: 187, created_at: '2026-07-08 07:30:00' },
  { id: 6, category_id: 2, user_id: 3, name: 'Telur Ayam Kampung 1 Tray', description: 'Tiga puluh butir telur kampung untuk jamu dan MPASI.', price: 95000, stock: 35, image: '/assets/images/kampung-egg.png', rating: 4.8, review_count: 76, created_at: '2026-07-08 07:45:00' },
  { id: 7, category_id: 2, user_id: 2, name: 'Telur Ayam Kampung Omega Mix 1 Tray', description: 'Ayam kampung dengan pakan tambahan omega-3.', price: 110000, stock: 0, image: '', rating: 4.7, review_count: 41, created_at: '2026-07-09 10:00:00' },
  { id: 8, category_id: 2, user_id: 5, name: 'Telur Ayam Kampung Premium isi 60', description: 'Dua tray telur kampung pilihan untuk usaha jamu.', price: 185000, stock: 12, image: '', rating: 4.9, review_count: 23, created_at: '2026-07-09 11:30:00' },
  { id: 9, category_id: 3, user_id: 5, name: 'Telur Omega-3 Premium isi 10', description: 'Tanpa aroma amis, kemasan box anti-pecah.', price: 38000, stock: 90, image: '/assets/images/omega-egg.png', rating: 4.8, review_count: 134, created_at: '2026-07-10 08:00:00' },
  { id: 10, category_id: 3, user_id: 5, name: 'Telur Omega-3 1 Tray', description: 'Tiga puluh butir omega-3 untuk kebutuhan sebulan.', price: 125000, stock: 25, image: '/assets/images/omega-egg.png', rating: 4.7, review_count: 58, created_at: '2026-07-10 08:30:00' },
  { id: 11, category_id: 4, user_id: 4, name: 'Telur Puyuh isi 100', description: 'Seratus butir telur puyuh segar dari Brebes.', price: 45000, stock: 150, image: '', rating: 4.6, review_count: 112, created_at: '2026-07-11 09:00:00' },
  { id: 12, category_id: 5, user_id: 4, name: 'Telur Bebek Segar 1 Tray', description: 'Telur bebek angon, cangkang tebal dan kuning oranye.', price: 120000, stock: 18, image: '', rating: 4.5, review_count: 37, created_at: '2026-07-11 09:30:00' },
  { id: 13, category_id: 6, user_id: 4, name: 'Telur Asin Brebes isi 10', description: 'Diasinkan 14 hari dengan abu gosok, masir dan berminyak.', price: 55000, stock: 40, image: '', rating: 4.9, review_count: 265, created_at: '2026-07-12 10:00:00' },
  { id: 14, category_id: 7, user_id: 5, name: 'Telur Organik Free Range 1 Tray', description: 'Ayam dilepas di kebun, pakan organik tanpa antibiotik.', price: 150000, stock: 0, image: '', rating: 4.8, review_count: 44, created_at: '2026-07-12 11:00:00' },
  { id: 15, category_id: 9, user_id: 2, name: 'Paket Grosir Telur Negeri 1 Peti 20 kg', description: 'Satu peti kayu isi ±320 butir untuk warung dan katering.', price: 560000, stock: 10, image: '', rating: 4.7, review_count: 19, created_at: '2026-07-13 06:00:00' },
]

const orders = [
  [6, 2, 2, 'completed', '2026-08-01 10:12:00'],
  [6, 9, 1, 'completed', '2026-08-02 08:40:00'],
  [7, 6, 1, 'shipped', '2026-08-03 13:05:00'],
  [7, 11, 3, 'completed', '2026-08-04 15:30:00'],
  [8, 5, 2, 'paid', '2026-08-05 09:00:00'],
  [8, 13, 1, 'completed', '2026-08-06 11:45:00'],
  [9, 15, 1, 'completed', '2026-08-07 06:30:00'],
  [9, 1, 5, 'completed', '2026-08-08 07:10:00'],
  [10, 10, 1, 'shipped', '2026-08-09 16:20:00'],
  [10, 12, 2, 'paid', '2026-08-10 18:00:00'],
  [6, 8, 1, 'cancelled', '2026-08-11 12:00:00'],
  [7, 2, 1, 'completed', '2026-08-12 09:25:00'],
  [8, 4, 2, 'completed', '2026-08-13 17:50:00'],
  [9, 9, 3, 'paid', '2026-08-14 20:15:00'],
  [10, 1, 2, 'completed', '2026-08-15 08:05:00'],
]

const priceById = new Map(products.map((product) => [product.id, product.price]))
const transactions = orders.map(([buyer_id, product_id, quantity, status, created_at], index) => ({
  id: index + 1,
  buyer_id,
  product_id,
  quantity,
  total_price: priceById.get(product_id) * quantity,
  status,
  created_at,
}))

const tables = {
  users,
  product_categories: productCategories,
  products,
  transactions,
}

function toSheet(rows) {
  const sheet = XLSX.utils.json_to_sheet(rows)
  sheet['!cols'] = Object.keys(rows[0]).map((key) => ({
    wch: Math.max(key.length, ...rows.map((row) => String(row[key]).length)) + 2,
  }))
  return sheet
}

const workbook = XLSX.utils.book_new()
for (const [name, rows] of Object.entries(tables)) {
  XLSX.utils.book_append_sheet(workbook, toSheet(rows), name)
}

fs.mkdirSync('public/data', { recursive: true })
XLSX.writeFile(workbook, OUTPUT)

for (const [name, rows] of Object.entries(tables)) {
  console.log(`${name.padEnd(20)} ${rows.length} rows`)
}
console.log(`-> ${OUTPUT}`)

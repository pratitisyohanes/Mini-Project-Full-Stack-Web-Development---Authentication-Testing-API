USE elefez_marketplace;

START TRANSACTION;

INSERT INTO users (id, full_name, username, email, password_hash, phone, role, city, created_at) VALUES
  (1, 'Admin Elefez', 'admin', 'admin@example.com', SHA2('admin123', 256), '081211110001', 'admin', 'Jakarta', '2026-07-01 08:00:00'),
  (2, 'Budi Santoso', 'budi_kandang', 'budi@example.com', SHA2('telur123', 256), '081211110002', 'seller', 'Blitar', '2026-07-02 09:15:00'),
  (3, 'Siti Rahmawati', 'siti_farm', 'siti@example.com', SHA2('telur123', 256), '081211110003', 'seller', 'Kendal', '2026-07-03 10:30:00'),
  (4, 'Agus Prasetyo', 'agus_puyuh', 'agus@example.com', SHA2('telur123', 256), '081211110004', 'seller', 'Brebes', '2026-07-04 11:00:00'),
  (5, 'Dewi Lestari', 'dewi_organik', 'dewi@example.com', SHA2('telur123', 256), '081211110005', 'seller', 'Bogor', '2026-07-05 13:45:00'),
  (6, 'Rina Wulandari', 'rina_w', 'rina@example.com', SHA2('beli123', 256), '081211110006', 'buyer', 'Bandung', '2026-07-10 08:20:00'),
  (7, 'Andi Saputra', 'andi_s', 'andi@example.com', SHA2('beli123', 256), '081211110007', 'buyer', 'Surabaya', '2026-07-11 14:05:00'),
  (8, 'Maya Putri', 'maya_p', 'maya@example.com', SHA2('beli123', 256), '081211110008', 'buyer', 'Yogyakarta', '2026-07-12 16:40:00'),
  (9, 'Fajar Nugroho', 'fajar_n', 'fajar@example.com', SHA2('beli123', 256), '081211110009', 'buyer', 'Semarang', '2026-07-13 07:55:00'),
  (10, 'Lina Marlina', 'lina_m', 'lina@example.com', SHA2('beli123', 256), '081211110010', 'buyer', 'Depok', '2026-07-14 19:10:00'),
  (11, 'Yusuf Hidayat', 'yusuf_h', 'yusuf@example.com', SHA2('beli123', 256), '081211110011', 'buyer', 'Malang', '2026-07-20 10:00:00'),
  (12, 'Nadia Kurniawan', 'nadia_k', 'nadia@example.com', SHA2('beli123', 256), '081211110012', 'buyer', 'Bekasi', '2026-07-21 12:30:00');

INSERT INTO product_categories (id, name, slug, description, icon, created_at) VALUES
  (1, 'Telur Ayam Negeri', 'telur-ayam-negeri', 'Telur harian dari ayam ras petelur untuk kebutuhan dapur.', 'carton.svg', '2026-07-01 08:00:00'),
  (2, 'Telur Ayam Kampung', 'telur-ayam-kampung', 'Dari ayam kampung umbaran, kuning telur lebih pekat.', 'hen.svg', '2026-07-01 08:00:00'),
  (3, 'Telur Omega-3', 'telur-omega-3', 'Pakan biji rami dan minyak ikan, omega-3 hingga 3x lipat.', 'omega.svg', '2026-07-01 08:00:00'),
  (4, 'Telur Puyuh', 'telur-puyuh', 'Butiran kecil kaya protein, pas untuk sate dan sayur.', 'quail.svg', '2026-07-01 08:00:00'),
  (5, 'Telur Bebek', 'telur-bebek', 'Cangkang hijau kebiruan, cocok untuk martabak dan kue.', 'egg-animated.svg', '2026-07-01 08:00:00'),
  (6, 'Telur Asin', 'telur-asin', 'Telur bebek diasinkan tradisional khas Brebes.', 'salted-egg.svg', '2026-07-01 08:00:00'),
  (7, 'Telur Organik', 'telur-organik', 'Ayam free range dengan pakan organik bersertifikat.', 'organic-leaf.svg', '2026-07-01 08:00:00'),
  (8, 'Telur Arab', 'telur-arab', 'Dari ayam arab petelur, ukuran kecil dan cangkang putih.', 'shield-check.svg', '2026-07-01 08:00:00'),
  (9, 'Paket Grosir', 'paket-grosir', 'Pembelian per peti untuk warung, katering, dan toko kue.', 'truck.svg', '2026-07-01 08:00:00'),
  (10, 'Telur Tetas', 'telur-tetas', 'Telur fertil untuk ditetaskan peternak pemula.', 'hen.svg', '2026-07-01 08:00:00');

INSERT INTO products (id, category_id, user_id, name, description, price, stock, image, rating, review_count, created_at) VALUES
  (1, 1, 2, 'Telur Ayam Negeri Grade A 1 kg', 'Isi 15–16 butir, disortir ukuran seragam dan dicuci kering.', 29000, 120, NULL, 4.7, 212, '2026-07-06 08:00:00'),
  (2, 1, 2, 'Telur Ayam Negeri 1 Tray (30 butir)', 'Satu tray penuh untuk stok dapur mingguan keluarga.', 58000, 80, NULL, 4.8, 340, '2026-07-06 08:10:00'),
  (3, 1, 3, 'Telur Ayam Negeri Jumbo 1 Tray', 'Ukuran jumbo 65–70 gram per butir, favorit toko roti.', 65000, 0, NULL, 4.6, 98, '2026-07-07 09:00:00'),
  (4, 1, 3, 'Telur Ayam Negeri Ekonomis 1/2 Tray', 'Isi 15 butir ukuran campur, hemat untuk anak kos.', 27000, 200, NULL, 4.4, 150, '2026-07-07 09:20:00'),
  (5, 2, 3, 'Telur Ayam Kampung Asli isi 10', 'Dipanen pagi dari kandang umbaran di Kendal.', 32000, 60, '/assets/images/kampung-egg.png', 4.9, 187, '2026-07-08 07:30:00'),
  (6, 2, 3, 'Telur Ayam Kampung 1 Tray', 'Tiga puluh butir telur kampung untuk jamu dan MPASI.', 95000, 35, '/assets/images/kampung-egg.png', 4.8, 76, '2026-07-08 07:45:00'),
  (7, 2, 2, 'Telur Ayam Kampung Omega Mix 1 Tray', 'Ayam kampung dengan pakan tambahan omega-3.', 110000, 0, NULL, 4.7, 41, '2026-07-09 10:00:00'),
  (8, 2, 5, 'Telur Ayam Kampung Premium isi 60', 'Dua tray telur kampung pilihan untuk usaha jamu.', 185000, 12, NULL, 4.9, 23, '2026-07-09 11:30:00'),
  (9, 3, 5, 'Telur Omega-3 Premium isi 10', 'Tanpa aroma amis, kemasan box anti-pecah.', 38000, 90, '/assets/images/omega-egg.png', 4.8, 134, '2026-07-10 08:00:00'),
  (10, 3, 5, 'Telur Omega-3 1 Tray', 'Tiga puluh butir omega-3 untuk kebutuhan sebulan.', 125000, 25, '/assets/images/omega-egg.png', 4.7, 58, '2026-07-10 08:30:00'),
  (11, 4, 4, 'Telur Puyuh isi 100', 'Seratus butir telur puyuh segar dari Brebes.', 45000, 150, NULL, 4.6, 112, '2026-07-11 09:00:00'),
  (12, 5, 4, 'Telur Bebek Segar 1 Tray', 'Telur bebek angon, cangkang tebal dan kuning oranye.', 120000, 18, NULL, 4.5, 37, '2026-07-11 09:30:00'),
  (13, 6, 4, 'Telur Asin Brebes isi 10', 'Diasinkan 14 hari dengan abu gosok, masir dan berminyak.', 55000, 40, NULL, 4.9, 265, '2026-07-12 10:00:00'),
  (14, 7, 5, 'Telur Organik Free Range 1 Tray', 'Ayam dilepas di kebun, pakan organik tanpa antibiotik.', 150000, 0, NULL, 4.8, 44, '2026-07-12 11:00:00'),
  (15, 9, 2, 'Paket Grosir Telur Negeri 1 Peti 20 kg', 'Satu peti kayu isi ±320 butir untuk warung dan katering.', 560000, 10, NULL, 4.7, 19, '2026-07-13 06:00:00');

INSERT INTO transactions (id, buyer_id, product_id, quantity, total_price, status, created_at) VALUES
  (1, 6, 2, 2, 116000, 'completed', '2026-08-01 10:12:00'),
  (2, 6, 9, 1, 38000, 'completed', '2026-08-02 08:40:00'),
  (3, 7, 6, 1, 95000, 'shipped', '2026-08-03 13:05:00'),
  (4, 7, 11, 3, 135000, 'completed', '2026-08-04 15:30:00'),
  (5, 8, 5, 2, 64000, 'paid', '2026-08-05 09:00:00'),
  (6, 8, 13, 1, 55000, 'completed', '2026-08-06 11:45:00'),
  (7, 9, 15, 1, 560000, 'completed', '2026-08-07 06:30:00'),
  (8, 9, 1, 5, 145000, 'completed', '2026-08-08 07:10:00'),
  (9, 10, 10, 1, 125000, 'shipped', '2026-08-09 16:20:00'),
  (10, 10, 12, 2, 240000, 'paid', '2026-08-10 18:00:00'),
  (11, 6, 8, 1, 185000, 'cancelled', '2026-08-11 12:00:00'),
  (12, 7, 2, 1, 58000, 'completed', '2026-08-12 09:25:00'),
  (13, 8, 4, 2, 54000, 'completed', '2026-08-13 17:50:00'),
  (14, 9, 9, 3, 114000, 'paid', '2026-08-14 20:15:00'),
  (15, 10, 1, 2, 58000, 'completed', '2026-08-15 08:05:00');

COMMIT;

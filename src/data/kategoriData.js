import { asset } from '../utils/asset.js'

export const kategoriHero = {
  eyebrow: 'Semua Kategori',
  title: 'Pilih jenis telur sesuai kebutuhan dapurmu',
  subtitle:
    'Dari telur negeri harian sampai telur organik premium — semuanya dikurasi langsung dari peternak mitra Elefez Farm.',
  breadcrumb: [
    { label: 'Beranda', to: '/' },
    { label: 'Kategori' },
  ],
}

export const highlight = {
  eyebrow: 'Sorotan minggu ini',
  title: 'Telur Omega-3 Premium',
  text: 'Ayam petelur dengan pakan tambahan biji rami dan minyak ikan. Kandungan omega-3 hingga 3x lipat dibanding telur biasa, tanpa aroma amis.',
  points: [
    'Panen harian, dikirim maksimal 24 jam',
    'Sortir ukuran seragam grade A',
    'Kemasan tray anti-pecah bersertifikat',
  ],
  image: asset('/assets/images/omega-egg.png'),
  imageAlt: 'Sekeranjang telur omega-3 premium',
  actions: [{ label: 'Jelajahi semua produk', to: '/jelajahi', variant: 'primary' }],
}

export const kategoriCta = {
  title: 'Punya kandang sendiri? Buka kategorimu di Elefez Farm',
  text: 'Daftarkan produk telurmu, tentukan harga per tray atau per kilo, dan jangkau ribuan pembeli setiap hari.',
  ctaLabel: 'Jadi peternak mitra',
  ctaHref: '/#peternak',
}

import { asset } from '../utils/asset.js'

export const hero = {
  eyebrow: 'Marketplace untuk Menjual Telur Ayam',
  title: 'Telur fresh dari kandang langsung ke dapurmu',
  subtitle: 'Telur ayam kampung, negeri, dan omega-3 diambil langsung dari peternakan terbaik.',
  searchPlaceholder: 'Mau cari telur apa hari ini?',
  stats: [
    { label: 'Butir terjual', value: '230.000+' },
    { label: 'Peternak mitra', value: '200+' },
    { label: 'Rating pembeli', value: '4,9 / 5' },
  ],
  cards: [
    {
      id: 'omega',
      title: 'Telur Omega-3',
      meta: '1 baki = 30 butir',
      price: 'Rp62.000',
      image: asset('/assets/images/omega-egg.png'),
    },
    {
      id: 'kampung',
      title: 'Telur Ayam Kampung',
      meta: '1 pak = 10 butir',
      price: 'Rp32.000',
      image: asset('/assets/images/kampung-egg.png'),
    },
  ],
}

export const categories = [
  {
    id: 'kampung',
    name: 'Telur Ayam Kampung',
    count: '900 produk',
    icon: asset('/assets/icons/hen.svg'),
    tone: 'brown',
    to: '/jelajahi?kategori=kampung',
  },
  {
    id: 'negeri',
    name: 'Telur Ayam Negeri',
    count: '1.200 produk',
    icon: asset('/assets/icons/carton.svg'),
    tone: 'yolk',
    to: '/jelajahi?kategori=negeri',
  },
  {
    id: 'omega',
    name: 'Telur Omega-3',
    count: '700 produk',
    icon: asset('/assets/icons/omega.svg'),
    tone: 'leaf',
    to: '/jelajahi?kategori=omega',
  },
  {
    id: 'asin',
    name: 'Telur Asin',
    count: '400 produk',
    icon: asset('/assets/icons/salted-egg.svg'),
    tone: 'primary',
    to: '/jelajahi?kategori=asin',
  },
  {
    id: 'puyuh',
    name: 'Telur Puyuh',
    count: '300 produk',
    icon: asset('/assets/icons/quail.svg'),
    tone: 'cream',
    to: '/jelajahi?kategori=puyuh',
  },
  {
    id: 'organik',
    name: 'Telur Organik',
    count: '100 produk',
    icon: asset('/assets/icons/organic-leaf.svg'),
    tone: 'leaf',
    to: '/jelajahi?kategori=organik',
  },
]

export const bestSellers = [
  {
    id: 'negeri-baki',
    name: 'Telur Ayam Negeri Terbaik 1 Baki',
    seller: 'dari kandang Elefez',
    tag: 'Telur Ayam Negeri',
    price: 42000,
    rating: 4.8,
    reviewCount: 100,
    icon: asset('/assets/icons/carton.svg'),
    tone: 'yolk',
  },
  {
    id: 'kampung-10',
    name: 'Telur Ayam Kampung 10 Butir',
    seller: 'dari kandang Elefez',
    tag: 'Telur Ayam Kampung',
    price: 32000,
    rating: 4.7,
    reviewCount: 100,
    image: asset('/assets/images/kampung-egg.png'),
    tone: 'brown',
  },
  {
    id: 'asin-bebek',
    name: 'Telur Asin dari Bebek Pilihan',
    seller: 'dari kandang Elefez',
    tag: 'Telur Asin',
    price: 22000,
    rating: 4.9,
    reviewCount: 100,
    icon: asset('/assets/icons/salted-egg.svg'),
    tone: 'brown',
  },
  {
    id: 'omega-premium',
    name: 'Telur Omega-3 Terbaik',
    seller: 'dari kandang Elefez',
    tag: 'Telur Ayam Omega-3',
    price: 52000,
    rating: 5,
    reviewCount: 100,
    badge: 'Terlaris',
    image: asset('/assets/images/omega-egg.png'),
    tone: 'leaf',
  },
]

export const features = [
  {
    id: 'sortir',
    title: 'Telur disortir setiap hari dari kandang',
    text: 'Ayam dan bebek diberikan vitamin serta nutrisi terbaik setiap hari.',
    icon: asset('/assets/icons/shield-check.svg'),
  },
  {
    id: 'kirim',
    title: 'Pengiriman same-day',
    text: 'Setelah melewati proses sortir, telur langsung dikirim menggunakan jasa kirim kandang.',
    icon: asset('/assets/icons/truck.svg'),
  },
  {
    id: 'bibit',
    title: 'Dari bibit DOC terbaik',
    text: 'Menggunakan konsentrat pilihan supaya telur yang dihasilkan berkualitas.',
    icon: asset('/assets/icons/star.svg'),
  },
]

export const sellerCta = {
  title: 'Mulai berjualan telur sebagai mitra kami',
  text: 'Daftarkan kandangmu, lalu cukup fokus mencari mitra yang membeli produkmu.',
  benefits: [
    'Upload & kelola stok telur',
    'Laporan penjualan & fokus meningkatkan pendapatan',
    'Tanpa perlu banyak modal & kualitas telur terjamin',
  ],
  ctaLabel: 'Jadi mitra peternak kami',
  ctaHref: '#',
  stat: {
    label: 'Penjualan bulan ini',
    value: 'Rp5.500.000',
    bars: [40, 65, 50, 85, 70, 100],
  },
}

export const testimonials = [
  {
    id: 'melanie',
    quote: 'Warna telurnya bagus, cangkangnya tidak mudah pecah dan tidak berbintik-bintik.',
    name: 'Melanie Sepang',
    role: 'Mahasiswi',
  },
  {
    id: 'pulsen',
    quote: 'Pengiriman telurnya cepat, tidak menunggu lama, dan telurnya masih fresh.',
    name: 'Pulsen E.',
    role: 'Pendeta',
  },
  {
    id: 'andreas',
    quote: 'Untuk kebutuhan partai besar bisa, cocok untuk acara syukuran.',
    name: 'Andreas S.',
    role: 'Karyawan Swasta',
  },
]

export const newsletter = {
  title: 'Berlangganan untuk mendapatkan info stok telur terupdate',
  text: 'Dapatkan info stok telur & promo terbaru khusus untuk member.',
  placeholder: 'namakamu@email.com',
  buttonLabel: 'Berlangganan sekarang',
}

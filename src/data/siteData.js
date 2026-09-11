import { asset } from '../utils/asset.js'

export const brand = {
  name: 'Elefez',
  accent: 'Farm',
  logo: asset('/assets/icons/logo.svg'),
  tagline: 'Menjual telur fresh setiap hari langsung dari kandang.',
}

export const navItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Kategori', to: '/kategori' },
  { label: 'Jelajahi', to: '/jelajahi' },
  { label: 'Keunggulan', to: '/#keunggulan' },
  { label: 'Jadi Peternak', to: '/#peternak' },
]

export const footerColumns = [
  {
    title: 'Produk',
    links: [
      { label: 'Kategori', to: '/kategori' },
      { label: 'Jelajahi', to: '/jelajahi' },
      { label: 'Menjadi Mitra Kami', to: '/#peternak' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', to: '#' },
      { label: 'Karier', to: '#' },
      { label: 'Blog', to: '#' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'Pusat Bantuan', to: '#' },
      { label: 'Syarat & Ketentuan', to: '#' },
      { label: 'Kebijakan Privasi', to: '#' },
    ],
  },
]

export const socialLinks = [
  { label: 'Instagram', href: '#', icon: asset('/assets/icons/instagram.svg') },
  { label: 'Twitter X', href: '#', icon: asset('/assets/icons/twitter.svg') },
  { label: 'LinkedIn', href: '#', icon: asset('/assets/icons/linkedin.svg') },
]

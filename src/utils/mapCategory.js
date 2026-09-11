import { iconUrl } from './asset.js'

const TONES = ['cream', 'leaf', 'brown', 'yolk', 'primary']

export function mapCategoryToCard(category, index) {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    count: category.product_count ? `${category.product_count} produk` : 'Belum ada produk',
    icon: iconUrl(category.icon),
    tone: TONES[index % TONES.length],
    to: `/jelajahi?kategori=${encodeURIComponent(category.slug)}`,
  }
}

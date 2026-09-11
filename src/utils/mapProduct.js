import { iconUrl, mediaUrl } from './asset.js'

export function mapProductToCard(product) {
  return {
    id: product.id,
    name: product.name,
    seller: product.seller,
    tag: product.stock === 0 ? 'Stok habis' : undefined,
    price: product.price,
    rating: product.rating ?? 0,
    reviewCount: product.review_count ?? 0,
    image: mediaUrl(product.image),
    icon: iconUrl(product.category_icon),
    imageAlt: product.name,
    tone: 'cream',
  }
}

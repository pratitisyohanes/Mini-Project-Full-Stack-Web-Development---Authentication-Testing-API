import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Badge from '../components/ui/Badge.jsx'
import Rating from '../components/ui/Rating.jsx'
import { getProduct } from '../services/productService.js'
import { iconUrl, mediaUrl } from '../utils/asset.js'
import { formatRupiah } from '../utils/format.js'
import { cn } from '../utils/styles.js'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    getProduct(id)
      .then((data) => {
        if (cancelled) return
        setProduct(data)
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (status === 'loading') {
    return <Container className="py-20 text-center text-inksoft">Memuat produk…</Container>
  }

  if (status === 'error' || !product) {
    return (
      <Container className="py-20 text-center">
        <p className="text-inksoft">Produk tidak ditemukan.</p>
        <Button to="/jelajahi" className="mt-4">
          Kembali ke Jelajahi
        </Button>
      </Container>
    )
  }

  const image = mediaUrl(product.image)
  const inStock = product.stock > 0

  return (
    <Container className="grid gap-10 py-12 md:grid-cols-2 md:py-16">
      <div className="grid place-items-center rounded-xl2 border border-line bg-surface p-10">
        {image ? (
          <img src={image} alt={product.name} className="max-h-80 object-contain" />
        ) : (
          <img src={iconUrl(product.category_icon)} alt="" width={120} height={120} className="opacity-70" />
        )}
      </div>

      <div>
        <Badge className="uppercase tracking-wide">{product.category}</Badge>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight">{product.name}</h1>
        <p className="mt-1 text-sm text-inksoft">
          Dijual oleh <span className="font-semibold text-ink">{product.seller}</span>
        </p>

        <div className="mt-3">
          <Rating value={product.rating ?? 0} count={product.review_count ?? 0} />
        </div>

        <p className="mt-4 text-2xl font-extrabold">{formatRupiah(product.price)}</p>
        <p className={cn('mt-1 text-sm font-semibold', inStock ? 'text-leaf' : 'text-red-600')}>
          {inStock ? `Stok tersedia: ${product.stock}` : 'Stok habis'}
        </p>
        <p className="mt-4 leading-relaxed text-inksoft">{product.description}</p>

        <div className="mt-8 flex gap-3">
          <Button
            size="lg"
            disabled={!inStock}
            onClick={() => window.alert(`"${product.name}" ditambahkan ke keranjang.`)}
          >
            {inStock ? 'Beli Sekarang' : 'Stok Habis'}
          </Button>
          <Button variant="ghost" size="lg" to="/jelajahi">
            Kembali
          </Button>
        </div>
      </div>
    </Container>
  )
}

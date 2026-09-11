import { Link } from 'react-router-dom'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Rating from '../ui/Rating.jsx'
import { formatRupiah } from '../../utils/format.js'
import { cn, toneGradient } from '../../utils/styles.js'

export default function ProductCard({ product, onBuy, to, priceFormatter = formatRupiah }) {
  const {
    name,
    seller,
    tag,
    badge,
    price,
    originalPrice,
    rating,
    reviewCount,
    image,
    imageAlt,
    icon,
    tone = 'cream',
  } = product

  const media = (
    <div
      className={cn(
        'relative aspect-[4/3]',
        image ? 'bg-bgmuted' : cn('grid place-items-center bg-gradient-to-br', toneGradient(tone)),
      )}
    >
      {image ? (
        <img className="h-full w-full object-contain p-4" src={image} alt={imageAlt ?? name} loading="lazy" />
      ) : (
        <img className="opacity-70" src={icon} alt="" width={56} height={56} />
      )}

      {tag && (
        <Badge variant="white" className="absolute left-3 top-3">
          {tag}
        </Badge>
      )}
      {badge && (
        <Badge variant="leaf" className="absolute right-3 top-3">
          {badge}
        </Badge>
      )}
    </div>
  )

  const heading = <h3 className="font-bold leading-snug">{name}</h3>

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-surface shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      {to ? <Link to={to}>{media}</Link> : media}

      <div className="flex flex-1 flex-col p-5">
        {to ? (
          <Link to={to} className="transition hover:text-primarydk">
            {heading}
          </Link>
        ) : (
          heading
        )}
        <p className="mt-1 text-sm text-inksoft">{seller}</p>

        <div className="mt-2">
          <Rating value={rating} count={reviewCount} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            {originalPrice && (
              <span className="block text-xs text-inksoft line-through">{priceFormatter(originalPrice)}</span>
            )}
            <span className="text-lg font-extrabold">{priceFormatter(price)}</span>
          </div>
          <Button size="sm" onClick={() => onBuy?.(product)}>
            Beli
          </Button>
        </div>
      </div>
    </article>
  )
}

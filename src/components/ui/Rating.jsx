import { formatRating } from '../../utils/format.js'

export default function Rating({ value = 0, count, showValue = true }) {
  const filled = Math.round(value)
  const stars = '★'.repeat(filled) + '☆'.repeat(Math.max(0, 5 - filled))

  return (
    <p className="flex items-center gap-2 text-sm">
      <span className="tracking-wide text-yolk" aria-hidden="true">
        {stars}
      </span>
      <span className="sr-only">Rating {formatRating(value)} dari 5</span>
      {(showValue || count != null) && (
        <span className="text-inksoft">
          {showValue && formatRating(value)}
          {count != null && ` (${count})`}
        </span>
      )}
    </p>
  )
}

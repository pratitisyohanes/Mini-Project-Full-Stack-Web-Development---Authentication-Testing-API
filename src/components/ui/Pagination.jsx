import { cn } from '../../utils/styles.js'

const baseItem = 'grid h-10 min-w-10 place-items-center rounded-full px-4 text-sm font-semibold transition'

export default function Pagination({ pages = [], currentPage = 1, onPageChange }) {
  const arrowClass = cn(baseItem, 'border border-line bg-surface text-inksoft hover:border-primary hover:text-primarydk')

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Navigasi halaman">
      <button
        type="button"
        className={arrowClass}
        aria-label="Halaman sebelumnya"
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
      >
        ←
      </button>

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              baseItem,
              page === currentPage
                ? 'bg-primary text-white'
                : 'border border-line bg-surface hover:border-primary hover:text-primarydk',
            )}
          >
            {page}
          </button>
        ) : (
          <span key={`gap-${index}`} className="px-2 text-inksoft" aria-hidden="true">
            {page}
          </span>
        ),
      )}

      <button
        type="button"
        className={arrowClass}
        aria-label="Halaman berikutnya"
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        →
      </button>
    </nav>
  )
}

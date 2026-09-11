export default function ResultToolbar({ meta, sortOptions = [], sortValue, onSortChange }) {
  return (
    <div className="mb-5 flex flex-col gap-4 rounded-xl2 border border-line bg-surface px-5 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-inksoft">
        Menampilkan{' '}
        <span className="font-bold text-ink">
          {meta.from}–{meta.to}
        </span>{' '}
        dari <span className="font-bold text-ink">{meta.total}</span> produk
      </p>

      <div className="flex items-center gap-2">
        <label className="text-sm text-inksoft" htmlFor="urutkan">
          Urutkan
        </label>
        <select
          id="urutkan"
          value={sortValue}
          onChange={(event) => onSortChange?.(event.target.value)}
          className="rounded-lg border border-line bg-bg px-3 py-2 text-sm font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primarysoft"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

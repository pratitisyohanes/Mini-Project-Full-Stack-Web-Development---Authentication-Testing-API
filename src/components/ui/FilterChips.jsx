export default function FilterChips({ filters = [], onRemove }) {
  if (filters.length === 0) return null

  return (
    <ul className="mb-6 flex flex-wrap items-center gap-2">
      <li className="text-sm text-inksoft">Filter aktif:</li>
      {filters.map((filter) => (
        <li key={filter}>
          <button
            type="button"
            onClick={() => onRemove?.(filter)}
            className="flex items-center gap-2 rounded-full bg-primarysoft px-3 py-1.5 text-sm font-semibold text-primarydk transition hover:bg-primary hover:text-white"
          >
            {filter}
            <span aria-hidden="true">×</span>
            <span className="sr-only">Hapus filter {filter}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

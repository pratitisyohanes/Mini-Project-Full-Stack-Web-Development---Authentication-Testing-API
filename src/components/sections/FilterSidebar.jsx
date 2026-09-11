import Button from '../ui/Button.jsx'

const fieldClass =
  'w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primarysoft'


function FilterGroup({ group }) {
  const { legend, type, options = [], id, value, onChange } = group

  return (
    <fieldset className="mt-6 border-t border-line pt-5 first:mt-0 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-bold uppercase tracking-wide">{legend}</legend>

      {(type === 'checkbox' || type === 'radio') && (
        <div className="space-y-2.5 text-sm">
          {options.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-3">
              <input
                className="h-4 w-4 accent-primary"
                type={type}
                name={id}
                value={option.value}
                defaultChecked={option.defaultChecked}
              />
              {option.stars && (
                <span className="text-yolk" aria-hidden="true">
                  {'★'.repeat(option.stars)}
                  {'☆'.repeat(5 - option.stars)}
                </span>
              )}
              <span className="flex-1">{option.label}</span>
              {option.count && <span className="text-inksoft">{option.count}</span>}
            </label>
          ))}
        </div>
      )}

      {type === 'select' && (
        <>
          <label className="sr-only" htmlFor={id}>
            {legend}
          </label>
          <select
            id={id}
            className={fieldClass}
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      )}

      {type === 'range' && (
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor={`${id}-min`}>
            Harga minimum
          </label>
          <input id={`${id}-min`} type="number" min="0" placeholder="Rp min" className={fieldClass} />
          <span className="text-inksoft" aria-hidden="true">
            —
          </span>
          <label className="sr-only" htmlFor={`${id}-max`}>
            Harga maksimum
          </label>
          <input id={`${id}-max`} type="number" min="0" placeholder="Rp max" className={fieldClass} />
        </div>
      )}
    </fieldset>
  )
}
export default function FilterSidebar({ groups = [], onReset, onApply }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-xl2 border border-line bg-surface p-6 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filter</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-semibold text-primarydk transition hover:underline"
          >
            Reset
          </button>
        </div>

        {groups.map((group) => (
          <FilterGroup key={group.id} group={group} />
        ))}

        <Button type="button" size="lg" fullWidth className="mt-7" onClick={onApply}>
          Terapkan filter
        </Button>
      </div>
    </aside>
  )
}

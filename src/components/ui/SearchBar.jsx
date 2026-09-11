import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../utils/styles.js'
import { asset } from '../../utils/asset.js'

export default function SearchBar({
  id,
  placeholder = 'Cari telur…',
  size = 'sm',
  buttonLabel,
  onSearch,
  className = '',
}) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSearch) {
      onSearch(query)
      return
    }
    navigate(query.trim() ? `/jelajahi?q=${encodeURIComponent(query.trim())}` : '/jelajahi')
  }

  const isLarge = size === 'lg'

  return (
    <form className={cn('relative', className)} role="search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={id}>
        Cari telur
      </label>
      <span
        className={cn(
          'pointer-events-none absolute top-1/2 -translate-y-1/2 opacity-60',
          isLarge ? 'left-5' : 'left-4',
        )}
        aria-hidden="true"
      >
        <img src={asset('/assets/icons/search.svg')} alt="" width={isLarge ? 20 : 18} height={isLarge ? 20 : 18} />
      </span>

      <input
        id={id}
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-full border border-line bg-white outline-none transition',
          'placeholder:text-inksoft focus:border-primary focus:ring-4 focus:ring-primarysoft',
          isLarge ? 'py-4 pl-14' : 'py-2.5 pl-11',
          buttonLabel ? (isLarge ? 'pr-32' : 'pr-24') : 'pr-4',
        )}
      />

      {buttonLabel && (
        <button
          type="submit"
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary font-semibold text-white transition hover:bg-primarydk',
            isLarge ? 'px-6 py-2.5' : 'px-4 py-1.5 text-sm',
          )}
        >
          {buttonLabel}
        </button>
      )}
    </form>
  )
}

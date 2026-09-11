import { Link } from 'react-router-dom'
import IconTile from '../ui/IconTile.jsx'

export default function CategoryCard({ category, variant = 'tile' }) {
  const { name, description, count, icon, tone, to } = category

  if (variant === 'compact') {
    return (
      <Link
        to={to}
        className="flex h-full items-center gap-3 rounded-xl2 border border-line bg-surface px-5 py-4 transition hover:border-primary hover:shadow-soft"
      >
        <IconTile icon={icon} tone={tone} size="sm" />
        <span>
          <span className="block font-bold">{name}</span>
          <span className="block text-sm text-inksoft">{count}</span>
        </span>
      </Link>
    )
  }

  if (variant === 'detail') {
    return (
      <Link
        to={to}
        className="group flex h-full flex-col rounded-xl2 border border-line bg-surface p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
      >
        <IconTile icon={icon} tone={tone} />
        <h3 className="mt-5 text-lg font-bold">{name}</h3>
        {description && <p className="mt-1.5 text-sm text-inksoft">{description}</p>}
        <p className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm font-semibold text-primarydk">
          {count}
          <span className="transition group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </p>
      </Link>
    )
  }

  return (
    <Link
      to={to}
      className="flex h-full flex-col items-center gap-1.5 rounded-xl2 border border-line bg-surface p-6 text-center transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-soft"
    >
      <IconTile icon={icon} tone={tone} className="mb-2" />
      <span className="font-bold">{name}</span>
      <span className="text-sm text-inksoft">{count}</span>
    </Link>
  )
}

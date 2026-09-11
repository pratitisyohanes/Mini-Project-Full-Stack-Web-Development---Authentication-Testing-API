import { Link } from 'react-router-dom'
import { cn } from '../../utils/styles.js'

export default function Logo({ brand, className = '' }) {
  return (
    <Link
      to="/"
      className={cn('flex shrink-0 items-center gap-2.5', className)}
      aria-label={`${brand.name}${brand.accent} beranda`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary" aria-hidden="true">
        <img src={brand.logo} alt="" width={24} height={24} />
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        {brand.name}
        <span className="text-primary">{brand.accent}</span>
      </span>
    </Link>
  )
}

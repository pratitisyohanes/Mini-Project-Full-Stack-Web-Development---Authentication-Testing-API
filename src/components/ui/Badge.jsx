import { cn } from '../../utils/styles.js'

const VARIANTS = {
  soft: 'bg-primarysoft text-primarydk',
  leaf: 'bg-leaf text-white',
  solid: 'bg-primary text-white',
  white: 'bg-white/95 text-primarydk',
}

export default function Badge({ children, variant = 'soft', className = '' }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-xs font-bold',
        VARIANTS[variant] ?? VARIANTS.soft,
        className,
      )}
    >
      {children}
    </span>
  )
}

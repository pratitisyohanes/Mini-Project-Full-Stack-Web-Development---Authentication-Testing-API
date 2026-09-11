import { cn, toneTile } from '../../utils/styles.js'

const SIZES = {
  sm: 'h-11 w-11 rounded-xl',
  md: 'h-14 w-14 rounded-2xl',
  lg: 'h-16 w-16 rounded-2xl',
}

const ICON_SIZES = { sm: 22, md: 26, lg: 30 }

export default function IconTile({ icon, tone = 'primary', size = 'md', className = '' }) {
  const px = ICON_SIZES[size] ?? ICON_SIZES.md

  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center',
        SIZES[size] ?? SIZES.md,
        toneTile(tone),
        className,
      )}
      aria-hidden="true"
    >
      <img src={icon} alt="" width={px} height={px} />
    </span>
  )
}

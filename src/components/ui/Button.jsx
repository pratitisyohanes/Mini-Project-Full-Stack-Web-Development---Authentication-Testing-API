import { Link } from 'react-router-dom'
import { cn } from '../../utils/styles.js'

const VARIANTS = {
  primary: 'bg-primary text-white shadow-soft hover:bg-primarydk',
  ghost: 'border border-line bg-transparent text-ink hover:border-primary hover:text-primarydk',
  light: 'bg-white text-ink hover:bg-primarysoft hover:text-primarydk',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    fullWidth && 'w-full',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

import { cn } from '../../utils/styles.js'


export default function SectionHeading({ title, subtitle, action, className = '' }) {
  return (
    <header
      className={cn(
        'mb-8 gap-4',
        action ? 'flex flex-col sm:flex-row sm:items-end sm:justify-between' : 'max-w-2xl',
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-inksoft">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}

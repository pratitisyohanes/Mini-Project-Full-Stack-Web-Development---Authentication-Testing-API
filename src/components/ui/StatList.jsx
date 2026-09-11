import { cn } from '../../utils/styles.js'
export default function StatList({ items = [], className = '' }) {
  return (
    <dl className={cn('flex flex-wrap gap-x-10 gap-y-4', className)}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-sm text-inksoft">{item.label}</dt>
          <dd className="text-2xl font-extrabold tracking-tight">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

import { cn } from '../../utils/styles.js'

const COLUMNS = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
}

export default function CardGrid({ columns = 3, className = '', children }) {
  return (
    <ul className={cn('grid gap-5', COLUMNS[columns] ?? COLUMNS[3], className)}>{children}</ul>
  )
}

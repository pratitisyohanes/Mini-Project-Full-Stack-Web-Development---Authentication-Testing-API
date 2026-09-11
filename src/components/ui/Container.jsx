import { cn } from '../../utils/styles.js'

export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-shell px-5', className)} {...rest}>
      {children}
    </Tag>
  )
}

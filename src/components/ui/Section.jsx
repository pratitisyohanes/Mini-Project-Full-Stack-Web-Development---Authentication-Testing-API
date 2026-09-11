import { cn } from '../../utils/styles.js'
import Container from './Container.jsx'

const BACKGROUNDS = {
  base: 'bg-bg',
  muted: 'border-y border-line bg-bgmuted',
  none: '',
}
export default function Section({
  id,
  background = 'base',
  className = '',
  containerClassName = '',
  children,
}) {
  return (
    <section id={id} className={cn(BACKGROUNDS[background] ?? BACKGROUNDS.base, className)}>
      <Container className={cn('py-14 md:py-20', containerClassName)}>{children}</Container>
    </section>
  )
}

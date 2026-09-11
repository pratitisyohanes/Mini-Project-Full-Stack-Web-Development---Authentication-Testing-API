import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'

export default function CtaBanner({ title, text, ctaLabel, ctaHref }) {
  return (
    <section>
      <Container className="pb-16 md:pb-24">
        <div className="flex flex-col items-center gap-6 rounded-xl2 bg-ink px-6 py-12 text-center text-white md:px-12">
          <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
          <p className="max-w-xl text-white/70">{text}</p>
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  )
}

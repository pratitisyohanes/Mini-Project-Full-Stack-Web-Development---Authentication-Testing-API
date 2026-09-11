import Button from '../ui/Button.jsx'
import Section from '../ui/Section.jsx'

export default function SellerSection({ id, title, text, benefits = [], ctaLabel, ctaHref, stat }) {
  return (
    <Section id={id}>
      <div className="grid items-center gap-10 rounded-xl2 bg-ink p-8 text-white md:p-12 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-3 text-white/70">{text}</p>

          <ul className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf text-xs font-bold"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-white/90">{benefit}</span>
              </li>
            ))}
          </ul>

          <Button href={ctaHref} size="lg" className="mt-8">
            {ctaLabel}
          </Button>
        </div>

        {stat && (
          <div className="rounded-xl2 border border-white/15 bg-white/10 p-7 backdrop-blur">
            <p className="text-sm text-white/70">{stat.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{stat.value}</p>

            <div className="mt-6 flex h-24 items-end gap-2.5" aria-hidden="true">
              {stat.bars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-yolk"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

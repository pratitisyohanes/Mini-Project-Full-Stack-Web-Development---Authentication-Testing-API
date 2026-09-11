import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Section from '../ui/Section.jsx'

export default function HighlightSection({ eyebrow, title, text, points = [], image, imageAlt, actions = [] }) {
  return (
    <Section>
      <div className="grid items-center gap-8 rounded-xl2 border border-line bg-surface p-6 shadow-soft md:grid-cols-2 md:p-10">
        <div>
          {eyebrow && (
            <Badge variant="leaf" className="mb-3 uppercase tracking-wide">
              {eyebrow}
            </Badge>
          )}
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-3 text-inksoft">{text}</p>

          <ul className="mt-5 space-y-2 text-sm">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="font-bold text-leaf" aria-hidden="true">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Button key={action.label} to={action.to} variant={action.variant} size="lg">
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl2 border border-line bg-bgmuted">
          <img className="h-full w-full object-cover" src={image} alt={imageAlt} loading="lazy" />
        </div>
      </div>
    </Section>
  )
}

import IconTile from '../ui/IconTile.jsx'
export default function FeatureCard({ feature }) {
  return (
    <article className="h-full rounded-xl2 border border-line bg-surface p-7 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <IconTile icon={feature.icon} tone="primary" />
      <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
      <p className="mt-2 text-inksoft">{feature.text}</p>
    </article>
  )
}

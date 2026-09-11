export default function TestimonialCard({ testimonial }) {
  const { quote, name, role } = testimonial

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <article className="flex h-full flex-col gap-5 rounded-xl2 border border-line bg-surface p-7 shadow-soft">
      <p className="flex-1 text-lg">“{quote}”</p>
      <footer className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primarysoft text-sm font-bold text-primarydk"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span>
          <span className="block font-bold">{name}</span>
          <span className="block text-sm text-inksoft">{role}</span>
        </span>
      </footer>
    </article>
  )
}

import Badge from '../ui/Badge.jsx'
import Breadcrumb from '../ui/Breadcrumb.jsx'
import Container from '../ui/Container.jsx'
import StatList from '../ui/StatList.jsx'

export default function PageHero({ eyebrow, title, subtitle, breadcrumb = [], stats, children }) {
  return (
    <section className="border-b border-line bg-gradient-to-b from-primarysoft/60 to-bg">
      <Container className="py-10 md:py-16">
        {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

        {eyebrow && <Badge className="mb-3 uppercase tracking-wide">{eyebrow}</Badge>}

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-inksoft">{subtitle}</p>}

        {stats && <StatList items={stats} className="mt-8" />}
        {children}
      </Container>
    </section>
  )
}

import Badge from '../ui/Badge.jsx'
import Container from '../ui/Container.jsx'
import SearchBar from '../ui/SearchBar.jsx'
import StatList from '../ui/StatList.jsx'

export default function HeroSection({ eyebrow, title, subtitle, searchPlaceholder, stats = [], cards = [] }) {
  const [frontCard, backCard] = cards

  return (
    <section className="border-b border-line bg-gradient-to-b from-primarysoft/60 to-bg">
      <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Badge className="mb-4 uppercase tracking-wide">{eyebrow}</Badge>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-inksoft">{subtitle}</p>

          <SearchBar
            id="search-hero"
            size="lg"
            buttonLabel="Cari"
            placeholder={searchPlaceholder}
            className="mt-7 max-w-xl"
          />

          <StatList items={stats} className="mt-9" />
        </div>

        <div className="relative hidden min-h-[420px] lg:block" aria-hidden="true">
          {frontCard && (
            <article className="absolute right-0 top-4 z-10 w-[300px] rounded-xl2 border border-line bg-surface p-4 shadow-lift">
              <div className="h-40 overflow-hidden rounded-xl bg-bgmuted">
                <img className="h-full w-full object-cover" src={frontCard.image} alt="" />
              </div>
              <p className="mt-4 font-bold">{frontCard.title}</p>
              <p className="text-sm text-inksoft">{frontCard.meta}</p>
              <p className="mt-1 font-extrabold text-primarydk">{frontCard.price}</p>
            </article>
          )}

          {backCard && (
            <article className="absolute bottom-2 left-0 w-[260px] -rotate-6 rounded-xl2 border border-line bg-surface p-4 shadow-lift">
              <div className="h-28 overflow-hidden rounded-xl bg-bgmuted">
                <img className="h-full w-full object-cover" src={backCard.image} alt="" />
              </div>
              <p className="mt-3 font-bold">{backCard.title}</p>
              <p className="text-sm text-inksoft">{backCard.meta}</p>
              <p className="mt-1 font-extrabold text-primarydk">{backCard.price}</p>
            </article>
          )}
        </div>
      </Container>
    </section>
  )
}

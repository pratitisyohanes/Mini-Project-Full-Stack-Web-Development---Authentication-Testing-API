import { useEffect, useState } from 'react'
import PageHero from '../components/sections/PageHero.jsx'
import CategorySection from '../components/sections/CategorySection.jsx'
import HighlightSection from '../components/sections/HighlightSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import Container from '../components/ui/Container.jsx'
import { getCategories } from '../services/productService.js'
import { mapCategoryToCard } from '../utils/mapCategory.js'
import { highlight, kategoriCta, kategoriHero } from '../data/kategoriData.js'

export default function KategoriPage() {
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data.map(mapCategoryToCard))
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <>
      <PageHero
        eyebrow={kategoriHero.eyebrow}
        title={kategoriHero.title}
        subtitle={kategoriHero.subtitle}
        breadcrumb={kategoriHero.breadcrumb}
      />

      {status === 'loading' && (
        <Container className="py-14 text-center text-inksoft">Memuat kategori dari file Excel…</Container>
      )}

      {status === 'error' && (
        <Container className="py-14 text-center text-inksoft">Gagal memuat kategori. Coba muat ulang halaman.</Container>
      )}

      {status === 'success' && (
        <CategorySection
          title="Semua kategori"
          subtitle="Diambil dari sheet product_categories beserta jumlah produknya."
          categories={categories}
          variant="detail"
          columns={3}
        />
      )}

      <HighlightSection
        eyebrow={highlight.eyebrow}
        title={highlight.title}
        text={highlight.text}
        points={highlight.points}
        image={highlight.image}
        imageAlt={highlight.imageAlt}
        actions={highlight.actions}
      />

      <CtaBanner
        title={kategoriCta.title}
        text={kategoriCta.text}
        ctaLabel={kategoriCta.ctaLabel}
        ctaHref={kategoriCta.ctaHref}
      />
    </>
  )
}

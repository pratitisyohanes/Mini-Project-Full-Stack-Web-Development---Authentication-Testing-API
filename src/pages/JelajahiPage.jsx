import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/sections/PageHero.jsx'
import FilterSidebar from '../components/sections/FilterSidebar.jsx'
import ResultToolbar from '../components/sections/ResultToolbar.jsx'
import NewsletterSection from '../components/sections/NewsletterSection.jsx'
import ProductCard from '../components/cards/ProductCard.jsx'
import CardGrid from '../components/ui/CardGrid.jsx'
import Container from '../components/ui/Container.jsx'
import FilterChips from '../components/ui/FilterChips.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import SearchBar from '../components/ui/SearchBar.jsx'
import { getCategories, getProducts, getProductsByCategory } from '../services/productService.js'
import { mapProductToCard } from '../utils/mapProduct.js'
import { jelajahiHero, jelajahiNewsletter, sortOptions } from '../data/jelajahiData.js'

const PAGE_SIZE = 8

function sortProducts(products, sortValue) {
  const sorted = [...products]

  switch (sortValue) {
    case 'Harga terendah':
      return sorted.sort((a, b) => a.price - b.price)
    case 'Harga tertinggi':
      return sorted.sort((a, b) => b.price - a.price)
    case 'Rating tertinggi':
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    case 'Terlaris':
      return sorted.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0))
    default:
      return sorted
  }
}

export default function JelajahiPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const selectedCategory = searchParams.get('kategori') ?? ''

  const [sortValue, setSortValue] = useState(sortOptions[0])
  const [currentPage, setCurrentPage] = useState(1)

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    const request = selectedCategory ? getProductsByCategory(selectedCategory) : getProducts()

    request
      .then((data) => {
        if (cancelled) return
        setProducts(data)
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [selectedCategory])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, selectedCategory, sortValue])

  const visibleProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    const matched = keyword
      ? products.filter((product) => product.name.toLowerCase().includes(keyword))
      : products

    return sortProducts(matched, sortValue)
  }, [products, query, sortValue])

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE))
  const pageProducts = visibleProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const selectedCategoryName = categories.find((category) => category.slug === selectedCategory)?.name ?? selectedCategory

  const meta = {
    from: visibleProducts.length === 0 ? '0' : String((currentPage - 1) * PAGE_SIZE + 1),
    to: String(Math.min(currentPage * PAGE_SIZE, visibleProducts.length)),
    total: String(visibleProducts.length),
  }

  const filterGroups = [
    {
      id: 'kategori',
      legend: 'Kategori',
      type: 'select',
      value: selectedCategory,
      onChange: (value) => setSearchParams((params) => {
        const next = new URLSearchParams(params)
        if (value) next.set('kategori', value)
        else next.delete('kategori')
        return next
      }),
      options: [
        { value: '', label: 'Semua kategori' },
        ...categories.map((category) => ({ value: category.slug, label: category.name })),
      ],
    },
  ]

  return (
    <>
      <PageHero title={jelajahiHero.title} subtitle={jelajahiHero.subtitle} breadcrumb={jelajahiHero.breadcrumb}>
        <SearchBar
          id="search-page"
          size="lg"
          buttonLabel="Cari"
          placeholder={jelajahiHero.searchPlaceholder}
          className="mt-7 max-w-2xl"
          onSearch={(value) =>
            setSearchParams((params) => {
              const next = new URLSearchParams(params)
              if (value.trim()) next.set('q', value.trim())
              else next.delete('q')
              return next
            })
          }
        />
      </PageHero>

      <Container className="grid gap-8 py-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-14">
        <FilterSidebar
          groups={filterGroups}
          onReset={() =>
            setSearchParams((params) => {
              const next = new URLSearchParams(params)
              next.delete('kategori')
              return next
            })
          }
        />

        <section aria-label="Hasil produk">
          <ResultToolbar meta={meta} sortOptions={sortOptions} sortValue={sortValue} onSortChange={setSortValue} />

          <FilterChips
            filters={selectedCategory ? [selectedCategoryName] : []}
            onRemove={() =>
              setSearchParams((params) => {
                const next = new URLSearchParams(params)
                next.delete('kategori')
                return next
              })
            }
          />

          {status === 'loading' && (
            <p className="rounded-xl2 border border-line bg-surface p-10 text-center text-inksoft">
              Memuat produk dari file Excel…
            </p>
          )}

          {status === 'error' && (
            <p className="rounded-xl2 border border-line bg-surface p-10 text-center text-inksoft">
              Gagal memuat produk. Coba muat ulang halaman.
            </p>
          )}

          {status === 'success' && pageProducts.length > 0 && (
            <CardGrid columns={3}>
              {pageProducts.map((product) => (
                <li key={product.id}>
                  <ProductCard product={mapProductToCard(product)} to={`/produk/${product.id}`} />
                </li>
              ))}
            </CardGrid>
          )}

          {status === 'success' && pageProducts.length === 0 && (
            <p className="rounded-xl2 border border-line bg-surface p-10 text-center text-inksoft">
              {query
                ? `Tidak ada produk yang cocok dengan kata kunci "${query}".`
                : 'Belum ada produk di kategori ini.'}
            </p>
          )}

          {status === 'success' && totalPages > 1 && (
            <Pagination
              pages={Array.from({ length: totalPages }, (_, index) => index + 1)}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </Container>

      <NewsletterSection
        title={jelajahiNewsletter.title}
        text={jelajahiNewsletter.text}
        placeholder={jelajahiNewsletter.placeholder}
        buttonLabel={jelajahiNewsletter.buttonLabel}
        variant="band"
      />
    </>
  )
}

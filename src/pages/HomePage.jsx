import HeroSection from '../components/sections/HeroSection.jsx'
import CategorySection from '../components/sections/CategorySection.jsx'
import ProductSection from '../components/sections/ProductSection.jsx'
import FeatureSection from '../components/sections/FeatureSection.jsx'
import SellerSection from '../components/sections/SellerSection.jsx'
import TestimonialSection from '../components/sections/TestimonialSection.jsx'
import NewsletterSection from '../components/sections/NewsletterSection.jsx'
import {
  bestSellers,
  categories,
  features,
  hero,
  newsletter,
  sellerCta,
  testimonials,
} from '../data/homeData.js'

export default function HomePage() {
  const handleBuy = (product) => {
    window.alert(`"${product.name}" ditambahkan ke keranjang.`)
  }

  return (
    <>
      <HeroSection
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        searchPlaceholder={hero.searchPlaceholder}
        stats={hero.stats}
        cards={hero.cards}
      />

      <CategorySection
        id="kategori"
        title="Cek jenis telur"
        subtitle="Temukan telur yang kamu inginkan."
        categories={categories}
        variant="tile"
        columns={6}
      />

      <ProductSection
        id="produk"
        title="Telur yang paling laris saat ini"
        subtitle="Pilihan terbaik dari para pembeli."
        products={bestSellers}
        action={{ label: 'Lihat semua pilihan', to: '/jelajahi' }}
        columns={4}
        onBuy={handleBuy}
      />

      <FeatureSection
        id="keunggulan"
        title="Telur segar setiap hari langsung dari kandang"
        subtitle="Kualitas ayam dan bebek kami jaga supaya telurnya selalu terbaik."
        features={features}
      />

      <SellerSection
        id="peternak"
        title={sellerCta.title}
        text={sellerCta.text}
        benefits={sellerCta.benefits}
        ctaLabel={sellerCta.ctaLabel}
        ctaHref={sellerCta.ctaHref}
        stat={sellerCta.stat}
      />

      <TestimonialSection
        id="testimoni"
        title="Kata mereka tentang kandang Elefez"
        subtitle="Dipercaya oleh banyak pembeli."
        testimonials={testimonials}
      />

      <NewsletterSection
        title={newsletter.title}
        text={newsletter.text}
        placeholder={newsletter.placeholder}
        buttonLabel={newsletter.buttonLabel}
        variant="card"
      />
    </>
  )
}

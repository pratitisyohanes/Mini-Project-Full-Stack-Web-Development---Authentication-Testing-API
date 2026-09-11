import ProductCard from '../cards/ProductCard.jsx'
import Button from '../ui/Button.jsx'
import CardGrid from '../ui/CardGrid.jsx'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function ProductSection({
  id,
  title,
  subtitle,
  products = [],
  action,
  columns = 4,
  background = 'muted',
  onBuy,
}) {
  return (
    <Section id={id} background={background}>
      <SectionHeading
        title={title}
        subtitle={subtitle}
        action={
          action && (
            <Button variant="ghost" to={action.to}>
              {action.label}
            </Button>
          )
        }
      />
      <CardGrid columns={columns}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} onBuy={onBuy} />
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}

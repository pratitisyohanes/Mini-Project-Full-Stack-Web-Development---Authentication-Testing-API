import CategoryCard from '../cards/CategoryCard.jsx'
import CardGrid from '../ui/CardGrid.jsx'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function CategorySection({
  id,
  title,
  subtitle,
  categories = [],
  variant = 'tile',
  columns = 6,
  background = 'base',
}) {
  return (
    <Section id={id} background={background}>
      <SectionHeading title={title} subtitle={subtitle} />
      <CardGrid columns={columns}>
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} variant={variant} />
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}

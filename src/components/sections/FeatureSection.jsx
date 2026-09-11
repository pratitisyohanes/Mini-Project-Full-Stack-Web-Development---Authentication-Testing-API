import FeatureCard from '../cards/FeatureCard.jsx'
import CardGrid from '../ui/CardGrid.jsx'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function FeatureSection({ id, title, subtitle, features = [] }) {
  return (
    <Section id={id}>
      <SectionHeading title={title} subtitle={subtitle} />
      <CardGrid columns={3}>
        {features.map((feature) => (
          <li key={feature.id}>
            <FeatureCard feature={feature} />
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}

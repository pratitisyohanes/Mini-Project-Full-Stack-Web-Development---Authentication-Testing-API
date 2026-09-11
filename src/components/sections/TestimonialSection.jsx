import TestimonialCard from '../cards/TestimonialCard.jsx'
import CardGrid from '../ui/CardGrid.jsx'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function TestimonialSection({ id, title, subtitle, testimonials = [] }) {
  return (
    <Section id={id} background="muted">
      <SectionHeading title={title} subtitle={subtitle} />
      <CardGrid columns={3}>
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}

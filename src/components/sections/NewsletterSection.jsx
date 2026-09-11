import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import { cn } from '../../utils/styles.js'

export default function NewsletterSection({
  title,
  text,
  placeholder = 'nama@email.com',
  buttonLabel = 'Berlangganan',
  variant = 'card',
}) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubscribed(true)
    setEmail('')
  }

  const content = (
    <div
      className={cn(
        'flex flex-col items-center gap-6 text-center md:flex-row md:text-left',
        variant === 'card' && 'rounded-xl2 bg-primarysoft px-6 py-10 md:px-12',
      )}
    >
      <div className="flex-1">
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        <p className="mt-2 text-inksoft">{text}</p>
      </div>

      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor={`newsletter-${variant}`}>
            Alamat email
          </label>
          <input
            id={`newsletter-${variant}`}
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full border border-line bg-surface px-5 py-3 outline-none transition placeholder:text-inksoft focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
          <Button type="submit" size="lg" className="shrink-0">
            {buttonLabel}
          </Button>
        </div>

        {isSubscribed && (
          <p className="mt-3 text-sm font-semibold text-leaf" role="status">
            Terima kasih! Info stok telur akan dikirim ke emailmu.
          </p>
        )}
      </form>
    </div>
  )

  if (variant === 'band') {
    return (
      <section className="border-t border-line bg-bgmuted">
        <Container className="py-14">{content}</Container>
      </section>
    )
  }

  return (
    <section>
      <Container className="py-14 md:py-20">{content}</Container>
    </section>
  )
}

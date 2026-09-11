import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'

export default function Footer({ brand, columns = [], socialLinks = [] }) {
  return (
    <footer className="border-t border-line bg-bgmuted">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo brand={brand} />
          <p className="mt-4 max-w-xs text-sm text-inksoft">{brand.tagline}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide">{column.title}</h2>
            <ul className="space-y-2.5 text-sm text-inksoft">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link className="transition hover:text-primarydk" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-inksoft">
            © {new Date().getFullYear()} {brand.name}
            {brand.accent}. Semua hak cipta dilindungi.
          </p>
          <ul className="flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface transition hover:-translate-y-0.5 hover:border-primary"
                >
                  <img src={social.icon} alt="" width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}

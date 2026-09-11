import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'
import SearchBar from '../ui/SearchBar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { cn } from '../../utils/styles.js'

export default function Navbar({ brand, navItems = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const linkClass = (to) =>
    cn(
      'block rounded-lg px-3 py-2 text-sm font-semibold transition',
      to === pathname
        ? 'bg-primarysoft text-primarydk'
        : 'text-inksoft hover:bg-primarysoft hover:text-primarydk',
    )

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <Container className="flex items-center gap-4 py-3">
        <Logo brand={brand} />

        <nav className="ml-4 hidden lg:block" aria-label="Navigasi utama">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={linkClass(item.to)}
                  aria-current={item.to === pathname ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SearchBar
          id="search-header"
          placeholder="Cari telur kampung, negeri, omega…"
          className="ml-auto hidden max-w-sm flex-1 md:block"
        />

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" to="/seller" className="hidden sm:inline-flex">
                Dasbor Seller
              </Button>
              <Button size="sm" onClick={handleLogout}>
                Keluar
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" to="/login">
              Masuk
            </Button>
          )}

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-lg lg:hidden"
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span aria-hidden="true">{isOpen ? '✕' : '☰'}</span>
            <span className="sr-only">Buka menu navigasi</span>
          </button>
        </div>
      </Container>

      {isOpen && (
        <nav id="menu-mobile" className="border-t border-line lg:hidden" aria-label="Navigasi mobile">
          <Container className="py-3">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass(item.to)} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}

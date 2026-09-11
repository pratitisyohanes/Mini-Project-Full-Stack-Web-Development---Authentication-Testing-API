import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import { brand } from '../../data/siteData.js'

export default function Layout({ navItems, footerColumns, socialLinks, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        href="#main"
      >
        Lewati ke konten utama
      </a>

      <Navbar brand={brand} navItems={navItems} />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer brand={brand} columns={footerColumns} socialLinks={socialLinks} />
    </div>
  )
}

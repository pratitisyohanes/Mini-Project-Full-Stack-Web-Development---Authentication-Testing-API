import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import HomePage from './pages/HomePage.jsx'
import KategoriPage from './pages/KategoriPage.jsx'
import JelajahiPage from './pages/JelajahiPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SellerDashboardPage from './pages/SellerDashboardPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { footerColumns, navItems, socialLinks } from './data/siteData.js'

export default function App() {
  return (
    <Layout navItems={navItems} footerColumns={footerColumns} socialLinks={socialLinks}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kategori" element={<KategoriPage />} />
        <Route path="/jelajahi" element={<JelajahiPage />} />
        <Route path="/produk/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/seller"
          element={
            <RequireAuth>
              <SellerDashboardPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

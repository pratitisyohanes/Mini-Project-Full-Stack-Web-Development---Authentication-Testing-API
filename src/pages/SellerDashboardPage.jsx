import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Badge from '../components/ui/Badge.jsx'
import ProductForm from '../components/seller/ProductForm.jsx'
import { createProduct, deleteProduct, getCategories, getProducts, updateProduct } from '../services/productService.js'
import { getUsers } from '../services/userService.js'
import { getTransactions } from '../services/transactionService.js'
import { exportWorkbook, resetTables } from '../services/excelClient.js'
import { useAuth } from '../context/AuthContext.jsx'
import { iconUrl, mediaUrl } from '../utils/asset.js'
import { formatRupiah } from '../utils/format.js'

const TABS = [
  { id: 'produk', label: 'Kelola Produk' },
  { id: 'transaksi', label: 'Transaksi' },
  { id: 'pengguna', label: 'Pengguna' },
]

const STATUS_LABELS = { paid: 'Dibayar', shipped: 'Dikirim', completed: 'Selesai', cancelled: 'Dibatalkan' }

export default function SellerDashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  const [tab, setTab] = useState('produk')

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productStatus, setProductStatus] = useState('loading')
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [transactions, setTransactions] = useState([])
  const [transactionStatus, setTransactionStatus] = useState('idle')

  const [users, setUsers] = useState([])
  const [userStatus, setUserStatus] = useState('idle')

  const ownsRow = (sellerId) => isAdmin || sellerId === user?.id

  function loadProducts() {
    return Promise.all([getProducts(), getCategories()])
      .then(([productRows, categoryRows]) => {
        setProducts(productRows.filter((product) => ownsRow(product.user_id)))
        setCategories(categoryRows)
        setProductStatus('success')
      })
      .catch(() => setProductStatus('error'))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (tab !== 'transaksi' || transactionStatus !== 'idle') return

    setTransactionStatus('loading')
    getTransactions()
      .then((rows) => {
        setTransactions(rows.filter((row) => ownsRow(row.seller_id)))
        setTransactionStatus('success')
      })
      .catch(() => setTransactionStatus('error'))
  }, [tab, transactionStatus])

  useEffect(() => {
    if (tab !== 'pengguna' || userStatus !== 'idle') return

    setUserStatus('loading')
    getUsers()
      .then((rows) => {
        setUsers(rows)
        setUserStatus('success')
      })
      .catch(() => setUserStatus('error'))
  }, [tab, userStatus])

  function handleLogout() {
    logout()
    navigate('/')
  }

  async function handleCreate(values) {
    await createProduct(values, user.id)
    await loadProducts()
    setIsCreating(false)
  }

  async function handleUpdate(id, values) {
    await updateProduct(id, values)
    await loadProducts()
    setEditingId(null)
  }

  async function handleDelete(id) {
    if (!window.confirm('Hapus produk ini?')) return
    try {
      await deleteProduct(id)
      setProducts((current) => current.filter((product) => product.id !== id))
    } catch (error) {
      window.alert(error.message)
    }
  }

  function handleReset() {
    if (!window.confirm('Buang semua perubahan di browser ini dan kembali ke isi file Excel asli?')) return
    resetTables()
    setProductStatus('loading')
    setTransactionStatus('idle')
    setUserStatus('idle')
    loadProducts()
  }

  return (
    <Container className="py-12 md:py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Dasbor Seller</h1>
          <p className="mt-1 text-inksoft">
            Masuk sebagai <span className="font-semibold text-ink">{user?.full_name}</span> ({user?.role}). Data
            dibaca dari file Excel; perubahan tersimpan di browser ini.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => exportWorkbook()}>
            Unduh Excel
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            Reset data
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            Keluar
          </Button>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-line">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`shrink-0 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === item.id ? 'border-primary text-primarydk' : 'border-transparent text-inksoft hover:text-ink'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'produk' && (
        <div>
          <div className="mb-5 flex justify-end">
            {!isCreating && (
              <Button
                onClick={() => {
                  setIsCreating(true)
                  setEditingId(null)
                }}
              >
                + Tambah produk
              </Button>
            )}
          </div>

          {isCreating && (
            <div className="mb-6 rounded-xl2 border border-line bg-surface p-6 shadow-soft">
              <h2 className="mb-4 text-lg font-bold">Tambah produk baru</h2>
              <ProductForm
                categories={categories}
                submitLabel="Simpan produk"
                onSubmit={handleCreate}
                onCancel={() => setIsCreating(false)}
              />
            </div>
          )}

          {productStatus === 'loading' && <p className="text-inksoft">Memuat produk…</p>}
          {productStatus === 'error' && <p className="text-inksoft">Gagal memuat produk.</p>}
          {productStatus === 'success' && products.length === 0 && (
            <p className="text-inksoft">Belum ada produk. Tambahkan produk pertamamu.</p>
          )}

          {productStatus === 'success' && (
            <ul className="space-y-3">
              {products.map((product) =>
                editingId === product.id ? (
                  <li key={product.id} className="rounded-xl2 border border-line bg-surface p-6 shadow-soft">
                    <h2 className="mb-4 text-lg font-bold">Edit produk</h2>
                    <ProductForm
                      initialValues={product}
                      categories={categories}
                      submitLabel="Simpan perubahan"
                      onSubmit={(values) => handleUpdate(product.id, values)}
                      onCancel={() => setEditingId(null)}
                    />
                  </li>
                ) : (
                  <li
                    key={product.id}
                    className="flex flex-wrap items-center gap-4 rounded-xl2 border border-line bg-surface p-4 shadow-soft"
                  >
                    <img
                      src={mediaUrl(product.image) ?? iconUrl(product.category_icon)}
                      alt={product.name}
                      className="h-14 w-14 rounded-lg bg-bgmuted object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{product.name}</p>
                      <p className="text-sm text-inksoft">
                        {product.category} · {formatRupiah(product.price)} ·{' '}
                        {product.stock > 0 ? `Stok ${product.stock}` : 'Stok habis'}
                        {isAdmin && ` · ${product.seller}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(product.id)
                          setIsCreating(false)
                        }}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)}>
                        Hapus
                      </Button>
                    </div>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      )}

      {tab === 'transaksi' && (
        <div>
          {transactionStatus === 'loading' && <p className="text-inksoft">Memuat transaksi…</p>}
          {transactionStatus === 'error' && <p className="text-inksoft">Gagal memuat transaksi.</p>}
          {transactionStatus === 'success' && transactions.length === 0 && (
            <p className="text-inksoft">Belum ada transaksi untuk produkmu.</p>
          )}

          {transactionStatus === 'success' && (
            <ul className="space-y-3">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-line bg-surface p-4 shadow-soft"
                >
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {transaction.product}{' '}
                      <span className="font-normal text-inksoft">× {transaction.quantity}</span>
                    </p>
                    <p className="text-sm text-inksoft">
                      {transaction.buyer} · {transaction.created_at}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={transaction.status === 'completed' ? 'leaf' : 'soft'}>
                      {STATUS_LABELS[transaction.status] ?? transaction.status}
                    </Badge>
                    <span className="font-bold tabular-nums">{formatRupiah(transaction.total_price)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'pengguna' && (
        <div>
          {userStatus === 'loading' && <p className="text-inksoft">Memuat pengguna…</p>}
          {userStatus === 'error' && <p className="text-inksoft">Gagal memuat daftar pengguna.</p>}

          {userStatus === 'success' && (
            <ul className="space-y-3">
              {users.map((member) => (
                <li
                  key={member.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-line bg-surface p-4 shadow-soft"
                >
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {member.full_name} <span className="font-normal text-inksoft">@{member.username}</span>
                    </p>
                    <p className="text-sm text-inksoft">
                      {member.email} · {member.city}
                    </p>
                  </div>
                  <Badge variant={member.role === 'buyer' ? 'soft' : 'solid'}>{member.role}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Container>
  )
}

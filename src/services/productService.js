import { getTable, nextId, saveTable } from './excelClient.js'

const EDITABLE_COLUMNS = ['category_id', 'name', 'description', 'price', 'stock', 'image']

function pickEditable(values) {
  return Object.fromEntries(EDITABLE_COLUMNS.map((column) => [column, values[column]]))
}

function timestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ')
}

async function getJoinedProducts() {
  const [products, categories, users] = await Promise.all([
    getTable('products'),
    getTable('product_categories'),
    getTable('users'),
  ])
  const categoryById = new Map(categories.map((category) => [category.id, category]))
  const userById = new Map(users.map((user) => [user.id, user]))

  return products.map((product) => {
    const category = categoryById.get(product.category_id)
    return {
      ...product,
      category: category?.name ?? 'Tanpa kategori',
      category_slug: category?.slug ?? '',
      category_icon: category?.icon ?? 'carton.svg',
      seller: userById.get(product.user_id)?.full_name ?? 'Peternak mitra',
    }
  })
}

export function getProducts() {
  return getJoinedProducts()
}

export async function getProduct(id) {
  const product = (await getJoinedProducts()).find((item) => item.id === Number(id))
  if (!product) throw new Error(`Produk #${id} tidak ditemukan.`)
  return product
}

export async function getCategories() {
  const [categories, products] = await Promise.all([getTable('product_categories'), getTable('products')])

  return categories.map((category) => ({
    ...category,
    product_count: products.filter((product) => product.category_id === category.id).length,
  }))
}

export async function getProductsByCategory(slug) {
  return (await getJoinedProducts()).filter((product) => product.category_slug === slug)
}

export async function createProduct(values, sellerId) {
  const products = await getTable('products')
  const product = {
    id: nextId(products),
    user_id: sellerId,
    ...pickEditable(values),
    rating: 0,
    review_count: 0,
    created_at: timestamp(),
  }

  saveTable('products', [...products, product])
  return product
}

export async function updateProduct(id, values) {
  const products = await getTable('products')
  if (!products.some((product) => product.id === id)) throw new Error(`Produk #${id} tidak ditemukan.`)

  saveTable(
    'products',
    products.map((product) => (product.id === id ? { ...product, ...pickEditable(values) } : product)),
  )
}

export async function deleteProduct(id) {
  const [products, transactions] = await Promise.all([getTable('products'), getTable('transactions')])

  if (transactions.some((transaction) => transaction.product_id === id)) {
    throw new Error('Produk ini sudah punya transaksi, jadi tidak bisa dihapus. Ubah stoknya menjadi 0 saja.')
  }

  saveTable('products', products.filter((product) => product.id !== id))
}

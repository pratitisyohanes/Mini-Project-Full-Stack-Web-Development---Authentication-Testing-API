import { getTable } from './excelClient.js'

export async function getTransactions() {
  const [transactions, users, products] = await Promise.all([
    getTable('transactions'),
    getTable('users'),
    getTable('products'),
  ])
  const userById = new Map(users.map((user) => [user.id, user]))
  const productById = new Map(products.map((product) => [product.id, product]))

  return transactions
    .map((transaction) => {
      const product = productById.get(transaction.product_id)
      return {
        ...transaction,
        buyer: userById.get(transaction.buyer_id)?.full_name ?? 'Pembeli',
        product: product?.name ?? `Produk #${transaction.product_id}`,
        seller_id: product?.user_id,
      }
    })
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
}

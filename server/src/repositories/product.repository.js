import { pool } from '../config/database.js'

const SORTABLE_COLUMNS = new Set(['price', 'rating', 'review_count', 'created_at', 'name'])

const BASE_QUERY = `
  SELECT
    p.id, p.name, p.description, p.price, p.stock, p.image, p.rating,
    p.review_count, p.status, p.created_at,
    c.id AS category_id, c.name AS category_name,
    u.id AS user_id, u.full_name AS seller_name
  FROM products p
  JOIN product_categories c ON c.id = p.category_id
  JOIN users u ON u.id = p.user_id
`

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    stock: row.stock,
    image: row.image,
    rating: Number(row.rating),
    review_count: row.review_count,
    status: row.status,
    created_at: row.created_at,
    category: { id: row.category_id, name: row.category_name },
    seller: { id: row.user_id, name: row.seller_name },
  }
}

export async function findAll(filters = {}) {
  const conditions = []
  const params = []

  if (filters.search) {
    conditions.push('p.name LIKE ?')
    params.push(`%${filters.search}%`)
  }

  if (filters.category_id) {
    conditions.push('p.category_id = ?')
    params.push(filters.category_id)
  }

  if (filters.min_price) {
    conditions.push('p.price >= ?')
    params.push(filters.min_price)
  }

  if (filters.max_price) {
    conditions.push('p.price <= ?')
    params.push(filters.max_price)
  }

  let query = BASE_QUERY
  if (conditions.length) {
    query += ` WHERE ${conditions.join(' AND ')}`
  }

  const sortBy = SORTABLE_COLUMNS.has(filters.sort_by) ? filters.sort_by : 'created_at'
  const order = filters.order === 'asc' ? 'ASC' : 'DESC'
  query += ` ORDER BY p.${sortBy} ${order}`

  const [rows] = await pool.query(query, params)
  return rows.map(mapRow)
}

export async function findById(id) {
  const [rows] = await pool.query(`${BASE_QUERY} WHERE p.id = ?`, [id])
  return rows[0] ? mapRow(rows[0]) : null
}

export async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO products (category_id, user_id, name, description, price, stock, image, rating, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.category_id,
      data.user_id,
      data.name,
      data.description,
      data.price,
      data.stock,
      data.image ?? null,
      data.rating,
      data.status ?? 'active',
    ],
  )
  return findById(result.insertId)
}

export async function update(id, data) {
  await pool.query(
    `UPDATE products
     SET category_id = ?, name = ?, description = ?, price = ?, stock = ?, image = ?, rating = ?, status = ?
     WHERE id = ?`,
    [
      data.category_id,
      data.name,
      data.description,
      data.price,
      data.stock,
      data.image ?? null,
      data.rating,
      data.status ?? 'active',
      id,
    ],
  )
  return findById(id)
}

export async function remove(id) {
  await pool.query('DELETE FROM products WHERE id = ?', [id])
}

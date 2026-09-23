import { pool } from '../config/database.js'

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    icon: row.icon,
    created_at: row.created_at,
    product_count: Number(row.product_count),
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function findAll() {
  const [rows] = await pool.query(`
    SELECT c.*, COUNT(p.id) AS product_count
    FROM product_categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.name ASC
  `)
  return rows.map(mapRow)
}

export async function findById(id) {
  const [rows] = await pool.query(
    `
    SELECT c.*, COUNT(p.id) AS product_count
    FROM product_categories c
    LEFT JOIN products p ON p.category_id = c.id
    WHERE c.id = ?
    GROUP BY c.id
  `,
    [id],
  )
  return rows[0] ? mapRow(rows[0]) : null
}

export async function existsById(id) {
  const [rows] = await pool.query('SELECT id FROM product_categories WHERE id = ?', [id])
  return rows.length > 0
}

export async function create(data) {
  const [result] = await pool.query(
    'INSERT INTO product_categories (name, slug, description) VALUES (?, ?, ?)',
    [data.name, slugify(data.name), data.description ?? null],
  )
  return findById(result.insertId)
}

export async function update(id, data) {
  await pool.query(
    'UPDATE product_categories SET name = ?, slug = ?, description = ? WHERE id = ?',
    [data.name, slugify(data.name), data.description ?? null, id],
  )
  return findById(id)
}

export async function remove(id) {
  await pool.query('DELETE FROM product_categories WHERE id = ?', [id])
}

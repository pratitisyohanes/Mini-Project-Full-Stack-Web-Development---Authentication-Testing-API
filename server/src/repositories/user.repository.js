import { pool } from '../config/database.js'

export async function findByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
  return rows[0] ?? null
}

export async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, full_name, username, email, role, city FROM users WHERE id = ?',
    [id],
  )
  return rows[0] ?? null
}

export async function existsByUsernameOrEmail(username, email) {
  const [rows] = await pool.query('SELECT id FROM users WHERE username = ? OR email = ?', [
    username,
    email,
  ])
  return rows.length > 0
}

export async function create(data) {
  const [result] = await pool.query(
    'INSERT INTO users (full_name, username, email, password_hash, phone, role, city) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      data.full_name,
      data.username,
      data.email,
      data.password_hash,
      data.phone ?? null,
      data.role ?? 'buyer',
      data.city ?? null,
    ],
  )
  return findById(result.insertId)
}

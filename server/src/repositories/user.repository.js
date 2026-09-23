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

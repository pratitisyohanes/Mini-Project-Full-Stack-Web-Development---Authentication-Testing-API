import 'dotenv/config'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  const [users] = await connection.query('SELECT id, password_hash FROM users')

  for (const user of users) {
    if (user.password_hash.startsWith('$2')) continue
    const hashed = await bcrypt.hash(user.password_hash, 10)
    await connection.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashed, user.id])
  }

  await connection.end()
}

run()

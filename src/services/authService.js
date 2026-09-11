import { getTable } from './excelClient.js'
import { toPublicUser } from './userService.js'

const DASHBOARD_ROLES = ['seller', 'admin']

export async function login(username, password) {
  const user = (await getTable('users')).find((row) => row.username === username.trim())

  if (!user || String(user.password) !== password) {
    throw new Error('Username atau password salah.')
  }
  if (!DASHBOARD_ROLES.includes(user.role)) {
    throw new Error('Akun pembeli tidak punya akses ke Dasbor Seller.')
  }

  return { token: `excel.${user.id}.${Date.now().toString(36)}`, user: toPublicUser(user) }
}

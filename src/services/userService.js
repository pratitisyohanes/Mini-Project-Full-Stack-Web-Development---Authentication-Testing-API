import { getTable } from './excelClient.js'

export function toPublicUser({ password, ...user }) {
  return user
}

export async function getUsers() {
  return (await getTable('users')).map(toPublicUser)
}

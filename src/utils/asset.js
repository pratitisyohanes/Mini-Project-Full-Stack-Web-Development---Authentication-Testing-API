export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function mediaUrl(path) {
  if (!path) return undefined
  return /^https?:\/\//.test(path) ? path : asset(path)
}

export function iconUrl(file = 'carton.svg') {
  return asset(`/assets/icons/${file}`)
}

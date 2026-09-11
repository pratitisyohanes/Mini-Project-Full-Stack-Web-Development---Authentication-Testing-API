const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function formatRupiah(value) {
  if (typeof value !== 'number') return value
  return rupiah.format(value).replace(/\s/g, '')
}

export function formatRating(value) {
  return String(value).replace('.', ',')
}

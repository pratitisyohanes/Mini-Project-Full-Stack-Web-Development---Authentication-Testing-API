export function validateCategory(body) {
  const errors = {}

  if (!body.name || typeof body.name !== 'string') {
    errors.name = ['Name wajib diisi dan harus berupa string']
  } else if (body.name.length > 100) {
    errors.name = ['Name maksimal 100 karakter']
  }

  if (body.description !== undefined && body.description !== null && typeof body.description !== 'string') {
    errors.description = ['Description harus berupa string']
  }

  return errors
}

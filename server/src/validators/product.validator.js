export function validateProduct(body) {
  const errors = {}

  if (!body.name || typeof body.name !== 'string') {
    errors.name = ['Name wajib diisi dan harus berupa string']
  } else if (body.name.length > 255) {
    errors.name = ['Name maksimal 255 karakter']
  }

  if (!body.description || typeof body.description !== 'string') {
    errors.description = ['Description wajib diisi dan harus berupa string']
  }

  if (body.price === undefined || body.price === null || Number.isNaN(Number(body.price))) {
    errors.price = ['Price wajib diisi dan harus berupa angka']
  } else if (Number(body.price) < 0) {
    errors.price = ['Price minimal 0']
  }

  if (body.rating === undefined || body.rating === null || Number.isNaN(Number(body.rating))) {
    errors.rating = ['Rating wajib diisi dan harus berupa angka']
  } else if (Number(body.rating) < 0 || Number(body.rating) > 10) {
    errors.rating = ['Rating harus antara 0 dan 10']
  }

  if (body.category_id === undefined || body.category_id === null || !Number.isInteger(Number(body.category_id))) {
    errors.category_id = ['Category id wajib diisi dan harus berupa integer']
  }

  if (body.stock === undefined || body.stock === null || !Number.isInteger(Number(body.stock))) {
    errors.stock = ['Stock wajib diisi dan harus berupa integer']
  } else if (Number(body.stock) < 0) {
    errors.stock = ['Stock minimal 0']
  }

  if (body.image !== undefined && body.image !== null && typeof body.image !== 'string') {
    errors.image = ['Image harus berupa string']
  }

  if (body.status !== undefined && body.status !== null && !['active', 'inactive'].includes(body.status)) {
    errors.status = ['Status hanya boleh active atau inactive']
  }

  return errors
}

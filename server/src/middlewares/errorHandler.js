import { AppError } from '../utils/errors.js'

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    const body = { success: false, message: err.message }
    if (err.errors) body.errors = err.errors
    return res.status(err.statusCode).json(body)
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(422).json({
      success: false,
      message: 'Validasi gagal',
      errors: { name: ['Nama sudah digunakan'] },
    })
  }

  if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
    return res.status(409).json({
      success: false,
      message: 'Data tidak bisa dihapus karena masih dipakai data lain',
    })
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
    return res.status(422).json({
      success: false,
      message: 'Validasi gagal',
      errors: { category_id: ['Kategori tidak ditemukan'] },
    })
  }

  console.error(err)
  res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' })
}

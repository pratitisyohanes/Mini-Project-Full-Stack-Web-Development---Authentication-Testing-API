import * as productRepository from '../repositories/product.repository.js'
import * as categoryRepository from '../repositories/category.repository.js'
import { validateProduct } from '../validators/product.validator.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/response.js'
import { AppError } from '../utils/errors.js'
import { ratingClass } from '../utils/ratingClass.js'

function withRatingClass(product) {
  return { ...product, rating_class: ratingClass(product.rating) }
}

async function assertCategoryExists(categoryId) {
  const exists = await categoryRepository.existsById(categoryId)
  if (!exists) {
    throw new AppError(422, 'Validasi gagal', { category_id: ['Kategori tidak ditemukan'] })
  }
}

function assertOwner(product, user) {
  if (user.role !== 'admin' && product.seller.id !== user.id) {
    throw new AppError(403, 'Anda tidak memiliki akses untuk mengubah data ini')
  }
}

export const list = asyncHandler(async (req, res) => {
  const products = await productRepository.findAll(req.query)
  ok(res, products.map(withRatingClass), 'Data produk berhasil diambil')
})

export const getById = asyncHandler(async (req, res) => {
  const product = await productRepository.findById(req.params.id)
  if (!product) throw new AppError(404, 'Data tidak ditemukan')
  ok(res, withRatingClass(product), 'Detail produk berhasil diambil')
})

export const create = asyncHandler(async (req, res) => {
  const errors = validateProduct(req.body)
  if (Object.keys(errors).length) throw new AppError(422, 'Validasi gagal', errors)

  await assertCategoryExists(req.body.category_id)

  const product = await productRepository.create({ ...req.body, user_id: req.user.id })
  created(res, withRatingClass(product), 'Produk berhasil ditambahkan')
})

export const update = asyncHandler(async (req, res) => {
  const product = await productRepository.findById(req.params.id)
  if (!product) throw new AppError(404, 'Data tidak ditemukan')

  assertOwner(product, req.user)

  const errors = validateProduct(req.body)
  if (Object.keys(errors).length) throw new AppError(422, 'Validasi gagal', errors)

  await assertCategoryExists(req.body.category_id)

  const updated = await productRepository.update(req.params.id, req.body)
  ok(res, withRatingClass(updated), 'Produk berhasil diperbarui')
})

export const remove = asyncHandler(async (req, res) => {
  const product = await productRepository.findById(req.params.id)
  if (!product) throw new AppError(404, 'Data tidak ditemukan')

  assertOwner(product, req.user)

  await productRepository.remove(req.params.id)
  ok(res, null, 'Produk berhasil dihapus')
})

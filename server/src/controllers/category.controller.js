import * as categoryRepository from '../repositories/category.repository.js'
import * as productRepository from '../repositories/product.repository.js'
import { validateCategory } from '../validators/category.validator.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/response.js'
import { AppError } from '../utils/errors.js'

export const list = asyncHandler(async (req, res) => {
  const categories = await categoryRepository.findAll()
  ok(res, categories, 'Data kategori berhasil diambil')
})

export const getById = asyncHandler(async (req, res) => {
  const category = await categoryRepository.findById(req.params.id)
  if (!category) throw new AppError(404, 'Data tidak ditemukan')

  const products = await productRepository.findAll({ category_id: req.params.id })
  ok(res, { ...category, products }, 'Detail kategori berhasil diambil')
})

export const create = asyncHandler(async (req, res) => {
  const errors = validateCategory(req.body)
  if (Object.keys(errors).length) throw new AppError(422, 'Validasi gagal', errors)

  const category = await categoryRepository.create(req.body)
  created(res, category, 'Kategori berhasil ditambahkan')
})

export const update = asyncHandler(async (req, res) => {
  const existing = await categoryRepository.findById(req.params.id)
  if (!existing) throw new AppError(404, 'Data tidak ditemukan')

  const errors = validateCategory(req.body)
  if (Object.keys(errors).length) throw new AppError(422, 'Validasi gagal', errors)

  const category = await categoryRepository.update(req.params.id, req.body)
  ok(res, category, 'Kategori berhasil diperbarui')
})

export const remove = asyncHandler(async (req, res) => {
  const existing = await categoryRepository.findById(req.params.id)
  if (!existing) throw new AppError(404, 'Data tidak ditemukan')

  if (existing.product_count > 0) {
    throw new AppError(409, 'Kategori masih memiliki produk terkait')
  }

  await categoryRepository.remove(req.params.id)
  ok(res, null, 'Kategori berhasil dihapus')
})

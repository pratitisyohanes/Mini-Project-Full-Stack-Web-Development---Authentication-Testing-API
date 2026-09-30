import bcrypt from 'bcryptjs'
import * as userRepository from '../repositories/user.repository.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/response.js'
import { AppError } from '../utils/errors.js'
import { signToken } from '../utils/jwt.js'

const ROLES = ['admin', 'seller', 'buyer']

export const register = asyncHandler(async (req, res) => {
  const { full_name, username, email, password, phone, city, role } = req.body
  const errors = {}

  if (!full_name) errors.full_name = ['Full name wajib diisi']
  if (!username) errors.username = ['Username wajib diisi']
  if (!email) errors.email = ['Email wajib diisi']
  if (!password) errors.password = ['Password wajib diisi']
  if (role !== undefined && !ROLES.includes(role)) errors.role = ['Role tidak valid']
  if (Object.keys(errors).length) throw new AppError(422, 'Validasi gagal', errors)

  const exists = await userRepository.existsByUsernameOrEmail(username, email)
  if (exists) {
    throw new AppError(422, 'Validasi gagal', {
      username: ['Username atau email sudah digunakan'],
    })
  }

  const password_hash = await bcrypt.hash(password, 10)
  const user = await userRepository.create({
    full_name,
    username,
    email,
    password_hash,
    phone,
    city,
    role,
  })

  created(res, user, 'Registrasi berhasil')
})

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const errors = {}

  if (!username) errors.username = ['Username wajib diisi']
  if (!password) errors.password = ['Password wajib diisi']
  if (Object.keys(errors).length) throw new AppError(422, 'Validasi gagal', errors)

  const user = await userRepository.findByUsername(username)
  const passwordMatches = user ? await bcrypt.compare(password, user.password_hash) : false

  if (!user || !passwordMatches) {
    throw new AppError(401, 'Username atau password salah')
  }

  const token = signToken({ id: user.id, role: user.role })

  ok(
    res,
    {
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        role: user.role,
      },
    },
    'Login berhasil',
  )
})

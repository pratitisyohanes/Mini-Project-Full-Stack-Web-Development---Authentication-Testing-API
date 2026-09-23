import bcrypt from 'bcryptjs'
import * as userRepository from '../repositories/user.repository.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok } from '../utils/response.js'
import { AppError } from '../utils/errors.js'
import { signToken } from '../utils/jwt.js'

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const errors = {}

  if (!username) errors.username = ['Username wajib diisi']
  if (!password) errors.password = ['Password wajib diisi']
  if (Object.keys(errors).length) throw new AppError(422, 'Validasi gagal', errors)

  const user = await userRepository.findByUsername(username)
  const passwordMatches = user ? await bcrypt.compare(password, user.password_hash) : false

  if (!user || !passwordMatches) {
    throw new AppError(403, 'Username atau password salah')
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

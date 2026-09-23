import { verifyToken } from '../utils/jwt.js'
import { AppError } from '../utils/errors.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError(403, 'Anda tidak memiliki akses untuk mengubah data ini'))
  }

  try {
    req.user = verifyToken(token)
    next()
  } catch {
    next(new AppError(403, 'Anda tidak memiliki akses untuk mengubah data ini'))
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(new AppError(403, 'Anda tidak memiliki akses untuk mengubah data ini'))
    }
    next()
  }
}

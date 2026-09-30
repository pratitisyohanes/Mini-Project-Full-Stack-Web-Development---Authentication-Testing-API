import { Router } from 'express'
import * as productController from '../controllers/product.controller.js'
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', productController.list)
router.get('/:id', productController.getById)
router.post('/', requireAuth, requireRole('seller'), productController.create)
router.put('/:id', requireAuth, requireRole('seller', 'admin'), productController.update)
router.patch('/:id', requireAuth, requireRole('seller', 'admin'), productController.update)
router.delete('/:id', requireAuth, requireRole('seller', 'admin'), productController.remove)

export default router

import { Router } from 'express'
import * as categoryController from '../controllers/category.controller.js'
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', categoryController.list)
router.get('/:id', categoryController.getById)
router.post('/', requireAuth, requireRole('seller', 'admin'), categoryController.create)
router.put('/:id', requireAuth, requireRole('seller', 'admin'), categoryController.update)
router.delete('/:id', requireAuth, requireRole('seller', 'admin'), categoryController.remove)

export default router

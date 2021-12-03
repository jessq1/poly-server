import { Router } from 'express'
import * as paymentsCtrl from '../controllers/payments'
import { decodeUserFromToken, checkAuth } from '../middleware/auth'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', paymentsCtrl.index)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, paymentsCtrl.create)
router.delete('/:id', checkAuth, paymentsCtrl.delete)
router.patch('/:id', checkAuth, paymentsCtrl.update)

export { router }
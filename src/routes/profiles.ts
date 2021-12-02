import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles'
import { decodeUserFromToken, checkAuth } from '../middleware/auth'

export {
  router
}

const router: Router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/userProfile', checkAuth, profilesCtrl.userProfile)
router.get('/', checkAuth, profilesCtrl.index)
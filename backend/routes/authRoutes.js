import { Router } from 'express'
import { 
  do_logout, 
  post_log, 
  post_reg 
} from '../controllers/authController.js';
const router = Router();

router.route('/login')
.post(post_log)

router.route('/register')
.post(post_reg)

router.route('/logout')
.post(do_logout)

export default router;
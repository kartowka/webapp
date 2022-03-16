import express from 'express'
const router = express.Router()
import { register, login, deleteByID } from '../controllers/auth.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/user/:id').delete(deleteByID)

export default router

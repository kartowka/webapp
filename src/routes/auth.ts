import express from 'express'
const router = express.Router()
import { deleteByID, login, register } from '../controllers/auth'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/user/:id').delete(deleteByID)

export default router

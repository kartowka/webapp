import express from 'express'

import authenticationMiddleware from '../middleware/authentication'
const router = express.Router()
import { createNewPost, deletePostByID, getPostById, getPosts } from '../controllers/post'

router.route('/').post(authenticationMiddleware, createNewPost)
router.route('/').get(getPosts)
router.route('/:id').get(getPostById)
router.route('/:id').delete(authenticationMiddleware, deletePostByID)

export default router

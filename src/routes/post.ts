import express from 'express'
const router = express.Router()
import { getPosts, createNewPost, getPostById, deletePostByID } from '../controllers/post.js'

router.route('/').post(createNewPost)
router.route('/').get(getPosts)
router.route('/:id').get(getPostById)
router.route('/:id').delete(deletePostByID)

export default router

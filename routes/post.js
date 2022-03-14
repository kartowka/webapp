import express from 'express'
const router = express.Router()
import { getPosts, createNewPost, getPostById } from '../controllers/post.js'

router.post('/', createNewPost)
router.get('/', getPosts)
router.get('/:id', getPostById)

export default router

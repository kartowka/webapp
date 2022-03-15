import express from 'express'
const router = express.Router()
import { getPosts, createNewPost, getPostById, deletePostByID } from '../controllers/post.js'

router.post('/', createNewPost)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.delete('/:id', deletePostByID)

export default router

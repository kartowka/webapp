import express from 'express'
const router = express.Router()
import { getPosts, createNewPost } from '../controller/post.js'

router.get('/', getPosts)

router.post('/', createNewPost)

export default router

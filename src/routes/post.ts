import express from 'express'
const router = express.Router()
import {
  createNewPost,
  deletePostByID,
  getPostById,
  getPosts,
} from '../controllers/post'

router.route('/').post(createNewPost)
router.route('/').get(getPosts)
router.route('/:id').get(getPostById)
router.route('/:id').delete(deletePostByID)

export default router

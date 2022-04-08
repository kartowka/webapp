import express from 'express'

import authenticationMiddleware from '../middleware/authentication'
const router = express.Router()
import { createNewPost, deletePostByID, getPostById, getPosts } from '../controllers/post'

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     post:
 *       type: object
 *       required:
 *         - message
 *         - sender
 *       properties:
 *         id:
 *           type: string
 *           description: auto-generated User id
 *         message:
 *           type: string
 *           description: post message
 *         sender:
 *           type: string
 *           description: sender name
 *       example:
 *         message: 'this is post message'
 *         sender: 'Anthony'
 */
router.route('/').post(authenticationMiddleware, createNewPost)
router.route('/').get(getPosts)
router.route('/:id').get(getPostById)
router.route('/:id').delete(authenticationMiddleware, deletePostByID)

export default router

import express from 'express'
const router = express.Router()
import { deleteByID, login, logout, register } from '../controllers/auth'
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Authentication API
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
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         email: 'bob@gmail.com'
 *         password: '123456'
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Register success retuns access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               access_token:
 *                 type: string
 *                 description: The refresh Token
 *               refresh_token:
 *                 type: string
 *                 description: The refresh Token
 *               _id:
 *                 type: string
 *                 description: The user id
 *             example:
 *               access_token: 'bob@gmail.com'
 *               refresh_token: '123456'
 *               _id: "adfasdfasdfasdfsd"
 *
 */
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/user/:id').delete(deleteByID)
router.route('/logout').delete(logout)

export default router

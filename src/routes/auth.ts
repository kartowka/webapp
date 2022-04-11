import express from 'express'

const router = express.Router()
import { deleteByID, login, logout, register, renewToken } from '../controllers/auth'
import renewAuthenticationMiddleware from '../middleware/renew-authentication'

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
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: auto-generated User id
 *         email:
 *           type: string
 *           description: User email address, unique
 *         password:
 *           type: string
 *           description: hashed User password
 *         refreshToken:
 *           type: string
 *           description: auto-generated User refreshToken
 *       example:
 *         email: 'bob@gmail.com'
 *         password: '123456'
 */
router.route('/register').post(register)
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Register succeed with statusCode(CREATED), return email,accessToken,refreshToken
 *         content:
 *           application/json:
 *             schema:
 *               token:
 *                 type: string
 *                 description: auto-generated accessToken
 *               refreshToken:
 *                 type: string
 *                 description: auto-generated refreshToken
 *               email:
 *                 type: string
 *                 description: user`s email address
 *             example:
 *               email: 'bob@gmail.com'
 *               refreshToken: 'long long auto-generated string'
 *               token: 'long long auto-generated string'
 */
router.route('/login').post(login)
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login a existing User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: login succeed with statusCode(OK), return email,refreshToken,accessToken
 *         content:
 *           application/json:
 *             schema:
 *               _id:
 *                 type: string
 *                 description: auto-generated id
 *               token:
 *                 type: string
 *                 description: auto-generated accessToken
 *               refreshToken:
 *                 type: string
 *                 description: auto-generated refreshToken
 *               email:
 *                 type: string
 *                 description: user`s email address
 *             example:
 *               _id: 'auto-generated user id'
 *               email: 'bob@gmail.com'
 *               refreshToken: 'long long auto-generated string'
 *               token: 'long long auto-generated string'
 */
router.route('/user/:id').delete(deleteByID)
/**
 * @swagger
 * /api/auth/user/id:
 *   delete:
 *     summary: TODO
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: login succeed with statusCode(OK), return email,refreshToken,accessToken
 *         content:
 *           application/json:
 *             schema:
 *               _id:
 *                 type: string
 *                 description: auto-generated id
 *               token:
 *                 type: string
 *                 description: auto-generated accessToken
 *               refreshToken:
 *                 type: string
 *                 description: auto-generated refreshToken
 *               email:
 *                 type: string
 *                 description: user`s email address
 *             example:
 *               _id: 'auto-generated user id'
 *               email: 'bob@gmail.com'
 *               refreshToken: 'long long auto-generated string'
 *               token: 'long long auto-generated string'
 */
router.route('/logout').delete(renewAuthenticationMiddleware, logout)
/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: logout a user
 *     tags: [Auth]
 *     description: need to provide the refresh token in the auth header
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: logout completed successfully
 *
 */
router.route('/token').post(renewAuthenticationMiddleware, renewToken)
/**
 * @swagger
 * /api/auth/token:
 *   post:
 *     summary: renewToken
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: refreshToken
 *         schema:
 *           type: string
 *           required: true
 *         description: auto-generated refreshToken on login path
 *     responses:
 *       200:
 *         description: token renew using refreshToken
 *         content:
 *           application/json:
 *             schema:
 *               _id:
 *                 type: string
 *                 description: auto-generated id
 *               token:
 *                 type: string
 *                 description: auto-generated accessToken
 *               refreshToken:
 *                 type: string
 *                 description: auto-generated refreshToken
 *               email:
 *                 type: string
 *                 description: user`s email address
 *             example:
 *               _id: 'auto-generated user id'
 *               email: 'bob@gmail.com'
 *               refreshToken: 'long long auto-generated string'
 *               token: 'long long auto-generated string'
 */

export default router

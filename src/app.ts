// * application

import express from 'express'
const app = express()

import 'express-async-errors'

// * environment files

import dotenv from 'dotenv'
dotenv.config()

// * routers
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'

// * middleware

import not_found_middleware from './middleware/not_found.js'
import error_handler_middleware from './middleware/error-handler.js'

// * app.use
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.json({ msg: 'Welcome!' })
})
app.use('/', authRouter)
app.use('/post', postRouter)
app.use(not_found_middleware)
app.use(error_handler_middleware)

// * db

import connectDB from './db/connect.js'

// * server create

connectDB(process.env.MONGO_URL)

export default app

// * application

import express from 'express'
const app = express()

import 'express-async-errors'

// * environment files
import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
// * swaggerUI
import swaggerUI from 'swagger-ui-express'

import swaggerConnection from './documentation/swagger'
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerConnection(process.env.NODE_ENV, process.env.PORT))
)

// * middleware
import error_handler_middleware from './middleware/error-handler'
import not_found_middleware from './middleware/not_found'
// * routers
import authRouter from './routes/auth'
import postRouter from './routes/post'
// * app.use
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' })
})

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use(not_found_middleware)
app.use(error_handler_middleware)

// * db

import connectDB from './db/connect'

// * server create

connectDB(process.env.MONGO_URL)

export default app

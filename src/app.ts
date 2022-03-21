// * application

import express from 'express'
const app = express()

import 'express-async-errors'

// * environment files
import dotenv from 'dotenv'
dotenv.config()

// * routers
// * app.use
import bodyParser from 'body-parser'

// * middleware
import error_handler_middleware from './middleware/error-handler'
import not_found_middleware from './middleware/not_found'
import authRouter from './routes/auth'
import postRouter from './routes/post'

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

import connectDB from './db/connect'

// * server create

connectDB(process.env.MONGO_URL)

export default app

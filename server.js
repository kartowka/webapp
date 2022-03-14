//* application

import express from 'express'
const app = express()

//* environment files

import dotenv from 'dotenv'
dotenv.config()

//* db

import connectDB from './db/connect.js'

//* routers

import postRouter from './routes/post.js'

//* middleware

import not_found_middleware from './middleware/not_found.js'

//* app.use
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.json({ msg: 'Welcome!' })
})

app.use('/post', postRouter)
app.use(not_found_middleware)

//* server create

const PORT = process.env.PORT || 3000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		console.log('connected to mongoDB')
		app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}

start()

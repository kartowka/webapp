import express from 'express'
const app = express()

//? environment files
import dotenv from 'dotenv'
dotenv.config()

//?routers
import postRouter from './routes/post_routes.js'

app.get('/', (req, res) => {
	res.send('Hello world!')
})

app.use('/post', postRouter)

const PORT = process.env.PORT || 3000
const start = async () => {
	try {
		app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}

start()

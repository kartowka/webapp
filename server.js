import app from './app.js'
const PORT = process.env.PORT || 3000

const start = async () => {
	try {
		// await connectDB(process.env.MONGO_URL)
		// console.log('connected to mongoDB')
		app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}

start()

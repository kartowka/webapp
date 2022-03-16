import mongoose from 'mongoose'

const connectDB = async (url) => {
	try {
		await mongoose.connect(url, { useNewUrlParser: true })
		console.log('connected to DB')
	} catch (e) {
		console.log(e)
	}
}
export default connectDB

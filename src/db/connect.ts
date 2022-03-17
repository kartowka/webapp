import mongoose from 'mongoose'

const connectDB = async (url: string) => {
	try {
		mongoose.connect(url)
		// tslint:disable-next-line:no-console
		console.log('connected to DB')
	} catch (e) {
		// tslint:disable-next-line:no-console
		console.log(e)
	}
}
export default connectDB

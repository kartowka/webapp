import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
})

export default mongoose.model('Student', StudentSchema)

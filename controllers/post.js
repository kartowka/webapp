import Post from '../models/Post.js'
import { StatusCodes } from 'http-status-codes'

const getPostById = async (req, res) => {
	if (req.params.id == null || req.params.id == undefined) {
		return res.status(StatusCodes.BAD_REQUEST).send({ err: 'NO ID PROVIDED' })
	}
	try {
		const post = await Post.findById(req.params.id)
		res.status(StatusCodes.OK).send(post)
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).send({ err: err.message })
	}
}
const getPosts = async (req, res) => {
	let post = ''
	try {
		const sender = req.query.sender
		if (sender != null || sender != undefined) {
			post = await Post.find({ sender: sender })
		} else {
			post = await Post.find()
		}
		res.status(StatusCodes.OK).send(post)
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).send(err.message)
	}
}
const createNewPost = async (req, res) => {
	const post = Post({
		message: req.body.message,
		sender: req.body.sender,
	})
	try {
		const newPost = await post.save()
		res.status(StatusCodes.OK).send(newPost)
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).send(err.message)
	}
}

export { getPosts, createNewPost, getPostById }

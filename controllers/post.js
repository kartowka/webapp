import Post from '../models/Post.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'

const getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post == null || post == undefined) {
			throw new BadRequestError('ID not exist')
		}
		res.status(StatusCodes.OK).send(post)
	} catch (err) {
		res.status(err.StatusCode).send({ err: err.message })
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
const deletePostByID = async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(StatusCodes.OK).send()
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).send({
			err: err.message,
		})
	}
}

export { getPosts, createNewPost, getPostById, deletePostByID }

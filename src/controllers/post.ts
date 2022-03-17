import Post from '../models/Post.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import { Request, Response } from 'express'

const getPostById = async (req:Request, res:Response) => {
	const post = await Post.findById(req.params.id)
	if (post === null || post === undefined) {
		throw new BadRequestError('ID not exist')
	}
	res.status(StatusCodes.OK).json(post)
}
const getPosts = async (req:Request, res:Response) => {
	let post
	const sender = req.query.sender
	if (sender != null || sender != undefined) {
		// * GET POST BY SENDER
		post = await Post.find({ sender })
	} else {
		// * GET ALL POSTS
		post = await Post.find()
	}
	res.status(StatusCodes.OK).json(post)
}
const createNewPost = async (req:Request, res:Response) => {
	const post = new Post({
		message: req.body.message,
		sender: req.body.sender,
	})
	const newPost = await post.save()
	if (!newPost) {
		throw new BadRequestError('something wrong!, check if message or sender exist')
	}
	res.status(StatusCodes.OK).json(post)
}
const deletePostByID = async (req:Request, res:Response) => {
	const postToDelete = await Post.deleteOne({ id: req.params.id })
	if (!postToDelete) {
		throw new BadRequestError('user not exist')
	}
	res.status(StatusCodes.OK).json()
}

export { getPosts, createNewPost, getPostById, deletePostByID }

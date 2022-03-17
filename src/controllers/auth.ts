import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { Request, Response } from 'express'


const register = async (req:Request, res:Response) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		throw new BadRequestError('please provide all values')
	}
	const userAlreadyExists = await User.findOne({ email })
	if (userAlreadyExists) {
		throw new BadRequestError('email already in use')
	}
	const user = await User.create({ name, email, password })
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({ user: { email: user.email, lastName: user.lastName, location: user.location, name: user.name }, token, location: user.location })
}
const login = async (req:Request, res:Response) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new BadRequestError('Please provide all values')
	}
	const user = await User.findOne({ email }).select('+password')
	if (!user) {
		throw new UnAuthenticatedError('Invalid Credentials')
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError('Invalid Credentials')
	}
	const token = user.createJWT()
	user.password = undefined
	res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
const updateUser = (req:Request, res:Response) => {
	res.send('update user')
}
const deleteByID = async (req:Request, res:Response) => {
	const { id } = req.params
	if (!id || id === undefined || id === null) {
		throw new BadRequestError('User not exist')
	}
	const user = await User.findByIdAndDelete({ _id: id })
	if (!user) {
		throw new BadRequestError('User not exist')
	}
	res.status(StatusCodes.OK).json({ msg: 'user with requested ID has been deleted.' })
}

export { register, login, updateUser, deleteByID }

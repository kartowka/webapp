import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { BadRequestError, UnAuthenticatedError } from '../errors/index'
import User from '../models/User'

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('please provide all values')
  }
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError('email already in use')
  }
  const encryptedPassword = await encryptPassword(password)
  const user = await User.create({ email, password: encryptedPassword })
  const token = user.createJWT()
  user.createRefreshToken()
  await user.save()
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      refreshToken: user.refreshToken,
    },
    token,
  })
}
const encryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
const login = async (req: Request, res: Response) => {
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
  user.createRefreshToken()
  await user.save()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token })
}
const renewToken = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user.userId)
  const token = user.createJWT()
  await user.save()
  res.status(StatusCodes.OK).json({ user, token })
}
const logout = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user.userId)
  user.refreshToken = ' '
  await user.save()
  res.status(StatusCodes.OK).json('you have been logout.')
}
const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete({ _id: id })
  if (!user) {
    throw new BadRequestError('User not exist')
  }
  res.status(StatusCodes.OK).json({ msg: 'user with requested ID has been deleted.' })
}

export { register, login, deleteByID, renewToken, logout }

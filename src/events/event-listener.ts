import { RedisClientType } from '@node-redis/client'
import { NextFunction } from 'express'
import { Server, Socket } from 'socket.io'

import User from '../models/User'
import logger from '../utils/logger'
import registerEchoHandler from './echo-handler'
import registerImsHandler from './ims-handler'

const eventListenerMiddleware = (io: Server) => {
  io.on('connection', async (socket: Socket) => {
    const { email } = await User.findById(socket.data.user)
    registerEchoHandler(io, socket)
    registerImsHandler(io, socket)
    logger.info(`user ${email} has join the chat room`)
    await socket.join(socket.data.user)
    await socket.join('all')
    socket.on('disconnect', () => {
      logger.info(`user ${email} disconnected from the chat room`)
    })
  })
}

export default eventListenerMiddleware

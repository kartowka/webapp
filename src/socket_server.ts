import { createAdapter } from '@socket.io/redis-adapter'
import http from 'http'
import { createClient } from 'redis'
import { Server } from 'socket.io'

import commonHandlers from './events/common'
import socketAuthenticationMiddleware from './middleware/socket-authentication'
import User from './models/User.js'
import logger from './utils/logger'

const socketServer = (server: http.Server) => {
  const io = new Server(server)
  const pubClient = createClient({ url: process.env.REDIS_URL })
  const subClient = createClient({ url: process.env.REDIS_URL })
  io.adapter(createAdapter(pubClient, subClient))
  io.use(socketAuthenticationMiddleware)
  io.on('connection', async socket => {
    const user = await User.findById(socket.data.user)
    logger.info(`${user.email} has entered the chat.`)
    socket.on('disconnect', () => {
      logger.info(`${user.email} left the chat.`)
    })

    commonHandlers(io, socket)
  })
  return io
}

export default socketServer

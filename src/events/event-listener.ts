import { Server, Socket } from 'socket.io'

import User from '../models/User'
import logger from '../utils/logger'
import registerEchoHandler from './echo-handler'
import registerImsHandler from './ims-handler'

const onEventHandler = async (io: Server, socket: Socket) => {
  const { email } = await User.findById(socket.data.user)
  logger.info(`user ${email} has join the chat room`)
  socket.join(socket.data.user)
  socket.join('all')
  registerEchoHandler(io, socket)
  registerImsHandler(io, socket)
  socket.once('disconnect', () => {
    logger.info(`user ${email} disconnected from the chat room`)
  })
}

export { onEventHandler }

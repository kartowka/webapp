import { Server, Socket } from 'socket.io'

import logger from '../utils/logger'

type InstantMessage = {
  body: string
  receiver: string
  sender: string
}
const registerImsHandler = (io: Server, socket: Socket) => {
  const instantMessage = async (instantMsg: InstantMessage) => {
    logger.info(`instant message to: ${instantMsg.receiver}`)
    const receiver = instantMsg.receiver
    instantMsg.sender = socket.data.user
    io.to(receiver).emit('ims:instantMsg', instantMsg)
  }
  socket.on('ims:instantMsg', instantMessage)
}
export default registerImsHandler

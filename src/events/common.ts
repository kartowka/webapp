import { Server, Socket } from 'socket.io'

const commonHandlers = (io: Server, socket: Socket) => {
  const echoHandler = (payload: string) => {
    socket.emit('common:echo', payload)
  }

  socket.on('common:echo', echoHandler)
}

export default commonHandlers

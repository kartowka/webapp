import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import { Server, Socket } from 'socket.io'

import { onEventHandler } from './events/event-listener'
import socketAuthenticationMiddleware from './middleware/socket-authentication'
import { serverInstance, serverStart } from './server'

const pubClient = createClient({ url: process.env.REDIS_URL })
const subClient = pubClient.duplicate()
const createSocketServer = () => {
  const socketServer: Server = new Server(serverStart(), { cors: { origin: '*' } })
  redisClientConnect(socketServer)
  socketServer.use(socketAuthenticationMiddleware)
  socketServer.on('connection', (socket: Socket) => {
    onEventHandler(socketServer, socket)
  })
  return socketServer
}
const destroySocketServer = (io: Server) => {
  Promise.all([redisClientDisconnect(), io.close(), serverInstance.close()])
}
const redisClientDisconnect = () => {
  Promise.all([subClient.disconnect(), pubClient.disconnect()])
}
const redisClientConnect = (io: Server) => {
  Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient))
  })
}

export { createSocketServer, destroySocketServer, redisClientConnect, redisClientDisconnect }

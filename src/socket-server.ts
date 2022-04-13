import { createAdapter } from '@socket.io/redis-adapter'
import http from 'http'
import { createClient } from 'redis'
import { Server } from 'socket.io'

import eventListenerMiddleware from './events/event-listener'
import socketAuthenticationMiddleware from './middleware/socket-authentication'
const pubClient = createClient({ url: process.env.REDIS_URL })
const subClient = pubClient.duplicate()

const redisClientDisconnect = async () => {
  await pubClient.disconnect()
  await subClient.disconnect()
}
const socketServer = async (server: http.Server) => {
  const io = new Server(server)
  await pubClient.connect()
  await subClient.connect()
  io.adapter(createAdapter(pubClient, subClient))
  io.use(socketAuthenticationMiddleware)
  eventListenerMiddleware(io)
  return io
}

export { socketServer, redisClientDisconnect }

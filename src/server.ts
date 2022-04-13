import http from 'http'

import app from './app'
import { socketServer } from './socket-server'
import logger from './utils/logger'

const PORT = process.env.PORT || 3000
const server = http.createServer(app)
socketServer(server)
server.listen(PORT, () => {
  logger.info(`🚀 server in up and running on PORT ${PORT} 🚀 `)
  logger.info(`🚀 http://localhost:${PORT}                 🚀 `)
})

export default server

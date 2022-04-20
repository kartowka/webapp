import http from 'http'

import app from './app'
import logger from './utils/logger'

let serverInstance: http.Server

const serverStart = (PORT = Number(process.env.PORT)) => {
  serverInstance = http.createServer(app)
  serverInstance.listen(PORT, () => {
    logger.info(`🚀 server in up and running on PORT ${PORT} 🚀 `)
    logger.info(`🚀 http://localhost:${PORT}                 🚀 `)
  })
  return serverInstance
}
export { serverStart, serverInstance }

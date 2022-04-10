import app from './app'
import logger from './utils/logger'

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    app.listen(PORT, function () {
      logger.info(`🚀 server in listening on port ${PORT} 🚀 `)
      logger.info(`🚀 http://localhost:${PORT} `)
    })
  } catch (error) {
    logger.fatal('error')
  }
}

start()

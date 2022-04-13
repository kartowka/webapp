import pino from 'pino'
import pretty from 'pino-pretty'

const logger = pino(
  pretty({
    destination: 'src/utils/serverlog.log',
    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
    sync: true,
    ignore: 'pid,hostname',
  })
)
export default logger

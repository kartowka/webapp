import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      destination: 1, //'./src/utils/serverlog.log',
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
      sync: false,
    },
  },
})

export default logger

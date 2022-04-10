import mongoose from 'mongoose'

import logger from '../utils/logger'

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url)
    logger.info(`🚀 connected to mongoDB 🚀`)
  } catch (e) {
    logger.warn(e)
  }
}
export default connectDB

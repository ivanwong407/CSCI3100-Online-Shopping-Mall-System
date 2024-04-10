const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { get_logger } = require('./logger.js')

// Get Logger
const logger = get_logger()

// ENV Variables
dotenv.config({ path: './config.env' })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}



module.exports = {connectDB}
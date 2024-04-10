const express = require('express');
const cors = require('cors');
const {connectDB} = require('./utils/db');
const dotenv = require('dotenv')

const { get_logger } = require('./utils/logger.js')
const { errorHandler } = require('./middleware/error_middleware')

// Get Logger
const logger = get_logger()

// ENV Variables
dotenv.config({ path: './config.env' })

// Connect MongoDB
connectDB();

// Run server
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/user_routes.js'))



app.use(errorHandler)

//app.use('/*', require('./routes/unused_routes'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`)
})
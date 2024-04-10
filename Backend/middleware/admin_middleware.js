const asyncHandler = require('express-async-handler')
const User = require('../models/user_model')
const dotenv = require('dotenv')

const { get_logger } = require('../utils/logger.js')

// ENV Variables
dotenv.config({ path: './config.env' })

// Get Logger
const logger = get_logger()

const checkAdmin = asyncHandler(async (req, res, next) => {
    let isAdmin = false

    // Check if the user has admin rights
    const user = await User.findById(req.user._id)
    isAdmin = user.isAdmin

    if (isAdmin === true) {
        logger.info("/api/admin: Admin Authorized")
        next()
    }
    
    else {
        logger.error("/api/admin: Admin Unauthorized")
        res.status(401)
        throw new Error('Admin Unauthorized')
    }
})

module.exports = { checkAdmin }
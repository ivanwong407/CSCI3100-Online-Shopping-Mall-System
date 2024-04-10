const nodemailer = require("nodemailer")
const dotenv = require('dotenv')

// ENV Variables
dotenv.config({ path: './config.env' })

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.TRANSPORTER_EMAIL,
    pass: process.env.TRANSPORTER_PASSWORD
  }
});

module.exports = {
    transporter
}
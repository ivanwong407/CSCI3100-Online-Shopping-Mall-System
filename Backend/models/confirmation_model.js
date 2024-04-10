const mongoose = require('mongoose')

const confirmationSchema = mongoose.Schema(
  {
    email: {
        type: String,
        required: [true, 'Add email'],
        unique: true,
    },
    confirmationString: {
        type: String,
        required: true
    }
  },
)

module.exports = mongoose.model('Confirmation', confirmationSchema)
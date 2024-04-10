const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Add email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Add password'],
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    favVenues: {
      type: [String]
    },
    isVerified: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
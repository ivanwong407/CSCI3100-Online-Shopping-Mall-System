const mongoose = require('mongoose');

// Define transaction schema fields
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    trim: true
  }
});

// Compile model from schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
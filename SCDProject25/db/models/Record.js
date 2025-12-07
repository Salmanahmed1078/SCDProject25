const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: String,
    default: () => new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create model
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;


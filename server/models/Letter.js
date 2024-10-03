const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Unique partial index to ensure only one featured letter
letterSchema.index({ featured: 1 }, { unique: true, partialFilterExpression: { featured: true } });

module.exports = mongoose.model('Letter', letterSchema);

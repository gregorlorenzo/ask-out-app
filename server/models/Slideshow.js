const mongoose = require('mongoose');

const slideshowSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageKey: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Slideshow', slideshowSchema);
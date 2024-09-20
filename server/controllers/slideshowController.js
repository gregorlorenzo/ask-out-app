const Slideshow = require('../models/Slideshow');

exports.getSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findOne().populate('slides.slide');
    if (!slideshow) {
      return res.json({ slides: [] });
    }
    res.json(slideshow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSlideshow = async (req, res) => {
  try {
    const existingSlideshow = await Slideshow.findOne();
    if (existingSlideshow) {
      return res.status(400).json({ message: 'Slideshow already exists' });
    }

    const { slides } = req.body;
    if (!slides || !Array.isArray(slides)) {
      return res.status(400).json({ message: 'Invalid slides data' });
    }

    const slideshow = new Slideshow({
      slides: slides.map((slide, index) => ({
        slide: slide.id,
        position: index + 1
      }))
    });

    await slideshow.save();

    const createdSlideshow = await Slideshow.findById(slideshow._id).populate('slides.slide');
    res.status(201).json(createdSlideshow);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating slideshow',
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
};

exports.updateSlideshow = async (req, res) => {
  try {
    const { slides } = req.body;

    if (!slides || !Array.isArray(slides)) {
      throw new Error('Invalid slides data');
    }

    let slideshow = await Slideshow.findOne();

    if (!slideshow) {
      slideshow = new Slideshow();
    }

    slideshow.slides = slides.map((slide, index) => ({
      slide: slide.id,
      position: index + 1
    }));

    await slideshow.save();

    const updatedSlideshow = await Slideshow.findById(slideshow._id).populate('slides.slide');
    res.json(updatedSlideshow);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: error.errors });
    }

    res.status(500).json({
      message: 'Internal Server Error',
      details: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
};

exports.deleteSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findOneAndDelete();
    if (!slideshow) {
      return res.status(404).json({ message: 'No slideshow found' });
    }
    res.json({ message: 'Slideshow deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
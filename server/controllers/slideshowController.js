const Slideshow = require('../models/Slideshow');
const mongoose = require('mongoose');

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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingSlideshow = await Slideshow.findOne();
    if (existingSlideshow) {
      return res.status(400).json({ message: 'Slideshow already exists' });
    }

    const { slides } = req.body;
    const slideshow = new Slideshow({
      slides: slides.map((slide, index) => ({
        slide: slide.id,
        position: index + 1
      }))
    });

    await slideshow.save({ session });
    await session.commitTransaction();

    const createdSlideshow = await Slideshow.findById(slideshow._id).populate('slides.slide');
    res.status(201).json(createdSlideshow);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

exports.updateSlideshow = async (req, res) => {
  try {
    console.log('Updating slideshow. Request body:', req.body);
    const { slides } = req.body;

    if (!slides || !Array.isArray(slides)) {
      throw new Error('Invalid slides data');
    }

    let slideshow = await Slideshow.findOne();

    if (!slideshow) {
      console.log('No slideshow found. Creating a new one.');
      slideshow = new Slideshow();
    }

    console.log('Slideshow before update:', slideshow);

    slideshow.slides = slides.map((slide, index) => ({
      slide: slide.id,
      position: index + 1
    }));

    console.log('Updated slideshow before save:', slideshow);

    await slideshow.save();

    const updatedSlideshow = await Slideshow.findById(slideshow._id).populate('slides.slide');
    console.log('Updated/Created slideshow after save:', updatedSlideshow);

    res.json(updatedSlideshow);
  } catch (error) {
    console.error('Error updating/creating slideshow:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: error.errors });
    }

    console.error('Full error stack:', error.stack);

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
const Slideshow = require('../models/Slideshow');
const { getImageUrl } = require('../utils/imageUploader');

exports.getSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findOne().populate({
      path: 'slides.slide',
      model: 'Slide',
      select: 'date title description imageKey' // Note: we select imageKey instead of imageUrl
    });

    if (!slideshow) {
      return res.json({ slides: [] });
    }

    // Generate fresh signed URLs for each slide
    const processedSlideshow = {
      ...slideshow.toObject(),
      slides: await Promise.all(slideshow.slides.map(async (slideItem) => {
        if (!slideItem.slide) return slideItem;
        
        const slide = slideItem.slide;
        return {
          ...slideItem,
          slide: {
            ...slide,
            imageUrl: await getImageUrl(slide.imageKey)
          }
        };
      }))
    };

    res.json(processedSlideshow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other controller methods remain the same...
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

    // Populate and process image URLs
    const createdSlideshow = await Slideshow.findById(slideshow._id).populate({
      path: 'slides.slide',
      model: 'Slide',
      select: 'date title description imageKey'
    });

    // Generate fresh signed URLs
    const processedSlideshow = {
      ...createdSlideshow.toObject(),
      slides: await Promise.all(createdSlideshow.slides.map(async (slideItem) => {
        if (!slideItem.slide) return slideItem;
        
        const slide = slideItem.slide;
        return {
          ...slideItem,
          slide: {
            ...slide,
            imageUrl: await getImageUrl(slide.imageKey)
          }
        };
      }))
    };

    res.status(201).json(processedSlideshow);
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

    // Populate and process image URLs
    const updatedSlideshow = await Slideshow.findById(slideshow._id).populate({
      path: 'slides.slide',
      model: 'Slide',
      select: 'date title description imageKey'
    });

    // Generate fresh signed URLs
    const processedSlideshow = {
      ...updatedSlideshow.toObject(),
      slides: await Promise.all(updatedSlideshow.slides.map(async (slideItem) => {
        if (!slideItem.slide) return slideItem;
        
        const slide = slideItem.slide;
        return {
          ...slideItem,
          slide: {
            ...slide,
            imageUrl: await getImageUrl(slide.imageKey)
          }
        };
      }))
    };

    res.json(processedSlideshow);
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
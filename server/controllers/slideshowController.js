const Slideshow = require('../models/Slideshow');
const { reorderSlides } = require('../utils/helper');

exports.getAllSlideshows = async (req, res) => {
  try {
    const slideshows = await Slideshow.find().populate('slides.slide');
    res.json(slideshows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findById(req.params.id)
      .populate('slides.slide');
    if (!slideshow) {
      return res.status(404).json({ message: 'Slideshow not found' });
    }
    res.json(slideshow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSlideshow = async (req, res) => {
  try {
    const slideshow = new Slideshow({
      name: req.body.name,
      slides: req.body.slides.map((slide, index) => ({
        slide: slide.id,
        position: index + 1
      }))
    });
    const newSlideshow = await slideshow.save();
    res.status(201).json(newSlideshow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSlideshow = async (req, res) => {
    try {
      let slideshow = await Slideshow.findById(req.params.id);
      if (!slideshow) {
        return res.status(404).json({ message: 'Slideshow not found' });
      }
      
      slideshow.name = req.body.name || slideshow.name;
      slideshow.slides = req.body.slides.map((slide, index) => ({
        slide: slide.id,
        position: index + 1
      }));
  
      slideshow = await slideshow.save();
      
      // Use the reorderSlides function from helper
      const reorderedSlideshow = await reorderSlides(Slideshow, slideshow._id);
      
      res.json(reorderedSlideshow);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.deleteSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findById(req.params.id);
    if (!slideshow) {
      return res.status(404).json({ message: 'Slideshow not found' });
    }

    await Slideshow.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slideshow deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
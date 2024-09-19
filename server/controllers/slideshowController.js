const Slideshow = require('../models/Slideshow');
const { reorderSlides } = require('../utils/helper');

exports.getAllSlideshows = async (req, res) => {
  try {
    const slideshows = await Slideshow.find().populate('slides.slide');

    const formattedSlideshows = slideshows.map(slideshow => {
      const slideshowObj = slideshow.toObject();

      return {
        ...slideshowObj,
        slides: slideshowObj.slides
          .sort((a, b) => a.position - b.position)
          .map(slide => {
            return {
              ...slide.slide,
              position: slide.position
            };
          })
      };
    });

    res.json(formattedSlideshows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findById(req.params.id).populate('slides.slide');
    if (!slideshow) {
      return res.status(404).json({ message: 'Slideshow not found' });
    }
    const formattedSlideshow = {
      ...slideshow._doc,
      slides: slideshow.slides
        .sort((a, b) => a.position - b.position)
        .map(slide => ({
          ...slide.slide._doc,
          position: slide.position
        }))
    };
    res.json(formattedSlideshow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSlideshow = async (req, res) => {
  try {
    const slideshow = new Slideshow({
      slides: req.body.slides.map((slide, index) => ({
        slide: slide._id,
        position: index + 1
      }))
    });
    const newSlideshow = await slideshow.save();
    const reorderedSlideshow = await reorderSlides(Slideshow, newSlideshow._id);
    res.status(201).json(reorderedSlideshow);
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

    slideshow.slides = req.body.slides.map((slide, index) => ({
      slide: slide._id,
      position: index + 1
    }));

    await slideshow.save();
    const reorderedSlideshow = await reorderSlides(Slideshow, slideshow._id);
    const populatedSlideshow = await Slideshow.findById(reorderedSlideshow._id).populate('slides.slide');

    const formattedSlideshow = {
      ...populatedSlideshow._doc,
      slides: populatedSlideshow.slides.map(slide => ({
        ...slide.slide._doc,
        position: slide.position
      }))
    };

    res.json(formattedSlideshow);
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
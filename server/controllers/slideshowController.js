const Slideshow = require('../models/Slideshow');
const { uploadImage, deleteImage } = require('../utils/imageUploader');

// Get all slideshow items
exports.getSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.find().sort({ date: 1 });
    res.json(slideshow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single slideshow item by ID
exports.getSlideById = async (req, res) => {
  try {
    const slide = await Slideshow.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.json(slide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new slideshow item (admin only)
exports.createSlide = async (req, res) => {
  try {
    const { url: imageUrl, key: imageKey } = await uploadImage(req.file);
    const slide = new Slideshow({
      date: req.body.date,
      title: req.body.title,
      description: req.body.description,
      imageUrl,
      imageKey
    });
    const newSlide = await slide.save();
    res.status(201).json(newSlide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a slideshow item (admin only)
exports.updateSlide = async (req, res) => {
  try {
    const slide = await Slideshow.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    slide.date = req.body.date || slide.date;
    slide.title = req.body.title || slide.title;
    slide.description = req.body.description || slide.description;

    if (req.file) {
      await deleteImage(slide.imageKey);
      const { url: imageUrl, key: imageKey } = await uploadImage(req.file);
      slide.imageUrl = imageUrl;
      slide.imageKey = imageKey;
    }

    const updatedSlide = await slide.save();
    res.json(updatedSlide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a slideshow item (admin only)
exports.deleteSlide = async (req, res) => {
  try {
    const slide = await Slideshow.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    await deleteImage(slide.imageKey);
    await slide.remove();
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
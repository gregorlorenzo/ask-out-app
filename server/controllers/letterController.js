const Letter = require('../models/Letter');
const { paginateResults } = require('../utils/helper')

// Get all letters
exports.getLetters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || '-date';
    
    const paginatedResults = await paginateResults(Letter, {}, page, limit, '', null, sort);

    res.json(paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single letter by ID
exports.getLetterById = async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.id);
    if (!letter) {
      return res.status(404).json({ message: 'Letter not found' });
    }
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new letter (admin only)
exports.createLetter = async (req, res) => {
  const letter = new Letter({
    date: req.body.date,
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newLetter = await letter.save();
    res.status(201).json(newLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a letter (admin only)
exports.updateLetter = async (req, res) => {
  try {
    const updatedLetter = await Letter.findByIdAndUpdate(
      req.params.id,
      {
        date: req.body.date,
        title: req.body.title,
        content: req.body.content
      },
      { new: true }
    );
    if (!updatedLetter) {
      return res.status(404).json({ message: 'Letter not found' });
    }
    res.json(updatedLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a letter (admin only)
exports.deleteLetter = async (req, res) => {
  try {
    const letter = await Letter.findByIdAndDelete(req.params.id);
    if (!letter) {
      return res.status(404).json({ message: 'Letter not found' });
    }
    res.json({ message: 'Letter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const MazeStage = require('../models/MazeStage');
const { paginateResults } = require('../utils/helper');

// Get all maze stages (public)
exports.getStages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'number'; // Default sort by stage number

    const paginatedResults = await paginateResults(MazeStage, {}, page, limit, null, null, sort);

    res.json(paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single maze stage by ID (public)
exports.getStageById = async (req, res) => {
  try {
    const stage = await MazeStage.findById(req.params.id);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    res.json(stage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all maze stages (admin only)
exports.getStagesAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'number';

    const paginatedResults = await paginateResults(MazeStage, {}, page, limit, null, null, sort);

    res.json(paginatedResults);
  } catch (error) {
    console.error('Error in getStagesAdmin:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new maze stage (admin only)
exports.createStage = async (req, res) => {
  const stage = new MazeStage({
    number: req.body.number,
    difficulty: req.body.difficulty,
    mazeSize: req.body.mazeSize
  });

  try {
    const newStage = await stage.save();
    res.status(201).json(newStage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a maze stage (admin only)
exports.updateStage = async (req, res) => {
  try {
    const updatedStage = await MazeStage.findByIdAndUpdate(
      req.params.id,
      {
        number: req.body.number,
        difficulty: req.body.difficulty,
        mazeSize: req.body.mazeSize
      },
      { new: true }
    );
    if (!updatedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    res.json(updatedStage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a maze stage (admin only)
exports.deleteStage = async (req, res) => {
  try {
    const stage = await MazeStage.findByIdAndDelete(req.params.id);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    res.json({ message: 'Stage deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
    console.error('Error in getStageById:', error);
    res.status(500).json({ message: 'An error occurred while fetching the stage', error: error.message });
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
  const { number, difficulty, mazeSize } = req.body;

  const stage = new MazeStage({
    number,
    difficulty,
    mazeSize: {
      width: mazeSize.width,
      height: mazeSize.height
    }
  });

  try {
    const newStage = await stage.save();
    res.status(201).json(newStage);
  } catch (error) {
    console.error('Error creating stage:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update a maze stage (admin only)
exports.updateStage = async (req, res) => {
  const { number, difficulty, width, height } = req.body;

  try {
    const updatedStage = await MazeStage.findByIdAndUpdate(
      req.params.id,
      {
        number,
        difficulty,
        mazeSize: {
          width,
          height
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    res.json(updatedStage);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'An error occurred while updating the stage' });
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
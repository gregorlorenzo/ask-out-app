const Quiz = require('../models/Quiz');
const { paginateResults } = require('../utils/helper')

// Get all quiz questions
exports.getQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || '-_id'; // Default sort by _id in descending order

    const paginatedResults = await paginateResults(Quiz, {}, page, limit, '-correctAnswer', null, sort);

    res.json(paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single quiz question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Quiz.findById(req.params.id).select('-correctAnswer');
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit and check an answer
exports.submitAnswer = async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;

    const question = await Quiz.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const isCorrect = question.correctAnswer === userAnswer;

    res.json({
      isCorrect,
      correctAnswer: isCorrect ? question.correctAnswer : undefined
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all quiz questions with correct answers (admin only)
exports.getQuestionsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || '-_id';

    const paginatedResults = await paginateResults(Quiz, {}, page, limit, null, null, sort);

    res.json(paginatedResults);
  } catch (error) {
    console.error('Error in getQuestionsAdmin:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new quiz question (admin only)
exports.createQuestion = async (req, res) => {
  const question = new Quiz({
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a quiz question (admin only)
exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        question: req.body.question,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer
      },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a quiz question (admin only)
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Quiz.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
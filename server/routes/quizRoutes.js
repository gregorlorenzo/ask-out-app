const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', quizController.getQuestions);
router.get('/:id', quizController.getQuestionById);

// Admin routes
router.post('/', adminAuth, quizController.createQuestion);
router.put('/:id', adminAuth, quizController.updateQuestion);
router.delete('/:id', adminAuth, quizController.deleteQuestion);

module.exports = router;
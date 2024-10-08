const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { adminAuth } = require('../middleware/auth');

// Admin routes
router.post('/', adminAuth, quizController.createQuestion);
router.put('/:id', adminAuth, quizController.updateQuestion);
router.delete('/:id', adminAuth, quizController.deleteQuestion);
router.get('/admin', adminAuth, quizController.getQuestionsAdmin);

// Public routes
router.get('/', quizController.getQuestions);
router.get('/:id', quizController.getQuestionById);
router.post('/submit-answer', quizController.submitAnswer)
router.post('/submit-quiz', quizController.submitQuiz);

module.exports = router;
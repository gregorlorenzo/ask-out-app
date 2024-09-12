const express = require('express');
const router = express.Router();
const letterController = require('../controllers/letterController');
const { adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', letterController.getLetters);
router.get('/:id', letterController.getLetterById);

// Admin routes
router.post('/', adminAuth, letterController.createLetter);
router.put('/:id', adminAuth, letterController.updateLetter);
router.delete('/:id', adminAuth, letterController.deleteLetter);

module.exports = router;
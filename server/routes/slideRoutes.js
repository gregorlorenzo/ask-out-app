const express = require('express');
const router = express.Router();
const slideController = require('../controllers/slideController');
const { adminAuth } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get('/', slideController.getSlide);
router.get('/:id', slideController.getSlideById);

// Admin routes
router.post('/', adminAuth, upload.single('image'), slideController.createSlide);
router.put('/:id', adminAuth, upload.single('image'), slideController.updateSlide);
router.delete('/:id', adminAuth, slideController.deleteSlide);

module.exports = router;
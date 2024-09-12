const express = require('express');
const router = express.Router();
const slideshowController = require('../controllers/slideshowController');
const { adminAuth } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get('/', slideshowController.getSlideshow);
router.get('/:id', slideshowController.getSlideById);

// Admin routes
router.post('/', adminAuth, upload.single('image'), slideshowController.createSlide);
router.put('/:id', adminAuth, upload.single('image'), slideshowController.updateSlide);
router.delete('/:id', adminAuth, slideshowController.deleteSlide);

module.exports = router;
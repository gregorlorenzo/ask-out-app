const express = require('express');
const router = express.Router();
const slideshowController = require('../controllers/slideshowController');
const { adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', slideshowController.getSlideshow);

// Admin routes
router.post('/', adminAuth, slideshowController.createSlideshow);
router.put('/', adminAuth, slideshowController.updateSlideshow);
router.delete('/', adminAuth, slideshowController.deleteSlideshow);

module.exports = router;
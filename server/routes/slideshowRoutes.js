const express = require('express');
const router = express.Router();
const slideshowController = require('../controllers/slideshowController');
const { adminAuth } = require('../middleware/auth');

// Public route
router.get('/:id', slideshowController.getSlideshow);

// Admin routes
router.post('/', adminAuth, slideshowController.createSlideshow);
router.put('/:id', adminAuth, slideshowController.updateSlideshow);
router.delete('/:id', adminAuth, slideshowController.deleteSlideshow);

module.exports = router;
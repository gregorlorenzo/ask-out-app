const express = require('express');
const router = express.Router();
const mazeController = require('../controllers/mazeController');
const { adminAuth } = require('../middleware/auth');

// Admin routes
router.post('/', adminAuth, mazeController.createStage);
router.put('/:id', adminAuth, mazeController.updateStage);
router.delete('/:id', adminAuth, mazeController.deleteStage);
router.get('/admin', adminAuth, mazeController.getStagesAdmin);

// Public routes
router.get('/', mazeController.getStages);
router.get('/:id', mazeController.getStageById);

module.exports = router;
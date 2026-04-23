const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');

// These MUST exist in runController.js or the server crashes
router.post('/start', runController.startRun);
router.post('/end', runController.endRun);
router.get('/all', runController.getAllRuns);

module.exports = router;
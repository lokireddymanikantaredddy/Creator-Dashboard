const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Placeholder for media routes
router.get('/test', (req, res) => {
    res.json({ message: 'Media routes working' });
});

module.exports = router; 
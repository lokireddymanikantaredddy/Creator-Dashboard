// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getUser } = require('../controllers/userController');

console.log(typeof protect);

router.route('/profile').get(protect, getUser);

// Placeholder for user routes
router.get('/test', (req, res) => {
    res.json({ message: 'User routes working' });
});

module.exports = router; // Exporting a valid router instance

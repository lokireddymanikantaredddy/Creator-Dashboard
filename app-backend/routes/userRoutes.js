// routes/userRoutes.js
const { Router } = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getUser } = require('../controllers/userController');

const router = Router();

console.log(typeof protect);

router.route('/profile').get(protect, getUser);

module.exports = router; // Exporting a valid router instance

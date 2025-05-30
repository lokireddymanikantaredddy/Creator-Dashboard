const express = require('express');
const {
    getContentAnalytics,
    getCreatorDashboard,
    trackContentView,
    trackEngagement,
    getAnalyticsReport
} = require('../controllers/analyticsController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected creator routes
router.use(protect);
router.use(authorize('creator', 'admin'));

router.get('/dashboard', getCreatorDashboard);
router.get('/content/:contentId', getContentAnalytics);
router.get('/report', getAnalyticsReport);

// Tracking routes
router.post('/track/view/:contentId', trackContentView);
router.post('/track/engagement/:contentId', protect, trackEngagement);

// Placeholder for analytics routes
router.get('/test', (req, res) => {
    res.json({ message: 'Analytics routes working' });
});

module.exports = router; 
const express = require('express');
const {
    createContent,
    getAllContent,
    getContent,
    updateContent,
    deleteContent,
    toggleLike,
    addComment,
    removeComment
} = require('../controllers/contentController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Base routes
router
    .route('/')
    .post(protect, authorize('creator', 'admin'), createContent)
    .get(getAllContent);

router
    .route('/:id')
    .get(getContent)
    .put(protect, authorize('creator', 'admin'), updateContent)
    .delete(protect, authorize('creator', 'admin'), deleteContent);

// Like routes
router
    .route('/:id/like')
    .put(protect, toggleLike);

// Comment routes
router
    .route('/:id/comments')
    .post(protect, addComment);

router
    .route('/:id/comments/:commentId')
    .delete(protect, removeComment);

// Placeholder for content routes
router.get('/test', (req, res) => {
    res.json({ message: 'Content routes working' });
});

module.exports = router; 
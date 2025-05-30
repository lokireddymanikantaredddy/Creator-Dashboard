const Content = require('../models/Content');
const { AppError } = require('../middleware/errorHandler');

// @desc    Create new content
// @route   POST /api/content
// @access  Private (Creators only)
exports.createContent = async (req, res, next) => {
    try {
        req.body.creator = req.user.id;
        const content = await Content.create(req.body);
        
        res.status(201).json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all content (with filtering, sorting, and pagination)
// @route   GET /api/content
// @access  Public
exports.getAllContent = async (req, res, next) => {
    try {
        let query = {};

        // Build query based on filters
        if (req.query.category) query.category = req.query.category;
        if (req.query.tags) query.tags = { $in: req.query.tags.split(',') };
        if (req.query.creator) query.creator = req.query.creator;
        if (req.query.status) query.status = req.query.status;

        // Only show published content for non-creators
        if (req.user?.role !== 'creator') {
            query.status = 'published';
            query.visibility = 'public';
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Content.countDocuments(query);

        // Sorting
        const sort = {};
        if (req.query.sort) {
            const parts = req.query.sort.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            sort.createdAt = -1; // Default sort by newest
        }

        const content = await Content.find(query)
            .populate('creator', 'username profileImage')
            .sort(sort)
            .skip(startIndex)
            .limit(limit);

        // Pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: content.length,
            pagination,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single content
// @route   GET /api/content/:id
// @access  Public/Private (depends on content visibility)
exports.getContent = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.id)
            .populate('creator', 'username profileImage')
            .populate('comments.user', 'username profileImage');

        if (!content) {
            throw new AppError('Content not found', 404);
        }

        // Check if content is accessible
        if (content.status !== 'published' && 
            (!req.user || (content.creator.toString() !== req.user.id && req.user.role !== 'admin'))) {
            throw new AppError('Not authorized to access this content', 403);
        }

        // Increment views if not creator
        if (req.user && content.creator.toString() !== req.user.id) {
            await content.incrementViews();
        }

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private (Creator owner or Admin)
exports.updateContent = async (req, res, next) => {
    try {
        let content = await Content.findById(req.params.id);

        if (!content) {
            throw new AppError('Content not found', 404);
        }

        // Make sure user is content owner or admin
        if (content.creator.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new AppError('Not authorized to update this content', 403);
        }

        content = await Content.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private (Creator owner or Admin)
exports.deleteContent = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.id);

        if (!content) {
            throw new AppError('Content not found', 404);
        }

        // Make sure user is content owner or admin
        if (content.creator.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new AppError('Not authorized to delete this content', 403);
        }

        await content.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Like/Unlike content
// @route   PUT /api/content/:id/like
// @access  Private
exports.toggleLike = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.id);

        if (!content) {
            throw new AppError('Content not found', 404);
        }

        // Check if content has already been liked
        const likeIndex = content.likes.indexOf(req.user.id);

        if (likeIndex === -1) {
            // Not liked, like it
            content.likes.push(req.user.id);
        } else {
            // Already liked, unlike it
            content.likes.splice(likeIndex, 1);
        }

        await content.save();

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add comment to content
// @route   POST /api/content/:id/comments
// @access  Private
exports.addComment = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.id);

        if (!content) {
            throw new AppError('Content not found', 404);
        }

        const comment = {
            user: req.user.id,
            text: req.body.text
        };

        content.comments.unshift(comment);
        await content.save();

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove comment from content
// @route   DELETE /api/content/:id/comments/:commentId
// @access  Private
exports.removeComment = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.id);

        if (!content) {
            throw new AppError('Content not found', 404);
        }

        // Pull out comment
        const comment = content.comments.find(
            comment => comment.id === req.params.commentId
        );

        if (!comment) {
            throw new AppError('Comment not found', 404);
        }

        // Make sure user is comment owner or content owner or admin
        if (
            comment.user.toString() !== req.user.id &&
            content.creator.toString() !== req.user.id &&
            req.user.role !== 'admin'
        ) {
            throw new AppError('User not authorized to delete comment', 403);
        }

        // Get remove index
        const removeIndex = content.comments
            .map(comment => comment.id)
            .indexOf(req.params.commentId);

        content.comments.splice(removeIndex, 1);
        await content.save();

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
}; 
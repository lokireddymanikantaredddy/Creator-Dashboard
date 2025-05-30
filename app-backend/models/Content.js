const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [5000, 'Description cannot be more than 5000 characters']
    },
    contentType: {
        type: String,
        enum: ['video', 'article', 'image', 'audio'],
        required: true
    },
    mediaUrl: {
        type: String,
        required: [true, 'Please provide a media URL']
    },
    thumbnail: {
        type: String,
        default: 'default-thumbnail.jpg'
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        required: [true, 'Please provide a category']
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'subscribers'],
        default: 'public'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true,
            maxlength: [500, 'Comment cannot be more than 500 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    metadata: {
        duration: Number,  // For video/audio
        fileSize: Number,
        dimensions: {      // For images/videos
            width: Number,
            height: Number
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add indexes for better query performance
contentSchema.index({ creator: 1, createdAt: -1 });
contentSchema.index({ tags: 1 });
contentSchema.index({ status: 1 });
contentSchema.index({ category: 1 });

// Virtual populate
contentSchema.virtual('likeCount').get(function() {
    return this.likes.length;
});

contentSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// Middleware to handle view count
contentSchema.methods.incrementViews = async function() {
    this.views += 1;
    await this.save();
};

module.exports = mongoose.model('Content', contentSchema); 
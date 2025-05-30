const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        deviceType: String,
        location: String
    }],
    engagements: [{
        type: {
            type: String,
            enum: ['like', 'comment', 'share'],
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    metrics: {
        totalViews: {
            type: Number,
            default: 0
        },
        uniqueViews: {
            type: Number,
            default: 0
        },
        averageViewDuration: Number,
        totalLikes: {
            type: Number,
            default: 0
        },
        totalComments: {
            type: Number,
            default: 0
        },
        totalShares: {
            type: Number,
            default: 0
        },
        engagementRate: Number
    },
    demographics: {
        ageRanges: {
            '13-17': Number,
            '18-24': Number,
            '25-34': Number,
            '35-44': Number,
            '45-54': Number,
            '55+': Number
        },
        genders: {
            male: Number,
            female: Number,
            other: Number
        },
        topCountries: [{
            country: String,
            count: Number
        }]
    },
    timeStats: {
        peakHours: [{
            hour: Number,
            views: Number
        }],
        weekdayStats: [{
            day: String,
            views: Number
        }]
    }
}, {
    timestamps: true
});

// Indexes for better query performance
analyticsSchema.index({ content: 1, creator: 1 });
analyticsSchema.index({ 'views.timestamp': 1 });
analyticsSchema.index({ 'engagements.timestamp': 1 });

// Update metrics when new view is added
analyticsSchema.methods.addView = async function(userId, deviceType, location) {
    this.views.push({
        user: userId,
        deviceType,
        location
    });
    
    this.metrics.totalViews += 1;
    
    // Update unique views
    const uniqueUsers = new Set(this.views.map(view => view.user?.toString()));
    this.metrics.uniqueViews = uniqueUsers.size;
    
    await this.save();
};

// Update metrics when new engagement is added
analyticsSchema.methods.addEngagement = async function(type, userId) {
    this.engagements.push({
        type,
        user: userId
    });
    
    // Update engagement counts
    switch(type) {
        case 'like':
            this.metrics.totalLikes += 1;
            break;
        case 'comment':
            this.metrics.totalComments += 1;
            break;
        case 'share':
            this.metrics.totalShares += 1;
            break;
    }
    
    // Calculate engagement rate
    const totalEngagements = this.metrics.totalLikes + 
                           this.metrics.totalComments + 
                           this.metrics.totalShares;
    this.metrics.engagementRate = (totalEngagements / this.metrics.totalViews) * 100;
    
    await this.save();
};

module.exports = mongoose.model('Analytics', analyticsSchema); 
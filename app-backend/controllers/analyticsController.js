const Analytics = require('../models/Analytics');
const Content = require('../models/Content');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get analytics for a specific content
// @route   GET /api/analytics/content/:contentId
// @access  Private (Creator owner or Admin)
exports.getContentAnalytics = async (req, res, next) => {
    try {
        const analytics = await Analytics.findOne({ content: req.params.contentId })
            .populate('content', 'title contentType')
            .populate('creator', 'username');

        if (!analytics) {
            throw new AppError('Analytics not found', 404);
        }

        // Check authorization
        if (analytics.creator._id.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new AppError('Not authorized to view these analytics', 403);
        }

        res.status(200).json({
            success: true,
            data: analytics
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get analytics dashboard data for a creator
// @route   GET /api/analytics/dashboard
// @access  Private (Creators only)
exports.getCreatorDashboard = async (req, res, next) => {
    try {
        // Get date range (default last 30 days)
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (parseInt(req.query.days) || 30));

        // Get all analytics for creator's content
        const analytics = await Analytics.find({
            creator: req.user.id,
            createdAt: { $gte: startDate, $lte: endDate }
        }).populate('content', 'title contentType status');

        // Calculate overall metrics
        const overallMetrics = {
            totalViews: 0,
            totalEngagements: 0,
            averageEngagementRate: 0,
            contentCount: analytics.length,
            topPerforming: []
        };

        analytics.forEach(item => {
            overallMetrics.totalViews += item.metrics.totalViews;
            overallMetrics.totalEngagements += 
                item.metrics.totalLikes + 
                item.metrics.totalComments + 
                item.metrics.totalShares;
        });

        // Calculate average engagement rate
        overallMetrics.averageEngagementRate = 
            (overallMetrics.totalEngagements / overallMetrics.totalViews) * 100 || 0;

        // Get top performing content
        overallMetrics.topPerforming = analytics
            .sort((a, b) => b.metrics.totalViews - a.metrics.totalViews)
            .slice(0, 5)
            .map(item => ({
                content: item.content,
                views: item.metrics.totalViews,
                engagementRate: item.metrics.engagementRate
            }));

        // Get view trends
        const viewTrends = await Analytics.aggregate([
            {
                $match: {
                    creator: req.user._id,
                    'views.timestamp': { $gte: startDate, $lte: endDate }
                }
            },
            {
                $unwind: '$views'
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$views.timestamp' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overallMetrics,
                viewTrends
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Track content view
// @route   POST /api/analytics/track/view/:contentId
// @access  Public
exports.trackContentView = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.contentId);
        if (!content) {
            throw new AppError('Content not found', 404);
        }

        let analytics = await Analytics.findOne({ content: req.params.contentId });
        
        if (!analytics) {
            analytics = await Analytics.create({
                content: req.params.contentId,
                creator: content.creator
            });
        }

        await analytics.addView(
            req.user ? req.user.id : null,
            req.body.deviceType || 'unknown',
            req.body.location || 'unknown'
        );

        res.status(200).json({
            success: true,
            message: 'View tracked successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Track content engagement (like, comment, share)
// @route   POST /api/analytics/track/engagement/:contentId
// @access  Private
exports.trackEngagement = async (req, res, next) => {
    try {
        const { type } = req.body;
        if (!['like', 'comment', 'share'].includes(type)) {
            throw new AppError('Invalid engagement type', 400);
        }

        const content = await Content.findById(req.params.contentId);
        if (!content) {
            throw new AppError('Content not found', 404);
        }

        let analytics = await Analytics.findOne({ content: req.params.contentId });
        
        if (!analytics) {
            analytics = await Analytics.create({
                content: req.params.contentId,
                creator: content.creator
            });
        }

        await analytics.addEngagement(type, req.user.id);

        res.status(200).json({
            success: true,
            message: 'Engagement tracked successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get analytics report for a specific time period
// @route   GET /api/analytics/report
// @access  Private (Creators only)
exports.getAnalyticsReport = async (req, res, next) => {
    try {
        const { startDate, endDate, contentId } = req.query;
        
        let query = {
            creator: req.user.id
        };

        if (contentId) {
            query.content = contentId;
        }

        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const analytics = await Analytics.find(query)
            .populate('content', 'title contentType status')
            .sort('-createdAt');

        // Generate report data
        const report = {
            period: {
                start: startDate || 'All time',
                end: endDate || 'Current'
            },
            summary: {
                totalContent: analytics.length,
                totalViews: 0,
                totalEngagements: 0,
                averageEngagementRate: 0
            },
            contentBreakdown: [],
            demographicsSummary: {
                ageRanges: {},
                genders: {},
                topCountries: []
            },
            timeAnalysis: {
                peakHours: [],
                weekdayPerformance: []
            }
        };

        // Process analytics data
        analytics.forEach(item => {
            // Update summary metrics
            report.summary.totalViews += item.metrics.totalViews;
            report.summary.totalEngagements += 
                item.metrics.totalLikes + 
                item.metrics.totalComments + 
                item.metrics.totalShares;

            // Add content breakdown
            report.contentBreakdown.push({
                content: item.content,
                metrics: item.metrics,
                demographics: item.demographics,
                timeStats: item.timeStats
            });

            // Aggregate demographics
            Object.entries(item.demographics.ageRanges).forEach(([range, count]) => {
                report.demographicsSummary.ageRanges[range] = 
                    (report.demographicsSummary.ageRanges[range] || 0) + count;
            });

            Object.entries(item.demographics.genders).forEach(([gender, count]) => {
                report.demographicsSummary.genders[gender] = 
                    (report.demographicsSummary.genders[gender] || 0) + count;
            });
        });

        // Calculate average engagement rate
        report.summary.averageEngagementRate = 
            (report.summary.totalEngagements / report.summary.totalViews) * 100 || 0;

        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        next(error);
    }
}; 
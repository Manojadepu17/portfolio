const { validationResult } = require('express-validator');
const ContactSubmission = require('../models/ContactSubmission');
const { sendContactEmail } = require('../services/emailService');

/**
 * Submit contact form
 * POST /api/contact/send
 */
const submitContact = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors: errors.array() 
            });
        }

        const { name, email, message } = req.body;

        console.log(`📥 Contact form submission from: ${email}`);

        // Rate limiting: Check if user already submitted recently (skip if MongoDB not connected)
        let recentSubmission = null;
        try {
            recentSubmission = await ContactSubmission.findOne({
                email: email,
                createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // Last 1 hour
            });
        } catch (dbError) {
            console.log('⚠️  Database not available, skipping rate limit check');
        }

        if (recentSubmission) {
            console.warn(`⏱️ Rate limit exceeded for: ${email}`);
            return res.status(429).json({
                success: false,
                error: 'You can only submit one message per hour. Please try again later.'
            });
        }

        // Send confirmation email to user (works without MongoDB)
        try {
            await sendContactEmail({
                name,
                email,
                message
            });
            console.log(`📧 Email sent successfully to ${email}`);
        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError.message);
            // Continue even if email fails
        }

        // Save to database (optional - skip if MongoDB not connected)
        try {
            const submission = new ContactSubmission({
                name,
                email,
                message,
                ipAddress: req.ip,
                userAgent: req.get('user-agent')
            });
            await submission.save();
            console.log(`✅ Message saved to database from ${email}`);
        } catch (dbError) {
            console.log('⚠️  Database not available, message not saved (but form still works!)');
        }

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully! I\'ll get back to you as soon as possible.'
        });

    } catch (error) {
        console.error('❌ Contact submission error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.'
        });
    }
};

/**
 * Get contact submissions (admin only)
 * GET /api/contact/submissions
 */
const getSubmissions = async (req, res) => {
    try {
        // In production, add authentication middleware here
        const adminPassword = req.headers['x-admin-key'];
        
        if (adminPassword !== process.env.ADMIN_KEY) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized access'
            });
        }

        const submissions = await ContactSubmission.find()
            .sort({ createdAt: -1 })
            .limit(100);

        res.status(200).json({
            success: true,
            count: submissions.length,
            submissions
        });

    } catch (error) {
        console.error('❌ Get submissions error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve submissions'
        });
    }
};

/**
 * Mark submission as read
 * PATCH /api/contact/submissions/:id
 */
const updateSubmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const adminPassword = req.headers['x-admin-key'];

        if (adminPassword !== process.env.ADMIN_KEY) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized access'
            });
        }

        const submission = await ContactSubmission.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!submission) {
            return res.status(404).json({
                success: false,
                error: 'Submission not found'
            });
        }

        res.status(200).json({
            success: true,
            submission
        });

    } catch (error) {
        console.error('❌ Update submission error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to update submission'
        });
    }
};

module.exports = {
    submitContact,
    getSubmissions,
    updateSubmissionStatus
};

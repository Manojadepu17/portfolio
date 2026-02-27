const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
    submitContact,
    getSubmissions,
    updateSubmissionStatus
} = require('../controllers/contactController');

/**
 * POST /api/contact/send
 * Submit a contact form message
 */
router.post('/send', [
    // Validation middleware
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .escape(),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('message')
        .trim()
        .isLength({ min: 10, max: 5000 })
        .withMessage('Message must be between 10 and 5000 characters')
        .escape()
], submitContact);

/**
 * GET /api/contact/submissions
 * Get all contact submissions (admin only)
 */
router.get('/submissions', getSubmissions);

/**
 * PATCH /api/contact/submissions/:id
 * Update submission status (admin only)
 */
router.patch('/submissions/:id', updateSubmissionStatus);

/**
 * GET /api/contact/health
 * Health check endpoint for contact API
 */
router.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        service: 'Contact API',
        route: '/api/contact/send',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;

# Backend Contact Form API - Complete Code Reference

## Backend Architecture

```
backend/
├── server.js                    # Main Express application
├── config/
│   └── config.js                # Configuration management
├── routes/
│   └── contact.js               # Contact form routes
├── controllers/
│   └── contactController.js     # Business logic
├── models/
│   └── ContactSubmission.js     # MongoDB schema
├── services/
│   └── emailService.js          # Email sending service
├── .env                         # Environment variables
└── package.json                 # Dependencies
```

---

## 1. Server Configuration (server.js)

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const contactRoutes = require('./routes/contact');
const { mongoUri, nodeEnv, port } = require('./config/config');

const app = express();

// ============ CORS Configuration ============
// Allows all localhost origins in development
// Restricted to FRONTEND_URL in production

const corsOptions = {
    origin: function (origin, callback) {
        // In development, allow all localhost origins
        if (nodeEnv === 'development') {
            if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            // In production, use specific FRONTEND_URL
            const allowedOrigins = [process.env.FRONTEND_URL || 'https://your-domain.com'];
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
    optionsSuccessStatus: 200
};

// ============ Middleware Stack ============

// Security headers
app.use(helmet());

// HTTP request logging
app.use(morgan('combined'));

// CORS - Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// Body parsing
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10kb', extended: true }));

// ============ Database Connection ============

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Using local MongoDB. Run: mongod');
});

// ============ Routes ============

// Contact form API
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        environment: nodeEnv,
        timestamp: new Date().toISOString()
    });
});

// Welcome message
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Portfolio Contact API Server',
        endpoints: {
            contact: 'POST /api/contact/send',
            health: 'GET /api/health',
            docs: 'GET /api/contact/health'
        }
    });
});

// ============ Error Handling ============

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        path: req.originalUrl,
        hint: 'Use POST /api/contact/send for contact submissions'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(nodeEnv === 'development' && { stack: err.stack })
    });
});

// ============ Start Server ============

const PORT = port;
app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 Portfolio Backend Server Running`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`📧 Contact API: POST http://localhost:${PORT}/api/contact/send`);
    console.log(`💚 Health Check: GET http://localhost:${PORT}/api/health`);
    console.log(`🌍 Environment: ${nodeEnv}`);
    console.log(`📦 Database: ${mongoUri.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
    console.log(`${'='.repeat(60)}\n`);
});

module.exports = app;
```

### Key Features
- ✅ Flexible CORS for development and production
- ✅ Security middleware (helmet)
- ✅ Request logging (morgan)
- ✅ Body size limits (10kb)
- ✅ MongoDB connection with error handling
- ✅ Comprehensive error handling

---

## 2. Configuration (config/config.js)

```javascript
require('dotenv').config();

module.exports = {
    // Environment
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Server port
    port: process.env.PORT || 5000,
    
    // MongoDB connection string
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
    
    // Email configuration
    emailConfig: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER
    },
    
    // Frontend URL for CORS
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};
```

### .env File Template
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=your-email@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:5500

# Admin Key (optional, for submissions admin endpoint)
ADMIN_KEY=your-secret-admin-key
```

---

## 3. Routes (routes/contact.js)

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
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
 * Header required: x-admin-key
 */
router.get('/submissions', getSubmissions);

/**
 * PATCH /api/contact/submissions/:id
 * Update submission status (admin only)
 * Header required: x-admin-key
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
```

### Route Validation Rules
- **name**: 2-100 characters, required, escaped
- **email**: Valid email format, required, normalized
- **message**: 10-5000 characters, required, escaped

---

## 4. Controller (controllers/contactController.js)

```javascript
const { validationResult } = require('express-validator');
const ContactSubmission = require('../models/ContactSubmission');
const { sendContactEmail } = require('../services/emailService');

/**
 * Submit contact form
 * POST /api/contact/send
 * 
 * Request body:
 * {
 *   name: string (2-100 chars),
 *   email: string (valid email),
 *   message: string (10-5000 chars)
 * }
 */
const submitContact = async (req, res) => {
    try {
        // ============ Validation ============
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.warn('⚠️ Validation failed:', errors.array());
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors: errors.array() 
            });
        }

        const { name, email, message } = req.body;
        console.log(`📥 Contact form submission from: ${email}`);

        // ============ Rate Limiting ============
        // Check if user already submitted recently
        const recentSubmission = await ContactSubmission.findOne({
            email: email,
            createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // Last 1 hour
        });

        if (recentSubmission) {
            console.warn(`⏱️ Rate limit exceeded for: ${email}`);
            return res.status(429).json({
                success: false,
                error: 'You can only submit one message per hour. Please try again later.'
            });
        }

        // ============ Create Submission Record ============
        const submission = new ContactSubmission({
            name,
            email,
            message,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        // ============ Send Emails ============
        // Send confirmation email to user
        console.log(`📧 Sending email to portfolio owner...`);
        await sendContactEmail({
            name,
            email,
            message
        });

        // ============ Save to Database ============
        await submission.save();
        console.log(`✅ Message saved successfully from ${email}`);

        // ============ Success Response ============
        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully! I\'ll get back to you as soon as possible.',
            submissionId: submission._id,
            nextSubmissionTime: new Date(Date.now() + 60 * 60 * 1000)
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
 * 
 * Headers:
 * x-admin-key: your-secret-admin-key
 */
const getSubmissions = async (req, res) => {
    try {
        // Authentication
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
 * Mark submission as read/replied
 * PATCH /api/contact/submissions/:id
 * 
 * Headers:
 * x-admin-key: your-secret-admin-key
 * 
 * Request body:
 * { status: 'received' | 'read' | 'replied' }
 */
const updateSubmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const adminPassword = req.headers['x-admin-key'];

        // Authentication
        if (adminPassword !== process.env.ADMIN_KEY) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized access'
            });
        }

        // Update
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
```

### Controller Features
- ✅ Input validation
- ✅ Rate limiting (1 per hour per email)
- ✅ Database operations
- ✅ Email service integration
- ✅ Error handling with logging
- ✅ Admin authentication

---

## 5. Data Model (models/ContactSubmission.js)

```javascript
const mongoose = require('mongoose');

const ContactSubmissionSchema = new mongoose.Schema(
    {
        // Name of the person
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters']
        },

        // Email address
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email'
            ],
            lowercase: true
        },

        // Message content
        message: {
            type: String,
            required: [true, 'Please provide a message'],
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [5000, 'Message cannot exceed 5000 characters']
        },

        // Submission status
        status: {
            type: String,
            enum: ['received', 'read', 'replied'],
            default: 'received'
        },

        // Metadata
        ipAddress: String,
        userAgent: String,
        
        // Timestamps
        createdAt: {
            type: Date,
            default: Date.now,
            index: true
        }
    }
);

// ============ Indexes for Performance ============

// Index for rate limiting queries
ContactSubmissionSchema.index({ email: 1, createdAt: -1 });

// Index for admin queries
ContactSubmissionSchema.index({ status: 1 });

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema);
```

### Schema Features
- ✅ Validation rules built-in to schema
- ✅ Data type enforcement
- ✅ Timestamps
- ✅ Performance indexes
- ✅ Status tracking

---

## 6. Email Service (services/emailService.js)

```javascript
const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/config');

// ============ Email Transporter Setup ============
const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.password
    }
});

/**
 * Send confirmation email to user and notification to admin
 * @param {Object} contactData - { name, email, message }
 * @returns {Promise}
 */
const sendContactEmail = async (contactData) => {
    try {
        const { name, email, message } = contactData;
        const timestamp = new Date().toLocaleString();

        // ============ Email to Portfolio Owner ============
        const ownerEmail = {
            from: emailConfig.from,
            to: emailConfig.user,
            subject: `New Portfolio Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #22D3EE 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">📨 New Message from Your Portfolio</h2>
                    </div>
                    
                    <!-- Content -->
                    <div style="backgroundColor: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px;">
                        <p><strong>From:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        
                        <p><strong>Message:</strong></p>
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0EA5E9;">
                            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">
                                ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                            </p>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px;">⏰ Received on: ${timestamp}</p>
                    </div>
                </div>
            `
        };

        // ============ Confirmation Email to Sender ============
        const confirmationEmail = {
            from: emailConfig.from,
            to: email,
            subject: '✅ Message Received - Adepu Manoj Portfolio',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #22D3EE 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">Thank You for Reaching Out! 🙏</h2>
                    </div>
                    
                    <!-- Content -->
                    <div style="backgroundColor: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px;">
                        <p>Hi ${name},</p>
                        
                        <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.</p>
                        
                        <p><strong>Message Details:</strong></p>
                        <ul style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0EA5E9;">
                            <li><strong>Received on:</strong> ${timestamp}</li>
                            <li><strong>Status:</strong> ✅ Successfully received</li>
                        </ul>
                        
                        <p>I typically respond to inquiries within 24-48 hours.</p>
                        
                        <p style="margin-top: 30px;">
                            Best regards,<br>
                            <strong>Adepu Manoj</strong><br>
                            Full Stack Developer & AI Enthusiast
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px; text-align: center;">
                            This is an automated confirmation email. Please do not reply to this email.
                        </p>
                    </div>
                </div>
            `
        };

        // ============ Send Emails ============
        console.log(`📧 Sending email to portfolio owner...`);
        await transporter.sendMail(ownerEmail);
        
        console.log(`📧 Sending confirmation email to ${email}...`);
        await transporter.sendMail(confirmationEmail);

        console.log(`✅ Both emails sent successfully`);
        
        return { 
            success: true, 
            message: 'Emails sent successfully' 
        };
        
    } catch (error) {
        console.error('❌ Email sending error:', error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

/**
 * Verify email configuration
 * @returns {Promise<boolean>}
 */
const verifyEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email service verified and ready to send messages');
        return true;
    } catch (error) {
        console.error('❌ Email service verification failed:', error.message);
        return false;
    }
};

module.exports = {
    sendContactEmail,
    verifyEmailConfig,
    transporter
};
```

### Email Service Features
- ✅ Nodemailer integration
- ✅ Professional HTML templates
- ✅ User confirmation emails
- ✅ Admin notifications
- ✅ Error handling
- ✅ Email verification

---

## API Documentation

### Submit Contact Form

**Endpoint:** `POST /api/contact/send`

**Request:**
```bash
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to discuss a web development project..."
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you as soon as possible.",
  "submissionId": "507f1f77bcf86cd799439011",
  "nextSubmissionTime": "2025-02-25T12:30:00.000Z"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "param": "email",
      "msg": "Please provide a valid email address"
    }
  ]
}
```

**Rate Limit (429):**
```json
{
  "success": false,
  "error": "You can only submit one message per hour. Please try again later."
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Failed to send message. Please try again later."
}
```

---

### Get Admin Submissions

**Endpoint:** `GET /api/contact/submissions`

**Headers:** 
```
x-admin-key: your-secret-admin-key
```

**Request:**
```bash
curl http://localhost:5000/api/contact/submissions \
  -H "x-admin-key: your-secret-admin-key"
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "submissions": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "...",
      "status": "received",
      "ipAddress": "192.168.1.1",
      "createdAt": "2025-02-25T10:30:00.000Z"
    }
  ]
}
```

---

### Update Submission Status

**Endpoint:** `PATCH /api/contact/submissions/:id`

**Headers:**
```
x-admin-key: your-secret-admin-key
```

**Request:**
```bash
curl -X PATCH http://localhost:5000/api/contact/submissions/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your-secret-admin-key" \
  -d '{ "status": "read" }'
```

**Response:**
```json
{
  "success": true,
  "submission": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "read",
    "createdAt": "2025-02-25T10:30:00.000Z"
  }
}
```

---

## Deployment Checklist

- [ ] Update NODE_ENV to "production"
- [ ] Set FRONTEND_URL to your domain
- [ ] Configure MongoDB Atlas (or production database)
- [ ] Set up Gmail App Password (or email service)
- [ ] Configure ADMIN_KEY in .env
- [ ] Enable HTTPS on frontend
- [ ] Test all endpoints
- [ ] Set up monitoring/logging
- [ ] Configure rate limiting if needed
- [ ] Set up backups for MongoDB

---

## Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "body-parser": "^1.20.2",
    "express-validator": "^7.0.0",
    "nodemailer": "^6.9.0",
    "dotenv": "^16.0.3"
  }
}
```

---

**Backend Completion Status:** ✅ Production Ready
**Last Updated:** February 25, 2025


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

// CORS Configuration - Allows all localhost origins in development
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

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10kb', extended: true }));

// Database Connection (optional - server works without it)
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('📁 Form submissions will be saved to database\n');
})
.catch((err) => {
    console.log('\n⚠️  MongoDB NOT connected:', err.message);
    console.log('💡 Server is STILL WORKING - Contact form will function normally');
    console.log('📝 Messages won\'t be saved to database (use MongoDB Atlas for saving)');
    console.log('🔗 Quick setup: https://www.mongodb.com/cloud/atlas\n');
});

// Routes
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

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        path: req.originalUrl,
        hint: 'Use POST /api/contact/send for contact submissions'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(nodeEnv === 'development' && { stack: err.stack })
    });
});

// Start server
app.listen(port, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 Portfolio Backend Server Running`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📡 Server: http://localhost:${port}`);
    console.log(`📧 Contact API: POST http://localhost:${port}/api/contact/send`);
    console.log(`💚 Health Check: GET http://localhost:${port}/api/health`);
    console.log(`🌍 Environment: ${nodeEnv}`);
    console.log(`📦 Database: ${mongoUri.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
    console.log(`${'='.repeat(60)}\n`);
});

module.exports = app;

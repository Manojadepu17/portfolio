const mongoose = require('mongoose');

const ContactSubmissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email'
            ],
            lowercase: true
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [5000, 'Message cannot exceed 5000 characters']
        },
        status: {
            type: String,
            enum: ['received', 'read', 'replied'],
            default: 'received'
        },
        ipAddress: String,
        userAgent: String,
        createdAt: {
            type: Date,
            default: Date.now,
            index: true
        }
    }
);

// Indexes for faster queries
ContactSubmissionSchema.index({ email: 1, createdAt: -1 });
ContactSubmissionSchema.index({ status: 1 });

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema);

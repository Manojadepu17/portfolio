# Portfolio Backend API

A production-ready Node.js/Express backend for portfolio contact form management with MongoDB storage and email integration.

## 🎯 Features

- ✅ RESTful API for contact form submissions
- ✅ MongoDB database for storing submissions
- ✅ Nodemailer email integration (Gmail, SendGrid, etc.)
- ✅ Server-side form validation
- ✅ Rate limiting (max 1 submission per hour per email)
- ✅ Admin submissions dashboard
- ✅ Security headers with Helmet
- ✅ CORS support
- ✅ Error handling & logging
- ✅ Production-ready deployment configs

## 📦 Tech Stack

- **Runtime:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Email:** Nodemailer
- **Validation:** express-validator
- **Security:** Helmet, CORS
- **Logging:** Morgan
- **Environment:** dotenv

## 🚀 Quick Start (5 Minutes)

See [QUICK_START.md](./QUICK_START.md) for the fastest way to get running locally.

## 📖 Full Setup Guide

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup and deployment instructions.

## 📁 Project Structure

```
backend/
├── server.js                    # Express app entry point
├── package.json                 # Dependencies
├── .env.example                 # Environment variables template
├── config/
│   └── config.js               # Configuration loader
├── models/
│   └── ContactSubmission.js    # MongoDB schema
├── controllers/
│   └── contactController.js    # Business logic
├── services/
│   └── emailService.js         # Nodemailer setup
├── routes/
│   └── contact.js              # API endpoints
├── QUICK_START.md              # 5-minute setup
├── SETUP_GUIDE.md              # Full deployment guide
└── README.md                   # This file
```

## 🔌 API Endpoints

### Submit Contact Form
```
POST /api/contact/submit
Content-Type: application/json

Request:
{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "Message content..."
}

Response (201):
{
    "success": true,
    "message": "Your message has been sent successfully!",
    "submissionId": "655a1234....",
    "nextSubmissionTime": "2024-11-25T10:30:00Z"
}
```

### Get All Submissions (Admin)
```
GET /api/contact/submissions
Headers: x-admin-key: your-admin-key

Response (200):
{
    "success": true,
    "count": 5,
    "submissions": [...]
}
```

### Update Submission Status (Admin)
```
PATCH /api/contact/submissions/:id
Headers: x-admin-key: your-admin-key
Content-Type: application/json

Request:
{
    "status": "read"
}
```

### Health Check
```
GET /api/health
GET /api/contact/health

Response (200):
{
    "status": "OK",
    "message": "Server is running",
    "timestamp": "2024-11-25T10:00:00Z"
}
```

## 🔧 Environment Variables

Required (in `.env` file):

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password

# Admin
ADMIN_KEY=secure-admin-key
```

## 📧 Email Setup

### Gmail
1. Enable 2FA: [myaccount.google.com](https://myaccount.google.com)
2. Create app password: [apppasswords](https://myaccount.google.com/apppasswords)
3. Copy 16-char password → paste in `.env`

### SendGrid
1. Create account and get API key
2. Set `EMAIL_SERVICE=SendGrid`
3. Set `EMAIL_USER=apikey` and `EMAIL_PASSWORD=your-api-key`

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-db-url
heroku config:set EMAIL_USER=your-email
heroku config:set EMAIL_PASSWORD=app-password
git push heroku main
```

### Deploy to Railway/Render
1. Connect GitHub repo
2. Set environment variables
3. Auto-deploy on push

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

## ✅ Testing

### Local Testing
```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start backend
npm run dev

# Terminal 3: Test API
curl http://localhost:5000/api/health

# Test contact form
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

## 🔒 Security

- ✅ Input validation (express-validator)
- ✅ Rate limiting (1 submission/hour/email)
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ MongoDB injection prevention
- ✅ Error message sanitization

## 📊 Database Schema

ContactSubmission:
```javascript
{
    name: String (2-100 chars),
    email: String (valid email),
    subject: String (5-200 chars),
    message: String (10-5000 chars),
    status: String ('received', 'read', 'replied'),
    ipAddress: String,
    userAgent: String,
    createdAt: Date (auto)
}
```

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| `MongoDB connection failed` | Start `mongod` in another terminal |
| `Email send failed` | Check `.env` credentials |
| `CORS blocked` | Set correct `FRONTEND_URL` in `.env` |
| `Port already in use` | Change `PORT` in `.env` |

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting) for more.

## 📝 Scripts

```bash
npm run dev      # Start with nodemon (development)
npm start        # Start production server
npm install      # Install dependencies
```

## 🤝 Integration with Frontend

Update `script.js` API URL:

```javascript
const API_URL = 'https://your-backend-url.com';
```

Frontend automatically sends form data to:
```
POST /api/contact/submit
```

## 📈 Production Checklist

- [ ] Use strong `ADMIN_KEY`
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas (cloud)
- [ ] Configure email service
- [ ] Update `FRONTEND_URL` for CORS
- [ ] Enable HTTPS
- [ ] Setup monitoring/logging
- [ ] Regular database backups
- [ ] Update dependencies regularly

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Nodemailer Docs](https://nodemailer.com/)
- [Mongoose Docs](https://mongoosejs.com/)

## 📄 License

Part of portfolio project. Free to use and modify.

## 📞 Support

For issues or questions:
1. Check [QUICK_START.md](./QUICK_START.md)
2. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. Review error logs in terminal
4. Check MongoDB connection
5. Verify `.env` configuration

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** Production Ready ✅

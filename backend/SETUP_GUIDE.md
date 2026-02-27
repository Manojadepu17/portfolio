# Backend Setup & Deployment Guide

## 📋 Overview

This guide will help you set up and deploy your portfolio backend API. The backend handles contact form submissions, stores them in MongoDB, and sends emails using Nodemailer.

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas account) - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **nodemailer** - Email service
- **express-validator** - Form validation
- **cors** - Cross-Origin Resource Sharing
- **helmet** - Security headers
- **morgan** - HTTP request logger
- **dotenv** - Environment variables

### Step 2: Configure Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your settings:**
   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=your-email@gmail.com
   ADMIN_KEY=your-secure-key
   ```

### Step 3: Setup Email Service (Gmail)

#### Using Gmail with App Password:

1. **Enable 2-Factor Authentication** on your Google Account
2. **Go to** [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. **Select** "Mail" and "Windows Computer" (or your device)
4. **Copy** the 16-character password
5. **Paste** it in `.env` as `EMAIL_PASSWORD`

#### Alternative Email Providers:

**SendGrid:**
```env
EMAIL_SERVICE=SendGrid
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

**Mailgun:**
```env
EMAIL_SERVICE=Mailgun
EMAIL_USER=your-domain@mg.yourdomain.com
EMAIL_PASSWORD=your-mailgun-api-key
```

### Step 4: Setup MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB (Mac/Linux)
mongod

# Start MongoDB (Windows) - if installed as service
# It should start automatically
```

#### Option B: MongoDB Atlas (Cloud)

1. **Go to** [mongodb.com/cloud](https://mongodb.com/cloud/atlas)
2. **Create free account** and cluster
3. **Get connection string:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```
4. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

### Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
==================================================
🚀 Server running on port 5000
📧 Email Service: Nodemailer
🗄️  Database: Connected
🌍 Environment: development
==================================================
```

### Step 6: Test the API

**Check API health:**
```bash
curl http://localhost:5000/api/health
```

**Test contact form:**
```bash
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message from the API"
  }'
```

---

## 🔧 Production Deployment

### Option 1: Deploy to Heroku (Recommended for Beginners)

#### Prerequisites:
- Heroku Account - [Sign up](https://www.heroku.com/)
- Heroku CLI - [Download](https://devcenter.heroku.com/articles/heroku-cli)

#### Steps:

1. **Login to Heroku:**
   ```bash
   heroku login
   ```

2. **Create a new Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Add environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   heroku config:set FRONTEND_URL=https://your-portfolio-domain.com
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   heroku config:set EMAIL_SERVICE=gmail
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=app-password
   heroku config:set ADMIN_KEY=your-secure-key
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **View logs:**
   ```bash
   heroku logs --tail
   ```

**Heroku Backend URL:** `https://your-app-name.herokuapp.com`

### Option 2: Deploy to Railway

1. **Go to** [railway.app](https://railway.app)
2. **Connect GitHub** repository
3. **Create new project** and select this repository
4. **Add environment variables** in Railway dashboard
5. **Deploy automatically**

### Option 3: Deploy to Render

1. **Go to** [render.com](https://render.com)
2. **Create new Web Service**
3. **Connect GitHub** repository
4. **Set build command:** `npm install`
5. **Set start command:** `npm start`
6. **Add environment variables**
7. **Deploy**

### Option 4: Self-Hosted (VPS)

**On DigitalOcean, AWS, or similar:**

1. **SSH into server:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install MongoDB:**
   ```bash
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   ```

4. **Clone repository:**
   ```bash
   git clone your-repo-url
   cd portfolio/backend
   npm install
   ```

5. **Configure `.env` with production values**

6. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "portfolio-api"
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Setup SSL with Let's Encrypt:**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

---

## 🔄 Update Frontend Configuration

Once your backend is deployed, update the API URL in `script.js`:

```javascript
const API_URL = 'https://your-backend-url.com';
```

Or update in line starting with:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://your-deployed-backend-url.com';
```

---

## 📊 API Endpoints

### 1. Submit Contact Form
```
POST /api/contact/submit
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Subject",
    "message": "Message content here"
}

Response (201):
{
    "success": true,
    "message": "Your message has been sent successfully!",
    "submissionId": "655a1234....",
    "nextSubmissionTime": "2024-11-25T10:30:00Z"
}
```

### 2. Get Submissions (Admin Only)
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

### 3. Update Submission Status (Admin Only)
```
PATCH /api/contact/submissions/:id
Headers: x-admin-key: your-admin-key
Content-Type: application/json

{
    "status": "read"
}
```

### 4. Health Check
```
GET /api/health

Response (200):
{
    "status": "OK",
    "message": "Server is running",
    "timestamp": "2024-11-25T10:00:00Z"
}
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running (`mongod` command)

### Email Sending Failed
```
Error: Failed to send email
```
**Solutions:**
1. Check email credentials in `.env`
2. Enable "Less secure app access" for Gmail
3. Use correct App Password
4. Check email provider's API docs

### CORS Error on Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `FRONTEND_URL` in backend `.env` to match your frontend domain

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill existing process
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 📈 Monitoring & Maintenance

### Check Email Queue
```bash
# Login to admin panel with ADMIN_KEY
curl http://localhost:5000/api/contact/submissions \
  -H "x-admin-key: your-admin-key"
```

### View Server Logs
```bash
# Development
npm run dev  # Logs display in terminal

# Production (Heroku)
heroku logs --tail

# Production (Self-hosted with PM2)
pm2 logs
```

### Update Dependencies
```bash
npm update
npm audit
npm audit fix
```

---

## 🔒 Security Checklist

- [ ] Never commit `.env` file to Git
- [ ] Use strong `ADMIN_KEY`
- [ ] Enable HTTPS in production
- [ ] Update `FRONTEND_URL` for CORS
- [ ] Regular backups of MongoDB
- [ ] Monitor error logs
- [ ] Update dependencies regularly
- [ ] Use environment-specific configs

---

## 📝 Notes

- **Rate Limiting:** Maximum 1 form submission per email per hour (built-in)
- **Validation:** Server-side validation for all fields
- **Email Templates:** HTML emails with gradient styling
- **Database:** Auto-indexes for faster queries
- **Error Handling:** Comprehensive error messages

---

## 🆘 Support

For issues, check:
1. Logs in terminal or `heroku logs --tail`
2. MongoDB connection status
3. Email service configuration
4. Environment variables set correctly
5. Firewall/network settings

---

**Last Updated:** February 2026

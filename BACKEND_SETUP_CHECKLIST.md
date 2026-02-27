# ✅ Backend Integration - Setup Checklist

Complete this checklist to ensure everything is set up correctly.

---

## 📋 Pre-Setup

- [ ] Node.js installed (v14+): `node --version`
- [ ] npm installed: `npm --version`
- [ ] MongoDB installed or Atlas account created
- [ ] Gmail account (or other email service)

---

## 🔧 Backend Installation

### Dependencies
- [ ] Ran `npm install` in `backend/` folder
- [ ] `node_modules/` folder exists
- [ ] `package-lock.json` created

### Configuration
- [ ] Copied `.env.example` to `.env`
- [ ] All required variables filled in `.env`:
  - [ ] `NODE_ENV=development`
  - [ ] `PORT=5000`
  - [ ] `FRONTEND_URL=http://localhost:3000`
  - [ ] `MONGODB_URI=mongodb://...`
  - [ ] `EMAIL_SERVICE=gmail`
  - [ ] `EMAIL_USER=your-email@gmail.com`
  - [ ] `EMAIL_PASSWORD=app-password-here`
  - [ ] `ADMIN_KEY=secure-key`

### Email Setup
- [ ] Gmail 2FA enabled: [myaccount.google.com/security](https://myaccount.google.com/security)
- [ ] App Password generated: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- [ ] App Password copied to `.env` (16 characters)

### Database Setup
- [ ] MongoDB running (local or MongoDB Atlas)
  - Local: `mongod` running in separate terminal
  - Atlas: Connection string in `.env`

---

## 🚀 Bootstrap & Testing

### Start Services

#### Terminal 1 - MongoDB (if using local)
- [ ] Ran `mongod`
- [ ] See "Listening on 0.0.0.0:27017" message

#### Terminal 2 - Backend
- [ ] Changed to `backend/` folder
- [ ] Ran `npm run dev`
- [ ] See messages:
  - [ ] `🚀 Server running on port 5000`
  - [ ] `✅ MongoDB connected successfully`
  - [ ] `📧 Email Service: Nodemailer`

#### Terminal 3 - Frontend
- [ ] Started local server: `python -m http.server 3000` (from portfolio root)
- [ ] Can access `http://localhost:3000`

### Test API Health
- [ ] Health check works:
  ```bash
  curl http://localhost:5000/api/health
  ```
  Should return: `{"status":"OK",...}`

### Test Form Submission
- [ ] Test submission via API:
  ```bash
  curl -X POST http://localhost:5000/api/contact/submit \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test User",
      "email": "test@example.com",
      "subject": "Test Subject",
      "message": "This is a test message"
    }'
  ```
  Should return: `{"success":true,"message":"..."}`

- [ ] Check inbox for **admin notification email**
- [ ] Check inbox for **confirmation email to sender**

---

## 🎯 Frontend Integration

### Verify API Connection
- [ ] Open browser developer tools (F12)
- [ ] Go to Console tab
- [ ] Fill out contact form on `http://localhost:3000`
- [ ] Submit form
- [ ] Check browser console for:
  - [ ] No CORS errors
  - [ ] No fetch errors
  - [ ] See success message

### Verify Form Submission
- [ ] Form shows "Sending..." on submit button
- [ ] Form shows success notification
- [ ] Form fields clear after submission
- [ ] Page scrolls to top
- [ ] Check email for confirmation

### Verify Database Storage
- [ ] Connected to MongoDB
- [ ] Run query in MongoDB Compass or shell:
  ```javascript
  db.contactsubmissions.find()
  ```
- [ ] See your test submission in database

---

## 📊 Verify All Components

### Backend Server
- [ ] Terminal shows no errors
- [ ] Requests logged (Morgan output)
- [ ] Health endpoint responds
- [ ] API accepts submissions

### Database
- [ ] MongoDB running
- [ ] Submissions saved to DB
- [ ] Can view submissions in MongoDB Compass or shell

### Email Service
- [ ] Emails sending successfully
- [ ] Admin receives notifications
- [ ] Senders receive confirmations
- [ ] No emails in spam folder

### Frontend
- [ ] Form displays correctly
- [ ] Form validation works
- [ ] API integration successful
- [ ] Errors display properly

---

## 🛑 Common Issues

If any of the above fails:

- [ ] Check [BACKEND_TROUBLESHOOTING.md](BACKEND_TROUBLESHOOTING.md)
- [ ] Read terminal error messages carefully
- [ ] Check browser console (F12)
- [ ] Verify `.env` file has all variables
- [ ] Make sure all services are running

---

## ✨ Ready for Production?

### Pre-Deployment Checklist

- [ ] All local tests passing
- [ ] No errors in server logs
- [ ] Form submissions working
- [ ] Emails sending correctly
- [ ] Security checklist reviewed:
  - [ ] `.env` file in `.gitignore`
  - [ ] `ADMIN_KEY` is unique/strong
  - [ ] No sensitive data in code
  - [ ] Dependencies up to date

### Deployment Platforms

#### Node.js Hosting
- [ ] Heroku account created (or Railway/Render)
- [ ] Git repository initialized
- [ ] `.env` file ready for production values
- [ ] MongoDB Atlas account created

#### Email Service
- [ ] Gmail: App Password generated and saved
- [ ] OR SendGrid: API key generated
- [ ] Email verified in sending service

---

## 📝 Documentation Read

- [ ] Read [backend/QUICK_START.md](backend/QUICK_START.md)
- [ ] Read [backend/README.md](backend/README.md)
- [ ] Read [README.md](README.md) (main project)
- [ ] Bookmarked [backend/SETUP_GUIDE.md](backend/SETUP_GUIDE.md) for deployment

---

## 🎉 Final Verification

### What You Should Have

**Frontend:**
- ✅ Portfolio website at `http://localhost:3000`
- ✅ Contact form submitting to API
- ✅ Success/error messages displaying

**Backend:**
- ✅ API server running on `http://localhost:5000`
- ✅ Contact submissions endpoint working
- ✅ Email service sending emails

**Database:**
- ✅ MongoDB storing submissions
- ✅ Can query submissions
- ✅ Data persists after restart

**Email:**
- ✅ Admin notifications received
- ✅ Confirmation emails sent
- ✅ Professional HTML templates

---

## 📞 Next Steps

### Local Development Complete ✅
- [ ] Everything working locally?
- [ ] Congrats! You have a working full-stack portfolio

### Ready to Deploy? 🚀
- [ ] See [backend/SETUP_GUIDE.md](backend/SETUP_GUIDE.md)
- [ ] Choose a hosting platform
- [ ] Follow deployment instructions
- [ ] Test production deployment

### Want to Customize?
- [ ] Update colors, content in frontend
- [ ] Adjust email templates in `backend/services/emailService.js`
- [ ] Modify validation rules in `backend/routes/contact.js`
- [ ] Add fields to contact form

---

## 📋 Troubleshooting If Stuck

| Symptom | Check |
|---------|-------|
| API not responding | Is `npm run dev` running? Is port 5000 in use? |
| Emails not sending | Check `.env` credentials, spam folder, error logs |
| CORS errors | Update `FRONTEND_URL` in `.env` |
| Database errors | Is MongoDB running? Connection string correct? |
| Nothing changes | Restart servers after `.env` changes |

---

## ✅ Success Indicators

You're good to go when you see:

1. **Terminal 1 (MongoDB):**
   ```
   Listening on 0.0.0.0:27017
   ```

2. **Terminal 2 (Backend):**
   ```
   🚀 Server running on port 5000
   ✅ MongoDB connected successfully
   ```

3. **Terminal 3 (Frontend):**
   ```
   Serving HTTP on 0.0.0.0 port 3000
   ```

4. **Browser:**
   - Portfolio displays at `http://localhost:3000`
   - Form submits successfully
   - Emails received

5. **Your Email Inbox:**
   - ✅ Admin notification received
   - ✅ Confirmation email received

---

## 📈 Completion

- [ ] All items checked
- [ ] All services running
- [ ] All tests passing
- [ ] Ready to deploy or use locally

**Date Completed:** ________________

**Status:** ✅ READY

---

When you're done, check out [backend/SETUP_GUIDE.md](backend/SETUP_GUIDE.md) for deploying to production!

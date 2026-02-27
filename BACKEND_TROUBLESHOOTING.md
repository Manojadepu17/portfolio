# 🔧 Backend Integration - Troubleshooting Guide

## Common Issues & Solutions

---

## ❌ "Cannot find module 'express'"

**Error:**
```
Error: Cannot find module 'express'
```

**Cause:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

Check that `node_modules/` folder is created.

---

## ❌ "MongoDB connection failed"

**Error:**
```
MongooseError: Cannot connect to mongodb://localhost:27017/portfolio
```

**Causes & Solutions:**

1. **MongoDB not running**
   ```bash
   mongod  # Start MongoDB in separate terminal
   ```

2. **Wrong connection string**
   - Check `.env` file for `MONGODB_URI`
   - For local: `mongodb://localhost:27017/portfolio`
   - For Atlas: `mongodb+srv://user:password@cluster.mongodb.net/portfolio`

3. **Port already in use**
   ```bash
   # Find process using port 27017
   lsof -i :27017  # Mac/Linux
   netstat -ano | findstr :27017  # Windows
   
   # Kill it
   kill -9 <PID>
   ```

---

## ❌ "Email sending failed"

**Error:**
```
Error: Failed to send email: Invalid login
```

**Cause:** Wrong email credentials

**Solutions:**

1. **Using Gmail:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" → "Windows Computer"
   - Copy 16-character password (WITHOUT spaces)
   - Paste into `.env` as `EMAIL_PASSWORD`

2. **Check `.env` file:**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

3. **2FA not enabled?**
   - Gmail App Passwords only work if you have 2-factor authentication
   - Enable it at [myaccount.google.com/security](https://myaccount.google.com/security)

4. **Try test:**
   ```bash
   node -e "
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com',
       pass: 'app-password'
     }
   });
   transporter.verify((err, valid) => {
     console.log(valid ? 'Email ready!' : err);
   });
   "
   ```

---

## ❌ "Server running on port 5000 but can't connect"

**Error:**
```
Failed to fetch http://localhost:5000
```

**Causes & Solutions:**

1. **Server not running**
   ```bash
   npm run dev
   ```
   Look for: `🚀 Server running on port 5000`

2. **Wrong port in `.env`**
   - Check `PORT=5000` is set correctly
   - Update `script.js` if using different port

3. **Firewall blocking**
   - Windows: Allow Node.js through firewall
   - Mac: System Preferences → Security & Privacy

4. **Port already in use**
   ```bash
   # Find process using 5000
   lsof -i :5000  # Mac/Linux
   netstat -ano | findstr :5000  # Windows
   
   # Kill it
   kill -9 <PID>
   ```

5. **Use different port:**
   ```env
   PORT=5001
   ```

---

## ❌ "CORS error when submitting form"

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Cause:** Frontend URL not set correctly in backend

**Solution:**

1. **Check `.env`:**
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

2. **Update to match your frontend:**
   - Local: `http://localhost:3000`
   - Production: `https://yourdomain.com`

3. **If deploying:**
   - Update backend CORS to production URL:
     ```bash
     heroku config:set FRONTEND_URL=https://yourdomain.com
     ```

---

## ❌ "Form submission shows 'Connection error'"

**Error Message:**
```
Connection error. Make sure the backend server is running.
```

**Causes & Solutions:**

1. **Backend server not running**
   ```bash
   cd backend
   npm run dev
   ```

2. **Wrong API URL in `script.js`**
   - Check line with `const API_URL =`
   - Should match your backend address

3. **CORS not configured**
   - Check `.env` has `FRONTEND_URL` set

4. **Network/Firewall blocking**
   - Try accessing API directly: `curl http://localhost:5000/api/health`

---

## ❌ "Rate limiting: You can only submit one message per hour"

**Error Message:**
```
You can only submit one message per hour
```

**Cause:** API rate limiting is working correctly

**This is by design** - prevents spam from same email address

**Solution:**
- Wait 1 hour, or
- Use different email address, or
- Change rate limit in `backend/controllers/contactController.js`:
  ```javascript
  // Change 60 * 60 * 1000 to different duration (in milliseconds)
  // Current: 3,600,000ms = 1 hour
  // Examples: 600000ms = 10 minutes, 5 * 60 * 1000 = 5 minutes
  ```

---

## ❌ ".env file not working"

**Error:**
```
undefined is not defined (EMAIL_USER, etc)
```

**Causes & Solutions:**

1. **File named wrong**
   - Should be `.env` (not `.env.txt` or `.env.example`)
   - On Windows, make sure extension is actually `.env`

2. **File in wrong location**
   - Should be in `portfolio/backend/.env`
   - Not in `portfolio/.env`

3. **Server not restarted after changing .env**
   ```bash
   npm run dev  # Restart server
   ```

4. **Variable not in `.env` file**
   - Add all required variables
   - See `.env.example` for template

5. **Quotes in values**
   ```env
   # Wrong
   EMAIL_PASSWORD="my password"

   # Correct
   EMAIL_PASSWORD=my password
   ```

---

## ❌ "Port already in use :::5000"

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Cause:** Something else is using port 5000

**Solution:**

### Option 1: Kill the process
```bash
# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Windows (PowerShell as admin)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Option 2: Use different port
```env
PORT=5001
```

Then update `script.js`:
```javascript
const API_URL = 'http://localhost:5001';
```

---

## ❌ "MongoDB Atlas connection timeout"

**Error:**
```
MongooseError: connect ETIMEDOUT
```

**Causes & Solutions:**

1. **Wrong connection string**
   - Get from MongoDB Atlas dashboard
   - Replace `<password>` with actual password
   - Replace `<dbname>` with database name

2. **IP whitelist**
   - Go to MongoDB Atlas → Network Access
   - Add your IP address (or 0.0.0.0 for anywhere)
   - Wait a few minutes for it to apply

3. **Firewall blocking**
   - MongoDB uses port 27017
   - Check your firewall settings
   - Corporate network might block it

4. **Username/password wrong**
   - Get from MongoDB Atlas credentials

---

## ❌ "Submission not saving to database"

**Error:**
```
Email sends but data not in MongoDB
```

**Causes & Solutions:**

1. **MongoDB not connected**
   - Check logs for connection message
   - Look for error about MongoDB

2. **Database error**
   - Check server logs for validation errors
   - Might be field validation failing

3. **Wrong collection name**
   - Should be `contactsubmissions` in MongoDB

**Debug:**
```bash
# Check MongoDB connection
curl http://localhost:5000/api/contact/health
```

---

## ❌ "Admin key not working"

**Error:**
```
{"success": false, "error": "Unauthorized access"}
```

**Cause:** Wrong admin key in header

**Solution:**

1. **Set in `.env`:**
   ```env
   ADMIN_KEY=your-secure-key-here
   ```

2. **Use in request:**
   ```bash
   curl http://localhost:5000/api/contact/submissions \
     -H "x-admin-key: your-secure-key-here"
   ```

3. **Make sure it matches exactly**
   - Case sensitive
   - No extra spaces
   - No quotes

---

## ❌ "nodemon: command not found"

**Error:**
```
Command 'nodemon' not found
```

**Cause:** nodemon not installed

**Solution:**
```bash
npm install

# Or run with node directly instead
node backend/server.js
```

---

## ❌ "Cannot find module 'dotenv'"

**Error:**
```
Error: Cannot find module 'dotenv'
```

**Cause:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

---

## ❌ Contact form shows success but no email received

**Causes & Solutions:**

1. **Check spam folder**
   - Email might be marked as spam
   - Add sender to contacts

2. **Gmail App Password issue**
   - Generate new App Password
   - Make sure 2FA is enabled
   - Paste exact 16-character password

3. **Check email configuration**
   ```bash
   curl -X POST http://localhost:5000/api/contact/submit \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test",
       "email": "your-email@gmail.com",
       "subject": "Test",
       "message": "Test"
     }'
   ```

4. **Check server logs**
   - Look for email sending errors
   - Check nodemailer response

---

## ✅ Everything working?

**Verify:**

1. ✅ Backend running: `npm run dev` shows "Server running on port 5000"
2. ✅ MongoDB connected: Shows "MongoDB connected successfully"
3. ✅ Health check: `curl http://localhost:5000/api/health` returns OK
4. ✅ Submit form: No errors in browser console
5. ✅ Email received: Check inbox for confirmation email

---

## 🆘 Still Not Working?

### Debug Steps

1. **Check backend logs**
   ```
   Look at terminal where `npm run dev` is running
   ```

2. **Check browser console**
   ```
   Press F12 → Console tab → Look for errors
   ```

3. **Test API directly**
   ```bash
   curl http://localhost:5000/api/health
   ```

4. **Check `.env` file**
   ```bash
   cat .env  # Mac/Linux
   type .env # Windows
   ```

5. **Verify MongoDB running**
   ```bash
   curl http://localhost:27017/
   # Should show: It looks like you are trying to access MongoDB over HTTP on the native driver port.
   ```

### Get Help

Check these files:
- [backend/QUICK_START.md](backend/QUICK_START.md) - Quick setup guide
- [backend/SETUP_GUIDE.md](backend/SETUP_GUIDE.md) - Comprehensive guide
- [backend/README.md](backend/README.md) - API documentation

---

**Last Updated:** February 2026

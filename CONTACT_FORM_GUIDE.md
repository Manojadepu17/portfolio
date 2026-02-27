# Contact Form - Setup & Testing Guide

## ✅ What Has Been Fixed

### Frontend (HTML/CSS/JavaScript)
- ✅ Added proper `name` attributes to all form inputs (`name`, `email`, `message`)
- ✅ Updated JavaScript to use FormData API for professional form handling
- ✅ Implemented proper `fetch()` with CORS support
- ✅ Added comprehensive error handling with console logs
- ✅ Added success/error notifications
- ✅ Form validation (client-side)
- ✅ Button state management (disable during submission)
- ✅ Character count tracker for message field

### Backend (Node.js/Express)
- ✅ Updated route from `/submit` to `/send` (matches frontend)
- ✅ Removed subject field requirement (form doesn't have it)
- ✅ Improved CORS configuration to accept all localhost origins
- ✅ Enhanced error responses with proper HTTP status codes
- ✅ Added comprehensive console logging
- ✅ Updated email service to work without subject field
- ✅ Updated MongoDB model to not require subject
- ✅ Added rate limiting (1 submission per hour per email)

---

## 🚀 Quick Start - Local Development

### Prerequisites
- Node.js (v14+)
- MongoDB running locally OR MongoDB Atlas connection string
- npm packages installed

### Backend Setup

**1. Start MongoDB** (if using local MongoDB)
```bash
mongod
```

**2. Install backend dependencies** (if not already done)
```bash
cd backend
npm install
```

**3. Create `.env` file in backend folder**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email Configuration (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:5500
```

**Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

**4. Start the backend server**
```bash
npm start
# or
node server.js
```

Expected output:
```
============================================================
🚀 Portfolio Backend Server Running
============================================================
📡 Server: http://localhost:5000
📧 Contact API: POST http://localhost:5000/api/contact/send
💚 Health Check: GET http://localhost:5000/api/health
🌍 Environment: development
📦 Database: Local MongoDB
============================================================
```

### Frontend Setup

**1. Serve the frontend** (use any HTTP server)

Option A - Using Python:
```bash
python -m http.server 5500
```

Option B - Using Node live-server:
```bash
npm install -g live-server
live-server --port=5500
```

Option C - Using VS Code Live Server extension
- Right-click `index.html` → "Open with Live Server"

**2. Open in browser**
```
http://localhost:5500
```

---

## 🧪 Testing the Contact Form

### Step 1: Verify Backend is Running
```bash
curl http://localhost:5000/api/health
```
Expected response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "environment": "development",
  "timestamp": "2025-02-25T10:30:00.000Z"
}
```

### Step 2: Test Contact Form in Browser
1. Navigate to `http://localhost:5500`
2. Scroll to the "Let's Create Something Amazing" section
3. Fill in the form:
   - **Name:** Your name (min 2 chars)
   - **Email:** Valid email address
   - **Message:** Your message (min 10 chars, max 500)
4. Click "Send Message"

### Step 3: Check Responses

#### Success Response ✅
You should see:
- Green success notification: "Message sent successfully! I'll get back to you as soon as possible."
- Console log: `✅ Response: {success: true, ...}`
- Form is cleared
- Page scrolls to top

#### Error Response ❌
Check browser console (F12) for error messages:
- "Connection error" → Backend not running
- "Rate limit" → Already submitted within last hour
- "Validation failed" → Missing or invalid fields

---

## 📊 Code Summary

### Frontend - JavaScript (script.js)
```javascript
// Contact form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data using FormData API
        const formData = new FormData(this);
        const data = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            message: formData.get('message')?.trim()
        };
        
        // Client-side validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Send to API
        const response = await fetch(CONTACT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to send');
        }
        
        showNotification(result.message, 'success');
        this.reset();
    });
}
```

### Backend - Route (routes/contact.js)
```javascript
router.post('/send', [
    body('name').trim().isLength({ min: 2, max: 100 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().isLength({ min: 10, max: 5000 }).escape()
], submitContact);
```

### Backend - Controller (controllers/contactController.js)
```javascript
const submitContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, message } = req.body;
    
    // Rate limiting: max 1 per hour
    const recentSubmission = await ContactSubmission.findOne({
        email: email,
        createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }
    });
    
    if (recentSubmission) {
        return res.status(429).json({ 
            success: false, 
            error: 'Maximum 1 submission per hour' 
        });
    }
    
    // Save and send emails
    const submission = new ContactSubmission({ name, email, message });
    await sendContactEmail({ name, email, message });
    await submission.save();
    
    res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully!'
    });
};
```

---

## 🔍 Debugging Tips

### Browser Console (F12 → Console)
Look for logs like:
```
📝 Form submitted
📤 Form data: {name: "...", email: "...", message: "..."}
🔗 Sending to: http://localhost:5000/api/contact/send
📊 Response status: 201
✅ Response: {success: true, ...}
```

### Backend Console
Look for logs like:
```
📥 Contact form submission from: user@example.com
📧 Sending email to portfolio owner...
📧 Sending confirmation email to user@example.com...
✅ Message saved successfully from user@example.com
```

### Network Tab (F12 → Network)
1. Fill and submit the form
2. Look for a POST request to `/api/contact/send`
3. Click it and check:
   - **Request Headers:** Content-Type should be application/json
   - **Request Body:** Should contain name, email, message
   - **Response:** Should show success message with 201 status

---

## 📋 Form Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| Name | Text | 2-100 characters, required |
| Email | Email | Valid email format, required |
| Message | Textarea | 10-5000 characters, required |

---

## ⚙️ CORS Configuration

The backend is now configured to accept:
- **Development:** All localhost origins (localhost, 127.0.0.1, any port)
- **Production:** Only FRONTEND_URL environment variable

Example CORS request headers:
```
Origin: http://localhost:5500
Access-Control-Allow-Origin: http://localhost:5500
Access-Control-Allow-Credentials: true
```

---

## 📧 Email Configuration

### For Gmail Users (RECOMMENDED)
1. Enable 2-Step Verification on your Google account
2. Generate an App Password: https://support.google.com/accounts/answer/185833
3. Use the 16-character password in `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### For Other Email Services
Update `.env` and the email service:
```env
EMAIL_SERVICE=outlook  # or yahoo, sendgrid, etc.
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
```

---

## 🚀 Deployment

### Before deployment:
1. Set proper `.env` variables
2. Update FRONTEND_URL in backend `.env`
3. Test CORS with production domain
4. Ensure MongoDB Atlas is set up
5. Update security settings

### Production Checklist:
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL set to your domain
- [ ] MONGODB_URI points to MongoDB Atlas
- [ ] Email credentials are secure
- [ ] CORS whitelist is correct
- [ ] HTTPS is enabled
- [ ] Rate limiting is configured

---

## 💡 Features Implemented

✅ Form validation (client & server)
✅ CORS support with flexible localhost
✅ Rate limiting (1 message/hour per email)
✅ Email confirmation to user
✅ Email notification to owner
✅ MongoDB storage with indexes
✅ Error handling & logging
✅ Security (helmet, body-parser limits)
✅ Responsive form UI
✅ Character counter
✅ Loading states
✅ API health check endpoint

---

## 📞 Support

If form still doesn't work:
1. Check backend is running: `http://localhost:5000/api/health`
2. Check browser console errors (F12)
3. Check backend console for logs
4. Verify `.env` file in backend folder
5. Verify MongoDB is running
6. Check network requests (F12 → Network)

---

## Files Modified

- ✅ `index.html` - Added name attributes to form inputs
- ✅ `script.js` - Updated fetch logic, better error handling
- ✅ `backend/server.js` - CORS configuration
- ✅ `backend/routes/contact.js` - Removed subject field requirement
- ✅ `backend/controllers/contactController.js` - Updated to remove subject
- ✅ `backend/models/ContactSubmission.js` - Removed subject field
- ✅ `backend/services/emailService.js` - Updated email templates

---

**Last Updated:** February 25, 2025
**Status:** ✅ Production-Ready


# 🚀 Quick Start - Local Backend Setup (5 Minutes)

## Prerequisites
- Node.js installed: [Download](https://nodejs.org/)
- MongoDB installed locally: [Download](https://www.mongodb.com/try/download/community)
- Or MongoDB Atlas account: [Free Cloud DB](https://mongodb.com/cloud/atlas)

---

## 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

---

## 2️⃣ Setup Environment Variables

**Create `.env` file** (copy from `.env.example`):

```bash
cp .env.example .env
```

**Edit `.env`** with your Gmail/email info:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=YOUR_EMAIL@gmail.com
EMAIL_PASSWORD=YOUR_APP_PASSWORD
EMAIL_FROM=YOUR_EMAIL@gmail.com
ADMIN_KEY=test123
```

### 🔑 Get Gmail App Password
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select Mail → Windows Computer
3. Copy 16-char password → Paste in `EMAIL_PASSWORD`

---

## 3️⃣ Start MongoDB

**Option A - Local MongoDB:**
```bash
mongod
```
Keep this running in separate terminal.

**Option B - MongoDB Atlas (Cloud):**
- Create account at [mongodb.com/cloud](https://mongodb.com/cloud)
- Get connection string
- Add to `.env`: `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio`

---

## 4️⃣ Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully
```

---

## 5️⃣ Test the API

**In a new terminal:**

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test contact form
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

---

## ✅ Done!

Your backend is now running at `http://localhost:5000`

The frontend at `http://localhost:3000` will automatically connect to it.

### 📧 Check Inbox
You should receive:
1. **Admin notification** at your email
2. **Confirmation email** to the sender

---

## 🛑 Stop Server

Press `Ctrl+C` in the terminal

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| `Cannot find module 'express'` | Run `npm install` |
| `MongoDB connection failed` | Start `mongod` in another terminal |
| `Email send failed` | Check Gmail App Password |
| `Port 5000 already in use` | Change PORT in `.env` |

---

## 📚 For More Info
See `SETUP_GUIDE.md` for production deployment

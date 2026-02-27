# 🚀 Portfolio Deployment Guide

## Quick Deploy to Vercel (Recommended - FREE)

Your portfolio is now ready to deploy! Vercel will host both your frontend and backend together.

### Step 1: Push Your Changes to GitHub

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Website (Easiest)

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Sign Up"** and sign in with your GitHub account
3. **Click "Add New Project"**
4. **Import your portfolio repository**
5. **Configure the project:**
   - Leave all settings as default
   - Vercel will auto-detect the configuration from `vercel.json`
6. **Add Environment Variables** (Click "Environment Variables"):
   
   **Required:**
   ```
   NODE_ENV=production
   PORT=5000
   ```
   
   **For Email (Optional - if you want contact form to send emails):**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ADMIN_EMAIL=your-email@gmail.com
   ```
   
   **For MongoDB (Optional - if you want to save submissions):**
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   ```

7. **Click "Deploy"** and wait 1-2 minutes
8. **Done!** You'll get a URL like: `https://your-portfolio.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts and you'll get your live URL!
```

### Step 3: Test Your Site

1. Open the Vercel URL in your browser
2. Test the contact form
3. Share the URL with anyone - it works on all devices!

---

## Alternative Deployment Options

### Option 1: Render (Good for Backend)

**Best for:** Separate backend deployment

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment:** Add your environment variables
6. Click "Create Web Service"
7. You'll get a backend URL like: `https://your-portfolio.onrender.com`

**For Frontend:** Deploy to GitHub Pages or Netlify

### Option 2: Railway (Full-Stack)

**Best for:** Simple full-stack deployment

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your portfolio
5. Add environment variables
6. Railway will auto-deploy

### Option 3: GitHub Pages (Frontend Only)

**Best for:** Static frontend only (no backend)

```bash
# In your repository settings:
# Settings → Pages → Source → main branch → Save
```

Your site will be at: `https://yourusername.github.io/repository-name`

**Note:** This only hosts HTML/CSS/JS. Backend won't work.

---

## 📱 Testing on Mobile

Once deployed, you can:
1. **Open the URL on your phone's browser**
2. **Scan QR code** (Vercel provides this)
3. **Share with anyone** - the site is publicly accessible

---

## 🎯 Environment Variables Reference

### Required Variables
```env
NODE_ENV=production
PORT=5000
```

### Email Configuration (Optional)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=where-to-receive-messages@gmail.com
```

**To get Gmail App Password:**
1. Go to Google Account Settings
2. Security → 2-Step Verification → App Passwords
3. Generate password for "Mail"
4. Use that password (not your regular password)

### MongoDB Configuration (Optional)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

**To get MongoDB URI:**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Database → Connect → Connect your application
4. Copy connection string

---

## 🔧 Troubleshooting

### Contact Form Not Working
- Check environment variables in Vercel dashboard
- Make sure `EMAIL_USER` and `EMAIL_PASS` are set correctly
- Check Vercel function logs for errors

### CORS Errors
- The configuration already handles Vercel domains
- If using a custom domain, add it to `FRONTEND_URL` environment variable

### Build Errors
- Make sure all files are committed to GitHub
- Check Vercel build logs
- Verify `backend/package.json` exists

---

## 🎉 Next Steps

After deployment:
1. ✅ Test all pages and features
2. ✅ Test contact form
3. ✅ Check mobile responsiveness
4. ✅ Share your portfolio URL!
5. ⭐ Add custom domain (optional - Vercel supports this for free)

---

## Custom Domain (Optional)

To use your own domain (e.g., `yourname.com`):

1. **Buy a domain** (Namecheap, GoDaddy, etc.)
2. **In Vercel Dashboard:**
   - Project Settings → Domains
   - Add your domain
   - Follow DNS instructions
3. **Done!** Your site will be at `yourname.com`

---

**Need Help?** Check Vercel's deployment logs or documentation at [vercel.com/docs](https://vercel.com/docs)

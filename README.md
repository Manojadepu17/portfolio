# Adepu Manoj - Futuristic Portfolio Website

A modern, ultra-responsive portfolio website featuring advanced animations, glassmorphism design, and AI-powered interactivity. Built with vanilla HTML5, CSS3, and JavaScript—no frameworks required.

## 🎯 Overview

This portfolio showcases a professional developer's skills, projects, and experience through an immersive web experience. The design emphasizes modern aesthetics with smooth animations, interactive elements, and a mobile-first responsive approach.

**Live Features:**
- Responsive design (320px to 1920px+)
- Smooth scroll animations and transitions
- Interactive project modals with detailed information
- Contact form with validation
- Dynamic typing effects
- Dark theme with gradient accents

## 🎨 Design Highlights

### Color Palette
- **Primary Gradient:** Indigo → Sky → Cyan (`#6366F1 → #0EA5E9 → #22D3EE`)
- **Background:** Deep Space Dark (`#0a0e27`)
- **Text:** White (`#ffffff`) & Slate (`#94a3b8`)
- **Accent Glow:** Cyan (`#0EA5E9`)

### Typography
- **Primary Font:** Spline Sans (Google Fonts) - Clean, modern, tech-forward
- **Secondary Font:** Space Mono - Monospace accent for code-like elements
- **Font Weights:** 300-800 for comprehensive hierarchy

### Visual Effects
- ✨ Animated gradient flows (3s cycle)
- 🌊 Floating background shapes with drift animations
- 💫 Light beam effects across hero section
- 🎭 Glassmorphism effects on cards and modals
- 🔄 Ripple effects on button interactions
- 📱 Responsive grid layouts with smooth transitions

## 📁 Project Structure

```
portfolio/
├── index.html                 # Frontend HTML
├── style.css                  # Frontend styling
├── script.js                  # Frontend interactivity
├── README.md                  # This file
├── assets/
│   └── certifications/        # Certification images
├── backend/                   # Backend API server
│   ├── server.js              # Express app entry point
│   ├── package.json           # Node dependencies
│   ├── .env.example           # Environment variables template
│   ├── config/
│   │   └── config.js          # Configuration loader
│   ├── models/
│   │   └── ContactSubmission.js # MongoDB schema
│   ├── controllers/
│   │   └── contactController.js # Business logic
│   ├── services/
│   │   └── emailService.js    # Nodemailer integration
│   ├── routes/
│   │   └── contact.js         # API endpoints
│   ├── QUICK_START.md         # 5-minute setup guide
│   └── SETUP_GUIDE.md         # Full deployment guide
└── docs/                      # Additional documentation
    ├── PORTFOLIO_SUMMARY.md
    ├── IMPLEMENTATION_SUMMARY.md
    ├── EXPERIENCE_EDUCATION_REDESIGN.md
    └── QUICK_VISUAL_REFERENCE.md
```

## 🚀 Quick Start

### Frontend Only (Static)

Prerequisites:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)
- No build tools required

**Installation:**

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Option A - Open directly**
   ```bash
   start index.html  # Windows
   open index.html   # Mac
   ```

3. **Option B - Use local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
   Then navigate to `http://localhost:8000`

---

### Frontend + Backend (Full Functionality)

For real contact form functionality with email integration:

**Prerequisites:**
- Node.js (v14+) - [Download](https://nodejs.org/)
- MongoDB (local or Atlas) - [Setup](backend/QUICK_START.md)

**Quick Setup (5 minutes):**

1. **Start Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your Gmail credentials
   npm run dev
   ```
   See [Backend Setup Guide](backend/QUICK_START.md) for details

2. **Start Frontend** (in new terminal)
   ```bash
   python -m http.server 3000
   # or
   npx http-server -p 3000
   ```

3. **Visit** `http://localhost:3000`

**For Production Deployment:**
See [Full Setup & Deployment Guide](backend/SETUP_GUIDE.md)

## 🎯 Features

### Frontend Features

✅ **Responsive Design** - Mobile-first, works on all devices (320px-1920px+)  
✅ **Smooth Animations** - 20+ CSS animations with scroll reveals  
✅ **Interactive Elements** - Modals, hover effects, typing animations  
✅ **Modern UI** - Glassmorphism, gradient effects, floating shapes  
✅ **Navigation** - Smooth scrolling, active link highlighting, hamburger menu  
✅ **Modal System** - Project details with glassmorphic design  
✅ **Scroll-to-Top** - Floating button with gradient styling  
✅ **Form Validation** - Client-side validation with real-time feedback  

### Backend Features (NEW)

✅ **Contact Form API** - Submit forms with validation  
✅ **Email Integration** - Send emails via Nodemailer/Gmail/SendGrid  
✅ **MongoDB Storage** - Store submissions in database  
✅ **Rate Limiting** - Prevent spam (1 submission per hour per email)  
✅ **Validation** - Server-side validation for all fields  
✅ **Security** - Helmet headers, input sanitization, CORS  
✅ **Admin Dashboard** - Track submissions with admin key  
✅ **Error Handling** - Comprehensive error messages  
✅ **HTTPS Ready** - Configuration for SSL/TLS  
✅ **Scalable** - Production-ready deployment on Heroku/Railway/AWS

### 🏠 Hero Section
- Animated mega typography (80-100px responsive)
- Gradient-animated name with backdrop
- Typing animation for roles/subtitle
- Call-to-action buttons with ripple effects
- Animated background elements (shapes, light beams, particles)

### 📊 About Section
- Statistics grid with hover animations
- Professional summary
- Quick skill overview

### 💻 Skills Section
- Organized skill badges by category
- Left-to-right sliding animations on hover
- Color-coded badges for visual hierarchy
- Multiple skill categories (Frontend, Backend, AI/ML, etc.)

### 🎓 Projects Section
- Modern card layout with glassmorphism
- Shimmer and hover tilt effects
- Project preview images
- Click-to-expand modals with full details
- Technology tags and links

### 👔 Experience Section
- Combined internship and achievement timeline
- Professional background and accomplishments
- Technical skills highlights

### 📚 Education Section
- Academic credentials
- Certifications with images
- Relevant coursework

### ✉️ Contact Section
- Glassmorphic form with smooth styling
- Form validation (email, required fields)
- Real-time feedback on submission
- Social media links with hover effects

### 🔗 Footer
- Minimalist design
- Social media integration
- Quick navigation links

## ✨ Interactive Features

| Feature | Description |
|---------|-------------|
| **Smooth Navigation** | Scroll-spy with active link highlighting |
| **Hamburger Menu** | Mobile-responsive navigation toggle |
| **Modal System** | Project details with glassmorphic design |
| **Form Validation** | Email verification and required field checks |
| **Typing Animation** | Dynamic role/subtitle text cycling |
| **Scroll Reveal** | Staggered section animations on scroll |
| **Counter Animation** | Number animations for statistics |
| **Scroll-to-Top** | Floating button with gradient styling |
| **Ripple Effects** | Click propagation animation on buttons |
| **Tilt & Hover** | Card elevation and glow on interaction |

## 🎬 Animation Specifications

| Animation | Duration | Effect |
|-----------|----------|--------|
| Gradient Flow | 3s | Hero name color shifting |
| Float Animation | 20-30s | Background shapes drifting |
| Light Beam | 8-10s | Animated light effects |
| Typing | 100ms per char | Dynamic text entry |
| Scroll Reveal | Staggered | Section fade-in animations |
| Skill Badge Slide | 0.3s | Hover slide animation |
| Modal Pop | 0.3s | Smooth entrance |

## 📱 Responsive Design

### Breakpoints
- **Desktop:** 1200px+ - Full feature experience
- **Tablet:** 768px-1199px - Grid adjustments, optimized spacing
- **Mobile:** 480px-767px - Single column layouts, hamburger menu
- **Small Phone:** 320px-479px - Minimal padding, compact fonts

Each breakpoint includes:
- Adjusted font sizes
- Modified grid layouts
- Touch-friendly button sizes
- Optimized spacing and padding
- Readable line-height ratios

## 🔧 Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with animations and transforms
  - CSS Grid & Flexbox for layouts
  - CSS Variables for theming
  - Keyframe animations for effects
  - Media queries for responsiveness
- **JavaScript (Vanilla)** - No frameworks or transpilers
  - DOM manipulation
  - Event handling
  - Form validation
  - Intersection Observer API for scroll animations

### Backend
- **Node.js + Express** - Web server and API framework
- **MongoDB** - NoSQL database for form submissions
- **Nodemailer** - Email service integration
- **Express Validator** - Server-side form validation
- **Helmet** - Security headers
- **Morgan** - HTTP request logging
- **CORS** - Cross-Origin Resource Sharing

### External Resources (Frontend)
- **Google Fonts** - Spline Sans & Space Mono typefaces
- **Lucide Icons** - Modern SVG icon library
- **Font Awesome** - Additional icon set
- **All CDN-based** - No local build dependencies

## 📋 File Sizes

| File | Size | Lines |
|------|------|-------|
| index.html | ~18 KB | 615 |
| style.css | ~29.7 KB | 2100+ |
| script.js | ~20.3 KB | 917 |
| **Total** | **~68 KB** | **3632** |

## 🌟 Key Features & Code Quality

## 🌟 Key Features & Code Quality

### Performance Optimizations
- Minimal CSS and JavaScript
- Lazy-loaded animations (Intersection Observer)
- Optimized media queries
- No unnecessary libraries
- Efficient DOM queries with caching
- API response caching strategies

### Best Practices
- Semantic HTML5 structure
- BEM-inspired CSS naming conventions
- Modular JavaScript with clear comments
- Mobile-first responsive design
- Accessibility considerations
- Progressive enhancement
- Server-side validation
- Input sanitization
- Rate limiting

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

### Deployment Ready ✅
- Frontend: Any static hosting (GitHub Pages, Netlify, Vercel)
- Backend: Heroku, Railway, Render, AWS, DigitalOcean
- Database: MongoDB Atlas (free tier)
- Email: Gmail or SendGrid (free tier)

## 🛠️ Customization

### Frontend Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #22D3EE 100%);
    --bg-dark: #0a0e27;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --accent: #0EA5E9;
}
```

### Frontend Content
Update content in `index.html`:
- Name and title in hero section
- About section statistics
- Skills badges
- Project cards
- Experience timeline
- Contact form

### Frontend Animation Speeds
Adjust animation durations in `style.css` and `script.js`:
- `animation-duration` properties
- `setTimeout` values in JavaScript
- `transition` properties on elements

### Backend API Configuration
Edit `backend/.env`:
```env
EMAIL_SERVICE=gmail              # Email provider
EMAIL_USER=your-email@gmail.com  # Email address
EMAIL_PASSWORD=app-password      # App password
MONGODB_URI=mongodb+...          # Database URL
ADMIN_KEY=secure-key             # Admin password
```

### Backend API URL
Update in `script.js`:
```javascript
const API_URL = 'https://your-backend-url.com';
```

---

## 📡 API Documentation

### Submit Contact Form
**Endpoint:** `POST /api/contact/submit`

**Request:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "Message content..."
}
```

**Response (201):**
```json
{
    "success": true,
    "message": "Your message has been sent successfully!",
    "submissionId": "655a1234....",
    "nextSubmissionTime": "2024-11-25T10:30:00Z"
}
```

**Error Response (400):**
```json
{
    "success": false,
    "errors": [
        {
            "msg": "Name must be between 2 and 100 characters"
        }
    ]
}
```

### Get Submissions (Admin)
**Endpoint:** `GET /api/contact/submissions`

**Headers:**
```
x-admin-key: your-secure-admin-key
```

**Response:**
```json
{
    "success": true,
    "count": 5,
    "submissions": [
        {
            "_id": "655a1234....",
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Hello",
            "message": "Message...",
            "status": "received",
            "createdAt": "2024-11-25T10:00:00Z"
        }
    ]
}
```

### Update Submission Status (Admin)
**Endpoint:** `PATCH /api/contact/submissions/:id`

**Headers:**
```
x-admin-key: your-secure-admin-key
```

**Request:**
```json
{
    "status": "read"
}
```

### Health Check
**Endpoint:** `GET /api/health` or `GET /api/contact/health`

**Response:**
```json
{
    "status": "OK",
    "message": "Server is running",
    "timestamp": "2024-11-25T10:00:00Z"
}
```

---

## 🚀 Backend Setup & Deployment

### Quick Local Setup (5 Minutes)
See [Quick Start Guide](backend/QUICK_START.md)

### Full Production Deployment
See [Complete Setup Guide](backend/SETUP_GUIDE.md)

### Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-url
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=app-password
git push heroku main
```

### Deploy to Railway/Render
1. Connect GitHub repository
2. Set environment variables
3. Auto-deploy on git push



## 📚 Documentation Files

### Frontend
- **README.md** (this file) - Complete project documentation
- **PORTFOLIO_SUMMARY.md** - Detailed feature breakdown
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **EXPERIENCE_EDUCATION_REDESIGN.md** - Section-specific design
- **QUICK_VISUAL_REFERENCE.md** - Visual design specifications

### Backend
- **backend/QUICK_START.md** - 5-minute setup guide for local development
- **backend/SETUP_GUIDE.md** - Complete setup and deployment guide
- **backend/.env.example** - Environment variables template

---

## 🤝 Contributing & Customization

### For GitHub Pages Deployment
```bash
# Update repository URL
git remote set-url origin https://github.com/username/portfolio.git

# Deploy frontend to GitHub Pages
git push origin main
```

Then enable GitHub Pages in repository settings.

### For Backend Deployment on Heroku
```bash
heroku create your-portfolio-api
cd backend
git push heroku main
```

### Full Stack Deployment
1. **Frontend**: Deploy HTML/CSS/JS to GitHub Pages or Netlify
2. **Backend**: Deploy Express app to Heroku or Railway
3. **Database**: Use MongoDB Atlas (free tier)
4. **Email**: Use Gmail with App Password or SendGrid

---

## 📄 License

This portfolio is personal work. Feel free to use it as inspiration for your own portfolio, but create your own version.

---

## 📞 Contact

For inquiries or collaboration opportunities:
- **Email:** manojadepu1720@gmail.com
- **Phone:** +91 7780215390
- **LinkedIn:** [linkedin.com/in/manoj-adepu-4a32a2206](https://www.linkedin.com/in/manoj-adepu-4a32a2206)
- **GitHub:** [github.com/manoj-adepu](https://github.com)

---

## 🎯 Project Status

✅ **Frontend:** Complete with animations and responsive design  
✅ **Backend:** Production-ready with MongoDB and email integration  
✅ **Deployment:** Ready for production (Frontend + Backend)  
✅ **Documentation:** Comprehensive setup guides

**Latest Update:** February 2026

---

**Deployment Ready** ✅ - This full-stack portfolio can be deployed immediately with minimal configuration.

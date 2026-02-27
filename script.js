/* ============================================
   ADEPU MANOJ PORTFOLIO - JAVASCRIPT
   Interactive Features and Animations
   ============================================ */

// ============ DOM Elements ============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.glass-form');
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');

// ============ Typing Animation ============
/**
 * Creates a typing animation effect for the hero subtitle
 */
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const textArray = [
        'Web Developer',
        'AI Enthusiast',
        'Full-Stack Developer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Deleting characters
            charIndex--;
            typingText.textContent = currentText.substring(0, charIndex);
        } else {
            // Adding characters
            charIndex++;
            typingText.textContent = currentText.substring(0, charIndex);
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Finished typing, wait before deleting
            isDeleting = true;
            setTimeout(type, delayBetweenWords);
            return;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 500);
            return;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    type();
}

// ============ Hamburger Menu Toggle ============
/**
 * Toggles the mobile navigation menu and hamburger animation
 */
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// ============ Close Menu on Link Click ============
/**
 * Closes the mobile menu when a navigation link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============ Smooth Scrolling for Navigation ============
/**
 * Adds smooth scrolling behavior to navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== 'javascript:void(0);') {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============ Scroll Reveal Animation ============
/**
 * Reveals elements with animation as they come into view during scrolling
 */
function observeScrollElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
                
                // Add animation delay for staggered effect
                const children = entry.target.querySelectorAll('.skill-badge, .project-card, .experience-card, .achievement-card, .stat-item');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections that need scroll reveal
    document.querySelectorAll('.about, .skills, .projects, .experience, .contact').forEach(section => {
        observer.observe(section);
    });
}

// ============ Certification Card Backgrounds ============
/**
 * Loads certification images by trying common file extensions
 */
function initCertificationBackgrounds() {
    const certCards = document.querySelectorAll('.achievement-card-extended[data-cert-image]');
    const extensions = ['jpg', 'jpeg', 'png', 'webp'];

    certCards.forEach(card => {
        const baseName = card.dataset.certImage;
        if (!baseName) {
            return;
        }

        const tryLoad = (index) => {
            if (index >= extensions.length) {
                return;
            }

            const ext = extensions[index];
            const url = `assets/certifications/${baseName}.${ext}`;
            const img = new Image();

            img.onload = () => {
                card.style.setProperty('--cert-bg', `url("${url}")`);
                card.classList.add('has-cert-bg');
            };

            img.onerror = () => tryLoad(index + 1);
            img.src = url;
        };

        tryLoad(0);
    });
}

// ============ Modal Functionality ============
/**
 * Opens a modal with project details
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes a specific modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ============ Modal Event Listeners ============
/**
 * Open modal when project card is clicked
 */
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        openModal(modalId);
    });
});

/**
 * Close modals with close button
 */
closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        closeModal(this.closest('.modal'));
    });
});

/**
 * Close modal when clicking outside of modal content
 */
window.addEventListener('click', function(event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

/**
 * Close modal with Escape key
 */
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                closeModal(modal);
            }
        });
    }
});

// ============ API Configuration ============
/**
 * API endpoint for contact form
 * Change this to your deployed backend URL in production
 */
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://your-deployed-backend-url.com';
const CONTACT_API = `${API_URL}/api/contact/send`;

// ============ Contact Form Submission ============
/**
 * Handles contact form submission with API integration
 */
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📝 Form submitted');

        // Get form elements
        const submitBtn = this.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById('formStatus');
        const originalBtnText = submitBtn.textContent;
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        if (statusDiv) statusDiv.innerHTML = '';

        try {
            // Get form data using FormData API (professional approach)
            const formData = new FormData(this);
            const data = {
                name: formData.get('name')?.trim(),
                email: formData.get('email')?.trim(),
                message: formData.get('message')?.trim()
            };

            console.log('📤 Form data:', { name: data.name, email: data.email, message: data.message.substring(0, 50) + '...' });

            // Client-side validation
            if (!data.name || !data.email || !data.message) {
                const error = 'Please fill in all fields';
                console.warn('⚠️ ' + error);
                showNotification(error, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            // Validate name length
            if (data.name.length < 2 || data.name.length > 100) {
                const error = 'Name must be between 2 and 100 characters';
                console.warn('⚠️ ' + error);
                showNotification(error, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const error = 'Please enter a valid email address';
                console.warn('⚠️ ' + error);
                showNotification(error, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            // Validate message length
            if (data.message.length < 10 || data.message.length > 5000) {
                const error = 'Message must be between 10 and 5000 characters';
                console.warn('⚠️ ' + error);
                showNotification(error, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            // Show loading state
            if (statusDiv) {
                statusDiv.innerHTML = '<span style="color: #60a5fa;">⏳ Sending your message...</span>';
            }

            console.log('🔗 Sending to:', CONTACT_API);

            // Send to API with proper error handling
            const response = await fetch(CONTACT_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            console.log('📊 Response status:', response.status);

            const result = await response.json();
            console.log('✅ Response:', result);

            if (!response.ok) {
                throw new Error(result.error || result.message || `Server error: ${response.status}`);
            }

            // Show success message
            const successMessage = result.message || 'Message sent successfully! I\'ll get back to you soon.';
            console.log('✅ ' + successMessage);
            showNotification(successMessage, 'success');

            if (statusDiv) {
                statusDiv.innerHTML = '<span style="color: #22c55e;">✅ ' + successMessage + '</span>';
            }

            // Reset form
            this.reset();
            const charCount = document.getElementById('charCount');
            if (charCount) charCount.textContent = '0';

            // Clear status after 5 seconds
            setTimeout(() => {
                if (statusDiv) statusDiv.innerHTML = '';
            }, 5000);

            // Scroll to top
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);

        } catch (error) {
            console.error('❌ Error sending message:', error.message);
            
            // Determine error message
            let errorMessage = 'Failed to send message. Please try again.';
            
            if (error.message.includes('Failed to fetch')) {
                errorMessage = '❌ Connection error. Make sure the backend server is running on http://localhost:5000';
            } else if (error.message.includes('You can only submit')) {
                errorMessage = '⏱️ You can only submit one message per hour. Please try again later.';
            } else if (error.message.includes('Server error')) {
                errorMessage = '❌ Server error. Please try again later.';
            } else {
                errorMessage = '❌ ' + error.message;
            }
            
            console.warn(errorMessage);
            showNotification(errorMessage, 'error');
            if (statusDiv) {
                statusDiv.innerHTML = '<span style="color: #ef4444;">' + errorMessage + '</span>';
            }

        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // Character count for message field
    const messageField = document.getElementById('formMessage');
    if (messageField) {
        messageField.addEventListener('input', function() {
            const charCount = document.getElementById('charCount');
            if (charCount) {
                const count = this.value.length;
                charCount.textContent = Math.min(count, 500);
            }
        });
    }
}

// ============ Notification System ============
/**
 * Shows a temporary notification message
 * @param {string} message - The message to display
 * @param {string} type - The notification type ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : 'rgba(14, 165, 233, 0.9)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============ Download Resume Function ============
/**
 * Generates and downloads a resume PDF or text file
 */
function downloadResume() {
    // Create resume content
    const resumeContent = `
ADEPU MANOJ
=====================================
IT Engineering Student | Web Developer | AI Enthusiast

CONTACT INFORMATION
-------------------------------------
Phone: +91 7780215390
Email: manojadepu1720@gmail.com
LinkedIn: https://www.linkedin.com/in/manoj-adepu-4a32a2206

EDUCATION
-------------------------------------
B.Tech in Information Technology
TKR College of Engineering and Technology (2023–2027)
CGPA: 7.35

Intermediate (MPC)
Sri Chaitanya Junior College (2021–2023)
Percentage: 89%

SSC
Paramita Learners Foundation (2020–2021)
CGPA: 10

PROFESSIONAL EXPERIENCE
-------------------------------------
Web Development Intern
EY Global Delivery Services & AICTE (Dec 2024 – Jan 2025)
- Built full-stack web applications using MERN stack
- Developed scalable and responsive web applications
- Collaborated with team members on project development
- Implemented modern UI/UX designs
- Tested and debugged applications for production deployment

PROJECTS
-------------------------------------
1. EDUMANAGE PRO (Sept 2025)
   - Automated student attendance using QR codes, geolocation, and face recognition
   - Ensures zero proxy attendance
   - Technologies: Python, Face Recognition API, Geolocation Services

2. ECHOVERSE (Aug 2025)
   - Web app that converts text into audiobooks
   - Used IBM Granite AI model via Hugging Face
   - Frontend: ReactJS
   - Backend: Python (Django/Flask), SQL

TECHNICAL SKILLS
-------------------------------------
Programming Languages: Java, JavaScript, SQL
Databases: MongoDB, MySQL, OracleDB
Frameworks & Libraries: ReactJS, NodeJS, ExpressJS
Specializations: Artificial Intelligence, Machine Learning, Full-Stack Development
Soft Skills: Leadership, Communication, Problem-solving, Team Collaboration

CERTIFICATIONS
-------------------------------------
- Salesforce Certified Agentforce Specialist (Dec 2025)
- Introduction to Generative AI (IBM SkillsBuild, Aug 2025)
- Artificial Intelligence (Accenture, Dec 2025)
- AI for Business Professionals (HP LIFE, Dec 2025)

=====================================
Generated: ${new Date().toLocaleDateString()}
    `;

    // Create blob and download link
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Adepu_Manoj_Resume.txt';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    showNotification('Resume downloaded successfully!', 'success');
}

// ============ Scroll to Top Button ============
/**
 * Adds a scroll-to-top button functionality
 */
function initScrollToTop() {
    // Check if scroll-to-top button exists, if not create it
    let scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = 'scrollToTopBtn';
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #6366F1, #0EA5E9, #22D3EE);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            display: none;
            z-index: 999;
            box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
            transition: all 0.3s ease;
            font-size: 1.5rem;
            font-weight: bold;
        `;
        document.body.appendChild(scrollToTopBtn);
    }

    // Show button when scrolled down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
            scrollToTopBtn.style.alignItems = 'center';
            scrollToTopBtn.style.justifyContent = 'center';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on button click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ============ Active Navigation Link ============
/**
 * Highlights the active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============ Progress Bar Animation ============
/**
 * Animates progress bars when they come into view
 * Note: New design uses skill badges instead of progress bars
 */
function animateProgressBars() {
    // Progress bars removed from new futuristic design
    // Keeping function for compatibility
}

// ============ Navbar Background on Scroll ============
/**
 * Adds background to navbar when scrolled down
 */
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.85)';
            navbar.style.boxShadow = '0 5px 30px rgba(14, 165, 233, 0.15)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ============ Counter Animation ============
/**
 * Animates number counters in the About section
 */
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const finalValue = parseInt(entry.target.textContent);
                const increment = finalValue / 30;
                let currentValue = 0;

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        entry.target.textContent = finalValue + '+';
                        entry.target.classList.add('animated');
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = Math.floor(currentValue) + '+';
                    }
                }, 50);

                observer.unobserve(entry.target);
            }
        });
    }, options);

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// ============ Initialization Function ============
/**
 * Initializes all interactive features and animations
 */
function initializePortfolio() {
    console.log('Portfolio loaded successfully!');
    
    // Initialize features
    initTypingAnimation();
    observeScrollElements();
    animateProgressBars();
    updateActiveNavLink();
    initScrollToTop();
    updateNavbarBackground();
    animateCounters();
    initCertificationBackgrounds();

    // Add CSS animation for fadeOut
    if (!document.getElementById('fadeOutStyle')) {
        const style = document.createElement('style');
        style.id = 'fadeOutStyle';
        style.textContent = `
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            .nav-link.active {
                color: var(--glow-color, #0EA5E9);
            }
        `;
        document.head.appendChild(style);
    }
}

// ============ Event Listeners ============

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Handle window resize for responsive features
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized - Portfolio responsive features updated');
    }, 250);
});

// ============ Performance Optimization ============
/**
 * Throttle function for optimized scroll and resize events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============ Browser Compatibility ============
/**
 * Add polyfills for older browsers if needed
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 16);
    };
}

// ============ Error Handling ============
/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// ============ Console Welcome Message ============// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applytheme(savedTheme);
    
    // Theme toggle click handler
    themeToggle?.addEventListener('click', () => {
        const currentTheme = htmlElement.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applytheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Keyboard shortcut: Ctrl+Shift+T for theme toggle
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggle?.click();
        }
    });
    
    // Respect system preference on first visit
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applytheme(prefersDark ? 'dark' : 'light');
    }
}

function applytheme(theme) {
    const htmlElement = document.documentElement;
    if (theme === 'light') {
        htmlElement.classList.add('light-theme');
    } else {
        htmlElement.classList.remove('light-theme');
    }
}

// ============================================
// ENHANCED CONTACT FORM VALIDATION
// ============================================
function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const messageInput = document.getElementById('formMessage');
    const charCount = document.getElementById('charCount');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');
    
    // Character counter
    messageInput?.addEventListener('input', () => {
        const count = messageInput.value.length;
        if (charCount) {
            charCount.textContent = count;
        }
        if (count > 500) {
            messageInput.value = messageInput.value.substring(0, 500);
            charCount.textContent = '500';
        }
    });
    
    // Real-time validation
    nameInput?.addEventListener('blur', () => {
        validateField(nameInput, nameError, 'Please enter a valid name (at least 2 characters)');
    });
    
    emailInput?.addEventListener('blur', () => {
        validateField(emailInput, emailError, 'Please enter a valid email address');
    });
    
    messageInput?.addEventListener('blur', () => {
        validateField(messageInput, messageError, 'Please enter your message (at least 10 characters)');
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, nameError, 'Please enter a valid name (at least 2 characters)');
        const isEmailValid = validateField(emailInput, emailError, 'Please enter a valid email address');
        const isMessageValid = validateField(messageInput, messageError, 'Please enter your message (at least 10 characters)');
        
        if (isNameValid && isEmailValid && isMessageValid) {
            formStatus.classList.add('show', 'success');
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            form.reset();
            charCount.textContent = '0';
            
            // Simulate form submission
            console.log({
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            
            // Reset form status after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('show', 'success');
            }, 5000);
        } else {
            formStatus.classList.add('show', 'error');
            formStatus.textContent = '✗ Please fix the errors above and try again.';
            setTimeout(() => {
                formStatus.classList.remove('show', 'error');
            }, 5000);
        }
    });
}

function validateField(field, errorElement, errorMessage) {
    const value = field.value.trim();
    let isValid = false;
    
    if (field.type === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (field.tagName === 'TEXTAREA') {
        isValid = value.length >= 10;
    } else {
        isValid = value.length >= 2;
    }
    
    if (!isValid) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        field.classList.add('error');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.classList.remove('error');
    }
    
    return isValid;
}

// ============================================
// 3D BLOG CARD ANIMATIONS
// ============================================
function initBlogCardAnimations() {
    const blogCards = document.querySelectorAll('[data-3d]');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// ============================================
// ACCESSIBILITY KEYBOARD NAVIGATION
// ============================================
function initAccessibilityFeatures() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #0EA5E9;
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 0 0 4px 0;
        z-index: 1000;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main content
    let main = document.querySelector('main');
    if (!main) {
        main = document.querySelector('.container-main') || document.body;
        main.id = 'main';
    }
    
    // Keyboard navigation for hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    hamburger?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initContactFormValidation();
    initBlogCardAnimations();
    initAccessibilityFeatures();
});
console.log(
    '%c Welcome to Adepu Manoj\'s Futuristic Portfolio! %c',
    'background: linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #22D3EE 100%); color: white; font-size: 14px; padding: 10px 20px; border-radius: 50px; font-weight: bold;',
    ''
);
console.log(
    '%c Built with HTML5, CSS3, and Vanilla JavaScript %c',
    'color: #0EA5E9; font-size: 12px; font-weight: bold;',
    ''
);
console.log('Contact: manojadepu1720@gmail.com | Phone: +91 7780215390');

const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/config');

// Create transporter (if email not configured, it will fail gracefully)
let transporter;
try {
    transporter = nodemailer.createTransport({
        service: emailConfig.service,
        auth: {
            user: emailConfig.user,
            pass: emailConfig.password
        }
    });
} catch (error) {
    console.log('⚠️  Email service not configured');
    transporter = null;
}

/**
 * Send email to portfolio owner and confirmation to sender
 * @param {Object} contactData - { name, email, message }
 * @returns {Promise}
 */
const sendContactEmail = async (contactData) => {
    try {
        const { name, email, message } = contactData;
        const timestamp = new Date().toLocaleString();

        // Check if email is configured
        if (!transporter || !emailConfig.user || !emailConfig.password) {
            console.log('⚠️  Email not configured - skipping email send');
            console.log('💡 To enable emails, add EMAIL_USER and EMAIL_PASSWORD to .env file');
            return { 
                success: true, 
                message: 'Email service not configured' 
            };
        }

        // Email to portfolio owner
        const ownerEmail = {
            from: emailConfig.from,
            to: emailConfig.user,
            subject: `New Portfolio Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #22D3EE 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">📨 New Message from Your Portfolio</h2>
                    </div>
                    <div style="backgroundColor: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px;">
                        <p><strong>From:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p><strong>Message:</strong></p>
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0EA5E9;">
                            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                        </div>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px;">
                            ⏰ Received on: ${timestamp}
                        </p>
                    </div>
                </div>
            `
        };

        // Confirmation email to sender
        const confirmationEmail = {
            from: emailConfig.from,
            to: email,
            subject: '✅ Message Received - Adepu Manoj Portfolio',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #22D3EE 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">Thank You for Reaching Out! 🙏</h2>
                    </div>
                    <div style="backgroundColor: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px;">
                        <p>Hi ${name},</p>
                        <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.</p>
                        <p><strong>Message Details:</strong></p>
                        <ul style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0EA5E9;">
                            <li><strong>Received on:</strong> ${timestamp}</li>
                            <li><strong>Status:</strong> ✅ Successfully received</li>
                        </ul>
                        <p>I typically respond to inquiries within 24-48 hours.</p>
                        <p style="margin-top: 30px;">Best regards,<br><strong>Adepu Manoj</strong><br>Full Stack Developer & AI Enthusiast</p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px; text-align: center;">
                            This is an automated confirmation email. Please do not reply to this email.
                        </p>
                    </div>
                </div>
            `
        };

        // Send both emails
        console.log(`📧 Sending email to portfolio owner...`);
        await transporter.sendMail(ownerEmail);
        
        console.log(`📧 Sending confirmation email to ${email}...`);
        await transporter.sendMail(confirmationEmail);

        console.log(`✅ Both emails sent successfully`);
        return { 
            success: true, 
            message: 'Emails sent successfully' 
        };
    } catch (error) {
        console.error('❌ Email sending error:', error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

/**
 * Verify email configuration
 * @returns {Promise}
 */
const verifyEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email service verified and ready to send messages');
        return true;
    } catch (error) {
        console.error('❌ Email service verification failed:', error.message);
        return false;
    }
};

module.exports = {
    sendContactEmail,
    verifyEmailConfig,
    transporter
};

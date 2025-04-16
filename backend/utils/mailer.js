

// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});


const baseEmailTemplate = (content, options = {}) => {
  const logoUrl = options.logoUrl || 'hhttps://i.ibb.co/tTnsBPXz/TechHike.png'; // Replace with your actual logo URL
  const primaryColor = options.primaryColor || '#2563eb'; // Blue as default brand color
  const secondaryColor = options.secondaryColor || '#1e40af'; // Darker blue
  
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${options.subject || 'Email from Tech Hike'}</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #f9fafb;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #e5e7eb;
      }
      .logo {
        max-height: 50px;
      }
      .content {
        padding: 30px 20px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #6b7280;
        border-top: 1px solid #e5e7eb;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: ${primaryColor};
        color: white !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        margin: 15px 0;
      }
      .button:hover {
        background-color: ${secondaryColor};
      }
      h1 {
        color: ${primaryColor};
        font-size: 24px;
        margin-top: 0;
      }
      .highlight-box {
        background-color: #f8fafc;
        border-left: 4px solid ${primaryColor};
        padding: 15px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="${logoUrl}" alt="Tech Hike Logo" class="logo"> 
      </div>
      
      <div class="content">
        ${content}
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} Tech Hike. All rights reserved.</p>
        <p>If you have any questions, please contact our support team.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

const sendMail = async ({ to, subject, text, html, logoUrl }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Tech Hike" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: baseEmailTemplate(html, { subject, logoUrl }),
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


const sendWelcomeEmail = (to, name, logoUrl) => {
  const content = `
    <h1>Welcome to Tech Hike, ${name}!</h1>
    <p>We're thrilled to have you join our community. At Tech Hike, we're committed to providing you with exceptional service and support.</p>
    
    <div class="highlight-box">
      <p>Here's what you can do next:</p>
      <ul>
        <li>Complete your profile setup</li>
        <li>Explore our services</li>
        <li>Contact our support team if you have questions</li>
      </ul>
    </div>
    
    <p>We're here to help you every step of the way.</p>
    <p><strong>The Tech Hike Team</strong></p>
  `;
  
  return sendMail({
    to,
    subject: `Welcome to Tech Hike, ${name}!`,
    text: `Hi ${name},\n\nWelcome to Tech Hike! We're thrilled to have you.\n\nRegards,\nTech Hike Team`,
    html: content,
    logoUrl
  });
};

// 2. Project Completion Email
const sendProjectCompletionEmail = (to, name, projectName, logoUrl) => {
  const content = `
    <h1>🎉 Project Completed Successfully!</h1>
    <p>Hi ${name},</p>
    <p>We're excited to inform you that your project <strong>"${projectName}"</strong> has been completed successfully.</p>
    
    <div class="highlight-box">
      <p>Project Details:</p>
      <ul>
        <li><strong>Project Name:</strong> ${projectName}</li>
        <li><strong>Status:</strong> Completed</li>
      </ul>
    </div>
    
    <p>We appreciate your trust in our services. If you need any further assistance or have questions, don't hesitate to reach out.</p>
    <p><strong>Best regards,</strong><br>The Tech Hike Team</p>
  `;
  
  return sendMail({
    to,
    subject: `🎉 Project "${projectName}" Completed`,
    text: `Hi ${name},\n\nYour project "${projectName}" has been completed successfully.\n\nThank you,\nTech Hike`,
    html: content,
    logoUrl
  });
};

// 3. Payment Confirmation Email
const sendPaymentConfirmationEmail = (to, name, amount, invoiceId, logoUrl) => {
  const content = `
    <h1>💰 Payment Received</h1>
    <p>Hi ${name},</p>
    <p>We've successfully received your payment. Thank you for your business!</p>
    
    <div class="highlight-box">
      <p>Payment Details:</p>
      <ul>
        <li><strong>Amount:</strong> ₹${amount}</li>
        <li><strong>Invoice ID:</strong> #${invoiceId}</li>
        <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
      </ul>
    </div>
    
    <p>Your invoice is now marked as paid. You can download your receipt from your account dashboard.</p>
    <p><strong>Thank you for choosing Tech Hike!</strong></p>
  `;
  
  return sendMail({
    to,
    subject: `💰 Payment Received - Invoice #${invoiceId}`,
    text: `Hi ${name},\n\nWe've received your payment of ₹${amount} for Invoice #${invoiceId}.\n\nThanks for your business!\nTech Hike`,
    html: content,
    logoUrl
  });
};

// 4. Project Request Approval Email
const sendProjectApprovalEmail = (to, name, projectName, learnMoreLink, logoUrl) => {
  const content = `
    <h1>✅ Project Request Approved</h1>
    <p>Hi ${name},</p>
    <p>Congratulations! Your project request <strong>"${projectName}"</strong> has been approved.</p>
    
    <div class="highlight-box">
      <p>Next Steps:</p>
      <ol>
        <li>Review the project details</li>
        <li>Complete any remaining requirements</li>
        <li>Our team will contact you shortly</li>
      </ol>
    </div>
    
    <a href="${learnMoreLink}" class="button">View Project Details</a>
    
    <p>We're excited to work with you on this project!</p>
    <p><strong>The Tech Hike Team</strong></p>
  `;
  
  return sendMail({
    to,
    subject: `✅ Project Request Approved: ${projectName}`,
    text: `Hi ${name},\n\nCongratulations! Your project request "${projectName}" has been approved.\n\nLearn more: ${learnMoreLink}\n\nRegards,\nTech Hike`,
    html: content,
    logoUrl
  });
};

// 5. Assistance Request Approval Email
const sendAssistanceApprovalEmail = (to, name, assistanceTitle, learnMoreLink, logoUrl) => {
  const content = `
    <h1>🤝 Assistance Request Approved</h1>
    <p>Hi ${name},</p>
    <p>Great news! Your request for <strong>"${assistanceTitle}"</strong> has been approved.</p>
    
    <div class="highlight-box">
      <p>What happens next?</p>
      <ul>
        <li>Our specialist will contact you within 24 hours</li>
        <li>Prepare any necessary materials</li>
        <li>Be ready to discuss your requirements</li>
      </ul>
    </div>
    
    <a href="${learnMoreLink}" class="button">View Request Details</a>
    
    <p>We're looking forward to assisting you!</p>
    <p><strong>Best regards,</strong><br>The Tech Hike Team</p>
  `;
  
  return sendMail({
    to,
    subject: `🤝 Assistance Approved: ${assistanceTitle}`,
    text: `Hi ${name},\n\nGreat news! Your request for "${assistanceTitle}" has been approved.\n\nLearn more: ${learnMoreLink}\n\nRegards,\nTech Hike`,
    html: content,
    logoUrl
  });
};

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendProjectCompletionEmail,
  sendPaymentConfirmationEmail,
  sendProjectApprovalEmail,
  sendAssistanceApprovalEmail,
  baseEmailTemplate
};
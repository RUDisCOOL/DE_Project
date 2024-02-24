const nodemailer = require('nodemailer');

async function sendEmail(email, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail'
        auth: {
            user: 'scantextify@gmail.com',
            pass: '!@#$%^&*()asdf'
        }
    });

    let info = await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: 'scantextify@gmail.com', // Change to your email address
        subject: 'New Message from Contact Form',
        text: `Email: ${email}\nMessage: ${message}`
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;

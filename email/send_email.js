const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config()

async function sendEmail(email, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_USER,
            pass: process.env.SENDER_PASS
        }
    });

    const formatted_mail = {
        from: process.env.SENDER_USER,
        to: 'superrudra1601@gmail.com', // Change to your email address
        subject: 'Message form the website user',
        text: `
        message form website user whoes mail is ${email}

        ${message}
        `,
    };

    try{
        await transporter.sendMail(formatted_mail);
    }catch(err){
        console.log(err);
    }
}
module.exports = sendEmail;

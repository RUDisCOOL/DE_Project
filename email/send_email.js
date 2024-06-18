const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const Queue = require('./asyncqueue')
dotenv.config()

const queue = new Queue;

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
        to: 'vvibhavv3434@gmail.com', // Change to your email address
        subject: 'Message from the user',
        text: `User's e-mail id: ${email}\nMessage: '${message}'`,
    };

    try {
        await transporter.sendMail(formatted_mail);
    } catch (err) {
        console.log(err);
    }
}
async function addtoqueue(email, message){
    queue.add(() => sendEmail(email, message))
}

module.exports = addtoqueue;

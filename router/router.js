const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('../views/sendEmail'); // Path to your sendEmail.js file

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send-email', (req, res) => {
    const { email, message } = req.body;

    sendEmail(email, message)
        .then(() => res.send('Email sent successfully'))
        .catch(err => {
            console.error('Error sending email:', err);
            res.status(500).send('Failed to send email');
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

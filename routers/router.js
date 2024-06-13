const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sendEmail = require('../views/sendEmail'); // Path to your sendEmail.js file


router.get('/', (req, res) => {
	res.render('index', { data: '' });
});

router.get('/login', (req, res) => {
	console.log('Request for login page recieved');
	res.render('login', { error: '' });
});

router.get('/signup', (req, res) => {
	console.log('Request for signup page recieved');
	res.render('signup', { error: '' });
});

module.exports = router;


////this is not complete...the email form's backend needs to be configured.
//// goto views/sendEmail.js



// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/send-email', (req, res) => {
//     const { email, message } = req.body;

//     sendEmail(email, message)
//         .then(() => res.send('Email sent successfully'))
//         .catch(err => {
//             console.error('Error sending email:', err);
//             res.status(500).send('Failed to send email');
//         });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

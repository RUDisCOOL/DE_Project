const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
	if (req.session.is_auth) {
		const UserName = req.session.UserName;
        const email = req.session.email;
		res.render('index', { UserName: UserName, email: email });
	} else {
		res.render('index', { UserName: '' });
	}
});

router.get('/login', (req, res) => {
	console.log('Request for login page recieved');
	res.render('login');
});

router.get('/signup', (req, res) => {
	console.log('Request for signup page recieved');
	res.render('signup');
});

module.exports = router;

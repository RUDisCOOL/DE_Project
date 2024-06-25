const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
	const is_auth = req.session.is_auth;
	if (req.session.is_auth) {
		const UserName = req.session.UserName;
		const email = req.session.email;
		res.render('index', { userName: UserName, email: email, isAuth: is_auth });
	} else {
		res.render('index', { isAuth: is_auth });
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

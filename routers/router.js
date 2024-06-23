const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.get('/', (req, res) => {
    if (req.session.is_auth) {
        const UserName = req.session.UserName;
        console.log(UserName);
        res.render('index', { UserName: UserName });
    } else {
        res.render('index', { UserName: '' });
    }
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

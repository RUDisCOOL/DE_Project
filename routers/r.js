const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Request for index recieved');
    res.render('index', { data: '' });
});

router.get('/login', (req, res) => {
    console.log('Request for login page recieved');
    res.render('login'); 
});

module.exports = router;

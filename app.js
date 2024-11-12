// APP
const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const connectPgSimple = require('connect-pg-simple')(session);
const app = express();
const multer = require('multer');
const routers = require('./routers/router');
const { createWorker } = require('tesseract.js');
const dbconnect = require('./database/db');
const sendEmail = require('./email/send_email');

(async () => {
	await dbconnect.create_table();
})();

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

const sessionStore = new connectPgSimple({
    pool: pool, 
    tableName: 'session',
    createTableIfMissing: true
});

app.use('/public', express.static('./public'));

async function getTextFromImage(data) {
	const worker = await createWorker('eng', 1, {
		logger: (m) => console.log('PROGRESS: ' + m['progress'] * 100 + '%'),
	});
	const {
		data: { text },
	} = await worker.recognize(data);
	await worker.terminate();
	return text;
}

const upload = multer({ storage: multer.memoryStorage() }).single('xyz');

app.set('view engine', 'ejs');

app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
	})
);

app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

app.post('/sendForSignup', async (req, res) => {
	let signup_Data = req.body;
	try {
		let result = await dbconnect.add_data_for_signup(signup_Data);
		let email = await dbconnect.togetmail(signup_Data.username_signup);
		console.log(result);
		req.session.email = email;
		req.session.UserName = signup_Data.username_signup;
		req.session.is_auth = true;
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.json({ success: false, error: error });
	}
});

app.post('/sendForLogin', async (req, res) => {
	let login_Data = req.body;
	try {
		let result = await dbconnect.add_data_for_login(login_Data);
		let email = await dbconnect.togetmail(login_Data.username_login);
		console.log(result);
		req.session.email = email;
		req.session.UserName = login_Data.username_login;
		req.session.is_auth = true;
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.json({ success: false, error: error });
	}
});

app.post('/logout', (req, res) => {
	if (req.session.is_auth) {
		req.session.is_auth = false;
		res.json({ success: true });
		console.log('Logged out Successfully!!!');
	} else {
		res.json({ success: false });
	}
});

app.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).send('File upload failed.');
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        try {
            const imageBuffer = req.file.buffer;
            let text = await getTextFromImage(imageBuffer);
            text = text.replace(/\n/g, '&#13;&#10;');
            res.send(text);
        } catch (error) {
            console.error('Processing error:', error);
            res.status(500).send('Failed to process the image.');
        }
    })
})

app.post('/send-email', async (req, res) => {
	const message = req.body;
	try {
		await sendEmail(message.email, message.message);
		res.json({ success: true });
	} catch (err) {
		console.log(err);
		res.json({ success: false });
	}
});

const PORT = 5500;
app.listen(PORT, () => console.log(`Hey I am running on port ${PORT}`));

// APP
const express = require('express');
const session =  require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { engine } = require('express/lib/application');
const res = require('express/lib/response');
const app = express();
const fs = require('fs');
const multer = require('multer');
const { resolve } = require('path');
const routers = require('./routers/router');
const { createWorker } = require('tesseract.js');
const { throws } = require('assert');
const dbconnect = require('./database/db');
const { error } = require('console');
const sendEmail = require('./email/send_email');

(async () => {
	await dbconnect.create_table();
})();

const connection = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}

const session_store = new MySQLStore(connection);
session_store.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage }).single('xyz');

app.set('view engine', 'ejs');

app.use(session({
    secret: "key for login",
    resave: false,
    saveUninitialized: false,
    store: session_store,
}))

app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

app.post('/sendForSignup', async (req, res) => {
	let signup_Data = req.body;
	try {
		let result = await dbconnect.add_data_for_signup(signup_Data);
		console.log(result);
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
		console.log(result);
        req.session.UserName = login_Data.username_login;
        req.session.is_auth = true;
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.json({ success: false, error: error });
	}
});

app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		fs.readFile(`./uploads/${req.file.originalname}`, async (err, data) => {
			if (err) return console.log('This is your error: ', err);
			text = await getTextFromImage(data);
			text = text.replace(/\n/g, '&#13;&#10;');
			res.send(text);
		});
	});
});

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

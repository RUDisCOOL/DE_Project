// APP
const express = require('express');
const { engine } = require('express/lib/application');
const res = require('express/lib/response');
const app = express();
const fs = require('fs');
const multer = require('multer');
const { resolve } = require('path');
const routers = require('./routers/r');
const { createWorker } = require('tesseract.js');
const { throws } = require('assert');
const dbconnect = require('./database/db');

const conn = dbconnect.query(" CREATE TABLE IF NOT EXISTS authentication(user_id CHAR(10),user_email CHAR(30),user_password CHAR(10),PRIMARY KEY(user_id));");
conn

function datatosql(data) {
    let sql = `INSERT INTO authentication(user_id,user_email,user_password) VALUES('${data.username}','${data.email}','${data.password}');`;
    dbconnect.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

function adddata(formData) {
    let data = new Promise(() => {
        datatosql(formData);
    })
    return data
}

app.use('/public', express.static('./public'));

async function getTextFromImage(data) {
	const worker = await createWorker('eng', 1, {
		logger: (m) => console.log('PROGRESS: ' + m['progress'] * 100 + '%'),
	});
	const {
		data: { text },
	} = await worker.recognize(data);
	// console.log(text);
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
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

app.post('/sendToServer', (req, res) => {
    let formData = req.body;
    async function insertData() {
        let conn = await adddata(formData);
        console.log(conn);
    }
    insertData();
    res.send('data inserted');
})


app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		fs.readFile(`./uploads/${req.file.originalname}`, async (err, data) => {
			if (err) return console.log('This is your error: ', err);
			const text = await getTextFromImage(data);
			res.render('index', { data: text });
			// res.send(text);
		});
	});
});
//Start the server
const PORT = 5500 || process.env.PORT;
app.listen(PORT, () => console.log(`Hey I am running on port ${PORT}`));

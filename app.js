// const dropArea = document.getElementById('drag-area');
// const inputFile = document.getElementById('input-file');
// const imageView = document.getElementById('image-view');

// inputFile.addEventListener('change', uploadImage);

// function uploadImage() {
// 	let imgLink = URL.createObjectURL(inputFile.files[0]);
// 	imageView.style.backgroundImage = `url(${imgLink})`;
// 	imageView.textContent = '';
// }

// APP
const express = require('express');
const { engine } = require('express/lib/application');
const res = require('express/lib/response');
const app = express();
const fs = require('fs');
const multer = require('multer');
const { resolve } = require('path');
app.use('/public', express.static('public'));

const { createWorker } = require('tesseract.js');

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
app.get('/', (req, res) => {
	res.render('index', { data: '' });
});
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

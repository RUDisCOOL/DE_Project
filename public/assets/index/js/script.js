const dropArea = document.getElementById('drag-area');
const inputFile = document.getElementById('input-file');
const imageView = document.getElementById('image-view');
const copyButton = document.querySelector('.copy-button');
const copyIcon = document.querySelector('.icon-cpy');
const textArea = document.querySelector('#textarea-hero');
const textAreaDiv = document.querySelector('#textarea-div');
const uploadForm = document.getElementById('upload-img');
const contactForm = document.getElementById('contact-information');
const convertButton = document.querySelector('#convert');
const convertLoadAnimate = document.querySelector('#convert-loading');
const emailLoadAnimate = document.querySelector('#email-loading');
const waitMessage = document.querySelector('#please-wait');
const sendMail = document.querySelector('#send-email');
// Toast
const toast = document.querySelector('.toast');
const toastIcon = document.querySelector('.toast-icon');
const close = document.querySelector('.toast-close');
const progress = document.querySelector('.progress');
const text1 = document.querySelector('.text-1');
const text2 = document.querySelector('.text-2');
// const progressBar = document.querySelector(".progress::before");
// End Toast

// Profile
const profileMenu = document.querySelector('#profile-drop-down');
const profilePhoto = document.querySelector('.profile-photo');
const logoutButton = document.querySelector('#logout');
if (profilePhoto) {
	profilePhoto.onclick = async (e) => {
		profileMenu.classList.toggle('active');
	};
}
if (logoutButton) {
	logoutButton.onclick = async (e) => {
		e.preventDefault();
		const response = await fetch('/logout', {
			method: 'POST',
		});
		const result = await response.json();
		if (result.success) {
			window.location.reload();
		} else {
			console.log('Logout Failed!');
		}
	};
}

inputFile.addEventListener('change', uploadImage);

function uploadImage() {
	// uploadForm.style.display = `flex`;
	// convertButton.hidden = false;
	// textAreaDiv.style.display = `flex`;
	let imgLink = URL.createObjectURL(inputFile.files[0]);
	imageView.style.backgroundImage = `url(${imgLink})`;
	imageView.textContent = '';
}

dropArea.addEventListener('dragover', function (e) {
	e.preventDefault();
});

dropArea.addEventListener('drop', function (e) {
	e.preventDefault();
	inputFile.files = e.dataTransfer.files;
	uploadImage();
});

uploadForm.onsubmit = async (e) => {
	e.preventDefault();
	convertLoadAnimate.hidden = false;
	convertButton.hidden = true;
	waitMessage.hidden = false;
	const formData = new FormData(uploadForm);
	const response = await fetch('/upload', {
		method: 'POST',
		body: formData,
	});
	const data = await response.text();
	convertLoadAnimate.hidden = true;
	convertButton.hidden = false;
	waitMessage.hidden = true;

	document.getElementById('textarea-hero').innerHTML = data;
};

contactForm.onsubmit = async (e) => {
	e.preventDefault();
	emailLoadAnimate.hidden = false;
	sendMail.hidden = true;
	const formData = new FormData(contactForm);
	const data = new URLSearchParams(formData);
	const response = await fetch('/send-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: data,
	});
	const result = await response.json();
	if (result.success) {
		toastIcon.style.backgroundColor = `#0e9700`;
		toast.style.borderLeft = `8px solid #0e9700`;
		progress.style.setProperty('--progress-before-bg', '#0e9700');
		toastIcon.classList.remove('fa-exclamation-triangle');
		toastIcon.classList.add('fa-check');
		text1.innerHTML = `Success`;
		text2.innerHTML = `We have received your message successfully!`;

		toast.classList.add('active');
		progress.classList.add('active');

		setTimeout(() => {
			toast.classList.remove('active');
		}, 5000);

		setTimeout(() => {
			progress.classList.remove('active');
		}, 5300);
	} else {
		toastIcon.style.backgroundColor = `#ff3333`;
		toast.style.borderLeft = `8px solid #ff3333`;
		progress.style.setProperty('--progress-before-bg', '#ff3333');
		toastIcon.classList.remove('fa-check');
		toastIcon.classList.add('fa-exclamation-triangle');
		text1.innerHTML = `Error`;
		text2.innerHTML = `Please try sending the message again!`;

		toast.classList.add('active');
		progress.classList.add('active');

		setTimeout(() => {
			toast.classList.remove('active');
		}, 5000);

		setTimeout(() => {
			progress.classList.remove('active');
		}, 5300);
	}
	emailLoadAnimate.hidden = true;
	sendMail.hidden = false;
};
close.addEventListener('click', () => {
	toast.classList.remove('active');

	setTimeout(() => {
		progress.classList.remove('active');
	}, 300);
});

// JS to improve visual appearance
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
		});
	});
});

function toggleMenu(e) {
	const menu = document.querySelector('.menu-links');
	const icon = document.querySelector('.hamburger-icon');
	menu.classList.toggle('open');
	icon.classList.toggle('open');
	menu.style.width = '200px';
	menu.style.color = 'black';
}

copyButton.addEventListener('click', () => {
	// navigator.clipboard.writeText(textArea.value); //NOTE: This method does not work when the connection is not secure meaning that when a website is not https certified. That is why I have used a deprecated command `execCommand('copy')`.
	textArea.select();
	textArea.setSelectionRange(0, textArea.value.length);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
	copyButton.classList.add('clicked');
	copyIcon.classList.add('clicked');
	setTimeout(() => {
		copyIcon.classList.remove('clicked');
		copyButton.classList.remove('clicked');
	}, 1500);
});

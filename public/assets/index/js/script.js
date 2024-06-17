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
const loadAnimate = document.querySelector('.loading');
const waitMessage = document.querySelector('#please-wait');

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
    loadAnimate.style.display = `flex`;
    convertButton.hidden = true;
    waitMessage.hidden = false;
    const formData = new FormData(uploadForm);
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });
    const data = await response.text();
    loadAnimate.style.display = `none`;
    convertButton.hidden = false;
    waitMessage.hidden = true;

    document.getElementById('textarea-hero').innerHTML = data;
};

contactForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = new URLSearchParams(formData);
    const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data,
    });
    const result = await response.json();
    if (result.success) {
        alert('Email sent successfully!');
    } else {
        alert('Failed to send email.');
    }
}

// JS to improve visual appearance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function toggleMenu(e) {
    e.preventDefault();
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    menu.style.width = '50vw';
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
    }, 15000);
})
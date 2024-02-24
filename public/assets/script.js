const dropArea = document.getElementById('drag-area');
const inputFile = document.getElementById('input-file');
const imageView = document.getElementById('image-view');

inputFile.addEventListener('change', uploadImage);

function uploadImage() {
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


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const video = document.getElementById('video');
const toggleMuteButton = document.getElementById('toggle-mute');
const togglePlayButton = document.getElementById('toggle-play');

toggleMuteButton.addEventListener('click', () => {
    video.muted = !video.muted;
    toggleMuteButton.textContent = video.muted ? 'Unmute' : 'Mute';
});

togglePlayButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        togglePlayButton.textContent = 'Pause';
    } else {
        video.pause();
        togglePlayButton.textContent = 'Play';
    }
});

video.addEventListener('ended', () => {
    togglePlayButton.textContent = 'Play';
});


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
//toggle sound and play/pause button feature added.
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
// the buttons that dissappear before the contact section and reappear when the keyfeatures is visited.
const keyFeaturesSection = document.getElementById('key-features');
const controls = document.getElementById('controls');
const contactSection = document.getElementById('contact');

const observer = new IntersectionObserver(entries => {
    if (entries[0].target.id === 'key-features' && entries[0].isIntersecting) {
        controls.style.display = 'flex';
    } else {
        controls.style.display = 'none';
    }
}, { threshold: 0.6 }); // Adjust threshold as needed

observer.observe(keyFeaturesSection);
observer.observe(contactSection);

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }



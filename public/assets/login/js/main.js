const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

// Toast
const toast = document.querySelector('.toast');
const toastIcon = document.querySelector('.toast-icon');
const close = document.querySelector('.toast-close');
const progress = document.querySelector('.progress');
const text1 = document.querySelector('.text-1');
const text2 = document.querySelector('.text-2');
// const progressBar = document.querySelector(".progress::before");
// End Toast

let wrapper = document.querySelector('.wrapper'),
	signUpLink = document.querySelector('.link .signup-link'),
	signInLink = document.querySelector('.link .signin-link');

signUpLink.addEventListener('click', () => {
	wrapper.classList.add('animated-signin');
	wrapper.classList.remove('animated-signup');
});

signInLink.addEventListener('click', () => {
	wrapper.classList.add('animated-signup');
	wrapper.classList.remove('animated-signin');
});

loginForm.onsubmit = async (e) => {
	e.preventDefault();

	const formData = new FormData(loginForm);
	const data = new URLSearchParams(formData);

	const response = await fetch('/sendForLogin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: data,
	});
	const result = await response.json();

	// alert('Login successful');
	if (result.success) {
		toastIcon.style.backgroundColor = `#0e9700`;
		toast.style.borderLeft = `8px solid #0e9700`;
		progress.style.setProperty('--progress-before-bg', '#0e9700');
		toastIcon.classList.remove('fa-exclamation-triangle');
		toastIcon.classList.add('fa-check');
		text1.innerHTML = `Success`;
		text2.innerHTML = `You have logged in successfully!`;

		toast.classList.add('active');
		progress.classList.add('active');

		setTimeout(() => {
			toast.classList.remove('active');
		}, 3000);

		setTimeout(() => {
			progress.classList.remove('active');
			window.location.href = '/';
		}, 3300);
	} else {
		toastIcon.style.backgroundColor = `#ff3333`;
		toast.style.borderLeft = `8px solid #ff3333`;
		progress.style.setProperty('--progress-before-bg', '#ff3333');
		toastIcon.classList.remove('fa-check');
		toastIcon.classList.add('fa-exclamation-triangle');
		text1.innerHTML = `Error`;
		text2.innerHTML = `${result.error}`;

		toast.classList.add('active');
		progress.classList.add('active');

		setTimeout(() => {
			toast.classList.remove('active');
		}, 3000);

		setTimeout(() => {
			progress.classList.remove('active');
		}, 3300);
	}
};
signupForm.onsubmit = async (e) => {
	e.preventDefault();

	const formData = new FormData(signupForm);
	const data = new URLSearchParams(formData);

	const response = await fetch('/sendForSignup', {
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
		text2.innerHTML = `You have logged in successfully!`;

		toast.classList.add('active');
		progress.classList.add('active');

		setTimeout(() => {
			toast.classList.remove('active');
		}, 3000);

		setTimeout(() => {
			progress.classList.remove('active');
			window.location.href = '/';
		}, 3300);
	} else {
		toastIcon.style.backgroundColor = `#ff3333`;
		toast.style.borderLeft = `8px solid #ff3333`;
		progress.style.setProperty('--progress-before-bg', '#ff3333');
		toastIcon.classList.remove('fa-check');
		toastIcon.classList.add('fa-exclamation-triangle');
		text1.innerHTML = `Error`;
		text2.innerHTML = `${result.error}`;

		toast.classList.add('active');
		progress.classList.add('active');

		setTimeout(() => {
			toast.classList.remove('active');
		}, 3000);

		setTimeout(() => {
			progress.classList.remove('active');
		}, 3300);
	}
};

close.addEventListener('click', () => {
	toast.classList.remove('active');

	setTimeout(() => {
		progress.classList.remove('active');
	}, 300);
});

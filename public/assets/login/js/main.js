const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

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
	if (result.success) {
		alert('Login successful');
	} else {
		alert('Failed ' + result.error);
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
		alert('Sign Up successful');
	} else {
		alert('Failed ' + result.error);
	}
};

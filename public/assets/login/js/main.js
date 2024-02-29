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

document.addEventListener('DOMContentLoaded', () => {
    const sendToSignupServer= async (formData) => {
        try {
            const response = await fetch('/sendToServer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData),
            });
            const servererror = response.status;
            if (servererror === 500) {
                const responseData = await response.text();
                alert(responseData);
            }
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the default form submission

        const formData = new FormData(signupForm);
        sendToSignupServer(formData);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const sendLoginServer = async (formData) => {
        try {
            const response = await fetch('/sendForLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData),
            });

            const responseData = await response.text();
            alert(responseData);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const signupForm = document.getElementById('loginForm');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the default form submission

        const formData = new FormData(signupForm);
        sendLoginServer(formData);
    });
});

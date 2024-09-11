async function signUp(event) {
    event.preventDefault();
    
    const signupData = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
    };

    try {
        const response = await axios.post('http://localhost:4000/user/signup', signupData);
        console.log('User signed up successfully:', response.data);
        alert('Signup successful');
        event.target.reset();
    } catch (error) {
        console.log('Error signing up:', error);

        // Check if the error response exists and has the expected message
        if (error.response && error.response.data.message) {
            alert(`Error: ${error.response.data.message}`);
        } else {
            alert('An error occurred during signup.');
        }
        event.target.reset();
    }
}

async function login(event) {
    event.preventDefault();
    
    const loginData = {
        email: event.target.email.value,
        password: event.target.password.value,
    };

    try {
        const response = await axios.post(`http://localhost:4000/user/login`, loginData);

        if (response.status === 200) {
            alert('Login Successful');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            if (error.response.status === 401) {
                alert('Invalid Password');
            } else if (error.response.status === 404) {
                alert('User not found');
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } else {
            // Network error or request not made
            console.log('Error', error.message);
            alert('Network error. Please check your connection.');
        }
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const signupRedirector = document.getElementById('signup_redirect');
    if (signupRedirector) {
        signupRedirector.addEventListener('click', () => {
            window.location = '/index.html'; // Update with your correct sign-up path
        });
    }
});


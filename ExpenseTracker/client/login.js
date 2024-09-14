async function login(event) {
    event.preventDefault();

    const loginDetails = {
        email: event.target.email.value,
        password: event.target.password.value,
    };

    try {
        const response = await axios.post('http://localhost:4000/user/login', loginDetails);

        if (response.status === 200) {
            // Store the JWT token in localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to the index page
            window.location.href = './index.html';
        } else {
            alert('Unexpected response status: ' + response.status);
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
}

document.addEventListener('DOMContentLoaded', () => {
    const signupRedirect = document.getElementById('signup_redirect');
    signupRedirect.addEventListener('click', () => {
        window.location.href = './signup.html';
    });
});

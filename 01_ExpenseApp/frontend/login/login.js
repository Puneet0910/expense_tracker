async function login(event) {
    event.preventDefault();
    
    const loginData = {
        email: event.target.email.value,
        password: event.target.password.value,
    };

    try {
        const response = await axios.post(`http://localhost:4000/user/login`, loginData);

        if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            alert('Login Successful');
            window.location.href = '../features/dashboard.html'
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
            window.location = '../signup/signup.html'; // Update with your correct sign-up path
        });
    }
});
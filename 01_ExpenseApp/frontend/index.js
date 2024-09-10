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

async function login(event){
    event.preventDefault();
    const loginData = {
        email:event.target.email.value,
        password:event.target.password.value,
    };
    console.log("Login attemp", loginData);
};

document.addEventListener('DOMContentLoaded', () => {
    const signupRedirector = document.getElementById('signup_redirect');
    if (signupRedirector) {
        signupRedirector.addEventListener('click', () => {
            window.location = '/index.html'; // Update with your correct sign-up path
        });
    }
});


async function signUp(event) {
    event.preventDefault();
    
    const signupData = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
    };

    try {
        const response = await axios.post('http://localhost:4000/user/signup', signupData);
        alert('Signup successful');
        event.target.reset();
        window.location.href = './login.html';
    } catch (error) {
        console.log('Error signing up:', error);
        if (error.response && error.response.data.message) {
            alert(`Error: ${error.response.data.message}`);
        } else {
            alert('An error occurred during signup.');
        }
        event.target.reset();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginRedirector = document.getElementById('login_redirect');
    if (loginRedirector) {
        loginRedirector.addEventListener('click', () => {
            window.location.href = './login.html'; 
        });
    }
});
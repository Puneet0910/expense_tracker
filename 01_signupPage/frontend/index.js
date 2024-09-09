async function signUp(event) {
    event.preventDefault();
    
    const signupData = {
        name: event.target.name.value,
        email: event.target.email.value,
    };

    try {
        const response = await axios.post('http://localhost:4000/user/signup', signupData);
        console.log('User signed up successfully:', response.data);
        alert('signup successfull');
    } catch (error) {
        console.log('Error signing up:', error);
    }
}

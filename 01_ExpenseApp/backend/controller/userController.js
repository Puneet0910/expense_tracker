const User = require('../models/user');

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists, and await the result
        const isUserExist = await User.findOne({ where: { email: email } });

        if (isUserExist) {
            // Return a 400 status code for "Bad Request"
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user if the email does not exist
        const response = await User.create({ name: name, email: email, password: password });
        res.status(201).json({ message: 'User created successfully', data: response });
    } catch (error) {
        console.log(error);
        // Send a 500 status code for "Server Error"
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            if (user.password === password) {
                res.status(200).json({ message: 'User Login Successfully' });
            } else {
                res.status(401).json({ message: 'Invalid Password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error during login process:", error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
};




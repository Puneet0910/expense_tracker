const User = require('../models/user');

const bcryptjs = require('bcryptjs');

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const isUserExist = await User.findOne({ where: { email: email } });

        if (isUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password using await and bcryptjs
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create the new user with hashed password
        const response = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', data: response });
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email: email } });

        if (user) {

            const isPasswordValid = await bcryptjs.compare(password, user.password)

            if (isPasswordValid) {
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




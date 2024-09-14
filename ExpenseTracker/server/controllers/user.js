const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_key = process.env.jwt_key;

exports.userSignup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: 'Email Already Registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const user = await User.create({ name, email, password: hashedPassword });

        // Respond with 201 Created on successful signup
        res.status(201).json({ message: 'Signup Successful' });

    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Server Error' }); // Respond with a server error status code
    }
};


exports.userLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const checkUser = await User.findOne({ where: { email } });

        if (checkUser) {
            // Compare the entered password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, checkUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: checkUser.id }, jwt_key, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login Successful', token }); // Send token
            } else {
                return res.status(401).json({ message: 'Invalid Password' });
            }
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

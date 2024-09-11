const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to generate access token
function generateAccessToken(id) {
    return jwt.sign({ userId: id }, 'secretkey', { expiresIn: '1h' });  // Token expires in 1 hour
}

// Sign-up controller
exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const isUserExist = await User.findOne({ where: { email: email } });

        if (isUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password using bcryptjs
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create the new user with hashed password
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', data: newUser });
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login controller
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            // Compare the entered password with the stored hashed password
            const isPasswordValid = await bcryptjs.compare(password, user.password);

            if (isPasswordValid) {
                // Generate JWT token using the user's id
                const token = generateAccessToken(user.id);

                res.status(200).json({
                    message: 'User Login Successfully',
                    token: token  // Send the token to the client
                });
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
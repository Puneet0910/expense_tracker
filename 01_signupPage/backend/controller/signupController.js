const User = require('../models/user');

exports.signUp = async (req, res, next) => {
    const { name, email } = req.body;

    try {
        const response = await User.create({ name: name, email: email });
        res.status(201).json({ message: 'User created successfully', data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token missing from header' });
        }

        const decodedUser = jwt.verify(token, 'secretkey');
        console.log('UserID >>>>', decodedUser.userId);

        const user = await User.findByPk(decodedUser.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
};

module.exports = { authenticate };

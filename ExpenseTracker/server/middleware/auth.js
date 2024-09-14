require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwt_key = process.env.jwt_key;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, respond with 401

    jwt.verify(token, jwt_key, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, respond with 403
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

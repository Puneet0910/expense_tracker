const userController = require('../controllers/user');

const express = require('express');

const router = express.Router();

router.post('/user/login', userController.userLogin);

router.post('/user/signup', userController.userSignup);


module.exports = router;
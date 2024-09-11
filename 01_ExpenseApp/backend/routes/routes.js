const signUpController = require('../controller/userController');
const express = require('express');

const router = express.Router();

router.post('/user/signup', signUpController.signUp);
router.post('/user/login', signUpController.login);

module.exports = router;
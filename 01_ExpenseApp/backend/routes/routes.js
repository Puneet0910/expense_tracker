const signUpController = require('../controller/signupController');
const express = require('express');

const router = express.Router();

router.post('/user/signup', signUpController.signUp);

module.exports = router;
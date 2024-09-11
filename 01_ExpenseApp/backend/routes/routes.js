const signUpController = require('../controller/userController');
const expenseController = require('../controller/expenseController');
const express = require('express');

const router = express.Router();

router.post('/user/signup', signUpController.signUp);
router.post('/user/login', signUpController.login);


// expense route

router.post('/addExpense', expenseController.addExpense);
router.get('/getExpense', expenseController.getExpense);
router.delete('/delete/:id', expenseController.deleteExpense);
module.exports = router;
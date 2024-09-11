const express = require('express');
const signUpController = require('../controller/userController');
const expenseController = require('../controller/expenseController');
const userAuthentication = require('../middleware/auth').authenticate; // Correct import
const router = express.Router();

// User routes
router.post('/user/signup', signUpController.signUp);
router.post('/user/login', signUpController.login);

// Expense routes (protected by authentication)
router.post('/expense/add', userAuthentication, expenseController.addExpense);
router.get('/expense/get', userAuthentication, expenseController.getExpense);
router.delete('/expense/delete/:id', userAuthentication, expenseController.deleteExpense);

module.exports = router;

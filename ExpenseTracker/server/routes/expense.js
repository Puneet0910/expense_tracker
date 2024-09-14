const expenseController = require('../controllers/expense');
const authenticateToken = require('../middleware/auth');

const express = require('express');

const router = express.Router();

router.post('/expense/addExpense',authenticateToken, expenseController.addExpense);

router.get('/expense/getExpense',authenticateToken, expenseController.getExpense);

router.delete('/expense/deleteExpense/:id',authenticateToken, expenseController.deleteExpense);
module.exports = router;
const Expense = require('../models/expense');

exports.addExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;

    try {
        const expense = await Expense.create({
            amount,
            description,
            category,
            userId: req.user.id, // Correctly use the authenticated user's ID
        });
        res.status(201).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const response = await Expense.findAll();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Expense.destroy({ where: { id } });
        if (result) {
            res.status(200).send({ message: 'Data Removed' });
        } else {
            res.status(404).send({ message: 'Deletion failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

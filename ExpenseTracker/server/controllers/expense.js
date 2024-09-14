const Expense = require('../models/expense');

exports.addExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
    const userId = req.user.id; // Extract userId from JWT

    try {
        const expense = await Expense.create({ amount, description, category, userId });
        res.status(201).json({ message: 'Expense Added Successfully', expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpense = async (req, res, next) => {
    const userId = req.user.id; // Extract userId from JWT

    try {
        const expenses = await Expense.findAll({ where: { userId } });
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteExpense = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id; // Extract userId from JWT

    try {
        const expense = await Expense.findOne({ where: { id, userId } });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or not authorized' });
        }

        await Expense.destroy({ where: { id, userId } });
        res.status(200).json({ message: 'Entry Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Deleting Entry' });
    }
};

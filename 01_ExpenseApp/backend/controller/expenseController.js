const Expense = require('../models/expense');

exports.addExpense = async (req,res,next)=>{
    const {amount, description, category} = req.body;

    try {
        const expense = await Expense.create({amount:amount, description:description, category:category});
        res.status(201).json(expense);
    } catch (error) {
        console.log(error, {message:error.message});
    }
};
exports.getExpense = async (req,res)=>{
    try {
        const response = await Expense.findAll();
        res.send(response);
    } catch (error) {
        console.log(error);
        
    }
};
exports.deleteExpense = async (req,res,next)=>{
    const id = req.params.id;
    try {
        const result = await Expense.destroy({where:{id:id}});
        if(result){
            res.status(200).send({message:'Data Removed'});
        }
        else{
            res.status(404).send({message:'Deletion failed'});
        }
    } catch (error) {
        console.log(error);
        
    }
}
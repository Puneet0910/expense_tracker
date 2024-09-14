const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const expense = sequelize.define('expense',{
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    description:Sequelize.STRING,
    category:Sequelize.STRING,
});

module.exports = expense;
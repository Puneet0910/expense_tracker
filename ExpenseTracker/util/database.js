const mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense_tracker", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

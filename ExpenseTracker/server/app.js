const express = require('express');
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders');
const purchasepremiumRoutes = require('./routes/purchase');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRoute);
app.use(expenseRoute);
app.use(purchasepremiumRoutes);


// association
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(Order);
Order.belongsTo(User);

Sequelize.sync().then((result) => {
    app.listen(4000);
}).catch((err) => {
    console.log(err);
});
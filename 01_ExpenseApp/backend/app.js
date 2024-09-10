const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/routes');
const sequelize = require('./util/database');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(route);

// Database Sync and Server Start
sequelize.sync()
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((err) => {
        console.log('Error syncing database:', err);
    });

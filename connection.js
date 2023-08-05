const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: process.env.DB_USER,
        // Your MySQL password
        password: process.env.DB_PW,
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
    );

module.exports = db;
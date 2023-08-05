const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: process.env.DB_USER,
        // Your MySQL password
        password: process.env.DB_PW,
        database: 'employeeTrackerDB'
    },
    console.log('Connected to the employeeTrackerDB database.')
    );

module.exports = db;
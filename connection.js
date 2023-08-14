const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        // Your MySQL username,
        user: "root",
        // Your MySQL password
        password: process.env.DB_PASSWORD,
        database: 'employeeTrackerDB'
    },
    console.log('Connected to the employeeTrackerDB database.')
    );

module.exports = db;
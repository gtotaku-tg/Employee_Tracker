
// const mysql = require('mysql2');


// const db = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// console.log('Connected to db!');

// module.exports = db;



const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: '127.0.0.1',
    // port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

console.log('Connected to db!');
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db!");
  
});


module.exports = db;
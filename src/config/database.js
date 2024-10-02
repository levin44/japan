const {createPool} = require("mysql");
require('dotenv').config()

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

pool.on('connection', (connection) => {
    console.log('Connected to MySQL database');
});

pool.on('error', (err) => {
    console.error('Error occurred in MySQL connection pool:', err);
});

module.exports = pool;


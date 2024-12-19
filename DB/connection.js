const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// Create a pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // Number of connections in the pool
    queueLimit: 0,       // No limit for queued requests
});


module.exports = pool;

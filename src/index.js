const express = require('express');
const dotenv = require('dotenv');//
const studentRoutes = require('../routes/student.routes');
const pool = require('../DB/connection'); // Assuming connection.js exports the pool

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
app.use(express.json());


// Routes
app.use('/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;


(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    }
})();




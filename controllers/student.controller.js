const db = require('../DB/connection');

// Insert a new student
exports.insertStudent = async (req, res) => {
    const { ROLL_NO, NAME, marks, grade, city } = req.body;
    const checkQuery = 'SELECT * FROM STUDENT WHERE ROLL_NO = ?'; // Check if the student exists
    const insertQuery = 'INSERT INTO STUDENT (ROLL_NO, NAME, marks, grade, city) VALUES (?, ?, ?, ?, ?)';
    
    try {
        // Check if the student already exists
        const [existingStudent] = await db.query(checkQuery, [ROLL_NO]);
        if (existingStudent.length > 0) {
            return res.status(400).json({ message: 'Student with this roll number already exists' });
        }

        // Insert the new student if not exists
        const [result] = await db.query(insertQuery, [ROLL_NO, NAME, marks, grade, city]);
        res.status(201).json({ message: 'Student added successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting student', error });
    }
};


// Get all students
exports.getStudents = async (req, res) => {
    const query = 'SELECT * FROM STUDENT';
    try {
        const [results] = await db.query(query);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        res.status(200).json({ message: 'Students retrieved successfully', data: results });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};


// Update a student
exports.updateStudent = async (req, res) => {
    const { ROLL_NO } = req.params;
    const { NAME, marks, grade, city } = req.body;
    const checkQuery = 'SELECT * FROM STUDENT WHERE ROLL_NO = ?'; // Check if the student exists
    const updateQuery = 'UPDATE STUDENT SET NAME = ?, marks = ?, grade = ?, city = ? WHERE ROLL_NO = ?';
    
    try {
        // Check if the student exists
        const [existingStudent] = await db.query(checkQuery, [ROLL_NO]);
        if (existingStudent.length === 0) {
            return res.status(404).json({ message: 'No student found with this roll number' });
        }

        // Update the student if exists
        const [result] = await db.query(updateQuery, [NAME, marks, grade, city, ROLL_NO]);
        res.status(200).json({ message: 'Student updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};
// Update a student
exports.getOneStudent = async (req, res) => {
    const { ROLL_NO } = req.params;
    const getQuery = 'SELECT * FROM STUDENT WHERE ROLL_NO = ?';

    try {
        // Check if the student exists
        const [existingStudent] = await db.query(getQuery, [ROLL_NO]);
        if (existingStudent.length === 0) {
            return res.status(404).json({ message: 'No student found with this roll number' });
        }

        // Return the student data
        res.status(200).json({ message: 'Student fetched successfully', data: existingStudent[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};


// Remove a student
exports.removeStudent = async (req, res) => {
    const { ROLL_NO } = req.params;
    const checkQuery = 'SELECT * FROM STUDENT WHERE ROLL_NO = ?'; // Check if the student exists
    const deleteQuery = 'DELETE FROM STUDENT WHERE ROLL_NO = ?';
    
    try {
        // Check if the student exists
        const [existingStudent] = await db.query(checkQuery, [ROLL_NO]);
        if (existingStudent.length === 0) {
            return res.status(404).json({ message: 'No student found with this roll number to delete' });
        }

        // Delete the student if exists
        const [result] = await db.query(deleteQuery, [ROLL_NO]);
        res.status(200).json({ message: 'Student removed successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error removing student', error });
    }
};


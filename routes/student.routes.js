const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

// Routes
router.post('/insertStudent', studentController.insertStudent);
router.get('/getStudents', studentController.getStudents);
router.get('/getOneStudent/:ROLL_NO', studentController.getOneStudent);
router.put('/updateStudent/:ROLL_NO', studentController.updateStudent);
router.delete('/removeStudent/:ROLL_NO', studentController.removeStudent);

module.exports = router;

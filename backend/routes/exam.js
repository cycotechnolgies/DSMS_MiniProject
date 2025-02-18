const express = require("express");
const router = express.Router();
const { createExam, updateExam, getAllExams, getExam, deleteExam, assignStudents, updateResult } = require("../controller/examController");

router.post('/add', createExam);
router.put('/edit/:id', updateExam);
router.get('/get', getAllExams);
router.get('/get/:id', getExam);
router.delete('/del/:id', deleteExam);
router.put('/assign/:examId', assignStudents);
router.put('/result/:examId/:studentId', updateResult);

module.exports = router;
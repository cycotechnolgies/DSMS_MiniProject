const express = require("express");
const router = express.Router();
const { createSchedule, updateSchedule, getAllClass, getSchedule, deleteSchedule, assignStudents, removeStudent, updateScore } = require("../controller/classController");

router.post('/add', createSchedule);
router.put('/edit/:id', updateSchedule);
router.get('/get', getAllClass);
router.get('/get/:id', getSchedule);
router.delete('/del/:id', deleteSchedule);
router.put('/assign/:scheduleId', assignStudents);
router.delete('/del/:scheduleId/:studentId', removeStudent);
router.put('/score/:scheduleId/:studentId', updateScore);

module.exports = router;
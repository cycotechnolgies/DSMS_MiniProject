const Schedule = require("../models/classModle");
const User = require("../models/userModel");

// Create a schedule
const createSchedule = async (req, res) => {
  try {
    const { instructor, students } = req.body;

    // Check if instructor exists
    const instructorExists = await User.findById(instructor);
    if (!instructorExists) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Check if all students exist
    const studentIds = students.map(student => student.studentId);
    const existingStudents = await User.find({ _id: { $in: studentIds } });

    if (existingStudents.length !== students.length) {
      return res.status(400).json({ message: "One or more students do not exist" });
    }

    // Create and save schedule
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json({ message: "Schedule created successfully", schedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllClass = async (req, res) => {
  try {
    const classes = await Schedule.aggregate([
      {
        $addFields: {
          studentCount: { $size: "$students" } 
        }
      }
    ]);

    
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching classes", error: error.message });
  }
};

const getSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findById(id)
    .populate('instructor', 'fullName userId')
    .populate('students.studentId', 'fullName userId');

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching schedule", error: error.message });
  }
};

const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure students are stored with { studentId: _id }
        const updatedData = {
            ...req.body,
            students: req.body.students.map(student => ({
                studentId: student.studentId || student._id, 
                score: student.score || 0
            }))
        };

        const updatedSchedule = await Schedule.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({ message: 'Schedule updated successfully', updatedSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule', error });
    }
};



const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        await Schedule.findByIdAndDelete(id);
        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting schedule', error });
    }
};

// Assign students to a schedule
const assignStudents = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const { students } = req.body;

    // Check if schedule exists
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    // Validate students exist in the Users collection
    const studentIds = students.map(student => student.studentId);
    const existingStudents = await User.find({ _id: { $in: studentIds } });

    if (existingStudents.length !== students.length) {
      return res.status(400).json({ message: "One or more students do not exist" });
    }

    // Append new students while keeping existing ones
    students.forEach(student => {
      // Check if student is already assigned
      const exists = schedule.students.some(s => s.studentId.toString() === student.studentId);
      if (!exists) {
        schedule.students.push({
          studentId: student.studentId,
          score: student.score || 0,
        });
      }
    });

    await schedule.save();
    res.json({ message: "Students assigned successfully", schedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeStudent = async (req, res) => {
  try {
    const { scheduleId, studentId } = req.params;

    // Find the schedule
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    // Check if the student exists in the schedule
    const studentExists = schedule.students.some(s => s.studentId.toString() === studentId);
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found in this schedule" });
    }

    // Remove the student
    schedule.students = schedule.students.filter(s => s.studentId.toString() !== studentId);

    // Save updated schedule
    await schedule.save();

    res.json({ message: "Student removed successfully", schedule });
  } catch (error) {
    res.status(500).json({ message: "Error removing student", error: error.message });
  }
};


// Update student score
const updateScore = async (req, res) => {
  try {
    const { scheduleId, studentId } = req.params;
    const { score } = req.body;

    // Check if student exists
    const studentExists = await User.findById(studentId);
    if (!studentExists) return res.status(404).json({success: false, message: "Student not found" });

    // Check if schedule exists
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) return res.status(404).json({success: false, message: "Schedule not found" });

    // Find student in the schedule
    const student = schedule.students.find(s => s.studentId.toString() === studentId);
    if (!student) return res.status(404).json({success: false, message: "Student not found in this schedule" });

    student.score = score;
    await schedule.save();

    res.json({success: true, message: "Student score updated", schedule });
  } catch (error) {
    res.status(500).json({success: false, message: error.message });
  }
};

module.exports = { createSchedule, updateSchedule, getSchedule, getAllClass, deleteSchedule, assignStudents, removeStudent, updateScore };
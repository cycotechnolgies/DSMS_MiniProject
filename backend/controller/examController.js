const Exam = require("../models/examModle");
const User = require("../models/userModel");

// Create an exam
const createExam = async (req, res) => {
  try {
    const { students } = req.body;

    console.log(req.body);

    // Check if all students exist
    const studentIds = students.map(student => student.studentId);
    const existingStudents = await User.find({ _id: { $in: studentIds } });

    if (existingStudents.length !== students.length) {
      return res.status(400).json({ message: "One or more students do not exist" });
    }

    // Create and save exam
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all exams
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("students.studentId", "fullName userId");
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error: error.message });
  }
};

// Get a single exam by ID
const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate("students.studentId", "fullName userId");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam", error: error.message });
  }
};

// Update an exam
const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExam = await Exam.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Exam updated successfully", updatedExam });
  } catch (error) {
    res.status(500).json({ message: "Error updating exam", error });
  }
};

// Delete an exam
const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByIdAndDelete(id);
    
    // Check if the exam was found and deleted
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }

    res.json({ success: true, message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting exam", error });
  }
};


// Assign students to an exam
const assignStudents = async (req, res) => {
  try {
    const { examId } = req.params;
    const { students } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const studentIds = students.map(student => student.studentId);
    const existingStudents = await User.find({ _id: { $in: studentIds } });

    if (existingStudents.length !== students.length) {
      return res.status(400).json({ message: "One or more students do not exist" });
    }

    students.forEach(student => {
      const exists = exam.students.some(s => s.studentId.toString() === student.studentId);
      if (!exists) {
        exam.students.push({
          studentId: student.studentId,
          result: student.result || "N/A",
        });
      }
    });

    await exam.save();
    res.json({ message: "Students assigned successfully", exam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update student result in an exam
const updateResult = async (req, res) => {
  try {
    const { examId, studentId } = req.params;
    const { result } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({success:false, message: "Exam not found" });

    const student = exam.students.find(s => s.studentId.toString() === studentId);
    if (!student) return res.status(404).json({success:false, message: "Student not found in this exam" });

    student.result = result;
    await exam.save();

    res.json({success:true, message: "Student result updated", exam });
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};

module.exports = { createExam, updateExam, getExam, getAllExams, deleteExam, assignStudents, updateResult };

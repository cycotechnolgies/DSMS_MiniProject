const QuizResult = require("../models/quizModle");

// Save Quiz Result
const saveQuizResult = async (req, res) => {
  try {
    const { userId, totalQuestions, correctAnswers, incorrectAnswers, skippedAnswers } = req.body;

    // Validate input
    if (!userId || totalQuestions === undefined || correctAnswers === undefined || incorrectAnswers === undefined || skippedAnswers === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save result to DB
    const newResult = new QuizResult({
      userId,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      skippedAnswers,
    });

    await newResult.save();

    res.status(201).json({ message: "Quiz result saved successfully", data: newResult });
  } catch (error) {
    res.status(500).json({ message: "Error saving quiz result", error: error.message });
  }
};

// Get all quiz results (for an admin or analytics)
const getAllQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find().populate("userId", "name email"); // Populate user details if needed
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz results", error: error.message });
  }
};

// Get results for a specific user
const getUserQuizResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await QuizResult.find({ userId });

    if (!results.length) {
      return res.status(404).json({ message: "No results found for this user" });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's quiz results", error: error.message });
  }
};

const getQuizResultsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await QuizResult.find({ userId }).sort({ createdAt: 1 });

    if (!results.length) {
      return res.status(404).json({ message: "No quiz results found for this user." });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz results", error: error.message });
  }
};

module.exports = { saveQuizResult, getAllQuizResults, getUserQuizResults, getQuizResultsByUser };

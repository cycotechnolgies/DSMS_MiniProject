const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  incorrectAnswers: { type: Number, required: true },
  skippedAnswers: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
},
{collection: "quiz"});

module.exports = mongoose.model("QuizResult", quizResultSchema);

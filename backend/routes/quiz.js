const express = require("express");
const { saveQuizResult, getAllQuizResults, getUserQuizResults, getQuizResultsByUser } = require("../controller/quizController");

const router = express.Router();

router.post("/save", saveQuizResult);  // Save quiz result
router.get("/all", getAllQuizResults); // Get all quiz results
router.get("/:userId", getUserQuizResults); 
router.get("/get/:userId", getQuizResultsByUser);

module.exports = router;

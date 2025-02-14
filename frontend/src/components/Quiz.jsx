import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizData } from "/src/data/quizData.js";

function Quiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progress, setProgress] = useState([]);
  const [result, setResult] = useState(false);

  const Question = quizData[index];

  // ✅ Save progress to localStorage properly
  const saveProgress = () => {
    const finalScore = Math.min(score, 100); // Ensure max score is 100
    const totalCorrect = Math.min(correctAnswers, quizData.length); // Ensure max correct answers is 10

    const examResult = {
      id: Date.now(),
      type: "Driving Test",
      score: finalScore,
      correctAnswers: totalCorrect,
      totalQuestions: quizData.length,
      exam_date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      progress: progress, // Save progress data
    };

    const savedResults = JSON.parse(localStorage.getItem("examResults")) || [];
    localStorage.setItem("examResults", JSON.stringify([...savedResults, examResult]));
  };

  // ✅ Handle answer selection
  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === Question.Answer) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  // ✅ Handle Next Button (only proceed if correct)
  const handleNext = () => {
    if (selectedAnswer === Question.Answer) {
      setProgress([
        ...progress,
        { id: Question.id, question: Question.question, selected: selectedAnswer, correct: true },
      ]);
      if (index < quizData.length - 1) {
        setIndex(index + 1);
        setSelectedAnswer(null);
      } else {
        saveProgress(); // Save result when quiz completes
        setResult(true);
      }
    }
  };

  // ✅ Handle Back Button
  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="quiz-app bg-gray-100 min-h-screen p-6 flex justify-center items-center">
      <div className="quiz-container bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl relative">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Driving School Quiz</h1>

        {result ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-500">
              You Scored {score > 100 ? 100 : score} out of 100
            </h2>
            <h3 className="text-lg font-semibold mt-4">
              Correct Answers: {correctAnswers > quizData.length ? quizData.length : correctAnswers}/{quizData.length}
            </h3>

            <button 
              onClick={() => navigate("/exams")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium rounded-full shadow-md hover:scale-105 transform transition"
            >
              View Results
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">{index + 1}. {Question.question}</h3>
            <img src={Question.url} alt={Question.alt} className="w-40 mx-auto rounded-lg shadow-lg mb-6" />

            <ul className="space-y-4">
              {[Question.option1, Question.option2, Question.option3, Question.option4].map((option, i) => (
                <li
                  key={i}
                  onClick={() => handleAnswer(i + 1)}
                  className={`cursor-pointer p-4 bg-gray-100 rounded-lg shadow hover:bg-indigo-50 border hover:border-indigo-500 transition ${
                    selectedAnswer === i + 1 ? (selectedAnswer === Question.Answer ? "bg-green-500 text-white" : "bg-red-500 text-white") : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between">
              <button 
                onClick={handleBack} 
                disabled={index === 0} 
                className={`px-6 py-2 font-medium rounded-full shadow ${
                  index === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-500 text-white hover:scale-105 transform transition"
                }`}
              >
                Back
              </button>

              <button 
                onClick={handleNext} 
                disabled={selectedAnswer !== Question.Answer} 
                className={`px-6 py-2 font-medium rounded-full shadow ${
                  selectedAnswer !== Question.Answer ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:scale-105 transform transition"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
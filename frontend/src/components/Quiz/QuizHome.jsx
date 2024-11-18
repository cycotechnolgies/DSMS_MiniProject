// Home.js
import React from "react";
import "./Home.css";

function QuizHome({ startQuiz }) {
  return (
    <div className="home-container">
      <h1>Quiz Application</h1>
      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points are awarded for each correct answer.</li>
        <li>Each question has four options. You can choose only one.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}

export default QuizHome;

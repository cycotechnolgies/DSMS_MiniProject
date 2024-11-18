import React, { useState, useEffect, useRef } from "react";
import "./Quiz.css";
import { data } from "../../data/quizData.js";
import Home from "./QuizHome.jsx"; // Update to the new file extension

// Image imports
import roadNarrowsSign from "../../images/quiz/roadnarrowsaheadsign.png";
import slipperyRoadSign from "../../images/quiz/slipperyroadaheadsign.webp";
import railwayCrossingSign from "../../images/quiz/railwaycrossingsign.jpeg";
import policeOfficerSign from "../../images/quiz/policeofficersign.png";
import yJunctionSign from "../../images/quiz/yjunctionsign.webp";
import steepDeclineSign from "../../images/quiz/steepdeclinesign.png";
import pedestrianCrossingSign from "../../images/quiz/pedestriancrossingaheadsign.png";
import noParkingSign from "../../images/quiz/noparking.png";
import rightBendSign from "../../images/quiz/rightbend.png";
import roundaboutSign from "../../images/quiz/roundabout.png";

function Quiz() {
  const [isQuizStarted, setIsQuizStarted] = useState(false); // Track if quiz has started
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalTimeLeft, setTotalTimeLeft] = useState(180);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const Question = data[index];

  // Image mapping for each question
  const imageMap = {
    1: roadNarrowsSign,
    2: slipperyRoadSign,
    3: railwayCrossingSign,
    4: policeOfficerSign,
    5: yJunctionSign,
    6: steepDeclineSign,
    7: pedestrianCrossingSign,
    8: noParkingSign,
    9: rightBendSign,
    10: roundaboutSign,
  };

  // Function to start the quiz (called when "Start Quiz" is clicked on Home)
  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  // Function to check the answer selected by the user
  const checkAns = (e, answer) => {
    if (!lock) {
      if (Question.Answer === answer) {
        e.target.classList.add("correct");
        setScore(score + 1);
      } else {
        e.target.classList.add("wrong");
        optionRefs[Question.Answer - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  // Function to go to the next question
  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setLock(false);
      optionRefs.forEach((option) =>
        option.current.classList.remove("wrong", "correct")
      );
    } else {
      setResult(true);
    }
  };

  // Function to go to the previous question
  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setLock(false);
      optionRefs.forEach((option) =>
        option.current.classList.remove("wrong", "correct")
      );
    }
  };

  // Reset function
  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setTotalTimeLeft(180);
    setSelectedAnswers({});
    setIsQuizStarted(false);
  };

  // Timer
  useEffect(() => {
    if (totalTimeLeft === 0) {
      setResult(true);
    } else if (!result) {
      const timer = setInterval(
        () => setTotalTimeLeft((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [totalTimeLeft, result]);

  // Format time to display as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="quiz-app">
      {isQuizStarted ? ( // Conditional rendering
        <div className="container">
          <h1>Driving School Quiz Test</h1>
          <hr />
          {result ? (
            <>
              <h2>
                You Scored {score} out of {data.length}
              </h2>
              <button onClick={reset}>Reset</button>
            </>
          ) : (
            <>
              <h3>
                {index + 1}. {Question.question}
              </h3>
              {imageMap[Question.imageId] && (
                <div className="image-container">
                  <img
                    src={imageMap[Question.imageId]}
                    alt={Question.alt}
                    className="question-image"
                  />
                </div>
              )}
              <ul>
                <li ref={optionRefs[0]} onClick={(e) => checkAns(e, 1)}>
                  {Question.option1}
                </li>
                <li ref={optionRefs[1]} onClick={(e) => checkAns(e, 2)}>
                  {Question.option2}
                </li>
                <li ref={optionRefs[2]} onClick={(e) => checkAns(e, 3)}>
                  {Question.option3}
                </li>
                <li ref={optionRefs[3]} onClick={(e) => checkAns(e, 4)}>
                  {Question.option4}
                </li>
              </ul>
              <div className="total-timer">
                Total Time Left: {formatTime(totalTimeLeft)}
              </div>
              <button onClick={handlePrevious} disabled={index === 0}>
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={index === data.length - 1 && !lock}
              >
                Next
              </button>
              <div className="index">
                {index + 1} of {data.length} Questions
              </div>
            </>
          )}
        </div>
      ) : (
        <Home startQuiz={startQuiz} /> // Show Home component if quiz hasn't started
      )}
    </div>
  );
}

export default Quiz;

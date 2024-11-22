import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import quizData from '../../../data/quizData.js';
import Home from './Home.jsx'; // Update to the new file extension

// Image imports
import roadNarrowsSign from '../../assets/roadnarrowsaheadsign.png';
import slipperyRoadSign from '../../assets/slipperyroadaheadsign.webp';
import railwayCrossingSign from '../../assets/railwaycrossingsign.jpeg';
import policeOfficerSign from '../../assets/policeofficersign.png';
import yJunctionSign from '../../assets/yjunctionsign.webp';
import steepDeclineSign from '../../assets/steepdeclinesign.png';
import pedestrianCrossingSign from '../../assets/pedestriancrossingaheadsign.png';
import noParkingSign from '../../assets/noparking.png';
import rightBendSign from '../../assets/rightbend.png';
import roundaboutSign from '../../assets/roundabout.png';

function Quiz() {
  const [isQuizStarted, setIsQuizStarted] = useState(false); // Track if quiz has started
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers
  const [totalTimeLeft, setTotalTimeLeft] = useState(180);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const Question = quizData[index];

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

  // Function to start the quiz
  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  // Function to check the answer selected by the user
  const checkAns = (e, answer) => {
    if (!lock) {
      const isCorrect = Question.Answer === answer;
      setSelectedAnswers((prev) => ({
        ...prev,
        [index]: { selected: answer, isCorrect },
      }));

      if (isCorrect) {
        e.target.classList.add('correct');
        setScore(score + 1);
      } else {
        e.target.classList.add('wrong');
        optionRefs[Question.Answer - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  // Function to go to the next question
  const handleNext = () => {
    if (index < quizData.length - 1) {
      setIndex(index + 1);
      setLock(false);

      // Reset options for the current question
      optionRefs.forEach((option) => option.current.classList.remove('wrong', 'correct'));

      // Restore the state for the next question if already answered
      const nextAnswer = selectedAnswers[index + 1];
      if (nextAnswer) {
        if (nextAnswer.isCorrect) {
          optionRefs[nextAnswer.selected - 1].current.classList.add('correct');
        } else {
          optionRefs[nextAnswer.selected - 1].current.classList.add('wrong');
          optionRefs[quizData[index + 1].Answer - 1].current.classList.add('correct');
        }
        setLock(true);
      }
    } else {
      setResult(true);
    }
  };

  // Function to go to the previous question
  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setLock(false);

      // Reset options for the current question
      optionRefs.forEach((option) => option.current.classList.remove('wrong', 'correct'));

      // Restore the state for the previous question
      const prevAnswer = selectedAnswers[index - 1];
      if (prevAnswer) {
        if (prevAnswer.isCorrect) {
          optionRefs[prevAnswer.selected - 1].current.classList.add('correct');
        } else {
          optionRefs[prevAnswer.selected - 1].current.classList.add('wrong');
          optionRefs[quizData[index - 1].Answer - 1].current.classList.add('correct');
        }
        setLock(true);
      }
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
      const timer = setInterval(() => setTotalTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [totalTimeLeft, result]);

  // Format time to display as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="quiz-app bg-gray-100 min-h-screen flex justify-center items-center p-4">
      {isQuizStarted ? (
        <div className="container bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-center mb-4">Driving School Quiz Test</h1>
          <hr className="border-gray-300 mb-4" />
          {result ? (
            <>
              <h2 className="text-xl font-bold text-center">
                You Scored {score} out of {quizData.length}
              </h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition"
                onClick={reset}
              >
                Reset
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-4">{index + 1}. {Question.question}</h3>
              {imageMap[Question.imageId] && (
                <div className="image-container flex justify-center mb-4">
                  <img
                    src={imageMap[Question.imageId]}
                    alt={Question.alt}
                    className="question-image w-48 h-48 object-contain"
                  />
                </div>
              )}
              <ul className="space-y-2 mb-4">
                {['option1', 'option2', 'option3', 'option4'].map((option, i) => (
                  <li
                    key={i}
                    ref={optionRefs[i]}
                    className="cursor-pointer p-2 border rounded hover:bg-gray-200"
                    onClick={(e) => checkAns(e, i + 1)}
                  >
                    {Question[option]}
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold text-gray-700 mb-4">
                Total Time Left: {formatTime(totalTimeLeft)}
              </div>
              <div className="quiz-navigation flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={index === 0}
                  className={`px-4 py-2 rounded ${index === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} transition`}
                >
                  Previous
                </button>
                {index < quizData.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!lock}
                    className={`px-4 py-2 rounded ${!lock ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} transition`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => setResult(true)}
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Submit
                  </button>
                )}
              </div>
              <div className="text-gray-500 text-sm mt-4 text-center">
                Question {index + 1} of {quizData.length}
              </div>
            </>
          )}
        </div>
      ) : (
        <Home startQuiz={startQuiz} />
      )}
    </div>
  );
}

export default Quiz;

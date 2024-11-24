import  { useState, useEffect, useRef } from 'react';
import { quizData } from '../../data/quizData';
import Home from './Home';

// Importing image assets
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
  const INITIAL_TIME = 180; // 3 minutes
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalTimeLeft, setTotalTimeLeft] = useState(INITIAL_TIME);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const Question = quizData[index];

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
  const startQuiz = () => setIsQuizStarted(true);

  // Function to check the answer selected by the user
  const checkAns = (e, answer) => {
    if (!lock) {
      const isCorrect = Question.Answer === answer;
      setSelectedAnswers((prev) => ({
        ...prev,
        [index]: { selected: answer, isCorrect },
      }));

      if (isCorrect) {
        e.target.classList.add('bg-green-500', 'text-white');
        setScore(score + 10);
      } else {
        e.target.classList.add('bg-red-500', 'text-white');
        optionRefs[Question.Answer - 1].current.classList.add('bg-green-500', 'text-white');
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
    optionRefs.forEach((option) => 
      option.current.classList.remove('bg-red-500', 'bg-green-500', 'text-white'));

    // Restore the state for the next question if already answered
    const nextAnswer = selectedAnswers[index + 1];
      if (nextAnswer) {
        if (nextAnswer.isCorrect) {
          optionRefs[nextAnswer.selected - 1].current.classList.add('bg-green-500', 'text-white');
        } else {
          optionRefs[nextAnswer.selected - 1].current.classList.add('bg-red-500', 'text-white');
          optionRefs[quizData[index + 1].Answer - 1].current.classList.add('bg-green-500', 'text-white');
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
    optionRefs.forEach((option) => option.current.classList.remove('bg-red-500', 'text-white', 'bg-green-500', 'text-white'));

    // Restore the state for the previous question
    const prevAnswer = selectedAnswers[index - 1];
    if (prevAnswer) {
      if (prevAnswer.isCorrect) {
        optionRefs[prevAnswer.selected - 1].current.classList.add('bg-green-500', 'text-white');
      } else {
        optionRefs[prevAnswer.selected - 1].current.classList.add('bg-red-500', 'text-white');
        optionRefs[quizData[index - 1].Answer - 1].current.classList.add('bg-green-500', 'text-white');
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
    setTotalTimeLeft(INITIAL_TIME);
    setSelectedAnswers({});
    setIsQuizStarted(false);
  };

  useEffect(() => {
    if (totalTimeLeft === 0) {
      // Show an alert when the time is over
    window.alert("Time is over! Submitting your quiz.");
      setResult(true);
    } else if (!result) {
      const timer = setInterval(() => setTotalTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [totalTimeLeft, result]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="quiz-app bg-gray-100 min-h-screen p-6 flex justify-center items-center">
      {isQuizStarted ? (
        <div className="quiz-container bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl relative">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Driving School Quiz</h1>
          {result ? (
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-500">
                You Scored {score} out of {quizData.length * 10}
              </h2>
              <button
                onClick={reset}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium rounded-full shadow-md hover:scale-105 transform transition"
              >
                Reset
              </button>
              
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                {index + 1}. {Question.question}
              </h3>
              {imageMap[Question.imageId] && (
                <img
                  src={imageMap[Question.imageId]}
                  alt={Question.alt || 'Question image'}
                  className="w-40 max-w-md mx-auto rounded-lg shadow-lg mb-6"
                />
              )}
              <ul className="space-y-4">
                {['option1', 'option2', 'option3', 'option4'].map((option, i) => (
                  <li
                    key={i}
                    ref={optionRefs[i]}
                    onClick={(e) => checkAns(e, i + 1)}
                    className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow hover:bg-indigo-50 border hover:border-indigo-500 transition"
                  >
                    {Question[option]}
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-sm font-medium text-gray-600">
                 Total Time Left: <span className="text-indigo-600">{formatTime(totalTimeLeft)}</span>
              </div>
            
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={index === 0}
                  className={`px-6 py-2 ${
                    index === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-500 text-white hover:scale-105 transform transition'
                  } font-medium rounded-full shadow`}
                >
                  Previous
                </button>
                {index < quizData.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!lock}
                    className={`px-6 py-2 ${
                      !lock
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-500 text-white hover:scale-105 transform transition'
                    } font-medium rounded-full shadow`}
                  >
                    Next
                  </button>
                ):(
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
            </div>
          )}
        </div>
      ) : (
        <Home startQuiz={startQuiz} />
      )}
    </div>
  );
}

export default Quiz;

import React from 'react';

function Home({ startQuiz }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-gray-800">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center space-y-8">
        {/* Title */}
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text mb-4">
        🚗 Driving School Quiz Application 🚗
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 leading-relaxed">
          Test your knowledge of traffic rules and road safety in this fun and engaging quiz. Perfect for learning and improving your driving skills!
        </p>

        {/* Ordered List */}
        <ol className="list-decimal list-inside text-left text-lg text-gray-700 space-y-4 bg-gray-100 p-6 rounded-xl shadow-inner mx-auto">
          <li>Answer 10 interactive questions one at a time.</li>
          <li>Earn 10 points for each correct answer.</li>
          <li>Choose the best option for each question.</li>
          <li>Review your results and improve your skills.</li>
        </ol>
        
         {/* Footer */}
         <p className="text-sm text-gray-500">
          Ready to become a driving expert? Click start and begin your journey!
        </p>
        
        {/* Start Button */}
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
         <button
             onClick={startQuiz}
            className="py-4 px-8 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
  >
            Start Quiz 🚦
        </button>
</div>

        
       
      </div>
    </div>
  );
}

export default Home;

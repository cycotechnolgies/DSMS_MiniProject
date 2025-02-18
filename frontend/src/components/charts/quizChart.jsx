import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";

const QuizProgressChart = ({ userId }) => {
	const [quizResults, setQuizResults] = useState([]);

	useEffect(() => {
		const fetchQuizResults = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/api/quiz/get/${userId}`,
				);
				const formattedData = response.data.map((result, index) => ({
					quizNumber: `Quiz ${index + 1}`,
					correct: result.correctAnswers,
					incorrect: result.incorrectAnswers,
					skipped: result.skippedAnswers,
				}));

				setQuizResults(formattedData);
			} catch (error) {
				toast.error("Failed to load quiz progress ❌");
				console.error("Error fetching quiz results:", error.message);
			}
		};

		if (userId) fetchQuizResults();
	}, [userId]);

	return (
		<div className='w-full bg-white p-4 rounded-lg shadow-lg border border-gray-300 my-4'>
			<h2 className='text-xl font-semibold mb-4 text-center'>
				📈 Quiz Progress Over Time
			</h2>

			{quizResults.length > 0 ? (
				<ResponsiveContainer
					width='100%'
					height={300}>
					<LineChart data={quizResults}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='correct'
							stroke='#16A34A'
							strokeWidth={2}
						/>
						<Line
							type='monotone'
							dataKey='incorrect'
							stroke='#DC2626'
							strokeWidth={2}
						/>
						<Line
							type='monotone'
							dataKey='skipped'
							stroke='#EAB308'
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			) : (
				<p className='text-center text-gray-600'>No quiz results available.</p>
			)}
		</div>
	);
};

export default QuizProgressChart;

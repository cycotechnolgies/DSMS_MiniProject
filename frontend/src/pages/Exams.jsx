import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import examData from "../data/exams.json";
import ExamTable from "../components/ExamTable";

const Exams = () => {
	const[Exams, setExams] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	
		useEffect(() => {
					const fetchExamData = async () => {
						try {
							const response = await fetch("http://localhost:4000/api/exam/get");
							if (!response.ok) {
								throw new Error("Failed to fetch exam data");
							}
							const data = await response.json();
			
							// Transform data to fit table structure
							const formattedData = data.map((exam) => ({
								id: exam._id.$oid || exam._id,
								examid: exam.examId,
								type: exam.examType,
								exam_date: exam.examDate,
								exam_time: exam.examTime,
							}));
			
							setExams(formattedData); 
						} catch (err) {
							setError(err.message);
						} finally {
							setLoading(false);
						}
					};
			
					fetchExamData();
				}, []);
			
				if (loading)
					return <div className='text-center mt-4'>Loading exam data...</div>;
				if (error)
					return <div className='text-center text-red-500 mt-4'>Error: {error}</div>;
			

	return (
		<>
			<div className='flex h-screen overflow-hidden'>
				<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
					<div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
						<div className='sm:flex sm:justify-between sm:items-center mb-8'>
							<div className='mb-4 sm:mb-0'>
								<h1 className='text-2xl md:text-3xl text-gray-800 font-bold'>
									Exams
								</h1>
							</div>
							<button className='px-4 py-2 rounded-md bg-green-600 font-semibold text-white hover:bg-green-800'>
								<Link to='/exams/new'>New Exam</Link>
							</button>
						</div>
						{/* Pass the fetched Exams to the table */}
						<ExamTable Exams={Exams} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Exams;

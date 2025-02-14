import React, { useState } from "react";
import { Link } from "react-router-dom";
import examData from "../data/exams.json";
import ExamTable from "../components/ExamTable";

const Exams = () => {
	const[Exams, setExams] = useState(examData);
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
								<Link to='/exam/new'>New Exam</Link>
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

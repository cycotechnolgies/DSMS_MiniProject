import React, { useState } from "react";
import StudentTable from "../components/StudentTable";
import { Link } from "react-router-dom";
import studentData from "../data/sample.json";

function Student() {
	const[students, setStudents] = useState(studentData);

	return (
		<>
			<div className='flex h-screen overflow-hidden'>
				<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
					<div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
						<div className='sm:flex sm:justify-between sm:items-center mb-8'>
							<div className='mb-4 sm:mb-0'>
								<h1 className='text-2xl md:text-3xl text-gray-800 font-bold'>
									Students
								</h1>
							</div>
							<button className='px-4 py-2 rounded-md bg-green-600 font-semibold text-white hover:bg-green-800'>
								<Link to='/student/enroll?role=branch'>New Student</Link>
							</button>
						</div>
						{/* Pass the fetched students to the table */}
						<StudentTable students={students} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Student;

import React, { useState, useEffect } from "react"; 
import StudentTable from "../components/StudentTable";
import { Link } from "react-router-dom";
import studentData from "../data/sample.json";

function Student() {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchStudentData = async () => {
			try {
				const response = await fetch("http://localhost:4000/api/user/students");
				if (!response.ok) {
					throw new Error("Failed to fetch student data");
				}
				const data = await response.json();

				// Transform data to fit table structure
				const formattedData = data.map((student) => ({
					id: student._id.$oid || student._id,
					uid: student.userId,
					name: `${student.firstName} ${student.lastName}`,
					email: student.email,
					contactNo: student.contactNo,
				}));

				setStudents(formattedData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchStudentData();
	}, []);

	if (loading)
		return <div className='text-center mt-4'>Loading student data...</div>;
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

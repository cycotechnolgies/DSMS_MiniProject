import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ExamStuTable from "../../components/examStudent";

const ExamView = () => {
	const { id } = useParams();
	const [classData, setClassData] = useState(null);
	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchExamDetails = async () => {
			try {
				setIsLoading(true);

				const response = await axios.get(
					`http://localhost:4000/api/exam/get/${id}`,
				);

				setClassData(response.data);

				const studentsData = response.data.students || [];

				// Log students data for debugging
				console.log("studentsData", studentsData);

				const formattedStudents = studentsData.map((student) => ({
					id: student.studentId._id.$oid || student.studentId._id,
					uid: student.studentId.userId,
					name: student.studentId.fullName,
					result: student.result,
				}));

				// Log formatted students
				console.log("formatted students: ", formattedStudents);

				setStudents(formattedStudents);
			} catch (error) {
				toast.error("Failed to load class details");
			} finally {
				setIsLoading(false);
			}
		};

		fetchExamDetails();
	}, [id]);

	// Loading state
	if (isLoading)
		return <div className='text-center mt-4'>Loading exam details...</div>;

	// If no class data is available, show an error message
	if (!classData)
		return (
			<div className='text-center mt-4 text-red-600'>Exam data not found.</div>
		);

	return (
		<div className='p-6 space-y-2'>
			<h1 className='text-2xl font-bold uppercase bg-blue-600 text-white text-center py-2 rounded-lg'>
				{classData.examName || "Exam Details"}
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4 bg-white/50 p-4'>
				<div>
					<strong>Branch:</strong> {classData.branch || "N/A"}
				</div>
				<div>
					<strong>Vehicle Class:</strong> {classData.vehiClass || "N/A"}
				</div>
				<div>
					<strong>Date:</strong> {classData.examDate || "N/A"}
				</div>
				<div>
					<strong>Time:</strong> {classData.examTime || "N/A"}
				</div>
				<div>
					<strong>Type:</strong> {classData.examType || "N/A"}
				</div>
			</div>

			<h2 className='text-xl font-semibold mt-4 bg-blue-200 p-2 uppercase'>
				Students
			</h2>
			<div>
				<ExamStuTable
					studentData={students}
					ScheduleId={classData._id}
				/>
			</div>

			<Toaster />
		</div>
	);
};

export default ExamView;

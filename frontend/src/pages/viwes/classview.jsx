import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ClassStuTable from "../../components/classStudent";

const classview = () => {
	const { id } = useParams();
	const [classData, setClassData] = useState(null);
	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchClassDetails = async () => {
			try {
                setIsLoading(true);

				const response = await axios.get(
					`http://localhost:4000/api/class/get/${id}`,
				);

                setClassData(response.data);

                const studentsData = response.data.students || [];

                console.log('studentsData',studentsData);

                const formattedstudents = studentsData.map((students) => ({
									id: students.studentId._id.$oid || students.studentId._id,
									uid: students.studentId.userId,
									name: students.studentId.fullName,
									score: students.score,
								}));
                console.log("formated : ",formattedstudents);

				setStudents(formattedstudents);
			} catch (error) {
				toast.error("Failed to load class details");
			}finally{
                setIsLoading(false);
            }
		};
		fetchClassDetails();
	}, [id]);

    console.log("students",students);

    if (isLoading)
			return <div className='text-center mt-4'>Loading staff data...</div>;

			return (
                <div className='p-6 space-y-2'>
					<h1 className='text-2xl font-bold uppercase bg-blue-600 text-white text-center py-2 rounded-lg'>
						{classData.className}
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4 bg-white/50 p-4'>
						<div>
							<strong>Branch:</strong> {classData.branch}
						</div>
						<div>
							<strong>Vehicle Class:</strong> {classData.vehiClass}
						</div>
						<div>
							<strong>Date:</strong> {classData.classDate}
						</div>
						<div>
							<strong>Time:</strong> {classData.classTime}
						</div>
						<div>
							<strong>Instructor:</strong> {classData.instructor.fullName}
						</div>
					</div>

					<h2 className='text-xl font-semibold mt-4 bg-blue-200 p-2 uppercase'>
						Students
					</h2>
					<div>
						<ClassStuTable
							studentData={students}
							ScheduleId={classData._id}
						/>
					</div>
					<Toaster />
				</div>
			);
};

export default classview;

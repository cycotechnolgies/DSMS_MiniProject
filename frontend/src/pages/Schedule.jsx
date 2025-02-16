import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import classData from "../data/class.json";
import TrainTable from "../components/TrainTable";

const Schedule = () => {
	const [Schedules, setSchedules] = useState([]);
	const [loading, setLoading] = useState(true);
		const [error, setError] = useState("");
	
		useEffect(() => {
			const fetchClassData = async () => {
				try {
					const response = await fetch("http://localhost:4000/api/class/get");
					if (!response.ok) {
						throw new Error("Failed to fetch Class data");
					}
					const data = await response.json();
	
					// Transform data to fit table structure
					const formattedData = data.map((schedule) => ({
						id: schedule._id.$oid || schedule._id,
						classid: schedule.classId,
						name: schedule.className,
						class_date: schedule.classDate,
						class_time: schedule.classTime,
						count: schedule.studentCount,
					}));
	
					setSchedules(formattedData); 
				} catch (err) {
					setError(err.message);
				} finally {
					setLoading(false);
				}
			};
	
			fetchClassData();
		}, []);
	
		if (loading)
			return <div className='text-center mt-4'>Loading Class data...</div>;
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
									Training Class
								</h1>
							</div>
							<button className='px-4 py-2 rounded-md bg-green-600 font-semibold text-white hover:bg-green-800'>
								<Link to='/class/new'>New Class</Link>
							</button>
						</div>
						{/* Pass the fetched class to the table */}
						<TrainTable Schedules={Schedules} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Schedule;

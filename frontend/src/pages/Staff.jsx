import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StaffTable from "../components/StaffTable";
import staffData from "../data/sample.json";

function Staff() {
	const [Staffs, setStaffs] = useState([]); // Start with an empty array for staff
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchStaffData = async () => {
			try {
				const response = await fetch("http://localhost:4000/api/user/staff");
				if (!response.ok) {
					throw new Error("Failed to fetch staff data");
				}
				const data = await response.json();

				// Transform data to fit table structure
				const formattedData = data.map((staff) => ({
					id: staff._id.$oid || staff._id,
					name: `${staff.firstName} ${staff.lastName}`,
					email: staff.email,
					nic: staff.nic,
					contactNo: staff.contactNo,
				}));

				setStaffs(formattedData); // Set transformed data
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchStaffData();
	}, []);

	if (loading)
		return <div className='text-center mt-4'>Loading staff data...</div>;
	if (error)
		return <div className='text-center text-red-500 mt-4'>Error: {error}</div>;

	return (
		<div className='flex h-screen overflow-hidden'>
			<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
				<div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
					<div className='sm:flex sm:justify-between sm:items-center mb-8'>
						<div className='mb-4 sm:mb-0'>
							<h1 className='text-2xl md:text-3xl text-gray-800 font-bold'>
								Staff
							</h1>
						</div>
						<button className='px-4 py-2 rounded-md bg-green-600 font-semibold text-white hover:bg-green-800'>
							<Link to='/staff/enroll'>
							Add Staff
							</Link>
						</button>
					</div>
					{/* Pass the fetched Staffs to the table */}
					<StaffTable Staffs={Staffs} />
				</div>
			</div>
		</div>
	);
}

export default Staff;

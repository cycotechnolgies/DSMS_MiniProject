import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MediData from "../data/medi.json";
import RenewTable from "../components/RenewTable";

const Renewal = () => {
	const[Renews, setRenews] = useState(MediData);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchRenewalData = async () => {
			try {
				const response = await fetch(
					"http://localhost:4000/api/renewal/get-renewal",
				);
				if (!response.ok) {
					throw new Error("Failed to fetch Renewal data");
				}
				const data = await response.json();

				// Transform data to fit table structure
				const formattedData = data.map((renewal) => ({
					id: renewal._id.$oid || renewal._id,
					reId: renewal.RenewId,
					name: renewal.fullName,
					reType: renewal.LicenceType,
					status: renewal.renewState,
				}));

				setRenews(formattedData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRenewalData();
	}, []);

	if (loading)
		return <div className='text-center mt-4'>Loading Renewal data...</div>;
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
									Renew Requests
								</h1>
							</div>
							<button className='px-4 py-2 rounded-md bg-green-600 font-semibold text-white hover:bg-green-800'>
								<Link to='/renew/new'>New Renew</Link>
							</button>
						</div>
						{/* Pass the fetched Renewal to the table */}
						<RenewTable Renews={Renews} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Renewal
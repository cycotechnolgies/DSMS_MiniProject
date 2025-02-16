import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MedicalTable from "../components/MedicalTable";

const Medical = () => {
    const [Medicals, setMedicals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
			const fetchMediData = async () => {
				try {
					const response = await fetch(
						"http://localhost:4000/api/medi/get-medi",
					);
					if (!response.ok) {
						throw new Error("Failed to fetch medical data");
					}
					const data = await response.json();

					console.log("Fetched data:", data);

					if (!Array.isArray(data)) {
						throw new Error("Invalid data format: Expected an array");
					}

					const formattedData = data.map((medi) => ({
						id: medi._id?.$oid || medi._id,
						mid: medi.mediId,
						name: `${medi.firstName} ${medi.lastName}`,
						req_date: medi.req_date
							? new Date(medi.req_date).toISOString().split("T")[0]
							: "N/A",
						status: medi.status,
					}));

					setMedicals(formattedData);
				} catch (err) {
					console.error("Error fetching medical data:", err);
					setError(err.message);
				} finally {
					setLoading(false);
				}
			};

			fetchMediData();
		}, []);


    if (loading)
        return <div className='text-center mt-4'>Loading Medical data...</div>;
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
                                    Medicals
                                </h1>
                            </div>
                            <button className='px-4 py-2 rounded-md bg-green-600 font-semibold text-white hover:bg-green-800'>
                                <Link to='/medi/new'>New Medical</Link>
                            </button>
                        </div>
                        {/* Pass the fetched medical to the table */}
                        <MedicalTable Medicals={Medicals} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Medical;

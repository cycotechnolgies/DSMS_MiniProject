import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import payData from "../data/pay.json";
import PaymentTable from "../components/PaymentTable";

const Payment = () => {
	const[Payments, setPayments] = useState([]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	//function to get data from the backend
	useEffect(() => {
		const fetchStaffData = async () => {
			try {
				const response = await fetch("http://localhost:4000/api/pay/get-all");
				if (!response.ok) {
					throw new Error("Failed to fetch Payment data");
				}
				const data = await response.json();

				// Transform data to fit table structure
				const formattedData = data.map((Payments) => ({
					id: Payments._id.$oid || Payments._id,
					uid: Payments.userId,
					pay_id: Payments.payId,
					amount: Payments.amount,
					status: Payments.status,
				}));

				setPayments(formattedData); 
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchStaffData();
	}, []);

	if (loading)
		return <div className='text-center mt-4'>Loading Payments data...</div>;
	if (error)
		return <div className='text-center text-red-500 mt-4'>Error: {error}</div>;

	const handleNavigate = () => {
		const role = "branch";
		navigate(`/pay/new?role=${role}`);
	};

	return (
		<>
			<div className='flex h-screen overflow-hidden'>
				<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
					<div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
						<div className='sm:flex sm:justify-between sm:items-center mb-8'>
							<div className='mb-4 sm:mb-0'>
								<h1 className='text-2xl md:text-3xl text-gray-800 font-bold'>
									Payments
								</h1>
							</div>
							<div className='space-x-4'>
								<button
									onClick={handleNavigate}
									className='px-4 py-2 rounded-md bg-green-600 font-semibold text-white hover:bg-green-800'>
									New Payment
								</button>
							</div>
						</div>
						{/* Pass the fetched Payments to the table */}
						<PaymentTable Payments={Payments} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaaymentView = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [payment, setPayment] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// useEffect(() => {
	// 	const fetchPaymentDetails = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				`http://localhost:4000/api/payment/${id}`,
	// 			);
	// 			setPayment(response.data);
	// 		} catch (err) {
	// 			setError("Failed to fetch payment details.");
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchPaymentDetails();
	// }, [id]);

	// if (loading) return <p className='text-center text-gray-600'>Loading...</p>;
	// if (error) return <p className='text-center text-red-600'>{error}</p>;

	return (
		<div className='max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
			<h1 className='text-2xl font-bold text-gray-800 mb-4'>Payment Details</h1>
			<div className='grid grid-cols-2 gap-4'>
				<p>
					<strong>Student ID:</strong> {payment.stu_id}
				</p>
				<p>
					<strong>Branch:</strong> {payment.branch}
				</p>
				<p>
					<strong>Amount (Rs.):</strong> {payment.amount}
				</p>
				<p>
					<strong>Reason:</strong> {payment.reason}
				</p>
				<p>
					<strong>Status:</strong> {payment.status}
				</p>
				{payment.description && (
					<p>
						<strong>Description:</strong> {payment.description}
					</p>
				)}
				{payment.slip && (
					<p>
						<strong>Payment Slip:</strong> <br />
						<img
							src={payment.slip}
							alt='Payment Slip'
							className='w-40 h-auto mt-2 border'
						/>
					</p>
				)}
			</div>
			<button
				onClick={() => navigate(-1)}
				className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
				Back
			</button>
		</div>
	);
};

export default PaaymentView;

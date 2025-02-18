import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";

const DailyPaymentsChart = () => {
	const [dailyPayments, setDailyPayments] = useState([]);

	useEffect(() => {
		const fetchDailyPayments = async () => {
			try {
				const response = await axios.get(
					"http://localhost:4000/api/pay/daily-payments",
				);

				// Ensure data is formatted properly
				const formattedData = response.data.map((payment) => ({
					date: payment._id, // Date (formatted YYYY-MM-DD)
					total: payment.totalAmount, // Total paid amount
				}));

				setDailyPayments([...formattedData]); // Ensure a fresh array is assigned
			} catch (error) {
				toast.error("Failed to load daily payments ❌");
				console.error("Error fetching daily payments:", error.message);
			}
		};

		fetchDailyPayments();
	}, []);

	return (
		<div className='w-full bg-white p-6 rounded-lg shadow-lg border border-gray-300 mt-6'>
			<h2 className='text-xl font-semibold mb-4 text-center'>
				📈 Daily Payment Trend
			</h2>

			{dailyPayments.length > 0 ? (
				<ResponsiveContainer
					width='100%'
					height={300}>
					<LineChart data={dailyPayments}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='date' />
						<YAxis />
						<Tooltip />
						<Line
							type='monotone'
							dataKey='total'
							stroke='#2563EB'
							strokeWidth={3}
							dot={{ r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			) : (
				<p className='text-center text-gray-600'>No payment data available.</p>
			)}
		</div>
	);
};

export default DailyPaymentsChart;

import React from 'react';
import DashboardCard01 from "../partials/DashboardCard01";
import DashboardCard02 from "../partials/DashboardCard02";
import DashboardCard03 from "../partials/DashboardCard03";
import DailyPaymentsChart from "../components/charts/paymentChart"

const Dashboard = () => {
  return (
		<div className='px-4 py-8 w-full max-w-9xl mx-auto'>
			{/* Dashboard actions */}
			<div className='sm:flex sm:justify-between sm:items-center mb-8'>
				<div className='mb-4 sm:mb-0'>
					<h1 className='text-2xl md:text-3xl text-gray-800 font-bold'>
						Dashboard
					</h1>
				</div>
			</div>

			{/* Cards */}
			<div className='grid grid-cols-12 gap-6'>
				<DashboardCard01 />
				<DashboardCard02 />
				<DashboardCard03 />
			</div>

			{/* Calendar */}
			<div>
				<DailyPaymentsChart />
			</div>
			
		</div>
	);
}

export default Dashboard
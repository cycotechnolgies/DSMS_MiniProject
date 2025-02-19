import React from 'react';

import DashboardCard04 from "../partials/DashboardCard04";
import DashboardCard05 from "../partials/DashboardCard05";
import DashboardCard06 from "../partials/DashboardCard06";

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
				<DashboardCard04 />
				<DashboardCard05 />
				<DashboardCard06 />
			</div>

			{/* Calendar */}
			
		</div>
	);
}

export default Dashboard
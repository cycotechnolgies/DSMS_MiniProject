import React, { useState } from "react";
import ProfileImg from "../images/m1.jpg";

function DashboardHeader({ setSidebarOpen }) {
	return (
		<>
			<nav className='bg-white border-gray-200'>
				<div className='max-w-screen-xl flex flex-wrap items-center md:justify-end justify-between mx-auto p-4'>
					<button
						data-collapse-toggle='navbar-user'
						type='button'
						className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
						aria-controls='navbar-user'
						onClick={() => setSidebarOpen((prev) => !prev)}>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='w-5 h-5'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 17 14'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M1 1h15M1 7h15M1 13h15'
							/>
						</svg>
					</button>
					<div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
						<button
							type='button'
							className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300'
							id='user-menu-button'
							aria-expanded='false'
							aria-haspopup='true'>
							<span className='sr-only'>Open user menu</span>
							<img
								className='w-8 h-8 rounded-full'
								src={ProfileImg}
								alt='user photo'
							/>
						</button>
					</div>
				</div>
			</nav>
		</>
	);
}

export default DashboardHeader;

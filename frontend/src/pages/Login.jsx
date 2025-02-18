import React, { useState } from "react";
import loginImg from "../images/login.gif";
import validator from "validator"; // Import the validator library

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [errors, setErrors] = useState({}); // State to hold errors

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		// Clear previous errors
		setErrors({});

		// Validation logic
		let formIsValid = true;
		let errors = {};

		// Validate username (non-empty and email format)
		if (!username || !validator.isEmail(username)) {
			formIsValid = false;
			errors.username = "Please enter a valid email address.";
		}

		// Validate password (non-empty)
		if (!password || password.length < 6) {
			formIsValid = false;
			errors.password = "Password must be at least 6 characters long.";
		}

		if (!formIsValid) {
			setErrors(errors);
			return;
		}

		// Handle login logic here if form is valid
		console.log("Logging in with:", { username, password, rememberMe });
	};

	return (
		<div className='bg-gray-100 flex justify-center items-center h-screen'>
			{/* Left: Image */}
			<div className='w-1/2 h-screen hidden lg:block'>
				<img
					src={loginImg}
					alt='Placeholder Image'
					className='object-cover w-full h-full'
				/>
			</div>
			{/* Right: Login Form */}
			<div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
				<h1 className='text-3xl text-center font-semibold mb-4'>Login</h1>
				<form onSubmit={handleLoginSubmit}>
					{/* Username Input */}
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block text-gray-600'>
							Username
						</label>
						<input
							type='text'
							id='username'
							name='username'
							className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoComplete='off'
						/>
						{errors.username && (
							<p className='text-red-500 text-sm'>{errors.username}</p>
						)}
					</div>
					{/* Password Input */}
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-gray-600'>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete='off'
						/>
						{errors.password && (
							<p className='text-red-500 text-sm'>{errors.password}</p>
						)}
					</div>

					{/* Login Button */}
					<button
						type='submit'
						className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
						Login
					</button>
				</form>
				{/* Sign up Link */}
				<div className='mt-6 text-blue-500 text-center'>
					<a
						href='/signup'
						className='hover:underline'>
						Sign up Here
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;

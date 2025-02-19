import React from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import loginImg from "../images/login.gif";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Make sure to import jwt-decode

const validateEmail = (email) => validator.isEmail(email);
const validatePassword = (password) => validator.isLength(password, { min: 6 });

const Login = ({ setUser, navigateBasedOnRole }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		if (!validateEmail(data.email)) {
			setError("email", { type: "auto", message: "Invalid email format" });
			return;
		}
		if (!validatePassword(data.password)) {
			setError("password", {
				type: "auto",
				message: "Password must be at least 6 characters long",
			});
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:4000/api/auth/login",
				data,
			);

			if (response.status === 200) {
				// Save token and role to localStorage
				const { token, userType } = response.data;

				localStorage.setItem("token", token);
				 // Storing role in localStorage

				toast.success("Login successful!");

				// Decode the token to get the user info (optional, depending on your backend response)
				const decodedToken = jwtDecode(token);
				localStorage.setItem("role", decodedToken.userType);
				console.log(decodedToken); // You can check the contents of the decoded token

				// Set the user role in state
				setUser({ isAuthenticated: true, role: userType });

				// Navigate based on role
				navigateBasedOnRole(decodedToken.userType); // Use the role for navigation
			}
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Login failed, please try again.",
			);
		}
	};

	return (
		<div className='bg-gray-100 flex justify-center items-center h-screen'>
			<div className='w-1/2 h-screen hidden lg:block'>
				<img
					src={loginImg}
					alt='Login'
					className='object-cover w-full h-full'
				/>
			</div>
			<div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
				<h1 className='text-3xl text-center font-semibold mb-4'>Login</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-600'>
							Email
						</label>
						<input
							type='text'
							id='email'
							{...register("email")}
							className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
							autoComplete='off'
						/>
						{errors.email && (
							<p className='text-red-500 text-sm'>{errors.email.message}</p>
						)}
					</div>
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-gray-600'>
							Password
						</label>
						<input
							type='password'
							id='password'
							{...register("password")}
							className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
							autoComplete='off'
						/>
						{errors.password && (
							<p className='text-red-500 text-sm'>{errors.password.message}</p>
						)}
					</div>
					<button
						type='submit'
						className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
						Login
					</button>
				</form>
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

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddClass() {
	const [isLoading, setIsLoading] = useState(false);
	const [instructors, setInstructors] = useState([]); // State for instructors
	const [selectedStudents, setSelectedStudents] = useState([]); // State for selected students
	const [searchTerm, setSearchTerm] = useState(""); // State for search term
	const [searchResults, setSearchResults] = useState([]); // State for search results

	const { id } = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm();

	// Fetch instructors on component mount
	useEffect(() => {
		const fetchInstructors = async () => {
			try {
				const response = await axios.get(
					"http://localhost:4000/api/instructors",
				);
				setInstructors(response.data);
			} catch (error) {
				toast.error("Failed to fetch instructors");
			}
		};

		fetchInstructors();
	}, []);

	// Handle search for students
	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(
				`http://localhost:4000/api/students/search?name=${searchTerm}`,
			);
			setSearchResults(response.data);
		} catch (error) {
			toast.error("Failed to search students");
		}
	};

	// Add a student to the selected list
	const addStudent = (student) => {
		setSelectedStudents([...selectedStudents, student]);
		setSearchResults([]); // Clear search results
		setSearchTerm(""); // Clear search term
	};

	// Handle form submission
	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const formData = {
				...data,
				students: selectedStudents.map((student) => student._id), // Include selected student IDs
			};

			if (id) {
				// Edit class logic
				const response = await axios.put(
					`http://localhost:4000/api/class/edit-class/${id}`,
					formData,
				);
				toast.success(response.data.message || "Class updated successfully");
				navigate("/classes");
			} else {
				// Add class logic
				const response = await axios.post(
					"http://localhost:4000/api/class/add",
					formData,
				);
				toast.success(response.data.message || "Class added successfully");
				navigate("/classes");
			}
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				"An error occurred during the operation";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex h-screen overflow-hidden'>
			{/* Content area */}
			<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
				<main className='grow'>
					<div className='px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto'>
						<h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
							{id ? "Update Class" : "New Class"}
						</h1>

						<form
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								{/* Class Name */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Class Name <span className='text-red-600 font-bold'>*</span>
									</label>
									<input
										type='text'
										{...register("className", {
											required: "Class name is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Enter Class name'
									/>
									{errors.className && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.className.message}
										</p>
									)}
								</div>

								{/* Branch */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Branch <span className='text-red-600 font-bold'>*</span>
									</label>
									<select
										{...register("branch", {
											required: "Branch is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select a Branch</option>
										<option value='Colombo'>Colombo</option>
										<option value='Gampaha'>Gampaha</option>
										<option value='Galle'>Galle</option>
									</select>
									{errors.branch && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.branch.message}
										</p>
									)}
								</div>

								{/* Vehicle Class */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Vehicle Class{" "}
										<span className='text-red-600 font-bold'>*</span>
									</label>
									<select
										{...register("vehiClass", {
											required: "Vehicle Class is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Vehicle Class</option>
										<option value='Light Vehicle'>Light Vehicle</option>
										<option value='Heavy Vehicle'>Heavy Vehicle</option>
									</select>
									{errors.vehiClass && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.vehiClass.message}
										</p>
									)}
								</div>

								{/* Class Date */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Date <span className='text-red-600 font-bold'>*</span>
									</label>
									<input
										type='date'
										{...register("classDate", {
											required: "Class Date is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
									/>
									{errors.classDate && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.classDate.message}
										</p>
									)}
								</div>

								{/* Class Time */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Time <span className='text-red-600 font-bold'>*</span>
									</label>
									<input
										type='time'
										{...register("classTime", {
											required: "Class Time is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
									/>
									{errors.classTime && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.classTime.message}
										</p>
									)}
								</div>

								{/* Instructor */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Instructor <span className='text-red-600 font-bold'>*</span>
									</label>
									<select
										{...register("Instructor", {
											required: "Instructor is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Instructor</option>
										{instructors.map((instructor) => (
											<option
												key={instructor._id}
												value={instructor.name}>
												{instructor.name}
											</option>
										))}
									</select>
									{errors.Instructor && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.Instructor.message}
										</p>
									)}
								</div>
							</div>

							{/* Add Students Section */}
							<div>
								<label className='block text-gray-700 font-medium mb-1'>
									Add Students <span className='text-red-600 font-bold'>*</span>
								</label>
								<div className='flex'>
									<input
										type='text'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Search students by name or ID'
									/>
									<button
										onClick={handleSearch}
										className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2'>
										Search
									</button>
								</div>
								{searchResults.length > 0 && (
									<ul className='mt-2 border border-gray-300 rounded'>
										{searchResults.map((student) => (
											<li
												key={student._id}
												className='p-2 hover:bg-gray-100 flex justify-between items-center'>
												<span>{student.name}</span>
												<button
													onClick={() => addStudent(student)}
													className='bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600'>
													Add
												</button>
											</li>
										))}
									</ul>
								)}
							</div>

							{/* Display Selected Students */}
							<div className='mt-4'>
								<h2 className='text-lg font-bold text-gray-800'>
									Selected Students
								</h2>
								<ul className='mt-2'>
									{selectedStudents.map((student) => (
										<li
											key={student._id}
											className='p-2 border border-gray-300 rounded mb-2'>
											{student.name}
										</li>
									))}
								</ul>
							</div>

							{/* Buttons */}
							<div className='flex justify-end items-center gap-4'>
								<button
									type='button'
									onClick={() => reset()}
									className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600'>
									Reset
								</button>
								<button
									type='submit'
									disabled={isLoading}
									className={`${
										isLoading
											? "bg-gray-400"
											: "bg-green-600 hover:bg-green-700"
									} text-white py-2 px-4 rounded`}>
									{isLoading ? "Submitting..." : "Submit"}
								</button>
							</div>
						</form>
						<Toaster />
					</div>
				</main>
			</div>
		</div>
	);
}

export default AddClass;

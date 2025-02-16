import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddClass() {
	const [isLoading, setIsLoading] = useState(false);
	const [instructors, setInstructors] = useState([]);
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const { id } = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	// Fetch class details if editing
	useEffect(() => {
		if (id) {
			const fetchClassDetails = async () => {
				try {
					const response = await axios.get(
						`http://localhost:4000/api/class/get/${id}`,
					);
					const classData = response.data;
					console.log(response);

					reset(classData);

					setSelectedStudents(classData.students || []);
					setInstructors(classData.instructors || []);

					console.log(selectedStudents);
				} catch (error) {
					toast.error("Failed to load class details");
				}
			};
			fetchClassDetails();
		}
	}, [id, reset]);

	// Fetch instructors from the backend
	useEffect(() => {
		const fetchInstructors = async () => {
			try {
				const response = await axios.get(
					"http://localhost:4000/api/user/instructors",
				);
				setInstructors(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Failed to fetch instructors", error);
			}
		};

		fetchInstructors();
	}, []);

	// Fetch class details if editing
	useEffect(() => {
		if (id) {
			const fetchClassDetails = async () => {
				try {
					const response = await axios.get(
						`http://localhost:4000/api/class/${id}`,
					);
					const classData = response.data;
					reset(classData);
					setSelectedStudents(classData.students || []);
				} catch (error) {
					toast.error("Failed to load class details");
				}
			};
			fetchClassDetails();
		}
	}, [id, reset]);

	// Handle student search
	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(
				`http://localhost:4000/api/user/students/search?terms=${searchTerm}`,
			);
			setSearchResults(response.data);
		} catch (error) {
			toast.error("Failed to search students");
		}
	};

	// Add student to the selected list
	const addStudent = (student) => {
		if (!selectedStudents.find((s) => s._id === student._id)) {
			setSelectedStudents([...selectedStudents, student]);
		}
		setSearchResults([]);
		setSearchTerm("");
	};

	// Remove student from the selected list
	const removeStudent = (studentId) => {
		setSelectedStudents(selectedStudents.filter((s) => s._id !== studentId));
	};

	// Handle form submission
	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const formData = {
				instructor: data.instructor,
				students: selectedStudents.map((student) => ({
					studentId: student._id,
				})),
				...data,
			};

			console.log(formData);

			if (id) {
				// Update class (schedule)
				const response = await axios.put(
					`http://localhost:4000/api/class/edit/${id}`,
					formData,
				);
				toast.success(response.data.message || "Class updated successfully");
			} else {
				// Create new class (schedule)
				const response = await axios.post(
					"http://localhost:4000/api/class/add",
					formData,
				);
				toast.success(response.data.message || "Schedule created successfully");
			}

			navigate("/class"); 
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex h-screen overflow-hidden'>
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
									<label className='block font-medium'>Class Name *</label>
									<input
										type='text'
										{...register("className", {
											required: "Class name is required",
										})}
										className='w-full p-2 border rounded'
										placeholder='Enter Class name'
									/>
									{errors.className && (
										<p className='text-red-500'>{errors.className.message}</p>
									)}
								</div>

								{/* Branch */}
								<div>
									<label className='block font-medium'>Branch *</label>
									<select
										{...register("branch", { required: "Branch is required" })}
										className='w-full p-2 border rounded'>
										<option value=''>Select a Branch</option>
										<option value='Colombo'>Colombo</option>
										<option value='Gampaha'>Gampaha</option>
										<option value='Galle'>Galle</option>
									</select>
									{errors.branch && (
										<p className='text-red-500'>{errors.branch.message}</p>
									)}
								</div>

								{/* Vehicle Class */}
								<div>
									<label className='block font-medium'>Vehicle Class *</label>
									<select
										{...register("vehiClass", {
											required: "Vehicle Class is required",
										})}
										className='w-full p-2 border rounded'>
										<option value=''>Select Vehicle Class</option>
										<option value='Light Vehicle'>Light Vehicle</option>
										<option value='Heavy Vehicle'>Heavy Vehicle</option>
									</select>
									{errors.vehiClass && (
										<p className='text-red-500'>{errors.vehiClass.message}</p>
									)}
								</div>

								{/* Instructor Dropdown */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Instructor <span className='text-red-600 font-bold'>*</span>
									</label>
									<select
										{...register("instructor", {
											required: "Instructor is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Instructor</option>
										{instructors.map((instructor) => (
											<option
												key={instructor._id}
												value={instructor._id}>
												{instructor.fullName}
											</option>
										))}
									</select>
									{errors.instructor && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.instructor.message}
										</p>
									)}
								</div>
								{/* Class date */}
								<div>
									<label className='block font-medium'>Date *</label>
									<input
										type='date'
										{...register("classDate", {
											required: "Class Date is required",
										})}
										className='w-full p-2 border rounded'
										placeholder='Enter Class date'
									/>
									{errors.classDate && (
										<p className='text-red-500'>{errors.classDate.message}</p>
									)}
								</div>
								{/* Class date */}
								<div>
									<label className='block font-medium'>Time *</label>
									<input
										type='Time'
										{...register("classTime", {
											required: "Class Time is required",
										})}
										className='w-full p-2 border rounded'
										placeholder='Enter Class Time'
									/>
									{errors.classTime && (
										<p className='text-red-500'>{errors.classTime.message}</p>
									)}
								</div>
							</div>

							{/* Student Search */}
							<div>
								<label className='block font-medium'>Add Students *</label>
								<div className='flex'>
									<input
										type='text'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className='w-full p-2 border rounded'
										placeholder='Search students...'
									/>
									<button
										onClick={handleSearch}
										className='bg-blue-500 text-white px-4 rounded ml-2'>
										Search
									</button>
								</div>
								{searchResults.map((student) => (
									<div
										key={student._id}
										className='p-2 border flex justify-between items-center'>
										<span>{student.userId}</span>
										<span>{student.fullName}</span>
										<button
											onClick={() => addStudent(student)}
											className='bg-green-500 text-white px-2 rounded'>
											Add
										</button>
									</div>
								))}
							</div>

							{/* Selected Students */}
							<ul>
								{selectedStudents.map((student) => (
									<li
										key={student._id}
										className='flex justify-between border p-2 mt-2'>
										<span>{student.userId}</span>
										<span>{student.fullName}</span>
										<button
											onClick={() => removeStudent(student._id)}
											className='text-red-600'>
											Remove
										</button>
									</li>
								))}
							</ul>

							{/* Submit Button */}
							<button
								type='submit'
								disabled={isLoading}
								className='bg-green-600 text-white py-2 px-4 rounded'>
								{isLoading ? "Submitting..." : "Submit"}
							</button>
						</form>
						<Toaster />
					</div>
				</main>
			</div>
		</div>
	);
}

export default AddClass;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddExam() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const { id } = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (id) {
			const fetchExamDetails = async () => {
				try {
					const response = await axios.get(
						`http://localhost:4000/api/exam/get/${id}`,
					);
					const examData = response.data;
					console.log(examData);

					// Normalize students data
					const normalizedStudents = examData.students.map((student) => ({
						_id: student.studentId._id,
						fullName: student.studentId.fullName,
						userId: student.studentId.userId,
					}));

					console.log("normalized students", normalizedStudents);

					setSelectedStudents(normalizedStudents || []);
					reset(examData);

				} catch (error) {
					toast.error("Failed to load exam details");
				}
			};
			fetchExamDetails();
		}
	}, [id, reset]);

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

	const addStudent = (student) => {
		if (!selectedStudents.find((s) => s._id === student._id)) {
			setSelectedStudents([...selectedStudents, student]);
		}
		setSearchResults([]);
		setSearchTerm("");
	};

	const removeStudent = (studentId) => {
		setSelectedStudents((prevStudents) =>
			prevStudents.filter((s) => s._id !== studentId),
		);
	};

	const handleSubmitForm = async (data) => {
		setIsLoading(true);
		try {
			const formData = {
				...data,
				students: selectedStudents.map((student) => ({
					studentId: student._id,
					result: "N/A",
				})),
			};

			console.log(formData);

			if (id) {
				await axios.put(`http://localhost:4000/api/exam/edit/${id}`, formData);
				toast.success("Exam updated successfully");
			} else {
				await axios.post("http://localhost:4000/api/exam/add", formData);
				toast.success("Exam created successfully");
			}

			navigate("/exams");
		} catch (error) {
			toast.error("An error occurred while processing");
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
							onSubmit={handleSubmit(handleSubmitForm)}
							noValidate
							className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								{/* exam Name */}
								<div>
									<label className='block font-medium'>Exam Name *</label>
									<input
										type='text'
										{...register("examName", {
											required: "Exam name is required",
										})}
										className='w-full p-2 border rounded'
										placeholder='Enter Exam name'
									/>
									{errors.examName && (
										<p className='text-red-500'>{errors.examName.message}</p>
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

								{/* Vehicle Class */}
								<div>
									<label className='block font-medium'>Exam Type *</label>
									<select
										{...register("examType", {
											required: "Exam Type is required",
										})}
										className='w-full p-2 border rounded'>
										<option value=''>Select Vehicle Class</option>
										<option value='Trial'>Trial</option>
										<option value='Written'>Written</option>
									</select>
									{errors.examType && (
										<p className='text-red-500'>{errors.examType.message}</p>
									)}
								</div>

								{/* Class date */}
								<div>
									<label className='block font-medium'>Date *</label>
									<input
										type='date'
										{...register("examDate", {
											required: "Class Date is required",
										})}
										className='w-full p-2 border rounded'
										placeholder='Enter Class date'
									/>
									{errors.classDate && (
										<p className='text-red-500'>{errors.classDate.message}</p>
									)}
								</div>
								{/* Class Time */}
								<div>
									<label className='block font-medium'>Time *</label>
									<input
										type='Time'
										{...register("examTime", {
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
											type='button'
											onClick={() => removeStudent(student._id)}
											className='text-red-600'>
											Remove
										</button>
									</li>
								))}
							</ul>

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

export default AddExam;

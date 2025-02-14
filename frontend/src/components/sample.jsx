// Backend (Node.js + Express + MongoDB)
// Install dependencies: npm install express mongoose cors dotenv body-parser

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const TrainingClassSchema = new mongoose.Schema({
	className: String,
	date: Date,
	description: String,
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
const TrainingClass = mongoose.model("TrainingClass", TrainingClassSchema);

const StudentSchema = new mongoose.Schema({
	name: String,
	email: String,
	trainingClassId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TrainingClass",
	},
});
const Student = mongoose.model("Student", StudentSchema);

// Create training class
app.post("/training-classes", async (req, res) => {
	try {
		const trainingClass = new TrainingClass(req.body);
		await trainingClass.save();
		res.status(201).json(trainingClass);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Get all training classes
app.get("/training-classes", async (req, res) => {
	const classes = await TrainingClass.find().populate("students");
	res.json(classes);
});

// Add student to training class
app.post("/students", async (req, res) => {
	try {
		const student = new Student(req.body);
		await student.save();
		await TrainingClass.findByIdAndUpdate(student.trainingClassId, {
			$push: { students: student._id },
		});
		res.status(201).json(student);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.listen(5000, () => console.log("Server running on port 5000"));

// Frontend (React Component)
// Install dependencies: npm install axios react-hook-form @tanstack/react-table
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function TrainingClassPage() {
	const { register, handleSubmit, reset } = useForm();
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(null);
	const [students, setStudents] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/training-classes")
			.then((res) => setClasses(res.data));
	}, []);

	const createClass = (data) => {
		axios.post("http://localhost:5000/training-classes", data).then((res) => {
			setClasses([...classes, res.data]);
			reset();
		});
	};

	const addStudent = (data) => {
		axios
			.post("http://localhost:5000/students", {
				...data,
				trainingClassId: selectedClass,
			})
			.then((res) => {
				setStudents([...students, res.data]);
			});
	};

	return (
		<div className='p-4'>
			<h2 className='text-xl font-bold'>Create Training Class</h2>
			<form
				onSubmit={handleSubmit(createClass)}
				className='mb-4'>
				<input
					{...register("className")}
					placeholder='Class Name'
					className='border p-2 mr-2'
					required
				/>
				<input
					type='date'
					{...register("date")}
					className='border p-2 mr-2'
					required
				/>
				<input
					{...register("description")}
					placeholder='Description'
					className='border p-2 mr-2'
					required
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white p-2'>
					Create
				</button>
			</form>
			<h2 className='text-xl font-bold'>Training Classes</h2>
			<ul>
				{classes.map((cls) => (
					<li
						key={cls._id}
						className='p-2 border my-2'>
						{cls.className} ({cls.date})
						<button
							onClick={() => setSelectedClass(cls._id)}
							className='ml-2 text-blue-500'>
							Add Student
						</button>
					</li>
				))}
			</ul>
			{selectedClass && (
				<div>
					<h2 className='text-xl font-bold'>Add Student</h2>
					<form onSubmit={handleSubmit(addStudent)}>
						<input
							{...register("name")}
							placeholder='Student Name'
							className='border p-2 mr-2'
							required
						/>
						<input
							{...register("email")}
							placeholder='Student Email'
							className='border p-2 mr-2'
							required
						/>
						<button
							type='submit'
							className='bg-green-500 text-white p-2'>
							Add
						</button>
					</form>
				</div>
			)}
		</div>
	);
}

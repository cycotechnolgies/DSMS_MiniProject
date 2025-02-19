import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// Layout
import RootLayout from "./layouts/RootLayout";

// Protected Route for login
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import Staff from "./pages/Staff";
import Student from "./pages/Student";
import Schedule from "./pages/Schedule";
import Medical from "./pages/medical";
import Login from "./pages/Login";
import Exams from "./pages/Exams";
import Renewal from "./pages/Renewal";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import QuizPage from "./components/Quiz/Quiz/Home";
import Home from "./pages/HomePage";
import StudentDashboard from "./pages/DashboardStudent";

// Forms
import AddStaff from "./pages/forms/addStaff";
import AddStudent from "./pages/forms/addStudent";
import AddPayment from "./pages/forms/addPayment";
import AddMedical from "./pages/forms/addMedical";
import AddRenewal from "./pages/forms/addrenewal";
import AddClass from "./pages/forms/addClass";
import AddExam from "./pages/forms/addExam";

// Views
import PaaymentView from "./pages/viwes/PaymentView";
import StaffProfile from "./pages/viwes/StaffProfile";
import ClassView from "./pages/viwes/classview";
import ExamView from "./pages/viwes/examView";
import MedicalView from "./pages/viwes/MedicalView";
import StudentView from "./pages/viwes/StudentProfile";

function App() {
	const [user, setUser] = useState({
		isAuthenticated: false, // Initially, user is not authenticated
		role: "", // Role will be set after login
	});

	const navigate = useNavigate();

	// Check if token exists and set user state
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			// For now assuming the role is saved in localStorage or from backend
			const role = localStorage.getItem("role") || "guest"; // You may want to get it from API
			setUser({ isAuthenticated: true, role });
		}
	}, []);

	// Logic to navigate based on role after successful login
	const navigateBasedOnRole = (role) => {
		if (role === "staff") {
			navigate("/dashboard");
		} else if (role === "instructor") {
			navigate("/class");
		} else if (role === "Student") {
			navigate("/student-dashboard");
		} else {
			navigate("/login");
		}
	};

	return (
		<>
			<Routes>
				{/* Home page Route */}
				<Route
					path='/'
					element={<Home />}
				/>

				{/* Login & Signup routes */}
				<Route
					path='/login'
					element={
						<Login
							setUser={setUser}
							navigateBasedOnRole={navigateBasedOnRole}
						/>
					}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>

				{/* Protected Routes */}
				<Route
					path='/*'
					element={
						<ProtectedRoute user={user}>
							<RootLayout>
								<Routes>
									{/* Dashboard Routes */}
									<Route
										path='/dashboard'
										element={<Dashboard />}
									/>
									<Route
										path='/student-dashboard'
										element={<StudentDashboard />}
									/>

									{/* Other Routes */}
									<Route
										path='/students'
										element={<Student />}
									/>
									<Route
										path='/payments'
										element={<Payment />}
									/>
									<Route
										path='/staff'
										element={<Staff />}
									/>
									<Route
										path='/medicals'
										element={<Medical />}
									/>
									<Route
										path='/renew'
										element={<Renewal />}
									/>
									<Route
										path='/class'
										element={<Schedule />}
									/>
									<Route
										path='/exams'
										element={<Exams />}
									/>
									<Route
										path='/quiz'
										element={<QuizPage />}
									/>

									{/* 404 page */}
									<Route
										path='*'
										element={<PageNotFound />}
									/>

									{/* Staff sub Routes */}
									<Route
										path='/staff/enroll'
										element={<AddStaff />}
									/>
									<Route
										path='/staff/:id'
										element={<AddStaff />}
									/>
									<Route
										path='/staff/profile/:id'
										element={<StaffProfile />}
									/>

									{/* Student sub Routes */}
									<Route
										path='/student/enroll'
										element={<AddStudent />}
									/>
									<Route
										path='/student/:id'
										element={<AddStudent />}
									/>
									<Route
										path='/student/profile/:id'
										element={<StudentView />}
									/>

									{/* Payment sub Routes */}
									<Route
										path='/pay/new'
										element={<AddPayment />}
									/>
									<Route
										path='/pay/:id'
										element={<AddPayment />}
									/>
									<Route
										path='/pay/details/:id'
										element={<PaaymentView />}
									/>

									{/* Medical sub Routes */}
									<Route
										path='/medi/new'
										element={<AddMedical />}
									/>
									<Route
										path='/medi/:id'
										element={<AddMedical />}
									/>
									<Route
										path='/medi/details/:id'
										element={<MedicalView />}
									/>

									{/* Renew sub Routes */}
									<Route
										path='/renew/new'
										element={<AddRenewal />}
									/>
									<Route
										path='/renew/:id'
										element={<AddRenewal />}
									/>

									{/* Training sub Routes */}
									<Route
										path='/class/new'
										element={<AddClass />}
									/>
									<Route
										path='/class/:id'
										element={<AddClass />}
									/>
									<Route
										path='/class/view/:id'
										element={<ClassView />}
									/>

									{/* Exams sub Routes */}
									<Route
										path='/exams/new'
										element={<AddExam />}
									/>
									<Route
										path='/exams/:id'
										element={<AddExam />}
									/>
									<Route
										path='/exams/view/:id'
										element={<ExamView />}
									/>
								</Routes>
							</RootLayout>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;

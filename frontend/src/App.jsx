import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Layout
import RootLayout from './layouts/RootLayout';

//Protected Route for login
import ProtectedRoute from './components/ProtectedRoute';

//Pages
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Staff from './pages/Staff';
import Student from './pages/Student';
import Schedule from './pages/Schedule';
import Medical from './pages/medical';
import Login from './pages/Login';
import Exams from './pages/Exams';
import Renewal from "./pages/Renewal";
import Signup from './pages/Signup';
import PageNotFound from "./pages/PageNotFound";
import QuizPage from './pages/QuizPage';

//Forms
import AddStaff from './pages/forms/addStaff'
import AddStudent from './pages/forms/addStudent';
import AddPayment from "./pages/forms/addPayment";
import AddMedical from "./pages/forms/addMedical";
import AddRenewal from './pages/forms/addrenewal';
import AddClass from './pages/forms/addClass';

//Views
import PaaymentView from './pages/viwes/PaymentView';
import StaffProfile from './pages/viwes/StaffProfile';


function App() {
  const [user, setUser] = useState(null); // Replace with actual user authentication logic

  return (
		<>
			<Routes>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/*'
					element={
						<ProtectedRoute user={user}>
							<RootLayout>
								<Routes>
									<Route
										path='/'
										element={<Dashboard />}
									/>
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

									{/* staff sub Routes */}
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

									{/* student sub Routes */}
									<Route
										path='/student/enroll'
										element={<AddStudent />}
									/>
									<Route
										path='/student/:id'
										element={<AddStudent />}
									/>
									{/* <Route
										path='/student/profile/:id'
										element={<StudentProfile />}
									/> */}

									{/* payment sub Routes */}

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

									{/* medical sub Routes */}
									<Route
										path='/medi/new'
										element={<AddMedical />}
									/>
									<Route
										path='/medi/:id'
										element={<AddMedical />}
									/>
									{/* <Route
										path='/pay/details/:id'
										element={<AddMedical />}
									/> */}

									{/* renew sub Routes */}
									<Route
										path='/renew/new'
										element={<AddRenewal />}
									/>
									<Route
										path='/renew/:id'
										element={<AddRenewal />}
									/>
									{/* <Route
										path='/pay/details/:id'
										element={<AddRenewal />}
									/> */}

									{/* Training sub Routes */}
									<Route
										path='/class/new'
										element={<AddClass />}
									/>
									<Route
										path='/class/:id'
										element={<AddClass />}
									/>

									{/* <Route
										path='/pay/details/:id'
										element={<AddClass />}
									/> */}
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

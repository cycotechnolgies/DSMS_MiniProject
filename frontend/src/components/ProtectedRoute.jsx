import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Make sure to import jwt-decode

// A function to verify the token on the frontend
const verifyToken = (token) => {
	if (!token) return false;

	try {
		const decoded = jwtDecode(token); // Decode JWT
		const isExpired = decoded.exp * 1000 < Date.now(); // Check if token is expired
		return !isExpired;
	} catch (error) {
		return false;
	}
};

const ProtectedRoute = ({ user, children }) => {
	// If no user is authenticated, redirect to login page
	if (!user.isAuthenticated) {
		return <Navigate to='/login' />;
	}

	// Get token from localStorage (optional if you're already storing user role in state)
	const token = localStorage.getItem("token");

	// If token is not present or invalid, redirect to login page
	if (!verifyToken(token)) {
		return <Navigate to='/login' />;
	}

	// If the token is valid, decode it to check the user's role
	const decodedToken = jwtDecode(token);
	console.log(decodedToken);
	const userRole = decodedToken?.userType;

	// You can add further role-based protection logic here if needed

	// If the user is authenticated, render the protected route
	return children;
};

export default ProtectedRoute;

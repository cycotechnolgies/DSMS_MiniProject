import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, requiredRoles, children }) => {
  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/page-not-found" />;
  }

  return children;
};

export default ProtectedRoute;

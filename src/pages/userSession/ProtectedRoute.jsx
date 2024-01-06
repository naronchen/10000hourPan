import { Navigate } from 'react-router-dom';
import useAuth from './useAuth'; // Import your useAuth hook

const ProtectedRoute = ({ children }) => {
const { isAuthenticated, loading } = useAuth();
console.log('isAuthenticated: ', isAuthenticated);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

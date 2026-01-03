import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = () => {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	// TODO: make a better loading display
	if (isLoading) return <div>Loading...</div>;

	return user ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

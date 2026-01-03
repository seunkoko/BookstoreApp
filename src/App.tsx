import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './auth/Login';
import { BookList } from './books/BookList';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<BrowserRouter>
						<Routes>
							<Route path='/login' element={<Login />} />

							<Route element={<ProtectedRoute />}>
								<Route path='/books' element={<BookList />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;

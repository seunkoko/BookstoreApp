import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { createContext, useContext, type ReactNode } from 'react';
import { authService } from '../api/authService';
import { ACCESS_TOKEN_KEY, USER_DATA_KEY, getUserData } from '../helpers/auth';
import type { AuthContextType, LoginData, LoginResponse } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient();

	const {
		data: user,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ['authUser'],
		queryFn: authService.fetchMe,
		initialData: getUserData,
		retry: false,
		staleTime: 1000 * 60 * 10,
	});

	const loginMutation = useMutation({
		mutationFn: async (data: LoginData) => authService.login(data),
		onSuccess: (response: LoginResponse) => {
			Cookies.set(ACCESS_TOKEN_KEY, response.access_token, {
				expires: 3,
			});
			Cookies.set(USER_DATA_KEY, JSON.stringify(response.user), {
				expires: 3,
			});
			queryClient.setQueryData(['authUser'], response.user);
		},
	});

	const logoutMutation = useMutation({
		mutationFn: async () => authService.logout,
		onSuccess: () => {
			queryClient.setQueryData(['authUser'], null);
			queryClient.removeQueries();
			Cookies.remove(ACCESS_TOKEN_KEY);
			Cookies.remove(USER_DATA_KEY);
		},
	});

	const value = {
		user: user ?? null,
		login: async (data: LoginData) => {
			await loginMutation.mutateAsync(data);
		},
		logout: () => logoutMutation.mutate(),
		isLoading: isLoading || isFetching,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};

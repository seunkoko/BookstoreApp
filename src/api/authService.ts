import type { LoginData, LoginResponse, User } from '../types';
import { client } from './client';

const AUTH_URL = import.meta.env.VITE_API_AUTH_URL;

export const authService = {
	login: (data: LoginData) =>
		client.post<LoginResponse>(`${AUTH_URL}/login`, data),
	logout: () => client.delete(`${AUTH_URL}/logout`),
	fetchMe: () => client.get<User>(`${AUTH_URL}/me`),
};

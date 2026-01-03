import Cookies from 'js-cookie';
import type { User } from '../types';

export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_DATA_KEY = 'user';

export const getAuthToken = (): string | undefined => Cookies.get(ACCESS_TOKEN_KEY);
export const getUserData = (): User | null => {
	const userData = Cookies.get(USER_DATA_KEY);
	if (!userData) return null;
	try {
		return JSON.parse(userData);
	} catch {
		return null;
	}
};

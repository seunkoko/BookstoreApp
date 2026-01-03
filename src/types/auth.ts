import { type User } from "./user";

export interface AuthContextType {
	user: User | null;
	login: (data: LoginData) => void;
	logout: () => void;
	isLoading: boolean;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    access_token: string;
}

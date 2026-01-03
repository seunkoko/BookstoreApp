export interface Role {
	id: number;
	name: 'admin' | 'user';
}

export interface User {
	id: number;
	username: string;
	email: string;
	role: Role;
}

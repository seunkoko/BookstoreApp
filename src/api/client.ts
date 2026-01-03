import { getAuthToken } from '../helpers/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
	public status: number;

	constructor(status: number, message: string) {
		super(message);

		this.status = status;
		this.name = 'ApiError';

		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const token = getAuthToken();

	const config = {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers,
		},
	};

	const response = await fetch(`${BASE_URL}${endpoint}`, config);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new ApiError(response.status, errorData.message);
	}

	if (response.status === 204) return {} as T;

	return response.json();
}

export const client = {
	get: <T>(url: string, opts?: RequestInit) =>
		apiRequest<T>(url, { ...opts, method: 'GET' }),
	post: <T>(url: string, body: unknown, opts?: RequestInit) =>
		apiRequest<T>(url, {
			...opts,
			method: 'POST',
			body: JSON.stringify(body),
		}),
	put: <T>(url: string, body: unknown, opts?: RequestInit) =>
		apiRequest<T>(url, {
			...opts,
			method: 'PUT',
			body: JSON.stringify(body),
		}),
	delete: <T>(url: string, opts?: RequestInit) =>
		apiRequest<T>(url, { ...opts, method: 'DELETE' }),
};

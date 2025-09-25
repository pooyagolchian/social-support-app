import axios from "axios";
import { ApiError } from "../utils/errorHandler";

const api = axios.create({
	baseURL: "",
	timeout: 30000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				return Promise.reject(
					new ApiError(
						error.response.status,
						error.response.data?.error?.message || error.message,
						error.response.data,
					),
				);
			}
		}
		return Promise.reject(error);
	},
);

export default api;

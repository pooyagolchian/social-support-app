import axios from "axios";

const api = axios.create({
	baseURL: "",
	timeout: 30000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			return Promise.reject(
				error.response.data?.error?.message || error.message,
			);
		} else if (error.request) {
			return Promise.reject("No response from server.");
		} else if (error.code === "ECONNABORTED") {
			return Promise.reject("Request timed out.");
		}
		return Promise.reject(error.message);
	},
);

export default api;

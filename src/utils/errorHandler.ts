import axios from "axios";
import type { TFunction } from "i18next";

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
		public data?: any,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export const handleApiError = (error: unknown, t: TFunction): string => {
	if (error instanceof ApiError) {
		switch (error.status) {
			case 401:
				return t("errors.unauthorized");
			case 403:
				return t("errors.forbidden");
			case 404:
				return t("errors.notFound");
			case 500:
				return t("errors.serverError");
			case 502:
			case 503:
			case 504:
				return t("errors.serviceUnavailable");
			default:
				return t("errors.genericError");
		}
	}

	if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
		return t("errors.timeout" as any);
	}

	if (error instanceof Error) {
		return error.message;
	}

	return t("errors.unknownError");
};

export const createApiErrorHandler =
	(t: TFunction) =>
	(error: unknown): void => {
		const message = handleApiError(error, t);
		console.error("API Error:", error);
		alert(message);
	};

export interface PhoneFormat {
	countryCode: string;
	prefix: string;
	example: string;
	pattern: RegExp;
	format: (value: string) => string;
}

export const UAE_PHONE_FORMAT: PhoneFormat = {
	countryCode: "+971",
	prefix: "5",
	example: "+971 56 673 6236",
	pattern: /^(\+971|00971|971|0)?5[0-9]{8}$/,
	format: (value: string) => {
		// Remove all non-digit characters except +
		const digits = value.replace(/[^\d+]/g, "");

		// Remove country code variations if present
		let cleaned = digits;
		if (digits.startsWith("+971")) {
			cleaned = digits.substring(4);
		} else if (digits.startsWith("971")) {
			cleaned = digits.substring(3);
		} else if (digits.startsWith("00971")) {
			cleaned = digits.substring(5);
		} else if (digits.startsWith("0")) {
			cleaned = digits.substring(1);
		}

		// Ensure it's only digits now
		cleaned = cleaned.replace(/\D/g, "");

		// Format as: 56 673 6236
		if (cleaned.length <= 2) {
			return cleaned;
		} else if (cleaned.length <= 5) {
			return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
		} else {
			return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`;
		}
	},
};

export const formatPhoneNumber = (value: string, format: PhoneFormat = UAE_PHONE_FORMAT): string => {
	return format.format(value);
};

export const validatePhoneNumber = (value: string, format: PhoneFormat = UAE_PHONE_FORMAT): boolean => {
	const digits = value.replace(/\D/g, "");
	return format.pattern.test(digits);
};

export const getPhoneNumberForSubmission = (value: string, includeCountryCode: boolean = true): string => {
	const digits = value.replace(/\D/g, "");

	// Remove country code if present
	let cleaned = digits;
	if (digits.startsWith("971")) {
		cleaned = digits.substring(3);
	} else if (digits.startsWith("00971")) {
		cleaned = digits.substring(5);
	}

	// Remove leading 0 if present
	if (cleaned.startsWith("0")) {
		cleaned = cleaned.substring(1);
	}

	return includeCountryCode ? `+971${cleaned}` : `0${cleaned}`;
};
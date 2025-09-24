export const LANGUAGES = {
	EN: "en",
	AR: "ar",
} as const;

export const LANGUAGE_LABELS = {
	[LANGUAGES.EN]: "English",
	[LANGUAGES.AR]: "العربية",
} as const;

export const DEFAULT_LANGUAGE = LANGUAGES.EN;

export const RTL_LANGUAGES = [LANGUAGES.AR];
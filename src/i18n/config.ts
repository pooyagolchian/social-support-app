import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import arTranslation from "./locales/ar/translation.json";
import enTranslation from "./locales/en/translation.json";

export const defaultNS = "translation";
export const resources = {
	en: {
		translation: enTranslation,
	},
	ar: {
		translation: arTranslation,
	},
} as const;

export const supportedLanguages = Object.keys(resources);

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		defaultNS,
		fallbackLng: "en",
		supportedLngs: supportedLanguages,
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
		},
		react: {
			useSuspense: false,
		},
	});

i18n.on("languageChanged", (lng) => {
	document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
	document.documentElement.lang = lng;
});

document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
document.documentElement.lang = i18n.language;

export default i18n;
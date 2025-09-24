import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		ar: {
			translation: ar,
		},
	},
	lng: savedLanguage,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

i18n.on("languageChanged", (lng) => {
	localStorage.setItem("language", lng);
	document.documentElement.dir = i18n.dir(lng);
});

document.documentElement.dir = i18n.dir();

export default i18n;

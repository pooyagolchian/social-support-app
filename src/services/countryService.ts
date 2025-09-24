import api from "@/lib/apiFactory";

export interface Country {
	name: {
		common: string;
		official: string;
		nativeName?: {
			[key: string]: {
				official: string;
				common: string;
			};
		};
	};
	cca2: string;
	cca3: string;
	flag: string;
	flags: {
		png: string;
		svg: string;
	};
	translations: {
		ara?: { official: string; common: string };
		[key: string]: { official: string; common: string } | undefined;
	};
	region: string;
	subregion: string;
}

export interface CountryOption {
	code: string;
	name: string;
	nameAr?: string;
	flag: string;
	flagUrl: string;
}

let countriesCache: CountryOption[] | null = null;

export async function fetchCountries(): Promise<CountryOption[]> {
	if (countriesCache) {
		return countriesCache;
	}

	try {
		const response = await api.get<Country[]>(
			"https://restcountries.com/v3.1/all?fields=name,cca2,flag,flags,translations",
		);

		const countries = response.data
			.map((country) => ({
				code: country.cca2,
				name: country.name.common,
				nameAr: country.translations.ara?.common || country.name.common,
				flag: country.flag,
				flagUrl: country.flags.svg || country.flags.png,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));

		countriesCache = countries;
		return countries;
	} catch (error: any) {
		return getFallbackCountries();
	}
}

export function getFallbackCountries(): CountryOption[] {
	return [
		{
			code: "AE",
			name: "United Arab Emirates",
			nameAr: "الإمارات العربية المتحدة",
			flag: "🇦🇪",
			flagUrl: "",
		},
		{
			code: "SA",
			name: "Saudi Arabia",
			nameAr: "المملكة العربية السعودية",
			flag: "🇸🇦",
			flagUrl: "",
		},
		{ code: "QA", name: "Qatar", nameAr: "قطر", flag: "🇶🇦", flagUrl: "" },
		{ code: "KW", name: "Kuwait", nameAr: "الكويت", flag: "🇰🇼", flagUrl: "" },
		{ code: "OM", name: "Oman", nameAr: "عمان", flag: "🇴🇲", flagUrl: "" },
		{ code: "BH", name: "Bahrain", nameAr: "البحرين", flag: "🇧🇭", flagUrl: "" },
		{ code: "JO", name: "Jordan", nameAr: "الأردن", flag: "🇯🇴", flagUrl: "" },
		{ code: "LB", name: "Lebanon", nameAr: "لبنان", flag: "🇱🇧", flagUrl: "" },
		{ code: "EG", name: "Egypt", nameAr: "مصر", flag: "🇪🇬", flagUrl: "" },
		{ code: "SY", name: "Syria", nameAr: "سوريا", flag: "🇸🇾", flagUrl: "" },
		{ code: "IQ", name: "Iraq", nameAr: "العراق", flag: "🇮🇶", flagUrl: "" },
		{ code: "YE", name: "Yemen", nameAr: "اليمن", flag: "🇾🇪", flagUrl: "" },
		{
			code: "PS",
			name: "Palestine",
			nameAr: "فلسطين",
			flag: "🇵🇸",
			flagUrl: "",
		},
		{ code: "MA", name: "Morocco", nameAr: "المغرب", flag: "🇲🇦", flagUrl: "" },
		{ code: "TN", name: "Tunisia", nameAr: "تونس", flag: "🇹🇳", flagUrl: "" },
		{ code: "DZ", name: "Algeria", nameAr: "الجزائر", flag: "🇩🇿", flagUrl: "" },
		{ code: "LY", name: "Libya", nameAr: "ليبيا", flag: "🇱🇾", flagUrl: "" },
		{ code: "SD", name: "Sudan", nameAr: "السودان", flag: "🇸🇩", flagUrl: "" },
		{
			code: "US",
			name: "United States",
			nameAr: "الولايات المتحدة",
			flag: "🇺🇸",
			flagUrl: "",
		},
		{
			code: "GB",
			name: "United Kingdom",
			nameAr: "المملكة المتحدة",
			flag: "🇬🇧",
			flagUrl: "",
		},
		{ code: "CA", name: "Canada", nameAr: "كندا", flag: "🇨🇦", flagUrl: "" },
		{
			code: "AU",
			name: "Australia",
			nameAr: "أستراليا",
			flag: "🇦🇺",
			flagUrl: "",
		},
		{ code: "IN", name: "India", nameAr: "الهند", flag: "🇮🇳", flagUrl: "" },
		{
			code: "PK",
			name: "Pakistan",
			nameAr: "باكستان",
			flag: "🇵🇰",
			flagUrl: "",
		},
		{
			code: "BD",
			name: "Bangladesh",
			nameAr: "بنغلاديش",
			flag: "🇧🇩",
			flagUrl: "",
		},
		{ code: "TR", name: "Turkey", nameAr: "تركيا", flag: "🇹🇷", flagUrl: "" },
		{ code: "IR", name: "Iran", nameAr: "إيران", flag: "🇮🇷", flagUrl: "" },
		{
			code: "AF",
			name: "Afghanistan",
			nameAr: "أفغانستان",
			flag: "🇦🇫",
			flagUrl: "",
		},
	];
}

export function searchCountries(
	countries: CountryOption[],
	query: string,
	locale: string = "en",
): CountryOption[] {
	const normalizedQuery = query.toLowerCase().trim();
	if (!normalizedQuery) return countries;

	return countries.filter((country) => {
		const nameToSearch =
			locale === "ar" && country.nameAr ? country.nameAr : country.name;
		return (
			nameToSearch.toLowerCase().includes(normalizedQuery) ||
			country.code.toLowerCase().includes(normalizedQuery) ||
			country.name.toLowerCase().includes(normalizedQuery)
		);
	});
}

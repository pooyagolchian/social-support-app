import {
	Autocomplete,
	Box,
	CircularProgress,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	type CountryOption,
	fetchCountries,
	searchCountries,
} from "@/services/countryService";

interface CountrySelectProps {
	value: string;
	onChange: (value: string) => void;
	error?: boolean;
	helperText?: string;
	label?: string;
	required?: boolean;
}

const CountrySelect = ({
	value,
	onChange,
	error,
	helperText,
	label,
	required,
}: CountrySelectProps) => {
	const { t, i18n } = useTranslation();
	const [countries, setCountries] = useState<CountryOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const loadCountries = async () => {
			setLoading(true);
			try {
				const data = await fetchCountries();
				setCountries(data);
			} catch (error) {
				console.error("Failed to load countries:", error);
			} finally {
				setLoading(false);
			}
		};
		loadCountries();
	}, []);

	const selectedCountry = countries.find((c) => c.code === value);
	const isRtl = i18n.dir() === "rtl";

	const getCountryName = (country: CountryOption) => {
		return isRtl && country.nameAr ? country.nameAr : country.name;
	};

	const filteredCountries = searchCountries(countries, inputValue, i18n.language);

	return (
		<Autocomplete
			value={selectedCountry || null}
			onChange={(_, newValue) => {
				onChange(newValue?.code || "");
			}}
			inputValue={inputValue}
			onInputChange={(_, newInputValue) => {
				setInputValue(newInputValue);
			}}
			options={filteredCountries}
			getOptionLabel={(option) => getCountryName(option)}
			renderOption={(props, option) => {
				const { key, ...otherProps } = props as any;
				return (
					<Box
						component="li"
						key={key}
						{...otherProps}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							direction: isRtl ? "rtl" : "ltr",
						}}
					>
					{option.flagUrl ? (
						<img
							loading="lazy"
							width="20"
							src={option.flagUrl}
							alt={option.name}
							style={{ borderRadius: 2 }}
						/>
					) : (
						<span style={{ fontSize: "20px" }}>{option.flag}</span>
					)}
					<Typography>{getCountryName(option)}</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
						({option.code})
					</Typography>
				</Box>
				);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label || t("country")}
					required={required}
					error={error}
					helperText={helperText}
					InputProps={{
						...params.InputProps,
						startAdornment: selectedCountry && (
							<Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
								{selectedCountry.flagUrl ? (
									<img
										loading="lazy"
										width="20"
										src={selectedCountry.flagUrl}
										alt={selectedCountry.name}
										style={{ borderRadius: 2 }}
									/>
								) : (
									<span style={{ fontSize: "20px" }}>{selectedCountry.flag}</span>
								)}
							</Box>
						),
						endAdornment: (
							<>
								{loading && <CircularProgress color="inherit" size={20} />}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
			loading={loading}
			loadingText={t("loading")}
			noOptionsText={t("noCountriesFound")}
			isOptionEqualToValue={(option, val) => option.code === val?.code}
			fullWidth
		/>
	);
};

export default CountrySelect;
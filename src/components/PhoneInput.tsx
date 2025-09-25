import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatPhoneNumber } from "@/utils/phoneFormatter";

interface PhoneInputProps {
	value: string;
	onChange: (value: string) => void;
	error?: boolean;
	helperText?: string;
	label?: string;
	required?: boolean;
	fullWidth?: boolean;
	id?: string;
}

const PhoneInput = ({
	value,
	onChange,
	error,
	helperText,
	label,
	required,
	fullWidth = true,
	id,
}: PhoneInputProps) => {
	const { t, i18n } = useTranslation();
	const [displayValue, setDisplayValue] = useState("");
	const isRtl = i18n.dir() === "rtl";

	useEffect(() => {
		
		setDisplayValue(formatPhoneNumber(value || ""));
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;

		
		const cleanInput = input.replace(/[^\d\s]/g, "");

		
		const formatted = formatPhoneNumber(cleanInput);
		setDisplayValue(formatted);

		
		const digitsOnly = cleanInput.replace(/\D/g, "");
		
		const fullNumber = digitsOnly ? `971${digitsOnly}` : "";
		onChange(fullNumber);
	};

	return (
		<TextField
			id={id}
			value={displayValue}
			onChange={handleChange}
			label={label || t("phone")}
			required={required}
			error={error}
			helperText={helperText || t("phoneHelperText")}
			fullWidth={fullWidth}
			placeholder={t("phonePlaceholder")}
			sx={{
				"& .MuiInputBase-root": {
					direction: "ltr",
				},
				"& .MuiInputBase-input": {
					direction: "ltr",
					textAlign: "left",
				},

				"& .MuiFormHelperText-root": {
					textAlign: isRtl ? "left" : "left",
					direction: isRtl ? "rtl" : "ltr",

					marginLeft: isRtl ? 0 : undefined,
					marginRight: isRtl ? 0 : undefined,
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.5,
								direction: "ltr",
							}}
						>
							<span style={{ fontSize: "20px" }}>🇦🇪</span>
							<Typography
								sx={{
									fontWeight: 500,
									color: "text.primary",
									fontSize: "1rem",
								}}
							>
								+971
							</Typography>
						</Box>
					</InputAdornment>
				),
			}}
			inputProps={{
				maxLength: 11,
				inputMode: "tel",
				pattern: "[0-9 ]*",
			}}
		/>
	);
};

export default PhoneInput;

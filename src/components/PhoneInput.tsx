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
		// Initialize with formatted value
		setDisplayValue(formatPhoneNumber(value || ""));
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;

		// Only allow digits and spaces
		const cleanInput = input.replace(/[^\d\s]/g, "");

		// Format the number
		const formatted = formatPhoneNumber(cleanInput);
		setDisplayValue(formatted);

		// Store the full number with country code for validation
		const digitsOnly = cleanInput.replace(/\D/g, "");
		// Always prepend 971 for storage
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
			placeholder="56 673 6236"
			sx={{
				"& .MuiInputBase-root": {
					// Force LTR direction for the entire input container
					direction: "ltr",
				},
				"& .MuiInputBase-input": {
					// Always LTR for phone numbers
					direction: "ltr",
					textAlign: "left",
				},

				"& .MuiFormHelperText-root": {
					// Keep helper text aligned with the overall layout direction
					textAlign: isRtl ? "left" : "left",
					direction: isRtl ? "rtl" : "ltr",
					// Ensure proper spacing
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
				maxLength: 11, // "56 673 6236"
				inputMode: "tel",
				pattern: "[0-9 ]*",
			}}
		/>
	);
};

export default PhoneInput;

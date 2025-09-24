import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/ar-sa";
import { useTranslation } from "react-i18next";

interface DatePickerProps {
	label: string;
	value: string;
	onChange: (date: string) => void;
	error?: boolean;
	helperText?: string;
}

export const DatePicker = ({
	label,
	value,
	onChange,
	error,
	helperText,
}: DatePickerProps) => {
	const { i18n } = useTranslation();
	const isArabic = i18n.language === "ar";

	const handleDateChange = (newValue: Dayjs | null) => {
		if (newValue) {
			onChange(newValue.format("YYYY-MM-DD"));
		} else {
			onChange("");
		}
	};

	return (
		<div dir={isArabic ? "rtl" : "ltr"}>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale={isArabic ? "ar-sa" : "en"}
			>
				<MuiDatePicker
					label={label}
					value={value ? dayjs(value) : null}
					onChange={handleDateChange}
					format="DD/MM/YYYY"
					slotProps={{
						textField: {
							fullWidth: true,
							error: error,
							helperText: helperText,
							placeholder: "DD/MM/YYYY",
							inputProps: {
								placeholder: isArabic ? "يي/شش/سسسس" : "DD/MM/YYYY",
								style: {
									textAlign: isArabic ? "right" : "left",
									direction: isArabic ? "rtl" : "ltr",
								},
							},

							InputProps: {
								style: {
									flexDirection: isArabic ? "row-reverse" : "row",
								},
							},
						},
						popper: {
							placement: isArabic ? "bottom-end" : "bottom-start",
						},
						layout: {
							sx: {
								".MuiDateCalendar-root": {
									direction: isArabic ? "rtl" : "ltr",
								},
							},
						},
					}}
				/>
			</LocalizationProvider>
		</div>
	);
};

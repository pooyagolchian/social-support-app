import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useId, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { DEFAULT_CURRENCY } from "@/constants/countries";
import { ROUTES } from "@/constants/routes";
import { getFamilyFinancialSchema } from "@/lib/validationWithI18n";
import { updateFamilyFinancialInfo } from "@/store/slices/familyFinancialSlice";
import type { RootState } from "@/store/store";

type FamilyFinancialForm = z.infer<ReturnType<typeof getFamilyFinancialSchema>>;

const FamilyFinancialInfo = () => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const familyFinancial = useSelector(
		(state: RootState) => state.familyFinancial,
	);
	const maritalStatusId = useId();
	const dependentsId = useId();
	const employmentStatusId = useId();
	const monthlyIncomeId = useId();
	const housingStatusId = useId();

	const familyFinancialSchema = useMemo(() => getFamilyFinancialSchema((key: string) => t(key as any)), [i18n.language, t]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FamilyFinancialForm>({
		resolver: zodResolver(familyFinancialSchema),
		defaultValues: familyFinancial,
	});

	const onSubmit = (data: FamilyFinancialForm) => {
		dispatch(
			updateFamilyFinancialInfo({
				...data,
				dependents: data.dependents.toString(),
				monthlyIncome: data.monthlyIncome.toString(),
			}),
		);
		navigate(ROUTES.SITUATION_DESCRIPTION);
	};

	const handleBack = () => {
		navigate(ROUTES.PERSONAL_INFO);
	};

	return (
		<Card sx={{ mt: 3 }}>
			<CardContent>
				<Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
					{t("step2")}
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth error={!!errors.maritalStatus}>
								<InputLabel id={maritalStatusId}>
									{t("maritalStatus")}
								</InputLabel>
								<Controller
									name="maritalStatus"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											labelId={maritalStatusId}
											label={t("maritalStatus")}
										>
											<MenuItem value="single">{t("single")}</MenuItem>
											<MenuItem value="married">{t("married")}</MenuItem>
											<MenuItem value="divorced">{t("divorced")}</MenuItem>
											<MenuItem value="widowed">{t("widowed")}</MenuItem>
										</Select>
									)}
								/>
								{errors.maritalStatus && (
									<p className="text-red-600 text-xs mt-1">
										{errors.maritalStatus.message}
									</p>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="dependents"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id={dependentsId}
										label={t("dependents")}
										type="number"
										error={!!errors.dependents}
										helperText={errors.dependents?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth error={!!errors.employmentStatus}>
								<InputLabel id={employmentStatusId}>
									{t("employmentStatus")}
								</InputLabel>
								<Controller
									name="employmentStatus"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											labelId={employmentStatusId}
											label={t("employmentStatus")}
										>
											<MenuItem value="employed">{t("employed")}</MenuItem>
											<MenuItem value="unemployed">{t("unemployed")}</MenuItem>
											<MenuItem value="self-employed">
												{t("selfEmployed")}
											</MenuItem>
											<MenuItem value="retired">{t("retired")}</MenuItem>
											<MenuItem value="student">{t("student")}</MenuItem>
										</Select>
									)}
								/>
								{errors.employmentStatus && (
									<p className="text-red-600 text-xs mt-1">
										{errors.employmentStatus.message}
									</p>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="monthlyIncome"
								control={control}
								render={({ field: { onChange, value, ...field } }) => (
									<TextField
										{...field}
										value={value ? Number(value).toLocaleString() : ""}
										onChange={(e) => {
											const numericValue = e.target.value.replace(/[^0-9]/g, "");
											onChange(numericValue);
										}}
										fullWidth
										id={monthlyIncomeId}
										label={`${t("monthlyIncome")} (${DEFAULT_CURRENCY})`}
										inputProps={{
											inputMode: "numeric",
											pattern: "[0-9]*",
										}}
										error={!!errors.monthlyIncome}
										helperText={errors.monthlyIncome?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth error={!!errors.housingStatus}>
								<InputLabel id={housingStatusId}>
									{t("housingStatus")}
								</InputLabel>
								<Controller
									name="housingStatus"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											labelId={housingStatusId}
											label={t("housingStatus")}
										>
											<MenuItem value="owned">{t("owned")}</MenuItem>
											<MenuItem value="rented">{t("rented")}</MenuItem>
											<MenuItem value="shared">{t("shared")}</MenuItem>
											<MenuItem value="homeless">{t("homeless")}</MenuItem>
										</Select>
									)}
								/>
								{errors.housingStatus && (
									<p className="text-red-600 text-xs mt-1">
										{errors.housingStatus.message}
									</p>
								)}
							</FormControl>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
			<CardActions sx={{ justifyContent: "space-between", px: 2, py: 2 }}>
				<Button variant="outlined" onClick={handleBack}>
					{t("back")}
				</Button>
				<Button variant="contained" onClick={handleSubmit(onSubmit)}>
					{t("next")}
				</Button>
			</CardActions>
		</Card>
	);
};

export default FamilyFinancialInfo;

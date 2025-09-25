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
import { useEffect, useId, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import CountrySelect from "@/components/CountrySelect";
import { DatePicker } from "@/components/DatePicker";
import PhoneInput from "@/components/PhoneInput";
import { ROUTES } from "@/constants/routes";
import { getPersonalInfoSchema } from "@/lib/validationWithI18n";
import { updatePersonalInfo } from "@/store/slices/personalInfoSlice";
import type { RootState } from "@/store/store";

type PersonalInfoForm = z.infer<ReturnType<typeof getPersonalInfoSchema>>;

const PersonalInfo = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const personalInfo = useSelector((state: RootState) => state.personalInfo);
	const nameId = useId();
	const nationalId = useId();
	const genderId = useId();
	const addressId = useId();
	const cityId = useId();
	const stateId = useId();
	const phoneId = useId();
	const emailId = useId();

	const personalInfoSchema = useMemo(
		() => getPersonalInfoSchema((key: string) => t(key as any)),
		[t],
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<PersonalInfoForm>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: personalInfo,
	});

	const onSubmit = (data: PersonalInfoForm) => {
		dispatch(updatePersonalInfo(data));
		navigate(ROUTES.FAMILY_FINANCIAL);
	};


	

	return (
		<Card sx={{ mt: 3 }}>
			<CardContent>
				<Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
					{t("step1")}
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id={nameId}
										label={t("name")}
										error={!!errors.name}
										helperText={errors.name?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="nationalId"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id={nationalId}
										label={t("nationalId")}
										error={!!errors.nationalId}
										helperText={errors.nationalId?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="dateOfBirth"
								control={control}
								render={({ field }) => (
									<DatePicker
										label={t("dateOfBirth")}
										value={field.value}
										onChange={field.onChange}
										error={!!errors.dateOfBirth}
										helperText={errors.dateOfBirth?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth error={!!errors.gender}>
								<InputLabel id={genderId}>{t("gender")}</InputLabel>
								<Controller
									name="gender"
									control={control}
									render={({ field }) => (
										<Select {...field} labelId={genderId} label={t("gender")}>
											<MenuItem value="male">{t("male")}</MenuItem>
											<MenuItem value="female">{t("female")}</MenuItem>
											<MenuItem value="other">{t("other")}</MenuItem>
										</Select>
									)}
								/>
								{errors.gender && (
									<p className="text-red-600 text-xs px-3">
										{errors.gender.message}
									</p>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="address"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id={addressId}
										label={t("address")}
										error={!!errors.address}
										helperText={errors.address?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="city"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id={cityId}
										label={t("city")}
										error={!!errors.city}
										helperText={errors.city?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="state"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id={stateId}
										label={t("state")}
										error={!!errors.state}
										helperText={errors.state?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="country"
								control={control}
								render={({ field }) => (
									<CountrySelect
										value={field.value}
										onChange={field.onChange}
										error={!!errors.country}
										helperText={errors.country?.message}
										label={t("country")}
										required
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="phone"
								control={control}
								render={({ field }) => (
									<PhoneInput
										value={field.value}
										onChange={field.onChange}
										id={phoneId}
										label={t("phone")}
										error={!!errors.phone}
										helperText={errors.phone?.message}
										required
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id={emailId}
										label={t("email")}
										error={!!errors.email}
										helperText={errors.email?.message}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
			<CardActions sx={{ justifyContent: "flex-end", px: 2, py: 2 }}>
				<Button
					type="submit"
					variant="contained"
					onClick={handleSubmit(onSubmit)}
				>
					{t("next")}
				</Button>
			</CardActions>
		</Card>
	);
};

export default PersonalInfo;

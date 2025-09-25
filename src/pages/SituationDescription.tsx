import { zodResolver } from "@hookform/resolvers/zod";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	InputAdornment,
	Snackbar,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import type React from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { z } from "zod";
import { ROUTES } from "@/constants/routes";
import { getSituationDescriptionSchema } from "@/lib/validationWithI18n";
import { getOpenAISuggestion } from "@/services/openaiService";
import { updateSituationDescription } from "@/store/slices/situationDescriptionSlice";
import { type RootState, resetAllForms } from "@/store/store";
import { handleApiError } from "@/utils/errorHandler";

type SituationDescriptionForm = z.infer<
	ReturnType<typeof getSituationDescriptionSchema>
>;

const SituationDescription: React.FC = () => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const situationDescription = useSelector(
		(state: RootState) => state.situationDescription,
	);
	const currentFinancialSituationId = useId();
	const employmentCircumstancesId = useId();
	const reasonForApplyingId = useId();

	const [dialogOpen, setDialogOpen] = useState(false);
	const [aiContent, setAiContent] = useState("");
	const [loadingField, setLoadingField] = useState<
		keyof SituationDescriptionForm | null
	>(null);
	const [editingField, setEditingField] = useState<
		keyof SituationDescriptionForm | null
	>(null);
	const [isRegenerating, setIsRegenerating] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const isRtl = i18n.dir() === "rtl";

	const situationDescriptionSchema = useMemo(
		() => getSituationDescriptionSchema((key: string) => t(key as any)),
		[t],
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<SituationDescriptionForm>({
		resolver: zodResolver(situationDescriptionSchema),
		defaultValues: situationDescription,
	});

	// Keep Redux in sync when the user has entered data (skip initial mount)
	const isFirstRender = useRef(true);
	const currentFinancialSituation = useWatch({
		control,
		name: "currentFinancialSituation",
	});
	const employmentCircumstances = useWatch({
		control,
		name: "employmentCircumstances",
	});
	const reasonForApplying = useWatch({ control, name: "reasonForApplying" });

	useEffect(() => {
		// Skip dispatch on initial mount
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const watchedValues = {
			currentFinancialSituation,
			employmentCircumstances,
			reasonForApplying,
		};

		// Only dispatch if at least one field has non-empty text
		const hasData = Object.values(watchedValues ?? {}).some((v) =>
			typeof v === "string" ? v.trim() !== "" : Boolean(v),
		);

		if (hasData) {
			dispatch(
				updateSituationDescription(watchedValues as SituationDescriptionForm),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentFinancialSituation, employmentCircumstances, reasonForApplying]);

	const onSubmit = (data: SituationDescriptionForm) => {
		dispatch(updateSituationDescription(data));

		// Mock API call
		setTimeout(() => {
			// Show success toast
			toast.success(t("dataSubmittedSuccessfully"), {
				description: t("formSubmittedDescription"),
				action: {
					label: t("close"),
					onClick: () => {},
				},
			});

			// Reset all form data
			dispatch(resetAllForms());

			// Navigate to the first page
			navigate(ROUTES.HOME);
		}, 500);
	};

	const handleBack = () => {
		navigate(ROUTES.FAMILY_FINANCIAL);
	};

	const handleInlineGenerate = async (field: keyof SituationDescriptionForm) => {
		setLoadingField(field);
		const currentValue = getValues(field);

		const prompts = {
			currentFinancialSituation: `${t("aiPrompt.base")} ${
				currentValue
					? t("aiPrompt.improve", { currentValue })
					: t("aiPrompt.financialHardship")
			}`,
			employmentCircumstances: `${t("aiPrompt.base")} ${
				currentValue
					? t("aiPrompt.improve", { currentValue })
					: t("aiPrompt.employmentCircumstances")
			}`,
			reasonForApplying: `${t("aiPrompt.base")} ${
				currentValue
					? t("aiPrompt.improve", { currentValue })
					: t("aiPrompt.reasonForApplying")
			}`,
		};

		const prompt = prompts[field];
		const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

		if (!apiKey) {
			setSnackbarMessage(t("openAIKeyNotConfigured"));
			setSnackbarOpen(true);
			setLoadingField(null);
			return;
		}

		try {
			const suggestion = await getOpenAISuggestion(apiKey, prompt);
			if (suggestion) {
				setEditingField(field);
				setAiContent(suggestion);
				setDialogOpen(true);
			} else {
				setSnackbarMessage(t("couldNotGetSuggestion"));
				setSnackbarOpen(true);
			}
		} catch (error) {
			const errorMessage = handleApiError(error, t);
			setSnackbarMessage(`${t("error")}: ${errorMessage}`);
			setSnackbarOpen(true);
		} finally {
			setLoadingField(null);
		}
	};

	const handleRegenerateInDialog = async () => {
		if (!editingField) return;

		setIsRegenerating(true);
		const currentValue = aiContent;

		const prompt = `${t("aiPrompt.base")} ${t("aiPrompt.improve", {
			currentValue,
		})}`;

		const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

		if (!apiKey) {
			setSnackbarMessage(t("openAIKeyNotConfigured"));
			setSnackbarOpen(true);
			setIsRegenerating(false);
			return;
		}

		try {
			const suggestion = await getOpenAISuggestion(apiKey, prompt);
			if (suggestion) {
				setAiContent(suggestion);
				setSnackbarMessage(t("suggestionImproved"));
				setSnackbarOpen(true);
			} else {
				setSnackbarMessage(t("couldNotGetSuggestion"));
				setSnackbarOpen(true);
			}
		} catch (error) {
			const errorMessage = handleApiError(error, t);
			setSnackbarMessage(`${t("error")}: ${errorMessage}`);
			setSnackbarOpen(true);
		} finally {
			setIsRegenerating(false);
		}
	};

	const handleAccept = () => {
		if (editingField) {
			setValue(editingField, aiContent);
			setSnackbarMessage(t("suggestionAccepted"));
			setSnackbarOpen(true);
		}
		handleClose();
	};

	const handleClose = () => {
		setDialogOpen(false);
		setAiContent("");
		setEditingField(null);
	};

	return (
		<Card sx={{ mt: 3 }}>
			<CardContent>
				<Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
					{t("step3")}
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
					<Box sx={{ mb: 3 }}>
						<Controller
							name="currentFinancialSituation"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									multiline
									rows={4}
									id={currentFinancialSituationId}
									label={t("currentFinancialSituation")}
									error={!!errors.currentFinancialSituation}
									helperText={errors.currentFinancialSituation?.message}
									dir={i18n.dir()}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Tooltip title={t("generateWithAI")}>
													<IconButton
														onClick={() =>
															handleInlineGenerate("currentFinancialSituation")
														}
														disabled={
															loadingField === "currentFinancialSituation"
														}
														size="small"
														sx={{
															alignSelf: "flex-start",
															mt: 1,
															[isRtl ? "ml" : "mr"]: 1,
														}}
													>
														{loadingField === "currentFinancialSituation" ? (
															<CircularProgress size={20} />
														) : (
															<AutoFixHighIcon />
														)}
													</IconButton>
												</Tooltip>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Box>

					<Box sx={{ mb: 3 }}>
						<Controller
							name="employmentCircumstances"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									multiline
									rows={4}
									id={employmentCircumstancesId}
									label={t("employmentCircumstances")}
									error={!!errors.employmentCircumstances}
									helperText={errors.employmentCircumstances?.message}
									dir={i18n.dir()}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Tooltip title={t("generateWithAI")}>
													<IconButton
														onClick={() =>
															handleInlineGenerate("employmentCircumstances")
														}
														disabled={
															loadingField === "employmentCircumstances"
														}
														size="small"
														sx={{
															alignSelf: "flex-start",
															mt: 1,
															[isRtl ? "ml" : "mr"]: 1,
														}}
													>
														{loadingField === "employmentCircumstances" ? (
															<CircularProgress size={20} />
														) : (
															<AutoFixHighIcon />
														)}
													</IconButton>
												</Tooltip>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Box>

					<Box sx={{ mb: 3 }}>
						<Controller
							name="reasonForApplying"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									multiline
									rows={4}
									id={reasonForApplyingId}
									label={t("reasonForApplying")}
									error={!!errors.reasonForApplying}
									helperText={errors.reasonForApplying?.message}
									dir={i18n.dir()}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Tooltip title={t("generateWithAI")}>
													<IconButton
														onClick={() =>
															handleInlineGenerate("reasonForApplying")
														}
														disabled={loadingField === "reasonForApplying"}
														size="small"
														sx={{
															alignSelf: "flex-start",
															mt: 1,
															[isRtl ? "ml" : "mr"]: 1,
														}}
													>
														{loadingField === "reasonForApplying" ? (
															<CircularProgress size={20} />
														) : (
															<AutoFixHighIcon />
														)}
													</IconButton>
												</Tooltip>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Box>
				</Box>
			</CardContent>
			<CardActions sx={{ justifyContent: "space-between", px: 2, py: 2 }}>
				{isRtl ? (
					<>
						<Button variant="contained" onClick={handleSubmit(onSubmit)}>
							{t("submit")}
						</Button>
						<Button variant="outlined" onClick={handleBack}>
							{t("back")}
						</Button>
					</>
				) : (
					<>
						<Button variant="outlined" onClick={handleBack}>
							{t("back")}
						</Button>
						<Button variant="contained" onClick={handleSubmit(onSubmit)}>
							{t("submit")}
						</Button>
					</>
				)}
			</CardActions>

			<Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="md">
				<DialogTitle>{t("aiSuggestion")}</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						multiline
						rows={8}
						value={aiContent}
						onChange={(e) => setAiContent(e.target.value)}
						variant="outlined"
						label={t("aiGeneratedContent")}
						helperText={t("editBeforeAccepting")}
						sx={{ mt: 1 }}
						dir={i18n.dir()}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Tooltip title={t("regenerateSuggestion")}>
										<IconButton
											onClick={handleRegenerateInDialog}
											disabled={isRegenerating}
											size="small"
											sx={{
												alignSelf: "flex-start",
												mt: 1,
												[isRtl ? "ml" : "mr"]: 1,
												bottom: "20px",
												right: isRtl ? "0" : "10px",
												position: "absolute",
											}}
										>
											{isRegenerating ? (
												<CircularProgress size={10} />
											) : (
												<AutoFixHighIcon />
											)}
										</IconButton>
									</Tooltip>
								</InputAdornment>
							),
						}}
					/>
				</DialogContent>
				<DialogActions
					sx={{ px: 3, pb: 2, flexDirection: isRtl ? "row-reverse" : "row" }}
				>
					<Button onClick={handleClose} color="error">
						{t("discard")}
					</Button>
					<Button
						onClick={handleAccept}
						variant="contained"
						disabled={!aiContent}
					>
						{t("accept")}
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={snackbarOpen}
				onClose={() => setSnackbarOpen(false)}
				autoHideDuration={4000}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: isRtl ? "left" : "right",
				}}
			>
				<Alert
					severity="success"
					onClose={() => setSnackbarOpen(false)}
					sx={{
						direction: i18n.dir(),
						textAlign: isRtl ? "right" : "left",
						"& .MuiAlert-message": {
							width: "100%",
							textAlign: isRtl ? "right" : "left",
						},
						"& .MuiAlert-action": {
							paddingLeft: isRtl ? 0 : undefined,
							paddingRight: isRtl ? undefined : 0,
							marginLeft: isRtl ? "auto" : undefined,
							marginRight: isRtl ? 0 : "auto",
						},
					}}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Card>
	);
};

export default SituationDescription;

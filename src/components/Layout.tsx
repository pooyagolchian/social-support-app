import { Box, Paper, Step, StepLabel, Stepper } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import CompletionStats from "./CompletionStats";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();
	const { i18n, t } = useTranslation();

	let step = 0;
	if (location.pathname === ROUTES.PERSONAL_INFO) {
		step = 1;
	} else if (location.pathname === ROUTES.FAMILY_FINANCIAL) {
		step = 2;
	} else if (location.pathname === ROUTES.SITUATION_DESCRIPTION) {
		step = 3;
	}

	const theme = useMemo(
		() =>
			createTheme({
				direction: i18n.dir(),
				typography: {
					fontFamily:
						i18n.dir() === "rtl" ? "Vazirmatn, serif" : "DM Sans, sans-serif",
				},
				components: {
					MuiTextField: {
						defaultProps: {
							dir: i18n.dir(),
						},
					},
				},
			}),
		[i18n.dir],
	);

	const steps = [t("step1"), t("step2"), t("step3")];

	const isRtl = i18n.dir() === "rtl";

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header step={step} />
			<Container component="main" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
				{step > 0 && (
					<Box sx={{ width: "100%", mb: 4 }}>
						<Stepper
							activeStep={step - 1}
							alternativeLabel
							sx={{
								direction: i18n.dir(),
								"& .MuiStepConnector-root": {
									left: isRtl ? "calc(50% + 20px)" : "calc(-50% + 20px)",
									right: isRtl ? "calc(-50% + 20px)" : "calc(50% + 20px)",
								},
								"& .MuiStepConnector-line": {
									borderColor: "#e0e0e0",
									borderTopWidth: 3,
								},
								"& .MuiStepLabel-root": {
									flexDirection: "column",
								},
								"& .MuiStepLabel-iconContainer": {
									paddingRight: 0,
									paddingLeft: 0,
								},
								"& .MuiStepIcon-root": {
									color: "#e0e0e0",
									"&.Mui-active": {
										color: "primary.main",
									},
									"&.Mui-completed": {
										color: "primary.main",
									},
								},
								"& .MuiStepLabel-label": {
									marginTop: "8px",
									textAlign: "center",
									"&.Mui-active": {
										fontWeight: 600,
									},
									"&.Mui-completed": {
										fontWeight: 600,
									},
								},
							}}
						>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
				)}

				{children}
			</Container>
		</ThemeProvider>
	);
};

export default Layout;

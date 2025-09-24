import {
	Alert,
	Box,
	Button,
	Container,
	Paper,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ErrorBoundaryTest = () => {
	const { t } = useTranslation();
	const [shouldThrowError, setShouldThrowError] = useState(false);

	if (shouldThrowError) {
		throw new Error(t("errorBoundaryTest.errorMessages.testError"));
	}

	const throwAsyncError = () => {
		setTimeout(() => {
			throw new Error(
				t("errorBoundaryTest.errorMessages.asyncError"),
			);
		}, 0);
	};

	const triggerPromiseRejection = () => {
		Promise.reject(new Error(t("errorBoundaryTest.errorMessages.promiseError"))).catch(() => {
			console.error(
				t("errorBoundaryTest.errorMessages.promiseError"),
			);
		});
	};

	const triggerSyncError = () => {
		setShouldThrowError(true);
	};

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				{t("errorBoundaryTest.pageTitle")}
			</Typography>

			<Alert severity="info" sx={{ mb: 3 }}>
				{t("errorBoundaryTest.infoAlert")}
			</Alert>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				<Paper elevation={2} sx={{ p: 3 }}>
					<Typography variant="h6" gutterBottom color="success.main">
						{t("errorBoundaryTest.willBeCaught.title")}
					</Typography>
					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						<Button
							variant="contained"
							color="error"
							onClick={triggerSyncError}
						>
							{t("errorBoundaryTest.willBeCaught.throwSyncError")}
						</Button>
					</Box>
				</Paper>

				<Paper elevation={2} sx={{ p: 3 }}>
					<Typography variant="h6" gutterBottom color="warning.main">
						{t("errorBoundaryTest.wontBeCaught.title")}
					</Typography>
					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						<Button
							variant="outlined"
							color="warning"
							onClick={throwAsyncError}
						>
							{t("errorBoundaryTest.wontBeCaught.throwAsyncError")}
						</Button>
						<Button
							variant="outlined"
							color="warning"
							onClick={triggerPromiseRejection}
						>
							{t("errorBoundaryTest.wontBeCaught.promiseRejection")}
						</Button>
						<Button
							variant="outlined"
							color="warning"
							onClick={() => {
								try {
									throw new Error(t("errorBoundaryTest.errorMessages.eventError"));
								} catch (e) {
									console.error("Event handler error:", e);
									alert(t("errorBoundaryTest.errorMessages.eventError"));
								}
							}}
						>
							{t("errorBoundaryTest.wontBeCaught.eventHandlerError")}
						</Button>
					</Box>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
						{t("errorBoundaryTest.wontBeCaught.note")}
					</Typography>
				</Paper>

				<Paper elevation={2} sx={{ p: 3, bgcolor: "grey.100" }}>
					<Typography variant="h6" gutterBottom>
						{t("errorBoundaryTest.howToTest.title")}
					</Typography>
					<Typography variant="body2" component="ol" sx={{ pl: 2 }}>
						<li>{t("errorBoundaryTest.howToTest.step1")}</li>
						<li>{t("errorBoundaryTest.howToTest.step2")}</li>
						<li>{t("errorBoundaryTest.howToTest.step3")}</li>
						<li>{t("errorBoundaryTest.howToTest.step4")}</li>
					</Typography>
				</Paper>
			</Box>
		</Container>
	);
};

export default ErrorBoundaryTest;

import { Box, Button, Typography, Paper, Container } from "@mui/material";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";
import type { ReactNode } from "react";

interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
	const { t } = useTranslation();

	const handleReset = () => {
		resetErrorBoundary();
	};

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<Container maxWidth="md">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "100vh",
					padding: 3,
				}}
			>
				<Paper
					elevation={3}
					sx={{
						padding: 4,
						textAlign: "center",
						width: "100%",
						maxWidth: 500,
					}}
				>
					<ErrorIcon
						color="error"
						sx={{ fontSize: 64, marginBottom: 2 }}
					/>
					<Typography variant="h4" color="error" gutterBottom>
						{t("errorBoundary.title")}
					</Typography>
					<Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
						{t("errorBoundary.defaultMessage")}
					</Typography>
					{process.env.NODE_ENV === "development" && (
						<Paper
							variant="outlined"
							sx={{
								padding: 2,
								marginBottom: 3,
								backgroundColor: "grey.100",
							}}
						>
							<Typography
								variant="caption"
								component="pre"
								sx={{
									textAlign: "left",
									overflowX: "auto",
									whiteSpace: "pre-wrap",
									wordBreak: "break-word",
								}}
							>
								{error.stack || error.message}
							</Typography>
						</Paper>
					)}
					<Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<RefreshIcon />}
							onClick={handleReset}
						>
							{t("errorBoundary.tryAgainButton")}
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleReload}
						>
							{t("errorBoundary.reloadButton")}
						</Button>
					</Box>
				</Paper>
			</Box>
			</Container>
	);
}

function logErrorToService(error: Error, errorInfo: { componentStack: string }) {
	console.error("Error logged:", error, errorInfo);

	// TODO: Send error to logging service (e.g., Sentry, LogRocket, etc.)
	// Example:
	// if (window.Sentry) {
	//   window.Sentry.captureException(error, {
	//     contexts: {
	//       react: {
	//         componentStack: errorInfo.componentStack,
	//       },
	//     },
	//   });
	// }
}

interface ErrorBoundaryProps {
	children: ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
	return (
		<ReactErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={logErrorToService}
			onReset={() => {
				// Optional: Clear any error state in your app
				console.log("Error boundary reset");
			}}
		>
			{children}
		</ReactErrorBoundary>
	);
}

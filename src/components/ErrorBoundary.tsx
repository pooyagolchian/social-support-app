import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

type ErrorBoundaryProps = {
	children: React.ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
	error?: Error;
};

const ErrorDisplay = ({ error }: { error?: Error }) => {
	const { t } = useTranslation();

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<Box sx={{ mt: 8, textAlign: "center" }}>
			<Typography variant="h4" color="error" gutterBottom>
				{t("errorBoundary.title")}
			</Typography>
			<Typography variant="body1" sx={{ mb: 2 }}>
				{error?.message || t("errorBoundary.defaultMessage")}
			</Typography>
			<Button variant="contained" color="primary" onClick={handleReload}>
				{t("errorBoundary.reloadButton")}
			</Button>
		</Box>
	);
};

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			return <ErrorDisplay error={this.state.error} />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;

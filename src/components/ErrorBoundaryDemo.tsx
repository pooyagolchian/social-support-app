import { Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ErrorBoundaryDemo = () => {
	const { t } = useTranslation();
	const [shouldError, setShouldError] = useState(false);

	if (shouldError) {
		throw new Error(t("errorBoundary.demoError"));
	}

	return (
		<Button
			variant="outlined"
			color="error"
			onClick={() => setShouldError(true)}
			sx={{ mt: 2 }}
		>
			{t("triggerErrorBoundary")}
		</Button>
	);
};

export default ErrorBoundaryDemo;
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const ServerError = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "100vh",
					textAlign: "center",
					gap: 3,
				}}
			>
				<Typography variant="h1" component="h1" sx={{ fontSize: "6rem", fontWeight: "bold", color: "error.main" }}>
					500
				</Typography>
				<Typography variant="h4" component="h2" gutterBottom>
					{t("errorPages.serverError.title")}
				</Typography>
				<Typography variant="body1" color="text.secondary" paragraph>
					{t("errorPages.serverError.description")}
				</Typography>
				<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
					<Button
						variant="contained"
						size="large"
						onClick={handleReload}
					>
						{t("errorPages.tryAgain")}
					</Button>
					<Button
						variant="outlined"
						size="large"
						onClick={() => navigate(ROUTES.HOME)}
					>
						{t("errorPages.backToHome")}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default ServerError;
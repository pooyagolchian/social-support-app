import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const Forbidden = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

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
				<Typography variant="h1" component="h1" sx={{ fontSize: "6rem", fontWeight: "bold", color: "warning.main" }}>
					403
				</Typography>
				<Typography variant="h4" component="h2" gutterBottom>
					{t("errorPages.forbidden.title")}
				</Typography>
				<Typography variant="body1" color="text.secondary" paragraph>
					{t("errorPages.forbidden.description")}
				</Typography>
				<Button
					variant="contained"
					size="large"
					onClick={() => navigate(ROUTES.HOME)}
					sx={{ mt: 2 }}
				>
					{t("errorPages.backToHome")}
				</Button>
			</Box>
		</Container>
	);
};

export default Forbidden;
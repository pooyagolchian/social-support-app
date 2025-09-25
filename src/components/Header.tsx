import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageIcon from "@mui/icons-material/Language";
import {
	AppBar,
	Box,
	Button,
	Chip,
	Menu,
	MenuItem,
	Toolbar,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = ({ step }: { step: number }) => {
	const { i18n, t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const languageButtonId = useId();
	const languageMenuId = useId();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const languages = {
		en: t("languages.english"),
		ar: t("languages.arabic"),
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng).then(() => {
			window.location.reload();
		});
		handleClose();
	};

	return (
		<AppBar position="static" className="!bg-primary">
			<Toolbar className="flex flex-row justify-between items-center px-2 sm:px-6 py-2 min-h-0">
				<Box className="flex flex-row items-center gap-5 flex-grow min-w-0">
					<div
						className={`${isMobile ? "text-[15px]" : "text-lg"} mr-2 sm:mr-3`}
					>
						{t("applicationTitle")}
					</div>
					{!isMobile && step > 0 && (
						<Chip
							label={`${t("step")} ${step}/3`}
							color="primary"
							variant="outlined"
							sx={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderColor: "rgba(255, 255, 255, 0.3)",
								color: "white",
								ml: 1,
							}}
							className="hidden sm:inline-flex"
						/>
					)}
				</Box>
				<div className="flex items-center">
					{isMobile && step > 0 && (
						<Chip
							label={`${t("step")} ${step}/3`}
							color="primary"
							variant="outlined"
							sx={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderColor: "rgba(255, 255, 255, 0.3)",
								color: "white",
								fontSize: "0.75rem",
								height: 24,
								mr: 2,
							}}
							className="sm:hidden"
						/>
					)}
					<Button
						id={languageButtonId}
						aria-controls={open ? languageMenuId : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
						color="inherit"
						startIcon={<LanguageIcon />}
						endIcon={<ExpandMoreIcon />}
						sx={{
							minWidth: 80,
							fontSize: isMobile ? "0.85rem" : "1rem",
							px: isMobile ? 1 : 2,
						}}
						className="rounded-md"
					>
						{languages[i18n.language as keyof typeof languages] ||
							t("language")}
					</Button>
					<Menu
						id={languageMenuId}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": languageButtonId,
						}}
					>
						<MenuItem
							onClick={() => changeLanguage("en")}
							selected={i18n.language === "en"}
						>
							{t("languages.english")}
						</MenuItem>
						<MenuItem
							onClick={() => changeLanguage("ar")}
							selected={i18n.language === "ar"}
						>
							{t("languages.arabic")}
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

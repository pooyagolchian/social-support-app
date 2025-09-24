import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const CompletionStats = () => {
	const { t } = useTranslation();
	const personalInfo = useSelector((state: RootState) => state.personalInfo);
	const familyFinancial = useSelector(
		(state: RootState) => state.familyFinancial,
	);
	const situationDescription = useSelector(
		(state: RootState) => state.situationDescription,
	);

	const stats = useMemo(() => {
		const personalFields = Object.values(personalInfo).filter(
			(value) => value && value !== "",
		).length;
		const personalTotal = Object.keys(personalInfo).length;

		const familyFields = Object.values(familyFinancial).filter(
			(value) => value && value !== "",
		).length;
		const familyTotal = Object.keys(familyFinancial).length;

		const situationFields = Object.values(situationDescription).filter(
			(value) => value && value !== "",
		).length;
		const situationTotal = Object.keys(situationDescription).length;

		const totalCompleted = personalFields + familyFields + situationFields;
		const totalFields = personalTotal + familyTotal + situationTotal;
		const percentage = Math.round((totalCompleted / totalFields) * 100);

		return {
			personal: { completed: personalFields, total: personalTotal },
			family: { completed: familyFields, total: familyTotal },
			situation: { completed: situationFields, total: situationTotal },
			overall: { completed: totalCompleted, total: totalFields, percentage },
		};
	}, [personalInfo, familyFinancial, situationDescription]);

	return (
		<Box sx={{ mb: 3 }}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					{stats.personal.completed === stats.personal.total ? (
						<CheckCircle color="success" sx={{ mr: 1 }} />
					) : (
						<RadioButtonUnchecked sx={{ mr: 1 }} />
					)}
					<Typography variant="body2">
						{t("step1")}: {stats.personal.completed}/{stats.personal.total}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					{stats.family.completed === stats.family.total ? (
						<CheckCircle color="success" sx={{ mr: 1 }} />
					) : (
						<RadioButtonUnchecked sx={{ mr: 1 }} />
					)}
					<Typography variant="body2">
						{t("step2")}: {stats.family.completed}/{stats.family.total}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					{stats.situation.completed === stats.situation.total ? (
						<CheckCircle color="success" sx={{ mr: 1 }} />
					) : (
						<RadioButtonUnchecked sx={{ mr: 1 }} />
					)}
					<Typography variant="body2">
						{t("step3")}: {stats.situation.completed}/{stats.situation.total}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default CompletionStats;

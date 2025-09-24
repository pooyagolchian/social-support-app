import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import FamilyFinancialInfo from "@/pages/FamilyFinancialInfo";
import PersonalInfo from "@/pages/PersonalInfo";
import SituationDescription from "@/pages/SituationDescription";

const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Navigate to={ROUTES.PERSONAL_INFO} />} />
			<Route path={ROUTES.PERSONAL_INFO} element={<PersonalInfo />} />
			<Route path={ROUTES.FAMILY_FINANCIAL} element={<FamilyFinancialInfo />} />
			<Route path={ROUTES.SITUATION_DESCRIPTION} element={<SituationDescription />} />
		</Routes>
	);
};

export default AppRouter;
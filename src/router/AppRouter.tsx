import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundaryTest from "@/components/ErrorBoundaryTest";
import { ROUTES } from "@/constants/routes";
import {
	Forbidden,
	NotFound,
	ServerError,
	Unauthorized,
} from "@/pages/ErrorPages";
import FamilyFinancialInfo from "@/pages/FamilyFinancialInfo";
import PersonalInfo from "@/pages/PersonalInfo";
import SituationDescription from "@/pages/SituationDescription";

const AppRouter = () => {
	return (
		<Routes>
			<Route
				path={ROUTES.HOME}
				element={<Navigate to={ROUTES.PERSONAL_INFO} />}
			/>
			<Route path={ROUTES.PERSONAL_INFO} element={<PersonalInfo />} />
			<Route path={ROUTES.FAMILY_FINANCIAL} element={<FamilyFinancialInfo />} />
			<Route
				path={ROUTES.SITUATION_DESCRIPTION}
				element={<SituationDescription />}
			/>
			<Route path="/401" element={<Unauthorized />} />
			<Route path="/403" element={<Forbidden />} />
			<Route path="/500" element={<ServerError />} />
			<Route path="/test-error-boundary" element={<ErrorBoundaryTest />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRouter;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FamilyFinancialState {
	maritalStatus: string;
	dependents: string;
	employmentStatus: string;
	monthlyIncome: string;
	housingStatus: string;
}

const initialState: FamilyFinancialState = {
	maritalStatus: "",
	dependents: "",
	employmentStatus: "",
	monthlyIncome: "",
	housingStatus: "",
};

const familyFinancialSlice = createSlice({
	name: "familyFinancial",
	initialState,
	reducers: {
		updateFamilyFinancialInfo: (
			state,
			action: PayloadAction<FamilyFinancialState>,
		) => {
			return { ...state, ...action.payload };
		},
		resetFamilyFinancialInfo: () => initialState,
	},
});

export const { updateFamilyFinancialInfo, resetFamilyFinancialInfo } =
	familyFinancialSlice.actions;
export default familyFinancialSlice.reducer;

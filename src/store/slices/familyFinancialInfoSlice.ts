import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FamilyFinancialInfoState {
	maritalStatus: string;
	dependents: number;
	employmentStatus: string;
	monthlyIncome: number;
	housingStatus: string;
}

const initialState: FamilyFinancialInfoState = {
	maritalStatus: "",
	dependents: 0,
	employmentStatus: "",
	monthlyIncome: 0,
	housingStatus: "",
};

const familyFinancialInfoSlice = createSlice({
	name: "familyFinancialInfo",
	initialState,
	reducers: {
		updateFamilyFinancialInfo: (
			state,
			action: PayloadAction<Partial<FamilyFinancialInfoState>>,
		) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateFamilyFinancialInfo } = familyFinancialInfoSlice.actions;
export default familyFinancialInfoSlice.reducer;

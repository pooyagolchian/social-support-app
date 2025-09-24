import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SituationDescriptionState {
	currentFinancialSituation: string;
	employmentCircumstances: string;
	reasonForApplying: string;
}

const initialState: SituationDescriptionState = {
	currentFinancialSituation: "",
	employmentCircumstances: "",
	reasonForApplying: "",
};

const situationDescriptionSlice = createSlice({
	name: "situationDescription",
	initialState,
	reducers: {
		updateSituationDescription: (
			state,
			action: PayloadAction<SituationDescriptionState>,
		) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateSituationDescription } = situationDescriptionSlice.actions;
export default situationDescriptionSlice.reducer;

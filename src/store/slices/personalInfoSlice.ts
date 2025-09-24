import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfoState {
	name: string;
	nationalId: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	city: string;
	state: string;
	country: string;
	phone: string;
	email: string;
}

const initialState: PersonalInfoState = {
	name: "",
	nationalId: "",
	dateOfBirth: "",
	gender: "",
	address: "",
	city: "",
	state: "",
	country: "",
	phone: "",
	email: "",
};

const personalInfoSlice = createSlice({
	name: "personalInfo",
	initialState,
	reducers: {
		updatePersonalInfo: (
			state,
			action: PayloadAction<Partial<PersonalInfoState>>,
		) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updatePersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;

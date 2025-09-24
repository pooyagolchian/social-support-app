import { z } from "zod";

export const personalInfoSchema = z.object({
	name: z.string().min(1, "Name is required"),
	nationalId: z.string().min(1, "National ID is required"),
	dateOfBirth: z.string().min(1, "Date of Birth is required"),
	gender: z.string().min(1, "Gender is required"),
	address: z.string().min(1, "Address is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	country: z.string().min(1, "Country is required"),
	phone: z.string().min(1, "Phone is required"),
	email: z.string().email("Invalid email address"),
});

export const familyFinancialInfoSchema = z.object({
	maritalStatus: z.string().min(1, "Marital Status is required"),
	dependents: z.number().min(0, "Dependents cannot be negative"),
	employmentStatus: z.string().min(1, "Employment Status is required"),
	monthlyIncome: z.number().min(0, "Monthly Income cannot be negative"),
	housingStatus: z.string().min(1, "Housing Status is required"),
});

export const situationDescriptionSchema = z.object({
	currentFinancialSituation: z
		.string()
		.min(1, "Current Financial Situation is required"),
	employmentCircumstances: z
		.string()
		.min(1, "Employment Circumstances is required"),
	reasonForApplying: z.string().min(1, "Reason for Applying is required"),
});

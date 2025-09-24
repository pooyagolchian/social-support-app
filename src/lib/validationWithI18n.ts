import { useTranslation } from "react-i18next";
import { z } from "zod";

export const getPersonalInfoSchema = (t: (key: string) => string) =>
	z.object({
		name: z.string().min(1, t("validation.nameRequired")),
		nationalId: z.string().min(1, t("validation.nationalIdRequired")),
		dateOfBirth: z.string().min(1, t("validation.dateOfBirthRequired")),
		gender: z.string().min(1, t("validation.genderRequired")),
		address: z.string().min(1, t("validation.addressRequired")),
		city: z.string().min(1, t("validation.cityRequired")),
		state: z.string().min(1, t("validation.stateRequired")),
		country: z.string().min(1, t("validation.countryRequired")),
		phone: z
			.string()
			.min(1, t("validation.phoneRequired"))
			.refine((value) => {
				const digits = value.replace(/\D/g, "");
				const uaePattern = /^971?5[0-9]{8}$/;
				return uaePattern.test(digits);
			}, t("validation.invalidPhone")),
		email: z.string().email(t("validation.invalidEmail")),
	});

export const getFamilyFinancialSchema = (t: (key: string) => string) =>
	z.object({
		maritalStatus: z.string().min(1, t("validation.maritalStatusRequired")),
		dependents: z
			.string()
			.min(1, t("validation.dependentsRequired"))
			.transform(Number)
			.pipe(z.number().min(0, t("validation.dependentsMinimum"))),
		employmentStatus: z.enum(
			["employed", "unemployed", "self-employed", "retired", "student"],
			{
				required_error: t("validation.employmentStatusRequired"),
			},
		),
		monthlyIncome: z
			.string()
			.min(1, t("validation.monthlyIncomeRequired"))
			.transform(Number)
			.pipe(z.number().min(0, t("validation.monthlyIncomeMinimum"))),
		housingStatus: z.enum(["owned", "rented", "shared", "homeless"], {
			required_error: t("validation.housingStatusRequired"),
		}),
	});

export const getSituationDescriptionSchema = (t: (key: string) => string) =>
	z.object({
		currentFinancialSituation: z
			.string()
			.min(1, t("validation.fieldRequired"))
			.min(10, t("validation.currentFinancialSituationMin")),
		employmentCircumstances: z
			.string()
			.min(1, t("validation.fieldRequired"))
			.min(10, t("validation.employmentCircumstancesMin")),
		reasonForApplying: z
			.string()
			.min(1, t("validation.fieldRequired"))
			.min(10, t("validation.reasonForApplyingMin")),
	});

export const usePersonalInfoSchema = () => {
	const { t } = useTranslation();
	return getPersonalInfoSchema(t);
};

export const useFamilyFinancialSchema = () => {
	const { t } = useTranslation();
	return getFamilyFinancialSchema(t);
};

export const useSituationDescriptionSchema = () => {
	const { t } = useTranslation();
	return getSituationDescriptionSchema(t);
};
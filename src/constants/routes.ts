export const ROUTES = {
	HOME: "/",
	PERSONAL_INFO: "/step1",
	FAMILY_FINANCIAL: "/step2",
	SITUATION_DESCRIPTION: "/step3",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];

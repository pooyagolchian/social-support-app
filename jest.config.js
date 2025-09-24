export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	extensionsToTreatAsEsm: [".ts", ".tsx"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"^(\\.{1,2}/.*)\\.js$": "$1",
		"^.*/pages/SituationDescription$": "<rootDir>/src/__mocks__/SituationDescription.tsx",
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
		"<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
	],
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/main.tsx",
		"!src/vite-env.d.ts",
	],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				useESM: true,
				tsconfig: "<rootDir>/tsconfig.app.json",
			},
		],
	},
	testEnvironmentOptions: {
		customExportConditions: ["node", "node-addons"],
	},
	transformIgnorePatterns: [
		"node_modules/(?!(.*\\.mjs$))"
	],
};

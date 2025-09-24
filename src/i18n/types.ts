import type { resources } from "./config";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		resources: (typeof resources)["en"];
	}
}
import { createComponentEngine } from "@playwright";

export const headerEngine = createComponentEngine(
	"header",
	{
		getMainElement: (body) => body.getByTestId("header"),
		getElements: (mainElement) => ({
			signButton: mainElement.getByTestId("header-sign-button"),
		}),
	},
);

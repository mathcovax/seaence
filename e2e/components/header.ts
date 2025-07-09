import { createComponentEngine } from "@playwright";

export const headerEngine = createComponentEngine(
	"header",
	{
		getMainElement: (page) => page.getByTestId("header"),
		getElements: (mainElement) => ({
			signButton: mainElement.getByTestId("header-sign-button"),
		}),
	},
);

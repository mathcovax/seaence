import { createComponentEngine } from "@playwright";

export const authDialogEngine = createComponentEngine(
	"authDialog",
	{
		getMainElement: (page) => page.getByTestId("auth-dialog"),
		getElements: (mainElement) => ({
			googleSignButton: mainElement.getByTestId("auth-dialog-google-sign-button"),
		}),
	},
);

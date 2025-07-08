import { createComponentEngine } from "@playwright";

export const authDialogEngine = createComponentEngine(
	"authDialog",
	{
		getMainElement: (page) => page.locator(""),
	},
);

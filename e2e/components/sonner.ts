import { createComponentEngine } from "@playwright";

export const sonnerEngine = createComponentEngine(
	"sonner",
	{
		getMainElement: (body) => body.locator("[data-sonner-toaster=\"\"]"),
		getElements: (mainElement) => ({
			firstDefault: mainElement.locator("[data-type=\"default\"]").first(),
			firstWarning: mainElement.locator("[data-type=\"warning\"]").first(),
			firstError: mainElement.locator("[data-type=\"error\"]").first(),
		}),
	},
);

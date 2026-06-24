import { createComponent } from "@duplojs/playwright";

export const sonnerComponent = createComponent(
	"sonner",
	{
		getMainElement: ({ body }) => body.locator("[data-sonner-toaster=\"\"]"),
		getElements: ({ mainElement }) => ({
			firstDefault: mainElement.locator("[data-type=\"default\"]").first(),
			firstWarning: mainElement.locator("[data-type=\"warning\"]").first(),
			firstError: mainElement.locator("[data-type=\"error\"]").first(),
		}),
	},
);

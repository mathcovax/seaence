import { createComponent } from "@duplojs/playwright";

export const headerComponent = createComponent(
	"header",
	{
		getMainElement: ({ body }) => body.getByTestId("header"),
		getElements: ({ mainElement }) => ({
			signButton: mainElement.getByTestId("header-sign-button"),
		}),
	},
);

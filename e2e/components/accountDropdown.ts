import { createComponent } from "@duplojs/playwright";

export const accountDropdownComponent = createComponent(
	"accountDropdown",
	{
		getMainElement: ({ body }) => body.getByTestId("account-dropdown"),
		getElements: ({ mainElement, body }) => ({
			button: mainElement.getByTestId("account-dropdown-button"),
			disconnectButton: body.getByTestId("account-dropdown-disconnect"),
		}),
	},
);

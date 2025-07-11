import { createComponentEngine } from "@playwright";

export const accountDropdownEngine = createComponentEngine(
	"accountDropdown",
	{
		getMainElement: (body) => body.getByTestId("account-dropdown"),
		getElements: (mainElement) => ({
			button: mainElement.getByTestId("account-dropdown-button"),
		}),
	},
);

import { createComponentEngine } from "@playwright";

export const accountDropdownEngine = createComponentEngine(
	"accountDropdown",
	{
		getMainElement: (body) => body.getByTestId("account-dropdown"),
		getElements: (mainElement, body) => ({
			button: mainElement.getByTestId("account-dropdown-button"),
			disconnectButton: body.getByTestId("account-dropdown-disconnect"),
			documentFolderButton: body.getByTestId("account-dropdown-document-folder"),
			profilButton: body.getByTestId("account-dropdown-profil"),
		}),
	},
);

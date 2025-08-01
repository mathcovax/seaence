import { createComponentEngine } from "@playwright";

export const documentFolderHeaderEngine = createComponentEngine(
	"documentFolderHeader",
	{
		getMainElement: (body) => body.getByTestId("document-folder-header"),
		getElements: (mainElement) => ({
			createDocumentFolderButton: mainElement.getByTestId("document-folder-create-document-folder"),
		}),
	},
);

import { createPageEngine } from "@playwright";

export const documentFolderPageEngine = createPageEngine(
	"documentFolder",
	() => "/document-folder",
	{
		getMainElement: (body) => body.getByTestId("document-folder-page"),
	},
);

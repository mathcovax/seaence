import { createPageEngine } from "@playwright";

export const documentInFolderPageEngine = createPageEngine(
	"documentInFolder",
	({ documentFolderId }: { documentFolderId: string }) => `/document-folder/${documentFolderId}/documents`,
	{
		getMainElement: (body) => body.getByTestId("document-in-folder-page"),
	},
);

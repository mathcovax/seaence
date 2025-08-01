import { createPageEngine } from "@playwright";

export const documentPageEngine = createPageEngine(
	"document",
	({ documentId }: { documentId: string }) => `/document/${documentId}`,
	{
		getMainElement: (body) => body.getByTestId("document-page"),
		getElements: (mainElement) => ({
			openButtonCreateManyDocumentInFolder: mainElement.getByTestId("create-many-document-in-folder-dialog-button"),
		}),
	},
);

import { createPageEngine } from "@playwright";

export const documentPageEngine = createPageEngine(
	"home",
	({ documentId }: { documentId: string }) => `/document/${documentId}`,
	{
		getMainElement: (body) => body.getByTestId("document-page"),
	},
);

import { createPage } from "@duplojs/playwright";

export const documentPage = createPage(
	"document",
	{
		makePath: ({ documentId }: { documentId: string }) => `/document/${documentId}`,
		getMainElement: ({ body }) => body
			.locator("main")
			.filter({ hasText: "Ajouter dans un dossier" }),
		getElements: ({ mainElement }) => ({
			addToFolderButton: mainElement.getByRole("button", { name: "Ajouter dans un dossier" }),
		}),
	},
);

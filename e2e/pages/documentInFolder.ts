import { createPage } from "@duplojs/playwright";
import { expect } from "playwright/test";

export const documentInFolderPage = createPage(
	"documentInFolder",
	{
		makePath: ({ documentFolderId }: { documentFolderId: string }) => `/document-folder/${documentFolderId}/documents`,
		getMainElement: ({ body }) => body
			.locator("main")
			.filter({ hasText: "Dossier :" }),
		getElements: ({ mainElement, body }) => ({
			searchInput: mainElement.getByPlaceholder("Rechercher un document..."),
			renameButton: body.getByRole("menuitem", { name: /Renomer|Renommer/u }),
			deleteButton: body.getByRole("menuitem", { name: "Supprimer" }),
		}),
		getMethods: ({ mainElement }) => {
			function documentCard(documentName: string) {
				return mainElement
					.getByText(documentName, { exact: true })
					.locator("xpath=ancestor::div[contains(@class, 'group')][1]");
			}

			return {
				async openDocumentMenu(documentName: string) {
					await documentCard(documentName)
						.locator("button")
						.last()
						.click();
				},
				async expectDocumentVisible(documentName: string) {
					await expect(documentCard(documentName)).toBeVisible();
				},
				async expectDocumentHidden(documentName: string) {
					await expect(documentCard(documentName)).toBeHidden();
				},
			};
		},
	},
);

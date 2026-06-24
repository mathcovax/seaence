import { createPage } from "@duplojs/playwright";
import { expect } from "playwright/test";

export const documentFolderPage = createPage(
	"documentFolder",
	{
		makePath: () => "/document-folder",
		getMainElement: ({ body }) => body
			.locator("main")
			.filter({ hasText: "Dossiers" }),
		getElements: ({ mainElement, body }) => ({
			searchInput: mainElement.getByPlaceholder("Rechercher un dossier..."),
			addButton: mainElement.getByPlaceholder("Rechercher un dossier...")
				.locator("..")
				.locator("button")
				.last(),
			renameButton: body.getByRole("menuitem", { name: /Renomer|Renommer/u }),
			deleteButton: body.getByRole("menuitem", { name: "Supprimer" }),
		}),
		getMethods: ({ mainElement }) => {
			function folderCard(folderName: string) {
				return mainElement
					.locator("li")
					.filter({ hasText: folderName });
			}

			return {
				async openFolder(folderName: string) {
					await folderCard(folderName).click();
				},
				async openFolderMenu(folderName: string) {
					await folderCard(folderName)
						.locator("button")
						.last()
						.click();
				},
				async expectFolderVisible(folderName: string) {
					await expect(folderCard(folderName)).toBeVisible();
				},
				async expectFolderHidden(folderName: string) {
					await expect(folderCard(folderName)).toBeHidden();
				},
				async expectFolderDocumentCount(folderName: string, count: number) {
					await expect(
						folderCard(folderName),
					).toContainText(`${count}`);
				},
			};
		},
	},
);

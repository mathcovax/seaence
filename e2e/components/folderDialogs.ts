import { createComponent } from "@duplojs/playwright";

export const createDocumentFolderDialogComponent = createComponent(
	"createDocumentFolderDialog",
	{
		getMainElement: ({ body }) => body.getByRole("dialog", { name: "Créer un dossier" }),
		getElements: ({ mainElement }) => ({
			nameInput: mainElement.locator("form")
				.first()
				.locator("input")
				.first(),
			submitButton: mainElement.getByRole("button", { name: "Créer" }),
		}),
	},
);

export const renameDocumentFolderDialogComponent = createComponent(
	"renameDocumentFolderDialog",
	{
		getMainElement: ({ body }) => body.getByRole("dialog", { name: /Renomer le dossier|Renommer le dossier/u }),
		getElements: ({ mainElement }) => ({
			nameInput: mainElement.locator("form")
				.first()
				.locator("input")
				.first(),
			submitButton: mainElement.getByRole("button", { name: /Renomer|Renommer/u }),
		}),
	},
);

export const removeDocumentFolderDialogComponent = createComponent(
	"removeDocumentFolderDialog",
	{
		getMainElement: ({ body }) => body.getByRole("dialog", { name: "Supprimer un dossier" }),
		getElements: ({ mainElement }) => ({
			acceptButton: mainElement.getByRole("button", { name: "Valider" }),
		}),
	},
);

export const createManyDocumentInFolderDialogComponent = createComponent(
	"createManyDocumentInFolderDialog",
	{
		getMainElement: ({ body }) => body.getByRole("dialog", { name: "Ajouter le document" }),
		getElements: ({ mainElement, body }) => ({
			nameInput: mainElement.locator("input").first(),
			folderCombobox: mainElement.locator("[role=\"combobox\"]").first(),
			folderSearchInput: body.locator("[data-slot=\"command-input\"]").first(),
			submitButton: mainElement.getByRole("button", { name: "Ajouter" }),
		}),
		getMethods: ({ body }) => ({
			async selectFolder(folderName: string) {
				await body.locator("[data-slot=\"command-item\"]", { hasText: folderName }).click();
			},
		}),
	},
);

export const renameDocumentInFolderDialogComponent = createComponent(
	"renameDocumentInFolderDialog",
	{
		getMainElement: ({ body }) => body.getByRole("dialog", { name: /Renomer le document\.|Renommer le document\./u }),
		getElements: ({ mainElement }) => ({
			nameInput: mainElement.locator("form")
				.first()
				.locator("input")
				.first(),
			submitButton: mainElement.getByRole("button", { name: /Renomer|Renommer/u }),
		}),
	},
);

export const removeDocumentInFolderDialogComponent = createComponent(
	"removeDocumentInFolderDialog",
	{
		getMainElement: ({ body }) => body.getByRole("dialog", { name: "Supprimer un document" }),
		getElements: ({ mainElement }) => ({
			acceptButton: mainElement.getByRole("button", { name: "Valider" }),
		}),
	},
);

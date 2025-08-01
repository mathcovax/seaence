import { createComponentEngine } from "@playwright";

export const documentFolderWrapperEngine = createComponentEngine(
	"documentFolderWrapper",
	{
		getMainElement: (body) => body.getByTestId("document-folder-wrapper"),
		getElements: (mainElement, body) => ({
			documentFolderList: mainElement.getByTestId("document-folder-wrapper-list"),
			documentFolderNoResult: mainElement.getByTestId("document-folder-wrapper-no-result"),
			firstDocumentFolderList: mainElement.getByTestId("document-folder-wrapper-element").first(),
			get firstDocumentFolderListButton() {
				return this.firstDocumentFolderList.getByTestId("document-folder-card-button");
			},
			firstDocumentFolderListButtonDropdownMenuDeleteOption: body.getByTestId(
				"document-folder-card-button-dropdown-menu-delete-option",
			),
			documentFolderDeleteDialog: body.getByRole("dialog"),
			get documentFolderDeleteDialogButtonValidate() {
				return this.documentFolderDeleteDialog.locator("button.bg-destructive");
			},
		}),
	},
);

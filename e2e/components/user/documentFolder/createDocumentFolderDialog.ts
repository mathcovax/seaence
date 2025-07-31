import { createComponentEngine } from "@playwright";

export const createDocumentFolderDialogEngine = createComponentEngine(
	"createDocumentFolderDialog",
	{
		getMainElement: (body) => body.getByTestId("create-document-folder-dialog"),
		getElements: (mainElement) => ({
			createDocumentFolderForm: mainElement.getByTestId("create-document-folder-dialog-form"),
			get createDocumentFolderFormDocumentFolderName() {
				return this.createDocumentFolderForm.locator("input#\\.name");
			},
			get createDocumentFolderFormDocumentFolderNameHint() {
				return this.createDocumentFolderForm.locator("small#\\.name");
			},
			get createDocumentFolderFormSubmitButton() {
				return this.createDocumentFolderForm.getByTestId("create-document-folder-dialog-form-submit-button");
			},
		}),
	},
);

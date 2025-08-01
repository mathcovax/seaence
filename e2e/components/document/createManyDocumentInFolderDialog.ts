import { createComponentEngine } from "@playwright";

export const createManyDocumentInFolderDialogEngine = createComponentEngine(
	"createManyDocumentInFolderDialog",
	{
		getMainElement: (body) => body.getByTestId("create-many-document-in-folder-dialog"),
		getElements: (mainElement, body) => ({
			closeButton: mainElement.getByRole("button", { name: "Close" }),
			createDocumentFolderDialogButton: mainElement.getByTestId("create-document-folder-dialog-button"),
			form: mainElement.getByTestId("create-many-document-in-folder-dialog-form"),
			get formSubmitButton() {
				return this.form.getByTestId("create-many-document-in-folder-dialog-form-submit-button");
			},
			get formInputName() {
				return this.form.locator("input#\\.name");
			},
			get formHintName() {
				return this.form.locator("small#\\.name");
			},
			get formInputMultiComboboxFolder() {
				return this.form.getByRole("combobox");
			},
			get formInputMultiComboboxFolderAddButton() {
				return this.form.getByRole("combobox").locator("button");
			},
			formInputMultiComboboxFolderDialog: body.locator("[role=\"dialog\"]:has([data-slot=\"command-input\"])"),
			get formInputMultiComboboxFolderDialogInputSearchFolder() {
				return this.formInputMultiComboboxFolderDialog.locator("input");
			},
			documentFolderList: mainElement.getByTestId("create-many-document-in-folder-dialog-document-folder-list"),
			lastDocumentFolderList: mainElement.getByTestId("create-many-document-in-folder-dialog-document-folder-list-element").last(),
		}),
	},
);

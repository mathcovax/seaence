import { simpleSearchInputEngine } from "@components/search/simpleSearchInput";
import { simpleSearchPageEngine } from "@pages/simpleSearch";
import { Actions, testCLient } from "@playwright";
import { connectUser } from "@processes/connectUser";
import { Assertions } from "../playwright/assertions";
import { searchResultWrapperEngine } from "@components/search/searchResultWrapper";
import { documentPageEngine } from "@pages/document";
import { sonnerEngine } from "@components/sonner";
import { createManyDocumentInFolderDialogEngine } from "@components/document/createManyDocumentInFolderDialog";
import { createDocumentFolderDialogEngine } from "@components/user/documentFolder/createDocumentFolderDialog";
import { accountDropdownEngine } from "@components/accountDropdown";
import { documentFolderPageEngine } from "@pages/documentFolder";
import { documentFolderWrapperEngine } from "@components/user/documentFolder/ducumentFolderWrapper";

const documentInFolderNameTooLong = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

testCLient.describe(
	"AddDocumentInFolder",
	() => {
		testCLient("add document in folder", async({ webSite, firebaseAuth }) => {
			await webSite.iNavigateTo(simpleSearchPageEngine);
			const sonner = await webSite.iWantToExist(sonnerEngine);

			await connectUser({
				webSite,
				firebaseAuth,
			});

			const simpleSearchInput = await webSite.iWantToSee(simpleSearchInputEngine);

			await Actions
				.withStepContent("search meta analysis")
				.fill(simpleSearchInput, "inputSearch", "meta");

			await Actions.click(simpleSearchInput, "submitButton");

			const searchResultWrapper = await webSite.iWantToSee(searchResultWrapperEngine);

			const documentId = await Assertions.extractTestValue(searchResultWrapper, "firstResult");

			await Actions
				.withStepContent("click first document result")
				.click(searchResultWrapper, "firstResult");

			const documentPage = await webSite.iWantToBeOnThisPage(documentPageEngine, { documentId });

			await Actions
				.withStepContent("open dialog create many document in folder")
				.click(documentPage, "openButtonCreateManyDocumentInFolder");

			const createManyDocumentInFolderDialog = await webSite.iWantToSee(createManyDocumentInFolderDialogEngine);

			await Assertions.toBeVisible(createManyDocumentInFolderDialog, "createDocumentFolderDialogButton");

			await Actions
				.withStepContent("open dialog create document folder")
				.click(createManyDocumentInFolderDialog, "createDocumentFolderDialogButton");

			const createDocumentFolderDialog = await webSite.iWantToSee(createDocumentFolderDialogEngine);

			await Assertions.toBeVisible(createDocumentFolderDialog, "createDocumentFolderForm");

			await Actions
				.withStepContent("fill good folder name")
				.fill(createDocumentFolderDialog, "createDocumentFolderFormDocumentFolderName", "test");

			await Actions.click(createDocumentFolderDialog, "createDocumentFolderFormSubmitButton");

			await Assertions.toBeVisible(sonner, "firstDefault");

			await Actions
				.withStepContent("fill short document in folder name")
				.fill(createManyDocumentInFolderDialog, "formInputName", "A");

			await Actions.click(createManyDocumentInFolderDialog, "formSubmitButton");

			await Assertions
				.withStepContent("alert a short document in folder name")
				.toHaveText(createManyDocumentInFolderDialog, "formHintName");

			await Actions
				.withStepContent("fill too long document in folder name")
				.fill(createManyDocumentInFolderDialog, "formInputName", documentInFolderNameTooLong);

			await Actions.click(createManyDocumentInFolderDialog, "formSubmitButton");

			await Assertions
				.withStepContent("alert too long document in folder name")
				.toHaveText(createManyDocumentInFolderDialog, "formHintName");

			await Actions
				.withStepContent("fill good document in folder name")
				.fill(createManyDocumentInFolderDialog, "formInputName", "testDocumentInFolderName");

			await Actions.click(createManyDocumentInFolderDialog, "formSubmitButton");

			await Assertions
				.withStepContent("no hint")
				.toHaveNoText(createManyDocumentInFolderDialog, "formHintName");

			await Assertions.toBeVisible(createManyDocumentInFolderDialog, "formInputMultiComboboxFolder");

			await Actions
				.withStepContent("add document folder")
				.click(createManyDocumentInFolderDialog, "formInputMultiComboboxFolderAddButton");

			await Assertions.toBeVisible(createManyDocumentInFolderDialog, "formInputMultiComboboxFolderDialog");

			await Actions.fill(createManyDocumentInFolderDialog, "formInputMultiComboboxFolderDialogInputSearchFolder", "test");

			await Actions.press(createManyDocumentInFolderDialog, "formInputMultiComboboxFolderDialogInputSearchFolder", "Enter");

			await Actions
				.withStepContent("create document in folder")
				.click(createManyDocumentInFolderDialog, "formSubmitButton");

			await Assertions.toBeVisible(sonner, "firstDefault");

			await Actions
				.withStepContent("close dialog create many document in folder")
				.click(createManyDocumentInFolderDialog, "closeButton");

			const accountDropdown = await webSite.iWantToSee(accountDropdownEngine);

			await Actions.click(accountDropdown, "button");

			await Actions
				.withStepContent("delete docuement folder")
				.click(accountDropdown, "documentFolderButton");

			await webSite.iWantToBeOnThisPage(documentFolderPageEngine);

			const documentFolderWrapper = await webSite.iWantToSee(documentFolderWrapperEngine);

			await Assertions.toBeVisible(documentFolderWrapper, "firstDocumentFolderList");

			await Actions
				.withStepContent("open dropdown menu option document folder")
				.click(documentFolderWrapper, "firstDocumentFolderListButton");

			await Actions
				.withStepContent("delete folder")
				.click(documentFolderWrapper, "firstDocumentFolderListButtonDropdownMenuDeleteOption");

			await Assertions.toBeVisible(documentFolderWrapper, "documentFolderDeleteDialog");

			await Actions
				.withStepContent("validate delete operation")
				.click(documentFolderWrapper, "documentFolderDeleteDialogButtonValidate");

			await Assertions.toBeVisible(sonner, "firstDefault");
		});
	},
);

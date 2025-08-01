import { Actions, testCLient } from "@playwright";
import { connectUser } from "@processes/connectUser";
import { Assertions } from "../playwright/assertions";
import { homePageEngine } from "@pages/home";
import { accountDropdownEngine } from "@components/accountDropdown";
import { documentFolderPageEngine } from "@pages/documentFolder";
import { documentFolderHeaderEngine } from "@components/user/documentFolder/documentFolderHeader";
import { createDocumentFolderDialogEngine } from "@components/user/documentFolder/createDocumentFolderDialog";
import { documentFolderWrapperEngine } from "@components/user/documentFolder/ducumentFolderWrapper";
import { documentInFolderPageEngine } from "@pages/documentInFolder";

const folderNameTooLong = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

testCLient.describe(
	"CreateDocumentFolder",
	() => {
		testCLient("create folder", async({ webSite, firebaseAuth }) => {
			await webSite.iNavigateTo(homePageEngine);

			await connectUser({
				webSite,
				firebaseAuth,
			});

			const accountDropdown = await webSite.iWantToSee(accountDropdownEngine);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "documentFolderButton");

			await webSite.iWantToBeOnThisPage(documentFolderPageEngine);

			const documentFolderWrapper = await webSite.iWantToSee(documentFolderWrapperEngine);

			await Assertions.toBeVisible(documentFolderWrapper, "documentFolderNoResult");

			const documentFolderHeader = await webSite.iWantToSee(documentFolderHeaderEngine);

			await Actions
				.withStepContent("open create document folder dialog")
				.click(documentFolderHeader, "createDocumentFolderButton");

			const createDocumentFolderDialog = await webSite.iWantToSee(createDocumentFolderDialogEngine);

			await Assertions.toBeVisible(createDocumentFolderDialog, "createDocumentFolderForm");

			await Actions
				.withStepContent("fill short folder name")
				.fill(createDocumentFolderDialog, "createDocumentFolderFormDocumentFolderName", "A");

			await Actions.click(createDocumentFolderDialog, "createDocumentFolderFormSubmitButton");

			await Assertions
				.withStepContent("alert a short folder name")
				.toHaveText(createDocumentFolderDialog, "createDocumentFolderFormDocumentFolderNameHint");

			await Actions
				.withStepContent("fill too long folder name")
				.fill(createDocumentFolderDialog, "createDocumentFolderFormDocumentFolderName", folderNameTooLong);

			await Actions.click(createDocumentFolderDialog, "createDocumentFolderFormSubmitButton");

			await Assertions
				.withStepContent("alert too long folder name")
				.toHaveText(createDocumentFolderDialog, "createDocumentFolderFormDocumentFolderNameHint");

			await Actions
				.withStepContent("fill too long folder name")
				.fill(createDocumentFolderDialog, "createDocumentFolderFormDocumentFolderName", "testName");

			await Assertions
				.withStepContent("no hint")
				.toHaveNoText(createDocumentFolderDialog, "createDocumentFolderFormDocumentFolderNameHint");

			await Actions.click(createDocumentFolderDialog, "createDocumentFolderFormSubmitButton");

			await Assertions.toBeVisible(documentFolderWrapper, "documentFolderList");

			const documentFolderId = await Assertions.extractTestValue(documentFolderWrapper, "firstDocumentFolderList");

			await Actions
				.withStepContent("click first folder")
				.click(documentFolderWrapper, "firstDocumentFolderList");

			await webSite.iWantToBeOnThisPage(documentInFolderPageEngine, { documentFolderId });

			await webSite.iNavigateTo(documentFolderPageEngine);

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

			await Assertions
				.withStepContent("document folder has been successfully deleted")
				.toBeVisible(documentFolderWrapper, "documentFolderNoResult");
		});
	},
);

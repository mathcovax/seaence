import { Actions, Assertions } from "@duplojs/playwright";
import { testClient } from "@client";
import { documentFolderPage, documentInFolderPage, documentPage, homePage, simpleSearchPage } from "@pages";
import {
	accountDropdownComponent,
	createDocumentFolderDialogComponent,
	createManyDocumentInFolderDialogComponent,
	headerComponent,
	removeDocumentFolderDialogComponent,
	removeDocumentInFolderDialogComponent,
	renameDocumentInFolderDialogComponent,
} from "@components";
import { authDialogComponent } from "@components/auth";
import { createFirebaseUser, deleteFirebaseUser, initFirebaseAuth, setupFirebaseAuth } from "@providers/firebase";
import type { Page } from "playwright/test";

const { firebaseAuth } = await initFirebaseAuth();

const radix = 36;
const randomStartIndex = 2;
const randomEndIndex = 8;
const oneDocument = 1;
const noDocument = 0;
const labelStartIndex = 0;
const labelEndIndex = 3;
const searchTerms = ["sea", "cell", "water", "a"];

function makeName(label: string) {
	return `e2e-${label.slice(labelStartIndex, labelEndIndex)}-${Date.now().toString(radix)}-${Math.random().toString(radix).slice(randomStartIndex, randomEndIndex)}`;
}

function makeUserTestId() {
	return `folder-${Date.now().toString(radix)}-${Math.random().toString(radix).slice(randomStartIndex, randomEndIndex)}`;
}

const { userFirebaseUid, customToken } = await createFirebaseUser({
	firebaseAuth,
	testUserId: makeUserTestId(),
});

let appUserIsRegistered = false;
const folderName = makeName("folder-flow");
const documentInFolderName = makeName("document");
const renamedDocumentInFolderName = `${documentInFolderName}-renamed`;

async function openAuthenticatedHome(page: Page, website: Parameters<typeof headerComponent>[0]) {
	await website.iNavigateTo(homePage);

	await setupFirebaseAuth({
		playwrightPage: page,
		customToken,
	});

	const header = await website.iWantToSee(headerComponent);

	await Actions.click(header, "signButton");

	const authDialog = await website.iWantToSee(authDialogComponent);

	await Actions.click(authDialog, "googleLoginButton");

	if (!appUserIsRegistered) {
		await Assertions.toBeVisible(authDialog, "registerForm");
		await Actions.fill(authDialog, "registerFormUsername", userFirebaseUid);
		await Actions.click(authDialog, "registerFormTriggerSelectLanguage");
		await Actions.click(authDialog, "registerFormSelectLanguageFranceOption");
		await Actions.click(authDialog, "registerFormValideCGU");
		await Actions.click(authDialog, "registerFormSubmitButton");
		appUserIsRegistered = true;
	}

	await website.iWantToSee(accountDropdownComponent);
}

testClient.describe(
	"Folder",
	() => {
		testClient.describe.configure({ mode: "serial" });

		testClient.afterAll(async() => {
			await deleteFirebaseUser({
				firebaseAuth,
				userFirebaseUid,
			});
		});

		testClient("create a folder", async({ website, page }) => {
			await openAuthenticatedHome(page, website);

			const documentFolder = await website.iNavigateTo(documentFolderPage);

			await Actions.click(documentFolder, "addButton");

			const createDialog = await website.iWantToSee(createDocumentFolderDialogComponent);

			await Actions.fill(createDialog, "nameInput", folderName);
			await Actions.click(createDialog, "submitButton");

			await documentFolder.methods.expectFolderVisible(folderName);
		});

		testClient("add a document to the folder", async({ website, page }) => {
			await openAuthenticatedHome(page, website);

			const documentFolder = await website.iNavigateTo(documentFolderPage);

			await documentFolder.methods.expectFolderVisible(folderName);

			const simpleSearch = await website.iNavigateTo(simpleSearchPage);

			await simpleSearch.methods.openFirstResult(searchTerms);

			const document = await website.iWantToSee(documentPage);

			await Assertions.toBeVisible(document, "addToFolderButton");
			await Actions.click(document, "addToFolderButton");

			const dialog = await website.iWantToSee(createManyDocumentInFolderDialogComponent);

			await Actions.fill(dialog, "nameInput", documentInFolderName);
			await Actions.click(dialog, "folderCombobox");
			await Actions.fill(dialog, "folderSearchInput", folderName);
			await dialog.methods.selectFolder(folderName);
			await Actions.click(dialog, "submitButton");

			const folders = await website.iNavigateTo(documentFolderPage);

			await folders.methods.expectFolderDocumentCount(folderName, oneDocument);
			await folders.methods.openFolder(folderName);

			const documentInFolder = await website.iWantToSee(documentInFolderPage);

			await documentInFolder.methods.expectDocumentVisible(documentInFolderName);
		});

		testClient("rename and remove the document from the folder", async({ website, page }) => {
			await openAuthenticatedHome(page, website);

			const folders = await website.iNavigateTo(documentFolderPage);

			await folders.methods.expectFolderVisible(folderName);
			await folders.methods.openFolder(folderName);

			const documentInFolder = await website.iWantToSee(documentInFolderPage);

			await documentInFolder.methods.expectDocumentVisible(documentInFolderName);
			await documentInFolder.methods.openDocumentMenu(documentInFolderName);
			await Actions.click(documentInFolder, "renameButton");

			const renameDialog = await website.iWantToSee(renameDocumentInFolderDialogComponent);

			await Assertions.toHaveValue(renameDialog, "nameInput", documentInFolderName);
			await Actions.fill(renameDialog, "nameInput", renamedDocumentInFolderName);
			await Assertions.toHaveValue(renameDialog, "nameInput", renamedDocumentInFolderName);
			await Actions.click(renameDialog, "submitButton");

			await documentInFolder.methods.expectDocumentVisible(renamedDocumentInFolderName);
			await documentInFolder.methods.expectDocumentHidden(documentInFolderName);

			await documentInFolder.methods.openDocumentMenu(renamedDocumentInFolderName);
			await Actions.click(documentInFolder, "deleteButton");

			const removeDialog = await website.iWantToSee(removeDocumentInFolderDialogComponent);

			await Actions.click(removeDialog, "acceptButton");

			await documentInFolder.methods.expectDocumentHidden(renamedDocumentInFolderName);

			const foldersAfterRemove = await website.iNavigateTo(documentFolderPage);

			await foldersAfterRemove.methods.expectFolderVisible(folderName);
			await foldersAfterRemove.methods.expectFolderDocumentCount(folderName, noDocument);
		});

		testClient("remove the folder", async({ website, page }) => {
			await openAuthenticatedHome(page, website);

			const documentFolder = await website.iNavigateTo(documentFolderPage);

			await documentFolder.methods.expectFolderVisible(folderName);
			await documentFolder.methods.openFolderMenu(folderName);
			await Actions.click(documentFolder, "deleteButton");

			const removeDialog = await website.iWantToSee(removeDocumentFolderDialogComponent);

			await Actions.click(removeDialog, "acceptButton");

			await documentFolder.methods.expectFolderHidden(folderName);
		});
	},
);

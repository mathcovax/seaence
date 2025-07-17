import { testCLient, Actions } from "@playwright";
import { homePageEngine } from "@pages/home";
import { headerEngine } from "@components/header";
import { authDialogEngine } from "@components/auth/authDialog";
import { createFirebaseUser, deleteFirebaseUser, initFirebaseAuth, setupFirebaseAuth } from "@providers/firebase";
import { Assertions } from "../playwright/assertions";
import { sonnerEngine } from "@components/sonner";
import { accountDropdownEngine } from "@components/accountDropdown";

const { firebaseAuth } = await initFirebaseAuth();

const { userFirebaseUid, customToken } = await createFirebaseUser({
	firebaseAuth,
	testUserId: Date.now().toString(),
});

testCLient.describe(
	"Auth",
	() => {
		testCLient.afterAll(async() => {
			await deleteFirebaseUser({
				firebaseAuth,
				userFirebaseUid,
			});
		});

		testCLient("register and disconnect", async({ webSite, page }) => {
			await webSite.iNavigateTo(homePageEngine);

			const sonner = await webSite.iWantToExist(sonnerEngine);

			await setupFirebaseAuth({
				playwrightPage: page,
				customToken,
			});

			const header = await webSite.iWantToSee(headerEngine);

			await Actions.click(header, "signButton");

			const authDialog = await webSite.iWantToSee(authDialogEngine);

			await Actions.click(authDialog, "googleLoginButton");

			await Assertions.toBeVisible(authDialog, "registerForm");

			await Actions
				.withStepContent("fill short username")
				.fill(authDialog, "registerFormUsername", "A");

			await Actions.click(authDialog, "registerFormSubmitButton");

			await Assertions
				.withStepContent("alert a short username")
				.toHaveText(authDialog, "registerFormUsernameHint");

			await Actions
				.withStepContent("fill too long username")
				.fill(authDialog, "registerFormUsername", "thisIsATooLongUsernameForEndToEndTest");

			await Assertions
				.withStepContent("alert too long username")
				.toHaveText(authDialog, "registerFormUsernameHint");

			await Actions
				.withStepContent("fill good username")
				.fill(authDialog, "registerFormUsername", userFirebaseUid);

			await Assertions
				.withStepContent("no hint")
				.toHaveNoText(authDialog, "registerFormUsernameHint");

			await Actions
				.withStepContent("open select language")
				.click(authDialog, "registerFormTriggerSelectLanguage");

			await Actions
				.withStepContent("select french")
				.click(authDialog, "registerFormSelectLanguageFranceOption");

			await Actions
				.withStepContent("valide CGU")
				.click(authDialog, "registerFormValideCGU");

			await Actions.click(authDialog, "registerFormSubmitButton");

			await Assertions
				.toBeVisible(sonner, "firstDefault");

			const accountDropdown = await webSite.iWantToSee(accountDropdownEngine);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "disconnectButton");

			await Assertions.toBeVisible(header, "signButton");
		});

		testCLient("login and disconnect", async({ webSite, page }) => {
			await webSite.iNavigateTo(homePageEngine);

			const sonner = await webSite.iWantToExist(sonnerEngine);

			await setupFirebaseAuth({
				playwrightPage: page,
				customToken,
			});

			const header = await webSite.iWantToSee(headerEngine);

			await Actions.click(header, "signButton");

			const authDialog = await webSite.iWantToSee(authDialogEngine);

			await Actions.click(authDialog, "googleLoginButton");

			await Assertions
				.toBeVisible(sonner, "firstDefault");

			const accountDropdown = await webSite.iWantToSee(accountDropdownEngine);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "disconnectButton");

			await Assertions.toBeVisible(header, "signButton");
		});
	},
);

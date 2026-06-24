import { Actions, Assertions } from "@duplojs/playwright";
import { testClient } from "@client";
import { homePage } from "@pages";
import { headerComponent, sonnerComponent, accountDropdownComponent } from "@components";
import { authDialogComponent } from "@components/auth";
import { createFirebaseUser, deleteFirebaseUser, initFirebaseAuth, setupFirebaseAuth } from "@providers/firebase";

const { firebaseAuth } = await initFirebaseAuth();

const { userFirebaseUid, customToken } = await createFirebaseUser({
	firebaseAuth,
	testUserId: Date.now().toString(),
});

testClient.describe(
	"Auth",
	() => {
		testClient.afterAll(async() => {
			await deleteFirebaseUser({
				firebaseAuth,
				userFirebaseUid,
			});
		});

		testClient("register and disconnect", async({ website, page }) => {
			await website.iNavigateTo(homePage);

			const sonner = await website.iWantToExist(sonnerComponent);

			await setupFirebaseAuth({
				playwrightPage: page,
				customToken,
			});

			const header = await website.iWantToSee(headerComponent);

			await Actions.click(header, "signButton");

			const authDialog = await website.iWantToSee(authDialogComponent);

			await Actions.click(authDialog, "googleLoginButton");

			await Assertions.toBeVisible(authDialog, "registerForm");

			await Actions
				.withStep("fill short username")
				.fill(authDialog, "registerFormUsername", "A");

			await Actions.click(authDialog, "registerFormSubmitButton");

			await Assertions
				.withStep("alert a short username")
				.toHaveText(authDialog, "registerFormUsernameHint", "Doit faire au moins 3 caractères.");

			await Actions
				.withStep("fill too long username")
				.fill(authDialog, "registerFormUsername", "thisIsATooLongUsernameForEndToEndTest");

			await Assertions
				.withStep("alert too long username")
				.toHaveText(authDialog, "registerFormUsernameHint", "Doit faire au plus 35 caractères.");

			await Actions
				.withStep("fill good username")
				.fill(authDialog, "registerFormUsername", userFirebaseUid);

			await Assertions
				.withStep("no hint")
				.toHaveNoText(authDialog, "registerFormUsernameHint");

			await Actions
				.withStep("open select language")
				.click(authDialog, "registerFormTriggerSelectLanguage");

			await Actions
				.withStep("select french")
				.click(authDialog, "registerFormSelectLanguageFranceOption");

			await Actions
				.withStep("valide CGU")
				.click(authDialog, "registerFormValideCGU");

			await Actions.click(authDialog, "registerFormSubmitButton");

			await Assertions
				.toBeVisible(sonner, "firstDefault");

			const accountDropdown = await website.iWantToSee(accountDropdownComponent);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "disconnectButton");

			await Assertions.toBeVisible(header, "signButton");
		});

		testClient("login and disconnect", async({ website, page }) => {
			await website.iNavigateTo(homePage);

			const sonner = await website.iWantToExist(sonnerComponent);

			await setupFirebaseAuth({
				playwrightPage: page,
				customToken,
			});

			const header = await website.iWantToSee(headerComponent);

			await Actions.click(header, "signButton");

			const authDialog = await website.iWantToSee(authDialogComponent);

			await Actions.click(authDialog, "googleLoginButton");

			await Assertions
				.toBeVisible(sonner, "firstDefault");

			const accountDropdown = await website.iWantToSee(accountDropdownComponent);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "disconnectButton");

			await Assertions.toBeVisible(header, "signButton");
		});
	},
);

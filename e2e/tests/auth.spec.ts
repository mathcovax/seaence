import { testCLient, Actions } from "@playwright";
import { homePageEngine } from "@pages/home";
import { headerEngine } from "@components/header";
import { authDialogEngine } from "@components/auth/authDialog";
import { createFirebaseUser, deleteFirebaseUser } from "@providers/firebase";
import { Assertions } from "../playwright/assertions";
import { sonnerEngine } from "@components/sonner";
import { accountDropdownEngine } from "@components/accountDropdown";
import { setupFirebaseAuth } from "@processes/setupFirebaseAuth";
import { connectUser } from "@processes/connectUser";

testCLient.describe(
	"Auth",
	() => {
		testCLient("Register user and login with new account.", async({ webSite, firebaseAuth }) => {
			await webSite.iNavigateTo(homePageEngine);

			const { userFirebaseUid, customToken } = await createFirebaseUser({
				firebaseAuth,
				testUserId: Date.now().toString(),
			});

			try {
				const sonner = await webSite.iWantToExist(sonnerEngine);

				const header = await webSite.iWantToSee(headerEngine);

				await testCLient.step("Register and disconnect", async() => {
					await setupFirebaseAuth({
						webSite,
						customToken,
					});

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

				await webSite.refresh();

				await testCLient.step("login and disconnect", async() => {
					await setupFirebaseAuth({
						webSite,
						customToken,
					});

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
			} finally {
				await deleteFirebaseUser({
					firebaseAuth,
					userFirebaseUid,
				});
			}
		});

		testCLient("connect on existing user and disconnect", async({ webSite, firebaseAuth }) => {
			await webSite.iNavigateTo(homePageEngine);

			await connectUser({
				webSite,
				firebaseAuth,
			});

			const header = await webSite.iWantToSee(headerEngine);

			const accountDropdown = await webSite.iWantToSee(accountDropdownEngine);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "disconnectButton");

			await Assertions.toBeVisible(header, "signButton");
		});
	},
);

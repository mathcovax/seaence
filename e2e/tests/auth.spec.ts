import { testCLient, Actions } from "@playwright";
import { homePageEngine } from "@pages/home";
import { headerEngine } from "@components/header";
import { authDialogEngine } from "@components/auth/authDialog";
import { createFirebaseUser, deleteFirebaseUser, initFirebaseAuth, setupFirebaseAuth } from "@providers/firebase";
import { Assertions } from "../playwright/assertions";

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

		testCLient("register", async({ webSite, page }) => {
			await webSite.iNavigateTo(homePageEngine);

			const header = await webSite.iWantToSee(headerEngine);

			await Actions.click(header, "signButton");

			const authDialog = await webSite.iWantToSee(authDialogEngine);

			await setupFirebaseAuth({
				playwrightPage: page,
				customToken,
			});

			await Actions.click(authDialog, "googleSignButton");

			await Assertions.toBeVisible(authDialog, "registerForm");

			await Actions
				.withStepContent("fill short username")
				.fill(authDialog, "registerFormUsername", "A");

			await Actions.click(authDialog, "registerFormSubmitButton");

			await Assertions
				.withStepContent("alert a short username")
				.toHaveText(authDialog, "registerFormUsernameHint");
		});
	},
);

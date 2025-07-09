import { testCLient } from "@playwright";
import { homePageEngine } from "../../pages/home";
import { headerEngine } from "@components/header";
import { Actions } from "../../playwright/actions";
import { authDialogEngine } from "@components/auth/authDialog";

testCLient.describe(
	"register",
	() => {
		testCLient.beforeEach(async() => {

		});

		testCLient("register", async({ webSite }) => {
			await webSite.iNavigateTo(homePageEngine);

			const header = await webSite.iWantToSee(headerEngine);

			await Actions.click(header, "signButton");

			const authDialog = await webSite.iWantToSee(authDialogEngine);

			await Actions.click(authDialog, "googleSignButton");
		});
	},
);

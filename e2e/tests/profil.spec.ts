import { Actions, testCLient } from "@playwright";
import { homePageEngine } from "@pages/home";
import { connectUser } from "@processes/connectUser";
import { accountDropdownEngine } from "@components/accountDropdown";
import { profilPageEngine } from "@pages/profil";
import { editProfilFormEngine } from "@components/user/profil/editProfilForm";
import { Assertions } from "../playwright/assertions";
import { createEnum, zod } from "@vendors/clean";
import { match } from "ts-pattern";
import { sonnerEngine } from "@components/sonner";

const supportedLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

const randomMin = 10000000;
const randomMax = 90000000;

function makeRandomName(prefix = "zeriixBg-") {
	const randomNumber = Math.floor(randomMin + (Math.random() * randomMax));
	return `${prefix}${randomNumber}`;
}

testCLient.describe(
	"Profil",
	() => {
		testCLient("Rename", async({ webSite, firebaseAuth }) => {
			await webSite.iNavigateTo(homePageEngine);
			const sonner = await webSite.iWantToExist(sonnerEngine);

			await connectUser({
				webSite,
				firebaseAuth,
			});

			const accountDropdown = await webSite.iWantToSee(accountDropdownEngine);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "profilButton");

			await webSite.iWantToBeOnThisPage(profilPageEngine);

			const editPorfilForm = await webSite.iWantToSee(editProfilFormEngine);

			await Actions
				.withStepContent("fill short username")
				.fill(editPorfilForm, "username", "A");

			await Actions.click(editPorfilForm, "submitButton");

			await Assertions
				.withStepContent("alert a short username")
				.toHaveText(editPorfilForm, "usernameHint");

			await Actions
				.withStepContent("fill too long username")
				.fill(editPorfilForm, "username", "thisIsATooLongUsernameForEndToEndTest");

			await Actions.click(editPorfilForm, "submitButton");

			await Assertions
				.withStepContent("alert too long username")
				.toHaveText(editPorfilForm, "usernameHint");

			await Actions
				.withStepContent("fill good username")
				.fill(editPorfilForm, "username", makeRandomName());

			await Assertions
				.withStepContent("no hint")
				.toHaveNoText(editPorfilForm, "usernameHint");

			await Actions.click(editPorfilForm, "submitButton");

			await Promise.race([
				Assertions.toBeVisible(sonner, "firstWarning"),
				Assertions.toBeVisible(sonner, "firstDefault"),
			]);
		});
		testCLient("Change the language", async({ webSite, firebaseAuth }) => {
			await webSite.iNavigateTo(homePageEngine);
			const sonner = await webSite.iWantToExist(sonnerEngine);

			await connectUser({
				webSite,
				firebaseAuth,
			});

			const accountDropdown = await webSite.iWantToSee(accountDropdownEngine);

			await Actions.click(accountDropdown, "button");

			await Actions.click(accountDropdown, "profilButton");

			await webSite.iWantToBeOnThisPage(profilPageEngine);

			const editPorfilForm = await webSite.iWantToSee(editProfilFormEngine);

			await Actions
				.withStepContent("open select language")
				.click(editPorfilForm, "selectLanguage");

			const rawActualLanguage = await editPorfilForm.elements.actualLanguage.textContent();

			const actualLanguage = zod.enum(supportedLanguageEnum.toTuple()).parse(rawActualLanguage);

			await match(actualLanguage)
				.with(
					"en-US",
					() => Actions
						.withStepContent("select french")
						.click(editPorfilForm, "selectLanguageFrenchOption"),
				)
				.with(
					"fr-FR",
					() => Actions
						.withStepContent("select english")
						.click(editPorfilForm, "selectLanguageEnglishOption"),
				)
				.exhaustive();

			await Actions.click(editPorfilForm, "submitButton");

			await Promise.race([
				Assertions.toBeVisible(sonner, "firstWarning"),
				Assertions.toBeVisible(sonner, "firstDefault"),
			]);
		});
	},
);

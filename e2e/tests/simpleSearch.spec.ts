import { testCLient, Actions } from "@playwright";
import { simpleSearchPageEngine } from "@pages/simpleSearch";
import { homePageEngine } from "@pages/home";
import { headerEngine } from "@components/header";
import { Assertions } from "../playwright/assertions";
import { simpleSearchInputEngine } from "@components/search/simpleSearchInput";
import { searchResultWrapperEngine } from "@components/search/searchResultWrapper";
import { documentPageEngine } from "@pages/document";

testCLient.describe(
	"SimpleSearch",
	() => {
		testCLient("search document", async({ webSite }) => {
			await webSite.iNavigateTo(homePageEngine);

			const header = await webSite.iWantToExist(headerEngine);

			await Actions.click(header, "simpleSearchButton");

			await webSite.iWantToBeOnThisPage(simpleSearchPageEngine);

			const simpleSearchInput = await webSite.iWantToSee(simpleSearchInputEngine);

			await Actions
				.withStepContent("fill short search term")
				.fill(simpleSearchInput, "inputSearch", "A");

			await Actions.click(simpleSearchInput, "submitButton");

			await Assertions
				.withStepContent("alert a short search term")
				.toHaveText(simpleSearchInput, "hint");

			await Actions
				.withStepContent("fill wrong search term")
				.fill(simpleSearchInput, "inputSearch", "@@@@@@@@@@@@@@@@@");

			await Actions.click(simpleSearchInput, "submitButton");

			await Assertions
				.withStepContent("no hint visible")
				.toBeHidden(simpleSearchInput, "hint");

			const searchResultWrapper = await webSite.iWantToSee(searchResultWrapperEngine);

			await Assertions.toBeVisible(searchResultWrapper, "noResult");

			await Actions
				.withStepContent("fill good search term")
				.fill(simpleSearchInput, "inputSearch", "meta");

			await Actions
				.withStepContent("open select language")
				.click(simpleSearchInput, "triggerSelectLanguage");

			await Actions
				.withStepContent("select english")
				.click(simpleSearchInput, "selectLanguageEnglishOption");

			await Actions.click(simpleSearchInput, "submitButton");

			await Assertions
				.withStepContent("no hint visible")
				.toBeHidden(simpleSearchInput, "hint");

			await Assertions.toBeVisible(searchResultWrapper, "listResult");

			const documentId = await Assertions.extractTestValue(searchResultWrapper, "firstResult");

			await Actions
				.withStepContent("click first document result")
				.click(searchResultWrapper, "firstResult");

			await webSite.iWantToBeOnThisPage(documentPageEngine, { documentId });
		});
	},
);

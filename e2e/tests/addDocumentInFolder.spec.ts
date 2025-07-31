import { simpleSearchInputEngine } from "@components/search/simpleSearchInput";
import { simpleSearchPageEngine } from "@pages/simpleSearch";
import { Actions, testCLient } from "@playwright";
import { connectUser } from "@processes/connectUser";
import { Assertions } from "../playwright/assertions";
import { searchResultWrapperEngine } from "@components/search/searchResultWrapper";
import { documentPageEngine } from "@pages/document";

testCLient.describe(
	"AddDocumentInFolder",
	() => {
		testCLient("add document in folder", async({ webSite, firebaseAuth }) => {
			await webSite.iNavigateTo(simpleSearchPageEngine);

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

			await webSite.iWantToBeOnThisPage(documentPageEngine, { documentId });

			// todo
		});
	},
);

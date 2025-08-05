import { createComponentEngine } from "@playwright";

export const searchResultWrapperEngine = createComponentEngine(
	"searchResultWrapper",
	{
		getMainElement: (body) => body.getByTestId("search-result-wrapper"),
		getElements: (mainElement) => ({
			listResult: mainElement.getByTestId("search-result-list"),
			noResult: mainElement.getByTestId("search-result-no-result"),
			firstResult: mainElement.getByTestId("document-result-row").first(),
		}),
	},
);

import { createComponentEngine } from "@playwright";

export const searchResultWrapperEngine = createComponentEngine(
	"searchResultWrapper",
	{
		getMainElement: (body) => body.getByTestId("search-result-wrapper"),
		getElements: (mainElement) => ({
			listResult: mainElement.getByTestId("search-result-list"),
			get noResult() {
				return mainElement.getByTestId("search-result-no-result");
			},
			get firstResult() {
				return mainElement.locator("[data-testid=\"search-result-list\"] > div").first().locator("a[href*=\"/document/\"]");
			},
		}),
	},
);

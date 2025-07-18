import { createPageEngine } from "@playwright";

export const simpleSearchPageEngine = createPageEngine(
	"simpleSearch",
	() => "/simple-search",
	{
		getMainElement: (body) => body.getByTestId("simple-search-page"),
	},
);

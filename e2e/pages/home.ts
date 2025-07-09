import { createPageEngine } from "@playwright";

export const homePageEngine = createPageEngine(
	"home",
	() => "/",
	{
		getMainElement: (page) => page.getByTestId("home-page"),
	},
);

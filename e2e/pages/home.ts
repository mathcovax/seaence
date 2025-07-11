import { createPageEngine } from "@playwright";

export const homePageEngine = createPageEngine(
	"home",
	() => "/",
	{
		getMainElement: (body) => body.getByTestId("home-page"),
	},
);

import { createPage } from "@duplojs/playwright";

export const homePage = createPage(
	"home",
	{
		makePath: () => "/",
		getMainElement: ({ body }) => body.getByTestId("home-page"),
	},
);

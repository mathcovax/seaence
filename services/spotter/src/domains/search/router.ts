import { z } from "zod";

export const searchResultsPage = createPage(
	"searchResults",
	{
		path: "/search-results",
		component: () => import("./pages/SearchResultsPage.vue"),
	},
);

export const documentPage = createPage(
	"document",
	{
		path: "/document/:id",
		component: () => import("./pages/DocumentPage.vue"),
		params: {
			id: z.string(),
		},
	},
);

export const testPage = createPage(
	"test",
	{
		path: "/test",
		component: () => import("./pages/TestPage.vue"),
	},
);

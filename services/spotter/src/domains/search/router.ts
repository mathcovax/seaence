import { z } from "zod";

export const simpleSearchPage = createPage(
	"simpleSearch",
	{
		path: "/simple-search",
		component: () => import("./pages/SimpleSearchPage.vue"),
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

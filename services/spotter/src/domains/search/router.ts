import { bakedDocumentLanguageSchema } from "@/lib/horizon/types/bakedDocument";

export const simpleSearchPage = createPage(
	"simpleSearch",
	{
		path: "/simple-search",
		component: () => import("./pages/SimpleSearchPage.vue"),
		query: {
			term: zod.string().default(""),
			language: bakedDocumentLanguageSchema.default("en-US"),
		},
	},
);

export const advancedSearchPage = createPage(
	"advancedSearch",
	{
		path: "/advanced-search",
		component: () => import("./pages/AdvancedSearchPage.vue"),
	},
);

export const testPage = createPage(
	"test",
	{
		path: "/test",
		component: () => import("./pages/TestPage.vue"),
	},
);

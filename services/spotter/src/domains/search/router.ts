export const simpleSearchPage = createPage(
	"simpleSearch",
	{
		path: "/simple-search",
		component: () => import("./pages/SimpleSearchPage.vue"),
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

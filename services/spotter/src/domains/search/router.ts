export const searchResultsPage = createPage(
	"search-results",
	{
		path: "/search-results",
		component: () => import("./pages/SearchResultsPage.vue"),
	},
);

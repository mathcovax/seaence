import type { RouteRecordRaw } from "vue-router";

export const routerPageNameSearch = Object.freeze({
	SEARCH_RESULTS_PAGE: "search-results",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameSearch.SEARCH_RESULTS_PAGE,
		path: "/search-results",
		component: () => import("./pages/SearchResultsPage.vue"),
	},
];

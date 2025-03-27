import type { RouteRecordRaw } from "vue-router";

export const routerPageNameSearch = Object.freeze({
	SEARCH_PAGE: "search",
	SEARCH_RESULTS_PAGE: "search-results",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameSearch.SEARCH_PAGE,
		path: "/search",
		component: () => import("./pages/SearchPage.vue"),
	},
];

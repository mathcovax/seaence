import type { RouteRecordRaw } from "vue-router";

export const routerPageNameMain = Object.freeze({
	HOME_PAGE: "home",
	NOT_FOUND_PAGE: "not-found",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameMain.HOME_PAGE,
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	}
];

export const notFound = (): RouteRecordRaw => ({
	path: "/:notFoundPath(.*)*",
	children: [
		{
			name: routerPageNameMain.NOT_FOUND_PAGE,
			path: "/:notFoundPath(.*)*",
			component: () => import("./pages/NotFoundPage.vue"),
		}
	]
});
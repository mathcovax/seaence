import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAuth = Object.freeze({
	CONNECTION_PAGE: "connection",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAuth.CONNECTION_PAGE,
		path: "/connection",
		component: () => import("./pages/ConnectionPage.vue"),
	},
];

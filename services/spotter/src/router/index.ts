import { createWebHistory, createRouter } from "vue-router";
import { connectionPage } from "@/domains/auth/router";
import { homePage, notFoundPage } from "@/domains/edito/router";
import { searchResultsPage } from "@/domains/search/router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				homePage.recordRaw,
				connectionPage.recordRaw,
				searchResultsPage.recordRaw,
				documentPage.recordRaw,
				notFoundPage.recordRaw,
			],
		},
	],
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

const { enableLoader, disableLoader } = useLoader();

router.beforeEach((_to, _from, next) => {
	enableLoader("routerLoadPage");
	next();
});

router.afterEach(() => {
	disableLoader("routerLoadPage");
});

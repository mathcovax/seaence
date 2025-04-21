import { postCreatePage } from "@/domains/forum/router";
import { createWebHistory, createRouter } from "vue-router";
import { connectionPage } from "@/domains/auth/router";
import { homePage, notFoundPage } from "@/domains/edito/router";
import { simpleSearchPage } from "@/domains/search/router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				homePage.recordRaw,
				connectionPage.recordRaw,
				simpleSearchPage.recordRaw,
				advancedSearchPage.recordRaw,
				documentPage.recordRaw,
				postListPage.recordRaw,
				postPage.recordRaw,
				postCreatePage.recordRaw,
				testPage.recordRaw,
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

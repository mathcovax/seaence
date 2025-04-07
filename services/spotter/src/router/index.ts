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

const { setLoading } = useLoader();

router.beforeEach((_to, _from, next) => {
	setLoading(true);
	next();
});

router.afterEach(() => {
	setLoading(false);
});

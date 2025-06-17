import { postCreatePage } from "@/domains/forum/router";
import { createWebHistory, createRouter } from "vue-router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				homePage.recordRaw,
				cguPage.recordRaw,
				simpleSearchPage.recordRaw,
				advancedSearchPage.recordRaw,
				documentPage.recordRaw,
				postListPage.recordRaw,
				postPage.recordRaw,
				postCreatePage.recordRaw,
				profilePage.recordRaw,
				notificationListPage.recordRaw,
				notFoundPage.recordRaw,
				documentFolderPage.recordRaw,
				documentInFolderPage.recordRaw,
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

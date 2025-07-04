import { dashboardPage } from "@/domains/dashboard/dashboardPage/router";
import { postPage } from "@/domains/forum/postModeration/router";
import { createWebHistory, createRouter } from "vue-router";
import {
	reportingBakedDocumentTranslationListPage,
} from "@/domains/reporting/reportingBakedDocumentTranslationList/router";
import {
	reportingBakedDocumentTranslationPage,
} from "@/domains/reporting/reportingBakedDocumentTranslation/router";
import { answerPage } from "@/domains/forum/answerModeration/router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				dashboardPage.recordRaw,
				postPage.recordRaw,
				answerPage.recordRaw,
				reportingBakedDocumentTranslationListPage.recordRaw,
				reportingBakedDocumentTranslationPage.recordRaw,
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

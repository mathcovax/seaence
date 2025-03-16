import { createWebHistory, createRouter } from "vue-router";
import main, { notFound } from "@/domains/edito/router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				...main(),
				notFound()
			],
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	}
});

const { setLoading } = useLoader();

router.beforeEach((to, from, next) => {
	setLoading(true);
	next();
});

router.afterEach(() => {
	setLoading(false);
});
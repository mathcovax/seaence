export const homePage = createPage(
	"home",
	{
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
);

export const notFoundPage = createPage(
	"notFound",
	{
		path: "/:notFoundPath(.*)*",
		component: () => import("./pages/NotFoundPage.vue"),
	},
);

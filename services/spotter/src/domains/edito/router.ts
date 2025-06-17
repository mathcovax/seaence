export const homePage = createPage(
	"home",
	{
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
);

export const cguPage = createPage(
	"cgu",
	{
		path: "/cgu",
		component: () => import("./pages/CguPage.vue"),
	},
);

export const notFoundPage = createPage(
	"notFound",
	{
		path: "/:notFoundPath(.*)*",
		component: () => import("./pages/NotFoundPage.vue"),
	},
);

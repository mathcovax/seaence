export const connectionPage = createPage(
	"connection",
	{
		path: "/connection",
		component: () => import("./pages/ConnectionPage.vue"),
	},
);

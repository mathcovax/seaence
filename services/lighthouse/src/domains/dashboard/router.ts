export const dashboardPage = createPage(
	"dashboard",
	{
		path: "/",
		component: () => import("./pages/dashboardPage.vue"),
	},
);

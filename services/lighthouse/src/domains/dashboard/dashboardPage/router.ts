export const dashboardPage = createPage(
	"dashboard",
	{
		path: "/",
		component: () => import("./ThePage.vue"),
	},
);

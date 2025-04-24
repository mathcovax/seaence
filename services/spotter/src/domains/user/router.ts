export const profilePage = createPage(
	"profile",
	{
		path: "/profile",
		component: () => import("./pages/ProfilePage.vue"),
	},
);

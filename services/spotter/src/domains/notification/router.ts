export const notificationListPage = createPage(
	"notificationList",
	{
		path: "/notifications",
		component: () => import("./pages/NotificationListPage.vue"),
	},
);

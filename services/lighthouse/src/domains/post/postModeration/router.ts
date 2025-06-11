export const postPage = createPage(
	"postModeration",
	{
		path: "/post-moderation",
		component: () => import("./ThePage.vue"),
	},
);

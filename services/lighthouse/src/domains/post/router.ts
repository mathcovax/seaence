export const postPage = createPage(
	"post",
	{
		path: "/post",
		component: () => import("./pages/PostPage.vue"),
	},
);

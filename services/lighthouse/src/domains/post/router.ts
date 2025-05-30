export const postPage = createPage(
	"post",
	{
		path: "/",
		component: () => import("./pages/PostPage.vue"),
	},
);

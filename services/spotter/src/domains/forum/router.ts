export const postDetailsPage = createPage(
	"postDetails",
	{
		path: "/posts/:id",
		component: () => import("./pages/PostDetailsPage.vue"),
		params: {
			id: zod.string(),
		},
	},
);

export const postsPage = createPage(
	"posts",
	{
		path: "/articles/:id/posts",
		component: () => import("./pages/PostsPage.vue"),
		params: {
			id: zod.string(),
		},
	},
);

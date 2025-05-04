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
		path: "/documents/:documentId/posts",
		component: () => import("./pages/PostsPage.vue"),
		params: {
			documentId: zod.string(),
		},
	},
);

export const postDetailsPage = createPage(
	"postDetails",
	{
		path: "/documents/:documentId/posts/:postId",
		component: () => import("./pages/PostDetailsPage.vue"),
		params: {
			documentId: zod.string(),
			postId: zod.string(),
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

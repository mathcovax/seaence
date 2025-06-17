export const postPage = createPage(
	"post",
	{
		path: "/posts/:postId",
		component: () => import("./pages/PostPage.vue"),
		params: {
			postId: zod.string(),
		},
	},
);

export const postListPage = createPage(
	"postList",
	{
		path: "/documents/:documentId/posts",
		component: () => import("./pages/PostListPage.vue"),
		params: {
			documentId: zod.string(),
		},
	},
);

export const postCreatePage = createPage(
	"postCreate",
	{
		path: "/documents/:documentId/create-post",
		component: () => import("./pages/PostCreatePage.vue"),
		params: {
			documentId: zod.string(),
		},
	},
);

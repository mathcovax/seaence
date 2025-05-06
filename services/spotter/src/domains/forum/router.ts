import { documentLanguageSchema } from "@/lib/horizon/types/document";

export const postPage = createPage(
	"post",
	{
		path: "/posts/:postId",
		component: () => import("./pages/PostPage.vue"),
		params: {
			postId: zod.string(),
		},
		query: {
			language: documentLanguageSchema,
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

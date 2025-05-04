import { createEnum } from "@vendors/clean";

const documentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const postDetailsPage = createPage(
	"postDetails",
	{
		path: "/posts/:postId",
		component: () => import("./pages/PostDetailsPage.vue"),
		params: {
			postId: zod.string(),
		},
		query: {
			language: zod.enum(documentLanguageEnum.toTuple()),
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

export const documentInFolderPage = createPage(
	"documentInFolder",
	{
		path: "/document-folder/:documentFolderId/documents",
		component: () => import("./ThePage.vue"),
		params: {
			documentFolderId: zod.string(),
		},
	},
);

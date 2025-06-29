export const profilePage = createPage(
	"profile",
	{
		path: "/profile",
		component: () => import("./pages/ProfilePage.vue"),
	},
);

export const documentFolderPage = createPage(
	"documentFolder",
	{
		path: "/document-folder",
		component: () => import("./pages/DocumentFolder.vue"),
	},
);

export const documentInFolderPage = createPage(
	"documentInFolderList",
	{
		path: "/document-folder/:documentFolderId/documents",
		component: () => import("./pages/DocumentInFolder.vue"),
		params: {
			documentFolderId: zod.string(),
		},
	},
);

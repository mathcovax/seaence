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

export const documentInFolderListPage = createPage(
	"documentInFolderList",
	{
		path: "/document-folder/:documentFolderId/documents",
		component: () => import("./pages/DocumentInFolderList.vue"),
		params: {
			documentFolderId: zod.string(),
		},
	},
);

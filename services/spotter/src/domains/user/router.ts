export const profilPage = createPage(
	"profil",
	{
		path: "/profil",
		component: () => import("./pages/ProfilPage.vue"),
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

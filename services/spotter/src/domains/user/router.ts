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

export const documentFolderPage = createPage(
	"documentFolder",
	{
		path: "/document-folder",
		component: () => import("./ThePage.vue"),
	},
);

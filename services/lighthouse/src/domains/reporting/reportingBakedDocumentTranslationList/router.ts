const defaultPage = 1;

export const reportingBakedDocumentTranslationListPage = createPage(
	"reportingBakedDocumentTranslationList",
	{
		path: "/reporting-baked-document-translation-list",
		component: () => import("./ThePage.vue"),
		query: {
			page: zod.coerce.number().default(defaultPage),
		},
	},
);

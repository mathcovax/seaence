const defaultPage = 1;

export const reportingBakedDocumentTranslationPage = createPage(
	"reportingBakedDocumentTranslation",
	{
		path: "/reporting-baked-document-translation/:bakedDocumentId",
		component: () => import("./ThePage.vue"),
		params: {
			bakedDocumentId: zod.string(),
		},
		query: {
			page: zod.coerce.number().default(defaultPage),
		},
	},
);

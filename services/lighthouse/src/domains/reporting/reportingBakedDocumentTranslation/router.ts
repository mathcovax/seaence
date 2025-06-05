export const reportingBakedDocumentTranslationPage = createPage(
	"reportingBakedDocumentTranslation",
	{
		path: "/reporting-baked-document-translation/:bakedDocumentId",
		component: () => import("./ThePage.vue"),
		params: {
			bakedDocumentId: zod.string(),
		},
	},
);

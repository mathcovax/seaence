interface Page {
	countTotal: number;
	quantityPerPage: number;
}

export function usePage() {
	const pageInformation = ref<Page | null>(null);

	void bridgeClient
		.post("/reporting-baked-document-translation-list-page")
		.whenInformation(
			"reportingBakedDocumentTranslationListPage.found",
			({ body }) => {
				pageInformation.value = body;
			},
		);

	return {
		pageInformation,
	};
}

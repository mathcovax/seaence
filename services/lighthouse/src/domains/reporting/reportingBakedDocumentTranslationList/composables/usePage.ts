import type { ReportingBakedDocumentTranslationListPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";

export function usePage() {
	const pageContent = ref<ReportingBakedDocumentTranslationListPage | null>(null);

	void bridgeClient
		.post("/reporting-baked-document-translation-aggregate-list-page")
		.whenInformation(
			"reportingBakedDocumentTranslationAggregateListPage.found",
			({ body }) => {
				pageContent.value = body;
			},
		);

	return {
		pageContent,
	};
}

import { reportingBakedDocumentTranslationPage } from "../router";

export function usePage() {
	const { params } = reportingBakedDocumentTranslationPage.use();

	watch(
		() => params.value.bakedDocumentId,
		() => {
			void bridgeClient
				.post(
					"",
				);
		},
	);
}

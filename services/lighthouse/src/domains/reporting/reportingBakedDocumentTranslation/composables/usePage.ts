import type { ReportingBakedDocumentTranslationPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { reportingBakedDocumentTranslationPage } from "../router";

export function usePage() {
	const router = useRouter();
	const { params } = reportingBakedDocumentTranslationPage.use();

	const pageContent = ref<ReportingBakedDocumentTranslationPage | null>(null);

	watch(
		() => params.value.bakedDocumentId,
		(bakedDocumentId) => {
			void bridgeClient
				.post(
					"/reporting-baked-document-translation-page",
					{
						body: {
							bakedDocumentId,
						},
					},
				)
				.whenInformation(
					"bakedDocument.notfound",
					() => void router.back(),
				)
				.whenInformation(
					"reportingBakedDocumentTranslationPage.found",
					({ body }) => {
						pageContent.value = body;
					},
				);
		},
		{ immediate: true },
	);

	return {
		pageContent,
	};
}

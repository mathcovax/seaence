import type { BridgeClientRoute } from "@/libs/bridge";
import type { FindHttpClientRoute } from "@duplojs/http-client";
import type { BakedDocumentNewTranslation } from "@vendors/clients-type/bridge/duplojsTypesCodegen";

type Params = FindHttpClientRoute<
	BridgeClientRoute,
	"POST",
	"/get-new-baked-document-translation"
>["body"];

export function useGetNewBakedDocumentTranslation() {
	const newBakedDocumentTranslation = ref<BakedDocumentNewTranslation | null>(null);

	function getNewBakedDocumentTranslation(
		{
			nodeSameRawDocumentId,
			bakedDocumentLanguage,
		}: Params,
	) {
		getNewBakedDocumentTranslation.abortController = new AbortController();
		return bridgeClient
			.post(
				"/get-new-baked-document-translation",
				{
					body: {
						nodeSameRawDocumentId,
						bakedDocumentLanguage,
					},
					disabledLoader: true,
					signal: getNewBakedDocumentTranslation.abortController.signal,
				},
			)
			.whenInformation(
				"bakedDocument.getNewTranslation",
				({ body }) => {
					newBakedDocumentTranslation.value = body;
				},
			);
	}

	getNewBakedDocumentTranslation.abortController = null as null | AbortController;

	return {
		getNewBakedDocumentTranslation,
		newBakedDocumentTranslation,
	};
}

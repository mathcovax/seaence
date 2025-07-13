import type { BridgeClientRoute } from "@/libs/bridge";
import type { FindHttpClientRoute } from "@duplojs/http-client";

type Params = FindHttpClientRoute<
	BridgeClientRoute,
	"POST",
	"/baked-document-translation-reporting-aggregate/process/{bakedDocumentId}"
>["body"];

export function useProcessBakedDocumentTranslationReportingAggregate() {
	function processBakedDocumentTranslationReportingAggregate(
		bakedDocumentId: string,
		body: Params,
	) {
		return bridgeClient
			.post(
				"/baked-document-translation-reporting-aggregate/process/{bakedDocumentId}",
				{
					params: { bakedDocumentId },
					body,
					requestTimeout: false,
				},
			);
	}
	return {
		processBakedDocumentTranslationReportingAggregate,
	};
}

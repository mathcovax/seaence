import type { BridgeClientRoute } from "@/libs/bridge";
import type { FindHttpClientRoute } from "@duplojs/http-client";

type Params = FindHttpClientRoute<
	BridgeClientRoute,
	"POST",
	"/make-new-baked-document-translation"
>["body"];

export function useMakeNewBakedDocumentTranslation() {
	function makeNewBakedDocumentTranslation(
		body: Params,
	) {
		return bridgeClient
			.post(
				"/make-new-baked-document-translation",
				{
					body,
					requestTimeout: false,
				},
			);
	}
	return {
		makeNewBakedDocumentTranslation,
	};
}

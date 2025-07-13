import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type AbysClientRoute } from ".";

export type InputTransformeNodeSameRawDocumentToBakedDocument = FindHttpClientRoute<
	AbysClientRoute,
	"POST",
	"/transforme-node-same-raw-document-to-baked-document"
>["body"];

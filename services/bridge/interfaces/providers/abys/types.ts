import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type AbysClientRoute } from ".";

export type InputCookNodeSameRawDocument = FindHttpClientRoute<
	AbysClientRoute,
	"POST",
	"/cook-node-same-raw-document"
>["body"];

export type InputTransformeNodeSameRawDocumentToBakedDocument = FindHttpClientRoute<
	AbysClientRoute,
	"POST",
	"/transforme-node-same-raw-document-to-baked-document"
>["body"];

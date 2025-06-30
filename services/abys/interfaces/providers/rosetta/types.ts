import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type RosettaHttpRoute } from ".";

export type InputTranslate = FindHttpClientRoute<
	RosettaHttpRoute,
	"POST",
	"/translate"
>["body"];

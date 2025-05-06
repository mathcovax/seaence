import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type AnswerList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/answer-list">,
	"information",
	"answerList.found"
>["body"];

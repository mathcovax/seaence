import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type HarborClientRoute } from ".";

export type InputRegisterUser = FindHttpClientRoute<
	HarborClientRoute,
	"POST",
	"/register"
>["body"];

export type InputUserPayload = FindHttpClientRoute<
	HarborClientRoute,
	"POST",
	"/update-user"
>["body"];

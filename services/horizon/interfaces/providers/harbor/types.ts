import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type HarborClientRoute } from ".";

export type InputRegisterUser = FindHttpClientRoute<
	HarborClientRoute,
	"POST",
	"/register"
>["body"];

export type InputUpdateUserPersonalDataPayload = FindHttpClientRoute<
	HarborClientRoute,
	"POST",
	"/user/update-personal-data"
>["body"];

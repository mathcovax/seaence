import { HttpClient } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import type { BottleClientRoute, InputCreateUserAnswerWarningNotification, InputCreateUserAnswerBanNotification, InputCreateUserPostWarningNotification, InputCreateUserPostBanNotification } from "./types";

export class BottleAPI {
	private static httpClient: HttpClient<BottleClientRoute>;

	public static createUserPostBanNotification(params: InputCreateUserPostBanNotification) {
		return this.httpClient.post(
			"/notification-post-ban-create",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	public static createUserPostWarningNotification(params: InputCreateUserPostWarningNotification) {
		return this.httpClient.post(
			"/notification-post-warning-create",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	public static createUserAnswerBanNotification(params: InputCreateUserAnswerBanNotification) {
		return this.httpClient.post(
			"/notification-answer-ban-create",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	public static createUserAnswerWarningNotification(params: InputCreateUserAnswerWarningNotification) {
		return this.httpClient.post(
			"/notification-answer-warning-create",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTTLE_BASE_URL,
		});
	}
}

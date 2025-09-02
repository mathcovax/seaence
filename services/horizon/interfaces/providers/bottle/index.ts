import { HttpClient } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import type { BottleClientRoute, InputDisableNotificationToPost, InputEnableNotificationToPost, InputFindNotificationSettingToPost, InputNotificationCount, InputNotificationFindMany, InputNotificatondateFindLast } from "./types";

export class BottleAPI {
	private static httpClient: HttpClient<BottleClientRoute>;

	public static findNotifications(input: InputNotificationFindMany) {
		return this.httpClient
			.post(
				"/notification-find-many",
				{
					body: input,
				},
			)
			.iWantInformation("notifications.found");
	}

	public static findNotificationSettingToPost(input: InputFindNotificationSettingToPost) {
		return this.httpClient
			.post(
				"/notification-reply-to-post-setting-find-one",
				{
					body: input,
				},
			)
			.iWantInformation([
				"replyPostNotificationSetting.found",
				"replyToPostNotificationSetting.notfound",
			]);
	}

	public static enableNotificationToPost(input: InputEnableNotificationToPost) {
		return this.httpClient
			.post(
				"/notification-reply-post-setting-enable",
				{
					body: input,
				},
			)
			.iWantInformation("replyPostNotification.enable");
	}

	public static disableNotificationToPost(input: InputDisableNotificationToPost) {
		return this.httpClient
			.post(
				"/notification-reply-post-setting-disable",
				{
					body: input,
				},
			)
			.iWantInformation([
				"replyPostNotification.disable",
				"replyToPostNotificationSetting.notfound",
			]);
	}

	public static countNotifications(input: InputNotificationCount) {
		return this.httpClient
			.post(
				"/notification-count",
				{
					body: input,
				},
			)
			.iWantInformation("notifications.count");
	}

	public static findUserLastNotificationDate(input: InputNotificatondateFindLast) {
		return this.httpClient
			.post(
				"/notification-date-find-last",
				{
					body: input,
				},
			)
			.iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTTLE_BASE_URL,
		});
	}
}

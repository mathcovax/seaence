import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

type InputFindNotifications = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/find-notifications"
>["body"];

type InputFindNotificationSettingToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/find-reply-to-post-notification-setting"
>["body"];

type InputEnableNotificationToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/enable-reply-post-notification-setting"
>["body"];

type InputDisableNotificationToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/disable-reply-post-notification-setting"
>["body"];

type InputCountNotifications = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/count-notifications"
>["body"];

export class BottleAPI {
	private static httpClient: HttpClient<BottleClientRoute>;

	public static findNotifications(input: InputFindNotifications) {
		return this.httpClient
			.post(
				"/find-notifications",
				{
					body: input,
				},
			)
			.iWantInformation("notifications.found");
	}

	public static findNotificationSettingToPost(input: InputFindNotificationSettingToPost) {
		return this.httpClient
			.post(
				"/find-reply-to-post-notification-setting",
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
				"/enable-reply-post-notification-setting",
				{
					body: input,
				},
			)
			.iWantInformation("replyPostNotification.enable");
	}

	public static disableNotificationToPost(input: InputDisableNotificationToPost) {
		return this.httpClient
			.post(
				"/disable-reply-post-notification-setting",
				{
					body: input,
				},
			)
			.iWantInformation([
				"replyPostNotification.disable",
				"replyToPostNotificationSetting.notfound",
			]);
	}

	public static countNotifications(input: InputCountNotifications) {
		return this.httpClient
			.post(
				"/count-notifications",
				{
					body: input,
				},
			)
			.iWantInformation("notifications.count");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTLLE_BASE_URL,
		});
	}
}

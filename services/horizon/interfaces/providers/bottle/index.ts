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

type InputFindNotificationSettingsToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/find-reply-to-post-notification-settings"
>["body"];

type InputEnableNotificationToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/enable-reply-post-notification-settings"
>["body"];

type InputDisableNotificationToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/disable-reply-post-notification-settings"
>["body"];

type InputCountNotifications = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/count-notification"
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
			.iWantInformation("notications.found");
	}

	public static findNotificationSettingsToPost(input: InputFindNotificationSettingsToPost) {
		return this.httpClient
			.post(
				"/find-reply-to-post-notification-settings",
				{
					body: input,
				},
			)
			.iWantExpectedResponse();
	}

	public static enableNotificationToPost(input: InputEnableNotificationToPost) {
		return this.httpClient
			.post(
				"/enable-reply-post-notification-settings",
				{
					body: input,
				},
			)
			.iWantInformation("replyPostNotification.enable");
	}

	public static disableNotificationToPost(input: InputDisableNotificationToPost) {
		return this.httpClient
			.post(
				"/disable-reply-post-notification-settings",
				{
					body: input,
				},
			)
			.iWantInformation("replyPostNotification.disable");
	}

	public static countNotifications(input: InputCountNotifications) {
		return this.httpClient
			.post(
				"/count-notification",
				{
					body: input,
				},
			)
			.iWantInformation("notications.count");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTLLE_BASE_URL,
		});
	}
}

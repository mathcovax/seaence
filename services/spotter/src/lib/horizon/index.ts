import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { envs } from "@/envs";
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { HttpClientTimeoutRequestError } from "../sentry/errors/httpClientTimeoutRequestError";

export type HorizonClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const { sonnerError, sonnerMessage, sonnerWarning } = useSonner();
const { enableLoader, disableLoader } = useLoader();
const { accessToken } = useUserInformation();
const { refresh } = useWindow();

const defaultRequestTimeout = 10_000;

declare module "@duplojs/http-client" {
	interface HttpClientRequestInit {
		disabledLoader?: boolean;
		loaderId?: string;
		timeoutId?: number;
		requestTimeout?: number | boolean;
		disabledSonner?: boolean | string[];
		disableAuthenticationRequiredManagement?: boolean;
	}
}

declare global {
	interface Window {
		horizonClient: HttpClient<HorizonClientRoute>;
	}
}

export const horizonClient = new HttpClient<HorizonClientRoute>({
	baseUrl: envs.VITE_HORIZON_ENTRYPOINT_BASE_URL,
})
	.setDefaultRequestParams({
		mode: "cors",
		headers: {
			get authorization() {
				return accessToken.value ?? undefined;
			},
		},
	})
	.setInterceptor(
		"request",
		(requestDefinition) => {
			if (
				requestDefinition.paramsRequest.disabledLoader !== true
				&& !requestDefinition.paramsRequest.loaderId
			) {
				requestDefinition.paramsRequest.loaderId = enableLoader();
			}

			if (requestDefinition.paramsRequest.requestTimeout !== false) {
				const requestTimeout = requestDefinition.paramsRequest.requestTimeout;

				const controller = new AbortController();
				requestDefinition.paramsRequest.timeoutId = setTimeout(
					() => {
						void controller.abort(new HttpClientTimeoutRequestError(requestDefinition));
					},
					requestTimeout === true || !requestTimeout
						? defaultRequestTimeout
						: requestTimeout,
				);

				requestDefinition.paramsRequest.signal = controller.signal;
			}

			return requestDefinition;
		},
	)
	.setInterceptor(
		"response",
		(response) => {
			if (response.requestDefinition.paramsRequest.loaderId) {
				disableLoader(response.requestDefinition.paramsRequest.loaderId);
			}

			if (response.requestDefinition.paramsRequest.timeoutId) {
				clearTimeout(response.requestDefinition.paramsRequest.timeoutId);
			}

			const disabledSonner = response.requestDefinition.paramsRequest.disabledSonner;

			if (
				!disabledSonner
				|| (
					disabledSonner instanceof Array
					&& !disabledSonner.includes(response.information ?? "")
				)
			) {
				const sonnerMessageKey = `responses.${response.information}`;

				if (i18n.global.te(sonnerMessageKey)) {
					const sonnerMessageContent = i18n.global.t(sonnerMessageKey);

					if (response.ok === true) {
						sonnerMessage(sonnerMessageContent);
					} else if (response.ok === false) {
						sonnerWarning(sonnerMessageContent);
					} else if (response.ok === null) {
						sonnerError(sonnerMessageContent);
					}
				}
			}

			return response;
		},
	);

horizonClient.hooks.add({
	type: "error",
	callback(_error, requestDefinition) {
		if (requestDefinition.paramsRequest.loaderId) {
			disableLoader(requestDefinition.paramsRequest.loaderId);
		}
	},
});

horizonClient.hooks.add({
	type: "information",
	value: "authentication.required",
	callback(response) {
		if (response.requestDefinition.paramsRequest.disableAuthenticationRequiredManagement) {
			return;
		}

		refresh();
	},
});

// three checking bug auto import
window.horizonClient = horizonClient;

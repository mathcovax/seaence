import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { envs } from "@/envs";
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export type HorizonClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const { sonnerError, sonnerMessage, sonnerWarning } = useSonner();
// const { enableLoader, disableLoader } = useLoader();
const { accessToken } = useUserInformation();

declare global {
	interface RequestInit {
		disabledLoader?: boolean;
	}

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
			if (requestDefinition.paramsRequest.disabledLoader !== false) {
				// const loaderId = enableLoader();
				// const responseInterceptors = requestDefinition.interceptors.response;

				// requestDefinition.interceptors.response = (response) => {
				// disableLoader(loaderId);

				// return responseInterceptors(response);
				// };
			}

			return requestDefinition;
		},
	)
	.setInterceptor(
		"response",
		(response) => {
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

			return response;
		},
	);

// three checking bug auto import
window.horizonClient = horizonClient;

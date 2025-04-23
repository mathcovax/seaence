import { envs } from "@/envs";
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export type HorizonClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes>;

const { sonnerError, sonnerMessage, sonnerWarning } = useSonner();

export const horizonClient = new HttpClient<HorizonClientRoute>({
	baseUrl: envs.VITE_HORIZON_ENTRYPOINT_BASE_URL,
})
	.setDefaultRequestParams({
		mode: "cors",
	})
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

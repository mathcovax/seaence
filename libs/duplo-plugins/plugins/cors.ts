import { type Duplo, OkHttpResponse } from "@duplojs/core";

export function cors(allowOrigin: string) {
	return function(instance: Duplo) {
		instance.hook(
			"beforeSend",
			(_request, response) => {
				response.setHeader(
					"Access-Control-Allow-Origin",
					allowOrigin,
				);
				response.setHeader(
					"Access-Control-Expose-Headers",
					instance.config.keyToInformationInHeaders,
				);
			},
		);
		instance.hook(
			"beforeRouteExecution",
			(request) => {
				if (request.method === "OPTIONS" && request.matchedPath === null) {
					return new OkHttpResponse("cors").setHeader("Access-Control-Allow-Headers", "*");
				}
			},
		);
	};
}

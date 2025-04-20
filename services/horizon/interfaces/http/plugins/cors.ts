import { type Duplo } from "@duplojs/core";

export function cors(allowOrigin: string) {
	return function(instance: Duplo) {
		instance.hook(
			"beforeSend",
			(request, response) => {
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
	};
}

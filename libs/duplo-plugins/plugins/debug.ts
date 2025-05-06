import { Duplo } from "@duplojs/core";

export function debug(){
	return function(instance: Duplo) {
		if (instance.config.environment === "DEV") {
			instance.config.disabledZodAccelerator = true;
		}
		instance.hook(
			"onError",
			(request, error) => {
				console.log(`${request.method}:${request.path}`, error);
			}
		)
	}
}
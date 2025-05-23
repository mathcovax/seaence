import { Duplo } from "@duplojs/core";
import "@vendors/backend-logger"
import { logger } from "@vendors/backend-logger/logger";

export function debug(){
	return function(instance: Duplo) {
		if (instance.config.environment === "DEV") {
			instance.config.disabledZodAccelerator = true;
		}
		instance.hook(
			"onError",
			(request, error) => {
				logger(`${request.method}:${request.path}`, error);
			}
		)
	}
}
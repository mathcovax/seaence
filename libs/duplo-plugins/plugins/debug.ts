import { Duplo } from "@duplojs/core";
import * as Sentry from "@sentry/node";
import { logger } from "@vendors/backend-logger/logger";

interface DebugOptions {
	dsn: string;
	tracesSampleRate?: number;
}

export function debug(options: DebugOptions) {
	return function(instance: Duplo) {
		const { dsn, tracesSampleRate = 1 } = options;
		
		if (instance.config.environment == "PROD") {

			Sentry.init({
				dsn,
				environment: "production",
				tracesSampleRate: tracesSampleRate,
			});

			instance.hook("onError", (request, error) => {
				const { path, method, headers } = request;
	
				Sentry.captureException(error);
				Sentry.setContext(
					"request", 
					{
						path,
						method,
						headers,
					}
				);
			});
		} else if (instance.config.environment === "DEV") {
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
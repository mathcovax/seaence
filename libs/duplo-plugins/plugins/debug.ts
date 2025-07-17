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
				maxBreadcrumbs: 2,
			});

			instance.hook("onError", (request, error) => {
				const { path, method, headers, body, url } = request;

				Sentry.withScope((scope) => {
					scope.setContext(
						"request onError", 
						{
							path,
							method,
							url,
							headers,
							body,
						}
					);
					Sentry.captureException(error);
				});
			});
			instance.hook(
				"onHttpServerError",
				(request, error) => {
					const { path, method, headers, body, url } = request;

					Sentry.withScope((scope) => {
					scope.setContext(
						"request serverError",
						{
							path,
							method,
							url,
							headers,
							body,
						}
					);
					Sentry.captureException(error);
				});
				}
			)
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
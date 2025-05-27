import * as Sentry from "@sentry/node";

export type SentryEnvironment = "production" | "development";

export interface SentryConfigParams {
	dsn: string;
	environment?: SentryEnvironment;
}

export interface SentryContext {
	tags?: Record<string, string>;
	data?: Record<string, unknown>;
}

export class SentryLogger {
	public static init(config: SentryConfigParams) {
		Sentry.init({
			dsn: config.dsn,
			environment: config.environment || "production",
		});
	}

	public static setContext(input: SentryContext) {
		const scope = Sentry.getCurrentScope();

		if (input.tags) {
			scope.setTags(input.tags);
		}
		if (input.data) {
			scope.setExtra("data", input.data);
		}

		return input;
	}

	public static captureException(
		exception: unknown,
		additional?: Record<string, string>,
	): void {
		if (additional) {
			Sentry.setContext("additional", additional);
		}
		Sentry.captureException(exception);
	}

	public static captureMessage(
		message: string,
		additional?: Record<string, string>,
	): void {
		if (additional) {
			Sentry.setContext("additional", additional);
		}
		Sentry.captureMessage(message);
	}
}

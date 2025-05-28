import * as Sentry from "@sentry/node";

export type SentryEnvironment = "production" | "development";

export interface SentryConfigParams {
	dsn: string;
}

export interface SentryContext {
	tags?: Record<string, string>;
	data?: Record<string, unknown>;
}

export class SentryLogger {
	private static isInit = false;

	public static init(config: SentryConfigParams) {
		Sentry.init({
			dsn: config.dsn,
			environment: "production",
		});

		process.on(
			"uncaughtException",
			(error, origine) => {
				this.captureException(error, { origine });
			},
		);

		this.isInit = true;
	}

	public static setContext(input: SentryContext) {
		if (!this.isInit) {
			return;
		}

		const scope = Sentry.getCurrentScope();

		if (input.tags) {
			scope.setTags(input.tags);
		}
		if (input.data) {
			scope.setExtra("data", input.data);
		}
	}

	public static captureException(
		exception: unknown,
		additional?: Record<string, string>,
	): void {
		if (!this.isInit) {
			return;
		}

		if (additional) {
			Sentry.setContext("additional", additional);
		}
		Sentry.captureException(exception);
	}

	public static captureMessage(
		message: string,
		additional?: Record<string, string>,
	): void {
		if (!this.isInit) {
			return;
		}

		if (additional) {
			Sentry.setContext("additional", additional);
		}
		Sentry.captureMessage(message);
	}
}

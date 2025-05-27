import { envs } from "@/envs";
import * as Sentry from "@sentry/vue";
import type { App } from "vue";
import { router } from "@/router";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

interface User {
	id: string;
	username: string;
	email: string;
}

export interface SentryContext {
	tags?: Record<string, string>;
	data?: Record<string, unknown>;
	user?: User;
}

export class SentryLogger {
	public static init(app: App) {
		Sentry.init({
			app,
			dsn: envs.VITE_GLITCHTIP_DSN,
			sendDefaultPii: true,
			integrations: [Sentry.browserTracingIntegration({ router })],
			tracesSampleRate: 1,
			attachProps: true,
			environment: envs.VITE_ENVIRONEMENT === "PROD"
				? "production"
				: "development",
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

	public static setUser(user: User) {
		Sentry.setUser(user);
	}

	public static captureMessage(message: string, additional?: Record<string, string>) {
		if (additional) {
			Sentry.setContext("additional", additional);
		}
		Sentry.captureMessage(message);
	}

	public static captureException(message: string, additional?: Record<string, string>) {
		if (additional) {
			Sentry.setContext("additional", additional);
		}
		Sentry.captureException(message);
	}
}

const { user } = useUserInformation();

watch(
	user,
	(value) => {
		if (value) {
			SentryLogger.setUser(value);
		}
	},
);

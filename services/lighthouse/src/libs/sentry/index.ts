import { envs } from "@/envs";
import * as Sentry from "@sentry/vue";
import type { App } from "vue";
import { router } from "@/router";

export function initSentry(app: App) {
	Sentry.init({
		app,
		dsn: envs.VITE_GLITCHTIP_DSN,
		sendDefaultPii: true,
		integrations: [Sentry.browserTracingIntegration({ router })],
		tracesSampleRate: 1,
		attachProps: true,
	});
}

export function captureException(error: unknown, context?: Record<string, string>) {
	if (context) {
		Sentry.setContext("additional", context);
	}
	Sentry.captureException(error);
}

export function setTag(key: string, value: string) {
	Sentry.setTag(key, value);
}

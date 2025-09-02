import { createApp } from "vue";
import "@/lib/horizon";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { i18n } from "./i18n";
import { SentryLogger } from "./lib/sentry";
import { envs } from "./envs";

const app = createApp(App);

if (envs.VITE_ENVIRONMENT === "PROD") {
	SentryLogger.init(app);
}

app
	.use(router)
	.use(i18n)
	.mount("#app");


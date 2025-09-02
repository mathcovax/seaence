import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { i18n } from "./i18n";
import { SentryLogger } from "./libs/sentry";
import { envs } from "./envs";

const app = createApp(App);

if (envs.VITE_ENVIRONMENT === "PROD") {
	SentryLogger.init(app);
}

app
	.use(router)
	.use(i18n)
	.mount("#app");

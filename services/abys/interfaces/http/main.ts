import "@vendors/backend-logger";
import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "../envs";
import "./routes";
import { debug } from "@vendors/duplo-plugins/debug";

const duplo = new Duplo({
	environment: envs.ENVIRONMENT,
	host: envs.HOST,
	port: envs.PORT,
	plugins: [
		debug({
			dsn: envs.GLITCHTIP_DSN,
		}),
	],
});

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

await duplo.launch(
	() => void console.log("Abys service is running !"),
);

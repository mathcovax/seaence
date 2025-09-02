import "@vendors/backend-logger";
import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { debug } from "@vendors/duplo-plugins/debug";
import { envs } from "../envs";
import "./plugins/accelerator";
import "./routes";

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
	() => void console.log("Coral service is running !"),
);

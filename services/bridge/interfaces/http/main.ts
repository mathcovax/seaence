import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "../envs";
import { debug } from "@vendors/duplo-plugins/debug";
import { cors } from "@vendors/duplo-plugins/cors";
import "./routes";

const duplo = new Duplo({
	environment: envs.ENVIROMENT,
	host: envs.HOST,
	port: envs.PORT,
	plugins: [
		debug({
			dsn: envs.GLITCHTIP_DSN,
		}),
		cors(envs.CORS_ALLOW_ORIGIN),
	],
});

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

await duplo.launch(
	() => void console.log("Bridge service is running !"),
);

import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "../envs";
import { debug } from "@vendors/duplo-plugins/debug";
import { cors } from "@vendors/duplo-plugins/cors";
import "./plugins/accelerator";
import "./routes";
import { bodyLimit } from "./plugins/bodyLimit";

const duplo = new Duplo({
	environment: envs.ENVIROMENT,
	host: envs.HOST,
	port: envs.PORT,
	plugins: [
		cors(envs.CORS_ALLOW_ORIGIN),
		debug({
			dsn: envs.GLITCHTIP_DSN,
		}),
		bodyLimit(),
	],
});

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

await duplo.launch(
	() => void console.log("Horizon service is running !"),
);

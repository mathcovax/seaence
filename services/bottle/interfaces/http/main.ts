import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";

import { debug } from "@vendors/duplo-plugins/debug";

import { envs } from "@interfaces/envs";
import "./routes";

const duplo = new Duplo({
	environment: envs.ENVIROMENT,
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
	() => void console.log("Bottle service is running !"),
);

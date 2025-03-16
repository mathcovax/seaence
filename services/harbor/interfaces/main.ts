import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "./envs";
import "./routes";

const duplo = new Duplo({
	environment: envs.ENVIROMENT,
	host: envs.HOST,
	port: envs.PORT,
});

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

await duplo.launch(
	() => void console.log("Bottle service is running !"),
);

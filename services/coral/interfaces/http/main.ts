import { createHub, routeStore } from "@duplojs/http";
import { codeGeneratorPlugin } from "@duplojs/http/codeGenerator";
import { createHttpServer } from "@duplojs/http/node";
import { envs } from "../envs";

import "./routes";
import "./plugins/generate";

const hub = createHub({ environment: "DEV" })
	.plug(codeGeneratorPlugin({ outputFile: envs.CODEGEN_PATH }))
	.register(routeStore.getAll());

await createHttpServer(
	hub,
	{
		host: envs.HOST,
		port: envs.PORT,
	},
)
	.then(
		() => void console.log("Coral service is running !"),
	);

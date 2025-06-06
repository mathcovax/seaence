import { resolve } from "path";
import { Worker } from "worker_threads";

new Worker(
	resolve(import.meta.dirname, "./asyncMessage/main.js"),
	{},
);

new Worker(
	resolve(import.meta.dirname, "./http/main.js"),
	{},
);

import { resolve } from "path";
import { Worker } from "worker_threads";

new Worker(
	resolve(import.meta.dirname, "./http/main.js"),
	{},
);

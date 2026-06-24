import { Worker } from "worker_threads";
import { Path } from "@duplojs/utils";

new Worker(
	Path.resolveRelative([import.meta.dirname, "./asyncMessage/main.js"]),
	{},
).on("exit", (error) => {
	console.log(error);
	throw new Error("Exit process.");
});

new Worker(
	Path.resolveRelative([import.meta.dirname, "./http/main.js"]),
	{},
).on("exit", (error) => {
	console.log(error);
	throw new Error("Exit process.");
});

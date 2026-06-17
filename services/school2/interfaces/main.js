import { resolve } from "path";
import { Worker } from "worker_threads";

new Worker(
	resolve(import.meta.dirname, "./asyncMessage/main.js"),
	{},
).on("exit", () => {
	throw new Error("Exit process.");
});

new Worker(
	resolve(import.meta.dirname, "./http/main.js"),
	{},
).on("exit", () => {
	throw new Error("Exit process.");
});

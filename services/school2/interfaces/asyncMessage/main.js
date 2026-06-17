//@ts-check
import { register } from "tsx/esm/api";

register({
	tsconfig: new URL("./tsconfig.json", import.meta.url).pathname,
});

await import("./main");

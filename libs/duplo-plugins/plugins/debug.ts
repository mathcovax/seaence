import { Duplo } from "@duplojs/core";

export function debug(){
	return function(instance: Duplo) {
		instance.hook(
			"onError",
			(request, error) => {
				console.log(`${request.method}:${request.path}`, error);
			}
		)
	}
}
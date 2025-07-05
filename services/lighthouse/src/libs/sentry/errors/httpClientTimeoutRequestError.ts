import type { RequestDefinition } from "@duplojs/http-client";

export class HttpClientTimeoutRequestError extends Error {
	public constructor(
		requestDefinition: RequestDefinition,
	) {
		super(`${requestDefinition.method}:${requestDefinition.path}`);
	}
}

import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { type CodegenRoutes } from "./types/api";
import { envs } from "@interfaces/envs";

export type RosettaClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export const rosettaHttpClient = new HttpClient<RosettaClientRoute>({
	baseUrl: `${envs.ROSETTA_PROTOCOL}://${envs.ROSETTA_HOST}:${envs.ROSETTA_PORT}`,
});

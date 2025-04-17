import { envs } from "@/envs";
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export type HorizonClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes>;

export const horizonClient = new HttpClient<HorizonClientRoute>({
	baseUrl: envs.VITE_HORIZON_BASE_URL,
});

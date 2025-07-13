import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/abys/duplojsTypesCodegen";
import { type InputTransformeNodeSameRawDocumentToBakedDocument } from "./types";

export type AbysClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class AbysAPI {
	private static httpClient: HttpClient<AbysClientRoute>;

	public static transformeNodeSameRawDocumentToBakedDocument(
		body: InputTransformeNodeSameRawDocumentToBakedDocument,
	) {
		return this.httpClient
			.post(
				"/transforme-node-same-raw-document-to-baked-document",
				{
					body,
				},
			)
			.iWantInformation("nodeSameRawDocument.transformeBakedDocument");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.ABYS_BASE_URL,
		});
	}
}

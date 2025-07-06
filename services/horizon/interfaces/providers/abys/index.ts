import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/abys/duplojsTypesCodegen";

export type AbysClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class AbysAPI {
	private static httpClient: HttpClient<AbysClientRoute>;

	public static findManyBakedDocumentTitle(bakedDocumentIds: string[]) {
		return this.httpClient
			.post(
				"/find-many-baked-document-title",
				{
					body: {
						bakedDocumentIds,
					},
				},
			)
			.iWantInformation(["bakedDocumentTitle.findMany", "bakedDocuments.notfound"]);
	}

	public static getBakedDocumentById(bakedDocumentId: string) {
		return this.httpClient
			.get(
				"/baked-document/{id}",
				{
					params: {
						id: bakedDocumentId,
					},
				},
			)
			.iWantInformation([
				"bakedDocument.get",
				"bakedDocument.notfound",
			]);
	}

	public static findNodeSameRawDocument(nodeSameRawDocumentId: string) {
		return this.httpClient
			.post(
				"/find-node-same-raw-document",
				{
					body: {
						nodeSameRawDocumentId,
					},
				},
			)
			.iWantInformation([
				"nodeSameRawDocument.found",
				"nodeSameRawDocument.notfound",
			]);
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.ABYS_BASE_URL,
		});
	}
}

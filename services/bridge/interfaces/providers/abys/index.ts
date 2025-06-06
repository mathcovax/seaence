import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type Language, type CodegenRoutes } from "@vendors/clients-type/abys/duplojsTypesCodegen";

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
			.iWantInformation("bakedDocumentTitle.findMany");
	}

	public static findBakedDocumentById(bakedDocumentId: string) {
		return this.httpClient
			.get(
				"/baked-document/{id}",
				{ params: { id: bakedDocumentId } },
			)
			.iWantExpectedResponse();
	}

	public static cookNodeSameRawDocument(
		nodeSameRawDocumentId: string,
		bakedDocumentLanguage: Language,
	) {
		return this.httpClient
			.post(
				"/cook-node-same-raw-document",
				{
					body: {
						nodeSameRawDocumentId,
						bakedDocumentLanguage,
					},
				},
			)
			.iWantExpectedResponse();
	}

	public static transformeNodeSameRawDocumentToBakedDocument(
		nodeSameRawDocumentId: string,
		bakedDocumentLanguage: Language,
	) {
		return this.httpClient
			.post(
				"/transforme-node-same-raw-document-to-baked-document",
				{
					body: {
						nodeSameRawDocumentId,
						bakedDocumentLanguage,
					},
				},
			)
			.iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.ABYS_BASE_URL,
		});
	}
}

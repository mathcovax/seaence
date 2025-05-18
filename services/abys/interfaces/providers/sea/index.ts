import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes, type Language as SeaDocumentLanguage } from "@vendors/clients-type/sea/duplojsTypesCodegen";

type SeaHttpRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type SeaDocument = FindHttpClientRoute<
	SeaHttpRoute,
	"PUT",
	"/document/{language}"
>["body"];

export class SeaAPI {
	private static httpClient: HttpClient<SeaHttpRoute>;

	public static sendDocument(
		language: SeaDocumentLanguage,
		rawDocument: SeaDocument,
	) {
		return this.httpClient
			.put(
				"/document/{language}",
				{
					params: {
						language,
					},
					body: rawDocument,
				},
			)
			.iWantInformation("document.upsert");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.SEA_BASE_URL,
		});
	}
}

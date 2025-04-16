import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/abys/duplojsTypesCodegen";

type AbysHttpRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type RawDocument = FindHttpClientRoute<
	AbysHttpRoute,
	"PUT",
	"/raw-document"
>["body"];

export class AbysAPI {
	private static httpClient: HttpClient<AbysHttpRoute>;

	public static sendRawDocument(rawDocument: RawDocument) {
		return this.httpClient.put(
			"/raw-document",
			{
				body: rawDocument,
			},
		);
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.ABYS_BASE_URL,
		});
	}
}

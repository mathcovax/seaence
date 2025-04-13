import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/abys/duplojsTypesCodegen";

type AbysHttpRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type RawDocument = FindHttpClientRoute<
	AbysHttpRoute,
	"POST",
	"/raw-document"
>["body"];

export class AbysAPI {
	private static httpClient: HttpClient<AbysHttpRoute>;

	public static sendRawDocument(rawDocument: RawDocument) {
		return this.httpClient.post(
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

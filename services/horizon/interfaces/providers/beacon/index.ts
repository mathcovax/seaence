import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/beacon/duplojsTypesCodegen";

export type BeaconClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type PayloadUpsertBakedDocumentTranslationReporting = FindHttpClientRoute<
	BeaconClientRoute,
	"POST",
	"/upsert-baked-document-translation-reporting"
>["body"];

export class BeaconAPI {
	private static httpClient: HttpClient<BeaconClientRoute>;

	public static upsertBakedDocumentTranslationReporting(payload: PayloadUpsertBakedDocumentTranslationReporting) {
		return this.httpClient
			.post(
				"/upsert-baked-document-translation-reporting",
				{
					body: payload,
				},
			)
			.iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BEACON_BASE_URL,
		});
	}
}

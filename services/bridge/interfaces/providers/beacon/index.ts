import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/beacon/duplojsTypesCodegen";

export type BeaconClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class BeaconAPI {
	private static httpClient: HttpClient<BeaconClientRoute>;

	public static findManyBakedDocumentTranslationReportingAggregateDetails() {
		return this.httpClient
			.post(
				"/find-many-baked-document-translation-reporting-aggregate-details",
			)
			.iWantInformation("bakedDocumentTranslationReportingAggregate.findManyDetails");
	}

	public static findManyBakedDocumentTranslationReportingAggregate(
		page: number,
		quantityPerPage: number,
	) {
		return this.httpClient
			.post(
				"/find-many-baked-document-translation-reporting-aggregate",
				{
					body: {
						quantityPerPage,
						page,
					},
				},
			)
			.iWantInformation("bakedDocumentTranslationReportingAggregate.findMany");
	}

	public static findManyBakedDocumentTranslationReportingDetails(bakedDocumentId: string) {
		return this.httpClient
			.post(
				"/find-many-baked-document-translation-reporting-details/{bakedDocumentId}",
				{
					params: {
						bakedDocumentId,
					},
				},
			)
			.iWantInformation("bakedDocumentTranslationReporting.findManyDetails");
	}

	public static findManyBakedDocumentTranslationReporting(
		bakedDocumentId: string,
		page: number,
		quantityPerPage: number,
	) {
		return this.httpClient
			.post(
				"/find-many-baked-document-translation-reporting/{bakedDocumentId}",
				{
					params: {
						bakedDocumentId,
					},
					body: {
						page,
						quantityPerPage,
					},
				},
			)
			.iWantInformation("bakedDocumentTranslationReporting.findMany");
	}

	public static deleteManyBakedDocumentTranslationReporting(
		bakedDocumentId: string,
	) {
		return this.httpClient
			.post(
				"/delete-many-baked-document-translation-reporting/{bakedDocumentId}",
				{ params: { bakedDocumentId } },
			)
			.iWantInformation("bakedDocumentTranslationReporting.deleteMany");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BEACON_BASE_URL,
		});
	}
}

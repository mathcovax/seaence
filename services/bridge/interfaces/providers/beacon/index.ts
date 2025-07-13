import { HttpClient } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type ProcessBakedDocumentTranslationReportingAggregatePayload, type BeaconClientRoute } from "./types";

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

	public static processBakedDocumentTranslationReportingAggregate(
		bakedDocumentId: string,
		body: ProcessBakedDocumentTranslationReportingAggregatePayload,
	) {
		return this.httpClient
			.post(
				"/baked-document-translation-reporting-aggregate/process/{bakedDocumentId}",
				{
					params: { bakedDocumentId },
					body,
				},
			)
			.iWantInformation([
				"bakedDocumentTranslationReportingAggregate.processed",
				"bakedDocumentTranslationReportingAggregate.notfound",
			]);
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BEACON_BASE_URL,
		});
	}
}

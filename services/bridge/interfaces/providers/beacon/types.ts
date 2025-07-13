import { type FindHttpClientRoute, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { type CodegenRoutes } from "@vendors/clients-type/beacon/duplojsTypesCodegen";

export type BeaconClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type ProcessBakedDocumentTranslationReportingAggregatePayload = FindHttpClientRoute<
	BeaconClientRoute,
	"POST",
	"/baked-document-translation-reporting-aggregate/process/{bakedDocumentId}"
>["body"];

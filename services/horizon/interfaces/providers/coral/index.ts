import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/coral/duplojsTypesCodegen";

export type CoralClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

type InputCreateDocumentFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/create-document-folder"
>["body"];

type InputFindManyDocumentFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/search-document-folders"
>["body"];

type InputGetfindManyDocumentFolderCount = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/get-search-document-folders-count"
>["body"];

export class CoralAPI {
	private static httpClient: HttpClient<CoralClientRoute>;

	public static createDocumentFolder(input: InputCreateDocumentFolder) {
		return this.httpClient
			.post(
				"/create-document-folder",
				{
					body: input,
				},
			)
			.iWantExpectedResponse();
	}

	public static findManyDocumentFolder(input: InputFindManyDocumentFolder) {
		return this.httpClient
			.post(
				"/search-document-folders",
				{
					body: input,
				},
			)
			.iWantInformation("documentFolders.found");
	}

	public static getfindManyDocumentFolderCount(input: InputGetfindManyDocumentFolderCount) {
		return this.httpClient
			.post(
				"/get-search-document-folders-count",
				{
					body: input,
				},
			)
			.iWantInformation("documentFolders.searchDetails");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.CORAL_BASE_URL,
		});
	}
}

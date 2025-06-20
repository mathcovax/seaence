import { envs } from "@interfaces/envs";
import type { CoralClientRoute, InputAddDocumentInFolder, InputCreateDocumentFolder, InputFindManyDocumentFolder, InputFindManyDocumentInFolder, InputFindManyFavoritEquationDetails, InputFindManyFavoritEquationName, InputFindOneDocumentFolder, InputFindOneFavoritEquation, InputGetfindManyDocumentFolderCount, InputGetfindManyDocumentInFolderCount, InputRemoveDocumentFolder, InputRemoveDocumentInFolder, InputRemoveFavoritEquation, InputUpsertFavoritEquation } from "./types";
import { HttpClient } from "@duplojs/http-client";
export class CoralAPI {
	private static httpClient: HttpClient<CoralClientRoute>;

	public static findManyFavoriteEquationName(
		body: InputFindManyFavoritEquationName,
	) {
		return this.httpClient
			.post(
				"/find-many-favorite-equation-name",
				{
					body,
				},
			)
			.iWantInformation("favoriteEquation.name.findMany");
	}

	public static findManyFavoriteEquationDetails(
		body: InputFindManyFavoritEquationDetails,
	) {
		return this.httpClient
			.post(
				"/find-many-favorite-equation-details",
				{
					body,
				},
			)
			.iWantInformation("favoriEquation.findMany.details");
	}

	public static findOneFavoriteEquation(
		body: InputFindOneFavoritEquation,
	) {
		return this.httpClient
			.post(
				"/find-one-favorite-equation",
				{
					body,
				},
			)
			.iWantExpectedResponse();
	}

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

	public static upsertFavoriteEquation(
		body: InputUpsertFavoritEquation,
	) {
		return this.httpClient
			.post(
				"/upsert-favorite-equation",
				{
					body,
				},
			)
			.iWantInformation("favoriteEquation.upsert");
	}

	public static removeFavoriteEquation(
		body: InputRemoveFavoritEquation,
	) {
		return this.httpClient
			.post(
				"/remove-favorite-equation",
				{
					body,
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

	public static removeDocumentFolder(input: InputRemoveDocumentFolder) {
		return this.httpClient
			.post(
				"/remove-document-folder",
				{
					body: input,
				},
			)
			.iWantInformation(["documentFolder.removed", "documentFolder.notfound"]);
	}

	public static findOneDocumentFolder(input: InputFindOneDocumentFolder) {
		return this.httpClient
			.post(
				"/get-document-folder",
				{
					body: input,
				},
			)
			.iWantExpectedResponse();
	}

	public static findManyDocumentInFolder(input: InputFindManyDocumentInFolder) {
		return this.httpClient
			.post(
				"/search-documents-in-folder",
				{
					body: input,
				},
			)
			.iWantInformation("documentsInFolder.found");
	}

	public static getfindManyDocumentInFolderCount(input: InputGetfindManyDocumentInFolderCount) {
		return this.httpClient
			.post(
				"/get-search-documents-in-folder-count",
				{
					body: input,
				},
			)
			.iWantInformation("documentsInFolder.searchDetails");
	}

	public static removeDocumentInFolder(input: InputRemoveDocumentInFolder) {
		return this.httpClient
			.post(
				"/remove-document-in-folder",
				{
					body: input,
				},
			)
			.iWantInformation("documentInFolder.removed");
	}

	public static addDocumentInFolder(input: InputAddDocumentInFolder) {
		return this.httpClient
			.post(
				"/create-document-in-folder",
				{
					body: input,
				},
			)
			.iWantInformation(
				[
					"documentInFolder.created",
					"documentInFolder.maxQuantity",
					"documentInFolder.alreadyExists",
				],
			);
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.CORAL_BASE_URL,
		});
	}
}

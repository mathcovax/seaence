import { envs } from "@interfaces/envs";
import type { CoralClientRoute, InputCreateManyDocumentInFolder, InputCreateDocumentFolder, InputFindManyDocumentFolder, InputFindManyDocumentInFolder, InputFindOneDocumentFolder, InputRemoveDocumentFolder, InputRemoveDocumentInFolder, InputFindManyDocumentFoldersInWichDocumentExist, InputfindManyDocumentFolderDetails, InputFindManyDocumentFoldersInWichDocumentExistDetails, InputFindManyDocumentInFolderDetails, InputFindManyFavoritEquationName, InputFindManyFavoritEquationDetails, InputFindOneFavoritEquation, InputUpsertFavoritEquation, InputRemoveFavoritEquation, InputNodeSameRawDocumentIdsHaveDocumentInFolder } from "./types";
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
				"/find-many-document-folder",
				{
					body: input,
				},
			)
			.iWantInformation("documentFolders.found");
	}

	public static findManyDocumentFolderDetails(input: InputfindManyDocumentFolderDetails) {
		return this.httpClient
			.post(
				"/find-many-document-folders-details",
				{
					body: input,
				},
			)
			.iWantInformation("documentFolders.foundDetails");
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
				"/find-many-document-in-folder",
				{
					body: input,
				},
			)
			.iWantInformation("documentsInFolder.found");
	}

	public static findManyDocumentInFolderDetails(input: InputFindManyDocumentInFolderDetails) {
		return this.httpClient
			.post(
				"/find-many-document-in-folder-details",
				{
					body: input,
				},
			)
			.iWantInformation("documentsInFolder.foundDetails");
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

	public static createManyDocumentInFolder(input: InputCreateManyDocumentInFolder) {
		return this.httpClient
			.post(
				"/create-many-document-in-folder",
				{
					body: input,
				},
			)
			.iWantInformation([
				"documentInFolder.created",
				"documentFolder.noneFound",
				"documentFolder.noneCapacity",
			]);
	}

	public static findManyDocumentFoldersInWichDocumentExist(input: InputFindManyDocumentFoldersInWichDocumentExist) {
		return this.httpClient
			.post(
				"/find-many-document-folders-in-which-document-exist",
				{
					body: input,
				},
			)
			.iWantInformation("documentFolders.found");
	}

	public static findManyDocumentFoldersInWichDocumentExistDetails(
		input: InputFindManyDocumentFoldersInWichDocumentExistDetails,
	) {
		return this.httpClient
			.post(
				"/find-many-document-folders-in-which-document-exist-details",
				{
					body: input,
				},
			)
			.iWantInformation("documentFolders.foundDetails");
	}

	public static nodeSameRawDocumentIdsHaveDocumentInFolder(
		body: InputNodeSameRawDocumentIdsHaveDocumentInFolder,
	) {
		return this.httpClient
			.post(
				"/node-same-raw-document-ids-have-document-in-folder",
				{ body },
			)
			.iWantInformation("nodeSameRawDocumentIdsHaveDocumentInFolder.found");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.CORAL_BASE_URL,
		});
	}
}

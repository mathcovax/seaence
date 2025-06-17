import { envs } from "@interfaces/envs";
import type { CoralClientRoute, InputCreateDocumentFolder, InputFindManyDocumentFolder, InputFindManyDocumentInFolder, InputFindOneDocumentFolder, InputGetfindManyDocumentFolderCount, InputGetfindManyDocumentInFolderCount, InputRemoveDocumentFolder, InputRemoveDocumentInFolder } from "./types";
import { HttpClient } from "@duplojs/http-client";

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

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.CORAL_BASE_URL,
		});
	}
}

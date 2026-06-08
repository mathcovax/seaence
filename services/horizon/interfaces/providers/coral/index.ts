import { envs } from "@interfaces/envs";
import { createHttpClient, type FindServerRoute } from "@duplojs/http/client";
import type { Routes } from "@vendors/clients-type/coral/duplojsTypesCodegen";
import { kindClass, O, when } from "@duplojs/utils";

type FindRequestBody<
	GenericPath extends FindServerRoute<
		Routes,
		"POST"
	>["path"],
> = FindServerRoute<
	Routes,
	"POST",
	GenericPath
>["body"];

class ExtractErrorCoral extends kindClass(
	"extract-error-coral",
	Error,
) {
	public constructor(
		public content: unknown,
	) {
		super({}, "");
	}
}

export namespace CoralProvider {
	const client = createHttpClient<Routes>({
		baseUrl: envs.CORAL_BASE_URL,
	});

	export function findManyFavoriteEquationName(
		params: FindRequestBody<"/find-many-favorite-equation-name">,
	) {
		return client.post(
			"/find-many-favorite-equation-name",
			{
				body: params,
			},
		)
			.iWantInformationOrThrow("favoriteEquation.name.findMany");
	}

	export function findManyFavoriteEquationDetails(
		params: FindRequestBody<"/find-many-favorite-equation-details">,
	) {
		return client.post(
			"/find-many-favorite-equation-details",
			{
				body: params,
			},
		).iWantInformationOrThrow("favoriteEquation.findMany.details");
	}

	export function findOneFavoriteEquation(
		params: FindRequestBody<"/find-one-favorite-equation">,
	) {
		return client.post(
			"/find-one-favorite-equation",
			{
				body: params,
			},
		).iWantExpectedResponseOrThrow()
			.then(
				when(
					O.discriminate("code", "422"),
					(response) => {
						throw new ExtractErrorCoral(response);
					},
				),
			);
	}

	export function createDocumentFolder(params: FindRequestBody<"/create-document-folder">) {
		return client.post(
			"/create-document-folder",
			{
				body: params,
			},
		).iWantExpectedResponseOrThrow()
			.then(
				when(
					O.discriminate("code", "422"),
					(response) => {
						throw new ExtractErrorCoral(response);
					},
				),
			);
	}

	export function upsertFavoriteEquation(
		params: FindRequestBody<"/upsert-favorite-equation">,
	) {
		return client.post(
			"/upsert-favorite-equation",
			{
				body: params,
			},
		).iWantInformationOrThrow("favoriteEquation.upsert");
	}

	export function removeFavoriteEquation(
		params: FindRequestBody<"/remove-favorite-equation">,
	) {
		return client.post(
			"/remove-favorite-equation",
			{
				body: params,
			},
		).iWantExpectedResponseOrThrow()
			.then(
				when(
					O.discriminate("code", "422"),
					(response) => {
						throw new ExtractErrorCoral(response);
					},
				),
			);
	}

	export function findManyDocumentFolder(params: FindRequestBody<"/find-many-document-folder">) {
		return client.post(
			"/find-many-document-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow("documentFolders.found");
	}

	export function findManyDocumentFolderDetails(
		params: FindRequestBody<"/find-many-document-folders-details">,
	) {
		return client.post(
			"/find-many-document-folders-details",
			{
				body: params,
			},
		).iWantInformationOrThrow("documentFolders.foundDetails");
	}

	export function removeDocumentFolder(params: FindRequestBody<"/remove-document-folder">) {
		return client.post(
			"/remove-document-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow(["documentFolder.removed", "documentFolder.notfound"]);
	}

	export function renameDocumentFolder(params: FindRequestBody<"/rename-document-folder">) {
		return client.post(
			"/rename-document-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow([
			"documentFolder.renamed",
			"documentFolder.notfound",
			"documentFolder.wrongProprietary",
			"documentFolder.alreadyExists",
		]);
	}

	export function findOneDocumentFolder(params: FindRequestBody<"/find-one-document-folder">) {
		return client.post(
			"/find-one-document-folder",
			{
				body: params,
			},
		).iWantExpectedResponseOrThrow()
			.then(
				when(
					O.discriminate("information", "extract-error"),
					(response) => {
						throw new ExtractErrorCoral(response);
					},
				),
			);
	}

	export function findManyDocumentInFolder(
		params: FindRequestBody<"/find-many-document-in-folder">,
	) {
		return client.post(
			"/find-many-document-in-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow("documentsInFolder.found");
	}

	export function findManyDocumentInFolderDetails(
		params: FindRequestBody<"/find-many-document-in-folder-details">,
	) {
		return client.post(
			"/find-many-document-in-folder-details",
			{
				body: params,
			},
		).iWantInformationOrThrow("documentsInFolder.foundDetails");
	}

	export function removeDocumentInFolder(params: FindRequestBody<"/remove-document-in-folder">) {
		return client.post(
			"/remove-document-in-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow("documentInFolder.removed");
	}

	export function renameDocumentInFolder(params: FindRequestBody<"/rename-document-in-folder">) {
		return client.post(
			"/rename-document-in-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow([
			"documentInFolder.renamed",
			"documentFolder.notfound",
			"documentFolder.wrongProprietary",
			"documentInFolder.notfound",
		]);
	}

	export function createManyDocumentInFolder(
		params: FindRequestBody<"/create-many-document-in-folder">,
	) {
		return client.post(
			"/create-many-document-in-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow([
			"documentInFolder.created",
			"documentFolder.noneFound",
			"documentFolder.noneCapacity",
		]);
	}

	export function findManyDocumentFoldersInWhichDocumentExist(
		params: FindRequestBody<"/find-many-document-folders-in-which-document-exist">,
	) {
		return client.post(
			"/find-many-document-folders-in-which-document-exist",
			{
				body: params,
			},
		).iWantInformationOrThrow("documentFolders.found");
	}

	export function findManyDocumentFoldersInWhichDocumentExistDetails(
		params: FindRequestBody<"/find-many-document-folders-in-which-document-exist-details">,
	) {
		return client.post(
			"/find-many-document-folders-in-which-document-exist-details",
			{
				body: params,
			},
		).iWantInformationOrThrow("documentFolders.foundDetails");
	}

	export function nodeSameRawDocumentIdsHaveDocumentInFolder(
		params: FindRequestBody<"/node-same-raw-document-ids-have-document-in-folder">,
	) {
		return client.post(
			"/node-same-raw-document-ids-have-document-in-folder",
			{
				body: params,
			},
		).iWantInformationOrThrow("nodeSameRawDocumentIdsHaveDocumentInFolder.found");
	}
}

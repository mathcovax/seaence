import { C, D, DPE } from "@duplojs/utils";
import { documentInFolderRules } from "@lib/entity-rules";
import { DocumentFolder } from "./documentFolder";
import { UserId } from "../common/user";
import { NodeSameRawDocumentId } from "../common/nodeSameRawDocument";

export namespace DocumentInFolder {
	export const Name = C.createNewType(
		"documentInFolderName",
		DPE.string(),
		[
			C.StringMin(documentInFolderRules.name.minLength),
			C.StringMax(documentInFolderRules.name.maxLength),
		],
	);
	export type Name = C.GetNewType<typeof Name>;

	export const AddedAt = C.createNewType("documentFolderAddedAt", DPE.date());
	export type AddedAt = C.GetNewType<typeof AddedAt>;

	export const Entity = C.createEntity("documentInFolder", () => ({
		name: Name,
		documentFolderId: DocumentFolder.Id,
		userId: UserId,
		nodeSameRawDocumentId: NodeSameRawDocumentId,
		addedAt: AddedAt,
	}));
	export type Entity = C.GetEntity<typeof Entity>;

	export function create(
		params: Omit<
			C.EntityProperties<typeof Entity.propertiesDefinition>,
			"addedAt"
		>,
	) {
		return Entity.new({
			...params,
			addedAt: AddedAt.createOrThrow(D.now()),
		});
	}

	export function rename(
		entity: Entity,
		name: Name,
	) {
		return Entity.update(entity, { name });
	}

	export const WithCheckedOwner = C.createFlag<
		Entity,
		"documentInFolderWithCheckedOwner"
	>("documentInFolderWithCheckedOwner");
	export type WithCheckedOwner = C.GetFlag<typeof WithCheckedOwner>;
}

import { C, D, DPE } from "@duplojs/utils";
import { documentFolderRules } from "@lib/entity-rules";
import { UserId } from "../common/user";

export namespace DocumentFolder {
	export const Id = C.createNewType("documentFolderId", DPE.string());
	export type Id = C.GetNewType<typeof Id>;

	export const Name = C.createNewType(
		"documentFolderName",
		DPE.string(),
		[
			C.StringMin(documentFolderRules.name.minLength),
			C.StringMax(documentFolderRules.name.maxLength),
		],
	);
	export type Name = C.GetNewType<typeof Name>;

	const defaultNumberOfDocument = 0;
	export const NumberOfDocument = C.createNewType(
		"documentFolderNumberOfDocument",
		DPE.number(),
		C.PositiveInt,
	);
	export type NumberOfDocument = C.GetNewType<typeof NumberOfDocument>;

	export const CreatedAt = C.createNewType("documentFolderCreatedAt", DPE.date());
	export type CreatedAt = C.GetNewType<typeof CreatedAt>;

	export const Entity = C.createEntity("documentFolder", () => ({
		id: Id,
		userId: UserId,
		name: Name,
		numberOfDocument: NumberOfDocument,
		createdAt: CreatedAt,
	}));
	export type Entity = C.GetEntity<typeof Entity>;

	export function create(
		params: Omit<
			C.EntityProperties<typeof Entity.propertiesDefinition>,
			"numberOfDocument" | "createdAt"
		>,
	) {
		return Entity.new({
			...params,
			numberOfDocument: NumberOfDocument.createOrThrow(
				defaultNumberOfDocument,
			),
			createdAt: CreatedAt.createOrThrow(D.now()),
		});
	}

	export function rename(
		entity: Entity,
		name: Name,
	) {
		return Entity.update(entity, { name });
	}

	export function updateDocumentInFolderQuantity(
		entity: Entity,
		numberOfDocument: NumberOfDocument,
	) {
		return Entity.update(entity, { numberOfDocument });
	}

	export const MaxQuantity = C.Number.createOrThrow(documentFolderRules.maxQuantity);

	export const MaxCapacity = C.Number.createOrThrow(documentFolderRules.maxCapacity);

	export const WithCheckedOwner = C.createFlag<
		Entity,
		"documentFolderWithCheckedOwner"
	>("documentFolderWithCheckedOwner");
	export type WithCheckedOwner = C.GetFlag<typeof WithCheckedOwner>;

	export const WithCheckedCapacity = C.createFlag<
		Entity,
		"documentFolderWithCheckedCapacity"
	>("documentFolderWithCheckedCapacity");
	export type WithCheckedCapacity = C.GetFlag<typeof WithCheckedCapacity>;
}
